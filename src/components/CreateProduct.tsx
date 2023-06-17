import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { createProduct, ProductData, getCategories } from "../api";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

interface CreateProductFormData {
  name: string;
  description: string;
  price: string;
  categoryIds: string[];
}
const CreateProduct: React.FC = () => {
  const { register, handleSubmit, getValues } =
    useForm<CreateProductFormData>();
  const authContext = useAuthContext();
  const [categories, setCategories] = useState<{ id: number; name: string }[]>(
    []
  );
  const navigate = useNavigate();
  useEffect(() => {
    const fetchCategories = async () => {
      const result = await getCategories();
      setCategories(result);
    };
    fetchCategories();
  }, []);

  const onSubmit = async (data: CreateProductFormData) => {
    const categoryIds = getValues("categoryIds");

    const productData: ProductData = {
      ...data,
      price: parseFloat(data.price as any),
      categoryIds: Array.isArray(categoryIds)
        ? categoryIds.map(Number)
        : [Number(categoryIds)],
    };

    try {
      const response = await createProduct(productData, authContext.token!);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("name")}
          placeholder="Product Name"
          className="form-control"
        />

        <input
          {...register("description")}
          placeholder="Description"
          className="form-control"
        />

        <input
          {...register("price", { valueAsNumber: true })}
          placeholder="Price"
          className="form-control"
        />

        <select
          {...register("categoryIds")}
          multiple
          className="form-select form-select-lg mb-3"
          aria-label=".form-select-lg example">
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        <input type="submit" className="btn btn-primary" />
      </form>
      <button onClick={() => navigate("/")}>Back to Home</button>
    </div>
  );
};

export default CreateProduct;
