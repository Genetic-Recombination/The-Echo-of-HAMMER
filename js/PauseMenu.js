// 暂停菜单
class PauseMenu {
  constructor({ progress, onComplete }) {
    this.progress = progress;
    this.onComplete = onComplete;
  }

  getOptions(pageKey) {
    if (pageKey === "root") {
      const lineupPizzas = playerState.lineup.map(id => {
        const { pizzaId } = playerState.pizzas[id];
        const base = Pizzas[pizzaId];
        return {
          label: base.name,
          description: base.description,
          handler: () => {
            this.keyboardMenu.setOptions(this.getOptions(id));
          }
        };
      });
      return [
        ...lineupPizzas,
        {
          label: "保存游戏",
          description: "保存当前进度",
          handler: () => {
            this.progress.save();
            this.close();
          }
        },
        {
          label: "关闭",
          description: "返回游戏",
          handler: () => {
            this.close();
          }
        }
      ];
    }

    const unequipped = Object.keys(playerState.pizzas).filter(id => {
      return playerState.lineup.indexOf(id) === -1;
    }).map(id => {
      const { pizzaId } = playerState.pizzas[id];
      const base = Pizzas[pizzaId];
      return {
        label: `${base.name}`,
        description: base.description,
        handler: () => {
          playerState.swapLineup(pageKey, id);
          this.keyboardMenu.setOptions(this.getOptions("root"));
        }
      };
    });

    return [
      ...unequipped,
      {
        label: "移动到储存",
        description: "（当前装备）",
        handler: () => {
          playerState.moveToFront(pageKey);
          this.keyboardMenu.setOptions(this.getOptions("root"));
        }
      },
      {
        label: "返回",
        description: "返回主菜单",
        handler: () => {
          this.keyboardMenu.setOptions(this.getOptions("root"));
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
    this.keyboardMenu.setOptions(this.getOptions("root"));

    container.appendChild(this.element);

    utils.wait(200);
    this.esc = new KeyPressListener("Escape", () => {
      this.close();
    });
  }
}