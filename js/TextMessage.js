// Revealing text effect
class RevealingText {
  constructor(config) {
    this.element = config.element;
    this.text = config.text;
    this.speed = config.speed || 60;

    this.timeout = null;
    this.isDone = false;
  }

  revealOneCharacter() {
    const next = this.characters.splice(0, 1)[0];

    if (!next) {
      this.isDone = true;
      return;
    }

    if (next.isBreak) {
      // 对于换行，插入 <br> 元素
      this.element.appendChild(next.node);
    } else {
      // 只有在显示时才把 span 插入 DOM 并显示
      this.element.appendChild(next.span);
      next.span.classList.add("revealed");
    }

    if (this.characters.length > 0) {
      this.timeout = setTimeout(() => {
        this.revealOneCharacter();
      }, next.delayAfter);
    } else {
      this.isDone = true;
    }
  }

  warpToDone() {
    clearTimeout(this.timeout);
    this.isDone = true;
    // 把所有剩余的字符瞬间显示出来，包含尚未插入的换行节点
    this.characters.forEach(item => {
      if (item.isBreak) {
        this.element.appendChild(item.node);
      } else {
        this.element.appendChild(item.span);
        item.span.classList.add("revealed");
      }
    });
    // 清空队列
    this.characters = [];
  }

  init() {
    this.characters = [];
    // 把文本中可能存在的转义序列 \n 转为真实换行
    const normalized = this.text.replace(/\\n/g, "\n");
    normalized.split("").forEach(character => {
      if (character === "\n") {
        // 为换行准备一个节点，但不立即插入，交由 revealOneCharacter 处理
        const br = document.createElement("br");
        this.characters.push({ isBreak: true, node: br, delayAfter: 0 });
      } else {
        // Create each span but不要立刻加入 DOM，交由 revealOneCharacter 时插入
        let span = document.createElement("span");
        span.textContent = character;

        // Add this span to our internal state Array
        this.characters.push({ span, delayAfter: character === " " ? 0 : this.speed });
      }
    });

    this.revealOneCharacter();
  }
}

// Text message UI
class TextMessage {
  constructor({ text, onComplete, backgroundImage, backgroundSize, backgroundLayout, blurAmount, panelPadding, panelMaxWidth, panelMaxHeight, panelBackground, panelBorderRadius, panelBoxShadow, who }) {
    this.text = text;
    this.onComplete = onComplete;
    this.backgroundImage = backgroundImage;
    this.backgroundSize = backgroundSize || 'cover';
    this.backgroundLayout = backgroundLayout || 'fullscreen';
    this.blurAmount = blurAmount || '8px';
    this.panelPadding = panelPadding || '16px';
    this.panelMaxWidth = panelMaxWidth || '60vw';
    this.panelMaxHeight = panelMaxHeight || '60vh';
    this.panelBackground = panelBackground || 'rgba(255,255,255,0.92)';
    this.panelBorderRadius = panelBorderRadius || '12px';
    this.panelBoxShadow = panelBoxShadow || '0 10px 30px rgba(0,0,0,0.35)';
    this.who = who;
    this.element = null;
    this.portraitElement = null;
    this.overlayPortrait = null;
    this.innerPortrait = null;
    this._onResize = null;
  }

  // 角色ID到立绘文件的映射
  getPortraitPath(characterId) {
    const portraitMap = {
      'hero': './image in the game/character/picture/detective.png',
      'detective': './image in the game/character/picture/detective.png',
      'npc1': './image in the game/character/picture/1.png',
      'npc2': './image in the game/character/picture/2.png',
      'npc3': './image in the game/character/picture/3.png',
      'huasheng': './image in the game/character/picture/huasheng.png',
      'wx': './image in the game/character/picture/wx.png',
      'zq': './image in the game/character/picture/zq.png',
      'interact': null // 旁白不显示立绘
    };
    return portraitMap[characterId] || null;
  }

