import React from 'react';
import { renderExtension } from '@yakapa/shared';

import { Typography } from '@material-ui/core';

const Content = () => {
  return (
    <div>
      <Typography>Networks Extension here</Typography>
    </div>
  );
};

renderExtension(<Content />, module);
