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
        className="tw-aspect-square  tw-object-center tw-w-[22px] tw-overflow-hidden tw-self-stretch tw-max-w-full"
        alt="Image"
      />
    </>
  );
};

// TextIcon.propTypes = {
//   srcSet: PropTypes.string.isRequired,
// };

export default TextIcon;
