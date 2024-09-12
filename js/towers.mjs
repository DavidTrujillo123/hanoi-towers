import { Tower } from "./tower.mjs";

export class Towers {
  #nDisks;
  #towerA;
  #towerB;
  #towerC;
  #stepsTag;
  #steps;
  #isAutoSolve = false;
  constructor(nDisks, stepsTag, towerTagA, towerTagB, towerTagC) {
    this.#nDisks = nDisks;
    this.#towerA = new Tower(nDisks, towerTagA);
    this.#towerB = new Tower(0, towerTagB);
    this.#towerC = new Tower(0, towerTagC);
    this.#stepsTag = stepsTag;
    this.#steps = 0;

    this.#stepsTag.textContent = `Steps: ${this.#steps}`;
  }
  handleTowerDiskActions(towerPrime, towerSec, towerTri) {
    if(this.#isAutoSolve){
      return;
    }
    if (!towerPrime.getIsOnTopDisk()) {
      if (towerSec.getIsOnTopDisk()) {
        this.verifyMoveDisk(towerPrime, towerSec);
      }
      else if (towerTri.getIsOnTopDisk()) {
        this.verifyMoveDisk(towerPrime, towerTri);
      }
      else if(!towerPrime.getIsEmpty()){
        this.moveTopDownDisk(towerPrime);
      }
    } else {
      this.moveTopDownDisk(towerPrime);
    }
    return;
  }
  verifyMoveDisk(toTower, formTower) {
    this.updateSteps();
    if (toTower.getIsEmpty()) {
      this.moveTopDiskTower(toTower, formTower);
      return;
    }

    const toTowerWidthDiskTop = toTower.getWidthTopDisk();
    const formTowerWidthDiskTop = formTower.getWidthTopDisk();

    if (toTowerWidthDiskTop > formTowerWidthDiskTop) {
      this.moveTopDiskTower(toTower, formTower);
      return;
    }

    formTower.moveDown();
    return;
  }
  moveTopDiskTower(toTower, fromTower) {
    const diskObj = fromTower.getTopDisk();

    const positionBottom = toTower.getPositionTop();
    toTower.createDisk(diskObj.getHeight(), diskObj.getWidth(), positionBottom);
    fromTower.deleteDisk();
  }
  async solveHanoi(towerA, towerB, towerC, n) {
    if (n === 1) {
      await this.setPause(500);
      towerA.moveTop();

      await this.setPause(500);
      this.moveTopDiskTower(towerC, towerA);

      this.updateSteps();
      await this.checkWin();
    } else {
      await this.solveHanoi(towerA, towerC, towerB, n - 1);

      await this.setPause(500);
      towerA.moveTop();

      await this.setPause(500);
      this.moveTopDiskTower(towerC, towerA);

      this.updateSteps();

      await this.solveHanoi(towerB, towerA, towerC, n - 1);
    }
  }
  async autoSolve() {
    this.#isAutoSolve = true; 
    await this.solveHanoi(
      this.#towerA,
      this.#towerB,
      this.#towerC,
      this.#nDisks
    );
    this.#isAutoSolve = false; 
  }
  async checkWin() {
    await this.setPause(100);

    if (this.#towerB.getDisksLength() == this.#nDisks) {
      console.log("winner");
      window.alert("You won!");
      this.reset();
    }
    if (this.#towerC.getDisksLength() == this.#nDisks) {
      console.log("winner");
      window.alert("You won!");
      this.reset();
    }
  }
  reset() {
    this.resetAll();

    this.#towerA = new Tower(this.#nDisks, this.#towerA.getTowerTag());
    this.#steps = 0;

    this.#stepsTag.textContent = `Steps: ${this.#steps}`;
    this.towers = [this.#towerA, this.#towerB, this.#towerC];
  }
  resetAll() {
    this.#towerA.deleteAllDisks();
    this.#towerB.deleteAllDisks();
    this.#towerC.deleteAllDisks();
  }
  updateSteps() {
    this.#steps++;
    this.#stepsTag.textContent = `Steps: ${this.#steps}`;
  }
  moveTopDownDisk(towerObj) {
    if (!towerObj.getIsOnTopDisk()) {
      towerObj.moveTop();
    } else {
      towerObj.moveDown();
    }
  }
  setPause(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  getStepsRecomended() {
    return Math.pow(2, this.#nDisks) - 1;
  }
  getTowerA(){
    return this.#towerA;
  }
  getTowerB(){
    return this.#towerB;
  }
  getTowerC(){
    return this.#towerC;
  }
}
