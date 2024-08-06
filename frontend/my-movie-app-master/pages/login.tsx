import Layout from "../components/Layout";
import React from "react";
import LoginPage from "@/components/page/LoginPage";

const Login = () => {
  return (
    <Layout
      meta={{
        title: 'Đăng nhập - PTIT Movie',
        description: 'Đăng nhập vào PTIT Movie để xem phim và chương trình truyền hình trực tuyến yêu thích của bạn. Trải nghiệm nhiều thể loại phim với chất lượng cao!',
      }}
    >
      <LoginPage/>
    </Layout>
  );
}

const Page = () => {
  return <Login />
}

export default Page;