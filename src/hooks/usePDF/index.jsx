import { pdf } from "@react-pdf/renderer";

import StockPDF from "./StockPDF";
import ProductPDF from "./ProductsPDF";

export function usePDF() {
  async function openProductPDF(product, categories, suppliers) {
    // Generate PDF
    const blob = await pdf(
      <ProductPDF
        products={product}
        categories={categories}
        suppliers={suppliers}
      />
    ).toBlob();

    // Create url and open PDF
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  }

  async function openStockPDF(stock, storages, products, categories) {
    // Generate PDF
    const blob = await pdf(
      <StockPDF
        stocks={stock}
        storages={storages}
        products={products}
        categories={categories}
      />
    ).toBlob();

    // Create url and open PDF
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  }

  return { openProductPDF, openStockPDF };
}
