import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

interface Category {
  name: string;
  description: string;
  itemCount: number;
}

interface DetailCategoryModalProps {
  open: boolean;
  onClose: () => void;
  category: Category | null;
}

const DetailCategoryModal: React.FC<DetailCategoryModalProps> = ({ open, onClose, category }) => {
  if (!category) return null;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Chi tiết thể loại</DialogTitle>
      <DialogContent>
        <p><strong>Tên thể loại:</strong> {category.name}</p>
        <p><strong>Mô tả:</strong> {category.description}</p>
        <p><strong>Số lượng:</strong> {category.itemCount}</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Đóng</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DetailCategoryModal;
