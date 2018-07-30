chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		// ----------------------------------------------------------
		// This part of the script triggers when page is done loading

		elements = 'div, span';
		keyword = ['cookie','gdpr', 'accept', 'optanon'];
		para = ['cookie', 'use', 'site', 'polic', 'technolog', 'service', 'understand', 'provide', 'assist', 'deliver', 'relevant', 'acknowledge'];

		function get(callback){
			var item = document.querySelectorAll(elements);
			//console.log(item);
		  callback(item);
		}

		function hide(notice){
			notice.style.display = 'none';
			//chrome.browserAction.setIcon({path:"/icons/cookie19.png"});
			// changing the icon will probably need to happen from background page.
			chrome.runtime.sendMessage({type: "icon", options: {
    		icon: 'color'
			}});
		}

		function test(item){
			var count = 0;
			var found = 0;
			var words = 0;
			// Attempts to identify cookie notices only by thier className and id,
			// should catch most notices
			for(var k=0; k<keyword.length; k++){
				if(count == 0){
					for(var i=0; i<item.length; i++){
						if(item[i].className.toLowerCase().includes(keyword[k])){
							//console.log(keyword[k],item[i],item[i].className);
							hide(item[i]);
							count++;
							console.log('here1');
						}
						if(item[i].id.toLowerCase().includes(keyword[k])){
							//console.log(keyword[k],item[i],item[i].className);
							hide(item[i]);
							count++;
							console.log('here2');
						}
					}
				}
			}
			// Attempts to catch the longer notices that are not clearly identified
			// by their className or id
			for(var i=0; i<item.length; i++){
				var words = item[i].innerHTML.toLowerCase().split(' ').length;
				if(words > 50){
					//console.log(words);
					if(count == 0){
						for(var p=0; p<para.length; p++){
							if(found/words < .075){
								if(item[i].innerHTML.toLowerCase().includes(para[p])){
									console.log(found/words, para[p], item[i]);
									found++;
								}
							}
							else{
								//console.log('boom');
								hide(item[i]);
								console.log('here3');
							}
						}
					  found = 0;
					}
				}
			}
		}

		get(test);
		// ----------------------------------------------------------

	}
	}, 10);
});

/* The following are sample cookie notices to use when determining keywords */
/*

We use cookies and similar technologies to run this website and help us understand how you use it.

This site uses cookies and other tracking technologies to assist with navigation and your ability to provide feedback, analyse your use of our products and services, assist with our promotional and marketing efforts, and provide content from third parties.Cookie Policy

We use cookies to collect and analyse information on site performance and usage, and to enhance and customise content and advertisements. By Clicking "OK" or by clicking into any content on this site, you agree to allow cookies to be placed. To find out more or to change your cookie settings, visit the cookies section of our privacy policy.

By using our website and services, you expressly agree to the placement of our performance, functionality and advertising cookies.

*/