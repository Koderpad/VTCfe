import React, { lazy, Suspense } from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyled from "./styles/GlobalStyles";
import Login from "./pages/common/Login.tsx";
import PageNotFound from "./pages/common/PageNotFound.tsx";
import Register from "./pages/common/Register.tsx";
// import MyAccount from "./pages/MyAccount";
import { MyProfile, PasswordChanges } from "./features/common/userManagement";
import { DetailProduct } from "./pages/common/DetailProduct.tsx";
import RequireAuth from "./features/common/auth/RequireAuth";
import { VendorPage } from "./pages/vendors/VendorPage";
import Unauthorized from "./pages/common/Unauthorized.tsx";
import { ProductsByCategory } from "./pages/common/ProductsByCategory.tsx";
import { AddProduct } from "./pages/vendors/AddProduct";
import Cart from "./pages/common/Cart.tsx";
import { ForgotPassword } from "./pages/common/ForgotPassword.tsx";
import { ResetPassword } from "./pages/common/ResetPassword.tsx";
import { FavoriteProducts } from "./features/common/userManagement/components/FavoriteProducts";
import PayMent from "./pages/common/PayMent.tsx";
import { Home } from "./pages/common/Home.tsx";
import Address from "./features/common/userManagement/components/Address";
import ProfileAdmin from "./features/admin/profile";
import CatagoryAdmin from "./features/admin/catagory";
import ProductAdmin from "./features/admin/products";
import StoreAdmin from "./features/admin/store";
import VoucherAdmin from "./features/admin/voucher";
import UserAdmin from "./features/admin/user";
// import { DetailProduct } from "./pages/DetailProduct";
import ManagerCustomer from "./pages/admins/ManagerCustomer";
import ManagerProductLocked from "./pages/admins/ManagerCustomer";
import Statistical from "./pages/vendors/Statistical";
import { AdminReal } from "./pages/admins/AdminReal";
import { OrderDetailsForm } from "./features/common/payment/components/OrderDetailsForm";
import { HistoryPurchase } from "./features/common/userManagement/components/HistoryPurchase";
import { RegisterShop } from "./pages/vendors/RegisterShop";
import AddCategory from "./pages/vendors/AddCategory";
import { Orders } from "./pages/vendors/Orders";
import Categories from "./pages/vendors/Categories";
import UpdateCategory from "./pages/vendors/UpdateCategory";
import ManagerProduct from "./pages/admins/ManagerProduct";
import AddParentCategory from "./pages/admins/AddParentCategory";
import ParentCategories from "./pages/admins/ParentCategories";
import UpdateParentCategory from "./pages/admins/UpdateParentCategory";
import ShopProfile from "./pages/vendors/ShopProfile";
import UpdateShop from "./pages/vendors/UpdateShop";
import VouchersAdmin from "./pages/admins/VouchersAdmin";
import AddVoucherAdmin from "./pages/admins/AddVoucherAdmin";
import UpdateVoucherAdmin from "./pages/admins/UpdateVoucherAdmin";
import Products from "./pages/vendors/Products";
import VouchersShop from "./pages/vendors/VouchersShop";
import AddVoucherShop from "./pages/vendors/AddVoucherShop";
import UpdateVoucherShop from "./pages/vendors/UpdateVoucherShop";
import AddReview from "./pages/common/AddReview.tsx";
import Review from "./pages/common/Review.tsx";
import { UpdateProduct } from "./pages/vendors/UpdateProduct.tsx";
import { OrderDetailShopForm } from "./features/vendor/payment/components/OrderDetailShopForm.tsx";
import { ProductsBySearch } from "./pages/common/ProductsBySearch.tsx";
import VoucherList from "./features/common/userManagement/components/VoucherList.tsx";

const MyAccount = lazy(() => import("./pages/common/MyAccount.tsx"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* public routes */}
          <Route path="login" element={<Login />} />
          <Route
            path="/search/:keyword/page/:page/size/:size"
            element={<ProductsBySearch />}
          />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="unauthorized" element={<Unauthorized />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="home" element={<Home />} index />
          <Route path="/" element={<Home />} />
          <Route path="product/:productId" element={<DetailProduct />} />

          {/* private routes */}
          <Route element={<RequireAuth allowedRoles={["CUSTOMER"]} />}>
            {/* <Route path="address" element={<Address />} /> */}
            <Route path="products/:id" element={<ProductsByCategory />} />
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<PayMent />} />
            <Route path="checkout/:id" element={<OrderDetailsForm />} />

            <Route path="user/account" element={<MyAccount />}>
              <Route path="profile" element={<MyProfile />} />
              <Route path="pw_changes" element={<PasswordChanges />} />
              <Route path="favorite-products" element={<FavoriteProducts />} />
              <Route path="voucher-wallet" element={<VoucherList />} />
              <Route path="address" element={<Address />} />
              <Route path="history-purchase" element={<HistoryPurchase />} />
              <Route
                path="checkout/add/review/order-item/:id"
                element={<AddReview />}
              />
              <Route
                path="checkout/review/order-item/:id"
                element={<Review />}
              />
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
              <Route path="vouchers" element={<VouchersAdmin />} />
              <Route path="voucher/add" element={<AddVoucherAdmin />} />
              <Route path="voucher/edit/:id" element={<UpdateVoucherAdmin />} />
            </Route>
            <Route path="admin/profile" element={<ProfileAdmin />} />
            <Route path="admin/category" element={<CatagoryAdmin />} />
            <Route path="admin/product" element={<ProductAdmin />} />
            <Route path="admin/store" element={<StoreAdmin />} />
            <Route path="admin/voucher" element={<VoucherAdmin />} />
            <Route path="admin/user" element={<UserAdmin />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={["VENDOR"]} />}>
            <Route path="/vendor/register" element={<RegisterShop />} />
            <Route path="/vendor" element={<VendorPage />}>
              <Route path="shop/statistical" element={<Statistical />} />
              <Route path="shop/orders" element={<Orders />} />
              <Route
                path="shop/checkout/:id"
                element={<OrderDetailShopForm />}
              />
              <Route path="shop/profile" element={<ShopProfile />} />
              <Route path="shop/edit" element={<UpdateShop />} />
              <Route path="shop/categories" element={<Categories />} />
              <Route path="shop/category/add" element={<AddCategory />} />
              <Route
                path="shop/category/edit/:id"
                element={<UpdateCategory />}
              />
              <Route path="shop/vouchers" element={<VouchersShop />} />
              <Route path="shop/voucher/add" element={<AddVoucherShop />} />
              <Route
                path="shop/voucher/edit/:id"
                element={<UpdateVoucherShop />}
              />
              <Route path="shop/products" element={<Products />} />
              <Route path="product/new" element={<AddProduct />} />
              <Route path="product/edit/:id" element={<UpdateProduct />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>

      <GlobalStyled />
    </BrowserRouter>
  );
}

export default App;
