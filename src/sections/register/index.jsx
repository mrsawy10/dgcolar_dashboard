import { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';
// import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

// import { useRouter } from 'src/routes/hooks';

import { bgGradient } from 'src/theme/css';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';
import NumberInput from 'src/components/NumberInput';
import useAuthStore, { Register } from 'src/store/authStore';
import useGeneralStore from 'src/store/generalStore';

// ----------------------------------------------------------------------

export default function RegisterView() {
  const theme = useTheme();
  const { setGeneralIsLoading, generalIsLoading } = useGeneralStore();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { user, isLoading, error, token, isSuccess, isError } = useAuthStore();

  const renderForm = (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const fd = new FormData(e.target);
        const formData = Object.fromEntries(fd.entries());
        // _______________________________________________
        await Register(formData);
      }}
    >
      <Stack spacing={3}>
        <TextField name="full_name" label="Full Name" />
        <TextField name="email" label="Email address" />
        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          name="confirm_password"
          label="Confirm Password"
          type={showConfirmPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                  <Iconify icon={showConfirmPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <NumberInput name="phoneNumber" label="Phone Number" />
        <TextField name="address" label="Address" />
        <TextField name="postal_code" label="Postal Code" />
      </Stack>
      <div className="my-10"></div>
      <LoadingButton
        className="mt-24"
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
      >
        Sign Up
      </LoadingButton>
    </form>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
      <Logo
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
      />

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4">Sign Up to DG Collar</Typography>

          <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
            Already have an account?
            <Link href="/login" variant="subtitle2" sx={{ ml: 0.5 }}>
              Login
            </Link>
          </Typography>
          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
