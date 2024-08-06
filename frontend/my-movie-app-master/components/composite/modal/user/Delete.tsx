import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

interface DeleteUserModalProps {
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const DeleteUserModal: React.FC<DeleteUserModalProps> = ({
  open,
  onClose,
  onDelete,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Xác nhận xóa</DialogTitle>
      <DialogContent>
        <p>Bạn có chắc chắn muốn xóa người dùng này không?</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Hủy
        </Button>
        <Button onClick={onDelete} color="primary">
          Xóa
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteUserModal;
