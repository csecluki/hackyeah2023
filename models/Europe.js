class Europe {

    constructor(countries, funds) {
        this.countries = countries
        this.funds = funds
    }

    getAveragePollution() {
        let sum = this.countries.reduce((acc, country) => acc + country.getPollution(), 0)
        return sum / this.countries.length
    }

    getMaxPollution() {
        return this.countries.reduce((max, item) => {
            return item.value > max ? item.value : max;
        }, -Infinity)
    }
}