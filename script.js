const INVENT_DELAY = 1000;
const ANSWERS_TEMPLATE = `
    <div class="answers-section__answers-container">
    ${Array.from({length: 10}).map((it, i) => {
        return `
        <div class="answers-section__answer"><p class="answers-section__answer-number">${i + 1}</p></div>
        `;
    }).join(``)}
    </div>
`;

const INVENT_TEMPLATE = `
    <div class="answers-section__invent">
    <p>Загадываю число...<p>
    </div>
`;

const RESTART_TEMPLATE = `
    <button class="main__button answers-section__restart">Сыграем еще?</button>
`;

const getMessageNode = (text, animationClass) => {
    const node = document.createElement(`div`);
    node.classList.add(`answers-section__message-container`, animationClass);
    node.innerHTML = `<p class="answers-section__message">${text}</p>`;

    return node;
};

const getFalseMessage = (hint) => `
    Нет! Мое число ${hint}.
`;

const getTrueMessage = (number) => `
    ДА! ${number} - это мое число!
`;

const Hints = {
    BIGGER: `больше`,
    SMALLER: `меньше`
};

const main = document.querySelector(`.main`);
const start = main.querySelector(`.main__button`);
let myNumber;

const getMyNumber = () => {
    myNumber = Math.trunc(Math.random() * 10 + 1);
}

const getAnswer = (number) => {
    return number < myNumber ? getFalseMessage(Hints.BIGGER) : number > myNumber ? getFalseMessage(Hints.SMALLER) : getTrueMessage(number);
};

const colorizeAnswer = (number) => {
    return +number === myNumber ? `answers-section__answer--true` : `answers-section__answer--false`;
};

const animateMessage = (number) => {
    return +number !== myNumber ? `false-answer` : `true-answer`;
};

const isWin = (number) => {
    return +number === myNumber;
}

const onStartClick = () => {
    getMyNumber();
    main.innerHTML = ``;
    const section = document.createElement(`section`);
    section.classList.add(`answers-section`);
    main.appendChild(section);

    section.innerHTML = INVENT_TEMPLATE;

    setTimeout(() => {
        section.innerHTML = ANSWERS_TEMPLATE;
        section.insertBefore(getMessageNode(`Загадал! Отвечай:`), section.firstChild);
        const answersList = Array.from(section.querySelectorAll(`.answers-section__answer`));
        const answersContainer = section.querySelector(`.answers-section__answers-container`);
        
        answersList.forEach((it) => {
            const userAnswer = it.textContent;
            const onAnswerClick = () => {
                section.removeChild(section.firstChild);
                section.insertBefore(getMessageNode(getAnswer(userAnswer), animateMessage(userAnswer)), section.firstChild);
                it.classList.add(colorizeAnswer(userAnswer));
                it.removeEventListener(`click`, onAnswerClick);

                if (isWin(userAnswer)) {
                    answersContainer.classList.add(`opacity-out`);
                    answersContainer.addEventListener(`animationend`, () => {
                        answersContainer.innerHTML = RESTART_TEMPLATE;
                        answersContainer.classList.remove(`opacity-out`);
                        const restart = answersContainer.querySelector(`.answers-section__restart`);
                        answersContainer.classList.add(`from-hell`);
                        restart.addEventListener(`click`, onStartClick);
                    });
                }
            };
        it.addEventListener(`click`, onAnswerClick);
    });
    }, INVENT_DELAY);

    
};

start.addEventListener(`click`, onStartClick);



