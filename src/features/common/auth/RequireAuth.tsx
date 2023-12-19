import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useUser } from "../../../hooks/states/useUser";

const RequireAuth = ({ allowedRoles }: { allowedRoles: string[] }) => {
  const user = useUser();
  const location = useLocation();

  return user &&
    user.roles?.find((role: string) => allowedRoles.includes(role)) ? (
    <Outlet />
  ) : user ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;

//-----------------------------------------
// import { useLocation, Navigate, Outlet } from "react-router-dom";
// import { useUser } from "../../../hooks/states/useUser";

// const RequireAuth = ({ allowedRoles }: { allowedRoles: string[] }) => {
//   const user = useUser();
//   const location = useLocation();

//   // Kiểm tra xem người dùng có đăng nhập và có vai trò là "CUSTOMER" không
//   const isCustomer = user && user.roles?.includes("CUSTOMER");

//   return user && isCustomer ? (
//     // Nếu là "CUSTOMER", chuyển hướng đến trang HOME
//     <Navigate to="register" replace />
//   ) : user &&
//     user.roles?.find((role: string) => allowedRoles.includes(role)) ? (
//     // Nếu có vai trò hợp lệ, render nội dung trang
//     <Outlet />
//   ) : user ? (
//     // Nếu có đăng nhập nhưng không có vai trò hợp lệ, chuyển hướng đến trang "unauthorized"
//     <Navigate to="/unauthorized" state={{ from: location }} replace />
//   ) : (
//     // Nếu chưa đăng nhập, chuyển hướng đến trang "login"
//     <Navigate to="/login" state={{ from: location }} replace />
//   );
// };

// export default RequireAuth;

// import { useLocation, Navigate, Outlet, useNavigate } from "react-router-dom";
// import { useUser } from "../../../hooks/states/useUser";

// const RequireAuth = ({ allowedRoles }: { allowedRoles: string[] }) => {
//   const user = useUser();
//   const navigate = useNavigate();

//   const isCustomer = user && user.roles?.includes("CUSTOMER");

//   return user && isCustomer ? (
//     // Nếu là "CUSTOMER", chuyển hướng đến trang HOME
//     navigate("/home", { replace: true })
//   ) : user &&
//     user.roles?.find((role: string) => allowedRoles.includes(role)) ? (
//     // Nếu có vai trò hợp lệ, render nội dung trang
//     <Outlet />
//   ) : user ? (
//     // Nếu có đăng nhập nhưng không có vai trò hợp lệ, chuyển hướng đến trang "unauthorized"
//     navigate("/unauthorized", { state: { from: location }, replace: true })
//   ) : (
//     // Nếu chưa đăng nhập, chuyển hướng đến trang "login"
//     navigate("/login", { state: { from: location }, replace: true })
//   );
// };
// export default RequireAuth;
