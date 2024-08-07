import { ChangeEvent, useCallback, useMemo, useState } from "react";

export type CheckboxState = boolean | null;
export function useCheckbox(defaultValue?: CheckboxState) {
  const [checked, setChecked] = useState<CheckboxState>(defaultValue ?? null);

  const onChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => setChecked(event.target.checked),
    [],
  );

  return useMemo(() => ({ checked, onChange }), [checked, onChange]);
}

export type NumberInputState = number | null;
export function useNumberInput(defaultValue?: NumberInputState) {
  const [value, setValue] = useState<NumberInputState>(defaultValue ?? null);
  const onChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) =>
      setValue(Number(event.target.value)),
    [],
  );
  return useMemo(() => ({ value, onChange }), [value, onChange]);
}

export type RangeInputState = { min: NumberInputState; max: NumberInputState };
export function useRangeInput(defaultValue?: RangeInputState) {
  const min = useNumberInput(defaultValue?.min);
  const max = useNumberInput(defaultValue?.max);
  return useMemo(() => ({ min, max }), [min, max]);
}
