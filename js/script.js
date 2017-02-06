let box = []
const colorButton = function(display) {
    this.display = display
    this.red = null
    this.green = null
    this.blue = null
    this.color = function() {
        return "rgb(" + this.red + "," + this.green + "," + this.blue + ")"
    }
    this.scramble = function() {
      this.red = Math.floor(Math.random() * 255)
      this.green = Math.floor(Math.random() * 255)
      this.blue = Math.floor(Math.random() * 255)
      this.display.style.backgroundColor = this.color()
    }
    this.scramble()
    this.showHide = function() {
        this.display.classList.toggle("hidden")
    }
}

for (let i = 0; i < 6; i++) {
    box[i] = new colorButton(document.querySelector("#c" + i))
}

let targetNum = {
    red: Math.floor(Math.random() * 255),
    redDisplay: document.querySelector("#redCode"),
    green: Math.floor(Math.random() * 255),
    greenDisplay: document.querySelector("#greenCode"),
    blue: Math.floor(Math.random() * 255),
    blueDisplay: document.querySelector("#blueCode")
}

targetNum.updateDisplay = function() {
    this.redDisplay.textContent = this.red
    this.greenDisplay.textContent = this.green
    this.blueDisplay.textContent = this.blue
}

targetNum.color = function() {
    return "rgb(" + this.red + "," + this.green + "," + this.blue + ")"
}

targetNum.colorBox = function(item) {
    item.display.style.backgroundColor = this.color()
}

const randomBox = function(array) {
    let num = Math.floor(Math.random() * array.length)
    return array[num]
}
