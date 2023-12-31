let svg, path, canvas;

let divMainContainer, divControlPanelLeft, divControlPanelRight, divMapPanel;
let divCountryStats, divCountryOperations, divEuropeStats, divLogo, divMapFilters, divMapLegend;
let divCountryStats_countryName, divCountryStats_countryDemand, divCountryStats_countryProduction, divCountryStats_countryPollution, divCountryStats_countryOverallCost;
let divCountryStats_europeDemand, divCountryStats_europeProduction, divCountryStats_europePollution, divCountryStats_europeOverallCost, divCountryStats_europeRemainingFunds;
let countries = [];
let europe;
let selectedCountry;
let filterSelector;
let legendHighestValue, legendLowestValue;
let energySurplus = {}

let inputAtomicPowerStation, inputWindPowerStation, inputWaterPowerStation, inputCoalPowerStation, inputSolarPowerStation;
let nextAtomicPowerStationProduction, nextWindPowerStationProduction, nextWaterPowerStationProduction, nextCoalPowerStationProduction, nextSolarPowerStationProduction;
let nextAtomicPowerStationCost, nextWindPowerStationCost, nextWaterPowerStationCost, nextCoalPowerStationCost, nextSolarPowerStationCost;

const nextStationProduction = 'Next power station: +'
const nextStationCost = 'Next power station: '

function preload() {
    loadJSON("./models/data/countries.json", loadCountries)

    svg = loadSVG('images/mapOfEurope.svg');
    frameRate(20);

}

