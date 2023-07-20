import React, { useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText, Divider } from '@mui/material';
// component
import Iconify from '../../../components/Iconify';
import { useDispatch } from 'react-redux';
import { showConfirmModal } from 'src/redux/create-actions/ConfirmAction';
import { userId } from 'src/redux/create-actions/UserAction';

// ----------------------------------------------------------------------

export default function UserMoreMenu(props) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const { id } = props;
  const dispatch = useDispatch()

  return (
    <React.Fragment>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Iconify icon="eva:more-vertical-fill" width={20} height={20} />
      </IconButton>
      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' },
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem sx={{ color: 'text.secondary' }} onClick={(e) => dispatch(showConfirmModal('Bạn có chắc chắn?', 'Bạn muốn khóa tài khoản này không?', id, "BLOCK_USER"))}>
          <ListItemIcon>
            <Iconify icon="charm:block" color="red" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Khóa tài khoản" primaryTypographyProps={{ variant: 'body2', color: 'red' }} />
        </MenuItem>
        <Divider />
        <MenuItem component={RouterLink} to="/dashboard/edit-user" sx={{ color: 'text.secondary' }} onClick={e => dispatch(userId(id))}>
          <ListItemIcon>
            <Iconify icon="eva:edit-fill" width={20} height={24} />
          </ListItemIcon>
          <ListItemText primary="Cập nhật số dư" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
