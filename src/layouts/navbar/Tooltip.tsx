import ContentTooltip from "./ContentTooltip";

function Tooltip() {
  return (
    <>
      <div className="container mx-auto px-6 flex items-start pl-12 md:pl-0 md:items-center">
        <div className="h-0 md:h-12"></div>
        <div className="flex-col md:flex-row flex items-center md:justify-center">
          <a
            tabIndex={0}
            role="link"
            aria-label="tooltip 1"
            className="focus:outline-none focus:ring-gray-300 rounded-full focus:ring-offset-2 focus:ring-2 focus:bg-gray-200 relative mt-20 md:mt-0"
          >
            <div className=" cursor-pointer">Hello</div>
            <ContentTooltip />
          </a>
        </div>
      </div>
    </>
  );
}

export default Tooltip;
