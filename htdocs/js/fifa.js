function GOOOOOOAAAAALLLLL() {
	var vidEmbed = '<object type="application/x-shockwave-flash" data="http://www.youtube.com/v/0ZhysyhUL9k&autoplay=1" width="480" height="385">';
	vidEmbed += '<param name="movie" value="http://www.youtube.com/v/0ZhysyhUL9k&autoplay=1" />';
	vidEmbed += '<param name="wmode" value="transparent">';
	vidEmbed += '</object>';
	
	var d=document.createElement('div');
	d.id = "KonamiOverlay";
	document.body.appendChild(d);
	$(d).update(vidEmbed);
	
	document.body.observe('click', function() {
		$('KonamiOverlay').remove();
		document.body.stopObserving('click');
	})
	
}
konami = new Konami()
konami.code = GOOOOOOAAAAALLLLL;
konami.load();