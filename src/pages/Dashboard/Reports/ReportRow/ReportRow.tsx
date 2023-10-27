import { Report } from "../../../../interfaces/ReportsModels/Reports";

import styles from "./ReportRow.module.css";
import editSvg from "../../../../assets/icons/edit.svg";
import removeSvg from "../../../../assets/icons/remove.svg";

interface Props {
  report: Report;
  handleEdit: (report: Report) => void;
  handleDelete: (reportId: string) => void;
}

export default function ReportRow({
  report,
  handleEdit,
  handleDelete,
}: Props) {
  return (
    <tr className={styles.row}>
      <span>{""}</span>
      <span>{""}</span>
      <span>{""}</span>
      <span>{"" ? "Active" : "Inactive"}</span>
      <button
        className="btn btn-outline-primary"
        type="button"
        onClick={() => handleEdit(report)}
      >
        <img src={editSvg} alt="edit" />
      </button>
      <button
        className="btn btn-outline-danger"
        type="button"
        onClick={() => handleDelete(report.id!)}
      >
        <img src={removeSvg} alt="remove" />
      </button>
    </tr>
  );
}
