import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box
} from "@mui/material";
import { useDarkMode } from "../../../context/DarkModeContext";
import classNames from "classnames";
import { useRouter } from "next/router";
import { Film } from "@/types/film";

interface FilmDetailProps {
  film: Film;
}

const FilmDetail: React.FC<FilmDetailProps> = ({ film }) => {
  const { darkMode } = useDarkMode();
  const router = useRouter();

  const handleWatchFilm = () => {
    router.push(`/movie/watch-movie/${film.id}`);
  };

  return (
    <Box mb={4}>
      <Card className="flex flex-col md:flex-row">
        <CardMedia
          component="img"
          image={film.image}
          alt={film.title}
          className="md:w-1/3 h-auto"
        />
        <CardContent
          className={classNames(
            darkMode && "bg-slate-900 text-white",
            "flex flex-col justify-between p-6 md:w-2/3"
          )}
        >
          <div>
            <Typography variant="h5" className="mb-2 font-bold">
              {film.title}
            </Typography>
            <Typography variant="subtitle2" className="mb-1">
              <b>Đạo diễn:</b> {film.director}
            </Typography>
            <Typography variant="subtitle2" className="mb-1">
              <b>Năm ra mắt:</b> {film.year}
            </Typography>
            <Typography variant="subtitle2" className="mb-1">
              <b>Thể loại:</b> {film.types?.join(", ")}
            </Typography>
            <Typography variant="subtitle2" className="mb-1">
              <b>Chất lượng:</b> HD
            </Typography>
            <Typography variant="subtitle2" className="mb-1">
              <b>Phụ đề:</b> Vietsub
            </Typography>
            <Typography variant="subtitle1" className="mb-4">
              <b>Nội dung:</b> {film.description}
            </Typography>
          </div>
          <Button
            variant={!darkMode ? "contained" : "outlined"}
            onClick={handleWatchFilm}
            className="self-start"
          >
            Xem phim
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default FilmDetail;
