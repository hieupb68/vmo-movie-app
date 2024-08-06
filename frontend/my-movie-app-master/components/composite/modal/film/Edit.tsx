import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Film } from "@/types/film";

interface EditFilmModalProps {
  open: boolean;
  onClose: () => void;
  film: Film | null;
  onSave: (film: Film) => void;
}

const EditFilmModal: React.FC<EditFilmModalProps> = ({
  open,
  onClose,
  film,
  onSave,
}) => {
  const [editedFilm, setEditedFilm] = useState<Film | null>(null);

  useEffect(() => {
    if (film) {
      setEditedFilm(film);
    }
  }, [film]);

  const handleSave = async () => {
    if (!editedFilm) return;

    try {
      const response = await fetch(
        `http://localhost:8080/api/movie/update/${film?.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedFilm),
        }
      );

      if (!response.ok) {
        throw new Error("Lỗi cập nhật dữ liệu");
      }

      const result = await response.json();
      onSave(result);
      toast.success("Cập nhật phim thành công!");
      onClose();
    } catch (error) {
      toast.error("Cập nhật phim thất bại");
    }
  };

  if (!editedFilm) return null;

  const filmTypes = ["phim-le", "phim-bo", "tv-show", "anime"];

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle className="text-center text-[24px] font-bold">
        Cập nhật thông tin phim
      </DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Tên phim"
          fullWidth
          value={editedFilm.title}
          onChange={(e) =>
            setEditedFilm({ ...editedFilm, title: e.target.value })
          }
        />
        <TextField
          margin="dense"
          label="Đạo diễn"
          fullWidth
          value={editedFilm.director}
          onChange={(e) =>
            setEditedFilm({ ...editedFilm, director: e.target.value })
          }
        />
        <TextField
          margin="dense"
          label="Năm sản xuất"
          fullWidth
          type="number"
          value={editedFilm.year}
          onChange={(e) =>
            setEditedFilm({ ...editedFilm, year: Number(e.target.value) })
          }
        />
        <TextField
          margin="dense"
          label="Ảnh nền"
          fullWidth
          value={editedFilm.image}
          onChange={(e) =>
            setEditedFilm({ ...editedFilm, image: e.target.value })
          }
        />
        <FormControl fullWidth margin="dense">
          <InputLabel>Thể loại</InputLabel>
          <Select
            value={editedFilm.type}
            onChange={(e) =>
              setEditedFilm({ ...editedFilm, type: e.target.value })
            }
            label="Thể loại"
          >
            {filmTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          margin="dense"
          label="Link xem"
          fullWidth
          value={editedFilm.url}
          onChange={(e) =>
            setEditedFilm({ ...editedFilm, url: e.target.value })
          }
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Hủy
        </Button>
        <Button onClick={handleSave} color="primary" variant="contained">
          Lưu
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditFilmModal;
