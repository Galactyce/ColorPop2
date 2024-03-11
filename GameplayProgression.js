GameWorld.prototype.updateGameplay = function() {
    this.balloonMinVelocity += 0.07;
    if (this.difficulty == 'Easy') {
        if (this.pops <= 10) {
            this.maxBarrierCount = 0;
            this.maxIntenseBarrierCount = 0;
            this.rainbowSpawnChance = 0.05; // Out of 1
            this.metalSpawnChance = 0;
            this.bombSpawnChance = 0;       
        }
        else if (this.pops <= 20) {
            this.maxBarrierCount = 1;
        }
        else if (this.pops <= 30) {
            this.balloonsPerRow = 2;
        }
        else if (this.pops <= 60) {
            this.maxBarrierCount = 2;
        }
        else if (this.pops <= 85) {
            this.maxIntenseBarrierCount = 1;
            
        }
        else if (this.pops <= 100) {
            this.metalSpawnChance = 0.06;
        }
        else if (this.pops <= 125) {
            this.bombSpawnChance = 0.06;
            this.metalSpawnChance = 0.08;
        }
        else if (this.pops >= 150) {
            this.bossMode = true;
            this.balloonsPerRow = 0;
            this.minBarrierSpeed = 4;
            this.maxIntenseBarrierSpeed = 3
        }

        if (this.boss.dead == true) {
            this.win = true;
            this.bossMode = false;
            this.maxBarrierCount = 0;
            this.maxIntenseBarrierCount = 0;
            this.applyWin();
        }
    }
}