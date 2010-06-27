var Worldcup = {

	queue:[],
	players:[],
	playersDetails:[],
	highlights:[],
	highlightsFound:[],
	googleReady:false,
	
	activeCountry: 'OTHER',
	activeTwitpicSearch: 'http://search.twitter.com/search.json?q=twitpic+Worldcup',
	activeYoutubeSearch: 'http://gdata.youtube.com/feeds/videos?max-results=5&start-index=1&vq=World Cup',

	initialize:function() {
		/*
		google.load("language", "1");
		google.setOnLoadCallback(function() {
			Worldcup.googleReady = true;
		});
		*/
		
		
		yqlgeo.get('visitor',function(o){
			
			var visitorCountry = o.place.country.content;
			Worldcup.setActive(visitorCountry);
			
			var oConnection = kwwika.Service.connect();
			var oSubscription = oConnection.subscribe("/KWWIKA/TWITTER/SEARCHES/WC2010/"+Worldcup.activeCountry, {
				topicUpdated:function(oSub, mUpdate){ 
					Worldcup.queue.push(mUpdate);
				}
			});
			
			Worldcup.getHighlights();

		});
		
		Worldcup.getInstantReplay();
				
		new PeriodicalExecuter(function(pe) {
			Worldcup.next();
		}, 0.8);
		
		new PeriodicalExecuter(function(pe) {
			Worldcup.nextPlayer();
		}, 3);
		
		new PeriodicalExecuter(function(pe) {
			Worldcup.nextHighlight();
		}, 5);
		
		new PeriodicalExecuter(function(pe) {
			Worldcup.getHighlights();
		}, 10);
	},
	
	setActive:function(country) {
	
		switch(country) {
		case 'United Kingdom':
		case 'Wales':
		case 'Scotland':
		case 'England':
			Worldcup.activeCountry = 'ENGLAND';
			Worldcup.activeTwitpicSearch = 'http://search.twitter.com/search.json?q=twitpic+Worldcup&ors=England+En+Eng';
			Worldcup.activeYoutubeSearch = 'http://gdata.youtube.com/feeds/videos?max-results=5&start-index=1&vq=World Cup England'
			break;
		default:
			Worldcup.activeCountry = 'OTHER';
			Worldcup.activeTwitpicSearch = 'http://search.twitter.com/search.json?q=twitpic+Worldcup';
			Worldcup.activeYoutubeSearch = 'http://gdata.youtube.com/feeds/videos?max-results=5&start-index=1&vq=World Cup';
			break;
		}
	},
	
	addPlayer:function(tweet) {
		// Add new Avatar
		var avatar = new Element('li', {
		}).update("<a href='http://twitter.com/"+tweet.ScreenName+"' target='_blank'><img src='"+tweet.UserProfileImageUrl+"' /></a>");
		
		if($$('#team ul li').length > 0) {
			$$('#team ul')[0].insertBefore(avatar, $$('#team ul li')[0]);
		} else {
			$$('#team ul')[0].appendChild(avatar);
		}
		
		avatar.setOpacity(0);
		avatar.morph("opacity:1", {duration:0.8});
		
		Worldcup.garbage();
	},
	
	add:function(tweet) {
		if(tweet.PlaceCountry.blank()) {
			console.log("Tweet came from: " +tweet.PlaceCountry);
			console.log(tweet);
		}
		
		if(tweet.ScreenName == "aaronbassett") {
			console.log(tweet);
		}
		
		// Add new tweet
		var element = new Element('li',{ 
			style:'height:auto'
		}).update(ify.clean(tweet.Text));
		
		if($$('#tweets ul li').length > 0) {
			$$('#tweets ul')[0].insertBefore(element, $$('#tweets ul li')[0]);
		} else {
			$$('#tweets ul')[0].appendChild(element);
		}
		
		element.setOpacity(0);
		element.morph("opacity:1", {duration:0.8});
		
		if(Worldcup.players.indexOf(tweet.ScreenName) == -1) {
			Worldcup.players.push(tweet.ScreenName);
			Worldcup.playersDetails[tweet.ScreenName] = tweet;
		}
		
		GoogleDetect(tweet.Text);
		Worldcup.garbage();
	},
	
	getHighlights:function() {
		var s = document.createElement('script');
		s.type = 'text/javascript';
		s.src = Worldcup.activeTwitpicSearch+'&callback=Worldcup.loadHighlights&rpp=100';
		document.getElementsByTagName('head')[0].appendChild(s);
	},
	
	loadHighlights:function(data) {
		if(data.results == undefined) return;

		for(var i=0; i < data.results.length; i++) {
			matches = data.results[i].text.match(/twitpic.com\/[0-9a-zA-Z]*/g);
			$A(matches).each(function(matchurl) {
				twitpicId = matchurl.split("/")[1];
				if(Worldcup.highlightsFound.indexOf(twitpicId) == -1) {
					Worldcup.highlights.push(twitpicId);
					Worldcup.highlightsFound.push(twitpicId);
					
					var him = new Image();
					him.src = "http://twitpic.com/show/mini/"+twitpicId;
				}
				
			});
			
		}
	},
	
	showHighlight:function(twitpicId) {
		var high = new Element('li', {
		}).update("<a href='http://twitpic.com/"+twitpicId+"' target='_blank'><img src='http://twitpic.com/show/mini/"+twitpicId+"' /></a>");
		
		if($$('#highlights ul li').length > 0) {
			$$('#highlights ul')[0].insertBefore(high, $$('#highlights ul li')[0]);
		} else {
			$$('#highlights ul')[0].appendChild(high);
		}
		
		high.setOpacity(0);
		high.morph("opacity:1", {duration:0.8});		
		
		Worldcup.garbage();
	},
	
	getInstantReplay:function() {
		var s = document.createElement('script');
		s.src = Worldcup.activeYoutubeSearch + "&alt=json-in-script&callback=Worldcup.showInstantReplay";
		s.type = "text/javascript";
		document.getElementsByTagName("head")[0].appendChild(s);
	},
	
	/*
	Object
	encoding: "UTF-8"
	feed: Object
	author: Array (1)
	category: Array (1)
	entry: Array (5)
	0: Object
	author: Array (1)
	0: Object
	name: Object
	$t: "dhiwizz"
	__proto__: Object
	uri: Object
	__proto__: Object
	length: 1
	__proto__: Array
	category: Array (46)
	content: Obj
	*/
	showInstantReplay:function(data) {
		var video = data.feed.entry[0];
		$('replay-video').update(
			'<object width="260" height="209">'
			+ '<param name="movie" value="http://www.youtube.com/v/'+video.id.$t.split('/').pop()+'&fs=1&"></param>'
			+ '<param name="allowFullScreen" value="true"></param>'
			+ '<param name="allowscriptaccess" value="always"></param>'
			+ '<embed src="http://www.youtube.com/v/'+video.id.$t.split('/').pop()+'&fs=1&" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="260" height="209"></embed>'
			+ '</object>'
		);
	},
	
	garbage:function() {
		if($$('#tweets ul li').length > 30) {
			for(var i=31; i < $$('#tweets ul li').length; i++) {
				$$('#tweets ul li')[i].remove();
			}
		}
		
		if($$('#team ul li').length > 11) {
			for(var i=11; i < $$('#team ul li').length; i++) {
				$$('#team ul li')[i].remove();
			}
		}
		
		if($$('#highlights ul li').length > 9) {
			for(var i=9; i < $$('#highlights ul li').length; i++) {
				$$('#highlights ul li')[i].remove();
			}
		}
	},
	
	next:function() {
		if(Worldcup.queue.length >= 1) {
			Worldcup.add(Worldcup.queue.shift());
		}
	},
	
	nextPlayer:function() {
		if(Worldcup.players.length >= 1) {
			Worldcup.addPlayer(Worldcup.playersDetails[Worldcup.players.shift()]);
		}
	},
	
	nextHighlight:function() {
		if(Worldcup.highlights.length >= 1) {
			Worldcup.showHighlight(Worldcup.highlights.shift());
		}
	}
};

