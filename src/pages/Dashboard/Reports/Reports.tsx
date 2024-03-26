import { Report, ReportTypes } from "../../../interfaces/ReportsModels/Reports";
import { useEffect, useState } from "react";
import useReports from "../../../hooks/useReports";

import ReportRow from "./ReportRow/ReportRow";
import ReportsForm from "./ReportsForm/ReportsForm";
import WorkForm from "./WorkForm/WorkForm";
import InspectionForm from "./InspectionForm/InspectionForm";
import Lists from "./Lists/Lists";

import styles from "./Reports.module.css";

export default function Reports() {
  const reports = useReports();
  const [form, setForm] = useState<boolean>(false);
  const [data, setData] = useState<Report | null>(null);
  const [list, setList] = useState(false);
  const [formSelected, setFormSelected] = useState<ReportTypes>(
    ReportTypes.ANY
  );

  // Get reports
  useEffect(() => {
    reports.list.get();
  }, []);

  // Show list
  function handleShowList() {
    setList(!list);
  }

  // View form and edit user
  function handleEdit(data: Report) {
    setData(data);
    handleForm();
  }

  // Alternate form
  function handleForm() {
    setForm(!form);
    if (form) setData(null);
  }

  // Close any form
  function handleCloseSelectedForm() {
    setFormSelected(ReportTypes.ANY);
    setForm(false);
  }

  return (
    <div className={styles.dashboard}>
      {list && <Lists handleClose={handleShowList} />}
      {form && (
        <ReportsForm handleClose={handleForm} handleSelect={setFormSelected} />
      )}
      {formSelected === ReportTypes.WORK && (
        <WorkForm
          data={data}
          handleClose={handleCloseSelectedForm}
          handleSubmit={reports.setWork}
        />
      )}
      {formSelected === ReportTypes.INSPECTION && (
        <InspectionForm
          data={data}
          handleClose={handleCloseSelectedForm}
          handleSubmit={reports.setInspection}
        />
      )}
      <div className={styles.controls}>
        <button
          className="btn btn-outline-primary"
          type="button"
          onClick={handleShowList}
        >
          Lists
        </button>
        <button
          className="btn btn-outline-primary"
          type="button"
          onClick={handleForm}
        >
          + New Report
        </button>
      </div>
      <div className={styles.table}>
        <div className={`${styles.row} ${styles.firstRow}`}>
          <span>Date</span>
          <span>Type</span>
          <span>User</span>
          <span>Actions</span>
        </div>
        <div className={styles.body}>
          {reports.data?.length <= 0 ? (
            <tr className={styles.emptyRows}>
              <th>No Reports</th>
            </tr>
          ) : (
            reports.data?.map((report: Report) => (
              <ReportRow
                key={report.id}
                report={report}
                handleEdit={handleEdit}
                handleDeleteWork={reports.deleteWork}
                handleDeleteInspection={reports.deleteInspection}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
