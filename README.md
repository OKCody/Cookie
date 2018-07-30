# Cookie
:cookie: is a Chrome extension that hides cookie notices from web pages.

## Method

Cookie is simple. It searches the DOM for nodes with classes and IDs that contain words known to be commonly found in those of cookie notices. If found, those elements are set to display = 'none'. If no nodes are flagged, a slightly more complex routine is started that looks for nodes that are made of 60% or more of words from a list of words commonly found in cookie notices. If such a node is found it is set to display = 'none'. That's it. 

:cookie: does not check URLs against a list for known ways of properly handling notices. It is completely self-contained. If :cookie: makes an attempt to hide a notice its icon changes from grayscale to full-color letting you know that it has done its thing. This also alerts users that if a page displays oddly, :cookie: might be to blame as it is good at its job but not perfect. 

Adjust :cookie:'s keyword lists and thresholds to improves its performance. 

> Note: :cookie: does not make any attempt to click "accept" or "dismiss" or "OK" or otherwise properly allow cookies to be used. This *could cause* some pages to display improperly, but has yet to be seen. 

## // TODO

- [ ] Port to Firefox
- [X] Collect cookie notice sample text
- [ ] Collect more cookie notice sample text
- [ ] Perform statistical analysis of samples to determine optimal keyword list and threshold values
