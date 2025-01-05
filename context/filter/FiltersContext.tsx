import React, { createContext, FC, ReactNode, useState } from 'react';

import { ActivityFilters } from '@/hooks/finance/UseActivities';

const defaultFilters: ActivityFilters = {};

interface FiltersContextProps {
  filters: ActivityFilters;
  setFilters: (activityFilters: ActivityFilters) => void;
}

export const FiltersContext = createContext<FiltersContextProps>({
  filters: defaultFilters,
  setFilters: () => {},
});

export const FiltersProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [filters, setFilters] = useState<ActivityFilters>(defaultFilters);

  return (
    <FiltersContext.Provider value={{ filters, setFilters }}>{children}</FiltersContext.Provider>
  );
};
