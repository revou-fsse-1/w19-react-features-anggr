import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deleteProduct } from "../api";
import { useAuthContext } from "../context/AuthContext";
import { ProductContext } from "../context/ProductContext";

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    description: string;
    price: number;
    sellerId: number;
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { token, userId } = useAuthContext();
  const productContext = useContext(ProductContext);
  const navigate = useNavigate();

  if (productContext === null) {
    throw new Error("ProductCard must be used within ProductProvider");
  }

  const { removeProduct } = productContext;

  const handleDelete = async () => {
    if (token) {
      await deleteProduct(product.id, token);
      removeProduct(product.id);
      navigate("/");
    }
  };
  return (
    <div className="col">
      <div className="card h-100">
        <img
          src="https://res.cloudinary.com/djudfrj8s/image/upload/v1686967990/w19/placeholder_nsieyl.png"
          className="card-img-top"
          alt="image"
        />
        <div className="card-body">
          <h5 className="card-title">{product.name}</h5>
          <h6 className="card-subtitle mb-2 text-muted">${product.price}</h6>
          <p className="card-text">{product.description}</p>
          {Number(userId) === product.sellerId && (
            <>
              <Link
                to={`/edit-product/${product.id}`}
                className="btn m-2 btn-primary">
                Edit
              </Link>
              <button onClick={handleDelete} className="btn m-2 btn-primary">
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default ProductCard;
