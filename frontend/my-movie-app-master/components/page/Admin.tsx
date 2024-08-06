import React, { useEffect, useState } from "react";
import {
  getDanhMucTab,
  getFeedbackTab,
  getNguoiDungTab,
  getPhimTab,
  setActiveDanhMucTab,
  setActiveFeedbackTab,
  setActiveNguoiDungTab,
  setActivePhimTab,
} from "@/slices/redux";
import MenuBar from "../common/Sidebar";
import HeaderAdmin from "../common/header/HeaderAdmin";
import FilmTable from "../composite/table_admin/FilmTable";
import { useDispatch, useSelector } from "react-redux";
import CategoryTable from "@/components/composite/table_admin/CategoryTable";
import UserTable from "@/components/composite/table_admin/UserTable";
import FeedbackTable from "@/components/composite/table_admin/FeedbackTable";
import AddFilmModal from "../composite/modal/film/Add";
import AddCategoryModal from "../composite/modal/category/Add";

export default function Admin() {
  const dispatch = useDispatch();
  const [openAddFilm, setOpenAddFilm] = useState(false);
  const [openAddCategory, setOpenAddCategory] = useState(false);

  const handleAddFilm = () => {
    setOpenAddFilm(true);
  };

  const handleAddCategory = () => {
    setOpenAddCategory(true);
  };

  const handleClose = () => {
    setOpenAddFilm(false);
    setOpenAddCategory(false);
  };

  const handleSave = () => {
    alert("Thêm thành công !!!");
  };

  const isPhimTabActive = useSelector(getPhimTab);
  const isDanhMucTabActive = useSelector(getDanhMucTab);
  const isNguoiDungTabActive = useSelector(getNguoiDungTab);
  const isFeedbackTabActive = useSelector(getFeedbackTab);

  let title = "Danh sách phim";
  if (isPhimTabActive) title = "Danh sách phim";
  if (isDanhMucTabActive) title = "Quản lý danh mục";
  if (isNguoiDungTabActive) title = "Danh sách người dùng";
  if (isFeedbackTabActive) title = "Quản lý feedback";

  useEffect(() => {
    dispatch(setActivePhimTab(true));
    dispatch(setActiveDanhMucTab(false));
    dispatch(setActiveNguoiDungTab(false));
    dispatch(setActiveFeedbackTab(false));
  }, []);

  return (
    <>
      <div className="bg-slate-200">
        <div className="flex h-screen">
          <MenuBar />
          <div className="flex flex-col ml-24 w-full h-full">
            <HeaderAdmin
              onClick={isPhimTabActive ? handleAddFilm : handleAddCategory}
              title={title}
            />
            {isPhimTabActive && <FilmTable />}
            {isDanhMucTabActive && <CategoryTable />}
            {isNguoiDungTabActive && <UserTable />}
            {isFeedbackTabActive && <FeedbackTable />}
          </div>
        </div>
      </div>

      {/* Modal add */}
      <AddFilmModal
        open={openAddFilm}
        onClose={handleClose}
        onSave={handleSave}
      />
      <AddCategoryModal
        open={openAddCategory}
        onClose={handleClose}
        onSave={handleSave}
      />
    </>
  );
}
