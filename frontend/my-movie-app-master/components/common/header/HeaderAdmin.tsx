import React from "react";
import HeaderLayout from "./HeaderLayout";
import { useRouter } from "next/router";
import { CirclePlusIcon } from "../icon/CirclePlucIcon";
import Tooltip from "@mui/material/Tooltip";
import { useSelector } from "react-redux";
import { getDanhMucTab, getPhimTab } from "@/slices/redux";
import { Avatar } from "@mui/material";

const HeaderAdmin = ({ onClick, title }) => {
  const router = useRouter();

  const isPhimTabActive = useSelector(getPhimTab);
  const isDanhMucTabActive = useSelector(getDanhMucTab);

  let content = "";
  if (isPhimTabActive) content = "Thêm phim mới";
  if (isDanhMucTabActive) content = "Thêm danh mục";

  return (
    <HeaderLayout>
      <div className="px-2 tlg:px-6 flex items-center justify-between">
        {(isPhimTabActive || isDanhMucTabActive) && (
          <Tooltip title={content}>
            <div
              className="ml-4 text-blue-500 hover:text-blue-700"
              onClick={onClick}
            >
              <CirclePlusIcon />
            </div>
          </Tooltip>
        )}
        <p className="text-[20px] font-semibold mx-4">{title}</p>
      </div>
      <div className="px-6 cursor-pointer">
        <Avatar />
      </div>
    </HeaderLayout>
  );
};

export default HeaderAdmin;
