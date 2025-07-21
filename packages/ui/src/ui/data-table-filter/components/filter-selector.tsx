"use client";

import React, {
  isValidElement,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ArrowRightIcon, ChevronRightIcon, FilterIcon } from "lucide-react";

import type {
  Column,
  ColumnDataType,
  DataTableFilterActions,
  FiltersState,
  FilterStrategy,
} from "../core/types";
import type { Locale } from "../lib/i18n";
import { cn } from "../../../utils";
import { Button } from "../../button";
import { Checkbox } from "../../checkbox";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../../command";
import { Popover, PopoverContent, PopoverTrigger } from "../../popover";
import { isAnyOf } from "../lib/array";
import { getColumn } from "../lib/helpers";
import { t } from "../lib/i18n";
import { FilterValueController } from "./filter-value";

interface FilterSelectorProps<TData> {
  filters: FiltersState;
  columns: Column<TData>[];
  actions: DataTableFilterActions;
  strategy: FilterStrategy;
  locale?: Locale;
}

export const FilterSelector = memo(FilterSelectorComp) as typeof FilterSelectorComp;

function FilterSelectorComp<TData>({
  filters,
  columns,
  actions,
  strategy,
  locale = "en",
}: FilterSelectorProps<TData>) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [property, setProperty] = useState<string | undefined>(undefined);
  const inputRef = useRef<HTMLInputElement>(null);

  const column = property ? getColumn(columns, property) : undefined;
  const filter = property ? filters.find((f) => f.columnId === property) : undefined;

  const hasFilters = filters.length > 0;

  useEffect(() => {
    if (property && inputRef.current) {
      inputRef.current.focus();
      setValue("");
    }
  }, [property]);

  useEffect(() => {
    if (!open) setTimeout(() => setValue(""), 150);
  }, [open]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: need filters to be updated
  const content = useMemo(
    () =>
      property && column ? (
        <FilterValueController
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          filter={filter!}
          column={column as Column<TData, ColumnDataType>}
          actions={actions}
          strategy={strategy}
          locale={locale}
        />
      ) : (
        <Command
          loop
          filter={(value, search, keywords) => {
            const extendValue = `${value} ${keywords?.join(" ")}`;
            return extendValue.toLowerCase().includes(search.toLowerCase()) ? 1 : 0;
          }}
        >
          <CommandInput
            value={value}
            onValueChange={setValue}
            ref={inputRef}
            placeholder={t("search", locale)}
          />
          <CommandEmpty>{t("noresults", locale)}</CommandEmpty>
          <CommandList className="max-h-fit">
            <CommandGroup>
              {columns.map((column) => (
                <FilterableColumn
                  key={column.id}
                  column={column}
                  setProperty={setProperty}
                />
              ))}
              <QuickSearchFilters
                search={value}
                filters={filters}
                columns={columns}
                actions={actions}
                strategy={strategy}
                locale={locale}
              />
            </CommandGroup>
          </CommandList>
        </Command>
      ),
    [property, column, filter, filters, columns, actions, value],
  );

  return (
    <Popover
      open={open}
      onOpenChange={(value) => {
        setOpen(value);
        if (!value) setTimeout(() => setProperty(undefined), 100);
      }}
    >
      <PopoverTrigger asChild>
        <Button variant="outline" className={cn("h-7", hasFilters && "w-fit !px-2")}>
          <FilterIcon className="size-4" />
          {!hasFilters && <span>{t("filter", locale)}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        side="bottom"
        className="w-fit origin-(--radix-popover-content-transform-origin) p-0"
      >
        {content}
      </PopoverContent>
    </Popover>
  );
}

export function FilterableColumn<TData, TType extends ColumnDataType, TVal>({
  column,
  setProperty,
}: {
  column: Column<TData, TType, TVal>;
  setProperty: (value: string) => void;
}) {
  const itemRef = useRef<HTMLDivElement>(null);

  const prefetch = useCallback(async () => {
    await column.prefetchOptions();
    await column.prefetchValues();
    await column.prefetchFacetedUniqueValues();
    await column.prefetchFacetedMinMaxValues();
  }, [column]);

  useEffect(() => {
    const target = itemRef.current;

    if (!target) return;

    // Set up MutationObserver
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === "attributes") {
          const isSelected = target.getAttribute("data-selected") === "true";
          if (isSelected) void prefetch();
        }
      }
    });

    // Set up observer
    observer.observe(target, {
      attributes: true,
      attributeFilter: ["data-selected"],
    });

    // Cleanup on unmount
    return () => observer.disconnect();
  }, [prefetch]);

  return (
    <CommandItem
      ref={itemRef}
      value={column.id}
      keywords={[column.displayName]}
      onSelect={() => setProperty(column.id)}
      className="group"
      onMouseEnter={prefetch}
    >
      <div className="flex w-full items-center justify-between">
        <div className="inline-flex items-center gap-1.5">
          {<column.icon strokeWidth={2.25} className="size-4" />}
          <span>{column.displayName}</span>
        </div>
        <ArrowRightIcon className="size-4 opacity-0 group-aria-selected:opacity-100" />
      </div>
    </CommandItem>
  );
}

