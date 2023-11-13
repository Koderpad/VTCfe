import { Routes, Route } from "react-router-dom";
import MyProfile from "../components/MyProfile";
import PasswordChanges from "../components/PasswordChanges";

function UserRoutes() {
  return (
    <Routes>
      <Route path="profile" element={<MyProfile />} />
      <Route path="pw_changes" element={<PasswordChanges />} />
    </Routes>
  );
}

export default UserRoutes;
