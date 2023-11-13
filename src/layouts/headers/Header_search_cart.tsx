function Header_search_cart() {
  return (
    <>
      <div className="tw-flex  tw-w-1/6 tw-px-5">
        <div className="tw-flex tw-w-full tw-justify-end tw-items-center tw-pr-16 tw-pb-16">
          <a
            className="tw-h-[48px] tw-w-12"
            id="cart_drawer_target_id"
            href="#"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M5.31 5H2.31M5.55 5L7.71 12.84C7.89029 13.4582 8.26474 14.0021 8.77799 14.3911C9.29123 14.78 9.91603 14.9936 10.56 15H19.3V5H5.55ZM12.31 18.5C12.31 19.3284 11.6384 20 10.81 20C9.98157 20 9.31 19.3284 9.31 18.5C9.31 17.6716 9.98157 17 10.81 17C11.6384 17 12.31 17.6716 12.31 18.5ZM19.31 18.5C19.31 19.3284 18.6384 20 17.81 20C16.9816 20 16.31 19.3284 16.31 18.5C16.31 17.6716 16.9816 17 17.81 17C18.6384 17 19.31 17.6716 19.31 18.5Z"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>
    </>
  );
}

export default Header_search_cart;
