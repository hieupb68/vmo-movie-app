import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

interface DeleteCategoryModalProps {
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const DeleteCategoryModal: React.FC<DeleteCategoryModalProps> = ({
  open,
  onClose,
  onDelete,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Xác nhận xóa</DialogTitle>
      <DialogContent>
        <p>Bạn có chắc chắn muốn xóa thể loại này không?</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Hủy
        </Button>
        <Button onClick={onDelete} color="primary" className="text-red-500">
          Xóa
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteCategoryModal;
