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
    <div className="tw-block tw-w-full tw-mb-4">
      <label className="tw-block tw-text-gray-700 tw-mb-2" htmlFor={labelFor}>
        {labelText}
      </label>
      <div className="tw-w-full">
        <DatePicker
          className="tw-w-full tw-bg-gray-200 tw-border tw-border-gray-200 tw-rounded tw-py-2 tw-px-4 tw-text-gray-700 tw-leading-tight focus:tw-bg-white focus:tw-border-gray-500 focus:tw-outline-none"
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