  createElement() {
    // Create the element
    this.element = document.createElement("div");
    this.element.classList.add("TextMessage");

    // 已改为使用对话框外的“紧贴”立绘，禁用对话框内部立绘
    if (false && this.who) {
      const innerPath = this.getPortraitPath(this.who);
      if (innerPath) {
        this.innerPortrait = document.createElement("div");
        this.innerPortrait.classList.add("TextMessage-inner-portrait");
        // 以内联样式避免依赖外部样式表
        this.innerPortrait.style.position = "absolute";
        this.innerPortrait.style.left = "14px";
        this.innerPortrait.style.bottom = "10px";
        this.innerPortrait.style.width = "150px";
        this.innerPortrait.style.height = "150px";
        // 使用绝对URL并在CSS中加引号，避免空格路径问题
        const innerAbsUrl = new URL(innerPath, document.baseURI).href;
        this.innerPortrait.style.backgroundImage = `url("${innerAbsUrl}")`;
        this.innerPortrait.style.backgroundSize = "contain";
        this.innerPortrait.style.backgroundRepeat = "no-repeat";
        this.innerPortrait.style.backgroundPosition = "left bottom";
        // 立即显示，无动画
        this.innerPortrait.style.opacity = "1";
        this.element.appendChild(this.innerPortrait);
        // 为文本留出空间
        this.element.style.paddingLeft = "180px";
      }
    }

    // 对话框外的“紧贴”立绘
    if (this.who) {
      console.log('开始创建立绘，角色ID:', this.who);
      const portraitPath = this.getPortraitPath(this.who);
      console.log('获取到的立绘路径:', portraitPath);
      if (portraitPath) {
        const container = document.querySelector('.game-container');
        console.log('找到容器:', container);
        if (container) {
          this.overlayPortrait = document.createElement('div');
          this.overlayPortrait.classList.add('OverlayPortrait');
          // 样式以内联实现，避免依赖外部css
          this.overlayPortrait.style.position = 'absolute';
          this.overlayPortrait.style.top = '0px'; // 初始值，将在 init 中重新计算
          this.overlayPortrait.style.left = '0px';
          this.overlayPortrait.style.width = `${Math.round(180 * 1.3)}px`;
          this.overlayPortrait.style.height = `${Math.round(180 * 1.3)}px`;
          // 使用绝对URL并在CSS中加引号，避免空格路径问题
          const overlayAbsUrl = new URL(portraitPath, document.baseURI).href;
          this.overlayPortrait.style.backgroundImage = `url("${overlayAbsUrl}")`;
          this.overlayPortrait.style.backgroundSize = 'contain';
          this.overlayPortrait.style.backgroundRepeat = 'no-repeat';
          this.overlayPortrait.style.backgroundPosition = 'top left';
          this.overlayPortrait.style.zIndex = '6';
          this.overlayPortrait.style.pointerEvents = 'none';
          this.overlayPortrait.style.opacity = '1';
          console.log('立绘元素已创建，准备添加到容器');
          container.appendChild(this.overlayPortrait);
          console.log('立绘元素已添加到容器，立即显示');
        } else {
          console.error('未找到.game-container容器');
        }
      } else {
        console.log('未找到对应的立绘路径');
      }
    }

    // 如果有背景图片，添加全屏/面板背景
    if (this.backgroundImage) {
      console.log('设置全屏背景图片:', this.backgroundImage);
      this.element.classList.add('TextMessage-with-bg');
      const img = new Image();
      img.onload = () => {
        console.log('背景图片加载成功:', this.backgroundImage);
        const absUrl = new URL(this.backgroundImage, document.baseURI).href;
        const container = document.querySelector('.game-container');

        if (this.backgroundLayout === 'panel') {
          // 1) 全屏模糊背景层
          const blurLayer = document.createElement('div');
          blurLayer.classList.add('TextMessage-blur-layer');
          blurLayer.style.position = 'absolute';
          blurLayer.style.top = '0';
          blurLayer.style.left = '0';
          blurLayer.style.width = '100%';
          blurLayer.style.height = '100%';
          blurLayer.style.backgroundImage = `url("${absUrl}")`;
          blurLayer.style.backgroundSize = 'cover';
          blurLayer.style.backgroundPosition = 'center';
          blurLayer.style.backgroundRepeat = 'no-repeat';
          blurLayer.style.filter = `blur(${this.blurAmount}) brightness(0.7)`;
          blurLayer.style.transform = 'scale(1.05)';
          blurLayer.style.zIndex = '1';
          blurLayer.style.pointerEvents = 'none';
          container.insertBefore(blurLayer, container.firstChild);

          // 2) 图片面板层
          const panelWrap = document.createElement('div');
          panelWrap.classList.add('TextMessage-panel-wrap');
          panelWrap.style.position = 'absolute';
          panelWrap.style.inset = '0';
          panelWrap.style.display = 'flex';
          panelWrap.style.alignItems = 'center';
          panelWrap.style.justifyContent = 'center';
          panelWrap.style.zIndex = '1';
          panelWrap.style.pointerEvents = 'none';
          panelWrap.style.padding = '40px 24px 220px';

          const panel = document.createElement('div');
          panel.classList.add('TextMessage-panel');
          panel.style.background = this.panelBackground;
          panel.style.padding = this.panelPadding;
          panel.style.borderRadius = this.panelBorderRadius;
          panel.style.boxShadow = this.panelBoxShadow;
          panel.style.maxWidth = this.panelMaxWidth;
          panel.style.maxHeight = this.panelMaxHeight;
          panel.style.pointerEvents = 'none';

          const imageEl = document.createElement('img');
          imageEl.src = absUrl;
          imageEl.alt = '';
          imageEl.style.display = 'block';
          imageEl.style.maxWidth = '100%';
          imageEl.style.maxHeight = '100%';
          imageEl.style.objectFit = 'contain';
          imageEl.style.borderRadius = '6px';
          imageEl.style.pointerEvents = 'none';

          panel.appendChild(imageEl);
          panelWrap.appendChild(panel);
          container.insertBefore(panelWrap, blurLayer.nextSibling);
        } else {
          // 默认：全屏背景层
          const backgroundLayer = document.createElement('div');
          backgroundLayer.classList.add('TextMessage-background-layer');
          backgroundLayer.style.position = 'absolute';
          backgroundLayer.style.top = '0';
          backgroundLayer.style.left = '0';
          backgroundLayer.style.width = '100%';
          backgroundLayer.style.height = '100%';
          backgroundLayer.style.backgroundImage = `url("${absUrl}")`;
          backgroundLayer.style.backgroundSize = this.backgroundSize;
          backgroundLayer.style.backgroundPosition = 'center';
          backgroundLayer.style.backgroundRepeat = 'no-repeat';
          backgroundLayer.style.zIndex = '1';
          backgroundLayer.style.pointerEvents = 'none';
          container.insertBefore(backgroundLayer, container.firstChild);
        }
        console.log('背景图片已应用');
      };
      img.onerror = () => {
        console.error('背景图片加载失败:', this.backgroundImage);
      };
      img.src = new URL(this.backgroundImage, document.baseURI).href;
    }

    this.element.innerHTML = (`
      <p class="TextMessage_p"></p>
      <button class="TextMessage_button">继续</button>
    `);

    // Init the typewriter effect
    this.revealingText = new RevealingText({
      element: this.element.querySelector(".TextMessage_p"),
      text: this.text
    });

    this.element.querySelector("button").addEventListener("click", (e) => {
      e.stopPropagation();
      // Close the text message
      this.done();
    });

    this.actionListener = new KeyPressListener("Space", () => {
      this.done();
    });
  }

