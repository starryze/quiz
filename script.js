let Questions = [];
const ques = document.getElementById("ques")

async function fetchQuestions() {
	try {
		const response = await
		fetch('https://opentdb.com/api.php?amount=10&category=18');
		if (!response.ok) {
			throw new Error(`Something went wrong!!!
		Unable to fetch the data`);
		}
		const data = await response.json();
		Questions = data.results;
	}
	catch (error) {
		console.log(error);
		ques.innerHTML = `<h5 style='color: red'>
		${error}</h5>`;
	}
}
fetchQuestions();

let currQuestion = 0
let score = 0

if (Questions.length === 0) {
	ques.innerHTML = `<h5>Please wait... 
	Loading Questions...</h5>`
}

function loadQues() {
	const opt = document.getElementById("opt");
	let currentQuestion = Questions[currQuestion].question;
    // Escape double quotes
    if (currentQuestion.indexOf('"') > -1) {
        currentQuestion = currentQuestion.replace(/"/g, '\"');
    }
    // Replace HTML entity for single quotes with an actual single quote
    if (currentQuestion.indexOf('&#039;') > -1) {
        currentQuestion = currentQuestion.replace(/&#039;/g, '\'');
    }
	ques.innerText = currentQuestion;
	opt.innerHTML = ""
	const correctAnswer = Questions[currQuestion]
		.correct_answer;
	console.log(Questions);
	const incorrectAnswers = Questions[currQuestion]
		.incorrect_answers;
	const options = [correctAnswer, ...incorrectAnswers];
	options.sort(() => Math.random() - 0.5);
	options.forEach((option) => {
		if (option.indexOf('"') > -1) {
			option = option.replace(/"/g, '\"');
		}
		if (option.indexOf('"') > -1) {
			option = option.replace(/'/g, '\'');
		}
		const choicesdiv = document.createElement("div");
		const choice = document.createElement("input");
		const choiceLabel = document.createElement("label");
		choice.type = "radio";
		choice.name = "answer";
		choice.value = option;
		choiceLabel.textContent = option;
		choicesdiv.appendChild(choice);
		choicesdiv.appendChild(choiceLabel);
		opt.appendChild(choicesdiv);
	});
}

setTimeout(() => {
	loadQues();
	if (Questions.length === 0) {
		ques.innerHTML = `<h5 style='color: red'>Unable 
		to fetch data, Please try again!!</h5>`
	}
}, 2000)


function loadScore() {
	const totalScore = document.getElementById("score");
	totalScore.textContent = `You scored ${score} out 
	of ${Questions.length}`;
	totalScore.innerHTML += "<h3>All Answers</h3>"
	Questions.forEach((el, index) => {
		totalScore.innerHTML += `<p>${index + 1}.
		${el.correct_answer}</p>`
	})
}


function nextQuestion() {
	if (currQuestion < Questions.length - 1) {
		currQuestion++;
		loadQues();
	} else {
		document.getElementById("opt").remove()
		document.getElementById("ques").remove()
		document.getElementById("btn").remove()
		loadScore();
	}
}

function checkAns() {
	const selectedAns = document.
		querySelector('input[name="answer"]:checked').value;

	if (selectedAns === Questions[currQuestion].correct_answer) {
		score++;
		nextQuestion();
	} else {
		nextQuestion();
	}
}
// List of songs
const songs = [
    'Morning-Routine-Lofi-Study-Music(chosic.com).mp3',
    'barradeen-bedtime-after-a-coffee(chosic.com).mp3',
    'Heart-Of-The-Ocean(chosic.com).mp3',
    'Midnight-Stroll-Lofi-Study-Music(chosic.com).mp3'
];

// Get the audio element
const audioPlayer = document.getElementById('audioPlayer');
let currentSongIndex = 0;

// Load the first song
audioPlayer.src = songs[currentSongIndex];

// Play the music
function playMusic() {
    audioPlayer.play();
}
function skipMusic() {
    currentSongIndex = (currentSongIndex + 1) % songs.length; // Move to the next song
    audioPlayer.src = songs[currentSongIndex]; // Change the audio source
    audioPlayer.play(); // Play the next song
}

// Add an event listener to change the audio when it ends
audioPlayer.addEventListener('ended', function() {
    skipMusic(); // Call skipMusic to go to the next song
});
