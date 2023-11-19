const RingShowcase = () => {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-1/2">
        <div className="carousel relative shadow-2xl bg-white">
          <div className="carousel-inner relative overflow-hidden w-full">
            <input
              className="carousel-open"
              type="radio"
              id="carousel-1"
              name="carousel"
              aria-hidden="true"
              hidden={false}
              checked={true}
            />
            <div className="carousel-item absolute opacity-0">
              <img src="https://picsum.photos/seed/picsum/200/300" alt="" />
            </div>
            <label className="prev control-1 w-10 h-10 ml-2 md:ml-0 absolute cursor-pointer hidden text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-black leading-tight text-center z-10 inset-y-0 left-0 my-auto">
              ‹
            </label>
            <label className="next control-1 w-10 h-10 mr-2 md:mr-0 absolute cursor-pointer hidden text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-black leading-tight text-center z-10 inset-y-0 right-0 my-auto">
              ›
            </label>
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/2 px-4 py-4 bg-gray-100">
        <h1 className="text-gray-900 font-bold text-2xl uppercase">
          Product Title
        </h1>
        <p className="mt-2 text-gray-600 text-sm">Product Description</p>
        <div className="flex mt-3">
          <span className="text-gray-900 font-bold text-xl">$129.99</span>
          <span className="text-gray-600 text-sm ml-3">In Stock</span>
        </div>
        <div className="flex mt-2 item-center">
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="form-radio"
              name="radio-colors"
              value="red"
              checked
            />
            <span className="ml-2 text-gray-700">Red</span>
          </label>
          <label className="inline-flex items-center ml-6">
            <input
              type="radio"
              className="form-radio"
              name="radio-colors"
              value="blue"
            />
            <span className="ml-2 text-gray-700">Blue</span>
          </label>
        </div>
        <div className="flex mt-6">
          <span className="text-gray-600 text-sm">Quantity:</span>
          <input className="form-input ml-2 w-20" type="number" value="1" />
        </div>
        <div className="flex mt-6">
          <button className="px-6 py-2 text-white font-bold text-lg uppercase bg-gray-900 rounded hover:bg-gray-800 focus:outline-none focus:shadow-outline">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default RingShowcase;
