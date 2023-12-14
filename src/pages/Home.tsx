import React, { useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import $ from "jquery";

export const Home = () => {
  useEffect(() => {
    // Khởi tạo Slick Carousel ở đây
    const slickSettings = {
      slidesToShow: 4,
      slidesToScroll: 1,
      infinite: true,
      dots: false,
      prevArrow: (
        <button type="button" className="slick-prev">
          &#8592;
        </button>
      ),
      nextArrow: (
        <button type="button" className="slick-next">
          &#8594;
        </button>
      ),
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };
  }, []); // Chú ý: Sử dụng dependency array rỗng để đảm bảo useEffect chỉ chạy một lần khi component được mount

  return (
    <div>
      {/* Header (Your existing code) */}
      <header className="bg-gray-800 text-white py-4">
        {/* Your header content goes here */}
      </header>

      {/* Content Section */}
      <div className="container mx-auto mt-8">
        {/* Advertising Slide (Your existing code) */}
        <div className="mb-8">
          {/* Your advertising slide content goes here */}
        </div>

        {/* Categories Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">DANH MỤC</h2>

          {/* Category Carousel */}
          <Slider className="category-carousel">
            {/* Category Item 1 */}
            <div className="p-4 border border-gray-300 rounded">
              {/* Category content goes here */}
              <h3 className="text-lg font-semibold mb-2">Category 1</h3>
              {/* Other category details */}
            </div>

            {/* Category Item 2 */}
            <div className="p-4 border border-gray-300 rounded">
              {/* Category content goes here */}
              <h3 className="text-lg font-semibold mb-2">Category 2</h3>
              {/* Other category details */}
            </div>

            {/* Add more category items as needed */}
          </Slider>
        </div>

        {/* Add other content sections as needed */}
      </div>

      {/* Footer (Your existing code) */}
      <footer className="bg-gray-800 text-white py-4">
        {/* Your footer content goes here */}
      </footer>
    </div>
  );
};
