// 通用二级交互菜单系统
class InteractionMenu {
  constructor({ title, options, onComplete }) {
    this.title = title;
    this.options = options;
    this.onComplete = onComplete;
  }

  init(container) {
    this.element = document.createElement("div");
    this.element.classList.add("InteractionMenu");
    this.element.innerHTML = (`
      <div class="menu-title">${this.title}</div>
      <div class="menu-options">
        ${this.options.map((option, index) => `
          <div class="option">
            <button data-button="${index}" data-description="${option.description}">${option.label}</button>
          </div>
        `).join('')}
      </div>
      <div class="DescriptionBox">
        <p>${this.options[0]?.description || '选择你的行动'}</p>
      </div>
    `);
    
    container.appendChild(this.element);

    // 绑定按钮事件
    const buttons = this.element.querySelectorAll("button");
    buttons.forEach((button, index) => {
      button.addEventListener("click", () => {
        const option = this.options[index];
        if (option.handler) {
          option.handler();
        }
        this.close();
      });
      
      button.addEventListener("mouseenter", () => {
        button.focus();
      });
      
      button.addEventListener("focus", () => {
        const description = this.element.querySelector(".DescriptionBox p");
        description.textContent = button.dataset.description;
      });
    });

    // 绑定键盘事件
    this.up = new KeyPressListener("ArrowUp", () => {
      const current = Number(document.activeElement.getAttribute("data-button"));
      const prevButton = Array.from(buttons).reverse().find(el => {
        return Number(el.dataset.button) < current;
      });
      prevButton?.focus();
    });
    
    this.down = new KeyPressListener("ArrowDown", () => {
      const current = Number(document.activeElement.getAttribute("data-button"));
      const nextButton = Array.from(buttons).find(el => {
        return Number(el.dataset.button) > current;
      });
      nextButton?.focus();
    });

    // 支持空格键选择当前聚焦项
    this.confirm = new KeyPressListener("Space", () => {
      const current = document.activeElement;
      if (current && current.matches('button[data-button]')) {
        current.click();
      }
    });

    // 设置初始焦点
    setTimeout(() => {
      buttons[0].focus();
    }, 10);
  }

  close() {
    if (this.up) this.up.unbind();
    if (this.down) this.down.unbind();
    if (this.confirm) this.confirm.unbind();
    this.element.remove();
    this.onComplete();
  }
}
