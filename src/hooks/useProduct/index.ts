import { closeLoading, openLoading } from "../../redux/actions/loading";
import { useDispatch, useSelector } from "react-redux";
import { Cache, Categories } from "../../interfaces/Categories";
import { Suppliers } from "../../interfaces/Suppliers";
import { RootState } from "../../interfaces/ReduxState";
import { Product } from "../../interfaces/Product";
import {
  postProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  getCategories,
  updateCategories,
  getSuppliers,
  updateSuppliers,
} from "../../redux/actions/products";
import swal from "sweetalert";

export interface UseProducts {
  data: Product[];
  set: (product: Product) => Promise<any>;
  get: () => Promise<any>;
  update: (product: Product) => Promise<any>;
  remove: (productId: string) => Promise<any>;
  categories: {
    data: Categories[];
    get: () => Promise<any>;
    update: (cache: Cache) => Promise<any>;
  };
  suppliers: {
    data: Suppliers[];
    get: () => Promise<any>;
    update: (cache: Cache) => Promise<any>;
  };
}

export function useProducts(): UseProducts {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.data);
  const categories = useSelector(
    (state: RootState) => state.products.categories
  );
  const suppliers = useSelector((state: RootState) => state.products.suppliers);

  async function setProduct(product: Product): Promise<any> {
    dispatch<any>(openLoading());
    return dispatch<any>(postProduct(product))
      .then(() => {
        dispatch<any>(closeLoading());
        swal("Created", "Successfully created product", "success");
      })
      .catch((error: any) => {
        console.log(error);
        dispatch<any>(closeLoading());
        swal("Error", "Error to create the product, try later", "error");
      });
  }

  async function getAllProduct(): Promise<any> {
    dispatch<any>(openLoading());
    return dispatch<any>(getProduct())
      .then(() => {
        dispatch<any>(closeLoading());
      })
      .catch((error: any) => {
        console.log(error);
        dispatch<any>(closeLoading());
        swal(
          "Error",
          "Error to get the products, inténtelo más tarde",
          "error"
        );
      });
  }

  async function updateProductById(product: Product): Promise<any> {
    dispatch<any>(openLoading());
    dispatch<any>(updateProduct(product))
      .then(() => {
        dispatch<any>(closeLoading());
        swal("Updated", "Successfully updated product", "success");
      })
      .catch((error: any) => {
        console.log(error);
        dispatch<any>(closeLoading());
        swal("Error", "Error to update the product, try later", "error");
      });
  }

  async function removeProductById(productId: string): Promise<any> {
    dispatch<any>(openLoading());
    return dispatch<any>(deleteProduct(productId))
      .then(() => {
        dispatch<any>(closeLoading());
        swal("Deleted", "Successfully deleted product", "success");
      })
      .catch((error: any) => {
        console.log(error);
        dispatch<any>(closeLoading());
        swal("Error", "Error to delete the product, try later", "error");
      });
  }

  async function updateCategoriesItems(cache: Cache): Promise<any> {
    dispatch<any>(openLoading());
    return dispatch<any>(updateCategories(cache))
      .then(() => {
        dispatch<any>(closeLoading());
        swal("Updated", "Successfully updated categories", "success");
      })
      .catch((error: any) => {
        console.log(error);
        dispatch<any>(closeLoading());
        swal("Error", "Error to update the categories, try later", "error");
      });
  }

  async function getAllCategories(): Promise<any> {
    dispatch<any>(openLoading());
    return dispatch<any>(getCategories())
      .then(() => {
        dispatch<any>(closeLoading());
      })
      .catch((error: any) => {
        console.log(error);
        dispatch<any>(closeLoading());
        swal("Error", "Error to get the categories, try later", "error");
      });
  }

  async function updateSupplierItems(cache: Cache): Promise<any> {
    dispatch<any>(openLoading());
    return dispatch<any>(updateSuppliers(cache))
      .then(() => {
        dispatch<any>(closeLoading());
        swal("Updated", "Successfully updated suppliers", "success");
      })
      .catch((error: any) => {
        console.log(error);
        dispatch<any>(closeLoading());
        swal("Error", "Error to update the suppliers, try later", "error");
      });
  }

  async function getAllSuppliers(): Promise<any> {
    dispatch<any>(openLoading());
    return dispatch<any>(getSuppliers())
      .then(() => {
        dispatch<any>(closeLoading());
      })
      .catch((error: any) => {
        console.log(error);
        dispatch<any>(closeLoading());
        swal("Error", "Error to get the suppliers, try later", "error");
      });
  }

  return {
    data: products,
    set: setProduct,
    get: getAllProduct,
    update: updateProductById,
    remove: removeProductById,
    categories: {
      data: categories,
      get: getAllCategories,
      update: updateCategoriesItems,
    },
    suppliers: {
      data: suppliers,
      get: getAllSuppliers,
      update: updateSupplierItems,
    },
  };
}
