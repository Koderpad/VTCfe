export const InputNumber = () => {
  return (
        <div data-hs-input-number>
        <input type="text" value="1" data-hs-input-number-input/>
        <button type="button" className="" data-hs-input-number-decrement>
            Minus
        </button>
        <button type="button" className="" data-hs-input-number-increment>
            Add
        </button>
        </div>
  );
};
