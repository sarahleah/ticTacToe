let gameBoard = document.querySelector('.game-board')

gameBoard.addEventListener('click', handleTurn)

let counter = 0

function handleTurn(event) {
    let selectedTile = event.target
    printLetter(selectedTile)
    let tileCoords = getTileCoords(selectedTile)
    checkForWin(tileCoords)
}

function printLetter(selectedTile) {
    if (selectedTile.textContent === '') {
        if (counter % 2 === 0) {
            selectedTile.textContent = 'X'
        } else {
            selectedTile.textContent = 'O'
        }
        counter++
    }
}

function getTileCoords(selectedTile) {
    let tileCoords = selectedTile.classList.value
    tileCoords = tileCoords.split('')
                .filter(element => Number(element))
                .map(element => Number(element))
    while (tileCoords.length < 2) {
        tileCoords.unshift(0)
    }
    return tileCoords
}

function checkForWin(tileCoords) {
    let mainTileX = tileCoords[0]
    let mainTileY = tileCoords[1]
    function diagCheck(mainTileX, mainTileY) {

    }
}