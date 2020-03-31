chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		// ----------------------------------------------------------
		// This part of the script triggers when page is done loading

		function get(callback){
			var nodes = document.querySelectorAll('body *');
			//console.log(item);
		  callback(nodes);
		}

		hidden = [];

		function hide(node){
			var re = new RegExp('cookie | use | website | policy | site | experience | policy', 'i');
			// Hide anything that has a fixed position and remotely smells like a cookie notice
			if(node.innerText.match(re)) {
				node.style.display = 'none';
				hidden.push(node);
			}

			// changing the icon will has to happen from background page.
			chrome.runtime.sendMessage({type: "icon", options: {
    		icon: 'color'
			}});
			console.log('🍪');
		}

		function test(nodes){
			for (var i = 0; i < nodes.length; i++){
				if(getComputedStyle(nodes[i]).position == 'fixed') {
					hide(nodes[i]);
					console.log(nodes[i]);
				}
			}
		}

		get(test);
	}
		// ----------------------------------------------------------
	}, 10);
});
