import React, { ReactElement } from 'react';
import { render } from 'react-dom';
import { CssBaseline, MuiThemeProvider } from '@material-ui/core';
import { darkTheme } from './theme';

export enum ExtensionPart {
  All = 'all',
  Menu = 'menu',
  ContentToolbar = 'contentToolbar',
  Content = 'content',
  SubMenuToolbar = 'submenuToolbar',
  SubMenu = 'submenu'
}
export enum ExtensionEventKind {
  Inject = 'inject',
  Activate = 'activate',
  SubActivate = 'subactivate'
}

export interface EventIdentifier {
  type: string;
  token?: string;
}

export interface SubActivatePayload<T> {
  subItemId: T;
}

export const getExtensionRootId = (extensionPart: ExtensionPart, extensionId?: string) => `extension-${extensionPart}${extensionId ? `-${extensionId}` : ''}`;
export const getExtensionInjectEventType = (eventKind: ExtensionEventKind, extensionPart: ExtensionPart) => `${eventKind}-${extensionPart}`;

export interface RegisteredExtensionCollection {
  extensions: RegisteredExtension[];
}

export type RegisteredExtension = Partial<chrome.management.ExtensionInfo> & {
  index: number;
  hidden?: boolean;
};

export type EventPayload = Record<string, string | number | boolean>;

export const registerEvent = (eventIdentifier: EventIdentifier, eventListener: EventListenerOrEventListenerObject) => {
  const eventId = getEventId(eventIdentifier);
  console.log('Register event', eventId);
  document.removeEventListener(eventId, eventListener);
  document.addEventListener(eventId, eventListener);
};

export const unregisterEvent = (eventIdentifier: EventIdentifier, eventListener: EventListenerOrEventListenerObject) => {
  const eventId = getEventId(eventIdentifier);
  console.log('Unregister event', eventId);
  document.removeEventListener(eventId, eventListener);
};

export const fireEvent = <T extends EventPayload>(eventIdentifier: EventIdentifier, payload?: T) => {
  const eventId = getEventId(eventIdentifier);
  const event = new CustomEvent(eventId, { detail: payload });
  console.log('Fire event', eventId, payload);
  document.dispatchEvent(event);
};

export const fireExtensionEvent = <T extends EventPayload>(type: string, payload?: T) => {
  const eventIdentifier = { type, token: chrome.runtime.id };
  fireEvent(eventIdentifier, payload);
};

export const fireExtensionInjectEvent = (extensionPart: ExtensionPart, extensionId?: string) => {
  if (extensionId) {
    fireEvent({ type: getExtensionInjectEventType(ExtensionEventKind.Inject, extensionPart), token: extensionId });
  }
};

export const fireExtensionActivateEvent = (extensionPart: ExtensionPart, extensionId?: string) => {
  if (extensionId) {
    fireEvent({ type: getExtensionInjectEventType(ExtensionEventKind.Activate, extensionPart), token: extensionId });
  }
};

export const fireExtensionSubActivateEvent = (subItemId: string, extensionId?: string) => {
  if (extensionId) {
    fireEvent({ type: ExtensionEventKind.SubActivate, token: extensionId }, { subItemId });
  }
};

export const fireExtensionRenderReadyEvent = (extensionId?: string) => {
  if (extensionId) {
    fireEvent({ type: getExtensionInjectEventType(ExtensionEventKind.Inject, ExtensionPart.All), token: extensionId });
  }
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
        console.log(`chrome-extension://${ext.id}`);
        resolve(ext);
      } else {
        reject(new Error(`Extension not found: ${extensionName}`));
      }
    });
  });
};

export const exportExtensionPart = (part: ExtensionPart, element: ReactElement, hotModule: NodeModule) => {
  const id = chrome.runtime.id;

  const onInject = () => injectAt(element, getExtensionRootId(part, id));

  registerEvent({ type: getExtensionInjectEventType(ExtensionEventKind.Inject, part), token: id }, onInject);

  if (hotModule.hot) {
    hotModule.hot.accept(function() {
      const id = chrome.runtime.id;
      console.log('Hot reload extension', chrome.runtime.getManifest().name, `(chrome-extension://${id})`);
      onInject();
    });
  }
};

const getEventId = ({ type, token }: EventIdentifier) => `${type}${token ? `-${token}` : ''}`;

const injectAt = (element: ReactElement, rootId: string) => {
  console.log('Finding extension root element', rootId);
  const roots = document.querySelectorAll(`[id^='${rootId}']`);
  if (!roots.length) {
    console.log('Extension root element not found', rootId);
  }
  roots.forEach(root => {
    console.log('Render extension at root element', root.id);
    render(
      <MuiThemeProvider theme={darkTheme}>
        <CssBaseline />
        {element}
      </MuiThemeProvider>,
      root
    );
  });
};
