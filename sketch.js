var svg, path, canvas;

var divCountryStats, divCuntryOperations, divEuropeStats, divLogo, divMapFilters, divMapLegend;
var divCountryStats_countryName;
let countries = [];
let europe;

function preload() {
    const buildCost = loadJSON("./models/data/buildCost.json")
    const quality = loadJSON("./models/data/quality.json")
    const energyProduction = loadJSON("./models/data/energyProduction.json")
    const pollution = loadJSON("./models/data/quality.json")
    loadJSON("./models/data/countries.json", loadCountries)

    svg = loadSVG('images/mapOfEurope.svg');
    frameRate(20);

}

function setup() {
    canvas = createCanvas(600, 500, SVG);
    canvas.position(250, 10);
    image(svg, 0, 0, 600, 500);

    path = querySVG('path');
    for (let i = 0; i < path.length; i++) {
        if (path[i].id() !== "") {
            path[i].attribute('onclick', 'countryOnClick( path[' + i + '])');
            // set attribute random color
            path[i].attribute('fill', color(random(255), random(255), random(255)));



        }
    }

    divCountryStats = createDiv('Country Stats');
    divCountryStats.style('font-weight', 'bold');
    divCountryStats.position(860, 10);
    divCountryStats.child(createDiv('Country Name:'));
    divCountryStats_countryName = createDiv('none');

    divCountryStats.child(divCountryStats_countryName);

    divCountryStats.child(createDiv('Energy Demand:'));
    divCountryStats.child(createDiv('Energy Production:'));
    divCountryStats.child(createDiv('Pollution:'));
    divCountryStats.child(createDiv('Overall Cost:'));

    divCuntryOperations = createDiv('Country Operations');
    divCuntryOperations.style('font-size', '16px');
    divCuntryOperations.position(860, 400);

    divEuropeStats = createDiv('Europe Stats');
    divEuropeStats.style('font-size', '16px');
    divEuropeStats.position(10, 400);

    divLogo = createDiv('Euro Power Plant<br>Simulator');
    divLogo.style('font-size', '16px');
    divLogo.position(10, 10);

    divMapFilters = createDiv('Map Filters');
    divMapFilters.style('font-size', '16px');
    divMapFilters.position(10, 70);

    divMapLegend = createDiv('Map Legend');
    divMapLegend.style('font-size', '16px');
    divMapLegend.position(10, 200);

    europe = new Europe(countries, 1000)
}

  
function draw() {

}

function countryOnClick(pathOfCountry) {
    divCountryStats_countryName.html(pathOfCountry.id());
    for (let i = 0; i < path.length; i++) {
        if (path[i].id() !== "") {
            path[i].attribute('opacity', 1);
        }
    }
    pathOfCountry.attribute('opacity', 0.5);
}

function loadCountries(data) {
    for (const countryData of data) {
        const country = new Country(
            countryData.name,
            countryData.demand,
            new Effectiveness(
                countryData.effectiveness.atomPowerStation,
                countryData.effectiveness.windPowerStation,
                countryData.effectiveness.waterPowerStation,
                countryData.effectiveness.coalPowerStation,
                countryData.effectiveness.solarPowerStation
            ),
            countryData.powerStations
        );
        countries.push(country);
    }
}
