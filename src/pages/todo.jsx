import { Helmet } from 'react-helmet-async';
import React from 'react';
import ToDo from 'src/sections/todo';

function todo() {
  return (
    <>
      <Helmet>
        <title>To Do | DG Collar </title>
      </Helmet>
      <ToDo />
    </>
  );
}

export default todo;
