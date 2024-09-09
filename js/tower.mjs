import { Disk } from "./disk.mjs";
export class Tower {
  // tower = [];
  constructor(nDisks, tower) {
    this.nDisks = nDisks;
    this.tower = tower;
    this.isActive = false;
    this.disks = [];
    this.fillTower();
  }

  fillTower() {
    const height = 50;
    const width = 200;

    for (let i = 0; i < this.nDisks; i++) {
      const newDisk = new Disk(height, width - 30 * i);
      this.tower.appendChild(newDisk.getDisk());
      this.disks.push(newDisk);
      newDisk.getDisk().style.bottom = `${i * height + i}px`;
    }
  }

  moveDiskTower(toTower) {
    const { diskObj } = this.getTopDisk();
    toTower.createDisk(diskObj.height, diskObj.width);
    this.deleteDisk();
    this.isActive = false;
  }

  createDisk(height, width) {
    const newDisk = new Disk(height, width);
    this.tower.appendChild(newDisk.getDisk());
    this.disks.push(newDisk);
    this.nDisks = this.disks.length;
    newDisk.getDisk().style.bottom = `${50*(this.nDisks-1)}px`;
    return newDisk;
  }

  getTopDisk() {
    return {
      diskObj: this.disks[this.nDisks - 1],
      diskTag: this.disks[this.nDisks - 1].getDisk(),
    };
  }

  moveDiskTopDown() {
    const { diskObj, diskTag } = this.getTopDisk();

    if (!diskObj.getIsMounted()) {
      this.moveTop(diskTag, diskObj);
    } else {
      this.moveDown(diskTag, diskObj);
    }
  }

  moveTop() {
    const { diskObj, diskTag } = this.getTopDisk();

    diskTag.style.top = `0px`;
    diskTag.style.backgroundColor = "green";
    diskObj.setIsMounted(!this.isActive);
    this.isActive = !this.isActive;
  }

  moveDown() {
    const { diskObj, diskTag } = this.getTopDisk();

    diskTag.style.top = `initial`;
    diskTag.style.backgroundColor = "yellow";
    diskObj.setIsMounted(!this.isActive);
    this.isActive = !this.isActive;
  }

  deleteDisk() {
    const { diskObj } = this.getTopDisk();
    this.tower.removeChild(diskObj.getDisk());
    this.disks.pop(diskObj);
    this.nDisks = this.disks.length;
  }

  deleteAllDisks(){
    this.tower.replaceChildren();
    this.disks = [];
    this.nDisks = 0;
  }
  printTower() {
    // console.log('tower', this.tower, 'nDisk');
  }

  printDisk() {
    this.disks.forEach((disk) => {
      disk.view(); // Llamar al método view de cada disco
    });
  }
}
