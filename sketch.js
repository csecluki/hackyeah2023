function preload() {
    const json = loadJSON('./models/data/buildCost.json')
    console.log(json)
}

function setup() {
    createCanvas(400, 400);
  }
  
  function draw() {
    background(220);
  } 