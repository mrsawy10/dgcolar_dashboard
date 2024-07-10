import React from 'react';
import { Helmet } from 'react-helmet-async';
import RegisterSection from 'src/sections/register';

function Register() {
  return (
    <>
      <Helmet>
        <title> Register | DG Collar </title>
      </Helmet>
      <RegisterSection />
    </>
  );
}

export default Register;
