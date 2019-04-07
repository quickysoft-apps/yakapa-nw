import React from 'react';
import { renderExtension } from '@yakapa/shared';

import { Typography } from '@material-ui/core';

const Content = () => {
  return (
    <>
      <Typography>Networks Extension here</Typography>
    </>
  );
};

renderExtension(<Content />, module);
