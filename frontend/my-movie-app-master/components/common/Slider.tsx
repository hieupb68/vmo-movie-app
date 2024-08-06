import React from "react";
import { Card, CardContent, CardMedia, Typography, Button, Box } from "@mui/material";
import classNames from "classnames";
import { Film } from "@/types/film";

interface FilmSliderProps {
  films: Film[];
  currentIndex: number;
  darkMode: boolean;
  handleDetailsClick: (film: Film) => void;
}

const Slider: React.FC<FilmSliderProps> = ({ films, currentIndex, darkMode, handleDetailsClick }) => {
  return (
    <div className="mb-14 border-slate-500">
      <Box mb={4}>
        {films.length > 0 && (
          <Card className="relative">
            <CardMedia
              component="img"
              image={films[currentIndex]?.image || "default-image-url"}
              alt={films[currentIndex]?.title || "Default Title"}
              className="h-[600px] object-cover"
            />
            <CardContent
              className={classNames(
                "absolute bottom-4 left-4 bg-gray-800 text-white p-4 rounded-lg",
                darkMode ? "bg-opacity-90" : "bg-opacity-30"
              )}
            >
              <Typography variant="h5" className="mb-2">
                {films[currentIndex]?.title || "Default Title"}
              </Typography>
              <Typography variant="subtitle1">
                Đạo diễn: {films[currentIndex]?.director || "Default Director"}
              </Typography>
              <Typography variant="subtitle2">
                Năm: {films[currentIndex]?.year || "Default Year"}
              </Typography>
              <Button
                className="z-10 mt-2"
                variant="contained"
                color="primary"
                onClick={() => handleDetailsClick(films[currentIndex])}
              >
                Chi tiết
              </Button>
            </CardContent>
          </Card>
        )}
      </Box>
    </div>
  );
};

export default Slider;
