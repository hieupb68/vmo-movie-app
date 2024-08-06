import React from "react";
import classNames from "classnames";
import {
  Facebook,
  Twitter,
  Instagram,
  YouTube,
  ExpandLess,
} from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import { useFilmType } from "@/context/FilmTypeContext";
import { useRouter } from "next/router";
import { useDonateModal } from "@/context/DonateContext";

const Footer = () => {
  const { setFilmType } = useFilmType();
  const { setOpenDonate } = useDonateModal();
  const router = useRouter();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollFilm = (type: string) => {
    setFilmType(type);
    router.push("/").then(() => {
      window.scrollTo({ top: 500, behavior: "smooth" });
    });
  };

  const handleOpenDonate = () => {
    setOpenDonate(true);
  };

  return (
    <div className={classNames("h-auto", "bg-slate-900 text-white")}>
      <div className="px-20 py-10">
        <div className="flex justify-between">
          <div className="w-1/2">
            <div className="max-w-[480px]">
              <div className="text-2xl font-bold">PTIT-movie.app</div>
              <p className="mt-2 text-[14px] text-slate-400">
                <span className="font-bold text-blue-300">PTIT-movie</span> -
                Trang xem phim Online với giao diện mới được bố trí và thiết kế
                thân thiện với người dùng. Nguồn phim được tổng hợp từ các
                website lớn với đa dạng các đầu phim và thể loại vô cùng phong
                phú.
              </p>
            </div>
          </div>
          <div className="w-1/2 flex space-x-6">
            <div className="w-1/3">
              <div className="text-xl font-bold">Thể loại</div>
              <ul className="mt-2 text-[14px]">
                <li
                  className="text-slate-500 cursor-pointer"
                  onClick={() => scrollFilm("4")}
                >
                  Phim Bí Ẩn
                </li>
                <li
                  className="text-slate-500 cursor-pointer"
                  onClick={() => scrollFilm("5")}
                >
                  Phim Kinh Dị
                </li>
                <li
                  className="text-slate-500 cursor-pointer"
                  onClick={() => scrollFilm("6")}
                >
                  Phim Hành Động
                </li>
                <li
                  className="text-slate-500 cursor-pointer"
                  onClick={() => scrollFilm("7")}
                >
                  Phim Võ Thuật
                </li>
              </ul>
            </div>
            <div className="w-1/3">
              <div className="text-xl font-bold">Thông tin</div>
              <ul className="mt-2 text-[14px]">
                <li className="text-slate-500">
                  <a href="/about-us">Giới thiệu</a>
                </li>
                <li className="text-slate-500">
                  <a href="/">Điều khoản sử dụng</a>
                </li>
                <li className="text-slate-500">
                  <a href="/contact-us">Liên hệ chúng tôi</a>
                </li>
                <li className="text-slate-500">
                  <a href="/policy">Chính sách</a>
                </li>
              </ul>
            </div>
            <div className="w-1/3">
              <div className="text-xl font-bold">Ủng hộ</div>
              <Tooltip title="Sự ủng hộ của các bạn là niềm vui lớn nhất cho đội ngũ nhà phát triển sản phẩm này !!! Hãy bấm vào đây để ủng hộ chúng tôi <3">
                <img
                  src="https://qrcode-gen.com/images/qrcode-default.png"
                  width={60}
                  height={60}
                  className="mt-2"
                  onClick={handleOpenDonate}
                />
              </Tooltip>

              <p className="mt-1 text-slate-500 text-[14px]">
                Quét mã để tiếp tục
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-between border-t border-slate-700 pt-4">
          <div className="w-full">© Phimmoi</div>
          <div className="flex space-x-8 justify-center">
            <Facebook className="hover:text-blue-500 cursor-pointer" />
            <Twitter className="hover:text-blue-300 cursor-pointer" />
            <Instagram className="hover:text-pink-500 cursor-pointer" />
            <YouTube className="hover:text-red-500 cursor-pointer" />
            <Tooltip title="Lên đầu trang" onClick={scrollToTop} className="">
              <ExpandLess className="hover:bg-slate-500 cursor-pointer rounded-md" />
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
