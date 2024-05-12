chrome.contextMenus.onClicked.addListener(handleOnClickMenuItem);

function handleOnClickMenuItem(info, event) {
  switch (info.menuItemId) {
    case "paste-typing":
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { info, event, other: this });
      });
      break;
  }
}
chrome.runtime.onInstalled.addListener(function () {
  chrome.contextMenus.create({
    id: "paste-typing",
    title: "Paste as typing",
    contexts: ["all"],
  });
});
