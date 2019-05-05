import React, { FC } from 'react';
import { List, ListItem, ListItemIcon, WithStyles, withStyles } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import Avatar from '@material-ui/core/Avatar';
import { BootstrapTooltip, fireExtensionActivateEvent, ExtensionPart } from '@yakapa/shared';

const styles = {
  list: {
    padding: 0
  }
};

interface Props extends WithStyles<typeof styles> {}

const MenuComponent: FC<Props> = props => {
  const { classes } = props;

  const onMenuItemClick = () => {
    fireExtensionActivateEvent(ExtensionPart.Content, chrome.runtime.id);
  };

  return (
    <List className={classes.list}>
      <ListItem button onClick={onMenuItemClick}>
        <BootstrapTooltip title="Ajouter un réseau" placement="right">
          <ListItemIcon>
            <Avatar>
              <Add />
            </Avatar>
          </ListItemIcon>
        </BootstrapTooltip>
      </ListItem>
    </List>
  );
};

export const Menu = withStyles(styles)(MenuComponent);
