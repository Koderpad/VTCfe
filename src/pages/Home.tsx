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
  slidesToShow: 5,
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

      <div className="h-48"></div>

      <header className="bg-gray-800 text-white py-4 mt-4">
        {/* Your header content goes here */}
      </header>

      {/* Content Section */}
      <div className="container-fluid mt-8 mx-8 sm:mx-4 md:mx-16 ">
        {/* Banner Carousel */}
        <Banner />
        {/* Category Form */}
        <div className="bg-white p-4 rounded-lg shadow-md  drop-shadow-md ">
          <h2 className="text-xl font-bold mb-4 ">DANH MỤC</h2>

          <Slider
            {...slickSettings}
            ref={(slider) => setCategorySlider(slider)}
          >
            {categoryItems.map((category, index) => (
              <div key={index} className="flex items-center">
                <div className="flex flex-col items-center">
                  <img
                    src={category.icon}
                    alt={category.name}
                    className="w-64 h-auto mb-2 border-double border-4 border-indigo-600"
                  />
                  <p>{category.name}</p>
                </div>
              </div>
            ))}
          </Slider>
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 mx-4 ">
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
          </div>
        </div>
      </div>
      <div className="container-fluid mt-8 mx-8 sm:mx-4 md:mx-16 drop-shadow-md">
        <div className="bg-white  mt-4 border-double  drop-shadow-md">
          <ProductList />
        </div>
      </div>

      {/* Footer (Your existing code) */}
      <footer className="bg-gray-800 text-white py-4 mt-4">
        {/* Your footer content goes here */}
      </footer>
    </div>
  );
};
