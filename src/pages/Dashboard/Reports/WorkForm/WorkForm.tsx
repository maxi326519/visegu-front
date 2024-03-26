import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../interfaces/ReduxState";
import {
  TableData,
  WorkReport,
  WorkReportError,
  initTableData,
  initWorkReport,
  initWorkReportError,
} from "../../../../interfaces/ReportsModels/Work";

import styles from "./WorkForm.module.css";
import Checkbox from "../../../../components/Inputs/Checkbox";

export interface Props {
  data: any;
  handleClose: () => void;
  handleSubmit: (workReport: WorkReport) => void;
}

export default function WorkForm({ data, handleClose, handleSubmit }: Props) {
  const list = useSelector((state: RootState) => state.reports.lists);
  const user = useSelector((state: RootState) => state.login);
  const [report, setReport] = useState<WorkReport>(initWorkReport());
  const [error, setError] = useState<WorkReportError>(initWorkReportError());

  // If data is selected for editing, update product local data
  useEffect(() => {
    if (data) {
      setReport({
        ...data,
        mechanicName: user.name,
      });
    }
  }, [data, user]);

  useEffect(() => {
    console.log(report);
  }, [report]);

  // Change report
  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setReport({ ...report, [event.target.name]: event.target.value });
    setError({ ...error, [event.target.name]: "" });
  }

  function handleCheck(event: React.ChangeEvent<HTMLInputElement>) {
    setReport({
      ...report,
      check: {
        ...report.check,
        [event.target.name]: event.target.checked,
      },
    });
  }

  // Change table item
  function handleChangeRow(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    index: number
  ) {
    console.log(event.target.name, event.target.value, index);

    setReport({
      ...report,
      tableData: report.tableData.map((data, i) =>
        i === index
          ? { ...data, [event.target.name]: event.target.value }
          : data
      ),
    });
  }

  // Add new row in the table
  function handleAddRow() {
    console.log("Agregando datos a la tabla");
    setReport({
      ...report,
      tableData: [...report.tableData, initTableData()],
    });
  }

  // Sbubmit data
  function handleLocalSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (validations()) {
      handleSubmit(report);
      // handleClose();
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
          <button
            className={styles.headerClose}
            type="button"
            onChange={handleClose}
          >
            X
          </button>
        </header>
        <form className={styles.form} onSubmit={handleLocalSubmit}>
          <h2 className={styles.headerTitle}>Work order</h2>
          <div className={styles.formHeader}>
            <div>
              <label htmlFor="customer">Customer</label>
              <select
                id="customer"
                name="customer"
                value={report.customer}
                onChange={handleChange}
              >
                <option>Seleccionar</option>
                <option>Customer 1</option>
              </select>
            </div>
            <div>
              <label htmlFor="location">Location</label>
              <select
                id="location"
                name="location"
                value={report.location}
                onChange={handleChange}
              >
                <option>Seleccionar</option>
                {list.locations.map((location) => (
                  <option value={location}>{location}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="timeToStartServices">
                Time to start services
              </label>
              <input
                id="timeToStartServices"
                name="timeToStartServices"
                type="date"
                // value={report.timeToStartServices}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className={styles.formHeader}>
            <div>
              <label htmlFor="equipment">Equipment</label>
              <select
                id="equipment"
                name="equipment"
                value={report.equipment}
                onChange={handleChange}
              >
                <option>Seleccionar</option>
                {list.equipment.map((equipment) => (
                  <option value={equipment}>{equipment}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="dateOfRepair">Date of repair</label>
              <input
                id="dateOfRepair"
                name="dateOfRepair"
                type="date"
                // value={report.dateOfRepair}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="timeFinishService">Time finish service</label>
              <input
                id="timeFinishService"
                name="timeFinishService"
                type="date"
                // value={report.timeFinishService}
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
                disabled={true}
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
                  parts={list.parts}
                  handleChange={(
                    event: React.ChangeEvent<
                      HTMLInputElement | HTMLSelectElement
                    >
                  ) => handleChangeRow(event, i)}
                />
              ))}
              <tr>
                <button type="button" onClick={handleAddRow}>
                  +
                </button>
              </tr>
              <tr>
                <td>Tires Tread Depp</td>
              </tr>
              <tr>
                <td className={styles.flex}>
                  <Checkbox
                    name="RIF"
                    label="RIF"
                    value={report.check.RIF}
                    handleCheck={handleCheck}
                  />
                  <Checkbox
                    name="ROF"
                    label="ROF"
                    value={report.check.ROF}
                    handleCheck={handleCheck}
                  />
                  <Checkbox
                    name="RIR"
                    label="RIR"
                    value={report.check.RIR}
                    handleCheck={handleCheck}
                  />
                  <Checkbox
                    name="ROR"
                    label="ROR"
                    value={report.check.ROR}
                    handleCheck={handleCheck}
                  />
                </td>
              </tr>
              <tr>
                <td className={styles.flex}>
                  <Checkbox
                    name="LIF"
                    label="LIF"
                    value={report.check.LIF}
                    handleCheck={handleCheck}
                  />
                  <Checkbox
                    name="LOF"
                    label="LOF"
                    value={report.check.LOF}
                    handleCheck={handleCheck}
                  />
                  <Checkbox
                    name="LIR"
                    label="LIR"
                    value={report.check.LIR}
                    handleCheck={handleCheck}
                  />
                  <Checkbox
                    name="LOR"
                    label="LOR"
                    value={report.check.LOR}
                    handleCheck={handleCheck}
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
  );
}

interface RowProps {
  data: TableData;
  parts: string[];
  handleChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

function RowInput({ data, parts, handleChange }: RowProps) {
  return (
    <tr>
      <td>
        <input name="code" value={data.code} onChange={handleChange} />
        <input
          name="workDescription"
          value={data.workDescription}
          onChange={handleChange}
        />
      </td>
      <td>
        <input
          name="laborTime"
          type="number"
          step="0.5"
          value={data.laborTime}
          onChange={handleChange}
        />
      </td>
      <td>
        <select name="parts" value={data.parts} onChange={handleChange}>
          <option>Seleccionar</option>
          {parts.map((part) => (
            <option value={part}>{part}</option>
          ))}
        </select>
      </td>
      <td>
        <input name="total" value={data.total} onChange={handleChange} />
      </td>
    </tr>
  );
}
