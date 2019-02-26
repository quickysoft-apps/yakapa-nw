chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  alert(JSON.stringify(chrome.notifications));
  alert(JSON.stringify(chrome.alarms));
  // chrome.alarms.create("job", {
  //     delayInMinutes: 0.1,
  //     periodInMinutes: 0.1
  //   });
});

chrome.alarms.onAlarm.addListener(function(alarm) {
  console.log("Got an alarm!", alarm);
});
