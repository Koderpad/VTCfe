import {useCallback, useEffect, useRef, useState} from "react";
import {ImageModal} from "./ImageModal";
import {ImageEditor} from "./ImageEditor";
import {storage} from "../../../../../../constants/firebaseConfig";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import {ScaleLoader} from "react-spinners";
import Modal from "react-modal";

const metadata = {
    contentType: "image/jpeg",
};

interface Props {
    existsImage: string;
    setImageUrl: (img: string) => void;
}

export const Image = ({existsImage, setImageUrl}: Props) => {
    // const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [imageData, setImageData] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    useEffect(() => {
        if (imageData != existsImage) {
            uploadImageToFirebase();
        }
    }, [imageData]);

    const uploadImageToFirebase = useCallback(async () => {
        if (imageData) {
            setIsUploading(true);

            const storageRef = ref(
                storage,
                `images/${Date.now()}-${fileInputRef.current?.files?.[0]?.name}-test27`
            );
            const uploadTask = uploadBytesResumable(
                storageRef,
                dataURLtoBlob(imageData),
                metadata
            );

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    // Your existing code to track upload progress
                },
                (error) => {
                    console.error("Error uploading image:", error);
                },
                async () => {
                    // Image uploaded successfully
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    console.log("Uploaded image URL:", downloadURL);
                    setImageUrl(downloadURL);
                    setIsUploading(false);
                }
            );
        }
    }, [imageData]);

    const dataURLtoBlob = (dataURL: string): Blob => {
        const arr = dataURL.split(",");
        const mime = arr[0].match(/:(.*?);/)![1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], {type: mime});
    };


    const [isOpen, setIsOpen] = useState(false);

    const handleCropClick = () => {
        setIsOpen(true);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                // const img = new Image();
                const img = document.createElement("img");
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


    return (
        // ui của hình ảnh sản phẩm
        <div id="edit-row" className="flex mb-[24px]">
            {/* title */}
            <div id="edit-label edit-title" className="mr-[16px]">
                <span className="">Hình ảnh sản phẩm</span>
            </div>

            {/* content */}
            <div id="edit-main image-offset" className="-mb-[16px]">
                {/* ratio note */}
                <div id="ratio-note" className="flex">
                    <div id="mandatory">
            <span
                id="mandatory-icon"
                className="mr-[3px]"
                style={{color: "red"}}
            >
              *
            </span>
                    </div>
                    <span className="">Hình ảnh tỷ lệ 1:1</span>
                </div>

                {/* edit-main image-manager */}
                <div id="edit-main vtc-image-manager">
                    {/* container */}
                    <div id="container" className="flex flex-wrap h-[96px]">
                        {/*ui hình ảnh đã có*/}
                        {(imageData || existsImage) && (
                            <div
                                id="can-drag vtc-image-manager__itembox"
                                className="w-[96px] mb-[16px] mr-[16px] max-w-[80px] max-h-[80px]"
                            >
                                <div id="popover-wrap" className=" h-[80px]">
                                    <div
                                        id="shopee-image-manager__content content-fill"
                                        className="relative h-full"
                                    >
                                        <img
                                            src={imageData ? imageData : existsImage}
                                            alt="image"
                                            className="absolute border-[0.8px] h-full w-full object-fill"
                                        />
                                        <div
                                            id="shopee-image-manager__tools"
                                            className="flex justify-center gap-3 absolute bottom-0 right-0 left-0 h-[24px] w-[80px]
                    bg-[#D6D3D1] bg-opacity-100"
                                        >
                      <span
                          id="shopee-image-manager__icon shopee-image-manager__icon--crop"
                          className=" w-[24px] h-[24px]
                       flex items-center justify-center cursor-pointer
                      "
                          onClick={handleCropClick}
                      >
                        <i id="shopee-icon" className="h-[16px] w-[16px]">
                          <span className="h-auto w-auto">
                            <svg
                                version="1.0"
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 1.2 1.2"
                                xmlSpace="preserve"
                            >
                              <path
                                  fill="none"
                                  stroke="#000"
                                  strokeWidth="0.037500000000000006"
                                  strokeMiterlimit="10"
                                  d="M0 0.206h0.994V1.2"
                              />
                              <path
                                  fill="none"
                                  stroke="#000"
                                  strokeWidth="0.037500000000000006"
                                  strokeMiterlimit="10"
                                  d="M0.206 0v0.994H1.2m-0.994 0 0.975 -0.975"
                              />
                            </svg>
                          </span>
                        </i>
                      </span>
                                            <span
                                                id="decollator"
                                                className="border-l h-auto w-[1px] border-gray-400"
                                            ></span>
                                            <span
                                                id="shopee-image-manager__icon shopee-image-manager__icon--delete"
                                                className=" w-[24px] h-[24px]
                       flex items-center justify-center cursor-pointer
                      "
                                                onClick={() => {
                                                    setImageData(null);
                                                    setImageUrl("");
                                                }}
                                            >
                        <i id="shopee-icon" className="h-[16px] w-[16px]">
                          <span>
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 20.48 20.48"
                                className="icon"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                  d="M3.2 5.12H1.92a.64.64 0 0 1 0-1.28h5.12V1.919a.64.64 0 0 1 .64-.64h5.12a.64.64 0 0 1 .64.64V3.84h5.12a.64.64 0 1 1 0 1.28h-1.28v13.44a.64.64 0 0 1-.64.64H3.84a.64.64 0 0 1-.64-.64V5.12zm8.96-1.28V2.56H8.32v1.28h3.84zM4.48 17.92H16V5.12H4.48v12.8zm3.84-2.56a.64.64 0 0 1-.64-.64v-6.4a.64.64 0 0 1 1.28 0v6.4a.64.64 0 0 1-.64.64zm3.84 0a.64.64 0 0 1-.64-.64v-6.4a.64.64 0 0 1 1.28 0v6.4a.64.64 0 0 1-.64.64z"/>
                            </svg>
                          </span>
                        </i>
                      </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {/*thêm hình ảnh*/}
                        {!imageData && !existsImage && (
                            <div
                                id="vtc-image-manager__itembox"
                                className="w-[96px] mb-[16px] mr-[16px] max-w-[80px] max-h-[80px]"
                            >
                                <div
                                    id="vtc-image-manager__content"
                                    className="relative pt-[80x] h-0"
                                >
                                    <div
                                        id="vtc-image-manager__upload"
                                        className="flex flex-col h-[80px] border-[0.8px] hover:bg-gray-200"
                                    >
                                        <div id="vtc-file-upload" className="border-[0.8px] h-full">
                                            <div id="vtc-upload" className="relative h-full">
                                                <div
                                                    id="vtc-upload-wrapper vtc-upload-dragger"
                                                    className="flex items-center justify-center h-full"
                                                >
                                                    <input
                                                        ref={fileInputRef}
                                                        id="vtc-upload__input"
                                                        type="file"
                                                        accept="image/*"
                                                        className="h-full w-full absolute cursor-pointer"
                                                        style={{
                                                            opacity: "0",
                                                            aspectRatio: "1/1",
                                                        }}
                                                        onChange={handleFileChange}
                                                    />
                                                    <div
                                                        id="vtc-image-manager__upload__content"
                                                        className="flex flex-col items-center px-[2px]"
                                                        style={{color: "#ee4d2d"}}
                                                    >
                                                        <div id="vtc-image-manager__upload__content__icon">
                                                            <i id="vtc-icon">
                                                                <svg
                                                                    width="20"
                                                                    height="20"
                                                                    viewBox="0 0 20 20"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                >
                                                                    <path
                                                                        d="M19 2.5A1.5 1.5 0 0 0 17.5 1h-15A1.5 1.5 0 0 0 1 2.5v15A1.5 1.5 0 0 0 2.5 19H10v-2H3.497c-.41 0-.64-.46-.4-.79l3.553-4.051c.19-.21.52-.21.72-.01L9 14l3.06-4.781a.5.5 0 0 1 .84.02l.72 1.251A5.98 5.98 0 0 1 16 10h3V2.5zm-11.5 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm12.207 10.793A1 1 0 0 0 19 15h-2v-2a1 1 0 0 0-2 0v2h-2a1 1 0 0 0 0 2h2v2a1 1 0 1 0 2 0v-2h2a1 1 0 0 0 .707-1.707z"
                                                                        fill="#5C5F62"
                                                                    />
                                                                </svg>
                                                            </i>
                                                        </div>
                                                        <div
                                                            id="vtc-image-manager__upload__content__text"
                                                            style={{
                                                                fontSize: "12px",
                                                                lineHeight: "14px",
                                                                textAlign: "center",
                                                            }}
                                                        >
                                                            Thêm hình ảnh (1/9)
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <Modal
                        isOpen={isUploading}
                        style={{
                            overlay: {
                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            },
                            content: {
                                position: 'relative',
                                border: 'none',
                                background: 'none',
                                overflow: 'auto',
                                WebkitOverflowScrolling: 'touch',
                                borderRadius: '4px',
                                outline: 'none',
                                padding: '20px',
                            },
                        }}
                    >
                        <ScaleLoader color="#36D7B7"/>
                    </Modal>
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
        </div>
    );
};
