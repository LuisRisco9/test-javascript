const questions=[
	{
		question:"¿Cuál es el animal más grande del mundo?",
		answer:[
			{ text: "Tiburon", correct: false},
			{ text: "Ballena azul", correct: true},
			{ text: "Elefante", correct: false},
			{ text: "Girafa", correct: false}

		]
	},
	{
		question:"¿Cuál es el país más pequeño del mundo?",
		answer:[
			{ text: "ciudad del Vaticano", correct:true},
			{ text: "Bhutan", correct: false},
			{ text: "Nepal", correct: false},
			{ text: "Shri Lanka", correct: false}

		]
	},
	{
		question:"¿Cuál es el desierto más grande del mundo?",
		answer:[
			{ text: "Kalahari", correct: false},
			{ text: "Gobi", correct: false},
			{ text: "Sahara", correct: false},
			{ text: "Antartida", correct: true}

		]
	},
	{
		question:"¿Cuál es el continente más pequeño del mundo?",
		answer:[
			{ text: "Asia", correct: false},
			{ text: "Australia", correct: true},
			{ text: "Artico", correct: false},
			{ text: "Africa", correct: false}

		]
	},
];
const questionElement=document.getElementById("question");
const answerButton=document.getElementById("answer-buttons");
const nextButton=document.getElementById("next-btn");
console.log(questions[0].question);
console.log(questions[0].answer[0].text);
console.log(questions[0].answer[0].correct);
console.log(questions[0].answer[1].text);
console.log(questions[0].answer[1].correct);
console.log(questions[0].answer[2].text);
console.log(questions[0].answer[2].correct);
console.log(questions[0].answer[3].text);
console.log(questions[0].answer[3].correct);

let currentQuestionIndex=0;
let score=0;

function startQuiz(){
	currentQuestionIndex=0;
	score=0;
	nextButton.innerHTML="Next";
	showQuestion();
}

function showQuestion(){
	resetState();
	let currentQuestion=questions[currentQuestionIndex];
	let questionNo=currentQuestionIndex+1;
	questionElement.innerHTML=questionNo + ". "+ currentQuestion.question;

	currentQuestion.answer.forEach(answer => {
		const button=document.createElement("button");
		button.innerHTML=answer.text;
		button.classList.add("btn");
		answerButton.appendChild(button);
		if(answer.correct){
			button.dataset.correct=answer.correct;
		}
		button.addEventListener("click", selectAnswer);
	});
}


function resetState(){
	nextButton.style.display="none";
	while (answerButton.firstChild) {
		answerButton.removeChild(answerButton.firstChild);
	}
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button=>{
    	if(button.dataset.correct=="true"){
    		button.classList.add("correct");
    	}
    	button.disabled = true;

    });
    nextButton.style.display = "block";
}

function showScore(){
  resetState();
  questionElement.innerHTML=`you scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML="Play Again";
  nextButton.style.display="block";
}

function handleNextButton(){
  currentQuestionIndex++;
  if(currentQuestionIndex < questions.length){
  	showQuestion();
  }else{
  	showScore();
  }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});
startQuiz();