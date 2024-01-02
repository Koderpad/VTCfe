interface Props {
  existsName: string;
  setName: (name: string) => void;
}

export const Name = ({ existsName, setName }: Props) => {
  const handleInputChange = (field: string, value: string) => {
    setName(value);
  };
  return (
    <>
      <div id="edit-row">
        <div id="wrap" className="flex mb-4">
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
            <div id="edit-main-content" className="flex flex-col">
              <div
                id="edit-main-content-input"
                className="
              flex
              "
              >
                <input
                  type="text"
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Nhập vào"
                  value={existsName}
                  className="w-[100%] h-[40px] border border-[#ebeaed] rounded-[4px] px-[16px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
