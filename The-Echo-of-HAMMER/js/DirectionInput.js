// 方向输入处理
class DirectionInput {
  constructor() {
    this.heldDirections = [];
    this.isInitialized = false;
    this.keydownHandler = null;
    this.keyupHandler = null;

    this.map = {
      "ArrowUp": "up",
      "KeyW": "up",
      "ArrowDown": "down",
      "KeyS": "down",
      "ArrowLeft": "left",
      "KeyA": "left",
      "ArrowRight": "right",
      "KeyD": "right",
    }
  }

  get direction() {
    return this.heldDirections[0];
  }

  init() {
    // 防止重复初始化
    if (this.isInitialized) {
      return;
    }

    this.keydownHandler = (e) => {
      const dir = this.map[e.code];
      if (dir && this.heldDirections.indexOf(dir) === -1) {
        this.heldDirections.unshift(dir);
      }
    };

    this.keyupHandler = (e) => {
      const dir = this.map[e.code];
      const index = this.heldDirections.indexOf(dir);
      if (index > -1) {
        this.heldDirections.splice(index, 1);
      }
    };

    document.addEventListener("keydown", this.keydownHandler);
    document.addEventListener("keyup", this.keyupHandler);
    
    this.isInitialized = true;
  }

  destroy() {
    if (this.keydownHandler) {
      document.removeEventListener("keydown", this.keydownHandler);
    }
    if (this.keyupHandler) {
      document.removeEventListener("keyup", this.keyupHandler);
    }
    this.isInitialized = false;
    this.heldDirections = [];
  }
}