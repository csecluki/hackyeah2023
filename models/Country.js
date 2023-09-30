class Country {
    constructor(powerStations) {
        this.powerStations = powerStations
    }

    getProduction() {
        return this.powerStations.reduce((accumulator, powerStation) => accumulator + powerStation.powerProduction, 0)
    }

    getPollution() {
        return this.powerStations.reduce((accumulator, powerStation) => accumulator + powerStation.pollution, 0)
    }
}