interface QuickSearchFiltersProps<TData> {
  search?: string;
  filters: FiltersState;
  columns: Column<TData>[];
  actions: DataTableFilterActions;
  strategy: FilterStrategy;
  locale?: Locale;
}

export const QuickSearchFilters = memo(
  QuickSearchFiltersComp,
) as typeof QuickSearchFiltersComp;

function QuickSearchFiltersComp<TData>({
  search,
  filters,
  columns,
  actions,
}: QuickSearchFiltersProps<TData>) {
  const cols = useMemo(
    () =>
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      columns.filter((c) => isAnyOf<ColumnDataType>(c.type, ["option", "multiOption"])),
    [columns],
  );

  if (!search || search.trim().length < 2) return null;

  return (
    <>
      {cols.map((column) => {
        const filter = filters.find((f) => f.columnId === column.id);
        const options = column.getOptions();
        const optionsCount = column.getFacetedUniqueValues();

        function handleOptionSelect(value: string, check: boolean) {
          //@ts-expect-error issues here
          if (check) actions.addFilterValue(column, [value]);
          //@ts-expect-error issues here
          else actions.removeFilterValue(column, [value]);
        }

        return (
          <React.Fragment key={column.id}>
            {options.map((v) => {
              //@ts-expect-error issues here
              const checked = Boolean(filter?.values.includes(v.value));
              const count = optionsCount?.get(v.value) ?? 0;

              return (
                <CommandItem
                  key={v.value}
                  value={v.value}
                  keywords={[v.label, v.value]}
                  onSelect={() => {
                    handleOptionSelect(v.value, !checked);
                  }}
                  className="group"
                >
                  <div className="group flex items-center gap-1.5">
                    <Checkbox
                      checked={checked}
                      className="dark:border-ring mr-1 opacity-0 group-data-[selected=true]:opacity-100 data-[state=checked]:opacity-100"
                    />
                    <div className="flex w-4 items-center justify-center">
                      {v.icon &&
                        (isValidElement(v.icon) ? (
                          v.icon
                        ) : (
                          <v.icon className="text-primary size-4" />
                        ))}
                    </div>
                    <div className="flex items-center gap-0.5">
                      <span className="text-muted-foreground">{column.displayName}</span>
                      <ChevronRightIcon className="text-muted-foreground/75 size-3.5" />
                      <span>
                        {v.label}
                        <sup
                          className={cn(
                            !optionsCount && "hidden",
                            "text-muted-foreground ml-0.5 tracking-tight tabular-nums",
                            count === 0 && "slashed-zero",
                          )}
                        >
                          {count < 100 ? count : "100+"}
                        </sup>
                      </span>
                    </div>
                  </div>
                </CommandItem>
              );
            })}
          </React.Fragment>
        );
      })}
    </>
  );
}