var ify = function() {
  return {
    "link": function(t) {
      return t.replace(/(^|\s+)(https*\:\/\/\S+[^\.\s+])/g, function(m, m1, link) {
        return m1 + '<a href=' + link + '>' + ((link.length > 25) ? link.substr(0, 24) + '...' : link) + '</a>';
      });
    },
    "at": function(t) {
      return t.replace(/(^|\s+)\@([a-zA-Z0-9_]{1,15})/g, function(m, m1, m2) {
        return m1 + '@<a href="http://twitter.com/' + m2 + '">' + m2 + '</a>';
      });
    },
    "hash": function(t) {
      return t.replace(/(^|\s+)\#([a-zA-Z0-9_]+)/g, function(m, m1, m2) {
        return m1 + '#<a href="http://search.twitter.com/search?q=%23' + m2 + '">' + m2 + '</a>';
      });
    },
    "clean": function(tweet) {
      return this.hash(this.at(this.link(tweet)));
    }
  };
}();

document.observe("dom:loaded", function() {
	Worldcup.initialize();
});

google.load("language", "1");
var googleAPILoaded = false;

function GoogleAPIinitialize() {
	googleAPILoaded = true;
}
 
function GoogleDetect(text) {
  if(!googleAPILoaded) return;
  
  google.language.detect(text, function(result) {
    if (!result.error) {
      var language = 'unknown';
      for (l in google.language.Languages) {
        if (google.language.Languages[l] == result.language) {
          language = l;
          break;
        }
      }
    }
  });
}
google.setOnLoadCallback(GoogleAPIinitialize);

/*
BrownTotal: "1"
CameronTotal: "6"
CleggTotal: "423"
CreatedAt: "6/15/2010 6:09:40 PM"
Favourited: "false"
GeoLat: "="
GeoLong: "="
GeoType: "Point"
Id: "16239591607"
InReplyToScreenName: "="
InReplyToStatusId: "="
InReplyToUserId: "19339713"
PlaceCountry: "="
PlaceFullName: "="
PlaceId: "ac88a4f17a51c7fc"
PlaceName: "Portland"
PlaceType: "="
PlaceUrl: "="
ScreenName: "Englandff"
Source: "<a href="http://apiwiki.twitter.com/" rel="nofollow">API</a>"
Text: "Rooney back in training http://ffd.me/b6Fgmi #worldcup #eng"
TotalTweets: "2095795"
Truncated: "false"
UserFollowersCount: "0"
UserName: "England on FanFeedr"
UserProfileImageUrl: "http://a1.twimg.com/profile_images/969066708/worldcup2010_normal.png"
__proto__: Object
*/