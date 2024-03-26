import { useEffect, useState } from "react";
import {
  Inspection,
  InspectionError,
  initInspection,
  initInspectionError,
} from "../../../../interfaces/ReportsModels/Inspection";

import styles from "./InspectionForm.module.css";

export interface Props {
  data: any;
  handleClose: () => void;
  handleSubmit: (inspection: Inspection) => void;
}

export default function InspectionForm({
  data,
  handleClose,
  handleSubmit,
}: Props) {
  const [report, setReport] = useState<Inspection>(initInspection());
  const [error, setError] = useState<InspectionError>(initInspectionError());

  // If data is selected for editing, update product local data
  useEffect(() => {
    if (data) setReport(data);
  }, [data]);

  // Change product
  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setReport({ ...report, [event.target.name]: event.target.value });
    setError({ ...error, [event.target.name]: "" });
  }

  // Sbubmit data
  function handleLocalSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (validations()) {
      console.log(report);
      handleSubmit(report);
      // handleClose();
    }
  }

  // Errors validations
  function validations() {
    let errors: InspectionError = initInspectionError();
    let value = true;

    setError(errors);
    return value;
  }

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h3 className={styles.headerTitle}>InspectionForm</h3>
          <button
            className={styles.headerClose}
            type="button"
            onClick={handleClose}
          >
            X
          </button>
        </header>
        <form className={styles.form} onSubmit={handleLocalSubmit}>
          <div className={styles.textToComplete}>
            <div className={styles.row}>
              <label>Last Annual Periodic Inspection / FMCSA</label>
              <input
                name="yearFMCSA"
                value={report.yearFMCSA}
                onChange={handleChange}
              />
              <label>New FMCSA</label>
              <input
                name="FMCSA"
                value={report.FMCSA}
                onChange={handleChange}
              />
            </div>
            <div className={styles.row}>
              <label>Last California Periodic Inspection / BIT</label>
              <input
                name="yearBIT"
                value={report.yearBIT}
                onChange={handleChange}
              />
              <label>New BIT</label>
              <input name="BIT" value={report.BIT} onChange={handleChange} />
            </div>
            <div className={styles.row}>
              <label>License Number</label>
              <input
                name="licenseNumber"
                value={report.licenseNumber}
                onChange={handleChange}
              />
              <label>State</label>
              <input
                name="state"
                value={report.state}
                onChange={handleChange}
              />
              <label>Location</label>
              <input
                name="location"
                value={report.location}
                onChange={handleChange}
              />
            </div>
            <div className={styles.row}>
              <label>Equipment Mark and Number</label>
              <input
                name="quipment"
                value={report.equipment}
                onChange={handleChange}
              />
              <label>Chassis Owwner or Lessor</label>
              <input
                name="ownerOrLessor"
                value={report.ownerOrLessor}
                onChange={handleChange}
              />
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <td>INSPECTION ITEM</td>
                <td>OK</td>
                <td>REPAIR / REPALCE ITEMS</td>
                <td>LABOR CODE</td>
                <td>MATERIAL CODE</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>BREAKES, DRUMS, SEALS</td>
                <td>
                  <input
                    name="ok1"
                    value={report.ok1}
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input
                    name="repair1"
                    value={report.repair1}
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input
                    name="labor1"
                    value={report.labor1}
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input
                    name="material1"
                    value={report.material1}
                    onChange={handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td>SLACK ADJUSTMENT</td>
                <td>
                  <input
                    name="ok2"
                    value={report.ok2}
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input
                    name="repair2"
                    value={report.repair2}
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input
                    name="labor2"
                    value={report.labor2}
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input
                    name="material2"
                    value={report.material2}
                    onChange={handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td>AIR SYSTEM, AIR VALVES, HOSES, BRAKE CHAMBER</td>
                <td>
                  <input
                    name="ok3"
                    value={report.ok3}
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input
                    name="repair3"
                    value={report.repair3}
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input
                    name="labor3"
                    value={report.labor3}
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input
                    name="material3"
                    value={report.material3}
                    onChange={handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td>LIGHT AND REPLECTORS</td>
                <td>
                  <input
                    name="ok4"
                    value={report.ok4}
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input
                    name="repair4"
                    value={report.repair4}
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input
                    name="labor4"
                    value={report.labor4}
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input
                    name="material4"
                    value={report.material4}
                    onChange={handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td>7 WAY PLUG AND WITING</td>
                <td>
                  <input
                    name="ok5"
                    value={report.ok5}
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input
                    name="repair5"
                    value={report.repair5}
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input
                    name="labor5"
                    value={report.labor5}
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input
                    name="material5"
                    value={report.material5}
                    onChange={handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td>TIRES, WHEELS AND RIMS</td>
                <td>
                  <input
                    name="ok6"
                    value={report.ok6}
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input
                    name="repair6"
                    value={report.repair6}
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input
                    name="labor6"
                    value={report.labor6}
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input
                    name="material6"
                    value={report.material6}
                    onChange={handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td>LANDING GEAR, LEG, BRANCES, CRANK, HANDLE</td>
                <td>
                  <input
                    name="ok7"
                    value={report.ok7}
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input
                    name="repair7"
                    value={report.repair7}
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input
                    name="labor7"
                    value={report.labor7}
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input
                    name="material7"
                    value={report.material7}
                    onChange={handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td>TWISTLOCKS, PIN LOCKS, LATCHES</td>
                <td>
                  <input
                    name="ok8"
                    value={report.ok8}
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input
                    name="repair8"
                    value={report.repair8}
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input
                    name="labor8"
                    value={report.labor8}
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input
                    name="material8"
                    value={report.material8}
                    onChange={handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td>SUSPENSION U-BOLTS, HANGERS, RADIUS ROD, AXLES</td>
                <td>
                  <input
                    name="ok9"
                    value={report.ok9}
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input
                    name="repair9"
                    value={report.repair9}
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input
                    name="labor9"
                    value={report.labor9}
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input
                    name="material9"
                    value={report.material9}
                    onChange={handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td>BODY FRAMES, STRUCTURAL, KING PIN/PLATE, CROSS MEMBERS</td>
                <td>
                  <input
                    name="ok10"
                    value={report.ok10}
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input
                    name="repair10"
                    value={report.repair10}
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input
                    name="labor10"
                    value={report.labor10}
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input
                    name="material10"
                    value={report.material10}
                    onChange={handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td>DECALS / LOGO</td>
                <td>
                  <input
                    name="ok11"
                    value={report.ok11}
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input
                    name="repair11"
                    value={report.repair11}
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input
                    name="labor11"
                    value={report.labor11}
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input
                    name="material11"
                    value={report.material11}
                    onChange={handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td>LUBRICATION, FITTING, LOOCKS, LANDING GEAR, SLIDER</td>
                <td>
                  <input
                    name="ok12"
                    value={report.ok12}
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input
                    name="repair12"
                    value={report.repair12}
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input
                    name="labor12"
                    value={report.labor12}
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input
                    name="material12"
                    value={report.material12}
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
  );
}
