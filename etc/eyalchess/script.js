var games = false;
$(function(){
	$('h1').bind('touchstart', function(){
//	$('h1').click(function(){
		//if($(this).parent().hasClass('active')){
		//	return;
		//}
		//$('div.active').removeClass('active');
		//$(this).parent().addClass('active');
		games = !games;
		//$('#games').attr('class', 'active');
		//$('#challenges').attr('class', '');
		var tid;
		var slideIn = 70;
		var inDiv = games?$('#games'):$('#challenges');
		var outDiv = (!games)?$('#games'):$('#challenges');
		inDiv.css('max-height', slideIn + 'px');
		//inDiv.css("overflow", "scroll");
		inDiv.attr('class', 'active');
		outDiv.attr('class', 'active');
		var slideOut = outDiv.height();
		var slideOutStart = slideOut;

		var startT = new Date();
		var startTn = startT.getTime();

		tid = setInterval(function() {
			var nowT = new Date();
			var nowTn = nowT.getTime();
			var delta = Math.floor((nowTn - startTn) * (682 - 70) / 100);
			
			//slideIn += 80;
			//slideOut -= 80;

			slideIn = 70 + delta;
			slideOut = slideOutStart - delta;

			if (slideIn >= 682) {
				inDiv.css("max-height", "");
				outDiv.css("max-height", "");
				outDiv.removeClass('active');
				clearInterval(tid);
				return;
			}

			//if (slideOut < 70) slideOut = 70;

			inDiv.css("max-height", slideIn + "px");
			outDiv.css("max-height", slideOut + "px");
			return false;
		}, 10);
	});
})