function setup() {
    europe = new Europe(countries, 1000)

    // ======================================================

    divMainContainer = createDiv().class('mainContainer');
    divControlPanelLeft = createDiv().class('controlPanel');
    divMapPanel = createDiv().class('mapPanel');
    divControlPanelRight = createDiv().class('controlPanel');

    divMainContainer.child(divControlPanelLeft);
    divMainContainer.child(divMapPanel);
    divMainContainer.child(divControlPanelRight);

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
    filterSelector.option('Demand Satisfied');
    filterSelector.changed(filterChanged)
    filterSelector.selected('Pollution');
    divMapFilters.child(filterSelector);

    divMapLegend = createDiv().class('controlContainer');
    divControlPanelLeft.child(divMapLegend);
    divMapLegend.child(createDiv('Map Legend').class('controlHeader'));
    divMapLegend.child(createDiv('Highest').class('controlLabel'));
    divMapLegend.child(createDiv().class('gradient'));
    divMapLegend.child(createDiv('Lowest').class('controlLabel'));

    divEuropeStats = createDiv().class('controlContainer');
    divControlPanelLeft.child(divEuropeStats);
    divEuropeStats.child(createDiv('Europe Stats').class('controlHeader'));

    divEuropeStats.child(createDiv('Energy Demand:').class('controlLabel'));
    divCountryStats_europeDemand = createDiv(europe.getTotalDemand() + ' tWh').class('controlValue');
    divEuropeStats.child(divCountryStats_europeDemand);

    divEuropeStats.child(createDiv('Energy Production:').class('controlLabel'));
    divCountryStats_europeProduction = createDiv(europe.getTotalProduction() + ' tWh').class('controlValue');
    divEuropeStats.child(divCountryStats_europeProduction);

    divEuropeStats.child(createDiv('Pollution:').class('controlLabel'));
    divCountryStats_europePollution = createDiv(europe.getAveragePollution()).class('controlValue');
    divEuropeStats.child(divCountryStats_europePollution);

    divEuropeStats.child(createDiv('Overall Cost:').class('controlLabel'));
    divCountryStats_europeOverallCost = createDiv(europe.getTotalCost() + ' mln €').class('controlValue');
    divEuropeStats.child(divCountryStats_europeOverallCost);

    divEuropeStats.child(createDiv('Remaining Funds:').class('controlLabel'));
    divCountryStats_europeRemainingFunds = createDiv(europe.funds + ' mln €').class('controlValue');
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

    divCountryOperations = createDiv().class('controlContainer');
    divControlPanelRight.child(divCountryOperations);
    divCountryOperations.child(createDiv('Country Operations').class('controlHeader'));


    inputAtomicPowerStation = createInput(0, 'number').class('controlValue').attribute('disabled', '');
    nextAtomicPowerStationProduction = createDiv(nextStationProduction + '0 tWh').class('controlLabel').attribute('disabled', '');
    nextAtomicPowerStationCost = createDiv(nextStationCost + '0 mln €').class('controlLabel').attribute('disabled', '');
    divCountryOperations.child(createDiv('Nuclear Power Station:').class('controlLabel'));
    divCountryOperations.child(nextAtomicPowerStationProduction);
    divCountryOperations.child(nextAtomicPowerStationCost);
    divCountryOperations.child(inputAtomicPowerStation);
    divCountryOperations.child(createDiv('<button onclick="decreaseAtomicPowerStation()">-</button>&nbsp;<button onclick="increaseAtomicPowerStation()">+</button>').class('controlLabel'));

    inputWindPowerStation = createInput(0, 'number').class('controlValue').attribute('disabled', '');
    nextWindPowerStationProduction = createDiv(nextStationProduction + '0 tWh').class('controlLabel').attribute('disabled', '');
    nextWindPowerStationCost = createDiv(nextStationCost + '0 mln €').class('controlLabel').attribute('disabled', '');
    divCountryOperations.child(createDiv('Wind Power Station:').class('controlLabel'));
    divCountryOperations.child(nextWindPowerStationProduction);
    divCountryOperations.child(nextWindPowerStationCost);
    divCountryOperations.child(inputWindPowerStation);
    divCountryOperations.child(createDiv('<button onclick="decreaseWindPowerStation()">-</button>&nbsp;<button onclick="increaseWindPowerStation()">+</button>').class('controlLabel'));

    inputWaterPowerStation = createInput(0, 'number').class('controlValue').attribute('disabled', '');
    nextWaterPowerStationProduction = createDiv(nextStationProduction + '0 tWh').class('controlLabel').attribute('disabled', '');
    nextWaterPowerStationCost = createDiv(nextStationCost + '0 mln €').class('controlLabel').attribute('disabled', '');
    divCountryOperations.child(createDiv('Water Power Station:').class('controlLabel'));
    divCountryOperations.child(nextWaterPowerStationProduction);
    divCountryOperations.child(nextWaterPowerStationCost);
    divCountryOperations.child(inputWaterPowerStation);
    divCountryOperations.child(createDiv('<button onclick="decreaseWaterPowerStation()">-</button>&nbsp;<button onclick="increaseWaterPowerStation()">+</button>').class('controlLabel'));

    inputCoalPowerStation = createInput(0, 'number').class('controlValue').attribute('disabled', '');
    nextCoalPowerStationProduction = createDiv(nextStationProduction + '0 tWh').class('controlLabel').attribute('disabled', '');
    nextCoalPowerStationCost = createDiv(nextStationCost + '0 mln €').class('controlLabel').attribute('disabled', '');
    divCountryOperations.child(createDiv('Coal Power Station:').class('controlLabel'));
    divCountryOperations.child(nextCoalPowerStationProduction);
    divCountryOperations.child(nextCoalPowerStationCost);
    divCountryOperations.child(inputCoalPowerStation);
    divCountryOperations.child(createDiv('<button onclick="decreaseCoalPowerStation()">-</button>&nbsp;<button onclick="increaseCoalPowerStation()">+</button>').class('controlLabel'));

    inputSolarPowerStation = createInput(0, 'number').class('controlValue').attribute('disabled', '');
    nextSolarPowerStationProduction = createDiv(nextStationProduction + '0 tWh').class('controlLabel').attribute('disabled', '');
    nextSolarPowerStationCost = createDiv(nextStationCost + '0 mln €').class('controlLabel').attribute('disabled', '');
    divCountryOperations.child(createDiv('Solar Power Station:').class('controlLabel'));
    divCountryOperations.child(nextSolarPowerStationProduction);
    divCountryOperations.child(nextSolarPowerStationCost);
    divCountryOperations.child(inputSolarPowerStation);
    divCountryOperations.child(createDiv('<button onclick="decreaseSolarPowerStation()">-</button>&nbsp;<button onclick="increaseSolarPowerStation()">+</button>').class('controlLabel'));

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

    filterChanged()
}

  
function draw() {

}

