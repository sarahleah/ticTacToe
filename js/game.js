let gameBoard = document.querySelector('.game-board')
let gameTiles = document.querySelectorAll('.game-tile')
let columns = document.querySelectorAll('.column')
let resultPara = document.querySelector('.result')
let resetBtn = document.querySelector('.reset-btn')
let p1Score = document.querySelector('.py1-score')
let p2Score = document.querySelector('.py2-score')
let changeIconBtn = document.querySelector('.pop-up-btn')

let X
let O

changeIconBtn.addEventListener('click', changeIcons)
gameBoard.addEventListener('click', handleTurn)
resetBtn.addEventListener('click', handleReset)

function changeIcons() {
    let pl1Checked = document.querySelector('input[name="pl1-icons"]:checked')
    let pl2Checked = document.querySelector('input[name="pl2-icons"]:checked')
    if (pl1Checked === null || pl2Checked === null) {
        X = 'X'
        O = 'O'
    } else {
        X = pl1Checked.value
        O = pl2Checked.value
    }
    console.log(pl1Checked, pl2Checked)
    console.log(X, O)
}

let counter = 0

function handleTurn(event) {

    let selectedTile = event.target
    printLetter(selectedTile)
    let gameMatrix = makeGameMatrix()
    let catsGame = checkForCats(gameMatrix)

    if (catsGame === true) {
        gameTiles.forEach(tile => tile.disabled = true)
        resultPara.textContent = 'Cats game'
    }

    let [winner, outcome] = checkForWin(gameMatrix)

    if (outcome) {
        resultPara.textContent = `${winner} wins!`
        if (winner === X) {
            let currScore = Number(p1Score.textContent)
            p1Score.textContent = ++currScore
        } else if (winner === O) {
            let currScore = Number(p2Score.textContent)
            p2Score.textContent = ++currScore
        }
        gameTiles.forEach(tile => tile.disabled = true)
    }
}

function handleReset() {
    gameTiles.forEach(tile => tile.textContent = '#')
    gameTiles.forEach(tile => tile.disabled = false)
    gameTiles.forEach(tile => tile.style.color = '#EFE7DA')
    resultPara.textContent = 'New Game!'
}

function printLetter(selectedTile) {
    if (selectedTile.textContent === '#') {
        if (counter % 2 === 0) {
            selectedTile.textContent = X
        } else {
            selectedTile.textContent = O
        }
        selectedTile.style.color = 'black'
        counter++
    }
}

function makeGameMatrix() {
    let matrix = []
    let whitespaceRX = /\s/g
    for (let div of columns) {
        let columnContent
        columnContent = div.textContent.replace(whitespaceRX, '').split('')
        matrix.push(columnContent)
    }
    return matrix
}

function checkForCats(matrix) {
    let allSpaces = matrix.flat()
    return (allSpaces.includes('#') ? false : true)
}

function checkForWin(matrix) {
    // returns true for win
    // returns false for loss

    let x0 = matrix[0]
    let x1 = matrix[1]
    let x2 = matrix[2]

    const testX = (element) => {
         return element === X
    }
    const testO = element => {
        return element === O
    }
    for (let column of matrix) {
        if (column.every(testX)) {
            return [X, true]
        } else if (column.every(testO)) {
            return [O, true]
        }
    }
    for (let y in matrix) {
        y = Number(y)
        if (x0[y] === x1[y] && x1[y] === x2[y] && x0[y] !== '#') {
            return [x0[y], true]
        }
    }
    if (x0[0] === x1[1] && x1[1] === x2[2] && x0[0] !== '#') {
        return [x0[0], true]
    }
    if (x0[2] === x1[1] && x1[1] === x2[0] && x0[2] !== '#') {
        return [x0[2], true]
    }
    return ['#', false]
}
