class PowerStation {
    static baseBuildingCost
    static basePowerProduction
    static pollution

    constructor(basePowerProduction, powerProductionModifier, pollution) {
        this.powerProduction = this.calculatePowerProduction(basePowerProduction, powerProductionModifier)
        this.pollution = pollution
    }

    calculatePowerProduction(basePowerProduction, powerProductionModifier) {
        let production = basePowerProduction * (1 - powerProductionModifier);
        return Math.round(production * 100) / 100
    }
}

class AtomicPowerStation extends PowerStation {
    static baseBuildingCost = 9.0
    static basePowerProduction = 8
    static pollution = 8
    
    constructor(powerProductionModifier) {
        super(AtomicPowerStation.basePowerProduction, powerProductionModifier, AtomicPowerStation.pollution)
    }

}

class WindPowerStation extends PowerStation {
    static baseBuildingCost = 1.5
    static basePowerProduction = 0.45
    static pollution = 2.5
    
    constructor(powerProductionModifier) {
        super(WindPowerStation.basePowerProduction, powerProductionModifier, WindPowerStation.pollution)
    }

}

class WaterPowerStation extends PowerStation {
    static baseBuildingCost = 1.7
    static basePowerProduction = 0.65
    static pollution = 6
    
    constructor(powerProductionModifier) {
        super(WaterPowerStation.basePowerProduction, powerProductionModifier, WaterPowerStation.pollution)
    }

}

class CoalPowerStation extends PowerStation {
    static baseBuildingCost = 6.2
    static basePowerProduction = 2.8
    static pollution = 25
    
    constructor(powerProductionModifier) {
        super(CoalPowerStation.basePowerProduction, powerProductionModifier, CoalPowerStation.pollution)
    }

}

class SolarPowerStation extends PowerStation {
    static baseBuildingCost = 2.3
    static basePowerProduction = 0.0625
    static pollution = 1
    
    constructor(powerProductionModifier) {
        super(SolarPowerStation.basePowerProduction, powerProductionModifier, SolarPowerStation.pollution)
    }

}
