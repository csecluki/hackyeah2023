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
        return this.countries.reduce((acc, country) => acc + country.getProduction(), 0)
    }

    getTotalCost() {
        return this.countries.reduce((acc, country) => acc + country.getTotalCost(), 0)
    }

    getRemainingFunds() {
        return this.funds - this.getTotalCost()
    }
}