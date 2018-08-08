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
  // This conditional statement is only for debugging purposes. It
  // is meant to log all URLs on which Cookie removes a cookie notice
  // in order to be checked for proper operation after a decent number
  // of URLs have been logged. Also the text of the notices should be
  // scraped and their keywords analyzed for optimizing Cookie.
  if (request.type == 'storage'){
    // chrome.storage.local.set({'cookie': ''}); // use to clear localStorage
    chrome.storage.local.get(['cookie'], function(result){
      if(result.cookie.includes(request.options.url)){
        // do nothing
        console.log(result.cookie);
      }
      else{
        chrome.storage.local.set({'cookie': result.cookie + ', '+ (request.options.url)}, function(result) {
          console.log(result.cookie);
        });
      }
    });
  }
  // End debugging block
});