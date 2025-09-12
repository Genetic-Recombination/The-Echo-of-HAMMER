// 暂停菜单
class PauseMenu {
  constructor({ progress, onComplete }) {
    this.progress = progress;
    this.onComplete = onComplete;
  }

  getOptions() {
    return [
      {
        label: "返回游戏",
        description: "继续当前游戏",
        handler: () => {
          this.close();
        }
      },
      {
        label: "返回游戏菜单",
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
    const options = this.getOptions();
    this.element = document.createElement("div");
    this.element.classList.add("PauseMenu");
    this.element.classList.add("overlayMenu");
    this.element.innerHTML = (`
      <h2>暂停菜单</h2>
      <div class="menu-options">
        ${options.map((option, index) => `
          <div class="option">
            <button data-button="${index}" data-description="${option.description}">${option.label}</button>
          </div>
        `).join('')}
      </div>
      <div class="DescriptionBox">
        <p>${options[0]?.description || '选择你的操作'}</p>
      </div>
    `);
  }

  close() {
    if (this.esc) this.esc.unbind();
    if (this.up) this.up.unbind();
    if (this.down) this.down.unbind();
    if (this.confirm) this.confirm.unbind();
    this.element.remove();
    this.onComplete();
  }

  async init(container) {
    this.createElement();
    container.appendChild(this.element);

    const options = this.getOptions();
    const buttons = this.element.querySelectorAll("button[data-button]");

    // 绑定按钮事件
    buttons.forEach((button, index) => {
      button.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        const option = options[index];
        if (option && typeof option.handler === 'function') {
          option.handler();
        } else {
          this.close();
        }
      });

      button.addEventListener("mouseenter", () => {
        button.focus();
      });

      button.addEventListener("focus", () => {
        const description = this.element.querySelector(".DescriptionBox p");
        if (description) {
          description.textContent = button.dataset.description || '';
        }
      });
    });

    // 键盘导航（上下选择，空格确认）
    this.up = new KeyPressListener("ArrowUp", () => {
      const current = Number(document.activeElement && document.activeElement.getAttribute && document.activeElement.getAttribute("data-button"));
      const prevButton = Array.from(buttons).reverse().find(el => Number(el.dataset.button) < current);
      (prevButton || buttons[buttons.length - 1])?.focus();
    });

    this.down = new KeyPressListener("ArrowDown", () => {
      const current = Number(document.activeElement && document.activeElement.getAttribute && document.activeElement.getAttribute("data-button"));
      const nextButton = Array.from(buttons).find(el => Number(el.dataset.button) > current);
      (nextButton || buttons[0])?.focus();
    });

    this.confirm = new KeyPressListener("Space", (event) => {
      const current = document.activeElement;
      if (current && current.matches && current.matches('button[data-button]')) {
        event?.stopPropagation();
        current.click();
      }
    });

    // ESC 关闭菜单，返回游戏
    this.esc = new KeyPressListener("Escape", () => {
      this.close();
    });

    // 初始聚焦第一个按钮
    setTimeout(() => {
      buttons[0]?.focus();
    }, 10);
  }
}