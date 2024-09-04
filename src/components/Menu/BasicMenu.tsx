import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import StorageKeys from '../../constants/storage-keys';
import { Link } from 'react-router-dom';

interface BasicMenuProps {
  name: string;
}

export default function BasicMenu({ name }: BasicMenuProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const logout = () => {
    setAnchorEl(null);
    localStorage.removeItem(StorageKeys.USER);
    localStorage.removeItem(StorageKeys.TOKEN);
    setTimeout(() => {
      window.location.href = '/';
    }, 1000);
  };

  return (
    <div className="mui-menu">
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        style={{ color: 'black' }}
      >
        Hello {name}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>
        <Link to="/myaccount">   My account</Link>
      
        </MenuItem>
        <MenuItem onClick={logout}>Đăng xuất</MenuItem>
      </Menu>
    </div>
  );
}
