import TextIcon from "../../../components/ui/TextIcon";
import { useState } from "react";

function RegisForm_fix() {
  const [isMaleChecked, setIsMaleChecked] = useState(false);

  const handleCheckboxChange = (isMale: boolean) => setIsMaleChecked(isMale);
  return (
    <>
      <div className="tw-flex tw-w-full tw-max-w-full tw-items-start tw-gap-2.5 tw-max-md:ml-1">
        <form className="tw-space-y-3" action="#">
          {/* tên tài khoản */}
          <div className="tw-flex tw-gap-2">
            <div className="tw-flex">
              <TextIcon
                srcSet="
                /public/account_circle.png
                "
              />
            </div>
            <div className="tw-flex tw-flex-col">
              <input
                className="tw-block tw-w-full tw-bg-transparent tw-border-none focus:tw-outline-none tw-border-0 tw-py-1.5 tw-sm:text-sm tw-sm:leading-6"
                type="text"
                id="username"
                placeholder="Tên Tài Khoản"
              />
            </div>
          </div>
          <div className="tw-bg-neutral-400 tw-w-[427px] tw-h-px tw-max-md:max-w-full" />
          <br />
          {/* mật khẩu */}
          <div className="tw-flex tw-gap-2">
            <div className="tw-flex">
              <TextIcon
                srcSet="
                /public/pass.png
                      "
              />
            </div>
            <div className="tw-flex tw-flex-col">
              <input
                className="tw-block tw-w-full tw-bg-transparent tw-border-none focus:tw-outline-none tw-border-0 tw-py-1.5 tw-sm:text-sm tw-sm:leading-6"
                type="password"
                id="password"
                placeholder="Mật khẩu"
              />
            </div>
          </div>
          <div className="tw-bg-neutral-400 tw-w-[427px] tw-h-px tw-max-md:max-w-full" />
          <br />
          {/* email */}
          <div className="tw-flex tw-gap-2">
            <div className="tw-flex">
              <TextIcon
                srcSet="
                /public/mail.png
                      "
              />
            </div>
            <div className="tw-flex tw-flex-col">
              <input
                className="tw-block tw-w-full tw-bg-transparent tw-border-none focus:tw-outline-none tw-border-0 tw-py-1.5 tw-sm:text-sm tw-sm:leading-6"
                type="email"
                id="email"
                placeholder="Địa chỉ email"
              />
            </div>
          </div>
          <div className="tw-bg-neutral-400 tw-w-[427px] tw-h-px tw-max-md:max-w-full" />
          <br />
          {/* giới tính */}
          <div className="tw-flex tw-gap-2">
            <div className="tw-flex">
              <TextIcon
                srcSet="
                /public/sex.png
                      "
              />
            </div>
            <span>Giới tính</span>
            {/* checkbox select Nam or Nữ */}
            <div className="tw-flex tw-flex-row tw-gap-44 tw-ml-4">
              <div className="tw-flex tw-gap-6 tw-ml-32">
                <label htmlFor="male">Nam</label>
                <input
                  id="male"
                  type="checkbox"
                  name="gender"
                  value="male"
                  checked={isMaleChecked}
                  onChange={() => handleCheckboxChange(true)}
                />
              </div>
              <div className="tw-flex tw-gap-6">
                {/* <br /> */}
                <label htmlFor="female">Nữ</label>
                <input
                  id="female"
                  type="checkbox"
                  name="gender"
                  value="female"
                  checked={!isMaleChecked}
                  onChange={() => handleCheckboxChange(false)}
                />
              </div>

              <br />
            </div>
          </div>
          <br />
          {/* họ và tên */}
          <div className="tw-flex tw-gap-2">
            <div className="tw-flex">
              <TextIcon
                srcSet="
                /public/account_circle.png
                      "
              />
            </div>
            <div className="tw-flex tw-flex-col">
              <input
                className="tw-block tw-w-full tw-bg-transparent tw-border-none focus:tw-outline-none tw-border-0 tw-py-1.5 tw-sm:text-sm tw-sm:leading-6"
                type="text"
                id="fullname"
                placeholder="Họ và tên"
              />
            </div>
          </div>
          <div className="tw-bg-neutral-400 tw-w-[427px] tw-h-px tw-max-md:max-w-full" />
          <br />
          {/* ngày sinh*/}
          <div className="tw-flex tw-gap-2">
            <div className="tw-flex">
              <TextIcon
                srcSet="
                /public/birthday.png
                      "
              />
            </div>
            <span className="tw-mt-5 tw-mr-3">Ngày sinh: </span>
            <div className="tw-flex tw-flex-col tw-mt-3">
              <input
                className="tw-block tw-w-full tw-bg-transparent tw-border-none focus:tw-outline-none tw-border-0 tw-py-1.5 tw-sm:text-sm tw-sm:leading-6"
                type="date"
                id="date"
                placeholder="Ngày sinh"
              />
            </div>
          </div>
          <div className="tw-bg-neutral-400 tw-w-[427px] tw-h-px tw-max-md:max-w-full" />
          <br />
          {/* sđt */}
          {/* <div className="tw-flex tw-gap-2">
            <div className="tw-flex">
              <TextIcon
                srcSet="
                /public/phone.png
                      "
              />
            </div>
            <div className="tw-flex tw-flex-col">
              <input
                name="phone"
                className="tw-block tw-w-full tw-bg-transparent tw-border-none focus:tw-outline-none tw-border-0 tw-py-1.5 tw-sm:text-sm tw-sm:leading-6"
                type="tel"
                id="phone"
                placeholder="Số điện thoại"
              />
            </div>
          </div>
          <div className="tw-bg-neutral-400 tw-w-[427px] tw-h-px tw-max-md:max-w-full" />
          <br /> */}
          {/* checkbox agree đăng ký */}
          <div className="tw-flex tw-gap-2">
            <div className="tw-flex">
              <input type="checkbox" name="agree" />
            </div>
            <div className="tw-flex tw-flex-col">
              <p className="tw-ml-2 tw-font-serif">
                Creating an account means you’re okay with our Terms
              </p>
              <p className="tw-ml-2 tw-font-serif">
                {" "}
                of Service, Privacy Policy, and default Notification Settings
              </p>
            </div>
          </div>
          <br />
          {/* button submit */}
          <div className="tw-flex tw-flex-row tw-gap-2 tw-w-full">
            <button
              type="submit"
              className="tw-border tw-w-[40rem] tw-h-[3rem] tw-shadow-[2px_4px_6px_0px_rgba(79,79,79,0.15)] tw-bg-sky-500 tw-bg-opacity-80 tw-flex min-h-[34px] tw-flex-col tw-rounded-2xl tw-border-solid tw-border-stone-300"
            >
              <div className="tw-text-white tw-font-extrabold tw-text-xl tw-mt-2 tw-self-center">
                Đăng Ký
              </div>
            </button>
            {/* <div className="tw-w-0.5/4"></div> */}
          </div>
        </form>
      </div>
    </>
  );
}

export default RegisForm_fix;
