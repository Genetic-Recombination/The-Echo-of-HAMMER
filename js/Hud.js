class Hud {
  constructor() {
    this.scoreboards = [];
  }

  update() {
    this.scoreboards.forEach(s => {
      s.update(window.playerState);
    });
  }

  createElement() {
    if (this.element) {
      this.element.remove();
    }

    this.element = document.createElement("div");
    this.element.classList.add("Hud");

    const { playerState } = window;
    this.element.innerHTML = (`
      <div class="Hud_left">
        <h1>Detective Game</h1>
      </div>
      <div class="Hud_right">
        <!-- Game status could go here -->
      </div>
    `);
  }

  init(container) {
    this.createElement();
    container.appendChild(this.element);
  }
}