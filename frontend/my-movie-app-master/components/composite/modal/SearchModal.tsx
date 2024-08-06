import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, Input } from "@mui/material";
import { useSearchModal } from "../../../context/SearchContext";
import { useDarkMode } from "@/context/DarkModeContext";
import classNames from "classnames";
import { SearchOutlined } from "@mui/icons-material";
import axios from "axios";
import { Film, Page } from "@/components/composite/ListFilm";
import { useRouter } from 'next/router'

const SearchModal = () => {
  const router = useRouter();
  const { open, setOpen } = useSearchModal();
  const [keyword, setKeyword] = useState<string>("");
  const [searchResult, setSearchResult] = useState<Film[]>([]);

  const doSearch = async (keyword: string) => {
    const resp = await axios.get<Page<Film>>(
      "http://localhost:8080/api/movie/get",
      { params: { keyword } }
    );
    setSearchResult(resp.data.content);
  };

  useEffect(() => {
    doSearch(keyword);
  }, [keyword]);

  const handleClose = () => {
    setOpen(false);
  };

  const { darkMode } = useDarkMode();
  const handleFilmClick = (film: Film) => {
    router.push(`/movie/watch-movie/${film.id}`);
    setOpen(false);
  };
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogContent className={classNames(darkMode && "bg-slate-800", "flex")}>
        <Input
          value={keyword}
          placeholder="Tìm kiếm phim ..."
          fullWidth
          className={classNames("font-bold", darkMode && "text-white")}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <SearchOutlined
          className={classNames(
            "ml-4 cursor-pointer hover:text-slate-500",
            darkMode && "text-white"
          )}
        />
      </DialogContent>
      {keyword.trim() !== "" && (
        <ul
          className={classNames("p-4", darkMode && "bg-slate-700 text-white")}
        >
          {searchResult.map((film) => (
            <li
              key={film.id}
              className="hover:bg-slate-400 cursor-pointer"
              onClick={() => handleFilmClick(film)}
            >
              {film.title}
            </li>
          ))}
        </ul>
      )}
    </Dialog>
  );
};

export default SearchModal;
