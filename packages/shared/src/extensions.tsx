import React, { SFCElement } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';

import { MainTheme } from './theme';
import { fireEvent, registerEvent } from './events';

export enum ExtensionPart {
  Content = 'content',
  Menu = 'menu',
  SubMenu = 'submenu'
}

export enum ExtensionEvent {
  Ready = 'ready',
  InjectContent = 'inject-content',
  InjectMenu = 'inject-menu',
  InjectSubMenu = 'inject-submenu'
}

export const getExtensionRootId = (extensionPart: ExtensionPart, extensionId?: string) => `extension-${extensionPart}${extensionId ? `-${extensionId}` : ''}`;

export enum ExtensionRootId {
  Content = 'extension-content',
  Menu = ''
}

export interface RegisteredExtensionCollection {
  extensions: RegisteredExtension[];
}

export type RegisteredExtension = Partial<chrome.management.ExtensionInfo> & {
  hidden?: boolean;
};

export const findExtension = (extensionName: string): Promise<chrome.management.ExtensionInfo> => {
  return new Promise((resolve, reject) => {
    chrome.management.getAll(result => {
      console.log(result);
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

export const fireExtensionEvent = (eventName: string, extensionId?: string) => {
  if (extensionId) {
    fireEvent(eventName, extensionId);
  }
};

export const exportExtensionPart = (part: ExtensionPart, element: SFCElement<any>, hotModule: NodeModule) => {
  const id = chrome.runtime.id;

  const onInject = () => injectAt(element, part === ExtensionPart.Content ? getExtensionRootId(part) : getExtensionRootId(part, id));

  switch (part) {
    case ExtensionPart.Content:
      registerEvent(ExtensionEvent.InjectContent, id, onInject);
      break;

    case ExtensionPart.Menu:
      registerEvent(ExtensionEvent.InjectMenu, id, onInject);
      break;

    case ExtensionPart.SubMenu:
      registerEvent(ExtensionEvent.InjectSubMenu, id, onInject);
      break;

    default:
      break;
  }

  if (hotModule.hot) {
    hotModule.hot.accept(function() {
      const id = chrome.runtime.id;
      console.log('Hot reload extension', chrome.runtime.getManifest().name, `(chrome-extension://${id})`);
      onInject();
    });
  }

  const injectAt = (element: SFCElement<any>, rootId: string) => {
    console.log('Finding extension root element', rootId);
    const root = document.getElementById(rootId);
    if (!root) {
      console.log('Extension root element not found', rootId);
    }
    if (root) {
      console.log('Found extension root element', rootId, 'and render');
      unmountComponentAtNode(root);
      render(<MainTheme>{element}</MainTheme>, root);
    }
  };
};
