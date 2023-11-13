import ContentTooltip from "./ContentTooltip";

function Tooltip() {
  return (
    <>
      <div className="tw-container tw-mx-auto tw-px-6 tw-flex tw-items-start tw-pl-12 md:tw-pl-0 md:tw-items-center">
        <div className="tw-h-0 md:tw-h-12"></div>
        <div className="tw-flex-col md:tw-flex-row tw-flex tw-items-center md:tw-justify-center">
          <a
            tabIndex={0}
            role="link"
            aria-label="tooltip 1"
            className="focus:tw-outline-none focus:tw-ring-gray-300 tw-rounded-full focus:tw-ring-offset-2 focus:tw-ring-2 focus:tw-bg-gray-200 tw-relative tw-mt-20 md:tw-mt-0"
          >
            <div className=" tw-cursor-pointer">Hello</div>
            <ContentTooltip />
          </a>
        </div>
      </div>
    </>
  );
}

export default Tooltip;
