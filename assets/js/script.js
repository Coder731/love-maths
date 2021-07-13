//Wait for the DOM to finish loading before running the game
// Get the button elements and add event listeners to them

let num1;
let num2;
let num3;
let num4;
let operand1;
let operand2;

document.addEventListener("DOMContentLoaded", function(){
    let buttons = document.getElementsByTagName("button");

    for (let button of buttons) {
        button.addEventListener("click", function() {
            if (this.getAttribute("data-type") === "submit") {
                checkAnswer();
            } else {
                let gameType = this.getAttribute("data-type");
                let now = new Date;
                // https://stackoverflow.com/questions/8935414/getminutes-0-9-how-to-display-two-digit-numbers https://stackoverflow.com/questions/13955738/javascript-get-the-second-digit-from-a-number 
                console.log( (now.getMinutes()<10?'0':'') + now.getMinutes() + ":" + (now.getSeconds()<10?'0':'') + now.getSeconds() + " at click" );
                runGame(gameType);
            }
        });
    }

    document.getElementById("answer-box").addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            checkAnswer();
        }
    })

    runGame("addition");

});

/** 
 * The main game "loop", called when the script is first loaded
 * and after the user's answer has been processed
*/

function runGame(gameType) {
    // empty string for each new game, and set the focus:
    document.getElementById("answer-box").value = "";
    document.getElementById("answer-box").focus();

    //Creates two random numbers between 1 and 25
    num1 = Math.floor(Math.random() * 25) + 1;
    num2 = Math.floor(Math.random() * 25) + 1;

    if (gameType === "addition") {
        displayAdditionQuestion(num1, num2);
    } else if (gameType === "multiply") {
        displayMultiplyQuestion(num1, num2);
    } else if (gameType === "subtract") {
        displaySubtractQuestion(num1, num2);
    } else if (gameType === "division") {
        let operand1old = parseInt(document.getElementById('operand1').innerText);
        let operand2old = parseInt(document.getElementById('operand2').innerText);
        let operand1new = num1;
        let operand2new = num2;
        console.log("currently: " + "operand1old = "+ operand1old + ", operand2old = " + operand2old + ", num1 = " + num1 + ", num2 = " + num2);
        if (!(operand1old === operand1new && operand2new === operand2new) /*&& operand1old !== operand2new*/) {
            if ((((num1/num2)- Math.floor(num1/num2)) === 0)/*&&(operand1!==num1&&operand2!==num2)*/) {
                displayDivisionQuestion(num1, num2);
                console.log("proposed: " + "operand1old = "+ operand1old + ", operand2old = " + operand2old + ", num1 = " + num1 + ", num2 = " + num2);
                console.log(Date());
            } else {
                console.log(`num1/num2 is ${num1}/${num2} ~= ${(num1/num2).toFixed(1)} to 1 decimal.`);
                // alert(`go again num1/num2 = ${num1/num2}`);
                runGame("division");
            }

        }
    } else {
        alert(`Unknown game type: ${gameType}`);
        throw `Unknown game type: ${gameType}.Aborting!`;
    }

}

/**
 * Checks the answer against the first element in
 * the returned calculateCorrectAnswer array
 */
function checkAnswer() {
    
    let userAnswer = parseInt(document.getElementById("answer-box").value);
    let calculatedAnswer = calculateCorrectAnswer();
    let isCorrect = userAnswer === calculatedAnswer[0];

    if (isCorrect) {
        alert("Hey! You got it right! :D");
        incrementScore();
    } else {
        alert(`Awwww.... you answered ${userAnswer}. The correct answer was ${calculatedAnswer[0]}!`);
        incrementWrongAnswer();
    }

    runGame(calculatedAnswer[1]);

}

/**
 * Gets the operands (the numbers) and the operator (plus, minus etc)
 * directly from the dom, and returns the correct answer.
 */

function calculateCorrectAnswer() {
    
    operand1 = parseInt(document.getElementById('operand1').innerText);
    operand2 = parseInt(document.getElementById('operand2').innerText);
    let operator = document.getElementById("operator").innerText;

    if (operator === "+") {
        return [operand1 + operand2, "addition"];
    } else if (operator === "x") {
        return [operand1 * operand2, "multiply"];
    } else if (operator === "-") {
        return [operand1 - operand2, "subtract"];
    } else if (operator === "/") {
        return [operand1 / operand2, "division"];
    } else {
        alert(`Unimplemented operator ${operator}`);
        throw `Unimplemented operator ${operator}. Aborting!`;
    }

}

/**
 * Gets the current score from the DOM and increments it by 1
 */
function incrementScore() {
    
    let oldScore = parseInt(document.getElementById("score").innerText);
    document.getElementById("score").innerText = ++oldScore;

}

/**
 * Gets the current tally of incorrect answers from the DOM and increments it by 1
 */
function incrementWrongAnswer() {
    let oldScore = parseInt(document.getElementById("incorrect").innerText);
    document.getElementById("incorrect").innerText = ++oldScore;
}

function displayAdditionQuestion(operand1, operand2) {
    
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = "+";

}

function displaySubtractQuestion(operand1, operand2) {

    document.getElementById("operand1").textContent = operand1 > operand2 ? operand1 : operand2;
    document.getElementById("operand2").textContent = operand1 > operand2 ? operand2 : operand1;
    document.getElementById('operator').textContent = "-";

}

function displayMultiplyQuestion(operand1, operand2) {
    
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = "x";

}

function displayDivisionQuestion(operand1, operand2) {
    
    document.getElementById('operator').textContent = "/";
    if (operand1 > operand2) {
        document.getElementById("operand1").textContent = operand1;
    } 
    // else if (operand2 > operand1) {
    //     document.getElementById("operand1").textContent = operand2;
    // }
    if (operand1 > operand2) {
        document.getElementById("operand2").textContent = operand2;
    } 
    // else if (operand2 > operand1) {
    //     document.getElementById("operand2").textContent = operand1;
    // }

}