import React, { useContext } from "react";
import ProductList from "./components/ProductList";
import Pagination from "./components/Pagination";
import { ProductContext, ProductProvider } from "./context/ProductContext";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import CreateProduct from "./components/CreateProduct";
import EditProduct from "./components/EditProduct";
import Navbar from "./components/Navbar";

const App: React.FC = () => {
  const context = useContext(ProductContext);

  if (!context) {
    return <div>Loading...</div>;
  }

  const { currentPage, totalPages, setCurrentPage } = context;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Router>
      <Navbar />
      <div>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create-product" element={<CreateProduct />} />
          <Route path="/edit-product/:id" element={<EditProduct />} />
          <Route
            path="/"
            element={
              <div>
                <ProductList />
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default function Root() {
  return (
    <AuthProvider>
      <ProductProvider>
        <App />
      </ProductProvider>
    </AuthProvider>
  );
}
