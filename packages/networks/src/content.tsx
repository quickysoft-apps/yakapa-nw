import React from 'react';

import { Typography } from '@material-ui/core';
import { exportExtensionPart, ExtensionPart } from '@yakapa/shared';

import { Menu } from './components/Menu';

export const Content = () => {
  return (
    <>
      <Typography>Networks Extension here</Typography>
    </>
  );
};

exportExtensionPart(ExtensionPart.Menu, <Menu />, module);
exportExtensionPart(ExtensionPart.Content, <Content />, module);
