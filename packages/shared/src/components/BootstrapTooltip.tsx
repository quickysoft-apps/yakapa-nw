import React, { FC, useRef } from 'react';
import { withStyles, Theme, WithStyles, createStyles } from '@material-ui/core/styles';
import Tooltip, { TooltipProps } from '@material-ui/core/Tooltip';

function arrowGenerator(color: string) {
  return {
    '&[x-placement*="bottom"] $arrow': {
      top: 0,
      left: 0,
      marginTop: '-0.95em',
      width: '3em',
      height: '1em',
      '&::before': {
        borderWidth: '0 1em 1em 1em',
        borderColor: `transparent transparent ${color} transparent`
      }
    },
    '&[x-placement*="top"] $arrow': {
      bottom: 0,
      left: 0,
      marginBottom: '-0.95em',
      width: '3em',
      height: '1em',
      '&::before': {
        borderWidth: '1em 1em 0 1em',
        borderColor: `${color} transparent transparent transparent`
      }
    },
    '&[x-placement*="right"] $arrow': {
      left: 0,
      marginLeft: '-0.95em',
      height: '3em',
      width: '1em',
      '&::before': {
        borderWidth: '1em 1em 1em 0',
        borderColor: `transparent ${color} transparent transparent`
      }
    },
    '&[x-placement*="left"] $arrow': {
      right: 0,
      marginRight: '-0.95em',
      height: '3em',
      width: '1em',
      '&::before': {
        borderWidth: '1em 0 1em 1em',
        borderColor: `transparent transparent transparent ${color}`
      }
    }
  };
}

const styles = (theme: Theme) =>
  createStyles({
    arrow: {
      position: 'absolute',
      fontSize: 6,
      width: '3em',
      height: '3em',
      '&::before': {
        content: '""',
        margin: 'auto',
        display: 'block',
        width: 0,
        height: 0,
        borderStyle: 'solid'
      }
    },
    bootstrapPopper: arrowGenerator(theme.palette.common.black),
    bootstrapTooltip: {
      backgroundColor: theme.palette.common.black
    },
    bootstrapPlacementLeft: {
      margin: '0 8px'
    },
    bootstrapPlacementRight: {
      margin: '0 8px'
    },
    bootstrapPlacementTop: {
      margin: '8px 0'
    },
    bootstrapPlacementBottom: {
      margin: '8px 0'
    }
  });

type Props = WithStyles<typeof styles> &
  TooltipProps & {
    title: string;
  };

const BootstrapTooltipComponent: FC<Props> = props => {
  const arrowRef = useRef<HTMLSpanElement>(null);

  const { classes, title, ...others } = props;

  return (
    <Tooltip
      title={
        <React.Fragment>
          {title}
          <span className={classes.arrow} ref={arrowRef} />
        </React.Fragment>
      }
      classes={{
        tooltip: classes.bootstrapTooltip,
        popper: classes.bootstrapPopper,
        tooltipPlacementLeft: classes.bootstrapPlacementLeft,
        tooltipPlacementRight: classes.bootstrapPlacementRight,
        tooltipPlacementTop: classes.bootstrapPlacementTop,
        tooltipPlacementBottom: classes.bootstrapPlacementBottom
      }}
      PopperProps={{
        popperOptions: {
          modifiers: {
            arrow: {
              enabled: false,
              element: arrowRef.current
            }
          }
        }
      }}
      {...others}
    />
  );
};

export const BootstrapTooltip = withStyles(styles, { withTheme: true })(BootstrapTooltipComponent);
