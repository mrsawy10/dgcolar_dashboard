import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Swal from 'sweetalert2';
import { fShortenNumber } from 'src/utils/format-number';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { DeleteCategory } from 'src/actions/categoryActions';

// ----------------------------------------------------------------------

export default function AppWidgetSummary({
  item,
  title,
  total,
  icon,
  color = 'primary',
  sx,
  ...other
}) {
  return (
    <Card
      component={Stack}
      spacing={1}
      direction="column"
      sx={{
        px: 3,
        py: 2,
        minWidth: 250,
        borderRadius: 2,
        ...sx,
      }}
      {...other}
    >
      <div className="flex flex-row justify-end ">
        <div className="ml-auto">
          <IconButton
            onClick={() => {
              Swal.fire({
                title: 'Are you sure?',
                text: 'All Animals In The Category Will Be Deleted .',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!',
              }).then(async (result) => {
                if (result.isConfirmed) {
                  await DeleteCategory(item._id);

                  Swal.fire({
                    title: 'Deleted!',
                    text: 'Your file has been deleted.',
                    icon: 'success',
                  });
                }
              });
            }}
            aria-label="delete"
          >
            <DeleteIcon />
          </IconButton>
        </div>
      </div>
      <Stack spacing={0.5}>
        <Typography variant="h4">{fShortenNumber(total)}</Typography>

        <Typography variant="subtitle2" sx={{ color: 'text.disabled' }}>
          {title}
        </Typography>
      </Stack>
    </Card>
  );
}

AppWidgetSummary.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  sx: PropTypes.object,
  title: PropTypes.string,
  total: PropTypes.number,
  item: PropTypes.object,
};
