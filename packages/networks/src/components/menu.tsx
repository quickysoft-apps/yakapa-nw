import React, { FC, useState } from 'react';
import { List, ListItemIcon, Theme, WithStyles, withStyles } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import Avatar from '@material-ui/core/Avatar';

import { ExtensionMenuItem, fireExtensionEvent, useLetterAvatar, useExtensionEvent } from '@yakapa/shared';
import { useCurrentNetworks } from '@yakapa/api';

import { Events } from '../events';

const styles = (theme: Theme) => ({
  list: {
    padding: 0
  },
  button: {
    '&:hover': {
      backgroundColor: 'transparent'
    },
    '&:focus': {
      backgroundColor: 'transparent'
    },
    hover: {},
    focus: {}
  }
});

type Props = WithStyles<typeof styles>;

const MenuComponent: FC<Props> = props => {
  const { classes } = props;
  const [currentNetworkId, setCurrentNetworkId] = useState<string | undefined>(undefined);
  const networks = useCurrentNetworks();
  useExtensionEvent<{ id: string }>(Events.SelectNetwork, e => setCurrentNetworkId(e.detail.id));

  const onMenuItemClick = () => {
    //fireExtensionActivateEvent(ExtensionPart.Content, chrome.runtime.id);
  };

  const onAddNetworkClick = () => {
    fireExtensionEvent(Events.OpenAddNetworkDialog);
  };

  return (
    <List className={classes.list}>
      {networks &&
        networks.map(network => {
          const { initials, color } = useLetterAvatar(network.name);
          return (
            <ExtensionMenuItem tooltip={network.name} onClick={onMenuItemClick}>
              <ListItemIcon>
                <Avatar style={{ backgroundColor: color }}>{initials}</Avatar>
              </ListItemIcon>
            </ExtensionMenuItem>
          );
        })}
      <ExtensionMenuItem tooltip="Ajouter un réseau" onClick={onAddNetworkClick}>
        <ListItemIcon>
          <Avatar>
            <Add />
          </Avatar>
        </ListItemIcon>
      </ExtensionMenuItem>
    </List>
  );
};

export const Menu = withStyles(styles, { withTheme: true })(MenuComponent);
