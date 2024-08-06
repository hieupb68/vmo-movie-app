import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import classnames from "classnames";
import { ListIcon } from "./icon/ListIcon";
import { UserIcon } from "./icon/UserIcon";
import { AssetIcon } from "./icon/AssetIcon";
import { ClipboardIcon } from "./icon/ClipboardIcon";
import { useDispatch, useSelector } from "react-redux";
import {
  setActivePhimTab,
  getPhimTab,
  setActiveDanhMucTab,
  getDanhMucTab,
  setActiveNguoiDungTab,
  getNguoiDungTab,
  setActiveFeedbackTab,
  getFeedbackTab,
} from "../../slices/redux";
import { FilmIcon } from "./icon/FilmIcon";

const MenuBar = () => {
  const router = useRouter();
  const [narrow, setNarrow] = useState(false);
  const dispatch = useDispatch();

  const isPhimTabActive = useSelector(getPhimTab);
  const isDanhMucTabActive = useSelector(getDanhMucTab);
  const isNguoiDungTabActive = useSelector(getNguoiDungTab);
  const isFeedbackTabActive = useSelector(getFeedbackTab);

  useEffect(() => {
    dispatch(setActivePhimTab(true));
  }, [dispatch]);

  const handleTogglePhimTab = () => {
    dispatch(setActivePhimTab(true));
    dispatch(setActiveDanhMucTab(false));
    dispatch(setActiveNguoiDungTab(false));
    dispatch(setActiveFeedbackTab(false));
  };

  const handleToggleDanhMucTab = () => {
    dispatch(setActivePhimTab(false));
    dispatch(setActiveDanhMucTab(true));
    dispatch(setActiveNguoiDungTab(false));
    dispatch(setActiveFeedbackTab(false));
  };

  const handleToggleNguoiDungTab = () => {
    dispatch(setActivePhimTab(false));
    dispatch(setActiveDanhMucTab(false));
    dispatch(setActiveNguoiDungTab(true));
    dispatch(setActiveFeedbackTab(false));
  };

  const handleToggleFeedbackTab = () => {
    dispatch(setActivePhimTab(false));
    dispatch(setActiveDanhMucTab(false));
    dispatch(setActiveNguoiDungTab(false));
    dispatch(setActiveFeedbackTab(true));
  };

  return (
    <div
      className={classnames(
        "fixed h-screen p-2 tlg:flex flex-col z-50 bg-slate-200",
        !narrow ? "w-24" : "w-60 shadow-lg"
      )}
    >
      {/* Header */}
      <div
        className="flex justify-center cursor-pointer mt-3"
        onClick={() => setNarrow(!narrow)}
      >
        <ListIcon />
        {narrow && <p className="pl-4">Logo my-movie-app</p>}
      </div>
      {/* Body */}
      <div className="justify-center">
        <div
          className={classnames(
            "my-4 py-1 hover:bg-blue-400 hover:text-white cursor-pointer rounded-lg",
            narrow && "flex",
            isPhimTabActive ? "bg-blue-400 text-white" : "text-black"
          )}
          onClick={handleTogglePhimTab}
        >
          <div className={classnames("mx-6 my-2")}>
            <FilmIcon />
          </div>
          <p
            className={classnames(
              "mt-2 text-[12px] text-center",
              narrow && "text-[16px]"
            )}
          >
            Phim
          </p>
        </div>

        <div
          className={classnames(
            "my-4 py-1 hover:bg-blue-400 hover:text-white cursor-pointer rounded-lg",
            narrow && "flex",
            isDanhMucTabActive ? "bg-blue-400 text-white" : "text-black"
          )}
          onClick={handleToggleDanhMucTab}
        >
          <div className={classnames("mx-6 my-2")}>
            <AssetIcon />
          </div>
          <p
            className={classnames(
              "mt-2 text-[12px] text-center",
              narrow && "text-[16px]"
            )}
          >
            Danh mục phim
          </p>
        </div>

        <div
          className={classnames(
            "my-4 py-1 hover:bg-blue-400 hover:text-white cursor-pointer rounded-lg",
            narrow && "flex",
            isNguoiDungTabActive ? "bg-blue-400 text-white" : "text-black"
          )}
          onClick={handleToggleNguoiDungTab}
        >
          <div className={classnames("mx-6 my-2")}>
            <UserIcon />
          </div>
          <p
            className={classnames(
              "mt-2 text-[12px] text-center",
              narrow && "text-[16px]"
            )}
          >
            Người dùng
          </p>
        </div>

        <div
          className={classnames(
            "my-4 py-1 hover:bg-blue-400 hover:text-white cursor-pointer rounded-lg",
            narrow && "flex",
            isFeedbackTabActive ? "bg-blue-400 text-white" : "text-black"
          )}
          onClick={handleToggleFeedbackTab}
        >
          <div className={classnames("mx-6 my-2")}>
            <ClipboardIcon />
          </div>
          <p
            className={classnames(
              "mt-2 text-[12px] text-center",
              narrow && "text-[16px]"
            )}
          >
            Feedback
          </p>
        </div>
      </div>
    </div>
  );
};

export default MenuBar;
