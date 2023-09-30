class Country {
    constructor(name, demand, powerStations) {
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

    buildPowerStation(station, qualityFactor) {
        const count = this.powerStations.filter(obj => obj instanceof station).length;
        station = new station(count * qualityFactor, station.pollution)
        this.powerStations.push(station)
    }
}
