import React, { useState } from 'react';
import useGeneralStore from 'src/store/generalStore';
// import { Dialog, CircularProgress, makeStyles } from '@material-ui/core';

import classes from './style.module.css';

const LoadingComponent = ({ isVisible }) => {
  //   const classes = useStyles();
  const { generalIsLoading } = useGeneralStore();

  return generalIsLoading ? (
    <div
      className={`absolute inset-0 bg-zinc-900/50 flex justify-center items-start z-[1200] overflow-hidden h-[200vh] `}
    >
      <div className={` inset-0  flex justify-center items-center h-[100vh]`}>
        <div className={`${classes[`loader`]}`}>
          <div className={`${classes['cell']} ${classes['d-0']}`}></div>
          <div className={`${classes['cell']} ${classes['d-1']}`}></div>
          <div className={`${classes['cell']} ${classes['d-2']}`}></div>

          <div className={`${classes['cell']} ${classes['d-1']}`}></div>
          <div className={`${classes['cell']} ${classes['d-2']}`}></div>

          <div className={`${classes['cell']} ${classes['d-2']}`}></div>
          <div className={`${classes['cell']} ${classes['d-3']}`}></div>

          <div className={`${classes['cell']} ${classes['d-3']}`}></div>
          <div className={`${classes['cell']} ${classes['d-4']}`}></div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default LoadingComponent;
