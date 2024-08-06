import Layout from "../components/Layout";
import LandingPage from "../components/page/LandingPage";
import SearchModal from "../components/composite/modal/SearchModal";
import React from "react";
import DonateModal from "@/components/composite/modal/DonateModal";
const Home = () => {
  return (
    <Layout
      meta={{
        title: "My Movie App",
        description:
          "Watch the latest movies and TV shows online on My Movie App. Enjoy a wide selection of genres and discover new favorites!",
      }}
    >
      <LandingPage />
      <SearchModal />
      <DonateModal />
    </Layout>
  );
};

const Page = () => {
  return <Home />;
};

export default Page;
