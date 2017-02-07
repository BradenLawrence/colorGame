let box = []


const boxClicked = function(e) {
  console.log("Hi, this is " + this.name + "!")
}

const colorButton = function(name, id, display) {
    let _this = this
    this.name = name
    this.id = id
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
    this.display.addEventListener("click", boxClicked.bind(this))
}

for (let i = 0; i < 6; i++) {
    box[i] = new colorButton("box" + i, "c" + i, document.querySelector("#c" + i))
}

const targetNum = function(redDisplay, greenDisplay, blueDisplay) {
  this.red = null
  this.redDisplay = redDisplay
  this.green = null
  this.greenDisplay = greenDisplay
  this.blue = null
  this.blueDisplay = blueDisplay
  this.color = function() {
      return "rgb(" + this.red + "," + this.green + "," + this.blue + ")"
  }
  this.updateDisplay = function() {
    this.redDisplay.textContent = this.red
    this.greenDisplay.textContent = this.green
    this.blueDisplay.textContent = this.blue
  }
  this.scramble = function() {
    this.red = Math.floor(Math.random() * 255)
    this.green = Math.floor(Math.random() * 255)
    this.blue = Math.floor(Math.random() * 255)
    this.updateDisplay()
  }
  this.scramble()
  this.colorBox = function(item) {
      item.display.style.backgroundColor = this.color()
  }
}

let myTargetNum = new targetNum(document.querySelector("#redCode"),
                                document.querySelector("#greenCode"),
                                document.querySelector("#blueCode"))

const randomBox = function(array) {
    let num = Math.floor(Math.random() * array.length)
    return array[num]
}

myTargetNum.colorBox(randomBox(box))
