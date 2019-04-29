import React from 'react';
import { exportExtensionPart, ExtensionPart, fireEvent, ExtensionEvent } from '@yakapa/shared';
import { Menu } from './components/Menu';
import { MainContent } from './components/MainContent';

exportExtensionPart(ExtensionPart.Menu, <Menu />, module);
exportExtensionPart(ExtensionPart.Content, <MainContent />, module);
fireEvent({ type: ExtensionEvent.RenderReady, token: chrome.runtime.id });
