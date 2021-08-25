let gameBoard = document.querySelector('.game-board')
let columns = document.querySelectorAll('.column')

gameBoard.addEventListener('click', handleTurn)

let counter = 0

function handleTurn(event) {
    let selectedTile = event.target
    printLetter(selectedTile)
    let result = checkForWin(makeGameMatrix())
    if (result) {
        console.log('win')
    } else {
        console.log('nothing yet')
    }
}

function printLetter(selectedTile) {
    if (selectedTile.textContent === '#') {
        if (counter % 2 === 0) {
            selectedTile.textContent = 'X'
        } else {
            selectedTile.textContent = 'O'
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

function checkForWin(matrix) {
    // returns true for win
    // returns false for loss

    let x0 = matrix[0]
    let x1 = matrix[1]
    let x2 = matrix[2]

    console.log(x0, x1, x2)

    const testX = (element) => {
         return element === 'X'
    }
    const testO = element => {
        return element === 'O'
    }
    for (let column of matrix) {
        if (column.every(testX) || column.every(testO)) {
            return true
        }
    }
    for (let y in matrix) {
        y = Number(y)
        console.log(typeof x)
        if (x0[y] === x1[y] && x1[y] === x2[y] && x0[y] !== '#') {
            return true
        }
    }
    if (x0[0] === x1[1] && x1[1] === x2[2] && x0[0] !== '#') {
        return true
    }
    if (x0[2] === x1[1] && x1[1] === x2[0] && x0[2] !== '#') {
        return true
    }
    return false
}