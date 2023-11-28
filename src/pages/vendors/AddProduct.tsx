import { useState } from "react";
import ReactModal from "react-modal";
import { Coordinates, CropperRef } from "react-advanced-cropper";

import "react-advanced-cropper/dist/style.css";
import { ImageEditor } from "./ImageEditor";

ReactModal.setAppElement("#root");

export const AddProduct = () => {
  const [isOpen, setIsOpen] = useState(false);

  //request close modal
  const handleCloseModal = () => {
    //close modal
    setIsOpen(false);
  };

  const handleRequestCloseFunc = () => {
    //close modal
    console.log("close modal by click outside");
    setIsOpen(false);
  };

  const handleOpenModal = () => {
    setIsOpen(true);
  };
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [image, setImage] = useState<string | undefined>("thủy tổ");
  const [test, setTest] = useState<number>(1);

  // const [src] = useState(
  //   "https://images.unsplash.com/photo-1599140849279-1014532882fe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1300&q=80"
  // );

  let crop: CropperRef;

  // const onChange = (cropper: CropperRef) => {
  //   crop = cropper;
  //
  //   // setCoordinates(cropper.getCoordinates());
  //   setImage(cropper.getCanvas()?.toDataURL());
  //
  //   // console.log('onChange ', coordinates);
  // };

  const handleCrossImage = () => {
    console.log("cross image");

    console.log(crop.getCoordinates());
    console.log(crop.getCanvas()?.toDataURL());
    console.log("in ra gia tri sau Set:");
    setTest(test + 1);
    setCoordinates(crop.getCoordinates());
    setImage(crop.getCanvas()?.toDataURL());
    console.log(image);
    console.log(coordinates);
    console.log(test);
  };

  //   return (
  //   <>
  //     <div className="flex flex-col min-h-screen">
  //       <Header_not_fixed />
  //       {/* page product */}
  //       <div className="flex justify-center bg-gradient-to-r from-blue-400 to-emerald-400">
  //         {/* main container */}
  //         <div className="w-4/5">
  //           <ProductCard />
  //         </div>
  //       </div>
  //
  //       <Footer_v1 />
  //     </div>
  //   </>
  // );

  return (

    <>
      <button onClick={handleOpenModal}>Open Modal</button>
      {/*<button onClick={handleCrossImage(cropper)}>Cross Image</button>*/}
      <button onClick={handleCrossImage}>Cross Image</button>
{/*      <Cropper src={src} onChange={onChange} 
        stencilProps={
          {
            grid:true,
          }
        }
      />;*/}
      <ReactModal
        isOpen={isOpen}
        contentLabel="example modal"
        onRequestClose={handleRequestCloseFunc}
        className={"bg-blue-500 absolute top-40 left-40 right-40 bottom-40"}
      // overlayClassName="Overlay"
      >
        
        <ImageEditor/>
        

        <button onClick={handleCloseModal}>Close Modal</button>
      </ReactModal>
    </>
  );
};
