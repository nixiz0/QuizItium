// Récupérer mes 3 blocks div HTML (le header, la div questions et la div result)
let header_screen = document.getElementById("header_screen");
let questions_screen = document.getElementById("questions_screen");
let result_screen = document.getElementById("result_screen");

// Etablir la fonction Quiz permettant d'ajouter des questions et de voir combien de bonnes réponse le user a
function Quiz(){
    this.questions = [];
    this.nbrCorrects = 0;
    this.indexCurrentQuestion = 0;

    // Ajouts de questions
    this.addQuestion = function(question) {
        this.questions.push(question);
    }

    // Fonction servant à passer à la question suivante s'il y en a une, sinon ça affiche le résultat final 
    this.displayCurrentQuestion = function() {
        if(this.indexCurrentQuestion < this.questions.length) {
            this.questions[this.indexCurrentQuestion].getElement(
                this.indexCurrentQuestion + 1, this.questions.length
            );
        }
        else {
            questions_screen.style.display = "none";

            let NbrCorrectUser = document.querySelector("#nbrCorrects");
            NbrCorrectUser.textContent = quiz.nbrCorrects;
            result_screen.style.display = "block";
        }
    }
}


// Fonction Question permettant de créer les questions avec le titre, les réponses et la réponse correcte
function Question(title, answers, answerCorrect) {
    this.title = title,
    this.answers = answers,
    this.answerCorrect = answerCorrect,

    // Mise en place et structuration du HTML et CSS pour mes questions
    this.getElement = function(indexQuestion, nbrOfQuestions) {
        let questionTitle = document.createElement("h3");
        questionTitle.classList.add("title_questions");
        questionTitle.textContent = this.title;

        // Le append sert à afficher le html (il existe le after et le prepend si on veut afficher au-dessus ou en-dessous)
        questions_screen.append(questionTitle);

        let questionAnswer = document.createElement("ul");
        questionAnswer.classList.add("list_questions");

        // Boucle en ForEach pour placer à chaque fois un <li> pour chaque réponse
        this.answers.forEach((answer, index) => {
            let answerElement =  document.createElement("li");
            answerElement.classList.add("answers");
            answerElement.textContent = answer;
            answerElement.id = index + 1;
            answerElement.addEventListener("click", this.checkAnswer)
    
            questionAnswer.append(answerElement);
        });

        // Fonction pour voir à combien de question on est sur le total de questions présents
        let questionNumber = document.createElement("h4");
        questionNumber.classList.add("avancement_question");
        questionNumber.textContent = "Questions : " + indexQuestion + "/" + nbrOfQuestions;

        questions_screen.append(questionNumber);

        questions_screen.append(questionAnswer);
    }

    this.addAnswer = function(answer) {
        this.answers.push(answer);
    },

    // Ici on va checker la réponse correcte avec une écoute d'évènement :
    this.checkAnswer = (e) => { 
        let answerSelect = e.target;
        if(this.isCorrectAnswer(answerSelect.id)) {
            answerSelect.classList.add("answersCorrect");
            quiz.nbrCorrects++;
        }
        else {
            answerSelect.classList.add("answersWrong");
            let RightAnswer = document.getElementById(this.answerCorrect);
            RightAnswer.classList.add("answersCorrect");
        }

        // Mise en place d'une fonction Timeout pour passer à la prochaine question, timer d'une seconde après le click sur un élément
        setTimeout(function() {
            questions_screen.textContent = '';
            quiz.indexCurrentQuestion++;
            quiz.displayCurrentQuestion();
        }, 1100);
    }

    // Si la réponse choisit par le user est égale à la réponse correcte retourner True sinon False
    this.isCorrectAnswer = function(answerUser) {
        if(answerUser == this.answerCorrect) {
            return true;
        }
        else {
            return false;
        }
    }
};


// On va récupérer notre fonction Quiz pour implémenter ses données dans ses arguments 
// Partie Création des mes données de Questions :
let quiz = new Quiz();

let question1 = new Question("Quel est l'énergie la plus utilisé au monde ? ", ["Le Gaz", "Le Pétrole", "Le Nucléaire"], 2);
quiz.addQuestion(question1);

let question2 = new Question("Quel énergie pollue le plus ? ", ["Le Charbon", "Le Pétrole", "Le Nucléaire"], 1);
quiz.addQuestion(question2);

let question3 = new Question("Quel est le prix d'1 kWh en 2022 ? ", ["1,456€", "0,5156€", "0,139€"], 3);
quiz.addQuestion(question3);

let question4 = new Question("Quel est le rendement d'un barrage hydraulique ? (aménagement important (>100 MW)) ", ["Varie entre 70 à 85%", "Varie entre 35 à 48%", "Varie entre 60 à 75%"], 1);
quiz.addQuestion(question4);

let question5 = new Question("En 2020 combien la France a t-elle importé d'uranium ? ", ["10 000 tonnes", "6 000 tonnes", "15 854 tonnes"], 2);
quiz.addQuestion(question5);

let question6 = new Question("Combien existe t-il de réacteurs nucleaire en france ? ", ["52", "54", "56"], 3);
quiz.addQuestion(question6);

let question7 = new Question("Quel énergie est utilisé (dans le film) pour l'armure d'Iron Man ? ", ["De l'antimatière", "Des particules Beta", "De l'Uranium 235"], 2);
quiz.addQuestion(question7);

let question8 = new Question("Quand a été trouvé le gaz ? ", ["En 1752", "En 1815", "En 1911"], 2);
quiz.addQuestion(question8);

let question9 = new Question("Quand a été trouvé l'uranium ? ", ["En 1789", "En 1864", "En 1920"], 1);
quiz.addQuestion(question9);

let question10 = new Question("Comment se nomme l'accélérateur de particules Franco-Suisse ? ", ["Le Cern", "Iter", "LHC"], 3);
quiz.addQuestion(question10);


// Ici je suis obligé de passer par un querySelectroAll pour avoir accès à la fonction ForEach (car le getElement ne le possède pas)
let NbrQuestion = document.querySelectorAll(".nbrQuestion");

NbrQuestion.forEach(function(NbrQuestion) {
    NbrQuestion.textContent = quiz.questions.length;
});


// Fonction servant à lancer le questionnaire en enlevant la page d'introduction du quiz et en mettant la première question
function startQuestions() {
    header_screen.style.display = "none";
    questions_screen.style.display = "block";

    quiz.displayCurrentQuestion();
}


// Récupérer le bouton dans mon html avec le ElementById car le ElementsByClassName n'a pas le addEventListener)
let btn_start = document.getElementById("btn_start");
btn_start.addEventListener("click", startQuestions);
