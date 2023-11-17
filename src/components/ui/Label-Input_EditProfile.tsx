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
      className={`block w-full mb-4 ${labelFor === "phone" ? "hidden" : ""}`}
    >
      <label className="block text-gray-700 mb-2" htmlFor={labelFor}>
        {labelText}
      </label>
      <input
        className="w-4/5 bg-gray-200 border border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:bg-white focus:border-gray-500 focus:outline-none"
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
