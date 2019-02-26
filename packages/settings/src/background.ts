chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  chrome.alarms.create("job", {
    delayInMinutes: 0.1,
    periodInMinutes: 0.1
  });
});

chrome.alarms.onAlarm.addListener(function(alarm) {
  console.log("Got an alarm!", alarm);
  alert("ALEEEEERTE");
});
