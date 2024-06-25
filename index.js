let aboutPage = document.querySelector("#aboutPage")
let helpPage = document.getElementById("helpPage")
let mainPage = document.getElementById("main")
let navPage = document.querySelector(".navSection")
let playBtn = document.querySelector("#btn")



//Questions List
const questions = [
    {
        questionNumber: 1,
        question: " What is the largest lake in the world?",
        answer: [
            { text: "Caspian Sea", correct: false },
            { text: "Baikal", correct: true },
            { text: "Lake Superior", correct: false },
            { text: "Ontario", correct: false }
        ]
    }, {
        questionNumber: 2,
        question: "Which planet in the solar system is known as the Red Planet?",
        answer: [
            { text: "Venus", correct: false },
            { text: "Earth", correct: false },
            { text: "Mars", correct: true },
            { text: "Jupiter", correct: false }
        ]
    }, {
        questionNumber: 3,
        question: "What is the capital of Japan?",
        answer: [
            { text: "Beijing", correct: false },
            { text: "Tokyo", correct: true },
            { text: "Seoul", correct: false },
            { text: "Bangkok", correct: false }
        ]
    }, {
        questionNumber: 4,
        question: "Which river is the longest in the world?",
        answer: [
            { text: "Amazon", correct: false },
            { text: "Mississippi", correct: false },
            { text: "Nile", correct: true },
            { text: "Yangtze", correct: false }
        ]
    }, {
        questionNumber: 5,
        question: "What gas is used to extinguish fires?",
        answer: [
            { text: "Oxygen", correct: false },
            { text: "Nitrogen", correct: true },
            { text: "Carbon dioxide", correct: false },
            { text: "Hydrogen", correct: false }
        ]
    }, {
        questionNumber: 6,
        question: "What is the name of the process by which plants convert sunlight into energy?",
        answer: [
            { text: "Respiration", correct: false },
            { text: "Photosynthesis", correct: true },
            { text: "Oxidation", correct: false },
            { text: "Evolution", correct: false }
        ]
    }, {
        questionNumber: 7,
        question: "What chemical element is designated as “Hg”?",
        answer: [
            { text: "Silver", correct: false },
            { text: "Tin", correct: false },
            { text: "Copper", correct: false },
            { text: "Mercury", correct: true }
        ]
    }, {
        questionNumber: 8,
        question: "Which is the largest island?",
        answer: [
            { text: "New Guinea", correct: false },
            { text: "Andaman Nicobar", correct: false },
            { text: "Greenland", correct: true },
            { text: "Hawaii", correct: false }
        ]
    }, {
        questionNumber: 9,
        question: "What is the phobia of thunder and rain?",
        answer: [
            { text: "Agoraphobia", correct: false },
            { text: "Ombrophobia", correct: true },
            { text: "Acrophobia", correct: false },
            { text: "Claustrophobia", correct: false }
        ]
    }, {
        questionNumber: 10,
        question: "Where does the Sushi come from?",
        answer: [
            { text: "Japan", correct: true },
            { text: "China", correct: false },
            { text: "America", correct: false },
            { text: "South Korea", correct: false }
        ]
    }
]


let currentIndex = 0;
let score = 0;

//about page in main section
aboutPage.addEventListener("click", (e) => {
    e.preventDefault();
    fetch('/components/about.html')
        .then(response => {
            return response.text();
        })
        .then(data => {
            mainPage.innerHTML = data;
        })
});

//help page in main section
helpPage.addEventListener("click", (e) => {
    e.preventDefault();
    fetch('/components/help.html').then(response => {
        return response.text();
    }).then(data => {
        mainPage.innerHTML = data
    })
})

//play the game
playBtn.addEventListener("click", () => {
    startQuiz()

    //nav page
    navPage.innerHTML = `<div class="nav w-[100%] flex justify-between">
         <div class="logo">
            <img class="rounded-lg" src="logo.jpg" alt="" width="50px">
        </div>
     </div>`
})

const startQuiz = () => {
    mainPage.innerHTML = `<div class="play m-4 text-2xl p-2">
   <div class="questionNumber ">1</div>
   <div class="questionNow w-[100%] p-2 text-xl ml-2 bg-purple-700 rounded-sm text-white">Question comes here fnowfnca cjafncoaecn dfbbewodncas fewjncloewc sdbeswndaasobfeoa deifoe</div>
   <div class="answers ">
   </div>
   <div class="nextbtn mt-2 text-center">
   <button class="bg-blue-950 text-white text-xl font-bold p-2 rounded-xl">Next</button>
   </div>
   </div>`

    document.querySelector(".nextbtn button").style.display = "none";
    showQuestion()
    clickNext()

}

//to show questions
function showQuestion() {
    let questionNo = document.querySelector(".questionNumber")
    let currentQuestion = document.querySelector(".questionNow")
    let currentAnswer = document.querySelector(".answers")

    questionNo.innerHTML = questions[currentIndex].questionNumber
    currentQuestion.innerHTML = questions[currentIndex].question

    questions[currentIndex].answer.forEach((button) => {
        console.log(button.text)
        let btn = document.createElement('div')
        btn.classList.add('btn')
        btn.innerHTML = button.text
        currentAnswer.appendChild(btn)
        if (button.correct) {
            btn.dataset.correct = button.correct
        }
        btn.addEventListener("click", selectAnswer)

    })

}

function selectAnswer(e) {
    let currentAnswer = document.querySelector(".answers")
    const btnSelected = e.target
    const isCorrect = btnSelected.dataset.correct === 'true'

    if (isCorrect) {
        btnSelected.classList.add('correctAnswer')
        score++;
    }
    else {
        btnSelected.classList.add('incorrect')
    }

    Array.from(currentAnswer.children).forEach(ans => {
        if (ans.dataset.correct === "true") {
            ans.classList.add('correctAnswer')
        }
    })

    // Disable all answer buttons after selection
    const answerButtons = document.querySelectorAll(".answers .btn");
    answerButtons.forEach(btn => {
        btn.removeEventListener("click", selectAnswer);
        btn.disabled = true;
    });

    // Show the next button
    document.querySelector(".nextbtn button").style.display = "block";

}

function clickNext() {
    let nextbtn = document.querySelector(".nextbtn")
    nextbtn.addEventListener("click", () => {

        if (currentIndex < questions.length) {
            handleNext()
        }
        else {
            startQuiz()
        }
    })
}

const handleNext = () => {
    currentIndex++;

    if (currentIndex < questions.length) {

        startQuiz()
    }
    else {
        showScore()
    }
}


const showScore = () => {
    mainPage.innerHTML = `<img src="clap.gif" />
    <h1 class="text-3xl center m-2">You have Scored ${score} out of ${questions.length}</h1>
    <a href="index.html">
            <button
                class="text-xl bg-blue-950 text-white font-bold p-2 rounded-md w-[100px] m-4">BACK</button>
        </a>`
}

clickNext()
startQuiz()