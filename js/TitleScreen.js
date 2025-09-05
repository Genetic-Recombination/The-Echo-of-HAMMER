class TitleScreen {
  constructor({ progress }) {
    this.progress = progress;
  }

  getOptions(resolve) {
    const safeFile = this.progress.getSaveFile();
    return [
      {
        label: "New Game",
        description: "Start a new adventure.",
        handler: () => {
          this.close();
          resolve();
        }
      },
      safeFile ? {
        label: "Load Game",
        description: "Resume your adventure",
        handler: () => {
          this.close();
          resolve(safeFile);
        }
      } : null,
    ].filter(v => v);
  }

  createElement() {
    this.element = document.createElement("div");
    this.element.classList.add("TitleScreen");
    this.element.innerHTML = (`
      <div class="title-content">
        <h1>Detective Game</h1>
        <p>Welcome to the mystery!</p>
      </div>
    `);
  }

  close() {
    if (this.keyboardMenu) {
      this.keyboardMenu.end();
    }
    this.element.remove();
  }

  init(container) {
    return new Promise(resolve => {
      this.createElement();
      container.appendChild(this.element);
      
      // 简化版本，直接开始新游戏
      setTimeout(() => {
        this.close();
        resolve();
      }, 1000);
    })
  }
}