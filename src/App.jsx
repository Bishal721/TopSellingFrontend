import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ErrorPage from "./error/ErrorPage";
axios.defaults.withCredentials = true;
import Home from "./pages/Home";
import HomeLayout from "./components/layout/HomeLayout";
import Layout from "./components/layout/Layout";
import Products from "./pages/Products";
import TopProducts from "./pages/TopProducts";
import TopCustomers from "./pages/TopCustomers";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route
          path="/"
          element={
            <HomeLayout>
              <Home />
            </HomeLayout>
          }
        />
        <Route
          path="/products"
          element={
            <Layout>
              <Products />
            </Layout>
          }
        />
        <Route
          path="/topProducts"
          element={
            <Layout>
              <TopProducts />
            </Layout>
          }
        />
        <Route
          path="/customers"
          element={
            <Layout>
              <TopCustomers />
            </Layout>
          }
        />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
