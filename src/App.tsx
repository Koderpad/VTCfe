import { BrowserRouter, Route, Routes } from "react-router-dom";

import GlobalStyled from "./styles/GlobalStyles";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Register from "./pages/Register";
import MyAccount from "./pages/MyAccount";
import Cart from "./pages/Cart";
import { MyProfile, PasswordChanges } from "./features/userManagement";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="cart" element={<Cart />} />

        {/* user/account */}
        <Route path="user/account" element={<MyAccount />}>
          <Route path="profile" element={<MyProfile />} />
          <Route path="pw_changes" element={<PasswordChanges />} />
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <GlobalStyled />
    </BrowserRouter>
  );
}

export default App;
