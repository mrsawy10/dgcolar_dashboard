import React from 'react';
import { Helmet } from 'react-helmet-async';
import AnimalsView from 'src/sections/animals';

function Animals() {
  return (
    <>
      <Helmet>
        <title> Animals | DG Collar </title>
      </Helmet>

      <AnimalsView />
    </>
  );
}

export default Animals;
