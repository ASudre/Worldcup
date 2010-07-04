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
		
		if(countryFragment.toUpperCase() == "OTHER" || $$('a[href=#'+countryFragment+']').length > 0) {
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