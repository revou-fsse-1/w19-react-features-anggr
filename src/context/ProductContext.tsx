import {
  ReactNode,
  useState,
  createContext,
  useEffect,
  FunctionComponent,
} from "react";
import { fetchProducts } from "../api";
export interface IProductContext {
  products: Product[];
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
  setSelectedCategory: (category: number | null) => void;
  removeProduct: (productId: number) => void;
}

interface ProductProviderProps {
  children: ReactNode;
}

export const ProductContext = createContext<IProductContext | null>(null);

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  sellerId: number;
}

export const ProductProvider: FunctionComponent<ProductProviderProps> = ({
  children,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [selectedCategory, setSelectedCategoryState] = useState<number | null>(
    null
  );

  const updateSelectedCategory = (category: number | null) => {
    console.log("Setting selected category: ", category);
    setSelectedCategoryState(category);
    setCurrentPage(1);
  };

  const removeProduct = (productId: number) => {
    setProducts(products.filter((product) => product.id !== productId));
  };

  useEffect(() => {
    const getProducts = async () => {
      console.log("Fetching products with category: ", selectedCategory);
      const result = await fetchProducts(currentPage, selectedCategory);
      console.log(result);
      setProducts(result.products);
      setTotalPages(result.totalPages);
    };

    getProducts();
  }, [currentPage, selectedCategory]);

  return (
    <ProductContext.Provider
      value={{
        products,
        currentPage,
        totalPages,
        setCurrentPage,
        setSelectedCategory: updateSelectedCategory,
        removeProduct,
      }}>
      {children}
    </ProductContext.Provider>
  );
};
