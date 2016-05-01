var socket = io();

socket.on('init', function (data) {
	console.log('connection token received.. [id:' + data.clientID + ']');

	var sendingJSON;
	if (localStorage.i__clientID) {
	    sendingJSON = {"clientID": localStorage.i__clientID};
	} else {
		localStorage.i__clientID = data.clientID;
	    sendingJSON = data;
	}

	console.log('connection establishing.. [id:' + sendingJSON.clientID + ']');
    socket.emit('init_toServer', sendingJSON);
});
socket.on('init_confirm', function (data) {
	console.log("history for this client.. ");
	console.log(data);
	if(data){
		Scoring.ScoreSet = data;
		Scoring.updateScores();
	} else {
		Scoring.init();
		Scoring.updateScores();
	}
    // socket.emit('init_toServer', sendingJSON);
});
socket.on('overall_avg_array', function (data) {
	console.log("average array.. " + data);
	for(var i in data){
		$("#team" + (Number(i)+1) + "_overallScore").text(parseFloat(data[i]).toFixed(2));
		
	}
    // socket.emit('init_toServer', sendingJSON);
});

function sendScores(){
	var sendingJSON = {
		"clientID": localStorage.i__clientID,
		"scores": Scoring.ScoreSet
	};

	socket.emit('scoreUpdate', sendingJSON);
}