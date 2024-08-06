import React, { useState, useEffect } from "react";
import { useFilmContext } from "../../context/FilmContext";
import Header from "../common/header/Header";
import Footer from "../common/Footer";
import classNames from "classnames";
import { useDarkMode } from "../../context/DarkModeContext";
import { Avatar, Breadcrumbs, Link, Rating, Tooltip } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import {
  AccountBox,
  AccountCircle,
  Home,
  Movie,
  PlayCircleOutline,
} from "@mui/icons-material";
import axios from "axios";
import { useRouter } from "next/router";
import { current } from "immer";
import VideoPlayer from "../common/film_component/VideoPlayer";
import FilmDescription from "../common/film_component/FilmDescription";
import FeedbackSection from "../composite/FeedbackSection";

interface Feedback {
  movieId: number;
  vote: number;
  comment: string | null;
  user: any;
}

export default function WatchMoviePage() {
  const router = useRouter();
  const { darkMode } = useDarkMode();
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [currentFilm, setCurrentFilm] = useState<any>(null);

  useEffect(() => {
    if (!router.query.id) return;

    const fetchFeedback = async () => {
      try {
        const response = await axios.get<Feedback[]>(
          "http://localhost:8080/api/feedback/get",
          {
            params: {
              filmId: router.query.id,
            },
          }
        );
        setFeedback(response.data);
      } catch (error) {
        console.error("Error fetching feedback:", error);
      }
    };

    fetchFeedback();
  }, [router.query.id]);

  useEffect(() => {
    if (!router.query.id) return;

    const fetchFilm = async () => {
      try {
        const response = await axios.get<Feedback[]>(
          "http://localhost:8080/api/movie/getById",
          {
            params: { id: router.query.id },
          }
        );
        
        setCurrentFilm(response?.data);
      } catch (error) {
        console.error("Error fetching feedback:", error);
      }
    };

    fetchFilm();
  }, [router.query.id]);

  const videoId = currentFilm?.url
    ? new URL(currentFilm?.url).searchParams.get("v")
    : null;

  return (
    <div
      className={classNames(
        darkMode ? "bg-slate-800" : "bg-white",
        "min-h-screen"
      )}
    >
      <Header />
      <div className="pt-28 px-6 pb-4">
        <div className="pb-6 pt-2 mx-auto w-[1200px]">
          <Breadcrumbs
            aria-label="breadcrumb"
            className={classNames(
              darkMode ? "text-slate-100" : "text-slate-700"
            )}
          >
            <Link
              underline="hover"
              sx={{ display: "flex", alignItems: "center" }}
              color="inherit"
              href="/"
            >
              <Home sx={{ mr: 0.5 }} />
              Trang chủ
            </Link>
            <Link
              underline="hover"
              sx={{ display: "flex", alignItems: "center" }}
              color="inherit"
            >
              <Movie sx={{ mr: 0.5 }} />
              {currentFilm?.title}
            </Link>
            <Link
              underline="hover"
              sx={{ display: "flex", alignItems: "center" }}
              color="inherit"
            >
              <PlayCircleOutline sx={{ mr: 0.5 }} />
              Xem phim
            </Link>
          </Breadcrumbs>
        </div>
        <VideoPlayer videoId={videoId} filmTitle={currentFilm?.title} />
        <FilmDescription description={currentFilm?.description} />
        <FeedbackSection feedback={feedback} filmId={currentFilm?.id} />
      </div>
      <Footer />
    </div>
  );
}
