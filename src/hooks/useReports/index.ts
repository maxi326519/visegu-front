import { closeLoading, openLoading } from "../../redux/actions/loading";
import { useDispatch, useSelector } from "react-redux";
import { Inspection } from "../../interfaces/ReportsModels/Inspection";
import { ReportLists } from "../../interfaces/ReportsModels/Lists";
import { WorkReport } from "../../interfaces/ReportsModels/Work";
import { RootState } from "../../interfaces/ReduxState";
import { Report } from "../../interfaces/ReportsModels/Reports";
import {
  deleteWorkReport,
  deleteInspectionReport,
  getLists,
  getReports,
  setWorkReport,
  setInspectionReport,
} from "../../redux/actions/reports";
import { usePDF } from "../usePDF";

interface UseReports {
  data: Report[];
  setWork: (data: WorkReport) => Promise<void>;
  setInspection: (data: Inspection) => Promise<void>;
  getReports: () => Promise<void>;
  deleteWork: (id: string) => Promise<void>;
  deleteInspection: (id: string) => Promise<void>;
  list: {
    data: ReportLists;
    get: () => void;
    setItems: () => void;
    deleteItems: () => void;
  };
}

export default function useReports(): UseReports {
  const dispatch = useDispatch();
  const pdf = usePDF();
  const reportsState = useSelector((state: RootState) => state.reports);

  const sendWorkReport = async (report: WorkReport): Promise<void> => {
    pdf.openWorkPDF(report);

    /* dispatch(openLoading());
    return dispatch<any>(setWorkReport(report))
      .then(() => {
        dispatch(closeLoading());
      })
      .catch(() => {
        dispatch(closeLoading());
      }); */
  };

  const sendInspectionReport = async (report: Inspection): Promise<void> => {
    pdf.openInspectionPDF(report);

    /* dispatch(openLoading());
    await dispatch<any>(setInspectionReport(report))
      .then(() => {
        dispatch(closeLoading());
      })
      .catch(() => {
        dispatch(closeLoading());
      }); */
  };

  const getReportsData = async (): Promise<void> => {
    dispatch(openLoading());
    return dispatch<any>(getReports())
      .then(() => {
        dispatch(closeLoading());
      })
      .catch(() => {
        dispatch(closeLoading());
      });
  };

  const deleteInspection = async (reportId: string): Promise<void> => {
    dispatch(openLoading());
    dispatch<any>(deleteInspectionReport(reportId))
      .then(() => {
        dispatch(closeLoading());
      })
      .catch(() => {
        dispatch(closeLoading());
      });
  };

  const deleteWork = async (reportId: string): Promise<void> => {
    dispatch(openLoading());
    dispatch<any>(deleteWorkReport(reportId))
      .then(() => {
        dispatch(closeLoading());
      })
      .catch(() => {
        dispatch(closeLoading());
      });
  };

  const setItemsList = async (): Promise<void> => {
    dispatch(openLoading());
    dispatch<any>(setItemsList())
      .then(() => {
        dispatch(closeLoading());
      })
      .catch(() => {
        dispatch(closeLoading());
      });
  };

  const getItemsList = async (): Promise<void> => {
    dispatch(openLoading());
    dispatch<any>(getLists())
      .then(() => {
        dispatch(closeLoading());
      })
      .catch(() => {
        dispatch(closeLoading());
      });
  };

  const deleteItemsList = async (): Promise<void> => {
    dispatch(openLoading());
    dispatch<any>(deleteItemsList())
      .then(() => {
        dispatch(closeLoading());
      })
      .catch(() => {
        dispatch(closeLoading());
      });
  };

  return {
    data: reportsState.data,
    setWork: sendWorkReport,
    setInspection: sendInspectionReport,
    getReports: getReportsData,
    deleteInspection: deleteInspection,
    deleteWork: deleteWork,
    list: {
      data: reportsState.lists,
      get: getItemsList,
      setItems: setItemsList,
      deleteItems: deleteItemsList,
    },
  };
}
