export const CategoryProduct = () => {
  return (
    <>
      <div id="edit-row is-last-edit-row" className="flex">
        <div
          id="edit-label edit-row-left"
          className="flex pl-5
          w-[180px] h-[40px] justify-center items-center"
        >
          <div id="mandatory">
            <span
              style={{
                color: "#ee4d2d",
              }}
            >
              *
            </span>
          </div>
          <span style={{}}>Ngành hàng</span>
        </div>
        <div
          id="degrade-wrap edit-row-right-full"
          //   className=" flex flex-col justify-center w-[100%]"
          className="flex w-full"
        >
          <div id="product-category" className="w-full">
            <div id="product-category-box" className="w-full">
              <div id="product-edit-form-item" className="w-full">
                <div id="product-edit-form-item-content" className="w-full">
                  <div id="popover-wrap" className="w-full">
                    <div
                      id="product-category-box-inner"
                      className="flex items-center w-[100%] h-[40px] border border-[#ebeaed] rounded-[4px] px-[16px]"
                    >
                      <div id="product-category-text">
                        <span>`Thời trang nữ {"->"} Quần`</span>
                      </div>
                      <i id="product-category-icon shopee-icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                        >
                          <path
                            fill="#ee4d2d"
                            fillRule="evenodd"
                            d="M8 0a8 8 0 100 16A8 8 0 008 0zm0 14.667A6.667 6.667 0 118 1.333a6.667 6.667 0 010 13.334zM8 4a4 4 0 100 8 4 4 0 000-8zm0 6a2 2 0 100-4 2 2 0 000 4z"
                          ></path>
                        </svg>
                      </i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
