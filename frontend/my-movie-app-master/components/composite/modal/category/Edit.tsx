import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';

interface Category {
  name: string;
  description: string;
  itemCount: number;
}

interface EditCategoryModalProps {
  open: boolean;
  onClose: () => void;
  category: Category | null;
  onSave: (category: Category) => void;
}

const EditCategoryModal: React.FC<EditCategoryModalProps> = ({ open, onClose, category, onSave }) => {
  const [editedCategory, setEditedCategory] = useState<Category>(category || {
    name: '',
    description: '',
    itemCount: 0
  });

  const handleSave = () => {
    onSave(editedCategory);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Cập nhật thể loại</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Tên thể loại"
          fullWidth
          value={editedCategory.name}
          onChange={(e) => setEditedCategory({ ...editedCategory, name: e.target.value })}
        />
        <TextField
          margin="dense"
          label="Mô tả"
          fullWidth
          value={editedCategory.description}
          onChange={(e) => setEditedCategory({ ...editedCategory, description: e.target.value })}
        />
        <TextField
          margin="dense"
          label="Số lượng"
          fullWidth
          type="number"
          value={editedCategory.itemCount}
          onChange={(e) => setEditedCategory({ ...editedCategory, itemCount: Number(e.target.value) })}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Hủy</Button>
        <Button onClick={handleSave} color="primary">Lưu</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditCategoryModal;
