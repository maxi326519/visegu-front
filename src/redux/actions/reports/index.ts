import { MyThunkAction } from "../../../interfaces/ReduxState";
import { Inspection } from "../../../interfaces/ReportsModels/Inspection";
import { WorkReport } from "../../../interfaces/ReportsModels/Work";
import { Dispatch } from "react";
import axios from "axios";

export const SET_WORK_REPORT = "SET_WORK_REPORT";
export const SET_INSPECTION_REPORT = "SET_INSPECTION_REPORT";
export const SET_REPORTS_ITEM = "SET_REPORTS_ITEM";

export const GET_REPORTS = "GET_REPORTS";
export const GET_REPORTS_ITEMS = "GET_REPORTS_ITEMS";

export const DELETE_WORK_REPORT = "DELETE_WORK_REPORT";
export const DELETE_INSPECTION_REPORT = "DELETE_INSPECTION_REPORT";
export const DELETE_REPORTS_ITEM = "DELETE_REPORTS_ITEM";

export function setWorkReport(reports: WorkReport): MyThunkAction {
  return async (dispatch: Dispatch<any>) => {
    // Post inspection report
    const response = await axios.post("/reports/work", reports);

    try {
      dispatch({
        type: SET_WORK_REPORT,
        payload: response.data,
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}

export function setInspectionReport(reports: Inspection): MyThunkAction {
  return async (dispatch: Dispatch<any>) => {
    // Post work report
    const response = await axios.post("/reports/inspection", reports);

    try {
      dispatch({
        type: SET_INSPECTION_REPORT,
        payload: response.data,
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}

export function getReports(): MyThunkAction {
  return async (dispatch: Dispatch<any>) => {
    // Get reports
    const response = await axios.get("/reports/work");

    try {
      dispatch({
        type: SET_REPORTS_ITEM,
        payload: response.data,
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}

export function deleteInspectionReport(reportId: string): MyThunkAction {
  return async (dispatch: Dispatch<any>) => {
    // Delete inspection report
    await axios.delete(`/reports/inspection/${reportId}`);

    try {
      dispatch({
        type: DELETE_INSPECTION_REPORT,
        payload: reportId,
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}

export function deleteWorkReport(reportId: string): MyThunkAction {
  return async (dispatch: Dispatch<any>) => {
    // Delete inspection report
    await axios.delete(`/reports/work/${reportId}`);

    try {
      dispatch({
        type: DELETE_WORK_REPORT,
        payload: reportId,
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}

export function setItem(listName: string, newValues: string[]): MyThunkAction {
  return async (dispatch: Dispatch<any>) => {
    try {
      // Upload items
      await axios.post("/lists", {
        name: listName,
        values: newValues,
      });

      dispatch({
        type: SET_REPORTS_ITEM,
        payload: {
          listName,
          newValues,
        },
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}

export function getLists(): MyThunkAction {
  return async (dispatch: Dispatch<any>) => {
    try {
      // Get items
      const response = await axios.get("/lists");
      if (!response.data.lists) throw new Error("Error to get the list");

      dispatch({
        type: GET_REPORTS_ITEMS,
        payload: response.data.lists,
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}

export function deleteItem(listName: string, values: string[]): MyThunkAction {
  return async (dispatch: Dispatch<any>) => {
    try {
      // Delete items
      await axios.post("/lists/delete", {
        name: listName,
        values: values,
      });

      dispatch({
        type: DELETE_REPORTS_ITEM,
        payload: {
          listName,
          values,
        },
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
}
