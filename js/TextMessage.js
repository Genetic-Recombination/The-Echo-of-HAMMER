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
  constructor({ text, onComplete, backgroundImage }) {
    this.text = text;
    this.onComplete = onComplete;
    this.backgroundImage = backgroundImage;
    this.element = null;
  }

  createElement() {
    // Create the element
    this.element = document.createElement("div");
    this.element.classList.add("TextMessage");

    // 如果有背景图片，添加全屏背景图片
    if (this.backgroundImage) {
      console.log('设置全屏背景图片:', this.backgroundImage);
      this.element.classList.add('TextMessage-with-bg');
      
      // 预加载图片以确保显示
      const img = new Image();
      img.onload = () => {
        console.log('背景图片加载成功:', this.backgroundImage);
        
        // 创建全屏背景层
        const backgroundLayer = document.createElement('div');
        backgroundLayer.classList.add('TextMessage-background-layer');
        backgroundLayer.style.position = 'absolute';
        backgroundLayer.style.top = '0';
        backgroundLayer.style.left = '0';
        backgroundLayer.style.width = '100%';
        backgroundLayer.style.height = '100%';
        const encodedUrl = encodeURI(this.backgroundImage);
        backgroundLayer.style.backgroundImage = `url("${encodedUrl}")`;
        backgroundLayer.style.backgroundSize = 'cover';
        backgroundLayer.style.backgroundPosition = 'center';
        backgroundLayer.style.backgroundRepeat = 'no-repeat';
        backgroundLayer.style.zIndex = '1';
        
        // 将背景层插入到容器的最前面
        const container = document.querySelector('.game-container');
        container.insertBefore(backgroundLayer, container.firstChild);
        
        console.log('全屏背景图片已应用');
      };
      img.onerror = () => {
        console.error('背景图片加载失败:', this.backgroundImage);
      };
      img.src = this.backgroundImage;
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

    this.element.querySelector("button").addEventListener("click", () => {
      // Close the text message
      this.done();
    });

    this.actionListener = new KeyPressListener("Space", () => {
      this.done();
    });
  }

  done() {
    if (this.revealingText.isDone) {
      // 移除背景层
      const backgroundLayer = document.querySelector('.TextMessage-background-layer');
      if (backgroundLayer) {
        backgroundLayer.remove();
      }
      
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
    this.revealingText.init();
  }
}