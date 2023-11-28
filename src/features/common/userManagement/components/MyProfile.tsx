import { useState, useEffect } from "react";
import DatePickerAsSingle from "../../../../components/form/DatePickerAsSingle";
import CustomInput from "../../../../components/ui/Label-Input_EditProfile";
import ModalSaveInf from "../../../../components/ui/ModalSaveInf";
import { useGetUserQuery } from "../services/userApi.js";
import { useUpdateUserMutation } from "../services/userApi.js";
import { persistor, useAppSelector } from "../../../../app/store.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut } from "../../auth/authSlice.js";

function MyProfile() {
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch(); // eslint-disable-line @typescript-eslint/no-unused-vars
  const navigate = useNavigate();

  const username = useAppSelector(
    (state) => (state.auth.user as unknown as { username: string })?.username
  );
  console.log(username);

  //attribute profile
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  // const [phone, setPhone] = useState("");
  const [_birthday, setBirthDay] = useState<string>("");
  const [gender, setGender] = useState<string>("");

  //call api profile
  const { data, refetch } = useGetUserQuery(undefined);
  const [updateUser] = useUpdateUserMutation();

  // set date when load page
  useEffect(() => {
    if (data) {
      setFullName(data.customerDTO.fullName);
      setEmail(data.customerDTO.email);

      console.log(data.customerDTO);

      try {
        if (data?.customerDTO.birthday) {
          const [year, month, day] = data.customerDTO.birthday
            .substring(0, 10)
            .split("-");
          console.log("chuoi date: ", year, month, day);
          const date = new Date(year, month - 1, day);
          setBirthDay(date.toLocaleDateString());
          console.log("date:   ", Intl.DateTimeFormat("vi-VN").format(date));
        } else {
          console.error("Birthday is undefined");
        }
      } catch (error) {
        console.error(`Invalid date string: ${data.birthday}`);
      }
      setGender(data.customerDTO.gender ? "male" : "female");
    }
  }, [data]);

  // Refetch data when component loads
  useEffect(() => {
    refetch();
  }, [refetch]);

  // #region Event handlers
  const handleFullNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFullName(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  // const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setPhone(event.target.value);
  // };

  const handleDateChange = (date: Date) => {
    setBirthDay(date.toLocaleString());
  };

  const handleGenderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setGender(event.target.value);
  };
  // #endregion Event handlers

  //submitting
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Convert date string to date-time string
    const dateString = Intl.DateTimeFormat("vi-VN").format(new Date(_birthday));
    const [day, month, year] = dateString.split("/");
    const birthday = `${year}-${month}-${day}`;

    const requestBody = {
      username,
      email,
      fullName,
      birthday,
      gender: gender === "male",
    };

    try {
      const dateUpdate = await updateUser(requestBody);
      console.log("date update trong myprofile sau khi callAPI: ", dateUpdate);
      if (
        (dateUpdate as { error: { status: number } })?.error?.status === 403
      ) {
        dispatch(logOut());

        navigate("/login");

        await persistor.purge();
      }
    } catch (error) {
      console.error(error);
    }

    setOpen(false);
  };

  return (
    <>
      <div className="bg-green-600 w-full h-full">
        <div className="h-full w-full p-10 bg-white">
          <h1 className="text-red-600 text-4xl pb-6">Edit Your Profile</h1>
          <div>
            <form className="w-full" action="#">
              <div className="flex justify-between w-full gap-5">
                <div className="flex flex-col w-2/5 gap-4">
                  <CustomInput
                    labelText="Họ và tên"
                    labelFor="name"
                    inputId="name"
                    inputType="text"
                    inputValue={fullName}
                    handleInputChange={handleFullNameChange}
                  />
                  <CustomInput
                    labelText="Email"
                    labelFor="email"
                    inputId="email"
                    inputType="email"
                    inputValue={email}
                    handleInputChange={handleEmailChange}
                  />
                  <CustomInput
                    labelText="SĐT"
                    labelFor="phone"
                    inputId="phone"
                    inputType="phone"
                    inputValue={"none"}
                    handleInputChange={() => null}
                  />
                </div>
                <div className="flex flex-col w-2/5 gap-4">
                  <DatePickerAsSingle
                    labelFor="birthdate"
                    labelText="Ngày sinh"
                    _setStartDate={_birthday ? new Date(_birthday) : new Date()}
                    handleChange={handleDateChange}
                  />
                  <div className="block w-[63%] mb-4">
                    <label
                      className="block text-gray-700 mb-2"
                      htmlFor="gender"
                    >
                      Giới tính
                    </label>
                    <select
                      id="gender"
                      className="w-full bg-gray-200 border border-gray-300 text-gray-900 text-2xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                      value={gender}
                      onChange={handleGenderChange}
                    >
                      <option value="male">Nam</option>
                      <option value="female">Nữ</option>
                    </select>
                  </div>
                  {/* submit */}
                  <div className="block relative justify-center">
                    <button
                      type="button"
                      onClick={() => setOpen(true)}
                      className="w-1/3 -bottom-60 left-44 absolute bg-blue-500 text-white font-bold py-6 px-6 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    >
                      Cập nhật
                    </button>
                    <ModalSaveInf open={open} onClose={() => setOpen(false)}>
                      <div className="text-center w-auto">
                        <div className="w-full h-full flex justify-center">
                          <img className="w-1/5" src="/public/edit_info.svg" />
                        </div>
                        <div className="mx-auto my-4 w-full">
                          <h3 className="text-2xl font-black text-gray-800">
                            Xác nhận chỉnh sửa
                          </h3>
                          <p className="text-lg text-gray-500">
                            Bạn có chắc chắn muốn thay đổi thông tin không?
                          </p>
                        </div>
                        <div className="flex justify-between gap-20">
                          <button
                            type="button"
                            className=" w-2/3 shadow-2xl bg-blue-500 text-white font-bold rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            onClick={() => setOpen(false)}
                          >
                            Hủy
                          </button>
                          <button
                            type="submit"
                            className="w-2/3  shadow-2xl bg-red-600 text-white font-bold py-4 px-4 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            // onClick={() => setOpen(false)}
                            onClick={handleSubmit}
                          >
                            Xác nhận
                          </button>
                        </div>
                      </div>
                    </ModalSaveInf>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyProfile;
