chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // chrome.alarms.create("job", {
  //   delayInMinutes: 0.1,
  //   periodInMinutes: 0.1
  // });
  console.log('message', message, sender);
});

// chrome.alarms.onAlarm.addListener(function(alarm) {
//   console.log('Got an alarm!', alarm);
//   alert('ALEEEEERTE');
// });
