import React from 'react';
import { render } from 'react-dom';
import { App } from './App';

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('---message----', message);
  console.log('---sender----', sender);
  if (message.injectApp) {
    injectApp();
    sendResponse({ startedExtension: true });
  }
});

function injectApp() {
  const div = document.createElement('div');
  div.setAttribute('id', 'chromeExtensionSettings');
  document.body.appendChild(div);
  render(<App />, div);
}
