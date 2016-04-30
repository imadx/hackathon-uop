var menuDisplayed = true;
var animating = false;

var hidingMenuElement = $("#menuTop .center");
var contentElement = $("#Content");
var menuTop = $("#menuTop");

var window_height = $(window).height();
var window_width = $(window).width();

var viewModel;
$(document).ready(function(){

	console.log("starting.. " + window_width + "x" + window_height);

	Scoring.init();
	setupLayout();

	$(".teamCard-extendedContent").slideUp();


	// hidingMenuElement.height(window_height - 200);
	// contentElement.hide();

	// console.log(Scoring.ScoreSet);
});


$(window).resize(function(){
	window_height = $(window).height();
	window_width = $(window).width();
	setupLayout();
});

function setupLayout(){
	$("#popupMenu .wrapper").css("top", (window_height - $("#popupMenu .wrapper").height())/2 + "px");
	$("#popupMenu").hide();	
}
$("#popupMenu").click(function(e){
	// console.log($(e.target).hasClass("material-icons"));
	if($(e.target).hasClass("material-icons")){

	} else {
		hideMenuOverlay();
	}
});

function hideMenuOverlay(){

	$("#popupMenu .menuButton")
		.css("transform", "scale(.5,.5)")
		.css("opacity", "0");
	setTimeout(function(){
		$("#popupMenu").fadeOut(200);
	}, 100);

	$(".teamCard-extendedContent").hide();
	Scoring.updateScores();
}

$("#menuHider").click(function(){

	$("#popupMenu").fadeIn(200);

	setTimeout(function(){
		$("#popupMenu .menuButton")
			.css("transform", "scale(1,1)")
			.css("opacity", "1");
	}, 100);

});
