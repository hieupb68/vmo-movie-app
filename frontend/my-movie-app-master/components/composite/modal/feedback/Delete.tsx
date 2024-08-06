import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

interface DeleteFeedbackModalProps {
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const DeleteFeedbackModal: React.FC<DeleteFeedbackModalProps> = ({
  open,
  onClose,
  onDelete,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Xác nhận xóa</DialogTitle>
      <DialogContent>
        <p>Bạn có chắc chắn muốn xóa phản hồi này không?</p>
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

export default DeleteFeedbackModal;
