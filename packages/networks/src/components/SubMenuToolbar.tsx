import React from 'react';
import { withStyles, Theme, Typography } from '@material-ui/core';

const styles = (theme: Theme) => ({});

interface Props {
  classes: any;
}

const SubMenuToolbarComponent = (props: Props) => {
  return <Typography>[Nom du réseau]</Typography>;
};

export const SubMenuToolbar = withStyles(styles, { withTheme: true })(SubMenuToolbarComponent);
