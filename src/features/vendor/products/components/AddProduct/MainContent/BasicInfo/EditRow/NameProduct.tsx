import { useDispatch } from "react-redux";
import { updateProduct } from "../../../../../../redux/reducer/addProductSlice";
import { useState } from "react";

export const NameProduct = () => {
  // const dispatch = useDispatch();

  // const handleInputChange = (field: string, value: any) => {
  //   dispatch(updateProduct({ field, value }));
  // };

  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (field: string, value: any) => {
    setInputValue(value);
    if (value.length < 10) {
      setError(
        "Tên sản phẩm của bạn quá ngắn. Vui lòng nhập ít nhất 10 kí tự."
      );
    } else {
      setError("");
    }
    dispatch(updateProduct({ field, value }));
  };

  return (
    <>
      <div id="edit-row">
        <div id="wrap" className="flex ">
          <div
            id="edit-label edit-title"
            className="flex pl-5
          w-[180px] h-[40px] justify-center items-center
          "
          >
            <div id="mandatory">
              <span
                style={{
                  color: "red",
                }}
              >
                *
              </span>
            </div>
            <span>Tên sản phẩm</span>
          </div>
          <div
            id="edit-main"
            className="flex flex-col justify-center w-[100%]
          "
          >
            <div id="edit-main-content" className="flex flex-col mb-4">
              <div
                id="edit-main-content-input"
                className="
              flex
              "
              >
                {/* <input
                  type="text"
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Nhập vào"
                  className="w-[100%] h-[40px] border border-[#ebeaed] rounded-[4px] px-[16px]"
                /> */}

                <input
                  type="text"
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Nhập vào"
                  className="w-[100%] h-[40px] border border-[#ebeaed] rounded-[4px] px-[16px]"
                />

                {/* create input__suffix */}
              </div>

              {/* <div id="edit-main-content-error">
                <span
                  style={{
                    color: "red",
                    fontSize: "12px",
                  }}
                >
                  Tên sản phẩm của bạn quá ngắn. Vui lòng nhập ít nhất 10 kí tự.
                </span>
              </div> */}
              <div id="edit-main-content-error">
                {error && (
                  <span
                    style={{
                      color: "red",
                      fontSize: "12px",
                    }}
                  >
                    {error}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
