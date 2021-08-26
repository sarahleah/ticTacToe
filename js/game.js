let gameBoard = document.querySelector('.game-board')
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
}

let counter = 0

function handleTurn(event) {
    let gameTiles = document.querySelectorAll('button.game-tile')
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

        if (winner === X) {
            let currScore = Number(p1Score.textContent)
            p1Score.textContent = ++currScore
        } else if (winner === O) {
            let currScore = Number(p2Score.textContent)
            p2Score.textContent = ++currScore
        }
        if (winner === X) {
            winner = document.querySelector('.accent1 > h3').textContent.split('')
        } else {
            winner = document.querySelector('.accent2 > h3').textContent.split('')
        }

        winner.pop()
        winner = winner.join('')
        
        resultPara.textContent = `${winner} wins!`
        gameTiles.forEach(tile => tile.disabled = true)
    }
}

function handleReset() {
    let gameTiles = document.querySelectorAll('button.game-tile')
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
    let columns = document.querySelectorAll('.column')
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

    // checks if every element in an array is X
    const testX = (element) => {
         return element === X
    }

    // checks if every element in an array is X
    const testO = element => {
        return element === O
    }

    function runTests(array) {
        if (array.every(testX)) {
            return X
        } else if (array.every(testO)) {
            return O
        }
        return false
    }

    // for each column of matrix -> checks if it passes above tests
    for (let column of matrix) {
        let testResult = runTests(column)
        if (testResult) {
            return [testResult, true]
        }
    }

    // checks for diag up
    let rowTestArray = []
    let rowNum = 0
    while (rowNum < matrix.length) {
        matrix.forEach(column => {
            rowTestArray.push(column[rowNum])
        })
        let testResult = runTests(rowTestArray)
        if (testResult) {
            return [testResult, true]
        }
        rowTestArray.length = 0
        rowNum++
    }

    let i = 0
    for (let column of matrix) {
        rowTestArray.push(column[i])
        i++
    }
    let testResult = runTests(rowTestArray)
    if (testResult) {
        return [testResult, true]
    }
    rowTestArray.length = 0

    i = matrix.length - 1
    for (let column of matrix) {
        rowTestArray.push(column[i])
        i--
    }

    testResult = runTests(rowTestArray)
    if (testResult) {
        return [testResult, true]
    }

    return ['#', false]
}
