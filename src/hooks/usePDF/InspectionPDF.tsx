import { Categories } from "../../interfaces/Categories";
import { Storage } from "../../interfaces/Storage";
import { Product } from "../../interfaces/Product";
import { Stock } from "../../interfaces/Stock";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import dateFormat from "../../scripts/dateFormat";

import logo from "../../assets/img/logo.png";
import { Inspection } from "../../interfaces/ReportsModels/Inspection";

const styles = StyleSheet.create({
  page: {
    padding: "30px",
    fontSize: "10px",
  },
  viewer: {
    width: "100%", //the pdf viewer will take up all of the width and height
    height: "calc(100% - 50px)",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    padding: "10px",
    fontSize: "20px",
  },
  data: {
    display: "flex",
    padding: "5px",
    border: "1px solid grey",
  },
  dataRow: {
    display: "flex",
    flexDirection: "row",
  },
  dataElement: {
    flexGrow: 1,
  },
  table: {
    display: "flex",
    flexDirection: "column",
    width: "auto",
    marginTop: 10,
    fontSize: "10px",
    borderLeft: "1px solid grey",
    borderTop: "1px solid grey",
  },
  tablaRows: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    borderBottom: "1px solid grey",
    borderRight: "1px solid grey",
  },
  itemCol: {
    width: "190px",
    padding: "2px",
    borderRight: "1px solid grey",
  },
  checkCol: {
    width: "30px",
    padding: "2px",
    borderRight: "1px solid grey",
  },
  repairCol: {
    width: "130px",
    padding: "2px",
  },
  laborCol: {
    width: "80px",
    padding: "2px",
    borderRight: "1px solid grey",
  },
  materialCol: {
    width: "100px",
    padding: "2px",
  },
  text: {
    padding: "5px",
    textAlign: "center",
    borderRight: "1px solid grey",
  },
  endData: {
    display: "flex",
    flexDirection: "row",
    paddingTop: "10px",
  },
  textEnd: {
    padding: "5px 10px",
    border: "1px solid gray",
  },
  dataEnd: {
    padding: "5px",
    border: "1px solid gray",
    textAlign: "right",
  },
});

interface Props {
  report: Inspection;
}

