var svg, path;

function preload() {
    const buildCost = loadJSON("./models/data/buildCost.json")
    const quality = loadJSON("./models/data/quality.json")
    const energyDemand = loadJSON("./models/data/energyDemand.json")
    const energyProduction = loadJSON("./models/data/energyProduction.json")
    const modifiers = loadJSON("./models/data/modifiers.json")
    const pollution = loadJSON("./models/data/quality.json")

    svg = loadSVG('images/mapOfEurope.svg');
    frameRate(20);

}

function setup() {
    createCanvas(600, 500, SVG);
    image(svg, 0, 0, 600, 500);
    
    path = querySVG('path');
    for (let i = 0; i < path.length; i++) {
        if (path[i].id() !== "") {
            path[i].attribute('onclick', 'countryOnClick( path[' + i + '])');
        }
    }
}
  
function draw() {

}

function countryOnClick(pathOfCountry) {
    pathOfCountry.attribute('fill', 'red');
    console.log(pathOfCountry.id());
}
