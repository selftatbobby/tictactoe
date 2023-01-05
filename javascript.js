const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],

]
const cellElements = document.querySelectorAll('[data-cell')
const board = document.getElementById('board')
const winningMessageElement = document.getElementById("winningMessage")
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
const startPageElement = document.getElementById("start-page")
const startButton = document.getElementById("startButton")
const restartButton = document.getElementById("restartButton")
const playerTurnElement = document.getElementById("dashboard")
const nameButton = document.getElementById("namebutton")
const form = document.getElementById('nameForm')
let playerX
let playerCircle
let circleTurn




function setPlayerName() {
    playerX = form.elements['playerX'].value
    playerCircle = form.elements['playerCircle'].value
}



function startGame() {
    circleTurn = false
    indicatePlayer()
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, { once: true })
    })
    setBoardHoverClass()
    winningMessageElement.classList.remove("show")
}

function handleClick(e) {
    const cell = e.target
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS

    placeMark(cell, currentClass)
    if (checkWin(currentClass)) {
        endGame(false)
    } else if (isDraw()) {
        endGame(true)
    } else {
        swapTurns()
        indicatePlayer()
        setBoardHoverClass()
    }

}

function indicatePlayer() {
    playerTurnElement.innerText = `${circleTurn ? playerCircle : playerX}'s turn`
}

function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = "Draw!"
    } else {
        winningMessageTextElement.innerText = `Player ${circleTurn ? CIRCLE_CLASS : X_CLASS}, ${circleTurn ? playerCircle : playerX} wins! `
    }
    winningMessageElement.classList.add("show")
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) ||
            cell.classList.contains(CIRCLE_CLASS)
    })
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

function swapTurns() {
    circleTurn = !circleTurn
}

function setBoardHoverClass() {
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    if (circleTurn) {
        board.classList.add(CIRCLE_CLASS)
    } else {
        board.classList.add(X_CLASS)
    }
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}


function validateNames() {
    setPlayerName()
    if (playerX == "" || playerCircle == "") {
        alert("Enter names in the fields to proceed!");
        return false;
    }
    else {
        startGame()
        removeStartPage()
        indicatePlayer()
    }
}


function removeStartPage() {
    document.getElementById("start-page").style.display = "none"
}

function addStartPage() {
    document.getElementById("start-page").style.display = "flex"
    form.reset();
}


// buttons
startButton.addEventListener('click', validateNames)
form.addEventListener('submit', (event) => {
    event.preventDefault();
});
restartButton.addEventListener('click', addStartPage)