function increaseAtomicPowerStation() {
    if (!europe.checkBuildingPossibility(AtomicPowerStation)) {
        return
    }
    selectedCountry.buildPowerStation(AtomicPowerStation)
    updateData()
}

function decreaseAtomicPowerStation() {
    selectedCountry.removePowerStation(AtomicPowerStation)
    updateData()
}

function increaseWindPowerStation() {
    if (!europe.checkBuildingPossibility(WindPowerStation)) {
        return
    }
    selectedCountry.buildPowerStation(WindPowerStation)
    updateData()
}

function decreaseWindPowerStation() {
    selectedCountry.removePowerStation(WindPowerStation)
    updateData()
}

function increaseWaterPowerStation() {
    if (!europe.checkBuildingPossibility(WaterPowerStation)) {
        return
    }
    selectedCountry.buildPowerStation(WaterPowerStation)
    updateData()
}

function decreaseWaterPowerStation() {
    selectedCountry.removePowerStation(WaterPowerStation)
    updateData()

}

function increaseCoalPowerStation() {
    if (!europe.checkBuildingPossibility(CoalPowerStation)) {
        return
    }
    selectedCountry.buildPowerStation(CoalPowerStation)
    updateData()
}

function decreaseCoalPowerStation() {
    selectedCountry.removePowerStation(CoalPowerStation)
    updateData()
}

function increaseSolarPowerStation() {
    if (!europe.checkBuildingPossibility(SolarPowerStation)) {
        return
    }
    selectedCountry.buildPowerStation(SolarPowerStation)
    updateData()
}

function decreaseSolarPowerStation() {
    selectedCountry.removePowerStation(SolarPowerStation)
    updateData()
}

function countryOnClick(pathOfCountry) {
    for (let i = 0; i < path.length; i++) {
        if (path[i].id() !== "") {
            path[i].attribute('opacity', 1);
        }
    }
    pathOfCountry.attribute('opacity', 0.5);
    selectedCountry = europe.getCountryById(pathOfCountry.id())
    updateData()
}

function updateData() {

    updateSurplus()
    transferEnergy()

    divCountryStats_europeDemand.html(europe.getTotalDemand() + ' tWh')
    divCountryStats_europeProduction.html(europe.getTotalProduction() + ' tWh')
    divCountryStats_europePollution.html(europe.getAveragePollution())
    divCountryStats_europeOverallCost.html(europe.getTotalCost() + ' mln €')
    divCountryStats_europeRemainingFunds.html(europe.getRemainingFunds() + ' mln €')

    divCountryStats_countryName.html(selectedCountry.name)
    divCountryStats_countryDemand.html(selectedCountry.demand + ' tWh')
    divCountryStats_countryProduction.html(selectedCountry.getProduction() + ' tWh')
    divCountryStats_countryPollution.html(selectedCountry.getPollution())
    divCountryStats_countryOverallCost.html(selectedCountry.getTotalCost() + ' mln €')

    inputAtomicPowerStation.value(selectedCountry.getNumberOfPowerStationsByType(AtomicPowerStation))
    inputWindPowerStation.value(selectedCountry.getNumberOfPowerStationsByType(WindPowerStation))
    inputWaterPowerStation.value(selectedCountry.getNumberOfPowerStationsByType(WaterPowerStation))
    inputCoalPowerStation.value(selectedCountry.getNumberOfPowerStationsByType(CoalPowerStation))
    inputSolarPowerStation.value(selectedCountry.getNumberOfPowerStationsByType(SolarPowerStation))

    nextAtomicPowerStationProduction.html(nextStationProduction + selectedCountry.getNewPowerStation(AtomicPowerStation).powerProduction + ' tWh')
    nextWindPowerStationProduction.html(nextStationProduction + selectedCountry.getNewPowerStation(WindPowerStation).powerProduction + ' tWh')
    nextWaterPowerStationProduction.html(nextStationProduction + selectedCountry.getNewPowerStation(WaterPowerStation).powerProduction + ' tWh')
    nextCoalPowerStationProduction.html(nextStationProduction + selectedCountry.getNewPowerStation(CoalPowerStation).powerProduction + ' tWh')
    nextSolarPowerStationProduction.html(nextStationProduction + selectedCountry.getNewPowerStation(SolarPowerStation).powerProduction + ' tWh')

    console.log(selectedCountry.getNewPowerStation(AtomicPowerStation))

    nextAtomicPowerStationCost.html(nextStationCost + selectedCountry.getNewPowerStation(AtomicPowerStation).buildingCost + ' mln €')
    nextWindPowerStationCost.html(nextStationCost + selectedCountry.getNewPowerStation(WindPowerStation).buildingCost + ' mln €')
    nextWaterPowerStationCost.html(nextStationCost + selectedCountry.getNewPowerStation(WaterPowerStation).buildingCost + ' mln €')
    nextCoalPowerStationCost.html(nextStationCost + selectedCountry.getNewPowerStation(CoalPowerStation).buildingCost + ' mln €')
    nextSolarPowerStationCost.html(nextStationCost + selectedCountry.getNewPowerStation(SolarPowerStation).buildingCost + ' mln €')

    filterChanged()
}

