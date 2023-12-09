import { useState } from "react";

function PasswordChanges() {
  const [oldpw, setOldpw] = useState("");
  const [newpw, setNewpw] = useState("");

  const handleOldpwChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOldpw(event.target.value);
  };

  const handleNewpwChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewpw(event.target.value);
  };

  return (
    <>
      <div className="bg-green-600 w-full h-full">
        <div className="h-full w-full p-10 bg-white">
          <h1 className="text-red-600 text-4xl pb-6">Đổi mật khẩu</h1>
          <h2 className="text-gray-500 text-2xl pb-6">
            Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người khác
          </h2>
          <div>
            <form className="w-full flex" action="#">
              <div className="flex justify-between items-center w-full gap-5 relative">
                <div className="flex flex-col w-1/2 gap-4 absolute left-1/2 top-40 transform -translate-x-1/2 -translate-y-1/2">
                  <div className={`flex flex-col w-full mb-4`}>
                    <label className="block text-gray-700 mb-2" htmlFor="oldpw">
                      Mật khẩu cũ
                    </label>
                    <input
                      className="w-4/5 bg-gray-200 border border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:bg-white focus:border-gray-500 focus:outline-none"
                      id="oldpw"
                      name="oldpw"
                      type="password"
                      value={oldpw}
                      onChange={handleOldpwChange}
                    />
                  </div>
                  <div className={`block w-full mb-4`}>
                    <label className="block text-gray-700 mb-2" htmlFor="newpw">
                      Mật khẩu mới
                    </label>
                    <input
                      className="w-4/5 bg-gray-200 border border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:bg-white focus:border-gray-500 focus:outline-none"
                      id="newpw"
                      name="newpw"
                      type="password"
                      value={newpw}
                      onChange={handleNewpwChange}
                    />
                  </div>
                  <button
                    type="reset"
                    className="w-1/4 py-3 px-4 inline-flex items-center justify-center gap-x-2 text-xl font-semibold rounded-lg border border-transparent bg-gray-800 text-white hover:bg-gray-900 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:bg-white dark:text-gray-800"
                  >
                    Lưu
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default PasswordChanges;
