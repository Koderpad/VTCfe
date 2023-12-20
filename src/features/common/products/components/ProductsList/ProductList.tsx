import React, { useState } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Product 1",
    price: 10,
    image: "public/Logo.png",
  },
  {
    id: 2,
    name: "Product 2",
    price: 20,
    image: "public/Logo.png",
  },
  {
    id: 3,
    name: "Product 3",
    price: 10,
    image: "public/Logo.png",
  },
  {
    id: 4,
    name: "Product 4",
    price: 20,
    image: "public/Logo.png",
  },
  {
    id: 5,
    name: "Product 5",
    price: 10,
    image: "public/Logo.png",
  },
  {
    id: 6,
    name: "Product 6",
    price: 20,
    image: "public/Logo.png",
  },
  {
    id: 7,
    name: "Product 7",
    price: 10,
    image: "public/Logo.png",
  },
  {
    id: 8,
    name: "Product 8",
    price: 20,
    image: "public/Logo.png",
  },
  {
    id: 9,
    name: "Product 9",
    price: 10,
    image: "public/Logo.png",
  },
  {
    id: 10,
    name: "Product 10",
    price: 20,
    image: "public/Logo.png",
  },
  {
    id: 11,
    name: "Product 11",
    price: 10,
    image: "public/Logo.png",
  },
  {
    id: 12,
    name: "Product 12",
    price: 20,
    image: "public/Logo.png",
  },
  {
    id: 13,
    name: "Product 12",
    price: 20,
    image: "public/Logo.png",
  },
  {
    id: 14,
    name: "Product 12",
    price: 20,
    image: "public/Logo.png",
  },
  {
    id: 15,
    name: "Product 12",
    price: 20,
    image: "public/Logo.png",
  },
  {
    id: 16,
    name: "Product 12",
    price: 20,
    image: "public/Logo.png",
  },
];

const ProductList = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const productsPerPage = 8;
  const totalPages = Math.ceil(products.length / productsPerPage);

  const nextPage = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const prevPage = () => {
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  const renderProducts = () => {
    const startIndex = currentIndex * productsPerPage;
    const visibleProducts = products.slice(
      startIndex,
      startIndex + productsPerPage
    );

    return visibleProducts.map((product) => (
      <div key={product.id} className="border p-4 product-card">
        <img
          src={product.image}
          alt={product.name}
          className="w-64 h-auto mb-2 product-image"
        />
        <h2 className="text-xl font-bold">{product.name}</h2>
        <p>${product.price}</p>
      </div>
    ));
  };

  return (
    <div className="bg-white">
      <div className="flex justify-between items-center p-4">
        <h2 className="text-2xl font-bold">Danh mục tìm kiếm thịnh hành</h2>
      </div>

      <div className="flex flex-col flex-wrap justify-between items-center p-4">
        <button
          className="prev-button bg-black text-white px-4 py-2 rounded-md"
          onClick={prevPage}
          disabled={currentIndex === 0}
        >
          {"<"}
        </button>

        <div className="product-list flex space-x-4">{renderProducts()}</div>

        <button
          className="next-button  bg-black text-white px-4 py-2 rounded-md"
          onClick={nextPage}
          disabled={currentIndex === totalPages - 1}
        >
          {">"}
        </button>
      </div>
    </div>
  );
};

export default ProductList;
