class Country {
    constructor(name, demand, effectiveness, powerStations = [], neighbours) {
        this.name = name
        this.demand = demand
        this.effectiveness = effectiveness
        this.powerStations = powerStations
        this.neighbours = neighbours
        this.import = 0
        this.export = 0
    }

    getProduction() {
        let production = this.powerStations.reduce((accumulator, powerStation) => accumulator + powerStation.powerProduction, 0) + this.import - this.export
        return Math.round(production * 100) / 100
    }

    getPollution() {
        let pollution = this.powerStations.reduce((accumulator, powerStation) => accumulator + powerStation.pollution, 0)
        return Math.round(pollution * 100) / 100
    }

    getDemand() {
        return this.demand
    }

    getDemandSatisfaction() {
        return Math.round(this.getProduction() / this.demand * 100) / 100
    }

    isDemandSatisfied() {
        return this.getDemandSatisfaction() > 1
    }

    getNeededEnergy() {
        return this.demand - this.getProduction()
    }

    getSurplus() {
        return Math.round((this.getProduction() - this.demand) * 100) / 100
    }

    getTotalCost() {
        let cost = this.powerStations.reduce((accumulator, powerStation) => accumulator + powerStation.buildingCost, 0)
        return Math.round(cost * 100) / 100
    }

    getNumberOfPowerStationsByType(stationType) {
        return this.powerStations.filter(obj => obj instanceof stationType).length
    }

    buildPowerStation(stationType) {
        const count = this.getNumberOfPowerStationsByType(stationType)
        let station = new stationType(count, this.effectiveness[stationType.name])
        this.powerStations.push(station)
        return this.powerStations
    }

    removePowerStation(stationType) {
        let lastIndex = -1;
        for (let i = this.powerStations.length - 1; i >= 0; i--) {
            if (this.powerStations[i] instanceof stationType) {
                lastIndex = i
                break
            }
        }
        if (lastIndex !== -1) {
            this.powerStations.splice(lastIndex, 1)
        }
        return this.powerStations
    }
}

class Effectiveness {
    constructor(atomicPowerStation, windPowerStation, waterPowerStation, coalPowerStation, solarPowerStation) {
        this.AtomicPowerStation = atomicPowerStation
        this.WindPowerStation = windPowerStation
        this.WaterPowerStation = waterPowerStation
        this.CoalPowerStation = coalPowerStation
        this.SolarPowerStation = solarPowerStation
    }
}
