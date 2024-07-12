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

export const AddAnimalSchema = Yup.object().shape({
  animal_name: Yup.string().required('Name is required'),
  name: Yup.string().required('Name is required'),
  // animal_category: Yup.string().required('Category is required'),
  categoryId: Yup.string().required('Category is required'),
  // animal_breed: Yup.string().required('Breed is required'),
  // animal_color: Yup.string().required('Color is required'),
  // animal_gender: Yup.string().required('Gender is required'),
  // animal_weight: Yup.string().required('Weight is required'),
  birth_date: Yup.string().required('Born Date is required'),

  gallery: Yup.array()
    // .min(1, `Please add at least one image into gallery`)
    .of(
      Yup.mixed().test('fileSize', 'Gallery Must Be Valid Images', (value) => {
        if (value === 'undefined' || value)
          return (
            value &&
            (value.type === 'image/jpg' ||
              value.type === 'image/jpeg' ||
              value.type === 'image/png' ||
              value.type === 'image/webp')
          );
        return true;
      })
    ),
});
