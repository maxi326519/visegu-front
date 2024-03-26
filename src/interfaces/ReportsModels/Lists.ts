export interface ReportLists {
  locations: Array<string>;
  equipment: Array<string>;
  parts: Array<string>;
  state: Array<string>;
  chassisOwwnerOrLessor: Array<string>;
}

export const initReportLists = (): ReportLists => ({
  locations: [],
  equipment: [],
  parts: [],
  state: [],
  chassisOwwnerOrLessor: [],
});
