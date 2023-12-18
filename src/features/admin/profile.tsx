import { useState } from "react";
import Sidebar from "./sidebar";

const ProfileAdmin: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (

    <div className="flex">
              <Sidebar/>
      <div className="flex-grow">
        <div className="shadow-md sm:rounded-lg w-[1000px] m-auto mt-20">
          <div className="bg-white p-6">
            <h1 className="text-2xl font-bold mb-4">Thông tin cá nhân</h1>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <label htmlFor="full-name" className="w-32 font-bold">
                  Họ tên:
                </label>
                <div className="border border-black rounded-lg">
                  <input
                    type="text"
                    id="full-name"
                    className="rounded-lg border-gray-300 px-3 py-2 "
                    value="John Doe"
                    readOnly
                  />
                </div>
                
              </div>
              <div className="flex items-center space-x-2">
                <label htmlFor="dob" className="w-32 font-bold">
                  Ngày sinh:
                </label>
                <div className="border border-black rounded-lg">
                  <input
                      type="text"
                      id="dob"
                      className="rounded-lg border-gray-300 px-3 py-2"
                      value="01/01/1990"
                      readOnly
                    />
                </div>

              </div>
              <div className="flex items-center space-x-2">
                <label htmlFor="email" className="w-32 font-bold">
                  Email:
                </label>
                <div className="border border-black rounded-lg">
                  <input
                    type="text"
                    id="email"
                    className="rounded-lg border-gray-300 px-3 py-2"
                    value="johndoe@example.com"
                    readOnly
                  />
                </div>
               
              </div>
 
              <div className="flex justify-end">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Chỉnh sửa thông tin
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="shadow-md sm:rounded-lg w-[1000px] m-auto mt-4">
          <div className="bg-white p-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <label htmlFor="username" className="w-32 font-bold">
                  Tài khoản:
                </label>
                <div className="border border-black rounded-lg">
                  <input
                    type="text"
                    id="username"
                    className="rounded-lg border-gray-300 px-3 py-2"
                    value="johndoe123"
                    readOnly
                  />
                </div>
                
              </div>
              <div className="flex items-center space-x-2">
                <label htmlFor="password" className="w-32 font-bold">
                  Mật khẩu:
                </label>
                <div className="relative border border-black rounded-lg">
              
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    className="rounded-lg border-gray-300 px-3 py-2 pr-10"
                    value="123456"
                    readOnly
                  />
                  <input
                    type="checkbox"
                    className="absolute top-1/2 right-3 transform -translate-y-1/2"
                    checked={showPassword}
                    onChange={() => setShowPassword(!showPassword)}
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Đổi mật khẩu
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileAdmin;