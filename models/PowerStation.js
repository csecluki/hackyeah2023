class PowerStation {
    static baseBuildingCost
    static basePowerProduction
    static pollution

    constructor(basePowerProduction, powerProductionModifier, pollution, buildingCost) {
        this.powerProduction = this.calculatePowerProduction(basePowerProduction, powerProductionModifier)
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
    
    constructor(powerProductionModifier) {
        super(
            AtomicPowerStation.basePowerProduction,
            powerProductionModifier,
            AtomicPowerStation.pollution,
            AtomicPowerStation.baseBuildingCost
        )
    }

}

class WindPowerStation extends PowerStation {
    static baseBuildingCost = 1.5
    static basePowerProduction = 2.7
    static pollution = 2.5
    
    constructor(powerProductionModifier) {
        super(
            WindPowerStation.basePowerProduction,
            powerProductionModifier,
            WindPowerStation.pollution,
            WindPowerStation.baseBuildingCost
        )
    }

}

class WaterPowerStation extends PowerStation {
    static baseBuildingCost = 1.7
    static basePowerProduction = 3.9
    static pollution = 6
    
    constructor(powerProductionModifier) {
        super(
            WaterPowerStation.basePowerProduction,
            powerProductionModifier,
            WaterPowerStation.pollution,
            WaterPowerStation.baseBuildingCost
        )
    }

}

class CoalPowerStation extends PowerStation {
    static baseBuildingCost = 6.2
    static basePowerProduction = 16.8
    static pollution = 25
    
    constructor(powerProductionModifier) {
        super(
            CoalPowerStation.basePowerProduction,
            powerProductionModifier,
            CoalPowerStation.pollution,
            CoalPowerStation.baseBuildingCost
        )
    }

}

class SolarPowerStation extends PowerStation {
    static baseBuildingCost = 2.3
    static basePowerProduction = 0.39
    static pollution = 1
    
    constructor(powerProductionModifier) {
        super(
            SolarPowerStation.basePowerProduction,
            powerProductionModifier,
            SolarPowerStation.pollution,
            SolarPowerStation.baseBuildingCost
        )
    }

}
