import RegisForm_fix from "../features/auth/components/RegisForm_fix.js";

function Register_rightSide() {
  return (
    // <section className="tw-border tw-bg-cyan-100 tw-grow tw-w-full tw-mx-auto tw-px-5 tw-border-solid tw-border-neutral-700 tw-max-md:max-w-full">
    <div className="tw-flex tw-max-md:flex-col tw-max-md:items-stretch tw-max-md:gap-0">
      <div className="tw-flex tw-items-stretch tw-w-[19%] tw-max-md:w-full tw-max-md:ml-0">
        <img
          loading="lazy"
          srcSet="/public/Element_1_Regis.png"
          className="tw-w-[131px] tw-h-auto tw-aspect-auto tw-overflow-hidden tw-grow tw-self-end tw-max-md:mt-10"
          alt="Image"
        />
      </div>
      <div className="tw-flex tw-flex-col tw-items-stretch tw-w-[81%] tw-ml-5 tw-max-md:w-full tw-max-md:ml-0">
        <div className="tw-flex tw-flex-col tw-max-md:max-w-full tw-max-md:mt-5">
          {/* col 1 */}
          <div className="tw-w-full tw-h-[150px] tw-max-w-full">
            <div className="tw-gap-5 tw-flex tw-max-md:flex-col tw-max-md:items-stretch tw-max-md:gap-0">
              {/* hình ảnh lgo */}
              {/* <div className="tw-flex tw-flex-col tw-items-end tw-w-3/5 tw-max-md:w-full tw-max-md:ml-0">
                <img
                  loading="lazy"
                  srcSet="/public/logo_border.png"
                  className="tw-aspect-auto tw-object-cover tw-object-center tw-w-[200px] tw-h-[150px] tw-overflow-hidden tw-grow tw-mt-3 tw-max-md:mt-10"
                  alt="Image"
                />
              </div> */}
              <div className="tw-flex tw-flex-col tw-items-end tw-place-content-end tw-w-3/5 tw-max-md:w-full tw-max-md:ml-0 tw-mt-">
                <h1 className="tw-text-sky-500 tw-text-8xl tw-font-semibold ">
                  Đăng Ký
                </h1>
              </div>
              {/* hình ảnh bên trang trí bên phải */}
              <div className="tw-flex tw-flex-col tw-items-stretch tw-w-2/5 tw-ml-5 tw-max-md:w-full tw-max-md:ml-0">
                <img
                  loading="lazy"
                  srcSet="/public/Element_1_Regis.png"
                  className="tw-ml-36 tw-aspect-auto tw-object-cover tw-object-center tw-w-[141px] tw-overflow-hidden tw-max-w-full tw-max-md:mt-10"
                  alt="Image"
                />
              </div>
            </div>
          </div>
          {/* col 2 */}
          {/* đăng ký text */}
          {/* <h1 className="tw-text-sky-500 tw-text-8xl tw-font-semibold tw-self-center tw-mr-40">
            Đăng Ký
          </h1> */}
          {/* col 3 to ... */}
          {/* form đăng ký */}
          <RegisForm_fix />
        </div>
      </div>
    </div>
    // </section>
  );
}

export default Register_rightSide;
