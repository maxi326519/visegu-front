import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { WorkReport } from "../../interfaces/ReportsModels/Work";

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
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: "20px",
    fontSize: "20px",
  },
  data: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    width: "100%",
  },
  dataRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    border: "1px solid grey",
    marginBottom: "5px",
    padding: "5px",
  },
  table: {
    display: "flex",
    flexDirection: "column",
    width: "auto",
    marginTop: "10px",
    fontSize: "10px",
    borderLeft: "1px solid grey",
    borderRight: "1px solid grey",
    borderTop: "1px solid grey",
  },
  tablaRows: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    borderBottom: "1px solid grey",
  },
  rowCode: {
    width: "80px",
    padding: "5px",
    borderRight: "1px solid grey",
  },
  rowDescription: {
    width: "180px",
    padding: "5px",
    borderRight: "1px solid grey",
  },
  rowLabor: {
    width: "100px",
    padding: "5px",
    borderRight: "1px solid grey",
  },
  rowPart: {
    width: "80px",
    padding: "5px",
    borderRight: "1px solid grey",
  },
  rowTotal: {
    padding: "5px",
    width: "80px",
  },
  endSelector: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    padding: "5px",
    borderBottom: "1px solid grey",
  },
});

interface Props {
  report: WorkReport;
}

// Create Document Component
export default function WorkPDF({ report }: Props) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text>Visegu</Text>
        </View>

        <View style={styles.data}>
          <View style={styles.dataRow}>
            <Text>Customer: {report.customer}</Text>
            <Text>Location: {report.location}</Text>
            <Text>Time to start services: {report.location}</Text>
          </View>
          <View style={styles.dataRow}>
            <Text>Equipment: {report.location}</Text>
            <Text>Date to repair: {report.location}</Text>
            <Text>Time finish service: {report.location}</Text>
          </View>
          <View style={styles.dataRow}>
            <Text>Lincese Plate: {report.location}</Text>
            <Text>PO: {report.location}</Text>
          </View>
          <View style={styles.dataRow}>
            <Text>VIN: {report.location}</Text>
            <Text>Mechanic name: {report.location}</Text>
          </View>
        </View>

        <View style={styles.table}>
          <View style={styles.tablaRows}>
            <Text style={styles.rowCode}>CODE</Text>
            <Text style={styles.rowDescription}>WORK DESCRIPTION</Text>
            <Text style={styles.rowLabor}>LABOR TIME</Text>
            <Text style={styles.rowPart}>PARTS</Text>
            <Text style={styles.rowTotal}>TOTAL</Text>
          </View>
          {report.tableData.map((report) => (
            <View style={styles.tablaRows}>
              <Text style={styles.rowCode}>{report.code}</Text>
              <Text style={styles.rowDescription}>
                {report.workDescription}
              </Text>
              <Text style={styles.rowLabor}>{report.laborTime}</Text>
              <Text style={styles.rowPart}>{report.parts}</Text>
              <Text style={styles.rowTotal}>{report.total}</Text>
            </View>
          ))}
        </View>

        <View style={styles.table}>
          <View style={styles.endSelector}>
            <Text>RIF</Text>
            <Text>ROF</Text>
            <Text>RIR</Text>
            <Text>ROR</Text>
          </View>
          <View style={styles.endSelector}>
            <Text>LIF</Text>
            <Text>LOF</Text>
            <Text>LIR</Text>
            <Text>LOR</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}
