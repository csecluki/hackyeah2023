var svg, path, canvas;

var divMainCointainer, divControlPanelLeft, divControlPanelRight, divMapPanel;
var divCountryStats, divCuntryOperations, divEuropeStats, divLogo, divMapFilters, divMapLegend;
var divCountryStats_countryName, divCountryStats_countryDemand, divCountryStats_countryProduction, divCountryStats_countryPollution, divCountryStats_countryOverallCost;
var divCountryStats_europeDemand, divCountryStats_europeProduction, divCountryStats_europePollution, divCountryStats_europeOverallCost;
let countries = [];
let europe;
let selectedCountry

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
    selectedCountry = europe.countries.filter(country => country.name === "France")[0]

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


    // ======================================================

    divCountryStats = createDiv().class('controlContainer');
    divControlPanelRight.child(divCountryStats);
    divCountryStats.child(createDiv('Country Stats').class('controlHeader'));

    divCountryStats.child(createDiv('Country Name:').class('controlLabel'));
    divCountryStats_countryName = createDiv(selectedCountry.name).class('controlValue');
    divCountryStats.child(divCountryStats_countryName);

    divCountryStats.child(createDiv('Energy Demand:').class('controlLabel'));
    divCountryStats_countryDemand = createDiv(selectedCountry.demand).class('controlValue');
    divCountryStats.child(divCountryStats_countryDemand);

    divCountryStats.child(createDiv('Energy Production:').class('controlLabel'));
    divCountryStats_countryProduction = createDiv(selectedCountry.getProduction()).class('controlValue');
    divCountryStats.child(divCountryStats_countryProduction);

    divCountryStats.child(createDiv('Pollution:').class('controlLabel'));
    divCountryStats_countryPollution = createDiv(selectedCountry.getPollution()).class('controlValue');
    divCountryStats.child(divCountryStats_countryPollution);

    divCountryStats.child(createDiv('Overall Cost:').class('controlLabel'));
    divCountryStats_countryOverallCost = createDiv(selectedCountry.getTotalCost()).class('controlValue');
    divCountryStats.child(divCountryStats_countryOverallCost);

    divCuntryOperations = createDiv().class('controlContainer');
    divControlPanelRight.child(divCuntryOperations);
    divCuntryOperations.child(createDiv('Country Operations').class('controlHeader'));

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
            path[i].attribute('fill', color(random(255), random(255), random(255)));
        }
    }
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
    selectedCountry = europe.countries.filter(country => country.name === pathOfCountry.id())[0]
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
