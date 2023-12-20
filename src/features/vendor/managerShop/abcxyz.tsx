import { useEffect, useRef, useState } from "react";
import { storage } from "../../../constants/firebaseConfig";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const metadata = {
  contentType: "image/jpeg",
};

export const Abc = () => {
  const [imageData, setImageData] = useState<string | undefined>(undefined);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [url, setUrl] = useState<string | undefined>(undefined);

  useEffect(() => {
    uploadImageToFirebase();
  }, [imageData]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const uploadImageToFirebase = async () => {
    if (imageData) {
      const storageRef = ref(
        storage,
        `images/${Date.now()}-${fileInputRef.current?.files?.[0]?.name}`
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
          setUrl(downloadURL);
          console.log("up thanh cong: ", downloadURL);
        }
      );
    }
  };

  const dataURLtoBlob = (dataURL: string): Blob => {
    const arr = dataURL.split(",");
    const mime = arr[0].match(/:(.*?);/)![1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  };

  //   const handleButtonClick = () => {
  //     if (fileInputRef.current) {
  //       console.log(fileInputRef.current.files);

  //       uploadImageToFirebase();
  //     }
  //   };

  const handleFileChange = () => {
    if (fileInputRef.current && fileInputRef.current.files) {
      const file = fileInputRef.current.files[0];
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImageData(reader.result as string);
      });
      reader.readAsDataURL(file);
      setImageData(reader.result as string);
    }
  };

  return (
    <div className="flex flex-col bg-slate-400">
      <input
        ref={fileInputRef}
        id="vtc-upload__input"
        type="file"
        accept="image/*"
        // onClick={handleButtonClick}
        onChange={handleFileChange}
      />
      <div className="flex flex-col gap-11">
        <img src={url ? url : ""} className="w-[200px] h-[200px]" />
        {/* <img src={imageData ? imageData : ""} className="w-[200px] h-[200px]" /> */}
      </div>
    </div>
  );
};
