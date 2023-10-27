import { Report, ReportTypes } from "../../../interfaces/ReportsModels/Reports";
import { useState } from "react";

import ReportRow from "./ReportRow/ReportRow";
import ReportsForm from "./ReportsForm/ReportsForm";
import WorkForm from "./WorkForm/WorkForm";
import InspectionForm from "./InspectionForm/InspectionForm";

import styles from "./Reports.module.css";

export default function Reports() {
  const users = { data: [], delete: () => { } };
  const [form, setForm] = useState<boolean>(false);
  const [data, setData] = useState<Report | null>(null);
  const [formSelected, setFormSelected] = useState<ReportTypes>(ReportTypes.ANY);

  // Get users
  /*   useEffect(() => {
      if (users.data.length <= 0) users.get();
    }, [users]); */

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

  // Save new form
  function handleSubmit(report: any) {
    /*     data ? users.update(user) : users.set(user) */
  }

  return (
    <div className={`toLeft ${styles.dashboard}`}>
      {form && <ReportsForm handleClose={handleForm} handleSelect={setFormSelected} />}
      {formSelected === ReportTypes.WORK && <WorkForm data={data} handleClose={handleCloseSelectedForm} handleSubmit={handleSubmit} />}
      {formSelected === ReportTypes.INSPECTION && <InspectionForm data={data} handleClose={handleCloseSelectedForm} handleSubmit={handleSubmit} />}
      <div className={styles.controls}>
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
          {users.data?.length <= 0 ? (
            <tr className={styles.emptyRows}>
              <th>No Reports</th>
            </tr>
          ) : (
            users.data?.map((report: Report) => (
              <ReportRow
                key={report.id}
                report={report}
                handleEdit={handleEdit}
                handleDelete={users.delete}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
