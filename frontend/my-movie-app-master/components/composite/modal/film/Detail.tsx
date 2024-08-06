import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

interface DetailFilmModalProps {
  open: boolean;
  onClose: () => void;
  film: Film | null;
}

const DetailFilmModal: React.FC<DetailFilmModalProps> = ({ open, onClose, film }) => {
  if (!film) return null;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Chi tiết phim</DialogTitle>
      <DialogContent>
        <p><strong>Tên phim:</strong> {film.title}</p>
        <p><strong>Đạo diễn:</strong> {film.director}</p>
        <p><strong>Năm sản xuất:</strong> {film.year}</p>
        <p><strong>Lượt xem:</strong> {film.view}</p>
        <p><strong>Lượt thích:</strong> {film.like}</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Đóng</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DetailFilmModal;
