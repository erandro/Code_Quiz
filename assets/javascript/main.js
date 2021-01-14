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
$("#qustion").children().text(quizObj.Q01.Q);

// 2. all answers appear maybe after 5 seconds or by question
for (let i = 0; i < 4; i++) {
    var answer = quizObj.Q01.A[i];
    var id = "#answer" + (i+1).toString();
    $(id).children().text(answer);
};

// 3. a timer appear  and start counting down 10 seconds
// 4. if clicking on answer the timer stops
// 5. the time that remins is added to a score if the answer is right, if worng a 1 second is taken from the score
// 6. if no answer is clicked and time runs out no change to score
// 7. when user click on anser or time runs out comp should promp a message
// 8. after a meesage was prompt + 3 seconds the timer/answers and question go away and a new question appear .
// 9. this goes on until no more answers.

console.log($("#answers").children());