<!DOCTYPE html>
<html dir="ltr" lang="en-US">
<head>

<meta charset=utf-8>

<title>World Cup mash. Powered by Kwwika (sponsored by TellyLinks).</title>

<meta name="rating" content="General" />
<meta name="distribution" content="Global" />

<meta name="googlebot" content="index,follow" />
<meta name="robots" content="all,index,follow" />
<meta name="msnbot" content="all,index,follow" />

<meta name="resource-type" content="document" />
<meta name="revisit-after" content="10 Days" />

<!--[if IE]>
<script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
<![endif]-->

<script type="text/javascript" src="http://use.typekit.com/yml0bex.js"></script>
<script type="text/javascript">try{Typekit.load();}catch(e){}</script>

<link rel="stylesheet" type="text/css" media="screen" href="/styles/HTML5.css" />
<link rel="stylesheet" type="text/css" media="screen" href="/styles/worldcup.css" />
<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />

</head>
<body>

<!--
                             _                        _   _                          
                            | |                      | | | |                         
  __ _  __ _ _ __ ___  _ __ | |__   __ _ ___ ___  ___| |_| |_    ___  ___  _ __ ___  
 / _` |/ _` | '__/ _ \| '_ \| '_ \ / _` / __/ __|/ _ \ __| __|  / __|/ _ \| '_ ` _ \ 
| (_| | (_| | | | (_) | | | | |_) | (_| \__ \__ \  __/ |_| |_ _| (__| (_) | | | | | |
 \__,_|\__,_|_|  \___/|_| |_|_.__/ \__,_|___/___/\___|\__|\__(_)\___|\___/|_| |_| |_|
                                                                                     
 I build sites, and my code is pretty.
 
 
-->

<div id='map'></div>

<div id='main-wrapper'>
	<div id='flags' class="clearfix">
		<ul>
			<li><a href="#Algeria"><img src="/images/Flags/flags/32/Algeria.png" alt="" /></a><span class="hide"></span></li>
			<li><a href="#Argentina"><img src="/images/Flags/flags/32/Argentina.png" alt="" /></a><span class="hide"></span></li>
			<li><a href="#Australia"><img src="/images/Flags/flags/32/Australia.png" alt="" /></a><span class="hide"></span></li>
			<li><a href="#Brazil"><img src="/images/Flags/flags/32/Brazil.png" alt="" /></a><span class="hide"></span></li>
			<li><a href="#Cameroon"><img src="/images/Flags/flags/32/Cameroon.png" alt="" /></a><span class="hide"></span></li>
			<li><a href="#Chile"><img src="/images/Flags/flags/32/Chile.png" alt="" /></a><span class="hide"></span></li>
			<li><a href="#Denmark"><img src="/images/Flags/flags/32/Denmark.png" alt="" /></a><span class="hide"></span></li>
			<li><a href="#England"><img src="/images/Flags/flags/32/England.png" alt="" /></a><span class="hide"></span></li>
			<li><a href="#France"><img src="/images/Flags/flags/32/France.png" alt="" /></a><span class="hide"></span></li>
			<li><a href="#Germany"><img src="/images/Flags/flags/32/Germany.png" alt="" /></a><span class="hide"></span></li>
			<li><a href="#Ghana"><img src="/images/Flags/flags/32/Ghana.png" alt="" /></a><span class="hide"></span></li>
			<li><a href="#Greece"><img src="/images/Flags/flags/32/Greece.png" alt="" /></a><span class="hide"></span></li>
			<li><a href="#Honduras"><img src="/images/Flags/flags/32/Honduras.png" alt="" /></a><span class="hide"></span></li>
			<li><a href="#Italy"><img src="/images/Flags/flags/32/Italy.png" alt="" /></a><span class="hide"></span></li>
			<li><a href="#IvoryCoast"><img src="/images/Flags/flags/32/IvoryCoast.png" alt="" /></a><span class="hide"></span></li>
			<li><a href="#Japan"><img src="/images/Flags/flags/32/Japan.png" alt="" /></a><span class="hide"></span></li>
			<li><a href="#KoreaDPR"><img src="/images/Flags/flags/32/North Korea.png" alt="" /></a><span class="hide"></span></li>
			<li><a href="#KoreaRepublic"><img src="/images/Flags/flags/32/South Korea.png" alt="" /></a><span class="hide"></span></li>
			<li><a href="#Mexico"><img src="/images/Flags/flags/32/Mexico.png" alt="" /></a><span class="hide"></span></li>
			<li><a href="#Netherlands"><img src="/images/Flags/flags/32/Netherlands.png" alt="" /></a><span class="hide"></span></li>
			<li><a href="#NewZealand"><img src="/images/Flags/flags/32/New Zealand.png" alt="" /></a><span class="hide"></span></li>
			<li><a href="#Nigeria"><img src="/images/Flags/flags/32/Nigeria.png" alt="" /></a><span class="hide"></span></li>
			<li><a href="#Paraguay"><img src="/images/Flags/flags/32/Paraguay.png" alt="" /></a><span class="hide"></span></li>
			<li><a href="#Portugal"><img src="/images/Flags/flags/32/Portugal.png" alt="" /></a><span class="hide"></span></li>
			<li><a href="#Serbia"><img src="/images/Flags/flags/32/Serbia(Yugoslavia).png" alt="" /></a><span class="hide"></span></li>
			<li><a href="#Slovakia"><img src="/images/Flags/flags/32/Slovakia.png" alt="" /></a><span class="hide"></span></li>
			<li><a href="#Slovenia"><img src="/images/Flags/flags/32/Slovenia.png" alt="" /></a><span class="hide"></span></li>
			<li><a href="#SouthAfrica"><img src="/images/Flags/flags/32/South Africa.png" alt="" /></a><span class="hide"></span></li>
			<li><a href="#Spain"><img src="/images/Flags/flags/32/Spain.png" alt="" /></a><span class="hide"></span></li>
			<li><a href="#Switzerland"><img src="/images/Flags/flags/32/Switzerland.png" alt="" /></a><span class="hide"></span></li>
			<li><a href="#Uruguay"><img src="/images/Flags/flags/32/Uruguay.png" alt="" /></a><span class="hide"></span></li>
			<li><a href="#USA"><img src="/images/Flags/flags/32/USA.png" alt="" /></a><span class="hide"></span></li>
		</ul>
	</div> <!-- END: #flags -->
	
	<form id='lang-form'>
		<select id='lang'>
			<option value='ALL'>Show tweets in all Languages</option>
			<option value='Afrikaans'>Afrikaans</option>
			<option value='Albanian'>Albanian</option>
			<option value='Amharic'>Amharic</option>
			<option value='Arabic'>Arabic</option>
			<option value='Armenian'>Armenian</option>
			<option value='Azerbaijani'>Azerbaijani</option>
			<option value='Basque'>Basque</option>
			<option value='Belarusian'>Belarusian</option>
			<option value='Bengali'>Bengali</option>
			<option value='Bihari'>Bihari</option>
			<option value='Breton'>Breton</option>
			<option value='Bulgarian'>Bulgarian</option>
			<option value='Burmese'>Burmese</option>
			<option value='Catalan'>Catalan</option>
			<option value='Cherokee'>Cherokee</option>
			<option value='Chinese Simplified'>Chinese (Simplified)</option>
			<option value='Chinese Traditional'>Chinese (Traditional)</option>
			<option value='Corsican'>Corsican</option>
			<option value='Croatian'>Croatian</option>
			<option value='Czech'>Czech</option>
			<option value='Danish'>Danish</option>
			<option value='Dhivehi'>Dhivehi</option>
			<option value='Dutch'>Dutch</option>
			<option value='English'>English</option>
			<option value='Esperanto'>Esperanto</option>
			<option value='Estonian'>Estonian</option>
			<option value='Faroese'>Faroese</option>
			<option value='Filipino'>Filipino</option>
			<option value='Finnish'>Finnish</option>
			<option value='French'>French</option>
			<option value='Frisian'>Frisian</option>
			<option value='Galician'>Galician</option>
			<option value='Georgian'>Georgian</option>
			<option value='German'>German</option>
			<option value='Greek'>Greek</option>
			<option value='Gujarati'>Gujarati</option>
			<option value='Haitian Creole'>Haitian Creole</option>
			<option value='Hebrew'>Hebrew</option>
			<option value='Hindi'>Hindi</option>
			<option value='Hungarian'>Hungarian</option>
			<option value='Icelandic'>Icelandic</option>
			<option value='Indonesian'>Indonesian</option>
			<option value='Inuktitut'>Inuktitut</option>
			<option value='Irish'>Irish</option>
			<option value='Italian'>Italian</option>
			<option value='Japanese'>Japanese</option>
			<option value='Javanese'>Javanese</option>
			<option value='Kannada'>Kannada</option>
			<option value='Kazakh'>Kazakh</option>
			<option value='Khmer'>Khmer</option>
			<option value='Korean'>Korean</option>
			<option value='Kurdish'>Kurdish</option>
			<option value='Kyrgyz'>Kyrgyz</option>
			<option value='Lao'>Lao</option>
			<option value='Latin'>Latin</option>
			<option value='Latvian'>Latvian</option>
			<option value='Lithuanian'>Lithuanian</option>
			<option value='Luxembourgish'>Luxembourgish</option>
			<option value='Macedonian'>Macedonian</option>
			<option value='Malay'>Malay</option>
			<option value='Malayalam'>Malayalam</option>
			<option value='Maltese'>Maltese</option>
			<option value='Maori'>Maori</option>
			<option value='Marathi'>Marathi</option>
			<option value='Mongolian'>Mongolian</option>
			<option value='Nepali'>Nepali</option>
			<option value='Norwegian'>Norwegian</option>
			<option value='Occitan'>Occitan</option>
			<option value='Oriya'>Oriya</option>
			<option value='Pashto'>Pashto</option>
			<option value='Persian'>Persian</option>
			<option value='Polish'>Polish</option>
			<option value='Portuguese'>Portuguese</option>
			<option value='Punjabi'>Punjabi</option>
			<option value='Quechua'>Quechua</option>
			<option value='Romanian'>Romanian</option>
			<option value='Russian'>Russian</option>
			<option value='Sanskrit'>Sanskrit</option>
			<option value='Scots Gaelic'>Scots Gaelic</option>
			<option value='Serbian'>Serbian</option>
			<option value='Sindhi'>Sindhi</option>
			<option value='Sinhalese'>Sinhalese</option>
			<option value='Slovak'>Slovak</option>
			<option value='Slovenian'>Slovenian</option>
			<option value='Spanish'>Spanish</option>
			<option value='Swahili'>Swahili</option>
			<option value='Swedish'>Swedish</option>
			<option value='Sundanese'>Sundanese</option>
			<option value='Syriac'>Syriac</option>
			<option value='Tajik'>Tajik</option>
			<option value='Tamil'>Tamil</option>
			<option value='Tatar'>Tatar</option>
			<option value='Telugu'>Telugu</option>
			<option value='Thai'>Thai</option>
			<option value='Tibetan'>Tibetan</option>
			<option value='Tonga'>Tonga</option>
			<option value='Turkish'>Turkish</option>
			<option value='Ukrainian'>Ukrainian</option>
			<option value='Urdu'>Urdu</option>
			<option value='Uzbek'>Uzbek</option>
			<option value='Uighur'>Uighur</option>
			<option value='Vietnamese'>Vietnamese</option>
			<option value='Welsh'>Welsh</option>
			<option value='Yiddish'>Yiddish</option>
			<option value='Yoruba'>Yoruba</option>
		</select>
		
		<a href='#' id='MapLink'>Enable Map Display?</a>
	</form>
	
	<div id='opta'>
		<p><b>next fixtures</b> : <i><small>loading...</small></i></p>
	</div>
	
	<header>
		<hgroup>
			<h1>World Cup Mash</h1>
			<h2><a href='http://kwwika.com/'>Powered by Kwwika</a>, 
			<a href='http://tellylinks.com/'>Sponsored by TellyLinks.com</a></h2>
		</hgroup>
	</header>
	
	<div id='wrapper'>
		<div id='info'>
			<div id="now-playing">
				<h3>Now playing.</h3>
			</div>
			
			<div id='team'>
				<h3>The team.</h3>
				<ul>
					
				</ul>
			</div>
			
			<div id='highlights'>
				<h3>Highlights.</h3>
				<ul>
					
				</ul>
			</div>
			
			<div>
				<h3>Instant replay.</h3>
				<div id='replay-video'></div>
			</div>
			
			<div id='commentary'>
				<h3>Commentary.</h3>
			</div>
		</div> <!-- END: #info -->
		
		<div id='tweets'>
			<ul>
				
			</ul>
		</div> <!-- END: #tweets -->
	</div> <!-- END: #wrapper -->
	
	<footer>
		<p>Built by <a href='http://aaronbassett.com'>Aaron Bassett</a>. 
		Powered by <a href='http://kwwika.com/'>Kwwika</a>, 
		<a href='http://tellylinks.com/'>sponsored by TellyLinks.com</a>. 
		Read the <a href='http://aaronbassett.tumblr.com/post/750840518/a-colophon-of-world-cup-entry' target="_blank">colophon for all the gory details.</a></p>
	</footer>
	
	<a id='tweetlink' target='_blank' href='http://twitter.com/home?status=AWESOME+%3A%29+Live+streaming+%23WorldCup+app+from+%40aaronbassett+and+%40kwwika.+Check+it+out%21+http%3A%2F%2Fbit.ly%2Fwccomp'>
		<img src='/images/twitter.png' alt='Share this on Twitter' />
	</a>

</div>

<figure id="NewGoal" class="hide">
	<img src="/images/GOAL.png" alt="" />
</figure>

<script type="text/javascript" src="http://api.kwwika.com/latest/"></script>
<script type="text/javascript" src="/js/yqlgeo.js"></script>
<script type="text/javascript" src="http://www.google.com/jsapi"></script>
<script src="http://maps.google.com/maps?file=api&amp;v=2&amp;sensor=false&amp;key=ABQIAAAAsqqbEkxZVbQW3Zu5vospYBTyVRo1s37xKwjrEyJXOrfxvvfVRRRrOOyZhTlIKP_yGXfhOahvXQcaDg" type="text/javascript"></script>
<script type="text/javascript" src="/js/prototype.s2.min.js"></script>
<script type="text/javascript" src="/js/Url.Parse.js"></script>
<script type="text/javascript" src="/js/soundmanager2-nodebug-jsmin.js"></script>
<script type="text/javascript" src="/js/chances.js"></script>
<script type="text/javascript" src="/js/worldcup.js"></script>



<!-- 
	I can haz iPad now? 
	And a little something extra for those who viewed-source.
	Give the Konami code a try.
	 
	Up, Up, Down, Down, Left, Right, Left, Right, B, A, Enter
-->

<script type="text/javascript" src="http://konami-js.googlecode.com/svn/trunk/konami.js" defer async></script> 
<script type="text/javascript" src="/js/fifa.js" defer async></script>

<script type="text/javascript">

  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-6492569-8']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();

</script>

</body>
</html>