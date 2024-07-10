import React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import useAuthStore from 'src/store/authStore';

import AppWidgetSummary from './CategoryCard';

function Categories() {
  const { user } = useAuthStore();
  const { categories } = user;

  return (
    <>
      {(categories && Array.isArray(categories) ? categories : []).map((ele) => (
        <AppWidgetSummary key={ele._id} item={ele} title={ele.name} total={714000} color="success" />
      ))}
    </>
  );
}

export default Categories;
