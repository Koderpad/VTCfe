import React from "react";

interface CustomInputProps {
  labelText: string;
  labelFor: string;
  inputId: string;
  inputType: string;
  inputValue: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomInput: React.FC<CustomInputProps> = ({
  labelText,
  labelFor,
  inputId,
  inputType,
  inputValue,
  handleInputChange,
}) => {
  return (
    <div
      className={`tw-block tw-w-full tw-mb-4 ${
        labelFor === "phone" ? "tw-hidden" : ""
      }`}
    >
      <label className="tw-block tw-text-gray-700 tw-mb-2" htmlFor={labelFor}>
        {labelText}
      </label>
      <input
        className="tw-w-4/5 tw-bg-gray-200 tw-border tw-border-gray-200 tw-rounded tw-py-2 tw-px-4 tw-text-gray-700 tw-leading-tight focus:tw-bg-white focus:tw-border-gray-500 focus:tw-outline-none"
        id={inputId}
        name={inputId}
        type={inputType}
        value={inputValue}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default CustomInput;
