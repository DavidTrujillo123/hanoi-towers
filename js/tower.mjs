import { Disk } from "./disk.mjs";
export class Tower {
  // tower = [];
  constructor(nDisks, tower) {
    this.nDisks = nDisks;
    this.tower = tower;
    this.isActive = false;
    this.disks = [];
    this.height = 50;
    this.width = 200;
    this.bottom = 15;
    this.fillTower();
  }

  fillTower() {
    for (let i = 0; i < this.nDisks; i++) {
      const newDisk = new Disk(this.height, this.width - 30 * i);
      this.tower.appendChild(newDisk.getDisk());
      this.disks.push(newDisk);
      newDisk.getDisk().style.bottom = `${this.bottom + i * this.height}px`;
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
    newDisk.getDisk().style.bottom = `${(this.height * (this.nDisks - 1))+this.bottom}px`;
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
    diskObj.setIsMounted(!this.isActive);
    this.isActive = !this.isActive;
  }

  moveDown() {
    const { diskObj, diskTag } = this.getTopDisk();

    diskTag.style.top = `initial`;
    diskObj.setIsMounted(!this.isActive);
    this.isActive = !this.isActive;
  }

  deleteDisk() {
    const { diskObj } = this.getTopDisk();
    this.tower.removeChild(diskObj.getDisk());
    this.disks.pop(diskObj);
    this.nDisks = this.disks.length;
  }

  deleteAllDisks() {
    this.tower.replaceChildren();
    this.disks = [];
    this.nDisks = 0;
  }

  printDisk() {
    this.disks.forEach((disk) => {
      disk.view(); // Llamar al método view de cada disco
    });
  }
}
