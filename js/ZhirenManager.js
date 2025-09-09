// Zhiren Manager Plugin - 1*4 格子显示图片 
(function(){
  class ZhirenManager {
    constructor(options = {}) {
      this.container = options.container || null;
      this.rows = 1;
      this.cols = 4;
      this.total = 4; // 1*4
      this.config = []; // [{id, title, image, questions, answers}]
      this.elements = {};
      this.initialized = false;
      this.answers = {}; // 记录玩家的答案 {题号: "对/错"}
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
        z-index: 5;
      }
      .ZhirenButton:hover { filter: brightness(1.05); }

      .ZhirenPanel, .ExamPanel {
        position: absolute;
        right: 12px;
        top: 12px;
        box-sizing: border-box;
        background: var(--menu-background, #FFE8D2);
        color: var(--menu-font-color, #3A160D);
        border: 3px solid var(--menu-border-color, #A48465);
        border-radius: 10px;
        box-shadow: 0 10px 24px rgba(0,0,0,0.35);
        z-index: 6;
        display: none;
        padding: 10px;
      }
      .ZhirenPanel.open, .ExamPanel.open { display: block; }
      .ZhirenPanel .zp-header, .ExamPanel .exam-header {
        display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;
      }
      .ZhirenPanel .zp-title, .ExamPanel .exam-title { font-size: 18px; font-weight: bold; margin: 0; }
      .ZhirenPanel .zp-close, .ExamPanel .exam-close { 
        background: none; border: 2px solid var(--menu-border-color, #A48465); 
        border-radius: 6px; padding: 4px 8px; cursor: pointer; 
      }
      .ZhirenPanel .zp-close:hover, .ExamPanel .exam-close:hover { background: var(--menu-selected-background, #00000044); }

      .ZhirenGrid { display: grid; gap: 8px; }
      .ZhirenTile {
        width: 56px; height: 56px; border-radius: 8px; overflow: hidden; 
        position: relative; border: 2px solid rgba(0,0,0,0.15); 
        background: #eee; cursor: pointer;
      }
      .ZhirenTile .thumb { position: absolute; inset: 0; background-size: cover; background-position: center; }

      .ExamPanel .question { margin: 10px 0; font-size: 14px; }
      .ExamPanel .options { margin-top: 4px; }
      .ExamPanel .options button {
        margin-right: 6px; 
        padding: 4px 10px; 
        border: 2px solid var(--menu-border-color, #A48465);
        border-radius: 6px; 
        cursor: pointer; 
        background: #fff;
      }
      .ExamPanel .options button.selected { background: #90EE90; } /* 已选择高亮 */

      .ExamPanel .submit-btn {
        margin-top: 12px;
        padding: 6px 12px;
        font-weight: bold;
        border: 2px solid var(--menu-border-color, #A48465);
        border-radius: 6px;
        cursor: pointer;
        background: #ffd966;
      }
      .ExamPanel .result {
        margin-top: 10px;
        font-weight: bold;
        font-size: 16px;
      }
      `;
      document.head.appendChild(style);
    }

    buildDefaultConfig() {
      const images = [
        "image%20in%20the%20game/character/picture/1.png",
        "image%20in%20the%20game/character/picture/2.png",
        "image%20in%20the%20game/character/picture/3.png",
        "image%20in%20the%20game/character/picture/4.png"
      ];
      const questionsSet = [
        ["图1中的人物在逃跑。", "图1中有人拿着武器。", "图1发生在晚上。", "图1的场景在室内。", "图1的人物很紧张。"],
        ["图2展示的是公园。", "图2里有两个人物。", "图2发生在白天。", "图2有人拿着手机。", "图2的人物在交谈。"],
        ["图3的人物戴着帽子。", "图3背景有一辆车。", "图3发生在街道。", "图3的人物是嫌疑人。", "图3里没有其他人。"],
        ["图4里有桌子。", "图4发生在办公室。", "图4的人物在看文件。", "图4场景光线很暗。", "图4的人物很镇定。"]
      ];
      const answersSet = [
        [true, false, true, false, true],   // 图1答案
        [true, true, true, false, true],    // 图2答案
        [true, false, true, true, true],    // 图3答案
        [true, true, false, true, true]     // 图4答案
      ];

      const arr = [];
      for (let i=0;i<this.total;i++) {
        arr.push({ 
          id: `zhiren_${i+1}`, 
          title: `Zhiren ${i+1}`, 
          image: images[i],
          questions: questionsSet[i],
          answers: answersSet[i]
        });
      }
      return arr;
    }

    setConfig(configArray) {
      const defaults = this.buildDefaultConfig();
      const map = new Map();
      defaults.forEach(c=>map.set(c.id,c));
      (configArray||[]).forEach(c=>{ if(c&&c.id) map.set(c.id,{...map.get(c.id),...c}); });
      this.config = Array.from(map.values()).slice(0,this.total);
      this.renderGrid();
      this.adjustLayout();
    }

    buildUI() {
      this.injectStyles();
      const root = this.container || document.querySelector('.game-container');
      if(!root){ console.warn("⚠️ ZhirenManager: 未找到容器 .game-container"); return; }

      // 按钮
      const btn = document.createElement("button");
      btn.className = "ZhirenButton";
      btn.title = "Zhiren 按钮";
      btn.addEventListener("click",()=>this.togglePanel());
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
      panel.querySelector(".zp-close").addEventListener("click",()=>this.togglePanel(false));
      root.appendChild(panel);
      this.elements.panel = panel;
      this.elements.grid = panel.querySelector(".ZhirenGrid");

      // 卷子面板
      const exam = document.createElement("div");
      exam.className = "ExamPanel";
      exam.innerHTML = `
        <div class="exam-header">
          <h3 class="exam-title">卷子</h3>
          <button class="exam-close">关闭</button>
        </div>
        <div class="exam-content"></div>
      `;
      exam.querySelector(".exam-close").addEventListener("click",()=>this.toggleExam(false));
      root.appendChild(exam);
      this.elements.exam = exam;
      this.elements.examContent = exam.querySelector(".exam-content");

      this.adjustLayout();
    }

    adjustLayout() {
      if(!this.elements || !this.elements.panel || !this.elements.grid) return;
      const tile = 56;
      const gap = 8;
      this.elements.grid.style.gridTemplateColumns = `repeat(${this.cols}, ${tile}px)`;
      this.elements.grid.style.gap = `${gap}px`;
      const padding = 20;
      const gridWidth = this.cols*tile + (this.cols-1)*gap;
      this.elements.panel.style.width = `${gridWidth+padding}px`;
      this.elements.panel.style.height = 'auto';

      this.elements.exam.style.width = "420px";
      this.elements.exam.style.maxHeight = "500px";
      this.elements.exam.style.overflowY = "auto";
    }

    togglePanel(force) {
      const open = typeof force==='boolean'?force:!this.elements.panel.classList.contains('open');
      this.elements.panel.classList.toggle('open',open);
    }

    toggleExam(force, questions=[], answers=[]) {
      const open = typeof force==='boolean'?force:!this.elements.exam.classList.contains('open');
      this.elements.exam.classList.toggle('open',open);
      if(open && questions.length){
        this.renderExam(questions, answers);
      }
    }

    renderExam(questions, answers){
      this.elements.examContent.innerHTML = "";
      this.answers = {}; // 每次打开清空答案
      questions.forEach((q,i)=>{
        const div = document.createElement("div");
        div.className = "question";
        div.innerHTML = `<div>${i+1}. ${q}</div>`;
        
        const opts = document.createElement("div");
        opts.className = "options";
        
        const btnTrue = document.createElement("button");
        btnTrue.textContent = "✔ 对";
        btnTrue.addEventListener("click",()=>{
          this.answers[i] = true;
          btnTrue.classList.add("selected");
          btnFalse.classList.remove("selected");
        });

        const btnFalse = document.createElement("button");
        btnFalse.textContent = "✘ 错";
        btnFalse.addEventListener("click",()=>{
          this.answers[i] = false;
          btnFalse.classList.add("selected");
          btnTrue.classList.remove("selected");
        });

        opts.appendChild(btnTrue);
        opts.appendChild(btnFalse);
        div.appendChild(opts);
        this.elements.examContent.appendChild(div);
      });

      // 提交按钮
      const submit = document.createElement("button");
      submit.className = "submit-btn";
      submit.textContent = "提交";
      const result = document.createElement("div");
      result.className = "result";

      submit.addEventListener("click",()=>{
        if(Object.keys(this.answers).length < questions.length){
          result.textContent = "⚠️ 还有题目未作答！";
          return;
        }
        let allCorrect = true;
        questions.forEach((q,i)=>{
          if(this.answers[i] !== answers[i]) allCorrect = false;
        });
        if(allCorrect){
          result.textContent = "🎉 抓住了“榔头男”！";
        } else {
          result.textContent = "❌ 指认失败，榔头男跑掉了。";
        }
      });

      this.elements.examContent.appendChild(submit);
      this.elements.examContent.appendChild(result);
    }

    renderGrid() {
      if(!this.elements.grid || !this.config.length) return;
      this.elements.grid.innerHTML = "";
      this.config.forEach((c)=>{
        const tile = document.createElement("div");
        tile.className = "ZhirenTile";
        tile.title = c.title || c.id;

        const thumb = document.createElement("div");
        thumb.className = "thumb";
        thumb.style.backgroundImage = `url(${c.image})`;
        tile.appendChild(thumb);
        this.elements.grid.appendChild(tile);

        // 点击 tile 打开对应的卷子
        tile.addEventListener("click",()=>{
          this.toggleExam(true, c.questions, c.answers);
        });
      });
    }

    init(container){
      if(this.initialized) return;
      this.container = container || this.container || document.querySelector('.game-container');
      if(!this.container){ console.warn("⚠️ ZhirenManager: 未找到容器 .game-container"); return; }
      if(!this.config.length) this.config = this.buildDefaultConfig();
      this.buildUI();
      this.renderGrid();
      this.initialized = true;
      window.zhirenManager = this;
      console.log("✅ ZhirenManager 初始化完成");
    }
  }

  window.ZhirenManager = ZhirenManager;

  // 自动初始化
  const bootstrap = () => {
    const container = document.querySelector('.game-container');
    if(!container) return false;
    if(!window.zhirenManager){
      const zm = new ZhirenManager({container});
      zm.init();
    }
    return true;
  };
  const timer = setInterval(()=>{ if(bootstrap()) clearInterval(timer); }, 250);
})();
