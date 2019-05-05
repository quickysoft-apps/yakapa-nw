import React from 'react';
import { exportExtensionPart, ExtensionPart, fireExtensionRenderReadyEvent } from '@yakapa/shared';
import { Menu } from './components/Menu';
import { MainContent } from './components/MainContent';

exportExtensionPart(ExtensionPart.Menu, <Menu />, module);
exportExtensionPart(ExtensionPart.Content, <MainContent />, module);
fireExtensionRenderReadyEvent(chrome.runtime.id);
