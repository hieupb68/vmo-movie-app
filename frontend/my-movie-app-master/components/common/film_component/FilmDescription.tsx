import React from "react";
import classNames from "classnames";
import { useDarkMode } from "../../../context/DarkModeContext";

interface FilmDescriptionProps {
  description: string | undefined;
}

const FilmDescription: React.FC<FilmDescriptionProps> = ({ description }) => {
  const { darkMode } = useDarkMode();

  return (
    <div className="mx-auto w-[1200px] p-6">
      <p
        className={classNames(
          "font-bold text-[20px] border-b-2 border-blue-300 pb-2",
          darkMode ? "text-blue-100" : "text-blue-400"
        )}
      >
        Tóm tắt
      </p>
      <p
        className={classNames(
          "text-[14px] leading-8 mt-4",
          darkMode ? "text-slate-300" : "text-slate-800"
        )}
      >
        {description}
      </p>
    </div>
  );
};

export default FilmDescription;
