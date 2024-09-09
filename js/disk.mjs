export class Disk{
  constructor(height, width){
    this.height = height;
    this.width = width;
    this.isMounted = false;
    
    this.disk = document.createElement("div");
    this.disk.style.height = `${this.height}px`;
    this.disk.style.width = `${this.width}px`;
    this.disk.style.backgroundColor = "red";
    this.disk.style.border = "1px solid";
    this.disk.style.position = "absolute";
  }

  setIsMounted(bool){
    this.isMounted = bool;
  }

  getIsMounted(){
    return this.isMounted;
  }
  getDisk() {
    return this.disk;
  }

  view(){
    console.log(this.disk);
  }
}