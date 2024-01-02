import Search from "../../components/form/SearchInput";
function Header() {
  return (
    <header className="shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] bg-white self-center flex w-full max-w-[1440px] items-start justify-between gap-5 pr-4 max-md:max-w-full max-md:flex-wrap max-md:justify-center">
      <img
        loading="lazy"
        srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/eb63c3f5-94f0-4782-861f-24c6eb9bc625?apiKey=a1f457ed77c9410787110ef62539331d&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/eb63c3f5-94f0-4782-861f-24c6eb9bc625?apiKey=a1f457ed77c9410787110ef62539331d&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/eb63c3f5-94f0-4782-861f-24c6eb9bc625?apiKey=a1f457ed77c9410787110ef62539331d&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/eb63c3f5-94f0-4782-861f-24c6eb9bc625?apiKey=a1f457ed77c9410787110ef62539331d&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/eb63c3f5-94f0-4782-861f-24c6eb9bc625?apiKey=a1f457ed77c9410787110ef62539331d&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/eb63c3f5-94f0-4782-861f-24c6eb9bc625?apiKey=a1f457ed77c9410787110ef62539331d&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/eb63c3f5-94f0-4782-861f-24c6eb9bc625?apiKey=a1f457ed77c9410787110ef62539331d&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/eb63c3f5-94f0-4782-861f-24c6eb9bc625?apiKey=a1f457ed77c9410787110ef62539331d&"
        className="aspect-[1.37] object-cover object-center w-[92px] overflow-hidden self-stretch max-w-full"
        alt="Logo"
      />
      {/* search */}
      <Search />

      <a href="#" className="self-center flex items-start gap-2 my-auto">
        <img
          loading="lazy"
          srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/a9a61077-f353-4196-9a1d-0a5bed5f4044?apiKey=a1f457ed77c9410787110ef62539331d&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/a9a61077-f353-4196-9a1d-0a5bed5f4044?apiKey=a1f457ed77c9410787110ef62539331d&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/a9a61077-f353-4196-9a1d-0a5bed5f4044?apiKey=a1f457ed77c9410787110ef62539331d&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/a9a61077-f353-4196-9a1d-0a5bed5f4044?apiKey=a1f457ed77c9410787110ef62539331d&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/a9a61077-f353-4196-9a1d-0a5bed5f4044?apiKey=a1f457ed77c9410787110ef62539331d&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/a9a61077-f353-4196-9a1d-0a5bed5f4044?apiKey=a1f457ed77c9410787110ef62539331d&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/a9a61077-f353-4196-9a1d-0a5bed5f4044?apiKey=a1f457ed77c9410787110ef62539331d&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/a9a61077-f353-4196-9a1d-0a5bed5f4044?apiKey=a1f457ed77c9410787110ef62539331d&"
          className="aspect-square object-cover object-center w-[25px] overflow-hidden self-stretch max-w-full"
          alt="Account Icon"
        />
        <div className="text-black text-xl self-center my-auto">Account</div>
      </a>
      <a href="#" className="self-center flex items-start gap-2 my-auto">
        <img
          loading="lazy"
          srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/973275ba-be52-40ef-92da-5f8f8ca16012?apiKey=a1f457ed77c9410787110ef62539331d&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/973275ba-be52-40ef-92da-5f8f8ca16012?apiKey=a1f457ed77c9410787110ef62539331d&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/973275ba-be52-40ef-92da-5f8f8ca16012?apiKey=a1f457ed77c9410787110ef62539331d&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/973275ba-be52-40ef-92da-5f8f8ca16012?apiKey=a1f457ed77c9410787110ef62539331d&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/973275ba-be52-40ef-92da-5f8f8ca16012?apiKey=a1f457ed77c9410787110ef62539331d&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/973275ba-be52-40ef-92da-5f8f8ca16012?apiKey=a1f457ed77c9410787110ef62539331d&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/973275ba-be52-40ef-92da-5f8f8ca16012?apiKey=a1f457ed77c9410787110ef62539331d&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/973275ba-be52-40ef-92da-5f8f8ca16012?apiKey=a1f457ed77c9410787110ef62539331d&"
          className="aspect-[1.12] object-cover object-center w-full overflow-hidden flex-1"
          alt="Help Icon"
        />
        <div className="text-black text-xl mt-1.5">Help</div>
      </a>
      <a href="#" className="self-center flex items-start gap-1.5 my-auto">
        <img
          loading="lazy"
          srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/b5f02597-ca5d-4eac-8fdf-70a6c07b2139?apiKey=a1f457ed77c9410787110ef62539331d&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/b5f02597-ca5d-4eac-8fdf-70a6c07b2139?apiKey=a1f457ed77c9410787110ef62539331d&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/b5f02597-ca5d-4eac-8fdf-70a6c07b2139?apiKey=a1f457ed77c9410787110ef62539331d&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/b5f02597-ca5d-4eac-8fdf-70a6c07b2139?apiKey=a1f457ed77c9410787110ef62539331d&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/b5f02597-ca5d-4eac-8fdf-70a6c07b2139?apiKey=a1f457ed77c9410787110ef62539331d&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/b5f02597-ca5d-4eac-8fdf-70a6c07b2139?apiKey=a1f457ed77c9410787110ef62539331d&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/b5f02597-ca5d-4eac-8fdf-70a6c07b2139?apiKey=a1f457ed77c9410787110ef62539331d&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/b5f02597-ca5d-4eac-8fdf-70a6c07b2139?apiKey=a1f457ed77c9410787110ef62539331d&"
          className="aspect-square object-cover object-center w-full overflow-hidden flex-1"
          alt="Cart Icon"
        />
        <div className="text-black text-xl self-center my-auto">Cart</div>
      </a>
    </header>
  );
}

export default Header;
