import React from "react";

interface ModelSaveInfProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const ModalSaveInf: React.FC<ModelSaveInfProps> = ({
  open,
  onClose,
  children,
}) => {
  return (
    <div>
      <div
        onClick={onClose}
        className={`
      fixed inset-0 flex justify-center items-center transition-colors 
      ${open ? "visible bg-black/20" : "invisible"}
      `}
      >
        {/* modal */}
        <div
          onClick={(e) => e.stopPropagation()}
          className={`
            bg-white rounded-xl shadow p-6 transition-all 
            ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}
        `}
        >
          <button
            type="button"
            onClick={onClose}
            className="
                    absolute top-2 right-2 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600
                  "
          >
            <svg
              width="16"
              height="14"
              viewBox="0 0 16 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                id="Vector"
                d="M14.5 0H1.5C0.671875 0 0 0.671875 0 1.5V12.5C0 13.3281 0.671875 14 1.5 14H14.5C15.3281 14 16 13.3281 16 12.5V1.5C16 0.671875 15.3281 0 14.5 0ZM11.8875 9.07812C12.0375 9.22812 12.0375 9.47188 11.8875 9.62187L10.6219 10.8875C10.4719 11.0375 10.2281 11.0375 10.0781 10.8875L8 8.79062L5.92188 10.8875C5.77187 11.0375 5.52812 11.0375 5.37812 10.8875L4.1125 9.62187C3.9625 9.47188 3.9625 9.22812 4.1125 9.07812L6.20937 7L4.1125 4.92188C3.9625 4.77187 3.9625 4.52813 4.1125 4.37813L5.37812 3.1125C5.52812 2.9625 5.77187 2.9625 5.92188 3.1125L8 5.20937L10.0781 3.1125C10.2281 2.9625 10.4719 2.9625 10.6219 3.1125L11.8875 4.37813C12.0375 4.52813 12.0375 4.77187 11.8875 4.92188L9.79062 7L11.8875 9.07812Z"
                fill="#E20010"
              />
            </svg>
          </button>
          {children}
        </div>
      </div>
    </div>
  );
};

export default ModalSaveInf;
