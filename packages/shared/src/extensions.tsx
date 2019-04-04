import React from 'react';
import { ReactElement } from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { render, unmountComponentAtNode } from 'react-dom';
import { darkTheme } from './theme';

export const renderExtension = <P extends object>(element: ReactElement<P>, hotModule: NodeModule) => {
  const injectEvent = JSON.stringify({ inject: chrome.runtime.id });
  const removeEvent = JSON.stringify({ remove: chrome.runtime.id });

  const onInject = () => {
    console.log('Injecting extension component');
    inject(element);
  };

  const onRemove = () => {
    console.log('Removing extension component');
    const root = document.getElementById('extension');
    if (root) {
      unmountComponentAtNode(root);
    }
  };

  document.removeEventListener(injectEvent, onInject);
  document.addEventListener(injectEvent, onInject);

  document.removeEventListener(removeEvent, onRemove);
  document.addEventListener(removeEvent, onRemove);

  if (hotModule.hot) {
    hotModule.hot.accept(function() {
      const id = chrome.runtime.id;
      console.log('Hot reload extension', chrome.runtime.getManifest().name, `(chrome-extension://${id})`);
      inject(element);
    });
  }

  const inject = <P extends object>(x: ReactElement<P>) => {
    const jsxElement = <MuiThemeProvider theme={darkTheme}>{element}</MuiThemeProvider>;
    const root = document.getElementById('extension');
    if (root) {
      unmountComponentAtNode(root);
      render(jsxElement, root);
    }
  };
};
