class PowerStation {
    static baseBuildingCost
    static basePowerProduction
    static pollution

    constructor(
        basePowerProduction,
        relativeProductionFactor,
        otherPowerStationNumber,
        countryEffectiveness,
        pollution,
        buildingCost
    ) {
        this.powerProduction = this.calculatePowerProduction(
            basePowerProduction,
            relativeProductionFactor,
            otherPowerStationNumber,
            countryEffectiveness
        )
        this.pollution = pollution
        this.buildingCost = buildingCost
    }

    calculatePowerProduction(basePowerProduction, relativeProductionFactor, otherPowerStationNumber, countryEffectiveness) {
        let production = basePowerProduction * (1 - (relativeProductionFactor * otherPowerStationNumber)) * (1 + countryEffectiveness)
        return Math.round(production * 100) / 100
    }
}

class AtomicPowerStation extends PowerStation {
    static baseBuildingCost = 14.6
    static basePowerProduction = 51
    static pollution = 8
    static relativeProductionFactor = 0.003
    
    constructor(otherPowerStationNumber, countryEffectiveness) {
        super(
            AtomicPowerStation.basePowerProduction,
            AtomicPowerStation.relativeProductionFactor,
            otherPowerStationNumber,
            countryEffectiveness,
            AtomicPowerStation.pollution,
            AtomicPowerStation.baseBuildingCost
        )
    }
}

class WindPowerStation extends PowerStation {
    static baseBuildingCost = 1.5
    static basePowerProduction = 3.2
    static pollution = 2.5
    static relativeProductionFactor = 0.02
    
    constructor(otherPowerStationNumber, countryEffectiveness) {
        super(
            WindPowerStation.basePowerProduction,
            WindPowerStation.relativeProductionFactor,
            otherPowerStationNumber,
            countryEffectiveness,
            WindPowerStation.pollution,
            WindPowerStation.baseBuildingCost
        )
    }
}

class WaterPowerStation extends PowerStation {
    static baseBuildingCost = 1.7
    static basePowerProduction = 6.4
    static pollution = 6
    static relativeProductionFactor = 0.05
    
    constructor(otherPowerStationNumber, countryEffectiveness) {
        super(
            WaterPowerStation.basePowerProduction,
            WaterPowerStation.relativeProductionFactor,
            otherPowerStationNumber,
            countryEffectiveness,
            WaterPowerStation.pollution,
            WaterPowerStation.baseBuildingCost
        )
    }
}

class CoalPowerStation extends PowerStation {
    static baseBuildingCost = 6.2
    static basePowerProduction = 21.3
    static pollution = 25
    static relativeProductionFactor = 0.01
    
    constructor(otherPowerStationNumber, countryEffectiveness) {
        super(
            CoalPowerStation.basePowerProduction,
            CoalPowerStation.relativeProductionFactor,
            otherPowerStationNumber,
            countryEffectiveness,
            CoalPowerStation.pollution,
            CoalPowerStation.baseBuildingCost
        )
    }
}

class SolarPowerStation extends PowerStation {
    static baseBuildingCost = 2.3
    static basePowerProduction = 1.3
    static pollution = 1
    static relativeProductionFactor = 0.015
    
    constructor(otherPowerStationNumber, countryEffectiveness) {
        super(
            SolarPowerStation.basePowerProduction,
            SolarPowerStation.relativeProductionFactor,
            otherPowerStationNumber,
            countryEffectiveness,
            SolarPowerStation.pollution,
            SolarPowerStation.baseBuildingCost
        )
    }
}
