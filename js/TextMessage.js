// 文字逐渐显示效果
class RevealingText {
  constructor(config) {
    this.element = config.element;
    this.text = config.text;
    this.speed = config.speed || 60;

    this.timeout = null;
    this.isDone = false;
  }

  revealOneCharacter(list) {
    const next = list.splice(0, 1)[0];
    next.span.classList.add("revealed");

    if (list.length > 0) {
      this.timeout = setTimeout(() => {
        this.revealOneCharacter(list);
      }, next.delayAfter);
    } else {
      this.isDone = true;
    }
  }

  warpToDone() {
    clearTimeout(this.timeout);
    this.isDone = true;
    this.element.querySelectorAll(".RevealingText_span").forEach(s => {
      s.classList.add("revealed");
    });
  }

  init() {
    let characters = [];
    this.text.split("").forEach(character => {
      let span = document.createElement("span");
      span.classList.add("RevealingText_span");
      span.textContent = character;
      this.element.appendChild(span);

      characters.push({
        span,
        delayAfter: character === " " ? 0 : this.speed
      });
    });

    this.revealOneCharacter(characters);
  }
}

// 文本消息类
class TextMessage {
  constructor({ text, onComplete }) {
    this.text = text;
    this.onComplete = onComplete;
    this.element = null;
  }

  createElement() {
    this.element = document.createElement("div");
    this.element.classList.add("TextMessage");

    this.element.innerHTML = (`
      <p class="TextMessage_p">${this.text}</p>
      <button class="TextMessage_button">继续</button>
    `);

    this.element.querySelector("button").addEventListener("click", () => {
      this.done();
    });

    this.actionListener = new KeyPressListener("Space", () => {
      this.done();
    });
  }

  done() {
    if (this.revealingText.isDone) {
      this.element.remove();
      this.actionListener.unbind();
      this.onComplete();
    } else {
      this.revealingText.warpToDone();
    }
  }

  init(container) {
    return new Promise(resolve => {
      this.onComplete = resolve;
      this.createElement();
      container.appendChild(this.element);
      this.revealingText = new RevealingText({
        element: this.element.querySelector(".TextMessage_p"),
        text: this.text
      });
    });
  }
}