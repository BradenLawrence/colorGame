// Array that will hold our onscreen boxes
let box = []

// Click handler for when an onscreen box is clicked
const boxClicked = function() {
  console.log(this.name + ": " + this.color())
  console.log("Target: " + myTargetNum.color())
  if(this.color() === myTargetNum.color()) {
    console.log("Correct!")
  } else {
    console.log("Incorrect!")
  }
}

// Function to let us select a box at random.
// Will be used to turn one of the boxes into the correct answer.
const randomBox = function(array) {
    let num = Math.floor(Math.random() * array.length)
    return array[num]
}

// Definition for the color boxes
const colorButton = function(name, display) {
    this.name = name
    this.display = display
    this.red = null
    this.green = null
    this.blue = null
    this.color = function() {
        return "rgb(" + this.red + "," + this.green + "," + this.blue + ")"
    }
    this.updateDisplay = function() {
      this.display.style.backgroundColor = this.color()
    }
    this.scramble = function() {
      this.red = Math.floor(Math.random() * 255)
      this.green = Math.floor(Math.random() * 255)
      this.blue = Math.floor(Math.random() * 255)
      this.updateDisplay()
    }
    this.scramble()
    this.showHide = function() {
        this.display.classList.toggle("hidden")
    }
    this.display.addEventListener("click", boxClicked.bind(this))
}

// Declare the onscreen boxes as colorButtons, based on our definition
for (let i = 0; i < 6; i++) {
    box[i] = new colorButton("box" + i, document.querySelector("#c" + i))
}

// Definition for the color number players will compare the boxes to
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
      item.red = this.red
      item.green = this.green
      item.blue = this.blue
      item.updateDisplay()
  }
}

// Defining the three onscreen numbers as the target number
let myTargetNum = new targetNum(document.querySelector("#redCode"),
                                document.querySelector("#greenCode"),
                                document.querySelector("#blueCode"))

// Recolors one of the boxes onscreen to match the target number
myTargetNum.colorBox(randomBox(box))
