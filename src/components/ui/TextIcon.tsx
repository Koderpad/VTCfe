import React from "react";

// import PropTypes from "prop-types";
interface TextIconProps {
  srcSet: string;
}

const TextIcon: React.FC<TextIconProps> = ({ srcSet }) => {
  return (
    <>
      <img
        loading="lazy"
        srcSet={srcSet}
        className="aspect-square text-2xl object-center w-[22px] overflow-hidden self-stretch max-w-full"
        alt="Image"
      />
    </>
  );
};

export default TextIcon;
