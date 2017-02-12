// Array that will hold our onscreen boxes
let allBoxes = []

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
    this.hide = function() {
        this.display.classList.add("hidden")
    }
    this.show = function() {
        this.display.classList.remove("hidden")
    }
    this.display.addEventListener("click", boxClicked.bind(this))
}

// Click handler for when an onscreen box is clicked
const boxClicked = function() {
    console.log(this.name + ": " + this.color())
    console.log("Target: " + myTargetNum.color())
    if (this.color() === myTargetNum.color()) {
        console.log("Correct!")
        resetGame()
    } else {
        console.log("Incorrect!")
        this.hide()
    }
}

const rerollColors = function(array) {
    for (let i = 0; i < array.length; i++) {
        array[i].scramble()
    }
}

const revealAll = function(array) {
    for (let i = 0; i < array.length; i++) {
        array[i].show()
    }
}

const resetGame = function() {
    rerollColors(difficulty.current.boxes)
    myTargetNum.scramble()
    myTargetNum.colorBox(randomBox(difficulty.current.boxes))
    revealAll(difficulty.current.boxes)
}

// Declare the onscreen boxes as colorButtons, based on our definition
for (let i = 0; i < 6; i++) {
    allBoxes[i] = new colorButton("box" + i, document.querySelector("#c" + i))
}

// Hide all boxes. The boxes that will be visible are controlled by the difficulty setting
const hideBoxes = function(array) {
    for(let i = 0; i < array.length; i++) {
        array[i].hide()
    }
}
hideBoxes(allBoxes)

// Create difficulty buttons
let difficulty = {
      current: null,
      easy: {
          displayBtn: document.querySelector("#easyBtn"),
          activate: function() {
              hideBoxes(allBoxes)
              difficulty.current = this
              this.displayBtn.classList.add("btn-primary")
              difficulty.normal.displayBtn.classList.remove("btn-primary")
              revealAll(this.boxes)
          },
          deactivate: function() {
              this.displayBtn.classList.remove("btn-primary")
          },
          max: 3,
          boxes: []
      },
      normal: {
          displayBtn: document.querySelector("#normalBtn"),
          activate: function() {
              hideBoxes(allBoxes)
              difficulty.current = this
              this.displayBtn.classList.add("btn-primary")
              revealAll(this.boxes)
          },
          deactivate: function() {
              this.displayBtn.classList.remove("btn-primary")
          },
          max: 6,
          boxes: []
      }
    }

const difficultyClicked = function(x) {
  if(x.target !== difficulty.current.displayBtn) {   // If the button you clicked is not already active
      if(x.target === difficulty.easy.displayBtn) {
          difficulty.easy.activate()
          difficulty.normal.deactivate()
      } else if(x.target === difficulty.normal.displayBtn) {
          difficulty.normal.activate()
          difficulty.easy.deactivate()
      }
      resetGame()
  }
}

difficulty.easy.displayBtn.addEventListener("click", difficultyClicked)
difficulty.normal.displayBtn.addEventListener("click", difficultyClicked)

const assignBoxes = function(allBoxes, difficultyObject) {
    for(let i=0; i<difficultyObject.max; i++) {
        difficultyObject.boxes[i] = allBoxes[i]
    }
}
assignBoxes(allBoxes, difficulty.easy)
assignBoxes(allBoxes, difficulty.normal)

difficulty.normal.activate()     // Game defaults to normal difficulty


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
myTargetNum.colorBox(randomBox(difficulty.current.boxes))
