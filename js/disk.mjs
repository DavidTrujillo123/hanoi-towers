export class Disk{
  #height;
  #width;
  constructor(height, width, positionBottom){
    this.#height = height;
    this.#width = width;
    this.disk = document.createElement("div");
    this.positionBottom = positionBottom;
    this.#initStyles();
  }
  #initStyles(){
    this.disk.style.height = `${this.#height}px`;
    this.disk.style.width = `${this.#width}px`;
    this.disk.style.backgroundImage = "url(../images/disk.png)";
    this.disk.style.backgroundSize = "100% 100%";
    this.disk.style.backgroundRepeat = "no-repeat";
    this.disk.style.backgroundPosition = "center";
    this.disk.style.position = "absolute";    
    this.disk.style.bottom = `${this.positionBottom}px`;
  }
  setStyles(typeStyle, value){
    // type can be Background, size, position, all styles
    this.disk.style[typeStyle] = value;
  }
  getDiskTag() {
    return this.disk;
  }
  getWidth() {
    return this.#width;
  }
  getHeight() {
    return this.#height;
  }
}