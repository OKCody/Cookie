chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		// ----------------------------------------------------------
		// This part of the script triggers when page is done loading

		console.log('hoop');

		elements = 'div, span';
		keyword = ['cookie','gdpr', 'accept', 'optanon'];
		// .195 w/stopWords
		// para = ['policy', 'cookie', 'website', 'information', 'more', 'content', 'agree', 'experience', 'about', 'experience', 'analyse', 'analyze', 'provide', 'click', 'technolog'];

		// .182 w/o stopWords, .25 w/ stopWords
		para = ['cookie', 'personal', 'optimise', 'optimize', 'customise', 'customize', 'site', 'policy', 'website', 'information', 'agree', 'experience', 'analy', 'analy', 'services', 'provide', 'technolog', 'accept', 'consent'];

		// do not used 'content' as it is too commonly used - using it broke Office 365 Calendar

		// sensitive to the term "information technology". It removes the address from OU IT's webpage.

		//['cookie', 'use', 'site', 'polic', 'technolog', 'service', 'understand', 'provide', 'assist', 'deliver', 'relevant', 'acknowledge'];

		phrase = ['site uses cookies'];

		stopWords = /\sto\s|this\s|\sthis\s|\sby\s|\sfor\s|\son\s|\swe\s|\sif\s|\sare\s|\sthat\s|\sand\s|\sus\s|\sin\s|\sor\s|\sout\s|\suse\s|use\s|\syou\s|\syour\s|\sour\s|\sits\s|\sthe\s|\sa\s|\scan\s|\sit\s|\swe\s|we\s|\sof\s|\suses\s|\swith\s/gi;

		function get(callback){
			var item = document.querySelectorAll(elements);
			//console.log(item);
		  callback(item);
		}

		function hide(notice, trigger){
			notice.style.display = 'none';
			//chrome.browserAction.setIcon({path:"/icons/cookie19.png"});
			// changing the icon will probably need to happen from background page.
			chrome.runtime.sendMessage({type: "icon", options: {
    		icon: 'color'
			}});
			console.log('🍪', trigger);
		}

		function test(item){
			var count = 0;
			var paraFound = 0;
			var found = [];
			// Attempts to identify cookie notices only by thier className and id,
			// should catch most notices
			for(var k=0; k<keyword.length; k++){
				//if(count == 1){
					for(var i=0; i<item.length; i++){
						if(item[i].className.toLowerCase().includes(keyword[k])){
							//console.log(keyword[k],item[i],item[i].className);
							hide(item[i], 'class: ' + item[i].className);
						}
						if(item[i].id.toLowerCase().includes(keyword[k])){
							hide(item[i], 'id: ' + item[i].id);
							count++;
						}
					}
				//}
			}
			// Attempts to catch the longer notices that are not clearly identified
			// by their className or id
			for(var i=0; i<item.length; i++){
				var filtered = item[i].innerHTML.toLowerCase().replace(stopWords, ' ');
				var length = filtered.split(' ').length;
				var foundCount = 0;
				var foundTotal = 0;

				for(var k=0; k<phrase.length; k++){
					if(item[i].innerHTML.toLowerCase().includes(phrase[k])){
						hide(item[i], 'phrase: ' + phrase[k]);
					}
				}

				//overlapping normal distribution points to using a threshold of .1
				if(length > 7){
					for(var p=0; p<para.length; p++){
						if(foundTotal/length < .25){
							//innerHTML works pretty well trying innerText
							var foundCount = filtered.split(para[p]).length - 1;
							if(foundCount){
								found.push(para[p]);
								var foundTotal = foundTotal + foundCount;
							}
						}
						else{
							hide(item[i], (foundTotal/length).toFixed(3).toString() + ' keywords: ' + found.join(' ') );
							//console.log(item[i]);
							break;
						}
					}
				}
				var found = [];
				var foundCount = 0;
				var foundTotal = 0;
			}
		}

		get(test);
		// ----------------------------------------------------------

	}
	}, 10);
});