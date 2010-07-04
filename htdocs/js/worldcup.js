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
	flag: 'none',
	humanCountry: 'Everyone',
	
	oConnection: false,
	oSubscription: false,
	
	feedItems:[],
	
	lang:false,

	initialize:function() {
		/*
		google.load("language", "1");
		google.setOnLoadCallback(function() {
			Worldcup.googleReady = true;
		});
		*/
		
		Worldcup.fetchfeeds();
		
		$$('#flags a').each(function(fl) {
			fl.observe('click', function(e){
				// Event.stop(e);
				Worldcup.setActive(this.href.split("#")[1]);
			}.bindAsEventListener(fl));
		});
		
		$('lang').observe('change', function() {
			// Remove all
			if($F('lang') != 'ALL') {
				Worldcup.queue = [];
				Worldcup.lang = $F('lang');
			} else {
				Worldcup.lang = false;
			}
		});
		
		$('MapLink').observe('click', function(e) {
			Event.stop(e);
			if(confirm("Maps is very, very, very beta. BE WARNED!\nIt might slow down or kill your browser.\nYou still want to enable it?")) TurnOnMap();
		});
		
		// Deep linked to a valid country?
		var urlObj = new Url.Parse(window.location.toString());
		var countryFragment = urlObj.getFragment();
				
		if(!countryFragment.blank() || countryFragment.toUpperCase() == "OTHER") {
			var visitorCountry = countryFragment;
			Worldcup.setActive(visitorCountry);
			
			yqlgeo.get('visitor',function(o){
				if(!o.place.centroid.latitude.blank() && !o.place.centroid.longitude.blank()) {
					MapLat = o.place.centroid.latitude;
					MapLong = o.place.centroid.longitude;
				}
			});
			
		} else {
			yqlgeo.get('visitor',function(o){
			
				if(!o.place.centroid.latitude.blank() && !o.place.centroid.longitude.blank()) {
					MapLat = o.place.centroid.latitude;
					MapLong = o.place.centroid.longitude;
				}
				
				var visitorCountry = o.place.country.content;
				Worldcup.setActive(visitorCountry);
				
	
			});
		}
				
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
			Worldcup.flag = 'England';
			Worldcup.humanCountry = 'England';
			break;
		case 'Algeria':
			Worldcup.activeCountry = 'ALGERIA';
			Worldcup.activeTwitpicSearch = 'http://search.twitter.com/search.json?q=twitpic+Worldcup&ors=Algeria+Alg';
			Worldcup.activeYoutubeSearch = 'http://gdata.youtube.com/feeds/videos?max-results=5&start-index=1&vq=World Cup Algeria'
			Worldcup.flag = 'Algeria';
			Worldcup.humanCountry = 'Algeria';
			break;
		case 'Argentina':
			Worldcup.activeCountry = 'ARGENTINA';
			Worldcup.activeTwitpicSearch = 'http://search.twitter.com/search.json?q=twitpic+Worldcup&ors=Argentina+Arg';
			Worldcup.activeYoutubeSearch = 'http://gdata.youtube.com/feeds/videos?max-results=5&start-index=1&vq=World Cup Argentina'
			Worldcup.flag = 'Argentina';
			Worldcup.humanCountry = 'Argentina';
			break;
		case 'Australia':
			Worldcup.activeCountry = 'AUSTRALIA';
			Worldcup.activeTwitpicSearch = 'http://search.twitter.com/search.json?q=twitpic+Worldcup&ors=Australia+Aus';
			Worldcup.activeYoutubeSearch = 'http://gdata.youtube.com/feeds/videos?max-results=5&start-index=1&vq=World Cup Australia'
			Worldcup.flag = 'Australia';
			Worldcup.humanCountry = 'Australia';
			break;
		case 'Brazil':
			Worldcup.activeCountry = 'BRAZIL';
			Worldcup.activeTwitpicSearch = 'http://search.twitter.com/search.json?q=twitpic+Worldcup&ors=Brazil+Bra';
			Worldcup.activeYoutubeSearch = 'http://gdata.youtube.com/feeds/videos?max-results=5&start-index=1&vq=World Cup Brazil'
			Worldcup.flag = 'Brazil';
			Worldcup.humanCountry = 'Brazil';
			break;
		case 'Cameroon':
			Worldcup.activeCountry = 'CAMEROON';
			Worldcup.activeTwitpicSearch = 'http://search.twitter.com/search.json?q=twitpic+Worldcup&ors=Cameroon+Cam+cmr';
			Worldcup.activeYoutubeSearch = 'http://gdata.youtube.com/feeds/videos?max-results=5&start-index=1&vq=World Cup Cameroon'
			Worldcup.flag = 'Cameroon';
			Worldcup.humanCountry = 'Cameroon';
			break;
		case 'Chile':
			Worldcup.activeCountry = 'CHILE';
			Worldcup.activeTwitpicSearch = 'http://search.twitter.com/search.json?q=twitpic+Worldcup&ors=Chile+chi';
			Worldcup.activeYoutubeSearch = 'http://gdata.youtube.com/feeds/videos?max-results=5&start-index=1&vq=World Cup Chile'
			Worldcup.flag = 'Chile';
			Worldcup.humanCountry = 'Chile';
			break;
		case 'Denmark':
			Worldcup.activeCountry = 'DENMARK';
			Worldcup.activeTwitpicSearch = 'http://search.twitter.com/search.json?q=twitpic+Worldcup&ors=Denmark+den';
			Worldcup.activeYoutubeSearch = 'http://gdata.youtube.com/feeds/videos?max-results=5&start-index=1&vq=World Cup Denmark'
			Worldcup.flag = 'Denmark';
			Worldcup.humanCountry = 'Denmark';
			break;
		case 'France':
			Worldcup.activeCountry = 'FRANCE';
			Worldcup.activeTwitpicSearch = 'http://search.twitter.com/search.json?q=twitpic+Worldcup&ors=France+Fra';
			Worldcup.activeYoutubeSearch = 'http://gdata.youtube.com/feeds/videos?max-results=5&start-index=1&vq=World Cup France'
			Worldcup.flag = 'France';
			Worldcup.humanCountry = 'France';
			break;
		case 'Germany':
			Worldcup.activeCountry = 'GERMANY';
			Worldcup.activeTwitpicSearch = 'http://search.twitter.com/search.json?q=twitpic+Worldcup&ors=Germany+ger';
			Worldcup.activeYoutubeSearch = 'http://gdata.youtube.com/feeds/videos?max-results=5&start-index=1&vq=World Cup Germany'
			Worldcup.flag = 'Germany';
			Worldcup.humanCountry = 'Germany';
			break;
		case 'Ghana':
			Worldcup.activeCountry = 'GHANA';
			Worldcup.activeTwitpicSearch = 'http://search.twitter.com/search.json?q=twitpic+Worldcup&ors=Ghana+gha';
			Worldcup.activeYoutubeSearch = 'http://gdata.youtube.com/feeds/videos?max-results=5&start-index=1&vq=World Cup Ghana'
			Worldcup.flag = 'Ghana';
			Worldcup.humanCountry = 'Ghana';
			break;
		case 'Greece':
			Worldcup.activeCountry = 'GREECE';
			Worldcup.activeTwitpicSearch = 'http://search.twitter.com/search.json?q=twitpic+Worldcup&ors=Greece+gre';
			Worldcup.activeYoutubeSearch = 'http://gdata.youtube.com/feeds/videos?max-results=5&start-index=1&vq=World Cup Greece'
			Worldcup.flag = 'Greece';
			Worldcup.humanCountry = 'Greece';
			break;
		case 'Honduras':
			Worldcup.activeCountry = 'HONDURAS';
			Worldcup.activeTwitpicSearch = 'http://search.twitter.com/search.json?q=twitpic+Worldcup&ors=Honduras+hon';
			Worldcup.activeYoutubeSearch = 'http://gdata.youtube.com/feeds/videos?max-results=5&start-index=1&vq=World Cup Honduras'
			Worldcup.flag = 'Honduras';
			Worldcup.humanCountry = 'Honduras';
			break;
		case 'Italy':
			Worldcup.activeCountry = 'ITALY';
			Worldcup.activeTwitpicSearch = 'http://search.twitter.com/search.json?q=twitpic+Worldcup&ors=Italy+ita';
			Worldcup.activeYoutubeSearch = 'http://gdata.youtube.com/feeds/videos?max-results=5&start-index=1&vq=World Cup Italy'
			Worldcup.flag = 'Italy';
			Worldcup.humanCountry = 'Italy';
			break;
		case "C™te d'Ivoire":
		case 'Ivory Coast':
		case 'IvoryCoast':
			Worldcup.activeCountry = 'IVORYCOAST';
			Worldcup.activeTwitpicSearch = 'http://search.twitter.com/search.json?q=twitpic+Worldcup&ors=Ivory+Coast+civ';
			Worldcup.activeYoutubeSearch = 'http://gdata.youtube.com/feeds/videos?max-results=5&start-index=1&vq=World Cup Ivory Coast'
			Worldcup.flag = 'IvoryCoast';
			Worldcup.humanCountry = "C™te d'Ivoire";
			break;
		case 'Japan':
			Worldcup.activeCountry = 'JAPAN';
			Worldcup.activeTwitpicSearch = 'http://search.twitter.com/search.json?q=twitpic+Worldcup&ors=Japan+jpn';
			Worldcup.activeYoutubeSearch = 'http://gdata.youtube.com/feeds/videos?max-results=5&start-index=1&vq=World Cup Japan'
			Worldcup.flag = 'Japan';
			Worldcup.humanCountry = 'Japan';
			break;
		case 'North Korea':
		case 'Korea DPR':
		case "Democratic People's Republic of Korea":
		case "Democratic People's Republic of Korea (DPRK)":
		case "(DPRK)":
		case 'KoreaDPR':
			Worldcup.activeCountry = 'NORTHKOREA';
			Worldcup.activeTwitpicSearch = 'http://search.twitter.com/search.json?q=twitpic+Worldcup&ors=North+Korea+prk';
			Worldcup.activeYoutubeSearch = 'http://gdata.youtube.com/feeds/videos?max-results=5&start-index=1&vq=World Cup North Korea'
			Worldcup.flag = 'North Korea';
			Worldcup.humanCountry = 'Korea DPR';
			break;
		case 'Korea Republic':
		case 'South Korea':
		case 'Republic of Korea':
		case 'Republic of Korea (ROK)':
		case '(ROK)':
		case 'KoreaRepublic':
			Worldcup.activeCountry = 'SOUTHKOREA';
			Worldcup.activeTwitpicSearch = 'http://search.twitter.com/search.json?q=twitpic+Worldcup&ors=South+Korea+kor';
			Worldcup.activeYoutubeSearch = 'http://gdata.youtube.com/feeds/videos?max-results=5&start-index=1&vq=World Cup South Korea'
			Worldcup.flag = 'South Korea';
			Worldcup.humanCountry = 'Korea Republic';
			break;
		case 'Mexico':
			Worldcup.activeCountry = 'MEXICO';
			Worldcup.activeTwitpicSearch = 'http://search.twitter.com/search.json?q=twitpic+Worldcup&ors=Mexico+mex';
			Worldcup.activeYoutubeSearch = 'http://gdata.youtube.com/feeds/videos?max-results=5&start-index=1&vq=World Cup Mexico'
			Worldcup.flag = 'Mexico';
			Worldcup.humanCountry = 'Mexico';
			break;
		case 'Netherlands':
			Worldcup.activeCountry = 'NETHERLANDS';
			Worldcup.activeTwitpicSearch = 'http://search.twitter.com/search.json?q=twitpic+Worldcup&ors=Netherlands+ned';
			Worldcup.activeYoutubeSearch = 'http://gdata.youtube.com/feeds/videos?max-results=5&start-index=1&vq=World Cup Netherlands'
			Worldcup.flag = 'Netherlands';
			Worldcup.humanCountry = 'Netherlands';
			break;
		case 'New Zealand':
		case 'NewZealand':
			Worldcup.activeCountry = 'OTHER';
			Worldcup.activeTwitpicSearch = 'http://search.twitter.com/search.json?q=twitpic+Worldcup&ors=New+Zealand+NewZealand';
			Worldcup.activeYoutubeSearch = 'http://gdata.youtube.com/feeds/videos?max-results=5&start-index=1&vq=World Cup New Zealand'
			Worldcup.flag = 'New Zealand';
			Worldcup.humanCountry = 'New Zealand';
			break;
		case 'Nigeria':
			Worldcup.activeCountry = 'NIGERIA';
			Worldcup.activeTwitpicSearch = 'http://search.twitter.com/search.json?q=twitpic+Worldcup&ors=Nigeria+nga';
			Worldcup.activeYoutubeSearch = 'http://gdata.youtube.com/feeds/videos?max-results=5&start-index=1&vq=World Cup Nigeria'
			Worldcup.flag = 'Nigeria';
			Worldcup.humanCountry = 'Nigeria';
			break;
		case 'Paraguay':
			Worldcup.activeCountry = 'PARAGUAY';
			Worldcup.activeTwitpicSearch = 'http://search.twitter.com/search.json?q=twitpic+Worldcup&ors=Paraguay+par';
			Worldcup.activeYoutubeSearch = 'http://gdata.youtube.com/feeds/videos?max-results=5&start-index=1&vq=World Cup Paraguay'
			Worldcup.flag = 'Paraguay';
			Worldcup.humanCountry = 'Paraguay';
			break;
		case 'Portugal':
			Worldcup.activeCountry = 'PORTUGAL';
			Worldcup.activeTwitpicSearch = 'http://search.twitter.com/search.json?q=twitpic+Worldcup&ors=Portugal+por';
			Worldcup.activeYoutubeSearch = 'http://gdata.youtube.com/feeds/videos?max-results=5&start-index=1&vq=World Cup Portugal'
			Worldcup.flag = 'Portugal';
			Worldcup.humanCountry = 'Portugal';
			break;
		case 'Serbia':
			Worldcup.activeCountry = 'SERBIA';
			Worldcup.activeTwitpicSearch = 'http://search.twitter.com/search.json?q=twitpic+Worldcup&ors=Serbia+srb';
			Worldcup.activeYoutubeSearch = 'http://gdata.youtube.com/feeds/videos?max-results=5&start-index=1&vq=World Cup Serbia'
			Worldcup.flag = 'Serbia(Yugoslavia)';
			Worldcup.humanCountry = 'Serbia';
			break;
		case 'Slovakia':
			Worldcup.activeCountry = 'SLOVAKIA';
			Worldcup.activeTwitpicSearch = 'http://search.twitter.com/search.json?q=twitpic+Worldcup&ors=Slovakia+svk';
			Worldcup.activeYoutubeSearch = 'http://gdata.youtube.com/feeds/videos?max-results=5&start-index=1&vq=World Cup Slovakia'
			Worldcup.flag = 'Slovakia';
			Worldcup.humanCountry = 'Slovakia';
			break;
		case 'Slvenia':
		case 'Slovenia':
			Worldcup.activeCountry = 'SLOVENIA';
			Worldcup.activeTwitpicSearch = 'http://search.twitter.com/search.json?q=twitpic+Worldcup&ors=Slovenia+svn';
			Worldcup.activeYoutubeSearch = 'http://gdata.youtube.com/feeds/videos?max-results=5&start-index=1&vq=World Cup Slovenia'
			Worldcup.flag = 'Slovenia';
			Worldcup.humanCountry = 'Slovenia';
			break;
		case 'South Africa':
		case 'SouthAfrica':
			Worldcup.activeCountry = 'SOUTHAFRICA';
			Worldcup.activeTwitpicSearch = 'http://search.twitter.com/search.json?q=twitpic+Worldcup&ors=South+Africa+rsa';
			Worldcup.activeYoutubeSearch = 'http://gdata.youtube.com/feeds/videos?max-results=5&start-index=1&vq=World Cup South Africa'
			Worldcup.flag = 'South Africa';
			Worldcup.humanCountry = 'South Africa';
			break;
		case 'Spain':
			Worldcup.activeCountry = 'SPAIN';
			Worldcup.activeTwitpicSearch = 'http://search.twitter.com/search.json?q=twitpic+Worldcup&ors=Spain+es+esp';
			Worldcup.activeYoutubeSearch = 'http://gdata.youtube.com/feeds/videos?max-results=5&start-index=1&vq=World Cup Spain'
			Worldcup.flag = 'Spain';
			Worldcup.humanCountry = 'Spain';
			break;
		case 'Switzerland':
			Worldcup.activeCountry = 'SWITZERLAND';
			Worldcup.activeTwitpicSearch = 'http://search.twitter.com/search.json?q=twitpic+Worldcup&ors=Switzerland+sui';
			Worldcup.activeYoutubeSearch = 'http://gdata.youtube.com/feeds/videos?max-results=5&start-index=1&vq=World Cup Switzerland'
			Worldcup.flag = 'Switzerland';
			Worldcup.humanCountry = 'Switzerland';
			break;
		case 'Uruguay':
			Worldcup.activeCountry = 'URUGUAY';
			Worldcup.activeTwitpicSearch = 'http://search.twitter.com/search.json?q=twitpic+Worldcup&ors=Uruguay+uru';
			Worldcup.activeYoutubeSearch = 'http://gdata.youtube.com/feeds/videos?max-results=5&start-index=1&vq=World Cup Uruguay'
			Worldcup.flag = 'Algeria';
			Worldcup.humanCountry = 'Algeria';
			break;
		case 'USA':
		case 'United States of America':
			Worldcup.activeCountry = 'UNITEDSTATES';
			Worldcup.activeTwitpicSearch = 'http://search.twitter.com/search.json?q=twitpic+Worldcup&ors=United+states+America+USA';
			Worldcup.activeYoutubeSearch = 'http://gdata.youtube.com/feeds/videos?max-results=5&start-index=1&vq=World Cup USA'
			Worldcup.flag = 'USA';
			Worldcup.humanCountry = 'USA';
			break;
		default:
			Worldcup.activeCountry = 'OTHER';
			Worldcup.activeTwitpicSearch = 'http://search.twitter.com/search.json?q=twitpic+Worldcup';
			Worldcup.activeYoutubeSearch = 'http://gdata.youtube.com/feeds/videos?max-results=5&start-index=1&vq=World Cup';
			Worldcup.flag = 'NATO';
			Worldcup.humanCountry = 'Everyone';
			break;
		}
		
		// Empty queues
		Worldcup.queue = [];
		Worldcup.players = [];
		Worldcup.playersDetails = [];
		Worldcup.highlights = [];
		Worldcup.highlightsFound = [];
		
		if(Worldcup.oConnection) {
			Worldcup.oConnection.unsubscribe(Worldcup.oSubscription);
		}
		
		Worldcup.oConnection = kwwika.Service.connect();
		Worldcup.oSubscription = Worldcup.oConnection.subscribe("/KWWIKA/TWITTER/SEARCHES/WC2010/"+Worldcup.activeCountry, {
			topicUpdated:function(oSub, mUpdate){ 				
				if(!Worldcup.lang) {
					Worldcup.queue.push(mUpdate);
				} else {
					GoogleDetect(mUpdate);
				}
			}
		});
		
		Worldcup.getHighlights();
		Worldcup.getInstantReplay();
		
		$('now-playing').update(
			'<h3>Now playing.</h3>'
			+ '<dl>'
			+ '<dt><img src="/images/Flags/flags/48/'+Worldcup.flag+'.png" alt="" /></dt>'
			+ '<dd>'
			+ '<h4>'+Worldcup.humanCountry+'</h4>'
			+ '<h5 id="perc"><a href="http://vm.nr.no/indexEng.html" target="_blank">Chance of winning: <strong>'+Chances[Worldcup.humanCountry]+'</strong></a></h5>'
			+ '</dd>'
			+ '</dl>'
		);
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
		
		if(mapOn && map) {
			if(!tweet.GeoLat.blank() && tweet.GeoLat != "=" && !tweet.GeoLong.blank() && tweet.GeoLong != "=") {
				var point = new GLatLng(tweet.GeoLat, tweet.GeoLong);
				map.setCenter(point, 13);
				map.addOverlay(new GMarker(point));
			}
		}
		
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
	
	fetchfeeds:function() {
		var url = "/commentary.php";
		new Ajax.Request(url, { method:'get', onComplete: function(r) {
			var data = r.responseText.evalJSON(true);
			if(data.length > 1) {
				Worldcup.feedItems = data;
				Worldcup.feedNext();
			} else {
				$('#commentary').update('<h3>Commentary.</h3><p>'+data.error+'</p>');
			}
		}});
	},
	
	feedNext:function() {
		var curItem = Worldcup.feedItems.shift();
		$('commentary').update(
			'<h3>Commentary.</h3>'
			+ '<h4><a href="'+curItem.url+'">'+curItem.title+'</a></h4>'
			+' <p><a href="'+curItem.url+'">'+curItem.desc.substr(0,200)+'</a></p>');
			
		$$('#commentary p')[0].setOpacity(0);
		$$('#commentary h4')[0].setOpacity(0);
		
		$$('#commentary p')[0].morph("opacity:1", {duration:0.8});
		$$('#commentary h4')[0].morph("opacity:1", {duration:0.8});
		
		
		Worldcup.feedItems.push(curItem);
		
		setTimeout("Worldcup.feedNext()", 12000);
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

/*
AwayTeam: "Germany"
AwayTeamAccurateBackZonePass: "102"
AwayTeamAccurateChippedPass: "15"
AwayTeamAccurateCornersIntobox: "1"
AwayTeamAccurateCross: "2"
AwayTeamAccurateFlickOn: "2"
AwayTeamAccurateFwdZonePass: "200"
AwayTeamAccurateGoalKicks: "2"
AwayTeamAccurateKeeperThrows: "6"
AwayTeamAccurateLayoffs: "12"
AwayTeamAccurateLongBalls: "22"
AwayTeamAccuratePass: "300"
AwayTeamAccurateThroughBall: "1"
AwayTeamAccurateThrows: "7"
AwayTeamAerialLost: "4"
AwayTeamAerialWon: "5"
AwayTeamAttAssistOpenplay: "10"
AwayTeamAttAssistSetplay: "1"
AwayTeamAttBxCentre: "4"
AwayTeamAttHdMiss: "2"
AwayTeamAttHdTotal: "1"
AwayTeamAttIboxMiss: "1"
AwayTeamAttIboxTarget: "1"
AwayTeamAttLgCentre: "1"
AwayTeamAttMissHigh: "1"
AwayTeamAttMissHighLeft: "2"
AwayTeamAttMissHighRight: "1"
AwayTeamAttMissLeft: "1"
AwayTeamAttOboxBlocked: "5"
AwayTeamAttOboxGoal: "1"
AwayTeamAttOboxTarget: "1"
AwayTeamAttObxCentre: "11"
AwayTeamAttRfGoal: "2"
AwayTeamAttRfMiss: "2"
AwayTeamAttRfTarget: "1"
AwayTeamAttRfTotal: "11"
AwayTeamAttSbxCentre: "2"
AwayTeamAttSetpiece: "2"
AwayTeamAttSvHighCentre: "1"
AwayTeamAttSvLowCentre: "1"
AwayTeamAttSvLowRight: "1"
AwayTeamAttemptsConcededObox: "13"
AwayTeamBallRecovery: "47"
AwayTeamBlockedScoringAtt: "6"
AwayTeamChallengeLost: "14"
AwayTeamCrosses18yard: "8"
AwayTeamCrosses18yardplus: "3"
AwayTeamDuelLost: "47"
AwayTeamDuelWon: "66"
AwayTeamEffectiveClearance: "11"
AwayTeamEffectiveHeadClearance: "3"
AwayTeamFinalThirdEntries: "57"
AwayTeamFirstHalfGoals: "1"
AwayTeamFkFoulLost: "14"
AwayTeamFkFoulWon: "18"
AwayTeamFormationUsed: "4231"
AwayTeamForwardGoals: "3"
AwayTeamGoalAssist: "4"
AwayTeamGoalAssistIntentional: "4"
AwayTeamGoalAssistOpenplay: "3"
AwayTeamGoalKicks: "12"
AwayTeamGoals: "4"
AwayTeamGoalsConceded: "2"
AwayTeamGoalsConcededObox: "1"
AwayTeamHeadClearance: "11"
AwayTeamInterception: "27"
AwayTeamKeeperThrows: "6"
AwayTeamLongPassOwnToOpp: "64"
AwayTeamLongPassOwnToOppSuccess: "31"
AwayTeamLostCorners: "5"
AwayTeamOfftargetAttAssist: "5"
AwayTeamOntargetAttAssist: "9"
AwayTeamOntargetScoringAtt: "6"
AwayTeamOutfielderBlock: "6"
AwayTeamPassesLeft: "53"
AwayTeamPassesRight: "54"
AwayTeamPossessionPercentage: "45.5"
AwayTeamSavedObox: "3"
AwayTeamScore: "4"
AwayTeamShieldBallOop: "1"
AwayTeamShotOffTarget: "6"
AwayTeamSubsMade: "3"
AwayTeamTotalAttAssist: "14"
AwayTeamTotalBackZonePass: "125"
AwayTeamTotalChippedPass: "24"
AwayTeamTotalClearance: "22"
AwayTeamTotalContest: "17"
AwayTeamTotalCornersIntobox: "3"
AwayTeamTotalCross: "16"
AwayTeamTotalCrossNocorner: "13"
AwayTeamTotalFlickOn: "3"
AwayTeamTotalFwdZonePass: "267"
AwayTeamTotalLaunches: "16"
AwayTeamTotalLayoffs: "13"
AwayTeamTotalLongBalls: "34"
AwayTeamTotalPass: "376"
AwayTeamTotalScoringAtt: "18"
AwayTeamTotalTackle: "33"
AwayTeamTotalThroughBall: "2"
AwayTeamTotalThrows: "9"
AwayTeamTotalYelCard: "1"
AwayTeamTouches: "639"
AwayTeamWonCorners: "4"
AwayTeamWonTackle: "25"
HomeTeam: "Argentina"
HomeTeamAccurateBackZonePass: "171"
HomeTeamAccurateChippedPass: "7"
HomeTeamAccurateCornersIntobox: "1"
HomeTeamAccurateCross: "4"
HomeTeamAccurateFlickOn: "4"
HomeTeamAccurateFwdZonePass: "219"
HomeTeamAccurateGoalKicks: "5"
HomeTeamAccurateKeeperThrows: "7"
HomeTeamAccurateLayoffs: "12"
HomeTeamAccurateLongBalls: "18"
HomeTeamAccuratePass: "386"
HomeTeamAccurateThroughBall: "2"
HomeTeamAccurateThrows: "22"
HomeTeamAerialLost: "5"
HomeTeamAerialWon: "4"
HomeTeamAttAssistOpenplay: "16"
HomeTeamAttAssistSetplay: "1"
HomeTeamAttBxCentre: "1"
HomeTeamAttGoalHighLeft: "2"
HomeTeamAttHdMiss: "1"
HomeTeamAttHdTotal: "1"
HomeTeamAttIboxMiss: "1"
HomeTeamAttIboxTarget: "4"
HomeTeamAttLgCentre: "1"
HomeTeamAttMissHigh: "1"
HomeTeamAttMissHighLeft: "1"
HomeTeamAttMissHighRight: "2"
HomeTeamAttMissLeft: "1"
HomeTeamAttOboxBlocked: "4"
HomeTeamAttOboxGoal: "1"
HomeTeamAttOboxTarget: "3"
HomeTeamAttObxCentre: "13"
HomeTeamAttRfGoal: "1"
HomeTeamAttRfMiss: "2"
HomeTeamAttRfTarget: "1"
HomeTeamAttRfTotal: "4"
HomeTeamAttSbxCentre: "1"
HomeTeamAttSetpiece: "1"
HomeTeamAttSvHighCentre: "3"
HomeTeamAttSvLowCentre: "4"
HomeTeamAttSvLowRight: "3"
HomeTeamAttemptsConcededObox: "11"
HomeTeamBallRecovery: "44"
HomeTeamBlockedScoringAtt: "6"
HomeTeamChallengeLost: "10"
HomeTeamCrosses18yard: "11"
HomeTeamCrosses18yardplus: "4"
HomeTeamDuelLost: "66"
HomeTeamDuelWon: "47"
HomeTeamEffectiveClearance: "7"
HomeTeamEffectiveHeadClearance: "3"
HomeTeamFinalThirdEntries: "46"
HomeTeamFkFoulLost: "20"
HomeTeamFkFoulWon: "13"
HomeTeamFormationUsed: "41212"
HomeTeamForwardGoals: "1"
HomeTeamGoalAssist: "2"
HomeTeamGoalAssistIntentional: "1"
HomeTeamGoalAssistOpenplay: "2"
HomeTeamGoalKicks: "8"
HomeTeamGoals: "2"
HomeTeamGoalsConceded: "4"
HomeTeamGoalsConcededObox: "1"
HomeTeamHeadClearance: "8"
HomeTeamInterception: "20"
HomeTeamKeeperThrows: "7"
HomeTeamLongPassOwnToOpp: "58"
HomeTeamLongPassOwnToOppSuccess: "40"
HomeTeamLostCorners: "4"
HomeTeamOfftargetAttAssist: "5"
HomeTeamOntargetAttAssist: "11"
HomeTeamOntargetScoringAtt: "7"
HomeTeamOutfielderBlock: "6"
HomeTeamPassesLeft: "58"
HomeTeamPassesRight: "69"
HomeTeamPossessionPercentage: "54.5"
HomeTeamSavedObox: "1"
HomeTeamScore: "0"
HomeTeamShieldBallOop: "1"
HomeTeamShotOffTarget: "7"
HomeTeamSubsMade: "2"
HomeTeamTotalAttAssist: "16"
HomeTeamTotalBackZonePass: "186"
HomeTeamTotalChippedPass: "18"
HomeTeamTotalClearance: "16"
HomeTeamTotalContest: "27"
HomeTeamTotalCornersIntobox: "4"
HomeTeamTotalCross: "19"
HomeTeamTotalCrossNocorner: "15"
HomeTeamTotalFlickOn: "3"
HomeTeamTotalFwdZonePass: "284"
HomeTeamTotalLaunches: "3"
HomeTeamTotalLayoffs: "14"
HomeTeamTotalLongBalls: "25"
HomeTeamTotalPass: "451"
HomeTeamTotalScoringAtt: "20"
HomeTeamTotalTackle: "16"
HomeTeamTotalThroughBall: "5"
HomeTeamTotalThrows: "24"
HomeTeamTotalYelCard: "2"
HomeTeamTouches: "716"
HomeTeamWonCorners: "5"
HomeTeamWonTackle: "10"
MatchAttendance: "64100"
MatchDate: "20100703T150000+0100"
MatchPeriod: "FullTime"
MatchTime: "92"
MatchType: "Cup"
MatchWinner: "Germany"
Referee: "Ravshan Irmatov"
ResultType: "NormalResult"
Venue: "Green Point Stadium"
*/

var GoalCheck={
	HomeTeam: false,
	HomeScore: false,
	
	AwayTeam: false,
	AwayScore: false,
	
	goal: false,
	
	oConnection:false,
	oSubscription:false,
		
	init:function() {
		/* Goal image is on page but display:none
		*  Some browsers download some don't.
		*  Lets force download, just incase */
		var i = new Image();
		i.src = "/images/GOAL.png";
	
		GoalCheck.liveMatch("/OPTA/WC2010/TEAMLIVE");
	},
	
	liveMatch:function(feed) {
		// Check if either ain't showing fulltime
		GoalCheck.oConnection = kwwika.Service.connect();
		GoalCheck.oSubscription = GoalCheck.oConnection.subscribe(feed, {
			topicUpdated:function(oSub, mUpdate){ 				
				if(mUpdate.MatchPeriod == "FullTime") {
					GoalCheck.HomeTeam = mUpdate.HomeTeam;
					GoalCheck.HomeScore = mUpdate.HomeTeamScore;
				
					GoalCheck.AwayTeam = mUpdate.AwayTeam;
					GoalCheck.AwayScore = mUpdate.AwayTeamScore;
					
					console.log(GoalCheck.HomeTeam + " vs " + GoalCheck.AwayTeam + " " + mUpdate.MatchPeriod + " score is " + GoalCheck.HomeScore + " - " + GoalCheck.AwayScore);
					GoalCheck.oConnection.unsubscribe(GoalCheck.oSubscription);
					GoalCheck.liveMatch("/OPTA/WC2010/TEAMLIVE2");
				} else {
					GoalCheck.subscribeTo(feed);
				}
			}
		});
	},
	
	subscribeTo:function(feed) {
		if(GoalCheck.oConnection) {
			GoalCheck.oConnection.unsubscribe(GoalCheck.oSubscription);
		}
		
		var oConnection = kwwika.Service.connect();
		var oSubscription = oConnection.subscribe(feed, {
			topicUpdated:function(oSub, d){
				// new Home Goal
				if(d.HomeTeamScore > 0 && d.HomeTeamScore != GoalCheck.HomeScore && !GoalCheck.goal && GoalCheck.HomeScore !== false) {
					GoalCheck.goal = true; // stop it playing twice
					$('NewGoal').removeClassName('hide');
					$$('#NewGoal img')[0].morph("width:1000px; left: -500px", {duration:0.8, transition:'bouncePast', after:function() {
						$$('#NewGoal img')[0].morph("width:0px; opacity: 0; left: 0;", {duration:0.8, transition:'easeTo', delay:3, after:function() {
							$('NewGoal').addClassName('hide');
							GoalCheck.goal = false;
							$$('#NewGoal img')[0].setStyle({
								width: '400px',
								left: '-200px',
								opacity: 1
							});
						}})
					}});
				}
				
				// new Away Goal
				if(d.AwayTeamScore > 0 && d.AwayTeamScore != GoalCheck.AwayScore && !GoalCheck.goal && GoalCheck.AwayScore !== false) {
					GoalCheck.goal = true; // stop it playing twice
					$('NewGoal').removeClassName('hide');
					$$('#NewGoal img')[0].morph("width:1000px; left: -500px", {duration:0.8, transition:'bouncePast', after:function() {
						$$('#NewGoal img')[0].morph("width:0px; opacity: 0; left: 0;", {duration:0.8, transition:'easeTo', delay:3, after:function() {
							$('NewGoal').addClassName('hide');
							GoalCheck.goal = false;
							$$('#NewGoal img')[0].setStyle({
								width: '400px',
								left: '-200px',
								opacity: 1
							});
						}})
					}});
				}
			
				GoalCheck.HomeTeam = d.HomeTeam;
				GoalCheck.HomeScore = d.HomeTeamScore;
				
				GoalCheck.AwayTeam = d.AwayTeam;
				GoalCheck.AwayScore = d.AwayTeamScore;
				
				// Can we find the team's flag?
				if($$('#flags a[href=#'+GoalCheck.HomeTeam+']').length > 0) {
					$$('#flags a[href=#'+GoalCheck.HomeTeam+']+span')[0].removeClassName('hide');
					$$('#flags a[href=#'+GoalCheck.HomeTeam+']+span')[0].update(GoalCheck.HomeScore);
				}
				if($$('#flags a[href=#'+GoalCheck.AwayTeam+']').length > 0) {
					$$('#flags a[href=#'+GoalCheck.AwayTeam+']+span')[0].removeClassName('hide');
					$$('#flags a[href=#'+GoalCheck.AwayTeam+']+span')[0].update(GoalCheck.AwayScore);
				}
			},
			topicError:function(oSub, sError){ return; }
		});
	}
}


var OptaSports={
	queue: [],
	visible: false,
	
	init:function() {
		var oConnection = kwwika.Service.connect();
		var oSubscription = oConnection.subscribe("/OPTA/WC2010/NEXTGAME", {
			topicUpdated:function(oSub, mUpdate){
				OptaSports.queue.push(mUpdate);
			},
			topicError:function(oSub, sError){ return; }
		});
		
		var oConnection2 = kwwika.Service.connect();
		var oSubscription2 = oConnection.subscribe("/OPTA/WC2010/NEXTGAME2", {
			topicUpdated:function(oSub, mUpdate){
				OptaSports.queue.push(mUpdate);
			},
			topicError:function(oSub, sError){ return; }
		});
		
		new PeriodicalExecuter(function(pe) {
			OptaSports.next();
		}, 12);
		
		OptaSports.next();
	},
	
	next:function() {
		if(OptaSports.queue.length >= 1) {
			var d = OptaSports.queue.shift();
			OptaSports.queue.push(d);
			
			if(d.HomeTeam != undefined && d.AwayTeam != undefined && d.MatchDate != undefined) {
				$('opta').update(
					'<p><b>next fixtures</b> : <i>'+d.HomeTeam+' vs '+d.AwayTeam+' - '+ d.MatchDate +'</i></p>'
				);
				
				$$('#opta i')[0].setOpacity(0);
				$$('#opta i')[0].morph("opacity:1", {duration:0.8});
			}
		}
	}
}

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
	OptaSports.init();
	GoalCheck.init();
});

google.load("language", "1");
var googleAPILoaded = false;

function GoogleAPIinitialize() {
	googleAPILoaded = true;
}
 
function GoogleDetect(tweet) {
  if(!googleAPILoaded) return;
  
  google.language.detect(tweet.Text, function(result) {
    if (!result.error) {
      var language = 'unknown';
      for (l in google.language.Languages) {
        if (google.language.Languages[l] == result.language) {
          language = l;
          if(Worldcup.lang.toUpperCase() == language.toUpperCase()) {
          	Worldcup.queue.push(tweet);
          } else {
          	//console.log('Language mis-match. You want '+Worldcup.lang+' tweet is in '+language);
          }
          break;
        }
      }
    }
  });
}
google.setOnLoadCallback(GoogleAPIinitialize);

MapLat = 37.4419;
MapLong = -122.1419;

var mapOn = false;
var map = false;
function TurnOnMap() {
	mapOn = true;

	$('map').setStyle({
		width: screen.width+"px",
		height: screen.height+"px",
		position:'absolute'
	});
	
	$('main-wrapper').setStyle({position:'absolute'});
	
	map = new GMap2(document.getElementById("map"));
	map.setCenter(new GLatLng(MapLat, MapLong), 13);
}