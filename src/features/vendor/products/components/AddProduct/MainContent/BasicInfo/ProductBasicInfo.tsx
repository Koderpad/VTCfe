import { CategoryProduct } from "./EditRow/CategoryProduct";
import { DescripProduct } from "./EditRow/DescripProduct";
import { ImageProduct } from "./EditRow/ImageProduct";
import { NameProduct } from "./EditRow/NameProduct";
import { PanelHeader } from "./PanelHeader";

export const ProductBasicInfo = () => {
  return (
    <section id="product-edit-section" className="bg-[#FAFAF9]">
      <div id="product-basic-info" className="px-[24px] pt-[24px]">
        <PanelHeader title="Thông tin cơ bản" />

        <div id="panel-content-wrapper" className="mb-[24px]">
          <div id="panel-content" className="">
            <div id="container" className="flex flex-col">
              {/* row */}
              <ImageProduct />
              {/* row */}
              <NameProduct />
              {/* row */}
              <CategoryProduct />
              {/* row */}
              <DescripProduct />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
