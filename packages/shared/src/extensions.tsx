import React, { ReactElement } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';

import { MainTheme } from './theme';

export interface RegisteredExtensionCollection {
  extensions: RegisteredExtension[];
}

export type RegisteredExtension = Partial<chrome.management.ExtensionInfo> & {
  hidden?: boolean;
};

export const findExtension = (extensionName: string): Promise<chrome.management.ExtensionInfo> => {
  return new Promise((resolve, reject) => {
    chrome.management.getAll(result => {
      const ext = result.find(x => x.name === extensionName);
      if (ext) {
        chrome.management.getPermissionWarningsById(ext.id, warnings => {
          warnings.forEach(x => console.log(x));
        });
        resolve(ext);
      } else {
        reject(new Error(`Extension not found: ${extensionName}`));
      }
    });
  });
};

export const injectExtension = (id?: string) => {
  if (id) {
    const chromeExtensionUrl = `chrome-extension://${id}`;
    console.log('Inject', `(${chromeExtensionUrl})`);
    const event = document.createEvent('Event');
    event.initEvent(JSON.stringify({ inject: id }));
    document.dispatchEvent(event);
  }
};

export const removeExtension = (id?: string) => {
  if (id) {
    const event = document.createEvent('Event');
    event.initEvent(JSON.stringify({ remove: id }));
    document.dispatchEvent(event);
  }
};

export const renderExtension = <P extends {}>(element: ReactElement<P>, hotModule: NodeModule) => {
  const injectEvent = JSON.stringify({ inject: chrome.runtime.id });
  const removeEvent = JSON.stringify({ remove: chrome.runtime.id });

  const onInject = () => {
    console.log('Injecting extension component');
    inject(element);
  };

  const onRemove = () => {
    console.log('Removing extension component');
    const root = document.getElementById('extension-content');
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

  const inject = <P extends {}>(element: ReactElement<P>) => {
    const root = document.getElementById('extension-content');
    if (root) {
      unmountComponentAtNode(root);
      render(<MainTheme>{element}</MainTheme>, root);
    }
  };
};
