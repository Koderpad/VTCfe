import React, { lazy, Suspense } from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyled from "./styles/GlobalStyles";

const MyAccount = lazy(() => import("./pages/MyAccount"));
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Register from "./pages/Register";
// import MyAccount from "./pages/MyAccount";
import { MyProfile, PasswordChanges } from "./features/common/userManagement";
import { DetailProduct } from "./pages/DetailProduct";
import RequireAuth from "./features/common/auth/RequireAuth";
import AdminPage from "./pages/admins/AdminPage";
import { VendorPage } from "./pages/vendors/VendorPage";
import Unauthorized from "./pages/Unauthorized";
import { ProductsByCategory } from "./pages/ProductsByCategory";
import { AddProduct } from "./pages/vendors/AddProduct";
import Cart from "./pages/Cart";
import { ForgotPassword } from "./pages/ForgotPassword";
import { ResetPassword } from "./pages/ResetPassword";
import { FavoriteProducts } from "./features/common/userManagement/components/FavoriteProducts";
import { FollowShopList } from "./features/common/userManagement/components/FollowShopList";
import VoucherList from "./features/common/userManagement/components/VoucherList";
import PayMent from "./pages/PayMent";
import { Home } from "./pages/Home";
import Address from "./features/common/userManagement/components/Address";
import ProfileAdmin from "./features/admin/profile";
import CatagoryAdmin from "./features/admin/catagory";
import ProductAdmin from "./features/admin/products";
import StoreAdmin from "./features/admin/store";
import VoucherAdmin from "./features/admin/voucher";
import UserAdmin from "./features/admin/user";
// import { DetailProduct } from "./pages/DetailProduct";
import ManagerCustomer from "./pages/admins/ManagerCustomer";
import Statistical from "./pages/vendors/Statistical";
import { AdminReal } from "./pages/admins/AdminReal";
import { OrderDetailsForm } from "./features/common/payment/components/OrderDetailsForm";
import { HistoryPurchase } from "./features/common/userManagement/components/HistoryPurchase";
import { Abc } from "./features/vendor/managerShop/abcxyz";
import { RegisterShop } from "./pages/vendors/RegisterShop";
import AddCategory from "./pages/vendors/AddCategory";
import { Orders } from "./pages/vendors/Orders";
import Categories from "./pages/vendors/Categories";
import UpdateCategory from "./pages/vendors/UpdateCategory";
import ManagerProduct from "./pages/admins/ManagerProduct";

import ManagerProductLocked from "./pages/admins/ManagerCustomer";
import AddParentCategory from "./pages/admins/AddParentCategory";
import ParentCategories from "./pages/admins/ParentCategories";
import UpdateParentCategory from "./pages/admins/UpdateParentCategory";
import ShopProfile from "./pages/vendors/ShopProfile";
import UpdateShop from "./pages/vendors/UpdateShop";
import Products from "./pages/vendors/Products";
function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* public routes */}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="unauthorized" element={<Unauthorized />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="home" element={<Home />} index />
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<Abc />} />
          <Route path="/vendor/register" element={<RegisterShop />} />

          {/* <Route path="unauthorized" element={<Unauthorized />} /> */}
          {/* <Route path="product/:productId" element={<DetailProduct />} />
        <Route path="products" element={<ProductsByCategory />} /> */}
          {/* private routes */}
          <Route element={<RequireAuth allowedRoles={["CUSTOMER"]} />}>
            {/* user/account */}
            {/* <Route path="home" element={<Home />} index />
          <Route path="/" element={<Home />} /> */}
            <Route path="address" element={<Address />} />
            {/* <Route path="-vtc.:id" element={<ProductsByCategory />} /> */}
            <Route path="products/:id" element={<ProductsByCategory />} />
            <Route path="product/:productId" element={<DetailProduct />} />
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<PayMent />} />
            <Route path="checkout/:id" element={<OrderDetailsForm />} />
            <Route path="user/account" element={<MyAccount />}>
              <Route path="profile" element={<MyProfile />} />
              <Route path="pw_changes" element={<PasswordChanges />} />
              <Route path="favorite-products" element={<FavoriteProducts />} />
              <Route path="follow-shop" element={<FollowShopList />} />
              <Route path="voucher-wallet" element={<VoucherList />} />
              <Route path="address" element={<Address />} />
              <Route path="history-purchase" element={<HistoryPurchase />} />
            </Route>
          </Route>

          <Route element={<RequireAuth allowedRoles={["ADMIN"]} />}>
            {/* <Route path="/admin" element={<AdminPage />} /> */}
            <Route path="/admin" element={<AdminReal />}>
              <Route path="manager/customers" element={<ManagerCustomer />} />
              <Route
                path="manager/products/locked"
                element={<ManagerProductLocked />}
              />
              <Route path="category/add" element={<AddParentCategory />} />
              <Route path="categories" element={<ParentCategories />} />
              <Route
                path="category/edit/:id"
                element={<UpdateParentCategory />}
              />
              <Route path="manager/products" element={<ManagerProduct />} />
            </Route>
            <Route path="admin/profile" element={<ProfileAdmin />} />
            <Route path="admin/category" element={<CatagoryAdmin />} />
            <Route path="admin/product" element={<ProductAdmin />} />
            <Route path="admin/store" element={<StoreAdmin />} />
            <Route path="admin/voucher" element={<VoucherAdmin />} />
            <Route path="admin/user" element={<UserAdmin />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={["VENDOR"]} />}>
            <Route path="/vendor" element={<VendorPage />}>
              <Route path="shop/statistical" element={<Statistical />} />
              <Route path="shop/orders" element={<Orders />} />
              <Route path="product/new" element={<AddProduct />} />
              <Route path="shop/category/add" element={<AddCategory />} />
              <Route path="shop/category/add" element={<AddCategory />} />
              <Route path="shop/categories" element={<Categories />} />
              <Route path="shop/profile" element={<ShopProfile />} />
              <Route path="shop/edit" element={<UpdateShop />} />
              <Route
                path="shop/category/edit/:id"
                element={<UpdateCategory />}
              />
              <Route path="shop/products" element={<Products />} />
            </Route>
          </Route>

          {/* <Route path="*" element={<PageNotFound />} /> */}
        </Routes>
      </Suspense>

      <GlobalStyled />
    </BrowserRouter>
  );
}

export default App;
