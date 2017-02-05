let box = []
const colorButton = function(location) {
    this.location = location
    this.red = Math.floor(Math.random() * 255)
    this.green = Math.floor(Math.random() * 255)
    this.blue = Math.floor(Math.random() * 255)
    this.color = function(){
        return "rgb(" + this.red + "," + this.green + "," + this.blue + ")"
    }
    this.location.style.backgroundColor = this.color()
    this.visible = true
    }

for(i=0; i<5; i++){
  box[i] = new colorButton(document.querySelector("#c" + i))
}
