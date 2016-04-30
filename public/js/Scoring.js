var Scoring = {

	ScoreSet: [],
	ScoreSet_ranked: [],

	MarkingScheme: [
		"Innovativeness",
		"Creativity",
		"Technical Aspect",
		"Marketing Aspect",
		"Engagement"
	],

	init: function(){
		this.ScoreSet = [
			{"id": "team1", "name": "Team Name 1", "scores" : [0,0,0,0,0], "average": 0.0, "rank": 1 },
			{"id": "team2", "name": "Team Name 2", "scores" : [0,0,0,0,0], "average": 0.0, "rank": 1 },
			{"id": "team3", "name": "Team Name 3", "scores" : [0,0,0,0,0], "average": 0.0, "rank": 1 },
			{"id": "team4", "name": "Team Name 4", "scores" : [0,0,0,0,0], "average": 0.0, "rank": 1 },
			{"id": "team5", "name": "Team Name 5", "scores" : [0,0,0,0,0], "average": 0.0, "rank": 1 },
			{"id": "team6", "name": "Team Name 6", "scores" : [0,0,0,0,0], "average": 0.0, "rank": 1 },
			{"id": "team7", "name": "Team Name 7", "scores" : [0,0,0,0,0], "average": 0.0, "rank": 1 },
			{"id": "team8", "name": "Team Name 8", "scores" : [0,0,0,0,0], "average": 0.0, "rank": 1 },
		];
		// this.updateScores();
		this.createTeamCards();
	},
	updateScores: function(){
		var start = new Date().getTime();
		for(team in this.ScoreSet){
			var dataset = this.ScoreSet[team];
			this.ScoreSet[team].average = this.average(dataset.scores);
		}

		var sorted = _.sortBy(this.ScoreSet, function(team){ return team.average; });
		this.ScoreSet_ranked = (sorted.reverse());

		var end = new Date().getTime();
		var time = end - start;


		var rank = 1;
		var lastRank = rank;
		var lastScore = -1;

		for(team in this.ScoreSet_ranked){
			var dataSet = this.ScoreSet_ranked[team];
			if(dataSet.average == lastScore){

			} else {
				lastScore = dataSet.average;
				lastRank = rank;
			}
			this.ScoreSet_ranked[team].rank = lastRank;
			rank++;
		}


		sorted = _.sortBy(this.ScoreSet_ranked, function(team){ return team.name; });
		this.ScoreSet = (sorted);

		this.updateView();
		// console.log(this.ScoreSet);
		console.log('updated scores [' + time + 'ms]');

		// through socket
		sendScores();
	},
	setScore: function(team, field, score){
		this.ScoreSet[Number(team)-1].scores[field] = score;
		this.updateScores();
		// console.log(this.ScoreSet[team].scores);
	},
	createTeamCards: function(ranked){
		console.log("creating team cards..");
		$("#Content").empty().append("</ br>");
		// console.log(this.ScoreSet);
		var teamCard = $('');
		var index = 0;

		var dataSet = this.ScoreSet;
		if(ranked) {
			dataSet = this.ScoreSet_ranked;
		}

		for( team in this.ScoreSet){
				var TeamCard = $('<div class="teamCard" id="team00">' +
							'<div class="teamCard-titleBar">' +
								'<div class="teamCard-index accent one bg">1</div>' +
								'<div class="teamCard-title accent one">Newly Added</div>' +
								'<div class="statss">' +
									'<div class="teamCard-stats one givenScore">' +
										'<span class="value accent one" id="' + dataSet[team].id + '_givenScore">125</span>' +
										'<span class="description">Score by me</span>' +
									'</div><div class="teamCard-stats two overallScore">' +
										'<span class="value accent one" id="' + dataSet[team].id + '_overallScore">125</span>' +
										'<span class="description">Overall Score</span>' +
									'</div><div class="teamCard-stats three">' +
										'<span class="value accent one" id="' + dataSet[team].id + '_rank">125</span>' +
										'<span class="description">Overall Rank</span>' +
									'</div>' +
								'</div>' +
							'</div>' +
							'<div class="teamCard-extendedContent one">' +
								// marking criteria comes here..
							'</div>' +
						'</div>');


			TeamCard[0].id = dataSet[team].id;

			$(TeamCard[0].childNodes[0]).find('.teamCard-index').text(++index);
			$(TeamCard[0].childNodes[0]).find('.teamCard-title').text(dataSet[team].name);
			$(TeamCard[0].childNodes[0]).find('.statss .teamCard-stats.one span.value').text(dataSet[team].average);
			$(TeamCard[0].childNodes[0]).find('.statss .teamCard-stats.two span.value').text(dataSet[team].average);
			$(TeamCard[0].childNodes[0]).find('.statss .teamCard-stats.three span.value').text(dataSet[team].rank);

			for(i in this.MarkingScheme){
				var MarkingCriteria = $('<div class="teamCard-markingScheme">' +
					'<span class="description accent one">Innovativeness</span>' +
					'<div id="' + dataSet[team].id +'_' + i +'">' +
						'<div class="marking button1">1</div>' +
						'<div class="marking button2">2</div>' +
						'<div class="marking button3">3</div>' +
						'<div class="marking button4">4</div>' +
						'<div class="marking button5">5</div>' +
						'<div class="marking button6">6</div>' +
						'<div class="marking button7">7</div>' +
						'<div class="marking button8">8</div>' +
						'<div class="marking button9">9</div>' +
						'<div class="marking button10">10</div>' +
					'</div>' +
				'</div>');
				$(MarkingCriteria).find('.description').text(this.MarkingScheme[i]);
				$(TeamCard[0].childNodes[1]).append(MarkingCriteria);
			}

			$("#Content").append(TeamCard);
			// console.log(dataSet[team].name);
		};

		$(".marking").click(function(e){
			var score_c = $(this).text();
			var item_c = $(this).parent()[0].id.split('_');
			var team_c = item_c[0].replace('team', '');
			var field_c = item_c[1];
			Scoring.setScore(team_c, field_c, Number(score_c));

			$(this).parent().find(".marking").removeClass("selected");
			for (var i = 1; i <= Number(score_c); i++) {
				$(this).parent().find(".button" + i).addClass("selected");
			};
			// console.log(team_c, field_c);
		});

		$(".teamCard-titleBar").click(function(){

			var team = $(this).parent();
			if(team.hasClass("expanded")){

				team.find(".teamCard-extendedContent").slideUp(200);
				team.removeClass("expanded");

			} else {
				
				$(".teamCard").removeClass("expanded");
				$(".teamCard .teamCard-extendedContent").slideUp(200);
				team.find(".teamCard-extendedContent").slideDown(200);
				
				team.addClass("expanded");

			}

		});
	},
	average: function (arr) {
		return _.reduce(arr, function(memo, num)
		{
			return memo + num;
		}, 0) / arr.length;
	},

	updateView: function(){

		for(team in this.ScoreSet){
			var dataset = this.ScoreSet[team];
			
			// $("#" + dataset.id + "_overallScore").text(dataset.average);
			$("#" + dataset.id + "_givenScore").text(dataset.average);
			$("#" + dataset.id + "_rank").text(dataset.rank);

			for(i in dataset.scores){
				for (var j = 1; j <= dataset.scores[i]; j++) {
					$("#"+dataset.id +'_' + i).find(".button" + j).addClass("selected");
				};
			}
			
		}
	}
};