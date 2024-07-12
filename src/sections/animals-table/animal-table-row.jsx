import { useState } from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { S3_URL } from 'src/constants/index';
import useGeneralStore from 'src/store/generalStore';
import { deleteAnimal } from 'src/actions/animalsActions';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

// ----------------------------------------------------------------------

export default function AnimalTableRow({
  selected,
  name,
  categoryName,
  gallery,
  healthStatus,
  collarId,
  birth_date,
  categoryId,
  id,
}) {
  const [open, setOpen] = useState(null);
  const { setGeneralIsLoading } = useGeneralStore();
  const navigate = useNavigate();

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const date = new Date(birth_date);
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const readableDate = date.toLocaleDateString('en-US', options);

  let avatarUrl;
  if (Array.isArray(gallery) && gallery.length > 0) {
    avatarUrl = `${S3_URL}${gallery[0]}`;
  }

  const deleteAnimalAction = async () => {
    setGeneralIsLoading(true);
    await deleteAnimal(categoryId, id);
    setGeneralIsLoading(false);
    toast.success('Animal Deleted Successfully');
  };

  return (
    <>
      <TableRow
        onClick={() => navigate(`/animals/${categoryId}/${id}`)}
        hover
        tabIndex={-1}
        role="checkbox"
        selected={selected}
        className="cursor-pointer"
      >
        {/* <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell> */}

        <TableCell component="th" scope="row" padding="none" className="cursor-pointer ">
          <Stack direction="row" alignItems="center" spacing={2} className="cursor-pointer pl-3">
            <Avatar alt={name} src={avatarUrl} />
            <Typography variant="subtitle2" noWrap>
              {name}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>{categoryName}</TableCell>
        <TableCell>{`${readableDate}`.includes(`nvalid`) ? `` : readableDate}</TableCell>
        <TableCell>{healthStatus}</TableCell>
        <TableCell>
          {collarId ? <Label color="success">Yes</Label> : <Label color="error">No</Label>}
        </TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={handleCloseMenu}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem onClick={deleteAnimalAction} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}
