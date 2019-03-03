chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // chrome.alarms.create("job", {
  //   delayInMinutes: 0.1,
  //   periodInMinutes: 0.1
  // });
  debugger;
  alert(JSON.stringify(message));
});

// chrome.alarms.onAlarm.addListener(function(alarm) {
//   console.log('Got an alarm!', alarm);
//   alert('ALEEEEERTE');
// });

chrome.runtime.onMessageExternal.addListener(function(request, sender, sendResponse) {
  console.log(request);
  debugger;
  alert(JSON.stringify(request));
});

const injectExtension = (id: string) => {
  alert(JSON.stringify(document));
  const event = document.createEvent('Event');
  event.initEvent(JSON.stringify({ inject: id }));
  document.dispatchEvent(event);
};

if (module.hot) {
  module.hot.dispose(function(data) {});

  module.hot.accept(function() {
    debugger;
    const id = chrome.runtime.id;
    chrome.management.setEnabled(id, false);
    chrome.management.setEnabled(id, true);
    injectExtension(id);
  });
}
