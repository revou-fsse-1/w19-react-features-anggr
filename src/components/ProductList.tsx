import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";
import { useAuthContext } from "../context/AuthContext";
import ProductCard from "./ProductCard";
import CategoriesDropdown from "./CategoriesDropdown";

const ProductList: React.FC = () => {
  const productContext = useContext(ProductContext);
  const authContext = useAuthContext();

  if (!productContext) {
    return <div>Loading...</div>;
  }

  const { products, setSelectedCategory } = productContext;

  return (
    <div className="container mx-auto mt-4">
      <CategoriesDropdown onCategorySelect={setSelectedCategory} />

      {authContext.userId && (
        <Link to="/create-product" className="btn btn-primary m-4">
          Create Product
        </Link>
      )}
      {products && products.length === 0 ? (
        <div>No products found...</div>
      ) : (
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
