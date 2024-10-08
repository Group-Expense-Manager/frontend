import React, { createContext, FC, ReactNode, useState } from 'react';

export enum ReportFormat {
  PDF = 'PDF',
  XLSX = 'XLSX',
}

export interface ReportCreation {
  groupId: string;
  format?: ReportFormat;
}

interface ReportCreationContextProps {
  reportCreation: ReportCreation;
  setReportCreation: (reportCreation: ReportCreation) => void;
}

const defaultReportCreation: ReportCreation = {
  groupId: '',
};

export const ReportCreationContext = createContext<ReportCreationContextProps>({
  reportCreation: defaultReportCreation,
  setReportCreation: () => {},
});

export const ReportCreationProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [reportCreation, setReportCreation] = useState<ReportCreation>(defaultReportCreation);

  return (
    <ReportCreationContext.Provider value={{ reportCreation, setReportCreation }}>
      {children}
    </ReportCreationContext.Provider>
  );
};
