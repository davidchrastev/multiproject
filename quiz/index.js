function quiz() {
    const button = document.getElementById('submit');
    const BASE_URL = 'https://opentdb.com/api.php?amount=20&type=multiple';
    let products = [];
    let questionn = document.getElementById('question');
    const answers = {
        A: document.getElementById('A'),
        B: document.getElementById('B'),
        C: document.getElementById('C'),
        D: document.getElementById('D'),
    }
    let currentQuestionIndex = 0;
    let correctAnswers = 0;
    let array = [];

    button.addEventListener('click', getQuestion);
    function getQuestion(event) {
        event.preventDefault();

        fetch(BASE_URL)
            .then((res) => res.json())
            .then((allProducts) => {
                products = Object.values(allProducts);
                for (const { category, difficulty, question, incorrect_answers, correct_answer } of products[1]) {
                    questionn.innerHTML = question;
                    array = [...incorrect_answers];
                    array.push(correct_answer);
                    shuffleArray(array);
                    answers.A.innerHTML = array[0];
                    answers.B.innerHTML = array[1];
                    answers.C.innerHTML = array[2];
                    answers.D.innerHTML = array[3];


                }
            }).catch(err => {
            console.log(err);
        });
    }


    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function checkAnswer() {
        if (answers.A.clicked === true) {

        }
    }
}

quiz();