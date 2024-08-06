import React from "react";
import classNames from "classnames";

interface DonateSectionProps {
  darkMode: boolean;
  handleOpenDonate: () => void;
}

const DonateSection: React.FC<DonateSectionProps> = ({ darkMode, handleOpenDonate }) => {
  return (
    <div className="relative group my-auto" onClick={handleOpenDonate}>
      <p className="hover:opacity-50 cursor-pointer font-bold">Đóng góp</p>
      <div
        className={classNames(
          darkMode ? "bg-slate-700" : "bg-gray-200",
          "absolute hidden group-hover:block p-4 rounded-lg shadow-lg left-5 top-full transform translate-x-[-50%] w-52 h-auto mt-4"
        )}
      >
        <div className="text-center">
          <p
            className={classNames(
              darkMode ? "text-white" : "text-slate-800",
              "mb-2 text-sm font-semibold"
            )}
          >
            Ủng hộ chúng tôi tại đây
          </p>
          <img
            src="https://qrcode-gen.com/images/qrcode-default.png"
            alt="QR Code"
            loading="lazy"
            className="rounded-md w-32 h-32 mx-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default DonateSection;
