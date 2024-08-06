import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { Avatar, Tooltip } from "@mui/material";
import { useRouter } from "next/router";
import {
  DarkModeOutlined,
  LightMode,
  SearchOutlined,
  Login,
} from "@mui/icons-material";
import { useFilmType } from "../../../context/FilmTypeContext";
import { useDarkMode } from "../../../context/DarkModeContext";
import { useSearchModal } from "../../../context/SearchContext";
import axios from "axios";
import { useDonateModal } from "@/context/DonateContext";
import { useUser } from "@/context/AuthContext";
import UserMenu from "./UserMenu";
import DonateSection from "./DonateSection";

const Header = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const router = useRouter();
  const [isActive, setIsActive] = useState<string | null>(null);
  const [filmTypes, setFilmTypes] = useState<{ id: string; name: string }[]>([]);
  const { setFilmType } = useFilmType();
  const { setOpen } = useSearchModal();
  const { setOpenDonate } = useDonateModal();
  const { logout } = useUser();
  const [userInfo, setUserInfo] = useState<{
    email?: string;
    name?: string;
    image?: string;
  } | null>(null);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // Fetch film types from API
  useEffect(() => {
    const fetchFilmTypes = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/types");

        if (Array.isArray(response.data)) {
          setFilmTypes(response.data);
        } else {
          console.error("Expected an array but got:", response.data);
        }
      } catch (error) {
        console.error("Error fetching film types:", error);
      }
    };

    fetchFilmTypes();
  }, []);

  const handleDarkTheme = () => {
    toggleDarkMode();
  };

  const goToHome = () => {
    if (router.pathname !== "/") {
      router.push("/");
    } else {
      setIsActive(null);
      setFilmType(null);
    }
  };

  const handleOpenSearchModal = () => {
    setOpen(true);
  };

  const handleOpenDonate = () => {
    setOpenDonate(true);
  };

  const handleClickType = async (type: string) => {
    try {
      if (router.pathname !== "/") {
        router.push("/");
      }

      setIsActive(type);
      setFilmType(type);

      // Fetch films by type
      const response = await axios.get("http://localhost:8080/api/type/get", {
        params: { typeId: type },
      });

      // Process the films data as needed
      console.log(response.data); // Display the films data in the console
    } catch (error) {
      console.error("Error fetching films:", error);
    }
  };

  // Define the list of types you want to display
  const displayTypes = [
    { id: 4, name: "Phim Bí Ẩn" },
    { id: 5, name: "Phim Kinh Dị" },
    { id: 6, name: "Phim Hành Động" },
    { id: 7, name: "Phim Võ Thuật" },
  ];

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserInfo = localStorage.getItem("user-info");
      if (storedUserInfo) {
        setUserInfo(JSON.parse(storedUserInfo));
      }
    }
  }, []);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    logout();
    router.push('/');
  };

  return (
    <div
      className={classNames(
        "h-20 shadow-xl px-16 flex items-center justify-between fixed w-full z-50",
        darkMode ? "bg-slate-900 text-white" : "bg-white"
      )}
    >
      <div className="header h-16 flex items-center justify-between px-4">
        <div className="cursor-pointer flex items-center" onClick={goToHome}>
          <img
            src="https://i.pinimg.com/736x/1d/7a/34/1d7a340077852c79b02b06893a24db89.jpg"
            alt="Logo"
            className="h-full max-h-14 object-contain"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-5">
        <div className="flex space-x-4">
          {displayTypes.map((type) => (
            <div
              key={type.id}
              className={classNames(
                "p-4 uppercase hover:bg-slate-300 rounded-md cursor-pointer",
                darkMode && "hover:text-black",
                isActive === type.id && "bg-slate-300 text-black"
              )}
              onClick={() => handleClickType(type.id)}
            >
              {type.name}
            </div>
          ))}
        </div>
        <div className={classNames("flex")}>
          <div
            className={classNames(
              "my-auto p-3 rounded-md cursor-pointer border-none hover:border-none hover:bg-slate-300"
            )}
            onClick={handleOpenSearchModal}
          >
            <SearchOutlined
              className={classNames(
                darkMode ? "text-white hover:text-black" : "text-black"
              )}
            />
          </div>
        </div>
        <Tooltip
          title={darkMode ? "Tắt chế độ tối" : "Bật chế độ tối"}
          className="cursor-pointer my-auto"
          onClick={handleDarkTheme}
        >
          {!darkMode ? <DarkModeOutlined /> : <LightMode />}
        </Tooltip>

        <Tooltip
          title={userInfo ? userInfo.email || userInfo.name || 'Đăng nhập' : 'Đăng nhập'}
          className="cursor-pointer my-auto"
        >
          {!userInfo ? (
            <button
              className={classNames(
                darkMode
                  ? "bg-slate-200 text-slate-800"
                  : "bg-blue-600 text-white",
                "px-5 py-2 font-bold rounded-3xl"
              )}
              onClick={() => router.push("/login")}
            >
              <Login />
            </button>
          ) : (
            <Avatar src={userInfo.image || ""} onClick={handleMenuClick} />
          )}
        </Tooltip>
        <DonateSection darkMode={darkMode} handleOpenDonate={handleOpenDonate} />
      </div>
      <UserMenu
        anchorEl={anchorEl}
        handleMenuClose={handleMenuClose}
        userInfo={userInfo}
        darkMode={darkMode}
        handleLogout={handleLogout}
      />
    </div>
  );
};

export default Header;
