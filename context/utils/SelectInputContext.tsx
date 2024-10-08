import React, { createContext, ReactNode, useState } from 'react';

export interface SelectInputProps<T> {
  selectedData: T[];
  onSelect: (value: SelectInputData<T>) => void;
  data: SelectInputData<T>[];
  createRow: (item: SelectInputData<T>, selected: boolean) => ReactNode;
}

export interface SelectInputData<T> {
  name: string;
  value: T;
  isDisabled?: boolean;
}

interface SelectInputContextProps<T> {
  selectInputProps: SelectInputProps<T>;
  setSelectInputProps: (selectInputProps: SelectInputProps<T>) => void;
}

const defaultSelectInputProps: SelectInputProps<any> = {
  selectedData: [],
  onSelect: () => {},
  data: [],
  createRow: () => <></>,
};

export const SelectInputContext = createContext<SelectInputContextProps<any>>({
  selectInputProps: defaultSelectInputProps,
  setSelectInputProps: () => {},
});

export const SelectInputProvider = <T,>({ children }: { children: ReactNode }) => {
  const [selectInputProps, setSelectInputProps] =
    useState<SelectInputProps<T>>(defaultSelectInputProps);

  return (
    <SelectInputContext.Provider value={{ selectInputProps, setSelectInputProps }}>
      {children}
    </SelectInputContext.Provider>
  );
};
