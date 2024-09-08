import React, { createContext, ReactNode, useState } from 'react';

export interface SelectInputProps<T> {
  title: string;
  data: SelectInputData<T>[];
  selectedData: SelectInputData<T>[];
  onSelect: (value: T) => void;
}

export interface SelectInputData<T> {
  name: string;
  value: T;
}

interface SelectInputContextProps<T> {
  selectInputProps: SelectInputProps<T>;
  setSelectInputProps: (selectInputProps: SelectInputProps<T>) => void;
}

const defaultSelectInputProps: SelectInputProps<any> = {
  title: '',
  data: [],
  selectedData: [],
  onSelect: () => {},
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
