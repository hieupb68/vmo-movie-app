import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";

interface AddFilmModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (film: Film) => void;
}

const AddFilmModal: React.FC<AddFilmModalProps> = ({
  open,
  onClose,
  onSave,
}) => {
  const [newFilm, setNewFilm] = useState<Film>({
    id: 0,
    title: "",
    director: "",
    year: 0,
    view: 0,
    like: 0,
  });

  const handleSave = () => {
    onSave(newFilm);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} className="rounded-md">
      <DialogTitle className="text-center font-bold">Thêm phim mới</DialogTitle>
      <DialogContent>
        <TextField
          focused
          margin="dense"
          label="Tên phim"
          fullWidth
          value={newFilm.title}
          onChange={(e) => setNewFilm({ ...newFilm, title: e.target.value })}
        />
        <TextField
          margin="dense"
          label="Đạo diễn"
          fullWidth
          value={newFilm.director}
          onChange={(e) => setNewFilm({ ...newFilm, director: e.target.value })}
        />
        <TextField
          margin="dense"
          label="Năm sản xuất"
          fullWidth
          type="number"
          value={newFilm.year}
          onChange={(e) =>
            setNewFilm({ ...newFilm, year: Number(e.target.value) })
          }
        />
        <TextField
          margin="dense"
          label="Lượt xem"
          fullWidth
          type="number"
          value={newFilm.view}
          onChange={(e) =>
            setNewFilm({ ...newFilm, view: Number(e.target.value) })
          }
        />
        <TextField
          margin="dense"
          label="Lượt thích"
          fullWidth
          type="number"
          value={newFilm.like}
          onChange={(e) =>
            setNewFilm({ ...newFilm, like: Number(e.target.value) })
          }
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" variant="outlined">
          Hủy
        </Button>
        <Button onClick={handleSave} color="primary" variant="contained">
          Lưu
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddFilmModal;
