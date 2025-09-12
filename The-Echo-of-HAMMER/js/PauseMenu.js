// 暂停菜单
class PauseMenu {
  constructor({ progress, onComplete }) {
    this.progress = progress;
    this.onComplete = onComplete;
  }

  getOptions() {
    return [
      {
        label: "继续游戏",
        description: "返回游戏",
        handler: () => {
          this.close();
        }
      },
      {
        label: "保存游戏",
        description: "保存当前进度",
        handler: () => {
          this.progress.save();
          // 显示保存成功提示
          const toast = document.createElement('div');
          toast.textContent = '游戏已保存';
          toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 10px 20px;
            border-radius: 5px;
            z-index: 9999;
            font-size: 14px;
          `;
          document.body.appendChild(toast);
          setTimeout(() => {
            document.body.removeChild(toast);
          }, 2000);
        }
      },
      {
        label: "返回菜单",
        description: "返回主菜单",
        handler: () => {
          // 确认返回菜单
          if (confirm('确定要返回主菜单吗？未保存的进度将会丢失。')) {
            window.location.href = 'menu.html';
          }
        }
      }
    ];
  }

  createElement() {
    this.element = document.createElement("div");
    this.element.classList.add("PauseMenu");
    this.element.classList.add("overlayMenu");
    this.element.innerHTML = (`
      <h2>暂停菜单</h2>
    `);
  }

  close() {
    this.esc?.unbind();
    this.keyboardMenu.end();
    this.element.remove();
    this.onComplete();
  }

  async init(container) {
    this.createElement();
    this.keyboardMenu = new KeyboardMenu({
      descriptionContainer: container
    });
    this.keyboardMenu.init(this.element);
    this.keyboardMenu.setOptions(this.getOptions());

    container.appendChild(this.element);

    utils.wait(200);
    this.esc = new KeyPressListener("Escape", () => {
      this.close();
    });
  }
}