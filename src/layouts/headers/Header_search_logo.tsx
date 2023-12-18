function Header_search_logo() {
  return (
    <>
      <a href="#" className="relative ">
        <div className="flex items-center justify-center gap-2">
          <img src="/public/logo.png" className="h-[50px] w-auto object-cover overflow-hidden" />
          <p className="text-7xl pl-2	pt-3 text-white underline decoration-sky-500/30">
            VTC
          </p>
        </div>
      </a>
    </>
  );
}

export default Header_search_logo;
