interface Props {
  existsDescription: string;
  setDescription: (des: string) => void;
}

export const Description = ({ existsDescription, setDescription }: Props) => {
  const handleInputChange = (field: string, value: any) => {
    setDescription(value);
  };
  return (
    <>
      <div id="edit-row description-wrap" className="flex mb-4">
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
          <span>Mô tả sản phẩm</span>
        </div>
        <div id="edit-main" className="flex flex-col justify-center w-[100%]">
          <div id="edit-main-content" className="flex flex-col">
            <div id="edit-main-content-input" className="flex">
              <textarea
                placeholder="Nhập vào"
                className="w-[100%] h-[80px] border border-[#ebeaed] rounded-[4px] px-[16px] py-[12px]"
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                value={existsDescription}
              />
            </div>
            {/* <div id="edit-main-content-error">
              <span style={{ color: "red", fontSize: "12px" }}>
                Mô tả sản phẩm của bạn quá ngắn. Vui lòng nhập ít nhất 10 kí tự.
              </span>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};
