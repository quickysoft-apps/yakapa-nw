import React from 'react';
import { exportExtensionPart, ExtensionPart, fireExtensionRenderReadyEvent } from '@yakapa/shared';
import { Menu } from './components/Menu';
import { MainContent } from './components/MainContent';
import { SubMenu } from './components/SubMenu';

exportExtensionPart(ExtensionPart.Menu, <Menu />, module);
exportExtensionPart(ExtensionPart.SubMenu, <SubMenu />, module);
exportExtensionPart(ExtensionPart.Content, <MainContent />, module);
fireExtensionRenderReadyEvent(chrome.runtime.id);
