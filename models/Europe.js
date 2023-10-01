class Europe {

    constructor(countries, funds) {
        this.countries = countries
        this.funds = funds
    }

    getAveragePollution() {
        let sum = this.countries.reduce((acc, country) => acc + country.getPollution(), 0)
        return Math.round(sum / this.countries.length * 100) / 100
    }

    getMaxPollution() {
        return this.countries.reduce((max, item) => {
            return item.value > max ? item.value : max;
        }, -Infinity)
    }

    getTotalDemand() {
        return this.countries.reduce((acc, country) => acc + country.demand, 0)
    }

    getTotalProduction() {
        let production = this.countries.reduce((acc, country) => acc + country.getProduction(), 0)
        return Math.round(production * 100) / 100
    }

    getTotalCost() {
        let cost = this.countries.reduce((acc, country) => acc + country.getTotalCost(), 0)
        return Math.round(cost * 100) / 100
    }

    getRemainingFunds() {
        return Math.round((this.funds - this.getTotalCost()) * 100) / 100
    }

    checkBuildingPossibility(stationType) {
        return this.getRemainingFunds() - stationType.baseBuildingCost > 0
    }
}