import { Inspection } from "./Inspection";
import { WorkReport } from "./Work";

export type Report = WorkReport | Inspection;

export enum ReportTypes {
  ANY,
  WORK,
  INSPECTION,
}

export interface ReportsFilters {
  date: Date;
}

export const initReportsFilters = (): ReportsFilters => ({
  date: new Date(),
});
