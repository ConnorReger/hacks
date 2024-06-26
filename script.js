const questions = [
    {
        question: "Rate the cleanliness of this room",
        image: "pics/room1.jpg",
        answers: [
            { text: "Very clean", response: "1"},
            { text: "Clean", response: "2"},
            { text: "Average", response: "3"},
            { text: "Dirty", response: "4"},
            { text: "Very dirty", response: 5},
        ]
    },
    {
        question: "Rate the cleanliness of this room",
        image: "pics/room2.jpg",
        answers: [
            { text: "Very clean", response: "1"},
            { text: "Clean", response: "2"},
            { text: "Average", response: "3"},
            { text: "Dirty", response: "4"},
            { text: "Very dirty", response: 5},
        ]
    },
    {
        question: "Rate the cleanliness of this room",
        image: "pics/room3.jpg",
        answers: [
            { text: "Very clean", response: "1"},
            { text: "Clean", response: "2"},
            { text: "Average", response: "3"},
            { text: "Dirty", response: "4"},
            { text: "Very dirty", response: 5},
        ]
    },
    {
        question: "Rate the cleanliness of this room",
        image: "pics/room4.jpg",
        answers: [
            { text: "Very clean", response: "1"},
            { text: "Clean", response: "2"},
            { text: "Average", response: "3"},
            { text: "Dirty", response: "4"},
            { text: "Very dirty", response: 5},
        ]
    },
    {
        question: "Rate the cleanliness of this room",
        image: "pics/room5.jpg",
        answers: [
            { text: "Very clean", response: "1"},
            { text: "Clean", response: "2"},
            { text: "Average", response: "3"},
            { text: "Dirty", response: "4"},
            { text: "Very dirty", response: 5},
        ]
    },
    {
        question: "I like white noise or a fan running while I sleep",
        answers: [
            { text: "Strongly agree", response: "1"},
            { text: "Agree", response: "2"},
            { text: "Disagree", response: "3"},
            { text: "Strongly disagree", response: "4"},
        ]
    },
    {
        question: "I will not be bothered by noise if my roommate wakes earlier than me or goes to bed later than me. ",
        answers: [
            { text: "Strongly agree", response: "1"},
            { text: "Agree", response: "2"},
            { text: "Disagree", response: "3"},
            { text: "Strongly disagree", response: "4"},
        ]
    },
    {
        question: "What light level do you best sleep at",
        answers: [
            { text: "Pitch black", response: "1"},
            { text: "Shades open", response: "2"},
            { text: "Night light on", response: "3"},
            { text: "I do not mind", response: "4"},
        ]
    },
    {
        question: "What time do you plan to wake up on average",
        answers: [
            { text: "6:00am-8:00am", response: "1"},
            { text: "8:00am-10:00am", response: "2"},
            { text: "10:00am-12:00pm", response: "3"},
            { text: "I do not have a set schedule", response: "4"},
        ]
    },
    {
        question: "What time do you plan to go to sleep on average",
        answers: [
            { text: "6:00pm-8:00pm", response: "1"},
            { text: "8:00pm-10:00pm", response: "2"},
            { text: "10:00pm-12:00am", response: "3"},
            { text: "I do not have a set schedule", response: "4"},
        ]
    },
];
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answerbuttons"); // Corrected ID
const nextButton = document.getElementById("next-btn");


let currentQuestionIndex = 0;
let score = 0;
var responses = new Array(0,0,0,0,0,0,0,0,0,0);

function startQuiz(){
    currentQuestionIndex = 0; // Reset to 0, not '0'
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}


function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    const questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = `<h2>${questionNo}. ${currentQuestion.question}</h2>`;
   
    // Add image if available
    if (currentQuestion.image) {
        questionElement.innerHTML += `<img src="${currentQuestion.image}" alt="Room Image" class="quiz-image">`;
    }
   
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
 }
 

function resetState(){
   nextButton.style.display = "none";
   while(answerButtons.firstChild){
       answerButtons.removeChild(answerButtons.firstChild);
   }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const response = selectedButton.textContent; // Capture the text content of the clicked button
    selectedButton.classList.add("clicked");
    // Disable all buttons after one is clicked
    Array.from(answerButtons.children).forEach(button => {
        button.disabled = true; // Disable the button
        if(button.dataset.correct === "true"){
        button.classList.add("clicked");
        }
    });

    // Find the corresponding answer object
    const answer = questions[currentQuestionIndex].answers.find(ans => ans.text === response);

    // Update the responses array based on the selected answer's response value
    responses[currentQuestionIndex] = parseInt(answer.response); // Convert response to integer before storing

    // Show the next button
    nextButton.style.display = "block";
}



function showScore(){
   resetState();
   questionElement.innerHTML = "Your roommate score is " + responses; // Used concatenation instead of string interpolation
   nextButton.innerHTML = "Take the quiz again";
   nextButton.style.display = "block";
}


function handleNextButton(){
   currentQuestionIndex++;
   if(currentQuestionIndex < questions.length){
       showQuestion();
   } else {
       showScore();
   }
}


nextButton.addEventListener("click", () => {
   if(currentQuestionIndex < questions.length){
       handleNextButton();
   } else {
       startQuiz();
   }
});


startQuiz();
