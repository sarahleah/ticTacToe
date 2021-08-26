let play1Name = document.querySelectorAll('h3')[0]
let play2Name = document.querySelectorAll('h3')[1]
let pl1NameInput = document.querySelector('.player-1-name')
let pl2NameInput = document.querySelector('.player-2-name')
let submitBtn = document.querySelector('.pop-up-btn')
let popUp = document.querySelector('.pop-up')
let overlay = document.querySelector('.overlay')
let radios = document.querySelectorAll('input[type="radio"]')
let ply1Icons = document.querySelectorAll('input[name="pl1-icons"]')
let ply2Icons = document.querySelectorAll('input[name="pl2-icons"]')
let gameBoardDiv = document.querySelector('.game-board')
let boardSize = document.querySelector('.grid-size')

radios.forEach(element => element.addEventListener('click', handleRadioClick))

submitBtn.addEventListener('click', handlePopUp)
popUp.addEventListener('keyup', handleEnterForPopUp)

function handleRadioClick(event) {
    let selectedRadio = event.target
    let valueToDisable = selectedRadio.value
    if (selectedRadio.name === 'pl1-icons') {
        ply2Icons.forEach(element => {
            if (element.value === valueToDisable) {
                element.disabled = true
            }
            else {
                element.disabled = false
            }
        })
    } else if (selectedRadio.name === 'pl2-icons') {
        ply1Icons.forEach(element => {
            if (element.value === valueToDisable) {
                element.disabled = true
            }
            else {
                element.disabled = false
            }
        })
    }
    let valueToRemove = selectedRadio.value
}

function handlePopUp() {
    changeNames()
    makeBoard()
    popUp.style.display = 'none';
    popUp.style.zIndex = -1;
    overlay.style.opacity = 1;
}

function handleEnterForPopUp(event) {
    if (event.keyCode === 13) {
        handlePopUp()
    }
}

function changeNames() {
    if (!pl1NameInput.value || !pl2NameInput.value) {
        play1Name.textContent = 'Player One:'
        play2Name.textContent = 'Player Two:'
    } else {
        play1Name.textContent = pl1NameInput.value + ':'
        play2Name.textContent = pl2NameInput.value + ':'
    }
}

function makeBoard() {
    let gridSize = Number(boardSize.value)
    for (let i = 0; i < gridSize; i ++) {
        let div = document.createElement('div')
        div.setAttribute('class', 'column')
        gameBoardDiv.appendChild(div)
        let columns = document.querySelectorAll('.column')
        let column = columns[i]
        for (let j = 0; j < gridSize; j++) {
            let button = document.createElement('button')
            button.setAttribute('class', 'game-tile')
            button.textContent = '#'
            column.appendChild(button)
        }
    }
    gameBoardDiv.style.display = 'grid'
    gameBoardDiv.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`
    console.log(gridSize)
}

// TODO: make pop-up the settings menu