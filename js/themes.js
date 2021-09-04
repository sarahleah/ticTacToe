let darkEl = document.querySelector('.dark')
let lightEls = document.querySelectorAll('.light')
let acc1Els = document.querySelectorAll('.accent1')
let acc2El = document.querySelector('.accent2')
let bodyText = document.querySelectorAll('.b-text')

document.body.addEventListener('keyup', handleThemeChange)

function handleThemeChange(event) {
    if (event.keyCode === 32) {
        changeColors()
        changeFonts()
    }
}

function changeColors() {
    let newDark = generateColor()

    if (newDark[2] < 50) {
        darkEl.style.color = '#EFE7DA'
    } else {
        darkEl.style.color = '#000'
    }

    darkEl.style.backgroundColor = arrayToHSL(newDark)

    changeLightColors()
    changeAcc1Color()
    changeAcc2Color()
    
}

function generateColor() {
    let hue = Math.floor(Math.random() * 360)
    let saturation = Math.floor(Math.random() * 100)
    let lightness = Math.floor(Math.random() * 100)
    return [hue, saturation, lightness]
}

function changeLightColors() {
    let newLight = generateColor()
    
    checkFontColor(lightEls, newLight[2])
    let lightElsColor = arrayToHSL(newLight)
    lightEls.forEach(element => element.style.backgroundColor = lightElsColor)
}

function changeAcc1Color() {
    let newAcc1 = generateColor()

    checkFontColor(acc1Els, newAcc1[2])
    let acc1ElsColor = arrayToHSL(newAcc1)
    acc1Els.forEach(element => element.style.backgroundColor = acc1ElsColor)
}

function changeAcc2Color() {
    let newAcc2 = generateColor()
    
    if (newAcc2[2] < 50) {
        acc2El.style.color = '#EFE7DA'
    } else {
        acc2El.style.color = '#000'
    }
    
    acc2El.style.backgroundColor = arrayToHSL(newAcc2)
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

function changeFonts() {
    let headerFonts = [ "'Chicle', cursive", "'Cinzel Decorative', cursive", "'Fjalla One', sans-serif", "'Oswald', sans-serif", "'Playfair Display SC', serif", "'Sacramento', cursive", "'Ultra', serif", "'Yeseva One', cursive"
    ]
    let bodyFonts = ["'Alice', serif","'EB Garamond', serif","'Josefin Sans', sans-serif","'Lato', sans-serif","'Lustria', serif","'Montserrat', sans-serif","'Quattrocento', serif","'Slabo 27px', serif","'Source Sans Pro', sans-serif","'Space Mono', monospace",
    ]
    let randomHeaderFont = headerFonts[Math.floor(Math.random() * headerFonts.length)]
    console.log(randomHeaderFont)

    let randomBodyFont = bodyFonts[Math.floor(Math.random() * bodyFonts.length)]
    console.log(randomBodyFont)

    document.body.style.fontFamily = randomHeaderFont
    let bodyFontItems = document.querySelectorAll('.b-text')
    bodyFontItems.forEach(element => element.style.fontFamily = randomBodyFont)
}
