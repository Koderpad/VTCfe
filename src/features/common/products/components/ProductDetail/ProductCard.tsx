import { useEffect, useState } from "react";
import { useGetProductByIdQuery } from "../../services/noAuth/productDetailApi.ts";
import { ImageSliderComponent } from "./ImageSlider";
import { ProductCardProductInfo } from "./ProductCardProductInfo";

// Định nghĩa kiểu dữ liệu cho đối tượng thuộc tính sản phẩm
interface AttributeDTO {
  attributeId: number;
  name: string;
  value: string;
  active: boolean;
  shopId: number;
}

// Định nghĩa kiểu dữ liệu cho đối tượng biến thể sản phẩm
interface ProductVariantDTO {
  productVariantId: number;
  sku: string;
  image: string;
  price: number;
  quantity: number;
  status: string;
  productId: number;
  attributeDTOs: AttributeDTO[];
}

// Định nghĩa kiểu dữ liệu cho đối tượng sản phẩm
interface ProductDTO {
  productId: number;
  name: string;
  image: string;
  description: string;
  information: string;
  sold: number;
  status: string;
  categoryId: number;
  brandId: number | null;
  productVariantDTOs: ProductVariantDTO[];
}

// Props cho component ProductCard
interface ProductCardProps {
  // id: number;
  id: string | undefined;
}

export const ProductCard: React.FC<ProductCardProps> = ({ id }) => {
  const [product, setProduct] = useState<ProductDTO | null>(null);
  const [imageThumbnail, setImageThumbnail] = useState<
    {
      original: string;
      thumbnail: string;
    }[]
  >([]);
  const {
    data: response,
    isFetching,
    isLoading,
  } = useGetProductByIdQuery(parseInt(id!));

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Access data directly from the response, not by calling the hook again
        setProduct(response?.productDTO || null);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id, response]); // Include response as a dependency

  useEffect(() => {
    if (product === null) {
      return;
    }

    const images: { original: string; thumbnail: string }[] =
      product?.productVariantDTOs
        .filter((item) => item.image !== "")
        .map((item) => {
          return {
            original: item.image,
            thumbnail: item.image,
          };
        });

    //get image for product
    // const image = product?.productVariantDTOs[0].image;
    const image = product?.image;

    //add image into images
    images?.unshift({
      original: image!,
      thumbnail: image!,
    });
    console.log("images list: ", images);

    //set imageThumbnail
    setImageThumbnail(images!);
  }, [product]);

  console.log("product", product);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isFetching) {
    return <div>Fetching...</div>;
  }

  return (
    <section className="overflow-hidden bg-white py-11 font-poppins">
      <div className="lg:py-8 md:px-6">
        <div className="flex flex-wrap w-full">
          {/* image */}
          <div className="w-full px-4 md:w-2/5 ">
            <ImageSliderComponent imagesz={imageThumbnail} />
          </div>
          {/* product info */}
          <div className="w-full px-4 md:w-3/5">
            <ProductCardProductInfo
              product={product}
              rating={response?.rating}
              sold={response?.productDTO?.sold}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
