import React from 'react';
import { exportExtensionPart, ExtensionPart, fireExtensionRenderReadyEvent } from '@yakapa/shared';
import { Menu, Content, ContentToolbar, SubMenu, SubMenuToolbar } from './components';

exportExtensionPart(ExtensionPart.Menu, <Menu />, module);
exportExtensionPart(ExtensionPart.Content, <Content />, module);
exportExtensionPart(ExtensionPart.ContentToolbar, <ContentToolbar />, module);
exportExtensionPart(ExtensionPart.SubMenu, <SubMenu />, module);
exportExtensionPart(ExtensionPart.SubMenuToolbar, <SubMenuToolbar />, module);
fireExtensionRenderReadyEvent(chrome.runtime.id);
