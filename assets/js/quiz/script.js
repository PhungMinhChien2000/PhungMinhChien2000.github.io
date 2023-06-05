const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'When was Chien born?',
    answers: [
      { text: '12-11-2007', correct: false },
      { text: '31-2-2007', correct: false },
      { text: '5-6-2007', correct: true },
      { text: '6-11-2007', correct: false}
    ]
  },
  {
    question: 'Which subject is Chien good at?',
    answers: [
      { text: 'Math', correct: false },
      { text: 'English', correct: false },
      { text: 'Literature', correct: false },
      { text: 'EVERYTHINGG', correct: true }
    ]
  },
  {
    question: 'Is Chien awesome?',
    answers: [
      { text: 'yes', correct: true },
      { text: 'YES!!!', correct: true },
      { text: 'Oh yes', correct: true },
      { text: 'Absolutely', correct: true }
    ]
  },
  {
    question: 'Can you beat Chien in a 1v1 battle?',
    answers: [
      { text: 'Yes', correct: false },
      { text: 'No', correct: true }
    ]
  },
  {
    question: 'Which sport does Chien love the most?',
    answers: [
      { text: 'Football', correct: true },
      { text: 'Badminton', correct: false},
      { text: 'Hockey', correct: false},
      { text: 'Swimming', correct: false}
    ]
  },
  {
    question: 'Which career does Chien wish to pursue?',
    answers: [
      { text: 'Teacher', correct: false},
      { text: 'Salesman', correct: false},
      { text: 'Police', correct: true},
      { text: 'Doctor', correct: false}
    ]
  },
  {
    question: 'Which word best describes Chien?',
    answers: [
      { text: 'Hard-working', correct: true },
      { text: 'Romantic', correct: true },
      { text: 'Handsome', correct: true },
      { text: 'Wise', correct: true },
    ]
  }
]
