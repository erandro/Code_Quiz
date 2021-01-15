var quizObj = {
    Q01 : {
        Q : "question 1",
        A : ["answer 1","answer 2","answer 3","answer 4"],
        RA : 1
    },
    Q02 : {
        Q : "question 2",
        A1 : "answer 1",
        A2 : "answer 2",
        A3 : "answer 3",
        A4 : "answer 4",
        RA : 2
    },
    Q03 : {
        Q : "question 3",
        A1 : "answer 1",
        A2 : "answer 2",
        A3 : "answer 3",
        A4 : "answer 4",
        RA : 3
    },
    Q04 : {
        Q : "question 4",
        A1 : "answer 1",
        A2 : "answer 2",
        A3 : "answer 3",
        A4 : "answer 4",
        RA : 4
    }
};

// When clicking on the start button - start game function:
// 1. a question appears
function qustionChange(qestionNumber) {
    var qustion = quizObj.Q[qestionNumber].Q;
    $("#qustion").children().text(qustion);
}

// 2. all answers appear maybe after 5 seconds or by question
function answerChange (qestionNumber){
    for (let i = 0; i < 4; i++) {
        var answer = quizObj.Q[qestionNumber].A[i];
        var id = "#answer" + (i+1).toString();
        $(id).children().text(answer);
    };
}
// 3. a timer appear  and start counting down 10 seconds
// this salution is from Mateusz Rybczonec - https://css-tricks.com/how-to-create-an-animated-countdown-timer-with-html-css-and-javascript/
const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 10;
const ALERT_THRESHOLD = 5;
const COLOR_CODES = {
  info: {
    color: "green"
  },
  warning: {
    color: "orange",
    threshold: WARNING_THRESHOLD
  },
  alert: {
    color: "red",
    threshold: ALERT_THRESHOLD
  }
};

const TIME_LIMIT = 20;
let timePassed = 0;
let timeLeft = TIME_LIMIT;
let timerInterval = null;
let remainingPathColor = COLOR_CODES.info.color;

$("#app").html(`
<div class="base-timer">
  <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g class="base-timer__circle">
      <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
      <path
        id="base-timer-path-remaining"
        stroke-dasharray="283"
        class="base-timer__path-remaining ${remainingPathColor}"
        d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
      ></path>
    </g>
  </svg>
  <span id="base-timer-label" class="base-timer__label">${formatTime(
    timeLeft
  )}</span>
</div>
`);

startTimer();

function onTimesUp() {
  clearInterval(timerInterval);
}

function startTimer() {
  timerInterval = setInterval(() => {
    timePassed = timePassed += 1;
    timeLeft = TIME_LIMIT - timePassed;
    document.getElementById("base-timer-label").innerHTML = formatTime(
      timeLeft
    );
    setCircleDasharray();
    setRemainingPathColor(timeLeft);

    if (timeLeft === 0) {
      onTimesUp();
    }
  }, 1000);
}

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  return `${minutes}:${seconds}`;
}

function setRemainingPathColor(timeLeft) {
  const { alert, warning, info } = COLOR_CODES;
  if (timeLeft <= alert.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(warning.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(alert.color);
  } else if (timeLeft <= warning.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(info.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(warning.color);
  }
}

function calculateTimeFraction() {
  const rawTimeFraction = timeLeft / TIME_LIMIT;
  return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
}

function setCircleDasharray() {
  const circleDasharray = `${(
    calculateTimeFraction() * FULL_DASH_ARRAY
  ).toFixed(0)} 283`;
  document
    .getElementById("base-timer-path-remaining")
    .setAttribute("stroke-dasharray", circleDasharray);
}
// 4. if clicking on answer the timer stops
// 5. the time that remins is added to a score if the answer is right, if worng a 1 second is taken from the score
// 6. if no answer is clicked and time runs out no change to score
// 7. when user click on anser or time runs out comp should promp a message
// 8. after a meesage was prompt + 3 seconds the timer/answers and question go away and a new question appear .
// 9. this goes on until no more answers.

//console.log($("#answers").children());