  // 计算并设置立绘位置，使其贴靠对话框外侧（顶部略上方，左对齐）
  positionOverlay(container) {
    try {
      if (!this.overlayPortrait || !this.element) return;
      const containerRect = container.getBoundingClientRect();
      const dialogRect = this.element.getBoundingClientRect();
      const w = this.overlayPortrait.offsetWidth;
      const h = this.overlayPortrait.offsetHeight;
      // 紧贴对话框顶部，左对齐，留出少量间距
      let top = (dialogRect.top - containerRect.top) - h - 3; // 顶部 3px 间距
      let left = (dialogRect.left - containerRect.left); // 左侧保持贴齐（0px 间距）
      // 边界约束，避免溢出
      top = Math.max(0, top);
      left = Math.max(0, Math.min(left, container.clientWidth - w));
      this.overlayPortrait.style.top = `${top}px`;
      this.overlayPortrait.style.left = `${left}px`;
    } catch (e) {
      console.error('定位立绘时出错:', e);
    }
  }

  done() {
    if (this.revealingText.isDone) {
      // 清理事件监听
      if (this._onResize) {
        window.removeEventListener('resize', this._onResize);
        this._onResize = null;
      }

      // 立绘直接移除（对话框内）
      if (this.innerPortrait) {
        if (this.innerPortrait && this.innerPortrait.parentNode) {
          this.innerPortrait.parentNode.removeChild(this.innerPortrait);
          this.innerPortrait = null;
        }
      }
      // 外部立绘移除
      if (this.overlayPortrait) {
        if (this.overlayPortrait && this.overlayPortrait.parentNode) {
          this.overlayPortrait.parentNode.removeChild(this.overlayPortrait);
          this.overlayPortrait = null;
        }
      }

      // 移除背景/面板层
      const backgroundLayer = document.querySelector('.TextMessage-background-layer');
      if (backgroundLayer) backgroundLayer.remove();
      const blurLayer = document.querySelector('.TextMessage-blur-layer');
      if (blurLayer) blurLayer.remove();
      const panelWrap = document.querySelector('.TextMessage-panel-wrap');
      if (panelWrap) panelWrap.remove();

      // 立即移除元素
      this.element.remove();
      this.actionListener.unbind();
      this.onComplete();
    } else {
      this.revealingText.warpToDone();
    }
  }

  init(container) {
    this.createElement();
    container.appendChild(this.element);
    // 根据对话框位置重新定位立绘，使之“紧贴对话框”
    if (this.overlayPortrait) {
      requestAnimationFrame(() => this.positionOverlay(container));
      if (!this._onResize) {
        this._onResize = () => this.positionOverlay(container);
        window.addEventListener('resize', this._onResize);
      }
    }
    this.revealingText.init();

    // 阻止对话容器内部的按键冒泡到全局，避免同一次空格触发重复交互
    this.element.addEventListener('keydown', (e) => {
      if (e.code === 'Space') {
        e.stopPropagation();
        e.preventDefault();
      }
    });
  }
}