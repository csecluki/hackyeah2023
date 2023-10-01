var svg, path, canvas;

var divMainCointainer, divControlPanelLeft, divControlPanelRight, divMapPanel;
var divCountryStats, divCuntryOperations, divEuropeStats, divLogo, divMapFilters, divMapLegend;
var divCountryStats_countryName, divCountryStats_countryDemand, divCountryStats_countryProduction, divCountryStats_countryPollution, divCountryStats_countryOverallCost;
var divCountryStats_europeDemand, divCountryStats_europeProduction, divCountryStats_europePollution, divCountryStats_europeOverallCost, divCountryStats_europeRemainingFunds;
let countries = [];
let europe;
let selectedCountry;
let filterSelector;

let inputAtomicPowerStation, inputWindPowerStation, inputWaterPowerStation, inputCoalPowerStation, inputSolarPowerStation;

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
    europe = new Europe(countries, 1000)

    // ======================================================

    divMainCointainer = createDiv().class('mainContainer');
    divControlPanelLeft = createDiv().class('controlPanel');
    divMapPanel = createDiv().class('mapPanel');
    divControlPanelRight = createDiv().class('controlPanel');

    divMainCointainer.child(divControlPanelLeft);
    divMainCointainer.child(divMapPanel);
    divMainCointainer.child(divControlPanelRight);

    // ======================================================

    divLogo = createDiv().class('controlContainer');
    divControlPanelLeft.child(divLogo);
    divLogo.child(createDiv('Euro Power Plant<br>Simulator').class('logo'));

    divMapFilters = createDiv().class('controlContainer');
    divControlPanelLeft.child(divMapFilters);
    divMapFilters.child(createDiv('Map Filters').class('controlHeader'));
    filterSelector = createSelect();
    filterSelector.option('Pollution');
    filterSelector.option('Production');
    filterSelector.option('Demand');
    filterSelector.option('Demand Satisfaction');
    filterSelector.changed(filterChanged)
    filterSelector.selected('Pollution');
    divMapFilters.child(filterSelector);

    divMapLegend = createDiv().class('controlContainer');
    divControlPanelLeft.child(divMapLegend);
    divMapLegend.child(createDiv('Map Legend').class('controlHeader'));

    divEuropeStats = createDiv().class('controlContainer');
    divControlPanelLeft.child(divEuropeStats);
    divEuropeStats.child(createDiv('Europe Stats').class('controlHeader'));

    divEuropeStats.child(createDiv('Energy Demand:').class('controlLabel'));
    divCountryStats_europeDemand = createDiv(europe.getTotalDemand()).class('controlValue');
    divEuropeStats.child(divCountryStats_europeDemand);

    divEuropeStats.child(createDiv('Energy Production:').class('controlLabel'));
    divCountryStats_europeProduction = createDiv(europe.getTotalProduction()).class('controlValue');
    divEuropeStats.child(divCountryStats_europeProduction);

    divEuropeStats.child(createDiv('Pollution:').class('controlLabel'));
    divCountryStats_europePollution = createDiv(europe.getAveragePollution()).class('controlValue');
    divEuropeStats.child(divCountryStats_europePollution);

    divEuropeStats.child(createDiv('Overall Cost:').class('controlLabel'));
    divCountryStats_europeOverallCost = createDiv(europe.getTotalCost()).class('controlValue');
    divEuropeStats.child(divCountryStats_europeOverallCost);

    divEuropeStats.child(createDiv('Remaining Funds:').class('controlLabel'));
    divCountryStats_europeRemainingFunds = createDiv(europe.funds).class('controlValue');
    divEuropeStats.child(divCountryStats_europeRemainingFunds);


    // ======================================================

    divCountryStats = createDiv().class('controlContainer');
    divControlPanelRight.child(divCountryStats);
    divCountryStats.child(createDiv('Country Stats').class('controlHeader'));

    divCountryStats.child(createDiv('Country Name:').class('controlLabel'));
    divCountryStats_countryName = createDiv('-').class('controlValue');
    divCountryStats.child(divCountryStats_countryName);

    divCountryStats.child(createDiv('Energy Demand:').class('controlLabel'));
    divCountryStats_countryDemand = createDiv('-').class('controlValue');
    divCountryStats.child(divCountryStats_countryDemand);

    divCountryStats.child(createDiv('Energy Production:').class('controlLabel'));
    divCountryStats_countryProduction = createDiv('-').class('controlValue');
    divCountryStats.child(divCountryStats_countryProduction);

    divCountryStats.child(createDiv('Pollution:').class('controlLabel'));
    divCountryStats_countryPollution = createDiv('-').class('controlValue');
    divCountryStats.child(divCountryStats_countryPollution);

    divCountryStats.child(createDiv('Overall Cost:').class('controlLabel'));
    divCountryStats_countryOverallCost = createDiv('-').class('controlValue');
    divCountryStats.child(divCountryStats_countryOverallCost);

    divCuntryOperations = createDiv().class('controlContainer');
    divControlPanelRight.child(divCuntryOperations);
    divCuntryOperations.child(createDiv('Country Operations').class('controlHeader'));


    inputAtomicPowerStation = createInput(0, 'number').class('controlValue').attribute('disabled', '');
    divCuntryOperations.child(createDiv('Atomic Power Station:').class('controlLabel'));
    divCuntryOperations.child(inputAtomicPowerStation);
    divCuntryOperations.child(createDiv('<button onclick="decreaseAtomicPowerStation()">-</button>&nbsp;<button onclick="increaseAtomicPowerStation()">+</button>').class('controlLabel'));

    inputWindPowerStation = createInput(0, 'number').class('controlValue').attribute('disabled', '');
    divCuntryOperations.child(createDiv('Wind Power Station:').class('controlLabel'));
    divCuntryOperations.child(inputWindPowerStation);
    divCuntryOperations.child(createDiv('<button onclick="decreaseWindPowerStation()">-</button>&nbsp;<button onclick="increaseWindPowerStation()">+</button>').class('controlLabel'));

    inputWaterPowerStation = createInput(0, 'number').class('controlValue').attribute('disabled', '');
    divCuntryOperations.child(createDiv('Water Power Station:').class('controlLabel'));
    divCuntryOperations.child(inputWaterPowerStation);
    divCuntryOperations.child(createDiv('<button onclick="decreaseWaterPowerStation()">-</button>&nbsp;<button onclick="increaseWaterPowerStation()">+</button>').class('controlLabel'));

    inputCoalPowerStation = createInput(0, 'number').class('controlValue').attribute('disabled', '');
    divCuntryOperations.child(createDiv('Coal Power Station:').class('controlLabel'));
    divCuntryOperations.child(inputCoalPowerStation);
    divCuntryOperations.child(createDiv('<button onclick="decreaseCoalPowerStation()">-</button>&nbsp;<button onclick="increaseCoalPowerStation()">+</button>').class('controlLabel'));

    inputSolarPowerStation = createInput(0, 'number').class('controlValue').attribute('disabled', '');
    divCuntryOperations.child(createDiv('Solar Power Station:').class('controlLabel'));
    divCuntryOperations.child(inputSolarPowerStation);
    divCuntryOperations.child(createDiv('<button onclick="decreaseSolarPowerStation()">-</button>&nbsp;<button onclick="increaseSolarPowerStation()">+</button>').class('controlLabel'));

    // ======================================================

    const canvasWidth = 600;
    const canvasHeight = 500;

    canvas = createCanvas(canvasWidth, canvasHeight, SVG);
    canvas.parent(divMapPanel);
    image(svg, 0, 0, canvasWidth, canvasHeight);

    path = querySVG('path');
    for (let i = 0; i < path.length; i++) {
        if (path[i].id() !== "") {
            path[i].attribute('onclick', 'countryOnClick( path[' + i + '])');
            // set attribute random color
            // path[i].attribute('fill', color(random(255), random(255), random(255)));
        }
    }
}

  
function draw() {

}

