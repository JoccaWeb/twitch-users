// jQuery
$(document).ready (function() {	
	
	$('#off').click(function() {
		// alert('Click handler for off button called')
		$('#onlineData').hide()
		$('#offlineData').show()
		$('#nonExData').show()
	})
	
	$('#all').click(function() {
		$('#onlineData').show()
		$('#offlineData').show()
		$('#nonExData').show()
	})
	
	$('#on').click(function() {
		$('#offlineData').hide()
		$('#onlineData').show()
		$('#nonExData').hide()
	})
	
	var channelList = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "aNonExistingChannel", "Markiplier", "anotherNonExistingChannel"]	

	$.each(channelList, function(i, val) {		
		
	// Check streams of users in channelList array to see who is online and offline, then divide in online, offline and non-existing
	$.getJSON('https://wind-bow.glitch.me/twitch-api/streams/' + val, function(st) {
			// see the JSON data by filling in the complete url in an extra browsertab to have an overview of the parameters
			
			// Check channels with no streams
			if (st.stream == null) {
				
				$.getJSON('https://wind-bow.glitch.me/twitch-api/channels/' + val, function (ch) {
					
					if (ch.status == '404') {
						
						// no user, so channel offline anyway, no picture
						$('#nonExData').append(
							'<div class="row"><div class="col-xs-2">' +
							'<img class="img-thumbnail img-circle" width="75px" src="https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg">' + 
							'</div><div class="col-xs-5 chn-name">' + channelList[i] + 
							'</div><div class="col-xs-5">NO USER FOUND</div></div><hr>')					

					} else if (ch.logo == null) {
						
						// channel offline, user present, no picture
						$('#offlineData').append(
							'<div class="row"><div class="col-xs-2">' + 
							'<img class="img-thumbnail img-circle" width="75px" src="https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg">' + 
							'</div><div class="col-xs-5 chn-name">' + 
							'<a href=' + ch.url + ' target="blank">' + channelList[i] + '</a>' + 
							'</div><div class="col-xs-5">OFFLINE</div></div><hr>'
						)						
					
					} else {
						
						// channel offline, user and picture present
						$('#offlineData').append(
							'<div class="row"><div class="col-xs-2">' + 
							'<img class="img-thumbnail img-circle" width="75px" src=' + 
							ch.logo + '></div>' + 
							'<div class="col-xs-5 chn-name"><a href=' + ch.url + 
							' target="blank">' + ch.display_name + '</a></div>' + 
							'<div class="col-xs-5">OFFLINE</div></div><hr>')
						
					} // end else				
				}) // end getJSON
				
			} else {
								
				$.getJSON('https://wind-bow.glitch.me/twitch-api/channels/' + val, function (ch) {
					
					// channel online, user and picture present
					$('#onlineData').append(
						'<div class="row"><div class="col-xs-2">' + 
						'<img class="img-thumbnail img-circle" width="75px" src=' + 
						ch.logo + '></div>' + 
						'<div class="col-xs-5 chn-name"><a href=' + ch.url + ' target="blank">' + 
						ch.display_name + '</a></div>' + 
						'<div class="col-xs-5">ONLINE and Streaming:<br> ' + ch.status + '</div></div><hr>')
										
				}) // end getJSON
			} // end else
		}) // end first getJSON	
	}) // end .each method	
}) // end jQuery
