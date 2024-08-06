import React from "react";
import { Dialog, IconButton } from "@mui/material";
import { useDonateModal } from "@/context/DonateContext";
import CloseIcon from "@mui/icons-material/Close";

const DonateModal = () => {
  const { openDonate, setOpenDonate } = useDonateModal();

  const handleClose = () => {
    setOpenDonate(false);
  };

  return (
    <Dialog open={openDonate} maxWidth="md" fullWidth onClose={handleClose}>
      <div className="relative">
        <IconButton
          onClick={handleClose}
          style={{ position: "absolute", top: 10, right: 10 }}
        >
          <CloseIcon />
        </IconButton>
        <div className="tlg:flex justify-between bg-white">
          <div className="tlg:hidden tlg:w-1/2 bg-pink-500 text-white flex flex-col items-center justify-center py-4">
            <p className="font-bold text-[16px] py-6 text-center">
              Quét mã để tải ứng dụng và Quyên góp ngay
            </p>
            <div className="relative">
              <img
                src="https://qrcode-gen.com/images/qrcode-default.png"
                alt="QR Code"
                width={250}
                height={250}
                loading="lazy"
                className="rounded-md"
              />
              <div className="scanner"></div>
            </div>
            <p className="mt-4 text-center w-[280px] text-[14px] leading-5 mb-6">
              Sử dụng App MoMo hoặc ứng dụng Camera hỗ trợ QR code để quét mã.
            </p>
          </div>

          <div className="tlg:w-1/2 mt-4 tsm:px-10">
            <div className="flex my-2">
              <img
                className="w-20"
                src="https://homepage.momocdn.net/images/s/momo-upload-api-200917091602-637359309621891617.png"
                loading="lazy"
              />
              <p className="px-4 text-[14px] text-slate-500 pt-6">
                <b className="text-black text-[16px]">Bước 1 :</b>
                <br />
                Mở ứng dụng camera mặc định hoặc ứng dụng hỗ trợ QR code của bạn
              </p>
            </div>
            <div className="flex my-2">
              <img
                className="w-20"
                src="https://homepage.momocdn.net/images/s/momo-upload-api-200917091443-637359308837905996.png"
                loading="lazy"
              />
              <p className="px-4 text-[14px] text-slate-500 pt-6">
                <b className="text-black text-[16px]">Bước 2 :</b>
                <br />
                Quét mã QR Code theo hình bên phải
              </p>
            </div>
            <div className="flex my-2">
              <img
                className="w-20"
                src="https://homepage.momocdn.net/images/s/momo-upload-api-200917090146-637359301062519803.png"
                loading="lazy"
              />
              <p className="px-4 text-[14px] text-slate-500 pt-6">
                <b className="text-black text-[16px]">Bước 3 :</b>
                <br />
                Bấm vào thông báo hiển thị để tải ứng dụng hoặc Quyên góp tiền
                ngay
              </p>
            </div>
          </div>

          <div className="lg:hidden w-1/2 bg-pink-500 text-white flex flex-col items-center justify-center py-4">
            <p className="font-bold text-[16px] py-6 text-center">
              Quét mã để tải ứng dụng và Quyên góp ngay
            </p>
            <div className="relative">
              <img
                src="https://qrcode-gen.com/images/qrcode-default.png"
                alt="QR Code"
                width={250}
                height={250}
                loading="lazy"
                className="rounded-md"
              />
              <div className="scanner"></div>
            </div>
            <p className="mt-4 text-center w-[280px] text-[14px] leading-5 mb-6">
              Sử dụng App MoMo hoặc ứng dụng Camera hỗ trợ QR code để quét mã.
            </p>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default DonateModal;
