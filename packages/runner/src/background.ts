import { register } from 'ts-node';

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.script) {
    const result = register().compile(message.script, 'toto.js');
    sendResponse({ result });
  }
});
