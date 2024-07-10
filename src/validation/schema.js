import * as Yup from 'yup';

export const RegisterSchema = Yup.object().shape({
  full_name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phoneNumber: Yup.string()
    .matches(/^\d{11}$/, 'Phone number must be exactly 11 digits')
    .required('Phone number is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  confirm_password: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Please confirm your password'),
  address: Yup.string(),
  postal_code: Yup.string().matches(/^\d{5}$/, 'Postal code must be exactly 5 digits'),
});

export const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});