// Create Document Component
export default function InspectionPDF({ report }: Props) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text>Inpection Report</Text>
          <Text>Visegu</Text>
        </View>

        <View style={styles.data}>
          <View style={styles.dataRow}>
            <Text style={styles.dataElement}>
              Last Annual Periodic Inspection / FMCSA: {report.yearFMCSA}
            </Text>
            <Text style={styles.dataElement}>New FMCSA: {report.FMCSA}</Text>
          </View>
          <View style={styles.dataRow}>
            <Text style={styles.dataElement}>
              Last California Periodic Inspection / BIT: {report.yearBIT}
            </Text>
            <Text style={styles.dataElement}>New BIT: {report.BIT}</Text>
          </View>
          <View style={styles.dataRow}>
            <Text style={styles.dataElement}>
              License Number: {report.licenseNumber}
            </Text>
            <Text style={styles.dataElement}>State: {report.state}</Text>
            <Text style={styles.dataElement}>Location: {report.location}</Text>
          </View>
          <View style={styles.dataRow}>
            <Text style={styles.dataElement}>
              Equipment Mark and Number: {report.equipment}
            </Text>
            <Text style={styles.dataElement}>
              Chassis Owwner or Lessor: {report.ownerOrLessor}
            </Text>
          </View>
        </View>

        <View style={styles.table}>
          <View style={styles.tablaRows}>
            <Text style={styles.itemCol}>INSPECTION ITEM</Text>
            <Text style={styles.checkCol}>OK</Text>
            <Text style={styles.repairCol}>REPAIR / REPALCE ITEMS</Text>
            <Text style={styles.laborCol}>LABOR CODE</Text>
            <Text style={styles.materialCol}>MATERIAL CODE</Text>
          </View>
          <View style={styles.tablaRows}>
            <Text style={styles.itemCol}>BREAKES, DRUMS, SEALS</Text>
            <Text style={styles.checkCol}>{report.ok1}</Text>
            <Text style={styles.repairCol}>{report.repair1}</Text>
            <Text style={styles.laborCol}>{report.labor1}</Text>
            <Text style={styles.materialCol}>{report.material1}</Text>
          </View>
          <View style={styles.tablaRows}>
            <Text style={styles.itemCol}>SLACK ADJUSTMENT</Text>
            <Text style={styles.checkCol}>{report.ok2}</Text>
            <Text style={styles.repairCol}>{report.repair2}</Text>
            <Text style={styles.laborCol}>{report.labor2}</Text>
            <Text style={styles.materialCol}>{report.material2}</Text>
          </View>
          <View style={styles.tablaRows}>
            <Text style={styles.itemCol}>
              AIR SYSTEM, AIR VALVES, HOSES, BRAKE CHAMBER
            </Text>
            <Text style={styles.checkCol}>{report.ok3}</Text>
            <Text style={styles.repairCol}>{report.repair3}</Text>
            <Text style={styles.laborCol}>{report.labor3}</Text>
            <Text style={styles.materialCol}>{report.material3}</Text>
          </View>
          <View style={styles.tablaRows}>
            <Text style={styles.itemCol}>LIGHT AND REPLECTORS</Text>
            <Text style={styles.checkCol}>{report.ok4}</Text>
            <Text style={styles.repairCol}>{report.repair4}</Text>
            <Text style={styles.laborCol}>{report.labor4}</Text>
            <Text style={styles.materialCol}>{report.material4}</Text>
          </View>
          <View style={styles.tablaRows}>
            <Text style={styles.itemCol}>7 WAY PLUG AND WITING</Text>
            <Text style={styles.checkCol}>{report.ok5}</Text>
            <Text style={styles.repairCol}>{report.repair5}</Text>
            <Text style={styles.laborCol}>{report.labor5}</Text>
            <Text style={styles.materialCol}>{report.material5}</Text>
          </View>
          <View style={styles.tablaRows}>
            <Text style={styles.itemCol}>TIRES, WHEELS AND RIMS</Text>
            <Text style={styles.checkCol}>{report.ok6}</Text>
            <Text style={styles.repairCol}>{report.repair6}</Text>
            <Text style={styles.laborCol}>{report.labor6}</Text>
            <Text style={styles.materialCol}>{report.material6}</Text>
          </View>
          <View style={styles.tablaRows}>
            <Text style={styles.itemCol}>
              LANDING GEAR, LEG, BRANCES, CRANK, HANDLE
            </Text>
            <Text style={styles.checkCol}>{report.ok7}</Text>
            <Text style={styles.repairCol}>{report.repair7}</Text>
            <Text style={styles.laborCol}>{report.labor7}</Text>
            <Text style={styles.materialCol}>{report.material7}</Text>
          </View>
          <View style={styles.tablaRows}>
            <Text style={styles.itemCol}>TWISTLOCKS, PIN LOCKS, LATCHES</Text>
            <Text style={styles.checkCol}>{report.ok8}</Text>
            <Text style={styles.repairCol}>{report.repair8}</Text>
            <Text style={styles.laborCol}>{report.labor8}</Text>
            <Text style={styles.materialCol}>{report.material8}</Text>
          </View>
          <View style={styles.tablaRows}>
            <Text style={styles.itemCol}>
              SUSPENSION U-BOLTS, HANGERS, RADIUS ROD, AXLES
            </Text>
            <Text style={styles.checkCol}>{report.ok9}</Text>
            <Text style={styles.repairCol}>{report.repair9}</Text>
            <Text style={styles.laborCol}>{report.labor9}</Text>
            <Text style={styles.materialCol}>{report.material9}</Text>
          </View>
          <View style={styles.tablaRows}>
            <Text style={styles.itemCol}>
              BODY FRAMES, STRUCTURAL, KING PIN/PLATE, CROSS MEMBERS
            </Text>
            <Text style={styles.checkCol}>{report.ok10}</Text>
            <Text style={styles.repairCol}>{report.repair10}</Text>
            <Text style={styles.laborCol}>{report.labor10}</Text>
            <Text style={styles.materialCol}>{report.material10}</Text>
          </View>
          <View style={styles.tablaRows}>
            <Text style={styles.itemCol}>DECALS / LOGO</Text>
            <Text style={styles.checkCol}>{report.ok11}</Text>
            <Text style={styles.repairCol}>{report.repair11}</Text>
            <Text style={styles.laborCol}>{report.labor11}</Text>
            <Text style={styles.materialCol}>{report.material11}</Text>
          </View>
          <View style={styles.tablaRows}>
            <Text style={styles.itemCol}>
              LUBRICATION, FITTING, LOOCKS, LANDING GEAR, SLIDER
            </Text>
            <Text style={styles.checkCol}>{report.ok12}</Text>
            <Text style={styles.repairCol}>{report.repair12}</Text>
            <Text style={styles.laborCol}>{report.labor12}</Text>
            <Text style={styles.materialCol}>{report.material12}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}
