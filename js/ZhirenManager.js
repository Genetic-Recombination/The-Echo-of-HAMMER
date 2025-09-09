// Zhiren Manager Plugin - 1*4 格子显示图片
(function(){
  class ZhirenManager {
    constructor(options = {}) {
      this.container = options.container || null;
      this.rows = 1;
      this.cols = 4;
      this.total = 4; // 1*4
      this.config = []; // [{id, title, image}]
      this.elements = {};
      this.initialized = false;
    }

    injectStyles() {
      if (document.getElementById("zhiren-manager-styles")) return;

      const style = document.createElement("style");
      style.id = "zhiren-manager-styles";
      style.textContent = `
      .ZhirenButton {
        position: absolute;
        right: 12px;
        top: 60%;
        transform: translateY(-50%);
        width: 56px;
        height: 56px;
        border-radius: 50%;
        background: #fff url("./image in the game/zhiren.png") center/70% no-repeat;
        border: 2px solid rgba(0,0,0,0.2);
        box-shadow: 0 4px 10px rgba(0,0,0,0.25);
        cursor: pointer;
        z-index: 6;
      }
      .ZhirenButton:hover { filter: brightness(1.05); }

      .ZhirenPanel {
        position: absolute;
        right: 12px;
        top: 12px;
        box-sizing: border-box;
        width: auto;
        height: auto;
        background: var(--menu-background, #FFE8D2);
        color: var(--menu-font-color, #3A160D);
        border: 3px solid var(--menu-border-color, #A48465);
        border-radius: 10px;
        box-shadow: 0 10px 24px rgba(0,0,0,0.35);
        z-index: 6;
        display: none;
        padding: 10px;
      }
      .ZhirenPanel.open { display: block; }
      .ZhirenPanel .zp-header {
        display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;
      }
      .ZhirenPanel .zp-title { font-size: 18px; font-weight: bold; margin: 0; }
      .ZhirenPanel .zp-close { background: none; border: 2px solid var(--menu-border-color, #A48465); border-radius: 6px; padding: 4px 8px; cursor: pointer; }
      .ZhirenPanel .zp-close:hover { background: var(--menu-selected-background, #00000044); }

      .ZhirenGrid {
        display: grid;
        grid-template-columns: repeat(4, 56px);
        gap: 8px;
      }
      .ZhirenTile {
        width: 56px;
        height: 56px;
        border-radius: 8px;
        overflow: hidden;
        position: relative;
        border: 2px solid rgba(0,0,0,0.15);
        background: #eee;
        cursor: pointer;
      }
      .ZhirenTile .thumb {
        position: absolute;
        inset: 0;
        background-size: cover;
        background-position: center;
      }
      `;
      document.head.appendChild(style);
    }

    buildDefaultConfig() {
        const images = [
            "./image in the game/character/picture/1.png",
            "./image in the game/character/picture/2.png",
            "./image in the game/character/picture/3.png",
            "./image in the game/character/picture/4.png"
        ];
        const arr = [];
        for (let i = 0; i < this.total; i++) {
            const id = `zhiren_${i+1}`;
            arr.push({
                id,
                title: `Zhiren ${i+1}`,
                image: images[i]
            });
        }
        return arr;
    }

    setConfig(configArray) {
      const defaults = this.buildDefaultConfig();
      const map = new Map();
      defaults.forEach(c => map.set(c.id, c));
      (configArray||[]).forEach(c => { if (c && c.id) map.set(c.id, { ...map.get(c.id), ...c }); });
      this.config = Array.from(map.values()).slice(0, this.total);
      this.renderGrid();
      this.adjustLayout();
    }

    buildUI() {
      this.injectStyles();
      const root = this.container || document.querySelector('.game-container');
      if (!root) return;

      // 按钮
      const btn = document.createElement("button");
      btn.className = "ZhirenButton";
      btn.title = "Zhiren 按钮";
      btn.addEventListener("click", () => this.togglePanel());
      root.appendChild(btn);
      this.elements.btn = btn;

      // 面板
      const panel = document.createElement("div");
      panel.className = "ZhirenPanel";
      panel.innerHTML = `
        <div class="zp-header">
          <h3 class="zp-title">指认嫌疑人</h3>
          <button class="zp-close">关闭</button>
        </div>
        <div class="ZhirenGrid"></div>
      `;
      panel.querySelector(".zp-close").addEventListener("click", ()=> this.togglePanel(false));
      root.appendChild(panel);
      this.elements.panel = panel;
      this.elements.grid = panel.querySelector(".ZhirenGrid");

      this.adjustLayout();
    }

    adjustLayout() {
      if (!this.elements || !this.elements.panel || !this.elements.grid) return;
      const tile = 56;
      const gap = 8;
      this.elements.grid.style.gridTemplateColumns = `repeat(${this.cols}, ${tile}px)`;
      this.elements.grid.style.gap = `${gap}px`;
      const padding = 20;
      const gridWidth = this.cols * tile + (this.cols-1)*gap;
      this.elements.panel.style.width = `${gridWidth+padding}px`;
      this.elements.panel.style.height = 'auto';
    }

    togglePanel(force) {
      const open = typeof force === 'boolean' ? force : !this.elements.panel.classList.contains('open');
      this.elements.panel.classList.toggle('open', open);
    }

    renderGrid() {
      if (!this.elements.grid || !this.config.length) return;
      this.elements.grid.innerHTML = "";
      this.config.forEach(c => {
        const tile = document.createElement("div");
        tile.className = "ZhirenTile";
        tile.title = c.title || c.id;
        const thumb = document.createElement("div");
        thumb.className = "thumb";
        thumb.style.backgroundImage = `url(${c.image})`;
        tile.appendChild(thumb);
        this.elements.grid.appendChild(tile);
      });
    }

    init(container) {
      if (this.initialized) return;
      this.container = container || this.container || document.querySelector('.game-container');
      if (!this.container) return;

      if (!this.config.length) this.config = this.buildDefaultConfig();
      this.buildUI();
      this.renderGrid();
      this.initialized = true;
      window.zhirenManager = this;
    }
  }

  // 自动初始化
  const bootstrap = () => {
    const container = document.querySelector('.game-container');
    if (!container) return false;
    if (!window.zhirenManager) {
      const zm = new ZhirenManager({ container });
      zm.init();
    }
    return true;
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootstrap);
  } else {
    bootstrap();
  }

  // 暴露类
  window.ZhirenManager = ZhirenManager;
})();
