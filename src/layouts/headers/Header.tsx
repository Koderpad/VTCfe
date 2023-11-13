import Search from "../../components/form/SearchInput";
function Header() {
  return (
    <header className="tw-shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] tw-bg-white tw-self-center tw-flex tw-w-full tw-max-w-[1440px] tw-items-start tw-justify-between tw-gap-5 tw-pr-4 max-md:tw-max-w-full max-md:tw-flex-wrap max-md:tw-justify-center">
      <img
        loading="lazy"
        srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/eb63c3f5-94f0-4782-861f-24c6eb9bc625?apiKey=a1f457ed77c9410787110ef62539331d&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/eb63c3f5-94f0-4782-861f-24c6eb9bc625?apiKey=a1f457ed77c9410787110ef62539331d&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/eb63c3f5-94f0-4782-861f-24c6eb9bc625?apiKey=a1f457ed77c9410787110ef62539331d&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/eb63c3f5-94f0-4782-861f-24c6eb9bc625?apiKey=a1f457ed77c9410787110ef62539331d&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/eb63c3f5-94f0-4782-861f-24c6eb9bc625?apiKey=a1f457ed77c9410787110ef62539331d&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/eb63c3f5-94f0-4782-861f-24c6eb9bc625?apiKey=a1f457ed77c9410787110ef62539331d&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/eb63c3f5-94f0-4782-861f-24c6eb9bc625?apiKey=a1f457ed77c9410787110ef62539331d&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/eb63c3f5-94f0-4782-861f-24c6eb9bc625?apiKey=a1f457ed77c9410787110ef62539331d&"
        className="tw-aspect-[1.37] tw-object-cover tw-object-center tw-w-[92px] tw-overflow-hidden tw-self-stretch tw-max-w-full"
        alt="Logo"
      />
      {/* search */}
      <Search />
      {/* <div className="tw-text-black tw-text-xl tw-my-auto">
        <span className="">VTC E-</span>
        <span className="">Commerce</span>
        <span className=""> </span>
      </div> */}
      <a
        href="#"
        className="tw-self-center tw-flex tw-items-start tw-gap-2 tw-my-auto"
      >
        <img
          loading="lazy"
          srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/a9a61077-f353-4196-9a1d-0a5bed5f4044?apiKey=a1f457ed77c9410787110ef62539331d&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/a9a61077-f353-4196-9a1d-0a5bed5f4044?apiKey=a1f457ed77c9410787110ef62539331d&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/a9a61077-f353-4196-9a1d-0a5bed5f4044?apiKey=a1f457ed77c9410787110ef62539331d&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/a9a61077-f353-4196-9a1d-0a5bed5f4044?apiKey=a1f457ed77c9410787110ef62539331d&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/a9a61077-f353-4196-9a1d-0a5bed5f4044?apiKey=a1f457ed77c9410787110ef62539331d&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/a9a61077-f353-4196-9a1d-0a5bed5f4044?apiKey=a1f457ed77c9410787110ef62539331d&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/a9a61077-f353-4196-9a1d-0a5bed5f4044?apiKey=a1f457ed77c9410787110ef62539331d&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/a9a61077-f353-4196-9a1d-0a5bed5f4044?apiKey=a1f457ed77c9410787110ef62539331d&"
          className="tw-aspect-square tw-object-cover tw-object-center tw-w-[25px] tw-overflow-hidden tw-self-stretch tw-max-w-full"
          alt="Account Icon"
        />
        <div className="tw-text-black tw-text-xl tw-self-center tw-my-auto">
          Account
        </div>
      </a>
      <a
        href="#"
        className="tw-self-center tw-flex tw-items-start tw-gap-2 tw-my-auto"
      >
        <img
          loading="lazy"
          srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/973275ba-be52-40ef-92da-5f8f8ca16012?apiKey=a1f457ed77c9410787110ef62539331d&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/973275ba-be52-40ef-92da-5f8f8ca16012?apiKey=a1f457ed77c9410787110ef62539331d&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/973275ba-be52-40ef-92da-5f8f8ca16012?apiKey=a1f457ed77c9410787110ef62539331d&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/973275ba-be52-40ef-92da-5f8f8ca16012?apiKey=a1f457ed77c9410787110ef62539331d&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/973275ba-be52-40ef-92da-5f8f8ca16012?apiKey=a1f457ed77c9410787110ef62539331d&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/973275ba-be52-40ef-92da-5f8f8ca16012?apiKey=a1f457ed77c9410787110ef62539331d&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/973275ba-be52-40ef-92da-5f8f8ca16012?apiKey=a1f457ed77c9410787110ef62539331d&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/973275ba-be52-40ef-92da-5f8f8ca16012?apiKey=a1f457ed77c9410787110ef62539331d&"
          className="tw-aspect-[1.12] tw-object-cover tw-object-center tw-w-full tw-overflow-hidden tw-flex-1"
          alt="Help Icon"
        />
        <div className="tw-text-black tw-text-xl tw-mt-1.5">Help</div>
      </a>
      <a
        href="#"
        className="tw-self-center tw-flex tw-items-start tw-gap-1.5 tw-my-auto"
      >
        <img
          loading="lazy"
          srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/b5f02597-ca5d-4eac-8fdf-70a6c07b2139?apiKey=a1f457ed77c9410787110ef62539331d&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/b5f02597-ca5d-4eac-8fdf-70a6c07b2139?apiKey=a1f457ed77c9410787110ef62539331d&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/b5f02597-ca5d-4eac-8fdf-70a6c07b2139?apiKey=a1f457ed77c9410787110ef62539331d&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/b5f02597-ca5d-4eac-8fdf-70a6c07b2139?apiKey=a1f457ed77c9410787110ef62539331d&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/b5f02597-ca5d-4eac-8fdf-70a6c07b2139?apiKey=a1f457ed77c9410787110ef62539331d&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/b5f02597-ca5d-4eac-8fdf-70a6c07b2139?apiKey=a1f457ed77c9410787110ef62539331d&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/b5f02597-ca5d-4eac-8fdf-70a6c07b2139?apiKey=a1f457ed77c9410787110ef62539331d&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/b5f02597-ca5d-4eac-8fdf-70a6c07b2139?apiKey=a1f457ed77c9410787110ef62539331d&"
          className="tw-aspect-square tw-object-cover tw-object-center tw-w-full tw-overflow-hidden tw-flex-1"
          alt="Cart Icon"
        />
        <div className="tw-text-black tw-text-xl tw-self-center tw-my-auto">
          Cart
        </div>
      </a>
    </header>
  );
}

export default Header;
