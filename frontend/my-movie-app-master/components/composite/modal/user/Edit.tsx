import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';

interface User {
  id: number;
  name: string;
  username: string;
  role: string;
  filmsWatched: number;
  feedbackCount: number;
}

interface EditUserModalProps {
  open: boolean;
  onClose: () => void;
  user: User | null;
  onSave: (user: User) => void;
}

const EditUserModal: React.FC<EditUserModalProps> = ({ open, onClose, user, onSave }) => {
  const [editedUser, setEditedUser] = useState<User>(user || {
    id: 0,
    name: '',
    username: '',
    role: '',
    filmsWatched: 0,
    feedbackCount: 0
  });

  const handleSave = () => {
    onSave(editedUser);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Cập nhật người dùng</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Tên"
          fullWidth
          value={editedUser.name}
          onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
        />
        <TextField
          margin="dense"
          label="Username"
          fullWidth
          value={editedUser.username}
          onChange={(e) => setEditedUser({ ...editedUser, username: e.target.value })}
        />
        <TextField
          margin="dense"
          label="Vai trò"
          fullWidth
          value={editedUser.role}
          onChange={(e) => setEditedUser({ ...editedUser, role: e.target.value })}
        />
        <TextField
          margin="dense"
          label="Số phim đã xem"
          fullWidth
          type="number"
          value={editedUser.filmsWatched}
          onChange={(e) => setEditedUser({ ...editedUser, filmsWatched: Number(e.target.value) })}
        />
        <TextField
          margin="dense"
          label="Số feedback"
          fullWidth
          type="number"
          value={editedUser.feedbackCount}
          onChange={(e) => setEditedUser({ ...editedUser, feedbackCount: Number(e.target.value) })}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Hủy</Button>
        <Button onClick={handleSave} color="primary">Lưu</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditUserModal;
