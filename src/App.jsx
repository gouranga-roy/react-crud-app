import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import ProductList from "./pages/ProductList";
import ProductCreate from "./pages/ProductCreate";
import ProductEdit from "./pages/ProductEdit";
import ProductView from "./pages/ProductView";
import ProductDelete from "./pages/ProductDelete";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Default */}
        <Route
          path="/"
          element={
            <Navigate to="/products" />
          }
        />

        {/* Product List */}
        <Route
          path="/products"
          element={<ProductList />}
        />

        {/* Create */}
        <Route
          path="/products/create"
          element={<ProductCreate />}
        />

        {/* View */}
        <Route
          path="/products/:id"
          element={<ProductView />}
        />

        {/* Edit */}
        <Route
          path="/products/:id/edit"
          element={<ProductEdit />}
        />

        {/* Delete */}
        <Route
          path="/products/:id/delete"
          element={<ProductDelete />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
