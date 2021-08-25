// font-family: 'Chicle', cursive;
// font-family: 'Cinzel Decorative', cursive;
// font-family: 'Fjalla One', sans-serif;
// font-family: 'Oswald', sans-serif;
// font-family: 'Playfair Display SC', serif;
// font-family: 'Sacramento', cursive;
// font-family: 'Ultra', serif;
// font-family: 'Yeseva One', cursive;

// BODY 
// font-family: 'Alice', serif;
// font-family: 'EB Garamond', serif;
// font-family: 'Josefin Sans', sans-serif;
// font-family: 'Lato', sans-serif;
// font-family: 'Lustria', serif;
// font-family: 'Montserrat', sans-serif;
// font-family: 'Quattrocento', serif;
// font-family: 'Slabo 27px', serif;
// font-family: 'Source Sans Pro', sans-serif;
// font-family: 'Space Mono', monospace;

let darkEl = document.querySelector('.dark')
let lightEls = document.querySelectorAll('.light')
let acc1Els = document.querySelectorAll('.accent1')
let acc2El = document.querySelector('.accent2')
let bodyText = document.querySelectorAll('.b-text')
let resetColorBtn = document.querySelector('#reset')

document.body.addEventListener('keyup', handleThemeChange)

function handleThemeChange(event) {
    if (event.keyCode === 32) {
        let newDark = generateColor()
        if (newDark[2] < 50) {
            darkEl.style.color = '#EFE7DA'
        } else {
            darkEl.style.color = '#000'
        }
        darkEl.style.backgroundColor = arrayToHSL(newDark)

        let newLight = generateColor()

        checkFontColor(lightEls, newLight[2])
        lightEls.forEach(element => element.style.backgroundColor = arrayToHSL(newLight))

        let newAcc1 = generateColor()

        checkFontColor(acc1Els, newAcc1[2])
        acc1Els.forEach(element => element.style.backgroundColor = arrayToHSL(newAcc1))
        resetColorBtn.backgroundColor = arrayToHSL(newAcc1)

        let newAcc2 = generateColor()

        if (newAcc2[2] < 50) {
            acc2El.style.color = '#EFE7DA'
        } else {
            acc2El.style.color = '#000'
        }
        acc2El.style.backgroundColor = arrayToHSL(newAcc2)


    }
}

function generateColor() {
    let hue = Math.floor(Math.random() * 360)
    let saturation = Math.floor(Math.random() * 100)
    let lightness = Math.floor(Math.random() * 100)
    return [hue, saturation, lightness]
}

function checkFontColor(list, lightness) {
    if (lightness < 50) {
        list.forEach(element => element.style.color = '#FFF')
    } else {
        list.forEach(element => element.style.color = '#000')
    }
}

function arrayToHSL(array) {
    array[1] += '%'
    array[2] += '%'
    array = array.join(',')
    return `hsl(${array})`
}