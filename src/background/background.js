chrome.runtime.onMessage.addListener(function(request, sender) {
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
  }
});