import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";

interface AddCategoryModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (category: Category) => void;
}

const AddCategoryModal: React.FC<AddCategoryModalProps> = ({
  open,
  onClose,
  onSave,
}) => {
  const [newCategory, setNewCategory] = useState<Category>({
    name: "",
    description: "",
    itemCount: 0,
  });

  const handleSave = () => {
    onSave(newCategory);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} className="rounded-md">
      <DialogTitle className="text-center font-bold">
        Thêm danh mục phim mới
      </DialogTitle>
      <DialogContent>
        <TextField
          focused
          margin="dense"
          label="Tên danh mục"
          fullWidth
          value={newCategory.name}
          onChange={(e) =>
            setNewCategory({ ...newCategory, name: e.target.value })
          }
        />
        <TextField
          margin="dense"
          label="Mô tả"
          fullWidth
          value={newCategory.description}
          onChange={(e) =>
            setNewCategory({ ...newCategory, description: e.target.value })
          }
        />
        <TextField
          margin="dense"
          label="Số lượng phim"
          fullWidth
          type="number"
          value={newCategory}
          onChange={(e) =>
            setNewCategory({
              ...newCategory,
              itemCount: Number(e.target.value),
            })
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

export default AddCategoryModal;