function increaseAtomicPowerStation() {
}

function decreaseAtomicPowerStation() {
}

function increaseWindPowerStation() {

}

function decreaseWindPowerStation() {

}

function increaseWaterPowerStation() {

}

function decreaseWaterPowerStation() {


}

function increaseCoalPowerStation() {

}

function decreaseCoalPowerStation() {

}

function increaseSolarPowerStation() {

}

function decreaseSolarPowerStation() {

}



function countryOnClick(pathOfCountry) {
    for (let i = 0; i < path.length; i++) {
        if (path[i].id() !== "") {
            path[i].attribute('opacity', 1);
        }
    }
    pathOfCountry.attribute('opacity', 0.5);
    selectedCountry = europe.countries.filter(country => country.name === pathOfCountry.id())[0]
    divCountryStats_countryName.html(selectedCountry.name);
    divCountryStats_countryDemand.html(selectedCountry.demand);
    divCountryStats_countryProduction.html(selectedCountry.getProduction());
    divCountryStats_countryPollution.html(selectedCountry.getPollution());
    divCountryStats_countryOverallCost.html(selectedCountry.getTotalCost());
}

function loadCountries(data) {
    for (const countryData of data) {
        const country = new Country(
            countryData.name,
            countryData.demand,
            new Effectiveness(
                countryData.effectiveness.atomicPowerStation,
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

function filterChanged() {
    let item = filterSelector.value();
    switch (item) {
        case 'Pollution':
            const maxPollution = countries.reduce(
                (max, country) => { return country.getPollution() > max ? country.getPollution() : max;},
                countries[0].getPollution());
            for (let i = 0; i < path.length; i++) {
                if (path[i].id() !== '') {
                    let country = countries.filter(c => c.name === path[i].id())[0]
                    let red = Math.round(country.getPollution() * 255 / maxPollution)
                    let green = 255 - red
                    path[i].attribute('fill', color(red, green, 0));
                }
            }
            break
        case 'Production':
            const maxProduction = countries.reduce(
                (max, country) => { return country.getProduction() > max ? country.getProduction() : max;},
                countries[0].getProduction());
            for (let i = 0; i < path.length; i++) {
                if (path[i].id() !== '') {
                    let country = countries.filter(c => c.name === path[i].id())[0]
                    let green = Math.round(country.getProduction() * 255 / maxProduction)
                    let red = 255 - green
                    path[i].attribute('fill', color(red, green, 0));
                }
            }
            break
        case 'Demand':
            const maxDemand = countries.reduce(
                (max, country) => { return country.getDemand() > max ? country.getDemand() : max;},
                countries[0].getDemand());
            for (let i = 0; i < path.length; i++) {
                if (path[i].id() !== '') {
                    let country = countries.filter(c => c.name === path[i].id())[0]
                    let green = Math.round(country.getDemand() * 255 / maxDemand)
                    let red = 255 - green
                    path[i].attribute('fill', color(red, green, 0));
                }
            }
            break
        case 'Demand Satisfaction':
            for (let i = 0; i < path.length; i++) {
                if (path[i].id() !== '') {
                    let country = countries.filter(c => c.name === path[i].id())[0]
                    let green = Math.round(Math.min(country.getProduction() / country.getDemand(), 1) * 255)
                    let red = 255 - green
                    path[i].attribute('fill', color(red, green, 0));
                }
            }
    }
}
