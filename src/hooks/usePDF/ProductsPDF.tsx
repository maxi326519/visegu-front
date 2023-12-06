import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { Categories } from "../../interfaces/Categories";
import { Suppliers } from "../../interfaces/Suppliers";
import { Product } from "../../interfaces/Product";

const styles = StyleSheet.create({
  page: {
    padding: "30px",
    fontSize: "10px",
  },
  viewer: {
    width: "100%",
    height: "calc(100% - 50px)",
  },
  table: {
    display: "flex",
    flexDirection: "column",
    width: "auto",
    marginTop: 10,
    fontSize: "9px",
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
  products: Product[];
  categories: Categories[];
  suppliers: Suppliers[];
}

// Create Document Component
export default function ProductPDF({ products, categories, suppliers }: Props) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.table}>
          <View
            style={{
              ...styles.tablaRows,
              backgroundColor: "#389",
              color: "white",
            }}
          >
            <Text style={{ ...styles.text, width: "80px", padding: "8px 5px" }}>
              SKU Number
            </Text>
            <Text
              style={{ ...styles.text, width: "160px", padding: "8px 5px" }}
            >
              Description
            </Text>
            <Text style={{ ...styles.text, width: "70px", padding: "8px 5px" }}>
              Category
            </Text>
            <Text style={{ ...styles.text, width: "70px", padding: "8px 5px" }}>
              Supplier
            </Text>
            <Text style={{ ...styles.text, width: "50px", padding: "8px 5px" }}>
              Buy P.
            </Text>
            <Text style={{ ...styles.text, width: "50px", padding: "8px 5px" }}>
              Sale P.
            </Text>
            <Text style={{ ...styles.text, flexGrow: 1, padding: "8px 5px" }}>
              Quantity
            </Text>
          </View>
          {products.map((product) => (
            <View key={product.id} style={styles.tablaRows}>
              <Text style={{ ...styles.text, width: "80px" }}>
                {product.skuNumber}
              </Text>
              <Text style={{ ...styles.text, width: "160px" }}>
                {product.description}
              </Text>
              <Text style={{ ...styles.text, width: "70px" }}>
                {categories.find((cat) => cat.id === product.CategoryId)
                  ?.name || "-"}
              </Text>
              <Text style={{ ...styles.text, width: "70px" }}>
                {suppliers.find((cat) => cat.id === product.SupplierId)?.name ||
                  "-"}
              </Text>
              <Text style={{ ...styles.text, width: "50px" }}>
                $ {product.priceSale ? product.priceSale.toFixed(2) : "-"}
              </Text>
              <Text style={{ ...styles.text, width: "50px" }}>
                $ {product.priceBuy}
              </Text>
              <Text style={{ ...styles.text, flexGrow: 1 }}>
                {product.amount ? product.amount.toFixed(2) : "-"}
              </Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
}
