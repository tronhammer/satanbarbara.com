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