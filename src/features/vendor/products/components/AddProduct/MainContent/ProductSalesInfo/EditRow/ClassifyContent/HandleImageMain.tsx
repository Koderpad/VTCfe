import { useState, useRef, useEffect } from "react";
import { ImageUploadPreview } from "./ImageUploadPreview";
import { ImageModal } from "./ImageModal";
import { ImageEditor } from "./ImageEditor";
import { ImageUpload } from "./ImageUpload";

export const HandleImageMain = ({
  handleData,
}: {
  handleData: (ImageData: string) => void;
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [imageData, setImageData] = useState<string | null>(null);

  const [isOpen, setIsOpen] = useState(false);

  const handleCropClick = () => {
    setIsOpen(true);
  };

  // Inside HandleImageMain component
  useEffect(() => {
    if (imageData) {
      handleData(imageData);
    }
  }, [imageData]);

  // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   if (event.target.files && event.target.files.length > 0) {
  //     const file = event.target.files[0];
  //     const reader = new FileReader();
  //     reader.addEventListener("load", () => {
  //       const img = new Image();
  //       img.onload = function () {
  //         const canvas = document.createElement("canvas");
  //         const maxSize = Math.max(img.width, img.height);
  //         canvas.width = maxSize;
  //         canvas.height = maxSize;
  //         const ctx = canvas.getContext("2d");
  //         if (ctx) {
  //           ctx.fillStyle = "white";
  //           ctx.fillRect(0, 0, maxSize, maxSize);
  //           ctx.drawImage(
  //             img,
  //             (maxSize - img.width) / 2,
  //             (maxSize - img.height) / 2
  //           );
  //           const dataUrl = canvas.toDataURL();
  //           setImageData(dataUrl);
  //         }
  //       };
  //       img.src = reader.result as string;
  //     });
  //     reader.readAsDataURL(file);
  //   }
  // };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        const img = new Image();
        img.onload = function () {
          const canvas = document.createElement("canvas");
          const desiredSize = 1000; // Set the desired size here
          canvas.width = desiredSize;
          canvas.height = desiredSize;
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.fillStyle = "white";
            ctx.fillRect(0, 0, desiredSize, desiredSize);
            // Automatically zoom the image
            const scale = desiredSize / Math.max(img.width, img.height);
            const scaledWidth = img.width * scale;
            const scaledHeight = img.height * scale;
            const x = (desiredSize - scaledWidth) / 2;
            const y = (desiredSize - scaledHeight) / 2;
            ctx.drawImage(
              img,
              0,
              0,
              img.width,
              img.height,
              x,
              y,
              scaledWidth,
              scaledHeight
            );
            const dataUrl = canvas.toDataURL();
            setImageData(dataUrl);
          }
        };
        img.src = reader.result as string;
      });
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      console.log(fileInputRef.current.files);
    }
  };

  return (
    // ui của hình ảnh sản phẩm
    <div id="edit-row" className="flex mb-[24px]">
      {/* edit-main image-manager */}
      <div id="edit-main vtc-image-manager">
        {/* container */}
        <div id="container" className="flex flex-wrap h-[96px]">
          {/*ui hình ảnh đã có*/}
          {imageData ? (
            <ImageUploadPreview
              src={imageData}
              handleCropClick={handleCropClick}
            />
          ) : (
            // ui chưa có hình ảnh
            <ImageUpload
              fileInputRef={fileInputRef}
              handleFileChange={handleFileChange}
              handleButtonClick={handleButtonClick}
            />
          )}
        </div>

        {/* -modal image-cropper-modal */}
        {/* <div id="image-cropper-modal"></div> */}
        <ImageModal
          isOpen={isOpen}
          onClose={() => {
            setIsOpen(false);
          }}
        >
          <ImageEditor
            src={imageData || ""}
            onSave={setImageData}
            onCloseModal={() => {
              setIsOpen(false);
            }}
          />
        </ImageModal>
      </div>
    </div>
  );
};
