import React from "react";
import Slider from "react-slick";

const slickSettings = {
  slidesToShow: 1,
  slidesToScroll: 1,
  infinite: true,
  dots: false,
  autoplay: true,
  autoplaySpeed: 2000,
};

const banners = [
  {
    id: 1,
    image: "public/Logo.png",
    content: "Banner 1",
  },
  {
    id: 2,
    image: "public/Element_1_Regis.png",
    content: "Banner 2",
  },
  {
    id: 2,
    image: "public/images/giay04.jpg",
    content: "Banner 2",
  },
  {
    id: 2,
    image: "public/images/giay02.jpg",
    content: "Banner 2",
  },
  // Thêm các mục banner khác vào đây
];

const Banner: React.FC = () => {
    return (
      <Slider {...slickSettings} className="mb-8 drop-shadow-md">
        {banners.map((banner) => (
          <div
            key={banner.id}
            className="banner-item p-4 border border-gray-300 rounded"
            style={{ backgroundImage: `url(${banner.image})`, backgroundSize: 'cover', height: '200px' }}
          >
            <img src={banner.image} alt={banner.content} style={{ width: '30%', height: '30%', objectFit: 'cover' }} />
          </div>
        ))}
      </Slider>
    );
  };
  
  export default Banner;