import React from 'react';
import { withStyles, Theme, Typography } from '@material-ui/core';

const styles = (theme: Theme) => ({});

interface Props {
  classes: any;
}

const SubMenuComponent = (props: Props) => {
  return <Typography>Nothing to display here</Typography>;
};

export const SubMenu = withStyles(styles, { withTheme: true })(SubMenuComponent);
