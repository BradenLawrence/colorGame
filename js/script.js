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
    this.scramble = function(targetRed, targetGreen, targetBlue, threshold) {
        let limiter = 25
        this.red = randomValue()
        this.green = randomValue()
        this.blue = randomValue()
        // If our random value is too close to our target value, get a new random value.
        // Limited to running 25 times. Otherwise if the color threshold is set too high, this would run forever.
        for(let i=0; (Math.abs(this.red - targetRed)<threshold) && i<limiter; i++) {
          this.red = randomValue()
        }
        for(let i=0; (Math.abs(this.green - targetGreen)<threshold) && i<limiter; i++) {
          this.green = randomValue()
        }
        for(let i=0; (Math.abs(this.blue - targetBlue)<threshold) && i<limiter; i++) {
          this.blue = randomValue()
        }
        this.updateDisplay()
    }
    this.hide = function() {
        this.display.classList.add("shrinkOut")
    }
    this.show = function() {
        this.display.classList.remove("shrinkOut")
    }
    this.display.addEventListener("click", boxClicked.bind(this))
}

// Click handler for when an onscreen box is clicked
const boxClicked = function() {
    if (this.color() === myTargetNum.color()) {
        resetGame()
        streak.add(1)
    } else {
        this.hide()
        streak.reset()
    }
}

// Random number between 0 and 255
const randomValue = function() {
  return Math.floor(Math.random() * 255)
}

const rerollColors = function(array, myTarget, myThreshold) {
    for (let i = 0; i < array.length; i++) {
        array[i].scramble(myTarget.red,
                          myTarget.green,
                          myTarget.blue,
                          myThreshold)
    }
}

const revealAll = function(array) {
    for (let i = 0; i < array.length; i++) {
        array[i].show()
    }
}

const resetGame = function() {
    myTargetNum.scramble()
    rerollColors(difficulty.current.boxes, myTargetNum, difficulty.current.threshold)
    myTargetNum.colorBox(randomBox(difficulty.current.boxes))
    revealAll(difficulty.current.boxes)
}

// Declare the onscreen boxes as colorButtons, based on our definition
for (let i = 0; i < 6; i++) {
    allBoxes[i] = new colorButton("box" + i, document.querySelector("#c" + i))
}

// Hide all boxes of a given array. The boxes that will be visible are controlled by the difficulty setting
const hideBoxes = function(array) {
    for(let i = 0; i < array.length; i++) {
        array[i].hide()
    }
}
hideBoxes(allBoxes) // Hide all onscreen boxes. They will be revealed again based on the difficulty setting.

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
              streak.reset()
          },
          deactivate: function() {
              this.displayBtn.classList.remove("btn-primary")
          },
          max: 3,
          boxes: [],
          // Prevents other colors from being too close to our target color.
          threshold: 50
      },
      normal: {
          displayBtn: document.querySelector("#normalBtn"),
          activate: function() {
              hideBoxes(allBoxes)
              difficulty.current = this
              this.displayBtn.classList.add("btn-primary")
              revealAll(this.boxes)
              streak.reset()
          },
          deactivate: function() {
              this.displayBtn.classList.remove("btn-primary")
          },
          max: 6,
          boxes: [],
          // Prevents other colors from being too close to our target color.
          threshold: 25
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

// Create winning streak tracker
let streak = {
    value: null,
    displayNum: document.querySelector("#streakNum"),
    update: function() {
        this.displayNum.textContent = this.value
    },
    add: function(x) {
        this.value += x
        this.update()
        return this.value
    },
    reset: function() {
        this.value = 0
        this.update()
        return this.value
    }
}

// Game defaults to normal difficulty
difficulty.normal.activate()

resetGame()
