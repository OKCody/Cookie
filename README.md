# Cookie
Cookie notices enrage me.:fire::rage::fire:  

:cookie: is a Chrome extension that hides cookie notices from web pages.

## Browser Extension

Cookie is simple. It searches the DOM for nodes with position == 'fixed' && innerText that contains "cookie" or other words frequently used in cookie disclaimers. When found, those elements are set to display = 'none'. That's it.

:cookie: does not check URLs against a list for known ways of properly handling notices. It is completely self-contained. If :cookie: makes an attempt to hide a notice its icon changes from grayscale to color letting you know that it has done its thing. This also alerts users that if a page displays strangely :cookie: might be to blame.

> Note: :cookie: does not make any attempt to click "accept" or "dismiss" or "OK" or otherwise properly allow cookies to be used. This *could cause* some pages to display improperly, but has yet to be seen.

## Bookmarklet

Because cookie notices are even more annoying on mobile devices, yet mobile browsers don't support plugins, use these bookmarklets for similar, slightly less convenient, functionality.

To use these bookmarklet, bookmark this page using a mobile device's web browser and replace the URL of that bookmark with one of the following javascript snippets. Next time you encounter a webpage with a cookie notice plastered all over the viewport :fire::rage::fire:, navigate to one of these bookmarks and tap it.

The more conservative bookmarklet, which aims only to remove cookie notices . . .

```
javascript:(function () {
  var nodes = document.querySelectorAll('body *');
  for (i = 0; i < nodes.length; i++) {
    if (getComputedStyle(nodes[i]).position == 'fixed') {
      var re = new RegExp('cookie | use | website | policy | site | experience | policy', 'i');
      if (nodes[i].innerText.match(re)){
        nodes[i].style.display = 'none';
      }
    }
  }
})();
```

. . . or you can go full nuclear and remove all fixed position elements with the following.

```
javascript:(function () {
  var nodes = document.querySelectorAll('body *');
  for (i = 0; i < nodes.length; i++) {
    if (getComputedStyle(nodes[i]).position == 'fixed') {
      nodes[i].style.display = 'none';
    }
  }
})();
```
