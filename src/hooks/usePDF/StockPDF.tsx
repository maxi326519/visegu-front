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
} from "@react-pdf/renderer";
import dateFormat from "../../scripts/dateFormat";

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
    alignContent: "center",
    width: "100%",
  },
  title: {
    fontSize: "20px",
    fontWeight: "bold",
    textAlign: "center",
  },
  subTitle: {
    paddingTop: "10px",
    paddingBottom: "20px",
    textAlign: "center",
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
  stocks: Stock[];
  storages: Storage[];
  products: Product[];
  categories: Categories[];
}

// Create Document Component
export default function ProductPDF({
  stocks,
  storages,
  products,
  categories,
}: Props) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Visegu</Text>
          <Text style={styles.subTitle}>
            {dateFormat(new Date())} - Stock list
          </Text>
        </View>
        <View style={styles.table}>
          <View
            style={{
              ...styles.tablaRows,
              backgroundColor: "#389",
              color: "white",
            }}
          >
            <Text
              style={{ ...styles.text, width: "100px", padding: "8px 5px" }}
            >
              SKU Number
            </Text>
            <Text
              style={{ ...styles.text, width: "210px", padding: "8px 5px" }}
            >
              Description
            </Text>
            <Text style={{ ...styles.text, flexGrow: 1, padding: "8px 5px" }}>
              Quantity
            </Text>
            <Text style={{ ...styles.text, width: "80px", padding: "8px 5px" }}>
              Category
            </Text>
            <Text style={{ ...styles.text, width: "80px", padding: "8px 5px" }}>
              Storage
            </Text>
          </View>
          {stocks.map((stock) => {
            const storage = storages.find((s) => s.id === stock.StorageId);
            const product = products.find((p) => p.id === stock.ProductId);
            const category = categories.find(
              (c) => c.id === product?.CategoryId
            );

            return (
              <View style={styles.tablaRows}>
                <Text style={{ ...styles.text, width: "100px" }}>
                  {product?.skuNumber || "-"}
                </Text>
                <Text style={{ ...styles.text, width: "210px" }}>
                  {product?.description || "-"}
                </Text>
                <Text style={{ ...styles.text, flexGrow: 1 }}>
                  {stock.quantity}
                </Text>
                <Text style={{ ...styles.text, width: "80px" }}>
                  {category?.name || "-"}
                </Text>
                <Text style={{ ...styles.text, width: "80px" }}>
                  {storage?.name || "-"}
                </Text>
              </View>
            );
          })}
        </View>
      </Page>
    </Document>
  );
}
