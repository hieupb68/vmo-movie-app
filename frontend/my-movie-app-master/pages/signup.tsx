import Layout from "../components/Layout";
import React from "react";
import SignUpPage from "@/components/page/SignUpPage";

const Signup = () => {
  return (
    <Layout
      meta={{
        title: 'Đăng ký tài khoản - PTIT Movie',
        description: 'Tạo tài khoản mới trên PTIT Movie để trải nghiệm xem phim và chương trình truyền hình trực tuyến mới nhất. Khám phá nhiều thể loại phim và yêu thích của bạn!',
      }}
    >
      <SignUpPage/>
    </Layout>
  );
}

const Page = () => {
  return <Signup />
}

export default Page;
