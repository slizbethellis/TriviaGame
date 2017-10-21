// The array of objects for the 10 quiz questions is ENORMOUS! Scroll to line 130 to find functions.
var questions = [
	{
		q: "Which Doctor Who episode or serial was the first to feature the Daleks?",
		answers: [
			"The Dalek Invasion of Earth",
			"Dalek",
			"Mission to the Unknown",
			"The Daleks"
		],
		correct: 3,
		explain: "The earliest serials had titles for individual episodes, so the first appearance of a Dalek is in the episode 'The Dead Planet'.",
		img: "assets/images/dead-planet.png"
	}, {
		q: "Which writer created the Daleks?",
		answers: [
			"David Whitaker",
			"Terry Nation",
			"Malcolm Hulke",
			"Robert Holmes"
		],
		correct: 1,
		explain: "Terry Nation also held the copyright for the Daleks (which passed to his estate), which is highly unusual because other characters created for Doctor Who are the sole property of the BBC. However, ownership of the design is shared with the BBC.",
		img: "assets/images/terry-nation.png"
	}, {
		q: "Which Doctor has the most surviving Dalek episodes?",
		answers: [
			"First Doctor",
			"Second Doctor",
			"Third Doctor",
			"Tenth Doctor"
		],
		correct: 0,
		explain: "Although the longest First Doctor serial with Daleks, The Dalek's Master Plan, is almost entirely missing, William Hartnell's Doctor still has eight more episodes than the Doctor in second place for total and surviving episodes with Daleks, the Third Doctor (Jon Pertwee).",
		img: "assets/images/william-hartnell.png"
	}, {
		q: "What color were the bumps on the Dalek props used in the black-and-white episodes?",
		answers: [
			"gray",
			"black",
			"blue",
			"red"
		],
		correct: 2,
		explain: "Many props in the black-and-white era were painted odd colors to create the desired effect on screen.",
		img: "assets/images/blue-dalek.png"
	}, {
		q: "Why was the striped Dalek Saucer Commander only in one episode of The Dalek Invasion of Earth?",
		answers: [
			"The children's home the prop was on loan from needed it back immediately.",
			"The BBC only had six Dalek props, and they needed to paint the silver panels black to make a different high-ranking Dalek.",
			"It was a continuity error.",
			"The Dalek operator had inhaled water from the Thames River and needed to be taxied to the nearest hospital."
		],
		correct: 1,
		explain: "The prop did belong to a children's home, but the BBC sent back a silver Dalek prop in place of the one they had painted black. And there was a taxi on location with the crew during the river scenes in case one of the Dalek operators needed to go to the hospital, but that Dalek wasn't in those scenes.",
		img: "assets/images/dalek-saucercom.png"
	}, {
		q: "In story, which villian was the creator of the Daleks?",
		answers: [
			"Davros",
			"The Rani",
			"Omega",
			"The Black Guardian"
		],
		correct: 0,
		explain: "Davros is a Kaled, a.k.a. the humanoid species the tentacled mutant inside a Dalek came from. His first appearance is in the 1975 serial 'Genesis of the Daleks', which retcons certain details of the Daleks' creation.",
		img: "assets/images/davros.png"
	}, {
		q: "Which episode or serial was the first to depict Daleks capable of hovering up stairs?",
		answers: [
			"Genesis of the Daleks",
			"Revelation of the Daleks",
			"Resurrection of the Daleks",
			"Remembrance of the Daleks"
		],
		correct: 3,
		explain: "Daleks briefly hovered in the previous Dalek story, 'Revelation of the Daleks', but this is the story that shatters the theory that Daleks can't climb stairs.",
		img: "assets/images/hover-dalek.png"
	}, {
		q: "Although 'Destiny of the Daleks' is credited to Terry Nation, the director claims this serial was 98% written by the script editor. Who was this script editor?",
		answers: [
			"Eric Saward",
			"Christopher H. Bidmead",
			"Douglas Adams",
			"Terrance Dicks"
		],
		correct: 2,
		explain: "And the Daleks' enemy in this serial, the Movellans, would later make a brief cameo in the 2017 episode 'The Pilot'.",
		img: "assets/images/douglas-adams.png"
	}, {
		q: "How were the original Dalek travel machines powered?",
		answers: [
			"power beam",
			"solar power",
			"static electricity",
			"atomic fusion"
		],
		correct: 2,
		explain: "In their first serial, Daleks could not leave their city because their travel machines were powered by static electricity from their floors.",
		img: "assets/images/dalek-city.png"
	}, {
		q: "Which planet is the Dalek homeworld?",
		answers: [
			"Mondas",
			"Gallifrey",
			"Trenzalore",
			"Skaro"
		],
		correct: 3,
		explain: "Mondas is home of the Cybermen, everyone knows who's from the second choice, and Trenzalore is a planet from the later Eleventh Doctor episodes. Also, Skaro was destroyed in Remembrance of the Daleks, but it got better.",
		img: "assets/images/skaro.png"
	}
];

// global variables
var intervalID;
var	numCorrect = 0;
var	numWrong = 0;
var numTimedout = 0;
var questionsRun = 0;
var ansCorrect = null;
var Timedout = null;
var timeLeft = 0;
var second = 1000;
var sessionTime = 0;
var answered = false;

