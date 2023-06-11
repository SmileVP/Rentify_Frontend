import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AdminLogin from "./Admin/AdminLogin";
import Dashboard from "./components/Dashboard";
import CustomerLogin from "./components/CustomerLogin";
import CustomerSignUp from "./components/CustomerSignUp";
import Navigation from "./components/Navigation";
import Products from "./products/Products";
import SuccessOrder from "./products/SuccessOrder";
import Cart from "./products/Cart";
import AdminHome from "./Admin/AdminHome";
import AllOrders from "./Admin/AllOrders";
import AllProducts from "./Admin/AllProducts";
import AddProducts from "./Admin/AddProducts";
import OrderStatus from "./Admin/OrderStatus";
import OrderedItems from "./products/OrderedItems";
import AdminSignUp from "./Admin/AdminSignUp";
import ForgetPassword from "./components/ForgetPassword";
import ResetPassword from "./components/ResetPassword";
import AdminForgotPassword from "./Admin/AdminForgotPassword";
import AdminResetPassword from "./Admin/AdminResetPassword";

//backend url
 export const url = "https://rentify-backend-w85a.onrender.com";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path="/admin-sign-up" element={<AdminSignUp />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route
            path="/admin-forgotPassword"
            element={<AdminForgotPassword />}
          />
          <Route
            path="/admin-reset-password/:id/:token"
            element={<AdminResetPassword />}
          />
          <Route path="/customer-login" element={<CustomerLogin />} />
          <Route path="/forgetPassword" element={<ForgetPassword />} />
          <Route
            path="/reset-password/:id/:token"
            element={<ResetPassword />}
          />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/customer-sign-up" element={<CustomerSignUp />} />
          <Route path="/navbar" element={<Navigation />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<OrderedItems />} />
          <Route path="/success" element={<SuccessOrder />} />
          <Route path="/adminHome" element={<AdminHome />}>
            <Route path="all-orders" element={<AllOrders />} />
            <Route path="add-products" element={<AddProducts />} />
            <Route path="edit-products/:id" element={<AddProducts />} />
            <Route path="all-products" element={<AllProducts />} />
            <Route path="order-status" element={<OrderStatus />} />
          </Route>
          <Route path="*" element={<Navigate to="/Dashboard" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
