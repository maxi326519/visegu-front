import { useEffect, useState } from "react";
import { TableData, WorkReport, WorkReportError, initTableData, initWorkReport, initWorkReportError } from "../../../../interfaces/ReportsModels/Work";

import styles from "./WorkForm.module.css";

export interface Props {
  data: any;
  handleClose: () => void;
  handleSubmit: (workReport: WorkReport) => void;
}

export default function WorkForm({ data, handleClose, handleSubmit }: Props) {
  const [report, setReport] = useState<WorkReport>(initWorkReport());
  const [error, setError] = useState<WorkReportError>(initWorkReportError());

  // If data is selected for editing, update product local data
  useEffect(() => {
    if (data) setReport(data);
  }, [data]);

  // Change report
  function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setReport({ ...report, [event.target.name]: event.target.value });
    setError({ ...error, [event.target.name]: "" });
  }

  // Change table item
  function handleChangeRow(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, index: number) {
    setReport({
      ...report,
      tableData: report.tableData.map((data, i) => (
        i === index
          ? { ...data, [event.target.name]: event.target.value }
          : data
      ))
    });
  }

  // Add new row in the table
  function handleAddRow() {
    setReport({
      ...report,
      tableData: [
        ...report.tableData,
        initTableData()
      ]
    });
  }

  // Sbubmit data
  function handleLocalSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (validations()) {
      handleSubmit(report);
      handleClose();
    }
  }

  // Errors validations
  function validations() {
    let errors: WorkReportError = initWorkReportError();
    let value = true;

    setError(errors);
    return value;
  }

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h3 className={styles.headerTitle}>New Report</h3>
          <button className={styles.headerClose} type="button" onClick={handleClose}>X</button>
        </header>
        <form className={styles.form} onSubmit={handleLocalSubmit}>
          <h2 className={styles.headerTitle}>Work order</h2>
          <div className={styles.formHeader}>
            <div>
              <label htmlFor="customer">Customer</label>
              <input
                id="customer"
                name="customer"
                value={report.customer}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="location">Location</label>
              <input
                id="location"
                name="location"
                value={report.location}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="timeToStartServices">Time to start services</label>
              <input
                id="timeToStartServices"
                name="timeToStartServices"
                value={report.timeToStartServices}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className={styles.formHeader}>
            <div>
              <label htmlFor="equipment">Equipment</label>
              <input
                id="equipment"
                name="equipment"
                value={report.equipment}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="dateOfRepair">Date of repair</label>
              <input
                id="dateOfRepair"
                name="dateOfRepair"
                value={report.dateOfRepair}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="timeFinishService">Time finish service</label>
              <input
                id="timeFinishService"
                name="timeFinishService"
                value={report.timeFinishService}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className={styles.formHeader}>
            <div>
              <label htmlFor="licensePlate">License plate</label>
              <input
                id="licensePlate"
                name="licensePlate"
                value={report.licensePlate}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="PO">PO</label>
              <input
                id="PO"
                name="PO"
                value={report.PO}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className={styles.formHeader}>
            <div>
              <label htmlFor="VIN">VIN</label>
              <input
                id="VIN"
                name="VIN"
                value={report.VIN}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="mechanicName">Mechanic name</label>
              <input
                id="mechanicName"
                name="mechanicName"
                value={report.mechanicName}
                onChange={handleChange}
              />
            </div>
          </div>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.flex}>
                  <span>CODE</span>
                  <span>WORK DESCRIPTION</span>
                </th>
                <th>LABOR TIME</th>
                <th>PARTS</th>
                <th>TOTAL</th>
              </tr>
            </thead>
            <tbody>
              {report?.tableData.map((data, i) => (
                <RowInput
                  key={i}
                  data={data}
                  handleChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChangeRow(event, i)}
                />
              ))}
              <tr><button type="button" onClick={handleAddRow}>+</button></tr>
              <tr>
                <td>Tires Tread Depp</td>
                <td>
                  <input
                    id="col2"
                    value={""}
                    placeholder=" Time"
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input
                    id="col3"
                    value={""}
                    placeholder=" Part"
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input
                    id="col4"
                    value={""}
                    placeholder=" Total"
                    onChange={handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td className={styles.flex}>
                  <span>RIF</span>
                  <span>ROF</span>
                  <span>RIR</span>
                  <span>ROR</span>
                </td>
                <td>
                  <input
                    id="col2"
                    value={""}
                    placeholder=" Time"
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input
                    id="col3"
                    value={""}
                    placeholder=" Part"
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input
                    id="col4"
                    value={""}
                    placeholder=" Total"
                    onChange={handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td className={styles.flex}>
                  <span>LIF</span>
                  <span>LOF</span>
                  <span>LIR</span>
                  <span>LOR</span>
                </td>
                <td>
                  <input
                    id="col2"
                    value={""}
                    placeholder=" Time"
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input
                    id="col3"
                    value={""}
                    placeholder=" Part"
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input
                    id="col4"
                    value={""}
                    placeholder=" Total"
                    onChange={handleChange}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <button className="btn btn-success" type="submit">
            Save
          </button>
        </form>
      </div>
    </div>
  )
}

interface RowProps {
  data: TableData;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function RowInput({ data, handleChange }: RowProps) {
  return (
    <tr>
      <td>
        <input
          id="code"
          value={data.code}
          onChange={handleChange}
        />
        <input
          id="workDescription"
          value={data.workDescription}
          onChange={handleChange}
        />
      </td>
      <td>
        <input
          id="laborTime"
          value={data.laborTime}
          onChange={handleChange}
        />
      </td>
      <td>
        <input
          id="parts"
          value={data.parts}
          onChange={handleChange}
        />
      </td>
      <td>
        <input
          id="total"
          value={data.total}
          onChange={handleChange}
        />
      </td>
    </tr>
  )
}