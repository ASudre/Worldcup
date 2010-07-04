<?php

require_once("../feeds/simplepie.inc.php");
require_once("../feeds/JSON.php");

$feed = new SimplePie();
$feed->set_feed_url(array(
	'http://newsrss.bbc.co.uk/rss/sportonline_uk_edition/football/world_cup_2010/rss.xml',
	'http://www.guardian.co.uk/football/worldcup2010/rss',
	'http://www.fifa.com/worldcup/news/rss.xml',
	'http://www.fifa.com/worldcup/news/interviews.xml',
	'http://www.worldcup2010southafrica.com/rss.feed',
	'http://www.world-cup-news.com/rssfeed.aspx',
	'http://feeds.feedburner.com/worldcupbuzz'
));
$feed->set_cache_location('/home/aaronbassett/worldcup.aaronbassett.com/Worldcup/feeds/cache');
$feed->init();
$feed->handle_content_type();


if(!$feed->error) {
	$items = $feed->get_items();
	$response = array();
	$x = 0;
	
	
	foreach($items as $item) {
		$response[$x]['title'] = $item->get_title();
		$response[$x]['url']   = $item->get_permalink();
		$response[$x]['desc']  = $item->get_content();
		
		$x++;
	}
	
	shuffle($response);
	
	$json = new Services_JSON();
	$output = $json->encode($response);
	print($output);

} else {
	$json = new Services_JSON();
	$response = array();
	$response['error'] = $feed->error();
	
	$output = $json->encode($response);
	print($output);
}
