import React, { ReactElement } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';

import { MainTheme } from './theme';
import { fireEvent, registerEvent } from './events';

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

const INJECT_EXTENSION_CONTENT = 'injectContent';
const REMOVE_EXTENSION_CONTENT = 'removeContent';

export const injectExtensionContent = (id?: string) => {
  if (id) {
    const chromeExtensionUrl = `chrome-extension://${id}`;
    console.log('Inject', `(${chromeExtensionUrl})`);
    fireEvent(INJECT_EXTENSION_CONTENT, id);
  }
};

export const removeExtensionContent = (id?: string) => {
  if (id) {
    fireEvent(REMOVE_EXTENSION_CONTENT, id);
  }
};

export const renderExtensionContent = <P extends {}>(element: ReactElement<P>, hotModule: NodeModule) => {
  const onInject = () => {
    console.log('Injecting extension component');
    injectContent(element);
  };

  const onRemove = () => {
    console.log('Removing extension component');
    const root = document.getElementById('extension-content');
    if (root) {
      unmountComponentAtNode(root);
    }
  };

  registerEvent(INJECT_EXTENSION_CONTENT, chrome.runtime.id, onInject);
  registerEvent(REMOVE_EXTENSION_CONTENT, chrome.runtime.id, onRemove);

  if (hotModule.hot) {
    hotModule.hot.accept(function() {
      const id = chrome.runtime.id;
      console.log('Hot reload extension', chrome.runtime.getManifest().name, `(chrome-extension://${id})`);
      injectContent(element);
    });
  }

  const injectContent = <P extends {}>(element: ReactElement<P>) => {
    const root = document.getElementById('extension-content');
    if (root) {
      unmountComponentAtNode(root);
      render(<MainTheme>{element}</MainTheme>, root);
    }
  };
};
