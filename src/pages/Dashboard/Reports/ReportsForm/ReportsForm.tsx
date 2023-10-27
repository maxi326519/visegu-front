import { ReportTypes } from "../../../../interfaces/ReportsModels/Reports";
import styles from "./ReportsForm.module.css";

export interface Props {
  handleClose: () => void;
  handleSelect: (type: ReportTypes) => void;
}

export default function ReportsForm({ handleClose, handleSelect }: Props) {

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h3 className={styles.headerTitle}>New Report</h3>
          <button className={styles.headerClose} type="button" onClick={handleClose}>X</button>
        </header>
        <form className={styles.form}>
          <button className="btn btn-outline-primary" type="button" onClick={() => handleSelect(ReportTypes.WORK)}>
            Work
          </button>
          <button className="btn btn-outline-primary" type="button" onClick={() => handleSelect(ReportTypes.INSPECTION)}>
            Inspection
          </button>
        </form>
      </div>
    </div >
  )
}
