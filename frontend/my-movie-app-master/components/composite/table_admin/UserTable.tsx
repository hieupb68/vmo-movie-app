import React, { useState, useEffect } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  IconButton,
  Tooltip,
  Pagination,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  Visibility as EyeIcon,
} from "@mui/icons-material";
import DetailUserModal from "../modal/user/Detail";
import DeleteUserModal from "../modal/user/Delete";
import { User } from "@/types/user";

const UserTable: React.FC = () => {
  const [userData, setUserData] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/authen/get");
        const data: User[] = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const pages = Math.ceil(userData.length / rowsPerPage);
  const currentItems = userData.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const handleDetailUser = (user: User) => {
    setSelectedUser(user);
    setOpenDetailModal(true);
  };

  const handleOpenDeleteModal = (user: User) => {
    setSelectedUser(user);
    setOpenDeleteModal(true);
  };

  const handleDeleteUser = async () => {
    if (selectedUser && selectedUser.id) {
      try {
        await fetch(
          `http://localhost:8080/api/authen/delete/${selectedUser.id}`,
          {
            method: "DELETE",
          }
        );
        setUserData(userData.filter((u) => u.id !== selectedUser.id));
        setOpenDeleteModal(false);
      } catch (error) {
        console.error("Failed to delete user:", error);
      }
    }
  };

  return (
    <div className="mx-auto bg-white mt-5 p-4 rounded-xl w-full h-[85vh]">
      <div className="flex justify-between items-center mb-4">
        <h2>Có tất cả {userData.length} bản ghi</h2>
        <Pagination
          count={pages}
          page={page}
          onChange={(event, value) => setPage(value)}
          color="primary"
        />
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow className="bg-slate-300">
              <TableCell align="center">STT</TableCell>
              <TableCell align="center">Username</TableCell>
              <TableCell align="center">Vai trò</TableCell>
              <TableCell align="center">Số feedback</TableCell>
              <TableCell align="center">Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentItems.map((user, index) => (
              <TableRow key={user.id}>
                <TableCell align="center">
                  {(page - 1) * rowsPerPage + index + 1}
                </TableCell>
                <TableCell align="center">{user.username}</TableCell>
                <TableCell align="center">{user.role}</TableCell>
                <TableCell align="center">{user.feedbackCount}</TableCell>
                <TableCell align="center">
                  <Tooltip title="Details">
                    <IconButton
                      onClick={() => handleDetailUser(user)}
                      className="text-blue-500"
                    >
                      <EyeIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete" color="error">
                    <IconButton onClick={() => handleOpenDeleteModal(user)}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modals */}
      {selectedUser && (
        <>
          <DetailUserModal
            open={openDetailModal}
            onClose={() => setOpenDetailModal(false)}
            user={selectedUser}
          />
          <DeleteUserModal
            open={openDeleteModal}
            onClose={() => setOpenDeleteModal(false)}
            onDelete={handleDeleteUser}
          />
        </>
      )}
    </div>
  );
};

export default UserTable;
