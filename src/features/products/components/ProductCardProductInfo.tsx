import { ProductCardProductInfoCore } from "./ProductCardProductInfoCore";

export const ProductCardProductInfo = () => {

  return (
    <section className="lg:pl-20">
      <div className="mb-8 ">
        {/* name product */}
        <h2 className="max-w-xl mb-6 text-5xl font-bold dark:text-gray-400 md:text-4xl">
          Macbook Pro M130c90
        </h2>
        {/* star, sold */}
        <div className="flex mb-2">
          {/* rating */}
          <div className="flex items-center">
            <div className="pr-2 underline">3</div>
            <svg
              className="flex-shrink-0 w-5 h-5 text-yellow-400 dark:text-yellow-600"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
            </svg>
            <svg
              className="flex-shrink-0 w-5 h-5 text-yellow-400 dark:text-yellow-600"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
            </svg>
            <svg
              className="flex-shrink-0 w-5 h-5 text-yellow-400 dark:text-yellow-600"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
            </svg>
            <svg
              className="flex-shrink-0 w-5 h-5 text-gray-300 dark:text-gray-600"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
            </svg>
            <svg
              className="flex-shrink-0 w-5 h-5 text-gray-300 dark:text-gray-600"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
            </svg>
          </div>
          {/* line div between review and rating: ligne droite | */}
          <div className="flex items-center justify-center w-px h-6 mx-3 bg-gray-300"></div>

          {/* review amount */}
          <div className="flex items-center">
            <div className="mr-2 underline">3</div>
            <div className="text-gray-500 dark:text-gray-400">Đánh giá</div>
          </div>
          <div className="flex items-center justify-center w-px h-6 mx-3 bg-gray-300"></div>

          {/* sold */}
          <div className="flex items-center">
            <div className="mr-2 underline">3</div>
            <div className="text-gray-500 dark:text-gray-400">Đã bán</div>
          </div>
        </div>
        {/* price */}
        <p className="inline-block mb-6 text-4xl font-bold text-gray-700 dark:text-gray-400 ">
          <span>$1500.99</span>
          <span className="text-base font-normal text-gray-500 line-through dark:text-gray-400">
            $1800.99
          </span>
        </p>
        <p className="max-w-md text-gray-700 dark:text-gray-400">
          Lorem ispum dor amet Lorem ispum dor amet Lorem ispum dor amet Lorem
          ispum dor amet Lorem ispum dor amet Lorem ispum dor amet Lorem ispum
          dor amet Lorem ispum dor amet
        </p>
      </div>
      {/* attribute of product */}
      <ProductCardProductInfoCore/>
      <div className="flex flex-wrap items-center gap-4">
        <button className="w-full p-4 bg-blue-500 rounded-md lg:w-2/5 dark:text-gray-200 text-gray-50 hover:bg-blue-600 dark:bg-blue-500 dark:hover:bg-blue-700">
          Add to cart
        </button>
        <button className="flex items-center justify-center w-full p-4 text-blue-500 border border-blue-500 rounded-md lg:w-2/5 dark:text-gray-200 dark:border-blue-600 hover:bg-blue-600 hover:border-blue-600 hover:text-gray-100 dark:bg-blue-500 dark:hover:bg-blue-700 dark:hover:border-blue-700 dark:hover:text-gray-300">
          Buy Now
        </button>
      </div>
    </section>
  );
};
