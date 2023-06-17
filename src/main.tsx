import { createRoot } from "react-dom/client";
import "./global.css";
import { ProductProvider } from "./context/ProductContext";
import App from "./App";

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);
root.render(
  <ProductProvider>
    <App />
  </ProductProvider>
);
