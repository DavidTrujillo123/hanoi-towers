import { Tower } from "./tower.mjs";

export class Towers {
  constructor(nDisks, towerA, towerB, towerC) {
    this.nDisks = nDisks;
    this.towerA = new Tower(nDisks, towerA);
    this.towerB = new Tower(0, towerB);
    this.towerC = new Tower(0, towerC);
    this.steps = 0;

    this.towers = [this.towerA, this.towerB, this.towerC];
  }

  handleTowerDiskActions(towerPrime, towerSec, towerTri) {
    if (!towerPrime.isActive) {
      if (towerSec.isActive) {
        this.moveDiskTower(towerPrime, towerSec);
        return;
      }
  
      if (towerTri.isActive) {
        this.moveDiskTower(towerPrime, towerTri);
        return;
      }
  
      this.moveTopDownDisk(towerPrime);
      return;
    } else {
      this.moveTopDownDisk(towerPrime);
      return;
    }
  }

  moveTopDownDisk(tower) {
    if (!tower.isActive) {
      tower.moveTop();
    } else {
      tower.moveDown();
    }
  }

  moveDiskTower(toTower, formTower) {
    this.steps++;
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

  checkWin() {
    if (this.towerB.nDisks == this.nDisks) {
      console.log("winner");
    }
    if (this.towerC.nDisks == this.nDisks) {
      console.log("winner");
    }
  }

  reset() {
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

  async autoSolveHanoi(towerA, towerB, towerC, n) {
    if (n === 1) {
      await this.pause(500);
      towerA.moveTop();

      await this.pause(500);
      towerA.moveDiskTower(towerC);
      this.checkWin();
      this.steps++;
    } else {
      await this.autoSolveHanoi(towerA, towerC, towerB, n - 1);

      await this.pause(500);
      towerA.moveTop();

      await this.pause(500);
      towerA.moveDiskTower(towerC);
      this.steps++;

      await this.autoSolveHanoi(towerB, towerA, towerC, n - 1);
    }
  }

  pause(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
