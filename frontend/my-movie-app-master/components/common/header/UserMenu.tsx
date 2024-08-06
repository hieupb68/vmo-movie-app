import React from "react";
import { Avatar, Menu, MenuItem, Typography, Divider, ListItemIcon } from "@mui/material";
import { Logout, WorkspacePremium } from "@mui/icons-material";
import classNames from "classnames";

interface UserMenuProps {
  anchorEl: null | HTMLElement;
  handleMenuClose: () => void;
  userInfo: {
    email?: string;
    name?: string;
    image?: string;
  } | null;
  darkMode: boolean;
  handleLogout: () => void;
}

const UserMenu: React.FC<UserMenuProps> = ({
  anchorEl,
  handleMenuClose,
  userInfo,
  darkMode,
  handleLogout,
}) => {
  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
      MenuListProps={{
        "aria-labelledby": "avatar-button",
      }}
      className={classNames(
        "mt-2 text-center",
        darkMode ? "bg-slate-800 text-white" : "bg-white text-black"
      )}
    >
      <MenuItem disabled>
        <Avatar src={userInfo?.image} sizes="small" /><p className="mx-2 font-bold">{userInfo?.name}</p>
      </MenuItem>
      <MenuItem disabled>
        <Typography variant="body2">{userInfo?.email}</Typography>
      </MenuItem>
      <MenuItem disabled>
        <WorkspacePremium /><Typography variant="body2" className="mx-2">Tài khoản fan cứng</Typography>
      </MenuItem>
      <Divider />
      <MenuItem onClick={handleLogout}>
        <ListItemIcon>
          <Logout fontSize="small" />
        </ListItemIcon>
        Đăng xuất
      </MenuItem>
    </Menu>
  );
};

export default UserMenu;
