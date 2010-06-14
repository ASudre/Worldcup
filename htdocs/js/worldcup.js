var Worldcup = {

	queue:[],
	players:[],
	playersDetails:[],
	highlights:[],
	highlightsFound:[],
	googleReady:false,

	initialize:function() {
		/*
		google.load("language", "1");
		google.setOnLoadCallback(function() {
			Worldcup.googleReady = true;
		});
		*/
		
		
		yqlgeo.get('visitor',function(o){
			
			var country = '';
			
			switch(o.place.country.content) {
			case 'United Kigdom':
			case 'Wales':
			case 'Scotland':
			case 'England':
				country = 'ENGLAND';
				break;
			default:
				country = 'OTHER';
				break;
			}
			
			var oConnection = kwwika.Service.connect();
			var oSubscription = oConnection.subscribe("/KWWIKA/TWITTER/SEARCHES/WC2010/"+country, {
				topicUpdated:function(oSub, mUpdate){ 
					Worldcup.queue.push(mUpdate);
				}
			});

		});
				
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
		}, 8);
		
		
		Worldcup.getHighlights();
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
		s.src = 'http://search.twitter.com/search.json?q=twitpic+Worldcup&callback=Worldcup.loadHighlights&rpp=100';
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
      console.debug("Tweet is in: " + language);
    }
  });
}
google.setOnLoadCallback(GoogleAPIinitialize);

/*
CreatedAt: "6/13/2010 4:53:24 PM"
Favourited: "false"
Id: "16080201504"
InReplyToScreenName: "eolai"
InReplyToStatusId: "="
InReplyToUserId: "849201"
ScreenName: "deejaycream"
Source: "<a href="http://ubertwitter.com" rel="nofollow">UberTwitter</a>"
Text: "Argentina punya 'Tangan Tuhan' Serbia punya 'Tangan Kuzman' #worldcup2010"
TotalTweets: "786783"
Truncated: "false"
UserFollowersCount: "1516"
UserName: "reza arnanda putra"
UserProfileImageUrl: "http://a1.twimg.com/profile_images/935147516/20090128142410_KNVB_logo_normal.gif"
*/