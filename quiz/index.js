function quiz() {
    const BASE_URL = 'https://opentdb.com/api.php?amount=20&type=multiple';
    let products = [];
    let currentQuestionIndex = 0;
    let correctAnswers = 0;
    const container = document.querySelector('.container');

    const questionEl = document.getElementById('question');
    const answersEl = {
        A: document.getElementById('A'),
        B: document.getElementById('B'),
        C: document.getElementById('C'),
        D: document.getElementById('D'),
    };
    const submitBtn = document.getElementById('submit');

    function init() {
        submitBtn.addEventListener('click', getQuestions);
        addAnswersEventListeners();
    }

    function getQuestions(event) {
        event.preventDefault();
        submitBtn.style.display = 'none';
        fetch(BASE_URL)
            .then((res) => res.json())
            .then((data) => {
                products = data.results;
                answersEl.A.removeAttribute('hidden');
                answersEl.B.removeAttribute('hidden');
                answersEl.C.removeAttribute('hidden');
                answersEl.D.removeAttribute('hidden');
                displayQuestion();
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    function displayQuestion() {
        const question = products[currentQuestionIndex].question;
        const correctAnswer = products[currentQuestionIndex].correct_answer;
        const incorrectAnswers = products[currentQuestionIndex].incorrect_answers;

        questionEl.innerHTML = question;

        const answers = [...incorrectAnswers, correctAnswer];
        shuffleArray(answers);

        // Display the answers
        answersEl.A.innerHTML = answers[0];
        answersEl.B.innerHTML = answers[1];
        answersEl.C.innerHTML = answers[2];
        answersEl.D.innerHTML = answers[3];
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function addAnswersEventListeners() {
        answersEl.A.addEventListener('click', function(event) {
            event.preventDefault();
            checkAnswer(answersEl.A.innerHTML);
        });
        answersEl.B.addEventListener('click', function(event) {
            event.preventDefault();
            checkAnswer(answersEl.B.innerHTML);
        });
        answersEl.C.addEventListener('click', function(event) {
            event.preventDefault();
            checkAnswer(answersEl.C.innerHTML);
        });
        answersEl.D.addEventListener('click', function(event) {
            event.preventDefault();
            checkAnswer(answersEl.D.innerHTML);
        });
    }

    function checkAnswer(answer) {
        const correctAnswer = products[currentQuestionIndex].correct_answer;
        if (answer === correctAnswer) {
            correctAnswers++;
            console.log('Correct!');
        } else {
            console.log('Incorrect!');
        }
        currentQuestionIndex++;
        if (currentQuestionIndex < products.length) {
            displayQuestion();
        } else {
            const container = document.querySelector('.container');
            container.innerHTML = '';
            const resultMessage = `Quiz is over. You answered ${correctAnswers} questions correctly out of ${products.length}.`;
            const messageElement = document.createElement('h2');
            messageElement.innerText = resultMessage;
            container.appendChild(messageElement);
        }
    }
    init();
}

quiz();