// audio variables
var audioEx = document.createElement("audio");
audioEx.setAttribute("src", "assets/audio/exterminate.mp3");
var audioDes = document.createElement("audio");
audioDes.setAttribute("src", "assets/audio/destroy.mp3");
var audioEn = document.createElement("audio");
audioEn.setAttribute("src", "assets/audio/enemy.mp3");

// FUNCTIONS BEGIN HERE!!!
window.onload = function() {
	$("#buttonDiv").empty();
	var startButton = $("<button>");
	startButton.addClass("start button-special");
	startButton.text("Start Game");
	$("#buttonDiv").append(startButton);
	$(document).on("click", ".start", function() {
		resetVars();
		makeQuestionPage(0);
	});

	$(document).on('click', ".answer", function() {
		var userAns = $(this).attr("number");
		makeAnswerPage(questionNum, userAns);
	});
}

// clears all divs except for header
function clearPage() {
	$("#timerDiv").empty();
	$("#questDiv").empty();
	$("#answerImg").empty();
	$("#buttonDiv").empty();
}

// leaves timer and header divs intact, but clears everything else
function partialClear() {
	$("#questDiv").empty();
	$("#answerImg").empty();
	$("#buttonDiv").empty();
}

// resets variables
function resetVars() {
	numCorrect = 0;
	numWrong = 0;
	numTimedout = 0;
	questionNum = 0;
	ansCorrect = null;
	sessionTime = 0;
	answered = false;
}

// displays countdown
function showTime(timeLeft) {
    timeLeft = timeLeft - 1;
	  $("#timerDiv").html("<h3>Time Remaining: " + timeLeft + " seconds.</h3>");
}

// displays question and answer buttons
function makeQuestionPage(index) {
	clearPage();
	if (questionNum > 9) {
		makeEndPage();
		return;
	}
	var questDisplay = $("<h2>");
	questDisplay.addClass("question");
	questDisplay.attr("data-name", questions[index]);
	questDisplay.text(questions[index].q);
	$("#questDiv").append(questDisplay);
	for (var k = 0; k < 4; k++) {
		var answerButton;
		answerButton = $("<button>");
		answerButton.addClass("answer");
		answerButton.attr("number", k);
		answerButton.text(questions[index].answers[k]);
		$("#buttonDiv").append(answerButton);
	}
	sessionTime = setTimeout(function(){makeAnswerPage(index, null);}, 1000 * 25);
	timeLeft = 25;
	intervalID = setInterval(function(){showTime(timeLeft);}, 1000);
}

// shows result of preceding question
function makeAnswerPage(index, userAns) {
	clearTimeout(sessionTime);
	clearInterval(intervalID);
	if (userAns == questions[index].correct) {
		numCorrect++;
		ansCorrect = true;
	}
	else {
		numWrong++;
		ansCorrect = false;
	}
	partialClear();
	var correctness = $("<h2>");
	var ansHeading = $("<h3>");
	var expDisplay = $("<p>");
	var answer = $("<p>");
	var c = questions[index].correct;
	if (userAns == null) {
		correctness.text("TIME'S UP!!!");
		$("#questDiv").append(correctness);
		ansHeading.text("The correct answer is: ");
		$("#questDiv").append(ansHeading);
		answer.text(questions[index].answer[c]);
		$("#questDiv").append(answer);
	}
	else if (ansCorrect == true) {
			correctness.text("CORRECT!!!");
			$("#questDiv").append(correctness);
		}
	else {
		audioEx.play();
		correctness.text("WRONG!!!");
		$("#questDiv").append(correctness);
		ansHeading.text("The correct answer is: ");
		$("#questDiv").append(ansHeading);
		answer.text(questions[index].answers[c]);
		$("#questDiv").append(answer);
	}
	var image = $('<img id="answerImg" src="' + questions[index].img + '">');
	$("#questDiv").append(image);

	if (ansCorrect != true) {
		expDisplay.text(questions[index].explain);
		$("#questDiv").append(expDisplay);
	}
	questionNum++;
	sessionTime = setTimeout(function(){makeQuestionPage(questionNum);}, 1000 * 10);
}

// the final screen at end of game
function makeEndPage() {
	partialClear();
	var result = $("<h2>");
	var correct = $("<p>");
	var wrong = $("<p>");
	var unanswered = $("<p>");
	if (numCorrect === 10) {
		audioEn.play();
		result.text("10 out of 10! A perfect score!")
		$("#questDiv").append(result); 
		var missy = $('<img id="answerImg" src="assets/images/missy.gif">');
		$("#questDiv").append(missy);
		correct.text("You might know *too much* about the Daleks. I'd watch my back if I were you.");
	}
	else {
		audioDes.play();
		result.text("Did you get everything correct?");
		$("#questDiv").append(result);
		var nopelek = $('<img id="answerImg" src="assets/images/nopelek.gif">');
		$("#questDiv").append(nopelek);
		correct.text("Correct Answers: " + numCorrect);
		$("#questDiv").append(correct);
		wrong.text("Wrong Answers: " + numWrong);
		$("#questDiv").append(wrong);
		unanswered.text("Unanswered: " + numTimedout);
		$("#questDiv").append(unanswered);
		
	}
	var startButton = $("<button>");
	startButton.addClass("start button-special");
	startButton.text("Start New Game");
	$("#buttonDiv").append(startButton);
}