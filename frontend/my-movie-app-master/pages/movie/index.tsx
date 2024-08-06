import Layout from "../../components/Layout";
import PreviewPage from "../../components/page/PreviewPage";
import { useFilmContext } from "../../context/FilmContext";
import SearchModal from "../../components/composite/modal/SearchModal";
import React from "react";

const Preview = () => {
  const { currentFilm } = useFilmContext();

  return (
    <Layout
      meta={{
        title: currentFilm ? `${currentFilm.title} - My Movie App` : 'Preview - My Movie App',
        description: currentFilm ? `Watch the movie ${currentFilm.title} on My Movie App. Enjoy this ${currentFilm.genre} movie released in ${currentFilm.year}.` : 'Preview the movie details on My Movie App.',
      }}
    >
      <PreviewPage />
      <SearchModal/>
    </Layout>
  );
}

const Page = () => {
  return <Preview />
}

export default Page;
