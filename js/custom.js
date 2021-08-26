let play1Name = document.querySelectorAll('h3')[0]
let play2Name = document.querySelectorAll('h3')[1]
let pl1NameInput = document.querySelector('.player-1-name')
let pl2NameInput = document.querySelector('.player-2-name')
let submitBtn = document.querySelector('.pop-up-btn')
let popUp = document.querySelector('.pop-up')
let overlay = document.querySelector('.overlay')

submitBtn.addEventListener('click', handlePopUp)
popUp.addEventListener('keyup', handleEnterForPopUp)

function handlePopUp() {
    changeNames()
    popUp.style.display = 'none';
    popUp.style.zIndex = -1;
    overlay.style.opacity = 1;
}

function handleEnterForPopUp(event) {
    console.log(event.keyCode)
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