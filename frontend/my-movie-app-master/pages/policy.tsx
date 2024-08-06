import Footer from "@/components/common/Footer";
import Header from "@/components/common/header/Header";
import Layout from "@/components/Layout";
import { useDarkMode } from "@/context/DarkModeContext";
import classNames from "classnames";
import React from "react";

const Policy = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <Layout
      meta={{
        title: 'Điều khoản sử dụng',
        description: 'GÌ cùng được'
      }}
    >
      <Header />
      <div className={classNames(darkMode && 'bg-slate-800 text-white', "px-24 py-24")}>
        <p>Cookies</p> Cũng như nhiều website khác, chúng tôi thiết lập và sử dụng
        cookie để tìm hiểu thêm về cách bạn tương tác với nội dung của chúng tôi
        và giúp chúng tôi cải thiện trải nghiệm của bạn khi ghé thăm website của
        chúng tôi, cũng như duy trì thiết lập cá nhân của bạn… Website của chúng
        tôi có thể đăng quảng cáo, và trong trường hợp đó có thể thiết lập và
        truy cập các cookie trên máy tính của bạn và phụ thuộc vào chính sách
        bảo vệ sự riêng tư của các bên cung cấp quảng cáo. Tuy nhiên, các công
        ty quảng cáo không được truy cập vào cookie của chúng tôi. Những công ty
        đó thường sử dụng các đoạn mã riêng để theo dõi số lượt truy cập của bạn
        đến website của chúng tôi.
        <br />
        <br />
        <p>Thay đổi điều khoản</p> Chúng tôi có thể thay đổi các điều khoản của bản
        Chính sách bảo vệ riêng tư này cho phù hợp với điều kiện thực tế. Chúng
        tôi sẽ thông báo về những thay đổi lớn bằng cách đặt thông báo trên site
        của chúng tôi và được đặt trong thiết lập người dùng của bạn.
        <br />
        <br />
        <p>Từ chối bảo đảm</p> Mặc dù Chính sách bảo vệ riêng tư đặt ra những tiêu
        chuẩn về Dữ liệu và chúng tôi luôn cố gắng hết mình để đáp ứng, chúng
        tôi không bị buộc phải bảo đảm những tiêu chuẩn đó. Có thể có những nhân
        tố vượt ra ngoài tầm kiểm soát của chúng tôi có thể dẫn đến việc Dữ liệu
        bị tiết lộ. Vì thế, chúng tôi không chịu trách nhiệm bảo đảm Dữ liệu
        luôn được duy trì ở tình trạng hoàn hảo hoặc không bị tiết lộ.
        <br />
        <br />
        Sự đồng ý của bạn Khi sử dụng dịch vụ của website, bạn mặc nhiên chấp
        nhận điều khoản trong Chính sách bảo vệ riêng tư này
      </div>
      <Footer />
    </Layout>
  );
};

export default Policy;
