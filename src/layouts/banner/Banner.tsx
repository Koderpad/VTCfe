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
    image:
      "https://cf.shopee.vn/file/vn-50009109-f769ccc8ceda8758604df5ec1dff2c46_xxhdpi",
    content: "Banner 1",
  },
  {
    id: 2,
    image:
      "https://cf.shopee.vn/file/vn-50009109-f769ccc8ceda8758604df5ec1dff2c46_xxhdpi",
    content: "Banner 2",
  },
  {
    id: 2,
    image:
      "https://cf.shopee.vn/file/vn-50009109-f769ccc8ceda8758604df5ec1dff2c46_xxhdpi",
    content: "Banner 2",
  },
  {
    id: 2,
    image:
      "https://cf.shopee.vn/file/vn-50009109-f769ccc8ceda8758604df5ec1dff2c46_xxhdpi",
    content: "Banner 2",
  },
  // Thêm các mục banner khác vào đây
];

const Banner: React.FC = () => {
  return (
    <div className="grid grid-cols-5 w-full h-[300px] mb-5">
      <div className="col-span-3 h-full w-full overflow-hidden">
        <Slider {...slickSettings} className="w-full h-full">
          {banners.map((banner) => (
            <div key={banner.id} className="h-[300px] w-full overflow-hidden">
              <img
                src={banner.image}
                alt={banner.content}
                className="w-full h-full object-fill"
              />
            </div>
          ))}
        </Slider>
      </div>
      <div className="flex flex-col items-center justify-center col-span-2 h-[300px] w-full">
        <div className="flex-1 h-[150px] w-full overflow-hidden">
          <img
            src="https://cf.shopee.vn/file/vn-50009109-ed8aeb9d5ab3654ce0bf1aeb857bb5a3_xhdpi"
            alt=""
            className="w-full h-full object-fill"
          />
        </div>
        <div className="flex-1 h-[150px] w-full overflow-hidden">
          <img
            src="https://cf.shopee.vn/file/vn-50009109-ed8aeb9d5ab3654ce0bf1aeb857bb5a3_xhdpi"
            alt=""
            className="w-full h-full object-fill"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
