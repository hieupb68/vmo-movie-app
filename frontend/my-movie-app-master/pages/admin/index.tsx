import Layout from "../../components/Layout";
import React, { useEffect, useState } from "react";
import Admin from "@/components/page/Admin";
import { useUser } from "@/context/AuthContext";
import { useRouter } from "next/router";

const AdminPage = () => {
  const { user } = useUser();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      if (user.role === "ADMIN") {
        // Nếu người dùng là ADMIN, không cần điều hướng thêm
        setIsLoading(false);
        router.push("/admin");
      } else {
        // Nếu người dùng không phải ADMIN, điều hướng về trang chính
        router.push("/");
      }
    } else {
      // Nếu không có thông tin người dùng, điều hướng đến trang đăng nhập
      router.push("/login");
    }
  }, [user, router]);

  if (isLoading) {
    // Hiển thị trang chờ hoặc thông báo khi đang kiểm tra quyền người dùng
    return <div>Loading...</div>;
  }

  return (
    <Layout
      meta={{
        title: "Trang quản trị",
        description:
          "Manage your Movie App effectively with the Admin Dashboard. Update content, monitor user activity, and ensure smooth operations of the app.",
      }}
      noindex
    >
      <Admin />
    </Layout>
  );
};

const Page = () => {
  return <AdminPage />;
};

export default Page;
