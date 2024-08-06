import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { User } from '@/types/user';

interface DetailUserModalProps {
  open: boolean;
  onClose: () => void;
  user: User | null;
}

const DetailUserModal: React.FC<DetailUserModalProps> = ({ open, onClose, user }) => {
  if (!user) return null;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Chi tiết người dùng</DialogTitle>
      <DialogContent>
        <p><strong>Tên:</strong> {user.name}</p>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Vai trò:</strong> {user.role}</p>
        <p><strong>Số feedback:</strong> {user.feedbackCount}</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Đóng</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DetailUserModal;
