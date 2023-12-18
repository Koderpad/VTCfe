import RegisForm_fix from "../features/common/auth/components/RegisForm_fix.js";

function Register_rightSide() {
  return (
    // <section className="border bg-cyan-100 grow w-full mx-auto px-5 border-solid border-neutral-700 max-md:max-w-full">
    <div className="flex max-md:flex-col max-md:items-stretch max-md:gap-0">
      <div className="flex items-stretch w-[19%] max-md:w-full max-md:ml-0">
        <img
          loading="lazy"
          srcSet="/public/Element_1_Regis.png"
          className="w-[131px] h-auto aspect-auto overflow-hidden grow self-end max-md:mt-10"
          alt="Image"
        />
      </div>
      <div className="flex flex-col items-stretch w-[81%] ml-5 max-md:w-full max-md:ml-0">
        <div className="flex flex-col max-md:max-w-full max-md:mt-5">
          {/* col 1 */}
          <div className="w-full h-[150px] max-w-full">
            <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
              <div className="flex flex-col items-end place-content-end w-3/5 max-md:w-full max-md:ml-0 mt-">
                <h1 className="text-sky-500 text-8xl font-semibold ">
                  Đăng Ký
                </h1>
              </div>
              {/* hình ảnh bên trang trí bên phải */}
              <div className="flex flex-col items-stretch w-2/5 ml-5 max-md:w-full max-md:ml-0">
                <img
                  loading="lazy"
                  srcSet="/public/Element_1_Regis.png"
                  className="ml-36 aspect-auto object-cover object-center w-[141px] overflow-hidden max-w-full max-md:mt-10"
                  alt="Image"
                />
              </div>
            </div>
          </div>
          <RegisForm_fix />
        </div>
      </div>
    </div>
    // </section>
  );
}

export default Register_rightSide;
