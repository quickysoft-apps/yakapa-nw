chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.reload) {
    sendResponse({ inject: chrome.runtime.id });
  } else {
    sendResponse({ unknownMessage: message });
  }
});
