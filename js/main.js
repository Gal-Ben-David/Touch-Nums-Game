'use strict'

var gNextNum
var gNums
var gDifficulty
const timerDisplay = document.getElementById('timer');

function onInitGame() {
    createBoard()
    timerDisplay.innerText = '00 : 000';
}

function resetNums() {
    gNums = []
    for (var i = 1; i <= gDifficulty; i++) {
        gNums.push(i)
    }
}

function drawNum() {
    var randomIndex = getRandomInt(0, gNums.length)
    var randomNum = gNums[randomIndex]
    gNums.splice(randomIndex, 1)
    return randomNum
}

function createBoard(elDifficulty) {
    gNextNum = 1
    gDifficulty = (!elDifficulty) ? 9 : elDifficulty
    var elNextNumHeading = document.querySelector('h2')
    elNextNumHeading.innerText = `Next Number: ${gNextNum}`

    resetNums()
    stopTimer()
    timerDisplay.innerText = '00 : 000';

    var strHtml = ''
    const elBoard = document.querySelector('.board')
    for (var i = 0; i < Math.sqrt(gDifficulty); i++) {
        strHtml += '<tr>'
        for (var j = 0; j < Math.sqrt(gDifficulty); j++) {
            var num = drawNum()
            strHtml += `<td onclick="onCellClicked(this, ${num})">${num}</td>
            `
        }
        strHtml += '</tr>'
    }
    elBoard.innerHTML = strHtml
}

function onCellClicked(elCell, clickedNum) {
    var elH2 = document.querySelector('h2')
    if (clickedNum === gDifficulty && gNextNum === gDifficulty) {
        stopTimer()
        elCell.style.backgroundColor = 'pink'
        elH2.innerText = `Next Number: ${gNextNum}`
    }
    else if (clickedNum === gNextNum) {
        if (clickedNum === 1) startTimer()
        gNextNum++
        elCell.style.backgroundColor = 'pink'
        elH2.innerText = `Next Number: ${gNextNum}`
    }
}

///////////////////////////////////////////////////// timer

var startTime;
var timerInterval;

function startTimer() {
    startTime = Date.now();

    // Update the timer every millisecond
    timerInterval = setInterval(() => {
        const elapsedTime = Date.now() - startTime;
        const seconds = Math.floor(elapsedTime / 1000);
        const milliseconds = elapsedTime % 1000;

        // Format and display the time
        timerDisplay.innerText = `${seconds.toString().padStart(2, '0')} : ${milliseconds.toString().padStart(3, '0')}`;
    }, 1);
}

function stopTimer() {
    clearInterval(timerInterval);
}

