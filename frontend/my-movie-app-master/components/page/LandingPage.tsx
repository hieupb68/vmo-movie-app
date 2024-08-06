import React, { useState, useEffect } from 'react';
import Header from '../common/header/Header';
import classNames from 'classnames';
import Footer from '../common/Footer';
import { useDarkMode } from '../../context/DarkModeContext';
import Slider from '../common/Slider';
import FilmGrid from '../common/film_component/FilmGrid';
import FilmPagination from '../common/film_component/FilmPagination';
import axios from 'axios';
import { useFilmType } from '../../context/FilmTypeContext';
import { useFilmContext } from '../../context/FilmContext';
import { Film } from '@/types/film';
import { useRouter } from 'next/router';

interface Page<T> {
  totalPages: number;
  totalElements: number;
  size: number;
  content: T[];
}

const LandingPage: React.FC = () => {
  const { darkMode } = useDarkMode();
  const { filmType } = useFilmType();
  const { setCurrentFilm } = useFilmContext();

  const [films, setFilms] = useState<Film[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const router = useRouter()

  const doFetchFilms = async (type?: string) => {
    const resp = await axios.get<Page<Film>>(
      "http://localhost:8080/api/movie/get",
      { params: { typeId: type, page: page } }
    );
    setFilms(resp.data.content);
    setTotalPages(resp.data.totalPages);
  };

  useEffect(() => {
    const type = filmType;
    if (type) {
      doFetchFilms(type);
    } else {
      doFetchFilms();
    }
  }, [filmType, page]);

  useEffect(() => {
    if (films.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % films.length);
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [films]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const handleDetailsClick = (film: Film) => {
    setCurrentFilm(film);
    router.push("/movie");
  };

  return (
    <div className={classNames(darkMode ? 'bg-slate-800' : 'bg-white')}>
      <Header />
      <div className='pt-20'>
        <Slider films={films} currentIndex={currentIndex} darkMode={darkMode} handleDetailsClick={handleDetailsClick} />
        <FilmGrid films={films} darkMode={darkMode} handleDetailsClick={handleDetailsClick} />
        <FilmPagination totalPages={totalPages} page={page} darkMode={darkMode} handlePageChange={handlePageChange} />
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;
