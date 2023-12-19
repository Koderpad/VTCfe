// import React, { useEffect, useState } from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import Header_v1 from "../layouts/headers/Header_v1";
// import Banner from "../layouts/banner/Banner";
// import ProductList from "../features/common/products/components/ProductsList/ProductList";

// interface Category {
//   name: string;
//   icon: string;
// }

// const slickSettings = {
//   slidesToShow: 5,
//   slidesToScroll: 1,
//   infinite: true,
//   dots: false,
//   arrows: false, // Disable default arrows
// };
// export const Home = () => {
//   const [categorySlider, setCategorySlider] = useState<Slider | null>(null);

//   const categoryItems: Category[] = [
//     { name: "Category 1", icon: "public/Logo.png" },
//     { name: "Category 2", icon: "public/Logo.png" },
//     { name: "Category 3", icon: "public/Logo.png" },
//     { name: "Category 4", icon: "public/Logo.png" },
//     { name: "Category 5", icon: "public/Logo.png" },

//     { name: "Category 6", icon: "public/Logo.png" },
//     { name: "Category 7", icon: "public/Logo.png" },
//     { name: "Category 8", icon: "public/Logo.png" },
//     { name: "Category 9", icon: "public/Logo.png" },
//     { name: "Category 10", icon: "public/Logo.png" },
//   ];

//   const handleNext = () => {
//     if (categorySlider) {
//       categorySlider.slickNext();
//     }
//   };

//   const handlePrev = () => {
//     if (categorySlider) {
//       categorySlider.slickPrev();
//     }
//   };

//   useEffect(() => {
//     // Initialize Slick Carousel for category items
//     if (categorySlider) {
//       categorySlider.slickGoTo(0); // Go to the first slide initially
//     }
//   }, [categorySlider]);

//   return (
//     <div className="bg-gray-100">
//       {/* Header (Your existing code) */}
//       <Header_v1 />

//       <div className="h-48"></div>

//       <header className="bg-gray-800 text-white py-4 mt-4">
//         {/* Your header content goes here */}
//       </header>

//       {/* Content Section */}
//       <div className="container-fluid mt-8 mx-8 sm:mx-4 md:mx-16 ">
//         {/* Banner Carousel */}
//         <Banner />
//         {/* Category Form */}
//         <div className="bg-white p-4 rounded-lg shadow-md  drop-shadow-md ">
//           <h2 className="text-xl font-bold mb-4 ">DANH MỤC</h2>

//           <Slider
//             {...slickSettings}
//             ref={(slider) => setCategorySlider(slider)}
//           >
//             {categoryItems.map((category, index) => (
//               <div key={index} className="flex items-center">
//                 <div className="flex flex-col items-center">
//                   <img
//                     src={category.icon}
//                     alt={category.name}
//                     className="w-64 h-auto mb-2 border-double border-4 border-indigo-600"
//                   />
//                   <p>{category.name}</p>
//                 </div>
//               </div>
//             ))}
//           </Slider>
//           <div className="absolute left-0 top-1/2 transform -translate-y-1/2 mx-4 ">
//             <button
//               className="prev-button text-white  w-12 h-14 rounded-md bg-black"
//               onClick={handlePrev}
//             >
//               {"<"}
//             </button>
//           </div>
//           <div className="absolute right-0 top-1/2 transform -translate-y-1/2 mx-4 ">
//             <button
//               className="next-button text-white w-12 h-14 rounded-md bg-black"
//               onClick={handleNext}
//             >
//               {">"}
//             </button>
//           </div>
//         </div>
//       </div>
//       <div className="container-fluid mt-8 mx-8 sm:mx-4 md:mx-16 drop-shadow-md">
//         <div className="bg-white  mt-4 border-double  drop-shadow-md">
//           <ProductList />
//         </div>
//       </div>

//       {/* Footer (Your existing code) */}
//       <footer className="bg-gray-800 text-white py-4 mt-4">
//         {/* Your footer content goes here */}
//       </footer>
//     </div>
//   );
// };

import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Header_v1 from "../layouts/headers/Header_v1";
import Banner from "../layouts/banner/Banner";
import ProductList from "../features/common/products/components/ProductsList/ProductList";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// interface Category {
//   name: string;
//   icon: string;
// }

interface Category {
  categoryId: number;
  name: string;
  image: string;
  description?: string;
  adminOnly?: boolean;
  status: string;
}

interface getAllParentRes {
  status: string;
  message: string;
  code: number;
  categoryAdminDTOs: Category[];
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
  const [categoryItems, setCategoryItems] = useState<Category[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "http://localhost:8181/api/vendor/shop/category/all-parent",
          {
            method: "GET",
          }
        );

        if (res) {
          const data: getAllParentRes = await res.json();
          console.log(data);
          setCategoryItems(data.categoryAdminDTOs);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

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
  const navigate = useNavigate();
  // const id_category = props.data.categoryId;
  // console.log(id_category);
  const handleCategoryClick = () => {
    navigate(`/products/${props.data.categoryId}`);
    // navigate(`/${props.data.name}-vtc.${props.data.categoryId}`);
    // Navigate đến trang `ProductsByCategory` với tên danh mục và ID
    // navigate(`-vtc.${props.data.categoryId}`);
    // navigate("/books-vtc.1", { state: { categoryId: props.data.categoryId } });
  };
  return (
    <div className="p-2 border border-transparent hover:border hover:border-gray-600">
      <div
        className="flex flex-col items-center hover:cursor-pointer"
        onClick={handleCategoryClick}
      >
        <img
          src={props.data.image}
          alt={props.data.name}
          className="w-40 h-40 object-cover mb-2"
        />
        <span className="text-xl text-center font-light">
          {props.data.name}
        </span>
      </div>
    </div>
  );
};
