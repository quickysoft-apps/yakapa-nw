import React, { FC, useState } from 'react';
import { List, ListItemIcon, WithStyles, withStyles } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import Avatar from '@material-ui/core/Avatar';

import { ExtensionMenuItem, fireExtensionEvent, useLetterAvatar, useExtensionEvent } from '@yakapa/shared';
import { useCurrentNetworks } from '@yakapa/api';

import { Events } from '../events';

const styles = {
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
};

type Props = WithStyles<typeof styles>;

const MenuComponent: FC<Props> = props => {
  const { classes } = props;
  const [updatedNetworkId, updateNetworks] = useState<string | updatedNetworkId>(undefined);
  const networks = useCurrentNetworks(updatedNetworkId);
  const [currentNetworkId, setCurrentNetworkId] = useState<string | updatedNetworkId>(networks && networks.length ? networks[0].id : undefined);
  useExtensionEvent<{ id: string }>(Events.SelectNetwork, e => {
    setCurrentNetworkId(e.detail.id);
  });
  useExtensionEvent<{ id: string }>(Events.NewNetwork, e => {
    updateNetworks(e.detail.id);
    setCurrentNetworkId(e.detail.id);
  });

  const onMenuItemClick = (id: string) => () => {
    fireExtensionEvent(Events.SelectNetwork, { id });
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
            <ExtensionMenuItem key={network.id} selected={currentNetworkId === network.id} tooltip={network.name} onClick={onMenuItemClick(network.id)}>
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
