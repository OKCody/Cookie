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
		para = ['cookie', 'personal', 'optimise', 'optimize', 'customise', 'customize', 'site', 'policy', 'website', 'information', 'agree', 'experience', 'analy', 'analy', 'services', 'provide', 'privacy', 'technolog', 'accept', 'consent'];

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
			var paraFound = 0;
			var found = 0;
			var wxyz = 0;
			// Attempts to identify cookie notices only by thier className and id,
			// should catch most notices
			for(var k=0; k<keyword.length; k++){
				//if(count == 1){
					for(var i=0; i<item.length; i++){
						if(item[i].className.toLowerCase().includes(keyword[k])){
							//console.log(keyword[k],item[i],item[i].className);
							hide(item[i]);
							console.log('here1');
						}
						if(item[i].id.toLowerCase().includes(keyword[k])){
							console.log(keyword[k],item[i],item[i].className);
							hide(item[i]);
							count++;
							console.log('here2');
						}
					}
				//}
			}
			// Attempts to catch the longer notices that are not clearly identified
			// by their className or id
			for(var i=0; i<item.length; i++){
				var filtered = item[i].innerHTML.toLowerCase().replace(stopWords, ' ');
				var length = filtered.split(' ').length;

				for(var k=0; k<phrase.length; k++){
					if(item[i].innerHTML.toLowerCase().includes(phrase[k])){
						hide(item[i]);
					}
				}
				//overlapping normal distribution points to using a threshold of .1
				if(length > 7){
					for(var p=0; p<para.length; p++){
						if(found/length < .25){
							//innerHTML works pretty well trying innerText
							paraFound = filtered.split(para[p]).length - 1;
							if(paraFound){
								found = found + paraFound;
								//console.log(found, length, para[p], filtered);
							}
						}
						else{
							//console.log('boom');
							hide(item[i]);
							//console.log(found/length, para[p-1], item[i]);
							console.log(found/length, 'hide - - - - - - - - - - ');
							wxyz++;
							break;
						}
					}
					//console.log(found, length);
					found = 0;
				}
			}
		}

		get(test);
		// ----------------------------------------------------------

	}
	}, 10);
});