import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Header_v1 from "../layouts/headers/Header_v1";
import Banner from "../layouts/banner/Banner";
import ProductList from "../features/common/products/components/ProductsList/ProductList";

interface Category {
  name: string;
  icon: string;
}

const slickSettings = {
  slidesToShow: 10,
  slidesToScroll: 1,
  infinite: true,
  dots: false,
  arrows: false, // Disable default arrows
};
export const Home = () => {
  const [categorySlider, setCategorySlider] = useState<Slider | null>(null);

  const categoryItems: Category[] = [
    { name: "Category 1", icon: "public/Logo.png" },
    { name: "Category 2", icon: "public/Logo.png" },
    { name: "Category 3", icon: "public/Logo.png" },
    { name: "Category 4", icon: "public/Logo.png" },
    { name: "Category 5", icon: "public/Logo.png" },

    { name: "Category 6", icon: "public/Logo.png" },
    { name: "Category 7", icon: "public/Logo.png" },
    { name: "Category 8", icon: "public/Logo.png" },
    { name: "Category 9", icon: "public/Logo.png" },
    { name: "Category 10", icon: "public/Logo.png" },
    { name: "Category 10", icon: "public/Logo.png" },
    { name: "Category 10", icon: "public/Logo.png" },
  ];

  const handleNext = () => {
    if (categorySlider) {
      categorySlider.slickNext();
    }
  };

  const handlePrev = () => {
    if (categorySlider) {
      categorySlider.slickPrev();
    }
  };

  useEffect(() => {
    // Initialize Slick Carousel for category items
    if (categorySlider) {
      categorySlider.slickGoTo(0); // Go to the first slide initially
    }
  }, [categorySlider]);

  return (
    <div className="bg-gray-100">
      {/* Header (Your existing code) */}
      <Header_v1 />

      <div className="px-60 py-10 space-y-5">
        <div className="  sm:mx-4 md:mx-16 ">
          {/* Banner Carousel */}
          <Banner />
          {/* Category Form */}
          <div className="shadow-md bg-white p-4 space-y-4 w-full">
            <h2 className="text-2xl  font-bold mb-4 ">DANH MỤC</h2>
            <div className="w-full h-full relative flex items-center flex-wrap gap-2">
              {categoryItems.map((category, index) => (
                <ItemCategory key={index} data={category} />
              ))}

              {/* <div className="absolute left-0 top-1/2 transform -translate-y-1/2 mx-4 ">
                <button
                  className="prev-button text-white  w-12 h-14 rounded-md bg-black"
                  onClick={handlePrev}
                >
                  {"<"}
                </button>
              </div>
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 mx-4 ">
                <button
                  className="next-button text-white w-12 h-14 rounded-md bg-black"
                  onClick={handleNext}
                >
                  {">"}
                </button>
              </div> */}
            </div>
          </div>
        </div>
        <div className="container-fluid mt-8 mx-8 sm:mx-4 md:mx-16 drop-shadow-md">
          <div className="bg-white  mt-4 border-double  drop-shadow-md">
            <ProductList />
          </div>
        </div>
      </div>
      {/* Content Section */}

      {/* Footer (Your existing code) */}
      <footer className="bg-gray-800 text-white py-4 mt-4">
        {/* Your footer content goes here */}
      </footer>
    </div>
  );
};

const ItemCategory = (props: { data: Category }) => {
  return (
    <div className="p-2 border border-transparent hover:border hover:border-gray-600">
      <div className="flex flex-col items-center">
        <img
          src={props.data.icon}
          alt={props.data.name}
          className="w-40 h-40 object-cover mb-2"
        />
        <span className="text-xl text-center font-light">{props.data.name}</span>
      </div>
    </div>
  );
};
