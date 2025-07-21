import { useCallback, useEffect, useState } from "react";

import { Input } from "../../input";
import { debounce } from "../lib/debounce";

export function DebouncedInput({
  value: initialValue,
  onChange,
  debounceMs = 500, // This is the wait time, not the function
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounceMs?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">) {
  const [value, setValue] = useState(initialValue);

  // Sync with initialValue when it changes
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  // Define the debounced function with useCallback
  const debouncedOnChange = useCallback(
    (value: string | number) =>
      debounce(() => {
        return onChange(value);
      }, debounceMs), // Pass the wait time here
    [debounceMs, onChange], // Dependencies
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue); // Update local state immediately
    debouncedOnChange(newValue); // Call debounced version
  };

  return <Input {...props} value={value} onChange={handleChange} />;
}
