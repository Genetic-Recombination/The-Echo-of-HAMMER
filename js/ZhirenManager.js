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
      this.answers = {}; // 记录玩家的答案 {题号: true/false}
      this.currentTileIndex = -1; // 当前点击的 tile 索引
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
      /* 修改选中高亮为深灰色 */
      .ExamPanel .options button.selected { 
        background: #555555; 
        color: #fff; 
      }

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
        ["送货员杀害了死者。", "门口的卡片是送货员放的。", "前两人的送货单是死者销毁的。", "扳手是送货员杀掉死者的工具。", "送货员用自带的降压药毒倒了死者。"],
        ["机车女杀害了死者。", "榔头男在屋内叫了三个人混淆警方，后被其中一人杀害。", "前两人的送货单被机车女烧毁。", "门口的卡片是死者放的。", "榔头男收拾卫生间是为了掩盖证据逃跑。"],
        ["外卖员是杀害死者的凶手。", "外卖员烧毁了两张送货单。", "外卖员把卫生间清理干净之后离开。", "外卖员用送货员的扳手打死了死者。", "榔头男收拾卫生间是为了掩盖证据逃跑。"],
        ["榔头男是自杀。", "榔头男为了死的体面打扫了卫生间。", "榔头男是内衣大盗。", "榔头男的都市传说是真实的。", "榔头男烧毁了两张纸条。"]
      ];
      const answersSet = [
        [false, false, false, false, false],   // 图1答案
        [true, false, true, false, true],    // 图2答案
        [false, false, false, false, true],    // 图3答案
        [false, false, false, false, true]     // 图4答案
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
      btn.title = "指认凶手(Identify)";
      btn.addEventListener("click",()=>this.togglePanel());
      root.appendChild(btn);
      this.elements.btn = btn;

      // 面板
      const panel = document.createElement("div");
      panel.className = "ZhirenPanel";
      panel.innerHTML = `
        <div class="zp-header">
          <h3 class="zp-title">指认凶手</h3>
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
          <h3 class="exam-title">证据链</h3>
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

    toggleExam(force, questions=[], answers=[], imageId=null) {
      const open = typeof force==='boolean'?force:!this.elements.exam.classList.contains('open');
      this.elements.exam.classList.toggle('open',open);
      if(open && questions.length){
        this.renderExam(questions, answers, imageId);
      }
    }

    renderExam(questions, answers, imageId=null){
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
        // 只有点击第二个 tile 才可能抓住榔头男
        if(this.currentTileIndex !== 1){
          result.textContent = "❌ 指认失败，榔头男跑掉了。";
          return;
        }

        let allCorrect = true;
        questions.forEach((q,i)=>{
          if(this.answers[i] !== answers[i]) allCorrect = false;
        });
        
        // 创建弹窗
        const modal = document.createElement("div");
        modal.style.cssText = `
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.7);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        `;
        
        const modalContent = document.createElement("div");
        modalContent.style.cssText = `
          background: #FFE8D2;
          padding: 30px;
          border-radius: 10px;
          border: 3px solid #A48465;
          text-align: center;
          max-width: 800px;
          width: 80%;
        `;
        
        const resultText = document.createElement("div");
        resultText.style.cssText = `
          font-size: 20px;
          margin-bottom: 20px;
          font-weight: bold;
          text-align: left;
          line-height: 1.5;
          word-break: break-word;
        `;
        
        const buttonContainer = document.createElement("div");
        buttonContainer.style.cssText = `
          display: flex;
          justify-content: center;
          gap: 20px;
          margin-top: 20px;
        `;
        
        const button1 = document.createElement("button");
        button1.style.cssText = `
          padding: 10px 20px;
          background: #ffd966;
          border: 2px solid #A48465;
          border-radius: 6px;
          cursor: pointer;
          font-weight: bold;
        `;
        
        const button2 = document.createElement("button");
        button2.style.cssText = `
          padding: 10px 20px;
          background: #fff;
          border: 2px solid #A48465;
          border-radius: 6px;
          cursor: pointer;
          font-weight: bold;
        `;
        
        // 根据图片ID设置按钮文本
        let button1Text = "强行抓捕，结案下班";
        let button2Text = "继续调查，解释疑点";
        
        if (imageId === "zhiren_1") {
          button1Text = "强行抓捕，结案下班";
          button2Text = "继续调查，解释疑点";
        } else if (imageId === "zhiren_2") {
          // 图2根据答题是否完全正确设置不同的按钮文本
          if (allCorrect) {
            button1Text = "你抓捕了榔头男破解了真相，通往结局吧";
          } else {
            button1Text = "强行结案，结束调查";
            button2Text = "返回游戏，继续调查";
          }
        } else if (imageId === "zhiren_3") {
          button1Text = "强行抓捕，结案下班";
          button2Text = "继续调查，解释疑点";
        } else if (imageId === "zhiren_4") {
          button1Text = "强行结案，网吧包宿";
          button2Text = "继续调查，解释疑点";
        }
        
        button1.textContent = button1Text;
        button2.textContent = button2Text;
        
        // 根据图片ID决定跳转链接和文本内容
        let redirectUrl = "./指认系统/外卖员.html"; // 默认跳转到游戏结束页面
        let popupText = "你确定要指认这个人吗？";
        
        if (imageId === "zhiren_1") {
          redirectUrl = "./指认系统/送货员.html"; // 图1跳转到结局页面
          popupText = "可是......<br>似乎仍有许多疑点在你脑中挥之不去<br>如果真的是送货员,那他又是怎么做到能销毁机车女的收据？？<br>如果是临时的复仇又怎么确定自己杀人时机车女不会来到这里？？<br>这杂乱的客厅，空旷的抽屉柜，洁净的卫生间又该怎么解释？？";
        } else if (imageId === "zhiren_2") {
          // 图2根据答题是否完全正确跳转到不同页面
          if (allCorrect) {
            redirectUrl = "./pages/ending/ending.html"; // 答题完全正确跳转到机车女结局
          } else {
            redirectUrl = "./指认系统/机车女.html"; // 答题不完全正确跳转到游戏结束页面2
          }
          popupText = "好像还是有很多疑点，再仔细思索一下吧<br>她为什么要清扫卫生间，为什么要清理抽屉柜，为什么要清理浴缸？？<br>鞋柜的疑点又怎么解释？？";
        } else if (imageId === "zhiren_3") {
          redirectUrl = "./指认系统/外卖员.html"; // 图3跳转到游戏结束页面3
          popupText = "终于结束了...你这样想着<br>但你忽然注意到角落里的某人，嘴角掠过一抹不易察觉的微笑，像是在嘲笑你这个大侦探<br>几个疑点闪过你的脑海，最后一个来的外卖员在房间里也就不过3分钟时间，怎么会有这么长的时间来布置现场？<br>他又到底出于什么目的，把卫生间清理的那样干净，浴缸排水口又这么会一点使用痕迹都没有？？";
        } else if (imageId === "zhiren_4") {
          redirectUrl = "./指认系统/自杀.html"; // 图4跳转到游戏结束页面4
          popupText = "看来的确是自杀了...<br>等等，一个吃安眠药自杀的人为什么不是躺在床上？？<br>决心自杀的人又为什么要戴着一顶碍事的帽子？？？<br>他又何必要销毁前两个人的收据？安眠药的功效又何以发生的如此之快，以至于在10分钟内就气绝身亡";
        }
        
        resultText.innerHTML = popupText;
        
        // 添加跳转逻辑
        button1.onclick = () => {
          window.location.href = redirectUrl;
        };
        button2.onclick = () => {
          document.body.removeChild(modal);
          this.toggleExam(false);
        };
        
        modalContent.appendChild(resultText);
        buttonContainer.appendChild(button1);
        buttonContainer.appendChild(button2);
        modalContent.appendChild(buttonContainer);
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
        
        // 点击弹窗外部关闭
        modal.addEventListener("click", (e) => {
          if (e.target === modal) {
            document.body.removeChild(modal);
          }
        });
      });

      this.elements.examContent.appendChild(submit);
      this.elements.examContent.appendChild(result);
    }

    renderGrid() {
      if(!this.elements.grid || !this.config.length) return;
      this.elements.grid.innerHTML = "";
      this.config.forEach((c,index)=>{
        const tile = document.createElement("div");
        tile.className = "ZhirenTile";
        tile.title = c.title || c.id;
        tile.dataset.index = index;

        const thumb = document.createElement("div");
        thumb.className = "thumb";
        thumb.style.backgroundImage = `url(${c.image})`;
        tile.appendChild(thumb);
        this.elements.grid.appendChild(tile);

        // 点击 tile 打开对应的卷子
        tile.addEventListener("click",()=>{
          this.currentTileIndex = index; // 保存当前点击的 tile
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
