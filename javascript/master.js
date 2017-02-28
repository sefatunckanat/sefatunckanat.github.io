$(function(){
	$('img').on('dragstart', function(event) { event.preventDefault(); });
	var menuToggle = false;
	$('.mobileToggle').on('click',function(){
		$('body>.left').toggleClass("show");
		$(this).toggleClass("active");
		menuToggle = !menuToggle;
	});
	$('body>.right').on('mousedown',function(){
		if(menuToggle){
			$('body>.left').toggleClass("show");
			$('body>.mobileToggle').toggleClass("active");
			menuToggle = !menuToggle;
		}
	});
	$(".cv .line").each(function (index) {
		$(this).attr("data-line",index+1);
    });
});
