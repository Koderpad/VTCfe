import { BrowserRouter, Route, Routes } from "react-router-dom";

import GlobalStyled from "./styles/GlobalStyles";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Register from "./pages/Register";
import MyAccount from "./pages/MyAccount";
import { MyProfile, PasswordChanges } from "./features/common/userManagement";
import { DetailProduct } from "./pages/DetailProduct";
import RequireAuth from "./features/common/auth/RequireAuth";
import AdminPage from "./pages/admins/AdminPage";
import VendorPage from "./pages/vendors/VendorPage";
import Unauthorized from "./pages/Unauthorized";
import { ProductsByCategory } from "./pages/ProductsByCategory";
import { AddProduct } from "./pages/vendors/AddProduct";
import Cart from "./pages/Cart";
<<<<<<< HEAD
import Address from "./pages/Address";
import PayMent from "./pages/PayMent";
=======
import { ForgotPassword } from "./pages/ForgotPassword";
import { ResetPassword } from "./pages/ResetPassword";
import { FavoriteProducts } from "./features/common/userManagement/components/FavoriteProducts";
import FavoriteProductList from "./features/common/userManagement/components/FavoriteProducts/FavoriteProductList";
import { FollowShopList } from "./features/common/userManagement/components/FollowShopList";
import VoucherList from "./features/common/userManagement/components/VoucherList";
import PayMent from "./pages/PayMent";
import { Home } from "./pages/Home";
>>>>>>> 08b400b55e33385eb39654a29715ea063247804b
// import { DetailProduct } from "./pages/DetailProduct";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
<<<<<<< HEAD
        <Route path="address" element={<Address />} />
        <Route path="payment" element={<PayMent />} />
        {/* LẤY LẠI MẬT KHẨU
            YÊU THÍCH CON CẶC
            THEO DÕI CỬA HÀNG
            ĐƠN HÀNG
            CART
=======
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password" element={<ResetPassword />} />
        <Route path="/" element={<Home />} />

        {/* LẤY LẠI MẬT KHẨU - DONE
            
            
            QUẢN LÝ MÃ GIẢM GIÁ PRROFILE - DONE
            CART - tạm DONE
>>>>>>> 08b400b55e33385eb39654a29715ea063247804b
            THANH TOÁN
            ĐƠN HÀNG
            HOME PAGE
            XEM CỬA HÀNG :>>>
            
            YÊU THÍCH sản phẩm - UI - lỗi api
            THEO DÕI CỬA HÀNG - UI
            ĐƠN MUA
            
            ĐỊA CHỈ 
            ĐÁNH GIÁ VÀ COMMENT
        */}

        <Route path="unauthorized" element={<Unauthorized />} />
        <Route path="product/:productId" element={<DetailProduct />} />
        <Route path="products" element={<ProductsByCategory />} />
        <Route path="product/new" element={<AddProduct />} />

        {/* private routes */}
        <Route element={<RequireAuth allowedRoles={["CUSTOMER", "VENDOR"]} />}>
          {/* user/account */}
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<PayMent />} />
          <Route path="user/account" element={<MyAccount />}>
            <Route path="profile" element={<MyProfile />} />
            <Route path="pw_changes" element={<PasswordChanges />} />
            <Route path="favorite-products" element={<FavoriteProducts />} />
            <Route path="follow-shop" element={<FollowShopList />} />
            <Route path="voucher-wallet" element={<VoucherList />} />
          </Route>
        </Route>

        <Route element={<RequireAuth allowedRoles={["ADMIN"]} />}>
          <Route path="/admin" element={<AdminPage />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={["VENDOR"]} />}>
          <Route path="/vendor" element={<VendorPage />} />
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <GlobalStyled />
    </BrowserRouter>
  );
}

export default App;
