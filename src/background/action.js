// Listens for icon click. Onclick toggles display CSS of cookie-identified elements
// helpful when Cookie misidentifies elements and hides too much
// should eventually be incorporated into a machine learning feedback mechanism.
for(var i = 0; i < hidden.length; i++){
  if(hidden[i].style.display == 'none'){
    hidden[i].style.display = 'block';
    chrome.runtime.sendMessage({type: "icon", options: {
      icon: 'gray'
    }});
  }
  else{
    hidden[i].style.display = 'none';
    chrome.runtime.sendMessage({type: "icon", options: {
      icon: 'color'
    }});
  }
}