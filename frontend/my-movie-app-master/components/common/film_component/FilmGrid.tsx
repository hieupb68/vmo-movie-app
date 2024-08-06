import React from "react";
import { Card, CardContent, CardMedia, Grid, Typography, Button } from "@mui/material";
import classNames from "classnames";
import { Film } from "@/types/film";

interface FilmGridProps {
  films: Film[];
  darkMode: boolean;
  handleDetailsClick: (film: Film) => void;
}

const FilmGrid: React.FC<FilmGridProps> = ({ films, darkMode, handleDetailsClick }) => {
  return (
    <>
      <Typography
        variant="h4"
        className="text-blue-600 pb-6 font-bold border-t-[2px] border-blue-500"
      >
        Phim nổi bật
      </Typography>
      <Grid container spacing={4}>
        {films.map((film, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              className={classNames(
                "cursor-pointer hover:shadow-2xl transition-shadow duration-300",
                darkMode ? "hover:shadow-slate-500" : "hover:shadow-gray-900"
              )}
              onClick={() => handleDetailsClick(film)}
            >
              <CardMedia
                component="img"
                image={film.image}
                alt={film.title}
                className="h-[300px] object-cover"
              />
              <CardContent
                className={classNames(darkMode && "text-white bg-slate-900")}
              >
                <Typography variant="h6" className="font-bold mb-2">
                  {film.title}
                </Typography>
                <Typography variant="subtitle1" className="mb-1">
                  Đạo diễn: {film.director}
                </Typography>
                <Typography variant="subtitle2" className="mb-2">
                  Năm: {film.year}
                </Typography>
                <Button
                  variant={!darkMode ? "contained" : "outlined"}
                  color="primary"
                  onClick={() => handleDetailsClick(film)}
                >
                  Chi tiết
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default FilmGrid;
