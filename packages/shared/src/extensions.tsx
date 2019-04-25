import React, { SFCElement } from 'react';
import { render } from 'react-dom';

import { MainTheme } from './theme';

export enum ExtensionPart {
  Content = 'content',
  Menu = 'menu',
  SubMenu = 'submenu'
}

export enum ExtensionEvent {
  RenderReady = 'render-ready',
  InjectContent = 'inject-content',
  ActivateContent = 'activate-content',
  InjectMenu = 'inject-menu',
  InjectSubMenu = 'inject-submenu'
}

export interface EventIdentifier {
  type: ExtensionEvent;
  token?: string;
}

const getEventId = ({ type, token }: EventIdentifier) => `${type}${token ? `-${token}` : ''}`;

export const getExtensionRootId = (extensionPart: ExtensionPart, extensionId?: string) => `extension-${extensionPart}${extensionId ? `-${extensionId}` : ''}`;

export enum ExtensionRootId {
  Content = 'extension-content',
  Menu = ''
}

export interface RegisteredExtensionCollection {
  extensions: RegisteredExtension[];
}

export type RegisteredExtension = Partial<chrome.management.ExtensionInfo> & {
  index: number;
  hidden?: boolean;
};

export const registerEvent = (eventIdentifier: EventIdentifier, eventListener: EventListenerOrEventListenerObject) => {
  const eventId = getEventId(eventIdentifier);
  console.log('Register event', eventId);
  document.removeEventListener(eventId, eventListener);
  document.addEventListener(eventId, eventListener);
};

export const fireEvent = <T extends { [key: string]: string | number | boolean }>(eventIdentifier: EventIdentifier, payload?: T) => {
  const eventId = getEventId(eventIdentifier);
  const event = new CustomEvent(eventId, { detail: payload });
  console.log('Fire event', eventId, payload);
  document.dispatchEvent(event);
};

export const findExtension = (extensionName: string): Promise<chrome.management.ExtensionInfo> => {
  return new Promise((resolve, reject) => {
    chrome.management.getAll(result => {
      const ext = result.find(x => x.name === extensionName);
      if (ext) {
        const warnings: string[] = [];
        chrome.management.getPermissionWarningsById(ext.id, warnings => {
          warnings.forEach(x => warnings.push(x));
        });
        console.log('Extension', extensionName, 'warnings', warnings);
        resolve(ext);
      } else {
        reject(new Error(`Extension not found: ${extensionName}`));
      }
    });
  });
};

export const exportExtensionPart = (part: ExtensionPart, element: SFCElement<any>, hotModule: NodeModule) => {
  const id = chrome.runtime.id;

  const onInject = () => injectAt(element, getExtensionRootId(part, id));

  switch (part) {
    case ExtensionPart.Content:
      registerEvent({ type: ExtensionEvent.InjectContent, token: id }, onInject);
      break;

    case ExtensionPart.Menu:
      registerEvent({ type: ExtensionEvent.InjectMenu, token: id }, onInject);
      break;

    case ExtensionPart.SubMenu:
      registerEvent({ type: ExtensionEvent.InjectSubMenu, token: id }, onInject);
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
    const roots = document.querySelectorAll(`[id^='${rootId}']`);
    if (!roots.length) {
      console.log('Extension root element not found', rootId);
    }
    roots.forEach(root => {
      console.log('Render extension at root element', root.id);
      render(<MainTheme>{element}</MainTheme>, root);
    });
  };
};
