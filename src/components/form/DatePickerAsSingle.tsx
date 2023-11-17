import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DatePickerAsSingleProps {
  labelText: string;
  labelFor: string;
  _setStartDate: Date;
  handleChange: (date: Date) => void;
}

function DatePickerAsSingle({
  labelText,
  labelFor,
  _setStartDate,
  handleChange,
}: DatePickerAsSingleProps) {
  return (
    <div className="block w-full mb-4">
      <label className="block text-gray-700 mb-2" htmlFor={labelFor}>
        {labelText}
      </label>
      <div className="w-full">
        <DatePicker
          className="w-full bg-gray-200 border border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:bg-white focus:border-gray-500 focus:outline-none"
          showIcon
          id={labelFor}
          selected={_setStartDate}
          onChange={handleChange}
          dateFormat="dd/MM/yyyy"
        />
      </div>
    </div>
  );
}

export default DatePickerAsSingle;
