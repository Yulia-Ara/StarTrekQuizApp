'use strict';

let questionNum = 0
let score = 0

function generateQuestion() {
	console.log('works');
	return `<section>
    <h2>${STORE[questionNum-1].question}</h2>
    <form action="" id="questionSet">
		<fieldset>
            <label class='answerOption'>
                <input type="radio" name="answer" value="${STORE[questionNum-1].answers[0]}" id="option1" required><span>${STORE[questionNum-1].answers[0]}</span>
            </label></br>
            <label class='answerOption'>
                <input type="radio" name="answer" value="${STORE[questionNum-1].answers[1]}" id="option2"><span>${STORE[questionNum-1].answers[1]}</span>
            </label></br>
            <label class='answerOption'>
                <input type="radio" name="answer" value="${STORE[questionNum-1].answers[2]}" id="option3"><span>${STORE[questionNum-1].answers[2]}</span>
            </label></br>
            <label class='answerOption'>
                <input type="radio" name="answer" value="${STORE[questionNum-1].answers[3]}" id="option4"><span>${STORE[questionNum-1].answers[3]}</span>
            </label></br>
        </fieldset>
	</form>
	<div class="enterButton">
		<button type="submit" form="questionSet" class="submitButton">Make It So!</button>
	</div>
    <section>`
};

function changeQuestionNumber() {
	//This function updates the question counter so the user always knows how many more questions are left.
	$('.questionNumber').text(++questionNum);
};

function updateScore() {
	//This function keeps track of how many correct answers user has
	$('.score').text(++score);
};

function startQuiz() {
	//User clicks the ENGAGE button and starts the quiz
	$('button#engage').on('click', function(event) {
		event.preventDefault();
		changeQuestionNumber()
		$('main').html(generateQuestion());
	});	
};

function correctAnswerResponse() {
	//This function generates a response when the user chooses the correct answer: "Correct!" Plus a short description of the answer.
	return `<section class="feedback">
	<h2 class="result">Correct!</h2>
	<div class="answerImage">
		<img class='js-answer-image' src="${STORE[questionNum-1].image}" alt="${STORE[questionNum-1].altText}">
		<h3 class="description">
			${STORE[questionNum-1].answerInfo}
		</h3>
	</div>
	<div class="enterButton">
		<button type="submit" class="nextButton">Next</button>
	</div>
	</section>`;
};

function wrongAnswerResponse() {
	//This function generates a response when the user chooses the wrong answer: "Wrong! The answer is …" Plus a short description of the correct answer.
	return `<section class="feedback">
	<h2 class="result">Wrong!</h2>
	<div class="answerImage">
		<img class='js-answer-image' src="photos/wrongAnswer.jpg" alt="Captain Picard face palm, disappointed">
		<h3 class="description">
			${STORE[questionNum-1].answerInfo}
		</h3>
	</div>
	<div class="enterButton">
			<button type="submit" class="nextButton">Next</button>
	</div>
	</section>`;
};

function handleSubmitButton() {
	$('main').on('click', '.submitButton', function(event) {
		event.preventDefault();
		let userSelection = $('input:checked');
		let answer = userSelection.val();
		let correctAnswer = `${STORE[questionNum-1].correctAnswer}`;
		if (answer === undefined) {
			alert("You must choose an answer!");
		} else if (answer === correctAnswer) {
			generateCorrectAnswer();
		} else {
			generateWrongAnswer()};
	});
};

function generateCorrectAnswer() {
	$('main').html(correctAnswerResponse());
	updateScore();
};

function generateWrongAnswer() {
	$('main').html(wrongAnswerResponse());
};

function nextQuestionButton() {
	//When NEXT button is clicked, this function generates the next question.		
		$('main').on('click', '.nextButton', function(event) {
			event.preventDefault();
			if (questionNum < STORE.length) {				
				changeQuestionNumber();
				$('main').html(generateQuestion());
			} else $('main').html(finalScoreMessage());
		});			
};

function finalScoreMessage() {
	//This function generates the final score 
	$('main').html(`<section class="finalPage">
    <h2 class="result">Final Score: ${score} out of 10</h2>
    <div class="finalImage">
        <img src="photos/resultsImage.jpg" alt="Captain Picard happy, smiling, delightful expression, both arms up">
	</div>
	<div class="enterButton">
		<button class="restartButton" type="submit">Try Again?</button>
	</div>
</section>`);
};

function restartQuiz() {
	//This function restarts the quiz when user clicks RESTART, score changes to 0 and question counter changes to 0/10. 
	//location.reload();???
	$('main').on('click', '.restartButton', function() {
		$('.questionNumber').text('1');
		$('.score').text(0);
		questionNum = 1;
		score = 0;
		$('main').html(generateQuestion());
	});
};

startQuiz();
handleSubmitButton();
nextQuestionButton();
restartQuiz();