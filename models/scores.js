var _ = require("underscore");

var TheOlmightyScores = {};

function average (arr) {
	return _.reduce(arr, function(memo, num)
	{
		return memo + num;
	}, 0) / arr.length;
};

module.exports = {

	createClient: function(clientName) {
		TheOlmightyScores[clientName] = {};
	},
	scoreUpdate: function(clientName, data){
		TheOlmightyScores[clientName] = data;
	},
	getScores: function(clientName){
		return TheOlmightyScores[clientName];
	},
	setScores: function(clientName, scores){
		TheOlmightyScores[clientName] = scores;
	},
	getAverage: function(){
		var f_average = [];
		for(i in TheOlmightyScores){
			var t_average = [];
			for(j in TheOlmightyScores[i]){
				t_average.push(average(TheOlmightyScores[i][j].scores));
			}
			f_average.push(t_average);
		}
		console.log(f_average);
		var l_length = f_average[0].length;
		var judges_connected = f_average.length;

		var overallAvg = [];
		for (var i = 0; i < l_length; i++) {
			overallAvg[i] = 0;
			for (var j = 0; j < judges_connected; j++) {
				overallAvg[i] += f_average[j][i];
			};
			overallAvg[i] /= judges_connected;
		};
		console.log(overallAvg);

		return overallAvg;
	},
	getAllData: function(){
		var f_average = [];
		for(i in TheOlmightyScores){
			var t_average = [];
			for(j in TheOlmightyScores[i]){
				t_average.push(average(TheOlmightyScores[i][j].scores));
			}
			f_average.push(t_average);
		}
		console.log(f_average);
		var l_length = f_average[0].length;
		var judges_connected = f_average.length;

		var overallAvg = [];
		for (var i = 0; i < l_length; i++) {
			overallAvg[i] = 0;
			for (var j = 0; j < judges_connected; j++) {
				overallAvg[i] += f_average[j][i];
			};
			overallAvg[i] /= judges_connected;
		};
		console.log(overallAvg);

		return overallAvg;
	},

};