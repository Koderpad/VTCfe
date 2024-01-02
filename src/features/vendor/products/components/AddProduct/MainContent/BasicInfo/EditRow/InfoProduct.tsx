import { useDispatch, useSelector } from "react-redux";
import { updateProduct } from "../../../../../../redux/reducer/addProductSlice";
import { RootState } from "../../../../../../../../app/store";
import { useState } from "react";

export const InfoProduct = () => {
  const dispatch = useDispatch();
  const [descriptionLength, setDescriptionLength] = useState(100);

  const handleInputChange = (field: string, value: any) => {
    dispatch(updateProduct({ field, value }));
    setDescriptionLength(value.length);
  };

  return (
    <>
      <div id="edit-row description-wrap" className="flex">
        <div
          id="edit-label edit-title"
          className="flex w-[180px] h-[40px] justify-center items-center"
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
          <span>Thông tin</span>
        </div>
        <div id="edit-main" className="flex flex-col justify-center w-[100%]">
          <div id="edit-main-content" className="flex flex-col">
            <div id="edit-main-content-input" className="flex">
              <textarea
                placeholder="Nhập vào"
                className="w-[100%] h-[80px] border border-[#ebeaed] rounded-[4px] px-[16px] py-[12px]"
                onChange={(e) =>
                  handleInputChange("information", e.target.value)
                }
              />
            </div>

            {descriptionLength < 10 && (
              <div id="edit-main-content-error">
                <span style={{ color: "red", fontSize: "12px" }}>
                  Mô tả sản phẩm của bạn quá ngắn. Vui lòng nhập ít nhất 10 kí
                  tự.
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
