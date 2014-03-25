<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
		<title>Satan Barbara</title>
		<meta name="viewport" content="user-scalable=no,initial-scale = 1.0,maximum-scale = 1.0">
		<!--[if lt IE 9]>
		<script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script><![endif]-->
	</head>
	<body style="padding:0px;margin:0px;height:900px;">
		<div style="background: url(components/tile/tiles/events/images/bg.jpg) no-repeat 0 0; background-size: 100% 900px; width: 100%; height: 900px;">
			<div style="background: url(components/tile/tiles/home/images/parchment.png) rgba(0, 0, 0, 0) no-repeat; background-size: 100% 600px; width: 50%; height: 600px; margin: 0 auto;">
				<div style="padding: 115px 60px 115px 80px; max-height: 600px; overflow: auto;">
					<h1>Welcome Tyrants!</h1>

					<p>Here at SatanBarbara we are attempting to unite the metal scene in Santa Barbara. 
						You have been chosen to join our horde and lay waste to lesser musics. Long term 
						goals include blocking out the sun for all eternity, so all life on Earth perishes 
						in the ensuing perpetual blackened­winter. For a more short term goal we wish to 
						be a place to hear about shows, bands, and have an outlet into the immediate metal 
						community. Please feel free to send us any suggestions that you feel would improve 
						your experience*.</p>
						
					<div id="emailInputContainer">
						<input placeholder="email" name="email" id="email"/> <button id="join">Join</button>
					</div>
				</div>
			</div>
		</div>
		
		<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
		<script>
			$(function(){
				$("body").delegate("#join", "click", function(){
					$.ajax({
						"url": "http://api.satanbarbara.com/",
						"type": "post",
						"data": {
							"action": "join",
							"email": $("#email").val()
						}
					}).done(function(){
						$("#emailInputContainer").children().fadeOut();
						$("#emailInputContainer").text("Thanks! We'll keep in touch");
					}).fail(function(){
						$("#emailInputContainer").children().fadeOut();
						$("#emailInputContainer").text("There was an error! Try again later.");
					});
				});
			});
		</script>
	</body>
</html>