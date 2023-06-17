import axios from "axios";

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface ProductData {
  name: string;
  description: string;
  price: number;
  categoryIds: number[];
}

export interface ProductUpdateData {
  name: string;
  description: string;
  price: number;
  categoryIds: number[];
}

const baseURL = "https://belanja.up.railway.app/";

const api = axios.create({
  baseURL,
});

export const fetchProducts = async (
  page: number,
  categoryId: number | null
) => {
  let url = `https://belanja.up.railway.app/products?page=${page}`;
  if (categoryId) {
    url = url + `&categoryId=${categoryId}`;
  }
  console.log("Sending GET request to: ", url);
  const response = await axios.get(url);
  return response.data;
};

export const registerUser = async (userData: RegisterData) => {
  try {
    const response = await api.post("/auth/register", userData);
    return response.data;
  } catch (error) {
    console.error("Failed to register user: ", error);
    throw error;
  }
};

export const loginUser = async (loginData: LoginData) => {
  try {
    const response = await api.post("/auth/login", loginData);
    if (response.data && response.data.userId) {
      localStorage.setItem("userId", response.data.userId);
    }
    return response.data;
  } catch (error) {
    console.error("Failed to login user: ", error);
    throw error;
  }
};

export const createProduct = async (
  productData: ProductData,
  token: string
) => {
  try {
    const response = await api.post("/products", productData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to create product: ", error);
    throw error;
  }
};

export const getCategories = async () => {
  const response = await axios.get("https://belanja.up.railway.app/categories");
  return response.data;
};

export const getCategoryById = async (id: number) => {
  const response = await axios.get(
    `https://belanja.up.railway.app/categories/${id}`
  );
  return response.data;
};

export const editProduct = async (
  id: number,
  productData: ProductUpdateData,
  token: string
): Promise<ProductData> => {
  try {
    console.log("Sending the following data:", productData);
    const response = await api.put(
      `/products/${id}`,
      {
        ...productData,
        categoryIds: productData.categoryIds,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to edit product: ", error);
    throw error;
  }
};

export const getProduct = async (
  id: number,
  token: string
): Promise<ProductData> => {
  try {
    const response = await api.get(`/products/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to get product: ", error);
    throw error;
  }
};

export const deleteProduct = async (id: number, token: string) => {
  try {
    await api.delete(`/products/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Failed to delete product: ", error);
    throw error;
  }
};
