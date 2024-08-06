import React, { useState, useEffect } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  IconButton,
  Tooltip,
  Pagination,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as EyeIcon,
} from "@mui/icons-material";
import EditFilmModal from "../modal/film/Edit";
import DetailFilmModal from "../modal/film/Detail";
import DeleteFilmModal from "../modal/film/Delete";
import { toast } from "react-toastify";
import { Film } from "@/types/film";

const FilmTable: React.FC = () => {
  const [filmData, setFilmData] = useState<Film[]>([]);
  const [selectedFilm, setSelectedFilm] = useState<Film | null>(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  useEffect(() => {
    // setFilmData(filmJson);
    const fetchFilm = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/movie/getAll`);

        if (!response.ok) {
          throw new Error("Lỗi cập nhật dữ liệu");
        }

        const result = await response.json();
        setFilmData(result);
      } catch (error) {
        toast.error("Lấy dữ liệuphim thất bại !!!");
      }
    };

    fetchFilm();
  }, []);

  const [page, setPage] = useState(1);
  const rowsPerPage = 7;
  const pages = Math.ceil(filmData.length / rowsPerPage);
  const currentItems = filmData.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const handleEditFilm = (film: Film) => {
    setSelectedFilm(film);
    setOpenEditModal(true);
  };

  const handleDetailFilm = (film: Film) => {
    setSelectedFilm(film);
    setOpenDetailModal(true);
  };

  const handleOpenDeleteModal = (film: Film) => {
    setSelectedFilm(film);
    setOpenDeleteModal(true);
  };

  const handleSaveFilm = (film: Film) => {
    setFilmData(filmData.map((f) => (f.id === film.id ? film : f)));
  };

  const handleDeleteFilm = () => {
    if (selectedFilm) {
      setFilmData(filmData.filter((f) => f.id !== selectedFilm.id));
    }
    setOpenDeleteModal(false);
  };

  return (
    <div className="mx-auto bg-white mt-5 p-4 rounded-xl w-full h-[85vh]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">
          Có tất cả {filmData.length} bản ghi
        </h2>
        <Pagination
          count={pages}
          page={page}
          onChange={(event, value) => setPage(value)}
          color="primary"
        />
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow className="bg-gray-200">
              <TableCell align="center" className="font-bold">
                STT
              </TableCell>
              <TableCell align="center" className="font-bold">
                Tên
              </TableCell>
              <TableCell align="center" className="font-bold">
                Năm sản xuất
              </TableCell>
              <TableCell align="center" className="font-bold">
                Đạo diễn
              </TableCell>
              <TableCell align="center" className="font-bold">
                Link phim
              </TableCell>
              <TableCell align="center" className="font-bold">
                Hình ảnh
              </TableCell>
              <TableCell align="center" className="font-bold">
                Mô tả
              </TableCell>
              <TableCell align="center" className="font-bold">
                Hành động
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentItems.map((film, index) => (
              <TableRow key={film.id} className="hover:bg-gray-50">
                <TableCell align="center">
                  {(page - 1) * rowsPerPage + index + 1}
                </TableCell>
                <TableCell
                  align="center"
                  className="truncate max-w-20"
                  title={film.title}
                >
                  {film.title}
                </TableCell>
                <TableCell
                  align="center"
                  className="truncate max-w-20"
                  title={film.year}
                >
                  {film.year}
                </TableCell>
                <TableCell
                  align="center"
                  className="truncate max-w-20"
                  title={film.director}
                >
                  {film.director}
                </TableCell>
                <TableCell
                  align="center"
                  className="truncate max-w-20"
                  title={film.url}
                >
                  {film.url}
                </TableCell>
                <TableCell align="center" className="h-12">
                  <img
                    src={film.image}
                    alt={film.title}
                    className="w-10 h-10 object-cover rounded mx-auto"
                  />
                </TableCell>
                <TableCell
                  align="center"
                  className="truncate max-w-20"
                  title={film.desc}
                >
                  {film.description}
                </TableCell>
                <TableCell align="center">
                  <Tooltip title="Chi tiết">
                    <IconButton
                      onClick={() => handleDetailFilm(film)}
                      className="text-blue-500 hover:bg-blue-100"
                    >
                      <EyeIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Chỉnh sửa">
                    <IconButton
                      onClick={() => handleEditFilm(film)}
                      className="hover:bg-slate-400"
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Xóa" color="error">
                    <IconButton
                      onClick={() => handleOpenDeleteModal(film)}
                      className="text-red-500 hover:bg-red-100"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {selectedFilm && (
        <>
          <EditFilmModal
            open={openEditModal}
            onClose={() => setOpenEditModal(false)}
            film={selectedFilm}
            onSave={handleSaveFilm}
          />
          <DetailFilmModal
            open={openDetailModal}
            onClose={() => setOpenDetailModal(false)}
            film={selectedFilm}
          />
          <DeleteFilmModal
            open={openDeleteModal}
            onClose={() => setOpenDeleteModal(false)}
            onDelete={handleDeleteFilm}
          />
        </>
      )}
    </div>
  );
};

export default FilmTable;
