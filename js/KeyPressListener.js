// 键盘监听器
class KeyPressListener {
  constructor(keyCode, callback) {
    let keySafe = true;
    this.keydownFunction = function(event) {
      // 支持多种键盘事件属性检查
      const isMatch = 
        event.code === keyCode || 
        event.key === keyCode || 
        (keyCode === "Space" && (event.key === " " || event.key === "Spacebar"));
      
      if (isMatch) {
        if (keySafe) {
          keySafe = false;
          callback();
        }
      }
    };
    this.keyupFunction = function(event) {
      // 支持多种键盘事件属性检查
      const isMatch = 
        event.code === keyCode || 
        event.key === keyCode || 
        (keyCode === "Space" && (event.key === " " || event.key === "Spacebar"));
      
      if (isMatch) {
        keySafe = true;
      }
    };
    document.addEventListener("keydown", this.keydownFunction);
    document.addEventListener("keyup", this.keyupFunction);
  }

  unbind() {
    document.removeEventListener("keydown", this.keydownFunction);
    document.removeEventListener("keyup", this.keyupFunction);
  }
}