function updateSurplus() {
    energySurplus = {}
    for (let country of europe.countries) {
        if (country.isDemandSatisfied()) {
            energySurplus[country.name] = country.getSurplus()
        }
    }
}

function transferEnergy() {
    for (const countryName in energySurplus) {
        const country = countries.find(country => country.name === countryName);
        if (country.isDemandSatisfied()) {
            country.neighbours.forEach(neighbourName => {
                const neighbour = countries.find(country => country.name === neighbourName)
                if (!neighbour.isDemandSatisfied()) {
                    const value = min(neighbour.getNeededEnergy(), country.getProduction() - country.demand)
                    neighbour.import += value * 0.9
                    country.export += value
                    energySurplus[countryName] -= value
                }
            })
        }
    }
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
            countryData.powerStations,
            countryData.neighbours
        );
        countries.push(country);
    }
}

function filterChanged() {
    let item = filterSelector.value();
    switch (item) {
        case 'Pollution':
            const maxPollution = europe.getMaxPollution() !== 0 ? europe.getMaxPollution() : 1
            for (let i = 0; i < path.length; i++) {
                let id = path[i].id()
                if (id !== '') {
                    let country = europe.getCountryById(id)
                    path[i].attribute('fill', valueToColor(1 - country.getPollution() / maxPollution));
                }
            }
            break
        case 'Production':
            const maxProduction = europe.getMaxProduction() !== 0 ? europe.getMaxProduction() : 1
            for (let i = 0; i < path.length; i++) {
                let id = path[i].id()
                if (id !== '') {
                    let country = europe.getCountryById(id)
                    path[i].attribute('fill', valueToColor(country.getProduction() / maxProduction));
                }
            }
            break
        case 'Demand':
            const maxDemand = europe.getMaxDemand()
            for (let i = 0; i < path.length; i++) {
                let id = path[i].id()
                if (id !== '') {
                    let country = europe.getCountryById(id)
                    path[i].attribute('fill', valueToColor(1 - country.getDemand() / maxDemand));
                }
            }
            break
        case 'Demand Satisfaction':
            for (let i = 0; i < path.length; i++) {
                let id = path[i].id()
                if (id !== '') {
                    let country = europe.getCountryById(id)
                    path[i].attribute('fill', valueToColor(Math.min(country.getProduction() / country.getDemand(), 1)));
                }
            }
            break
        case 'Demand Satisfied':
            for (let i = 0; i < path.length; i++) {
                if (path[i].id() !== '') {
                    let country = countries.filter(c => c.name === path[i].id())[0]
                    path[i].attribute('fill', country.isDemandSatisfied() ? color(0, 255, 0) : color(255, 0, 0));
                }
            }
    }
}

function valueToColor(value) {
    let r = 255
    if (value < 0.25) {
        r += (value - 0.25) * 2 * 255
    } else if (value > 0.5) {
        r -= (value - 0.5) * 2 * 255
    }
    let g = Math.min(value * 2, 1) * 255
    return color(r, g, 0);
}
