chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.script) {
    sendResponse({ result: 'TODO: compile and execute script' });
  }
});
