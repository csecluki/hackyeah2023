class Country {
    constructor(name, demand, powerStations = []) {
        this.name = name
        this.demand = demand
        this.powerStations = powerStations
    }

    getProduction() {
        return this.powerStations.reduce((accumulator, powerStation) => accumulator + powerStation.powerProduction, 0)
    }

    getPollution() {
        return this.powerStations.reduce((accumulator, powerStation) => accumulator + powerStation.pollution, 0)
    }

    getDemandSatisfaction() {
        return Math.round(this.getProduction() / this.demand * 100) / 100
    }

    isDemandSatisfied() {
        return this.getDemandSatisfaction() > 1
    }

    buildPowerStation(station, qualityFactor) {
        const count = this.powerStations.filter(obj => obj instanceof station).length;
        station = new station(count * qualityFactor, station.pollution)
        this.powerStations.push(station)
        return this.powerStations
    }

    removePowerStation(stationType) {
        let lastIndex = -1;
        for (let i = this.powerStations.length - 1; i >= 0; i--) {
            if (this.powerStations[i] instanceof stationType) {
                lastIndex = i;
                break;
            }
        }
        if (lastIndex !== -1) {
            this.powerStations.splice(lastIndex, 1);
        }
        return this.powerStations
    }
}
