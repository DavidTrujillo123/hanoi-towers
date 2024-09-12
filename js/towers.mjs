import { Tower } from "./tower.mjs";

export class Towers {
  constructor(nDisks, stepsTag, towerA, towerB, towerC) {
    this.nDisks = nDisks;
    this.towerA = new Tower(nDisks, towerA);
    this.towerB = new Tower(0, towerB);
    this.towerC = new Tower(0, towerC);
    this.stepsTag = stepsTag;
    this.steps = 0;

    this.stepsTag.textContent = `Steps: ${this.steps}`;
    this.towers = [this.towerA, this.towerB, this.towerC];
  }

  handleTowerDiskActions(towerPrime, towerSec, towerTri) {  
    if(
      towerPrime.disks.length <= 0 && 
      !towerSec.isActive && 
      !towerTri.isActive)
    {  
      return;
    }
    
    if (!towerPrime.isActive) {
      if (towerSec.isActive) {
        this.handdleMoveDiskTower(towerPrime, towerSec);
        return;
      }

      if (towerTri.isActive) {
        this.handdleMoveDiskTower(towerPrime, towerTri);
        return;
      }

      this.moveTopDownDisk(towerPrime);
      return;
    } else {
      this.moveTopDownDisk(towerPrime);
      return;
    }
  }

  handdleMoveDiskTower(toTower, formTower) {
    this.handleSteps();
    if (toTower.disks.length <= 0) {
      formTower.moveDiskTower(toTower);
      return;
    }

    const { diskObj: topDiskSec } = formTower.getTopDisk();
    const widthDiskTopSec = topDiskSec.width;

    const { diskObj: topDiskPrime } = toTower.getTopDisk();
    const widthDiskTopPrime = topDiskPrime.width;

    if (widthDiskTopPrime > widthDiskTopSec) {
      formTower.moveDiskTower(toTower);
      return;
    }

    formTower.moveDown();
    return;
  }

  async autoSolveHanoi(towerA, towerB, towerC, n) {
    if (n === 1) {
      await this.pause(500);
      towerA.moveTop();
      
      await this.pause(500);
      towerA.moveDiskTower(towerC);

      this.handleSteps();
      await this.checkWin();
    } else {
      await this.autoSolveHanoi(towerA, towerC, towerB, n - 1);

      await this.pause(500);
      towerA.moveTop();

      await this.pause(500);
      towerA.moveDiskTower(towerC);
      
      this.handleSteps();

      await this.autoSolveHanoi(towerB, towerA, towerC, n - 1);
    }
  }
  async checkWin() {
    await this.pause(100);

    if (this.towerB.nDisks == this.nDisks) {
      console.log("winner");
      window.alert('You won!');
      this.reset();
    }
    if (this.towerC.nDisks == this.nDisks) {
      console.log("winner");
      window.alert('You won!');
      this.reset();
    }
  }
  reset() {
    this.resetAll();

    this.towerA = new Tower(this.nDisks, this.towerA.tower);
    this.steps = 0;

    this.stepsTag.textContent = `Steps: ${this.steps}`;
    this.towers = [this.towerA, this.towerB, this.towerC];
  }

  resetAll(){
    this.towerA.deleteAllDisks();
    this.towerB.deleteAllDisks();
    this.towerC.deleteAllDisks();
  }

  async autoSolve() {
    await this.autoSolveHanoi(
      this.towerA,
      this.towerB,
      this.towerC,
      this.nDisks
    );
  }

  handleSteps() {
    this.steps++;
    this.stepsTag.textContent = `Steps: ${this.steps}`;
  }

  moveTopDownDisk(tower) {
    if (!tower.isActive) {
      tower.moveTop();
    } else {
      tower.moveDown();
    }
  }

  pause(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  getStepsRecomended() {
    return Math.pow(2, this.nDisks) - 1;
  }
}
