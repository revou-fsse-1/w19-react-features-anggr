import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CategoriesDropdown from "./CategoriesDropdown";
import { ProductUpdateData, editProduct, getProduct } from "../api";
import { useAuthContext } from "../context/AuthContext";

const EditProduct: React.FC = () => {
  const { token } = useAuthContext();
  const navigate = useNavigate();
  const [product, setProduct] = useState<ProductUpdateData | null>(null);
  const [categoryIds, setCategoryIds] = useState<number[]>([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      if (id && token) {
        const fetchedProduct = await getProduct(parseInt(id, 10), token);
        setProduct(fetchedProduct);
        setCategoryIds(fetchedProduct.categoryIds);
      }
    };
    fetchProduct();
  }, [id, token]);

  const handleCategorySelect = (categoryId: number | null) => {
    console.log("Category selected:", categoryId);
    if (categoryId) {
      setCategoryIds([categoryId]);
    } else {
      setCategoryIds([]);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (product && token && id) {
      console.log("Editing product with the following data:", {
        ...product,
        categoryIds,
      });
      await editProduct(parseInt(id, 10), { ...product, categoryIds }, token);
      navigate("/");
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Edit Product</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
          />
        </label>
        <br />
        <label>
          Description:
          <input
            type="text"
            value={product.description}
            onChange={(e) =>
              setProduct({ ...product, description: e.target.value })
            }
          />
        </label>
        <br />
        <label>
          Price:
          <input
            type="number"
            value={product.price}
            onChange={(e) =>
              setProduct({ ...product, price: parseInt(e.target.value, 10) })
            }
          />
        </label>
        <br />
        <label>
          Category:
          <CategoriesDropdown onCategorySelect={handleCategorySelect} />{" "}
        </label>
        <br />
        <input type="submit" value="Submit" />
      </form>
      <button onClick={() => navigate("/")}>Back to Home</button>
    </div>
  );
};

export default EditProduct;
