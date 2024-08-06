// Dynamic routing
import Layout from "../../../components/Layout";
import WatchMoviePage from "../../../components/page/WatchMoviePage";
import { useFilmContext } from "../../../context/FilmContext";
import SearchModal from "../../../components/composite/modal/SearchModal";
import React from "react";
import { useRouter } from "next/router";

const WatchMovie = () => {
  const router = useRouter();
  const { currentFilm } = useFilmContext();

  console.log(router.query.id);

  return (
    <Layout>
      <WatchMoviePage />
      <SearchModal />
    </Layout>
  );
};

const Page = () => {
  return <WatchMovie />;
};

export default Page;
