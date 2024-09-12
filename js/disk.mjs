export class Disk{
  constructor(height, width){
    this.height = height;
    this.width = width;
    this.isMounted = false;
    
    this.disk = document.createElement("div");
    this.disk.style.height = `${this.height}px`;
    this.disk.style.width = `${this.width}px`;
    // this.disk.style.backgroundColor = "#7CF5FF";
    // this.disk.style.border = "1px solid";
    this.disk.style.backgroundImage = "url(../images/disk.png)";
    // this.disk.style.backgroundSize = "conver";
    this.disk.style.backgroundSize = "100% 100%";
    this.disk.style.backgroundRepeat = "no-repeat";
    this.disk.style.backgroundPosition = "center";
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