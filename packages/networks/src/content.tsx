import React from 'react';
import { renderExtensionContent } from '@yakapa/shared';

import { Typography } from '@material-ui/core';

export const Content = () => {
  return (
    <>
      <Typography>Networks Extension here</Typography>
    </>
  );
};

renderExtensionContent(<Content />, module);
