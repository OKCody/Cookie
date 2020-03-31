chrome.browserAction.onClicked.addListener(function(tab) {
   chrome.tabs.executeScript(null, {file: "/src/background/action.js"});
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {


  if (request.type == 'icon'){
    if (request.options.icon == 'color'){
      console.log('color');
      chrome.browserAction.setIcon({
        path : "/icons/cookie19.png",
        tabId: sender.tab.id
      });
    }
    if (request.options.icon == 'gray'){
      console.log('gray');
      chrome.browserAction.setIcon({
        path : "/icons/grayCookie19.png",
        tabId: sender.tab.id
      });
    }
    if (request.options.icon == 'bite'){
      console.log('bite');
      chrome.browserAction.setIcon({
        path : "/icons/bite19.png",
        tabId: sender.tab.id
      });
    }
  }
  sendResponse({res: "true"});
});
