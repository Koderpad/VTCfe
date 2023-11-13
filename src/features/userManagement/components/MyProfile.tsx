import { useState, useEffect } from "react";
import DatePickerAsSingle from "../../../components/form/DatePickerAsSingle";
import CustomInput from "../../../components/ui/Label-Input_EditProfile";
import ModalSaveInf from "../../../components/ui/ModalSaveInf";
import { useGetUserQuery } from "../services/userApi.js";
import { useUpdateUserMutation } from "../services/userApi.js";
import { persistor, useAppSelector } from "../../../app/store.js";
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
      <div className="tw-bg-green-600 tw-w-full tw-h-full">
        <div className="tw-h-full tw-w-full tw-p-10 tw-bg-white">
          <h1 className="tw-text-red-600 tw-text-4xl tw-pb-6">
            Edit Your Profile
          </h1>
          <div>
            <form className="tw-w-full" action="#">
              <div className="tw-flex tw-justify-between tw-w-full tw-gap-5">
                <div className="tw-flex tw-flex-col tw-w-2/5 tw-gap-4">
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
                <div className="tw-flex tw-flex-col tw-w-2/5 tw-gap-4">
                  <DatePickerAsSingle
                    labelFor="birthdate"
                    labelText="Ngày sinh"
                    _setStartDate={_birthday ? new Date(_birthday) : new Date()}
                    handleChange={handleDateChange}
                  />
                  <div className="tw-block tw-w-[63%] tw-mb-4">
                    <label
                      className="tw-block tw-text-gray-700 tw-mb-2"
                      htmlFor="gender"
                    >
                      Giới tính
                    </label>
                    <select
                      id="gender"
                      className="tw-w-full tw-bg-gray-200 tw-border tw-border-gray-300 tw-text-gray-900 tw-text-2xl tw-rounded-lg focus:tw-ring-blue-500 focus:tw-border-blue-500 tw-block tw-p-2.5"
                      value={gender}
                      onChange={handleGenderChange}
                    >
                      <option value="male">Nam</option>
                      <option value="female">Nữ</option>
                    </select>
                  </div>
                  {/* submit */}
                  <div className="tw-block tw-relative tw-justify-center">
                    <button
                      type="button"
                      onClick={() => setOpen(true)}
                      className="tw-w-1/3 -tw-bottom-60 tw-left-44 tw-absolute tw-bg-blue-500 tw-text-white tw-font-bold tw-py-6 tw-px-6 tw-rounded-lg focus:tw-ring-blue-500 focus:tw-border-blue-500"
                    >
                      Cập nhật
                    </button>
                    <ModalSaveInf open={open} onClose={() => setOpen(false)}>
                      <div className="tw-text-center tw-w-auto">
                        <div className="tw-w-full tw-h-full tw-flex tw-justify-center">
                          <img
                            className="tw-w-1/5"
                            src="/public/edit_info.svg"
                          />
                        </div>
                        <div className="tw-mx-auto tw-my-4 tw-w-full">
                          <h3 className="tw-text-2xl tw-font-black tw-text-gray-800">
                            Xác nhận chỉnh sửa
                          </h3>
                          <p className="tw-text-lg tw-text-gray-500">
                            Bạn có chắc chắn muốn thay đổi thông tin không?
                          </p>
                        </div>
                        <div className="tw-flex tw-justify-between tw-gap-20">
                          <button
                            type="button"
                            className=" tw-w-2/3 tw-shadow-2xl tw-bg-blue-500 tw-text-white tw-font-bold tw-rounded-lg focus:tw-ring-blue-500 focus:tw-border-blue-500"
                            onClick={() => setOpen(false)}
                          >
                            Hủy
                          </button>
                          <button
                            type="submit"
                            className="tw-w-2/3  tw-shadow-2xl tw-bg-red-600 tw-text-white tw-font-bold tw-py-4 tw-px-4 tw-rounded-lg focus:tw-ring-blue-500 focus:tw-border-blue-500"
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
