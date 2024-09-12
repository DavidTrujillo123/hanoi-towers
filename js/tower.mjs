import { Disk } from "./disk.mjs";
export class Tower {
  #heightDefault = 50;
  #widthDefault = 270;
  #updationWidthDefault = 40;
  #disks = [];
  #towerTag;
  #isOnTopDisk = false;
  constructor(nDisks, tower) {
    this.#towerTag = tower;
    this.#createListDiskInTower(nDisks);
  }
  #createListDiskInTower(nDisks) {
    let positionBottom;
    let realWidth;   
    for (let countDisk = 1; countDisk <= nDisks; countDisk++) {
      realWidth = this.#widthDefault - (this.#updationWidthDefault * countDisk);
      positionBottom = this.#heightDefault * (countDisk - 1);
      this.createDisk(this.#heightDefault, realWidth, positionBottom);
    }
  }
  #pushDiskInTower(disk) {
    this.#towerTag.appendChild(disk.getDiskTag());
    this.#disks.push(disk);
  }
  createDisk(height, width, position) {
    const newDisk = new Disk(height, width, position);
    this.#pushDiskInTower(newDisk);
    return newDisk;
  }
  moveTop() {
    const disk = this.getTopDisk();
    disk.setStyles("top", "0px");
    this.#isOnTopDisk = true;
  }
  moveDown() {
    const disk = this.getTopDisk();
    disk.setStyles("top", "initial");
    this.#isOnTopDisk = false;
  }
  deleteDisk() {
    const diskObj = this.getTopDisk();
    this.#towerTag.removeChild(diskObj.getDiskTag());
    this.#disks.pop(diskObj);
    this.#isOnTopDisk = false;
  }
  deleteAllDisks() {
    this.#towerTag.replaceChildren();
    this.#disks = [];
  }
  setIsOnTopDisk(flag){
    this.#isOnTopDisk = flag;
  }
  getPositionTop() {
    return this.getDisksLength() * this.#heightDefault;
  }
  getTopDisk() {
    return this.#disks[this.getDisksLength() - 1];
  }
  getWidthTopDisk() {
    const diskObj = this.getTopDisk();
    return diskObj.getWidth();
  }
  getDisksLength() {
    return this.#disks.length;
  }
  getTowerTag() {
    return this.#towerTag;
  }
  getIsOnTopDisk(){
    return this.#isOnTopDisk;
  }
  getIsEmpty(){
    return this.getDisksLength() === 0;
  }
}
