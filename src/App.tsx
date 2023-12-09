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
// import { DetailProduct } from "./pages/DetailProduct";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        {/* LẤY LẠI MẬT KHẨU
            YÊU THÍCH CON CẶC
            THEO DÕI CỬA HÀNG
            ĐƠN HÀNG
            CART
            THANH TOÁN
            QUẢN LÝ MÃ GIẢM GIÁ PRROFILE
            ĐÁNH GIÁ VÀ COMMENT
        */}

        <Route path="unauthorized" element={<Unauthorized />} />
        <Route path="product" element={<DetailProduct />} />
        <Route path="products" element={<ProductsByCategory />} />
        <Route path="product/new" element={<AddProduct />} />

        {/* private routes */}
        <Route element={<RequireAuth allowedRoles={["CUSTOMER", "VENDOR"]} />}>
          {/* user/account */}
          <Route path="cart" element={<Cart />} />
          <Route path="user/account" element={<MyAccount />}>
            <Route path="profile" element={<MyProfile />} />
            <Route path="pw_changes" element={<PasswordChanges />} />
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
