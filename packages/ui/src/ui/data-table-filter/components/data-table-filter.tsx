import type {
  Column,
  DataTableFilterActions,
  FiltersState,
  FilterStrategy,
} from "../core/types";
import type { Locale } from "../lib/i18n";
import { useIsMobile } from "../../../hooks/use-mobile";
import { ActiveFilters, ActiveFiltersMobileContainer } from "./active-filters";
import { FilterActions } from "./filter-actions";
import { FilterSelector } from "./filter-selector";

interface DataTableFilterProps<TData> {
  columns: Column<TData>[];
  filters: FiltersState;
  actions: DataTableFilterActions;
  strategy: FilterStrategy;
  locale?: Locale;
}

export function DataTableFilter<TData>({
  columns,
  filters,
  actions,
  strategy,
  locale = "en",
}: DataTableFilterProps<TData>) {
  const isMobile = useIsMobile();
  if (isMobile) {
    return (
      <div className="flex w-full items-start justify-between gap-2">
        <div className="flex gap-1">
          <FilterSelector
            columns={columns}
            filters={filters}
            actions={actions}
            strategy={strategy}
            locale={locale}
          />
          <FilterActions
            hasFilters={filters.length > 0}
            actions={actions}
            locale={locale}
          />
        </div>
        <ActiveFiltersMobileContainer>
          <ActiveFilters
            columns={columns}
            filters={filters}
            actions={actions}
            strategy={strategy}
            locale={locale}
          />
        </ActiveFiltersMobileContainer>
      </div>
    );
  }

  return (
    <div className="flex w-full items-start justify-between gap-2">
      <div className="flex w-full flex-1 gap-2 md:flex-wrap">
        <FilterSelector
          columns={columns}
          filters={filters}
          actions={actions}
          strategy={strategy}
          locale={locale}
        />
        <ActiveFilters
          columns={columns}
          filters={filters}
          actions={actions}
          strategy={strategy}
          locale={locale}
        />
      </div>
      <FilterActions hasFilters={filters.length > 0} actions={actions} locale={locale} />
    </div>
  );
}
