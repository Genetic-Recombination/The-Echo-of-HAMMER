// Clue Collection Plugin - generic framework
(function(){
  class ClueManager {
    constructor(options = {}) {
      this.container = options.container || null;
      this.rows = options.rows || 6; // 六行
      this.cols = options.cols || 4; // 四列
      this.total = options.total || 24;
      this.config = []; // [{id, title, image, desc}]
      this.elements = {};
      this.initialized = false;
      this.ensurePlayerState();
    }

    ensurePlayerState() {
      if (!window.playerState) {
        window.playerState = {};
      }
      if (!window.playerState.clues) {
        window.playerState.clues = {}; // id -> true
      }
    }

    injectStyles() {
      if (document.getElementById("clue-plugin-styles")) return;
      const style = document.createElement("style");
      style.id = "clue-plugin-styles";
      style.textContent = `
      .ClueBagButton {
        position: absolute;
        right: 12px;
        top: 50%;
        transform: translateY(-50%);
        width: 56px;
        height: 56px;
        border-radius: 50%;
        background: #fff url("./image in the game/bag.png") center/70% no-repeat;
        border: 2px solid rgba(0,0,0,0.2);
        box-shadow: 0 4px 10px rgba(0,0,0,0.25);
        cursor: pointer;
        z-index: 6;
      }
      .ClueBagButton:hover { filter: brightness(1.05); }

      .CluePanel {
        position: absolute;
        right: 12px;
        top: 12px;
        box-sizing: border-box;
        width: auto; /* 将宽度交由 JS 计算并尽量贴合矩阵 */
        height: auto; /* 高度自适应内容 */
        background: var(--menu-background, #FFE8D2);
        color: var(--menu-font-color, #3A160D);
        border: 3px solid var(--menu-border-color, #A48465);
        border-radius: 10px;
        box-shadow: 0 10px 24px rgba(0,0,0,0.35);
        z-index: 6;
        display: none;
        padding: 10px;
      }
      .CluePanel.open { display: block; }
      .CluePanel .cp-header {
        display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;
      }
      .CluePanel .cp-title { font-size: 18px; font-weight: bold; margin: 0; }
      .CluePanel .cp-close { background: none; border: 2px solid var(--menu-border-color, #A48465); border-radius: 6px; padding: 4px 8px; cursor: pointer; }
      .CluePanel .cp-close:hover { background: var(--menu-selected-background, #00000044); }

      .ClueGrid { 
        display: grid; 
        grid-template-columns: repeat(4, 56px); /* 默认四列，每个格子 56px；JS 会根据配置覆盖 */
        gap: 8px; 
      }
      .ClueTile {
        width: 56px; height: 56px; border-radius: 8px; overflow: hidden; position: relative; border: 2px solid rgba(0,0,0,0.15); background: #eee; cursor: pointer;
      }
      .ClueTile .thumb { position: absolute; inset: 0; background-size: cover; background-position: center; filter: grayscale(0); }
      .ClueTile.locked { background: linear-gradient(135deg, #ddd, #f5f5f5); }
      .ClueTile.locked::after { content: "?"; position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; font-size: 28px; color: #999; font-weight: 800; }

      .ClueModalMask { position: absolute; inset: 0; background: rgba(0,0,0,0.5); z-index: 7; display: none; align-items: center; justify-content: center; }
      .ClueModalMask.open { display: flex; }
      .ClueModal { background: var(--menu-background, #FFE8D2); color: var(--menu-font-color, #3A160D); border: 3px solid var(--menu-border-color, #A48465); border-radius: 10px; width: 620px; max-width: 90%; max-height: 90%; overflow: auto; box-shadow: 0 10px 24px rgba(0,0,0,0.35); }
      .ClueModal .cm-header { display: flex; align-items: center; justify-content: space-between; padding: 8px 12px; border-bottom: 1px solid var(--menu-border-color, #A48465); }
      .ClueModal .cm-title { margin: 0; font-size: 18px; }
      .ClueModal .cm-close { background: none; border: 2px solid var(--menu-border-color, #A48465); border-radius: 6px; padding: 4px 8px; cursor: pointer; }
      .ClueModal .cm-close:hover { background: var(--menu-selected-background, #00000044); }
      .ClueModal .cm-body { padding: 12px; display: flex; gap: 12px; }
      .ClueModal .cm-image { width: 260px; height: 260px; background: #fff; background-size: contain; background-repeat: no-repeat; background-position: center; border-radius: 6px; border: 2px solid rgba(0,0,0,0.15); }
      .ClueModal .cm-desc { flex: 1; white-space: pre-wrap; line-height: 1.4; }
      `;
      document.head.appendChild(style);
    }

    buildDefaultConfig() {
      const arr = [];
      for (let i=1; i<=this.total; i++) {
        const id = `clue_${String(i).padStart(2,'0')}`;
        arr.push({
          id,
          title: `线索 ${i}`,
          image: "./image in the game/article/客厅.png", // 占位图，待你替换
          desc: `这里是线索 ${i} 的描述，替换为你的文本。`
        });
      }
      return arr;
    }

    setConfig(configArray) {
      // 接受 24 个条目；可少于 24，会以默认填充
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
      const root = this.container;
      // 按钮
      const btn = document.createElement("button");
      btn.className = "ClueBagButton";
      btn.title = "线索袋 (Clues)";
      btn.addEventListener("click", () => this.togglePanel());
      root.appendChild(btn);
      this.elements.btn = btn;

      // 面板
      const panel = document.createElement("div");
      panel.className = "CluePanel";
      panel.innerHTML = `
        <div class="cp-header">
          <h3 class="cp-title">线索收集（${this.total}）</h3>
          <button class="cp-close">关闭</button>
        </div>
        <div class="ClueGrid"></div>
      `;
      panel.querySelector(".cp-close").addEventListener("click", ()=> this.togglePanel(false));
      root.appendChild(panel);
      this.elements.panel = panel;
      this.elements.grid = panel.querySelector(".ClueGrid");

      // 弹窗
      const mask = document.createElement("div");
      mask.className = "ClueModalMask";
      mask.innerHTML = `
        <div class="ClueModal">
          <div class="cm-header">
            <h3 class="cm-title">详情</h3>
            <button class="cm-close">关闭</button>
          </div>
          <div class="cm-body">
            <div class="cm-image"></div>
            <div class="cm-desc"></div>
          </div>
        </div>
      `;
      mask.addEventListener("click", (e)=>{ if(e.target===mask) this.openDetail(null,false); });
      mask.querySelector(".cm-close").addEventListener("click", ()=> this.openDetail(null,false));
      root.appendChild(mask);
      this.elements.modalMask = mask;
      this.elements.modal = mask.querySelector(".ClueModal");
      this.elements.modalImage = mask.querySelector(".cm-image");
      this.elements.modalTitle = mask.querySelector(".cm-title");
      this.elements.modalDesc = mask.querySelector(".cm-desc");

      // 按当前四列六行布局，尽量让面板贴合矩阵尺寸
      this.adjustLayout();
    }

    // 根据列/行/格子尺寸，动态设置网格列数和面板宽度
    adjustLayout() {
      if (!this.elements || !this.elements.panel || !this.elements.grid) return;
      const tile = 56; // 单元格尺寸
      const gap = 8;   // 网格间距
      const cols = this.cols || 4;
      const rows = this.rows || 6;
      // 设置网格列
      this.elements.grid.style.gridTemplateColumns = `repeat(${cols}, ${tile}px)`;
      this.elements.grid.style.gap = `${gap}px`;
      // 计算面板宽度（包含 padding，已使用 border-box）
      const padding = 20; // .CluePanel padding:10px * 2
      const gridWidth = cols * tile + (cols - 1) * gap;
      const panelWidth = gridWidth + padding;
      this.elements.panel.style.width = `${panelWidth}px`;
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
        const discovered = !!window.playerState.clues[c.id];
        const tile = document.createElement("div");
        tile.className = "ClueTile" + (discovered?"":" locked");
        tile.title = discovered ? (c.title||c.id) : "未发现";
        if (discovered) {
          const thumb = document.createElement("div");
          thumb.className = "thumb";
          thumb.style.backgroundImage = `url(${c.image})`;
          tile.appendChild(thumb);
        }
        tile.addEventListener("click", () => {
          if (discovered) {
            this.openDetail(c.id, true);
          } else {
            this.openDetail(c.id, false);
          }
        });
        this.elements.grid.appendChild(tile);
      });
    }

    openDetail(id, discovered) {
      if (!id) { this.elements.modalMask.classList.remove('open'); return; }
      const cfg = this.config.find(x=>x.id===id) || { title: id, image: "", desc: "" };
      if (!discovered) {
        this.elements.modalTitle.textContent = cfg.title || id;
        this.elements.modalImage.style.backgroundImage = "";
        this.elements.modalDesc.textContent = "尚未找到该线索。";
      } else {
        this.elements.modalTitle.textContent = cfg.title || id;
        this.elements.modalImage.style.backgroundImage = `url(${cfg.image})`;
        this.elements.modalDesc.textContent = cfg.desc || "暂无描述";
      }
      this.elements.modalMask.classList.add('open');
    }

    discoverClue(id, options={}) {
      if (!id) return;
      this.ensurePlayerState();
      if (!window.playerState.clues[id]) {
        window.playerState.clues[id] = true;
        this.renderGrid();
        try { window.overworld && window.overworld.progress && window.overworld.progress.save && window.overworld.progress.save(); } catch(e){}
      }
      // 可选提示
      if (options.toast !== false) {
        // 简单提示：使用 TextMessage 或浏览器提示
        if (window.OverworldEvent && options.useDialog) {
          // no-op here; typically you would queue a textMessage
        } else {
          console.log("[Clue] Discovered:", id);
        }
      }
    }

    init(container) {
      if (this.initialized) return;
      this.container = container || this.container || document.querySelector('.game-container');
      if (!this.container) return;
      if (!this.config.length) this.config = this.buildDefaultConfig();
      this.buildUI();
      this.renderGrid();
      this.initialized = true;
      window.clueManager = this;
    }
  }

  // Expose
  window.ClueManager = ClueManager;

  // Auto-initialize when overworld and game-container are ready
  const bootstrap = () => {
    const container = document.querySelector('.game-container');
    if (!container || !window.overworld) return false;
    if (!window.clueManager) {
      const cm = new ClueManager({ container });
      cm.init();
    }
    return true;
  };
  const timer = setInterval(() => {
    if (bootstrap()) clearInterval(timer);
  }, 250);
})();