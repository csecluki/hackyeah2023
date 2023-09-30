function preload() {
    const buildCost = loadJSON("./models/data/buildCost.json")
    const quality = loadJSON("./models/data/quality.json")
    const energyDemand = loadJSON("./models/data/energyDemand.json")
    const energyProduction = loadJSON("./models/data/energyProduction.json")
    const modifiers = loadJSON("./models/data/modifiers.json")
    const pollution = loadJSON("./models/data/quality.json")
}

function setup() {
    createCanvas(400, 400);
}
  
function draw() {
    background(220);
}
