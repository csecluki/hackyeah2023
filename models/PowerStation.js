class PowerStation {
    static baseBuildingCost
    static basePowerProduction
    static pollution

    constructor(basePowerProduction, relativeProductionFactor, pollution, buildingCost) {
        this.powerProduction = this.calculatePowerProduction(basePowerProduction, relativeProductionFactor)
        this.pollution = pollution
        this.buildingCost = buildingCost
    }

    calculatePowerProduction(basePowerProduction, powerProductionModifier) {
        let production = basePowerProduction * (1 - powerProductionModifier);
        return Math.round(production * 100) / 100
    }
}

class AtomicPowerStation extends PowerStation {
    static baseBuildingCost = 9.0
    static basePowerProduction = 48
    static pollution = 8
    static relativeProductionFactor = 0.003
    
    constructor(otherPowerStationNumber) {
        super(
            AtomicPowerStation.basePowerProduction,
            AtomicPowerStation.relativeProductionFactor * otherPowerStationNumber,
            AtomicPowerStation.pollution,
            AtomicPowerStation.baseBuildingCost
        )
    }

}

class WindPowerStation extends PowerStation {
    static baseBuildingCost = 1.5
    static basePowerProduction = 2.7
    static pollution = 2.5
    static relativeProductionFactor = 0.02
    
    constructor(otherPowerStationNumber) {
        super(
            WindPowerStation.basePowerProduction,
            WindPowerStation.relativeProductionFactor * otherPowerStationNumber,
            WindPowerStation.pollution,
            WindPowerStation.baseBuildingCost
        )
    }

}

class WaterPowerStation extends PowerStation {
    static baseBuildingCost = 1.7
    static basePowerProduction = 3.9
    static pollution = 6
    static relativeProductionFactor = 0.05
    
    constructor(otherPowerStationNumber) {
        super(
            WaterPowerStation.basePowerProduction,
            WaterPowerStation.relativeProductionFactor * otherPowerStationNumber,
            WaterPowerStation.pollution,
            WaterPowerStation.baseBuildingCost
        )
    }

}

class CoalPowerStation extends PowerStation {
    static baseBuildingCost = 6.2
    static basePowerProduction = 16.8
    static pollution = 25
    static relativeProductionFactor = 0.01
    
    constructor(otherPowerStationNumber) {
        super(
            CoalPowerStation.basePowerProduction,
            CoalPowerStation.relativeProductionFactor * otherPowerStationNumber,
            CoalPowerStation.pollution,
            CoalPowerStation.baseBuildingCost
        )
    }

}

class SolarPowerStation extends PowerStation {
    static baseBuildingCost = 2.3
    static basePowerProduction = 0.39
    static pollution = 1
    static relativeProductionFactor = 0.015
    
    constructor(otherPowerStationNumber) {
        super(
            SolarPowerStation.basePowerProduction,
            SolarPowerStation.relativeProductionFactor * otherPowerStationNumber,
            SolarPowerStation.pollution,
            SolarPowerStation.baseBuildingCost
        )
    }

}
