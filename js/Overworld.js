// 主游戏世界类
class Overworld {
  constructor(config) {
    this.element = config.element;
    this.canvas = this.element.querySelector(".game-canvas");
    this.ctx = this.canvas.getContext("2d");
    this.map = null;
  }

  startGameLoop() {
    const step = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      const cameraPerson = this.map.gameObjects.hero;

      // 更新所有对象
      Object.values(this.map.gameObjects).forEach(object => {
        object.update({
          arrow: this.directionInput.direction,
          map: this.map,
        });
      });

      this.map.drawLowerImage(this.ctx, cameraPerson);

      // 渲染游戏对象
      Object.values(this.map.gameObjects).sort((a, b) => {
        return a.y - b.y;
      }).forEach(object => {
        object.sprite.draw(this.ctx, cameraPerson);
      });

      this.map.drawUpperImage(this.ctx, cameraPerson);

      // 更新调试器（在所有渲染之后）
      if (this.coordinateDebugger) {
        this.coordinateDebugger.update(this);
      }

      if (!this.map.isPaused) {
        requestAnimationFrame(() => {
          step();
        });
      }
    };
    step();
  }

  bindActionInput() {
    new KeyPressListener("Space", () => {
      this.map.checkForActionCutscene();
    });
    new KeyPressListener("Escape", () => {
      if (!this.map.isCutscenePlaying) {
        this.map.startCutscene([
          { type: "pause" }
        ]);
      }
    });
  }

  bindHeroPositionCheck() {
    document.addEventListener("PersonWalkingComplete", e => {
      if (e.detail.whoId === "hero") {
        this.map.checkForFootstepCutscene();
      }
    });
  }

  startMap(mapConfig, heroInitialState) {
    // 深拷贝地图配置，避免在mount过程中污染全局的window.OverworldMaps
    const mapConfigCopy = JSON.parse(JSON.stringify(mapConfig));
    this.map = new OverworldMap(mapConfigCopy);
    this.map.overworld = this;
    this.map.mountObjects();

    // 若缺失hero，进行兜底创建，避免相机与渲染目标为空
    if (!this.map.gameObjects.hero) {
      this.map.gameObjects.hero = new Person({
        isPlayerControlled: true,
        x: heroInitialState ? heroInitialState.x : utils.withGrid(5),
        y: heroInitialState ? heroInitialState.y : utils.withGrid(5),
        direction: heroInitialState ? heroInitialState.direction : "down",
        src: "./image in the game/character/detectivewalking.png",
        walkingSrc: "./image in the game/character/detectivewalking.png",
        useShadow: true,
      });
      this.map.gameObjects.hero.id = "hero";
      this.map.gameObjects.hero.mount(this.map);
    }

    if (heroInitialState) {
      const hero = this.map.gameObjects.hero;
      hero.x = heroInitialState.x;
      hero.y = heroInitialState.y;
      hero.direction = heroInitialState.direction;
      hero.isPlayerControlled = true;
      // 确保切换地图后人物立即按正确朝向渲染
      hero.sprite.setAnimation("idle-" + hero.direction);
    }

    // DirectionInput只需要初始化一次，不需要在地图切换时重新初始化
    // 但需要清空按键状态，避免残留按键导致异常
    if (this.directionInput) {
      this.directionInput.heldDirections = [];
    }

    this.progress.mapId = mapConfig.id;
    this.progress.startingHeroX = this.map.gameObjects.hero.x;
    this.progress.startingHeroY = this.map.gameObjects.hero.y;
    this.progress.startingHeroDirection = this.map.gameObjects.hero.direction;
  }

  async init() {
    const container = document.querySelector(".game-container");

    this.progress = new Progress();

    this.titleScreen = new TitleScreen({
      progress: this.progress
    });
    const useSaveFile = await this.titleScreen.init(container);

    let initialHeroState = null;
    if (useSaveFile) {
      this.progress.load();
      initialHeroState = {
        x: this.progress.startingHeroX,
        y: this.progress.startingHeroY,
        direction: this.progress.startingHeroDirection,
      };
    }

    this.hud = new Hud();
    this.hud.init(container);

    // 初始化DirectionInput
    this.directionInput = new DirectionInput();
    this.directionInput.init();

    this.startMap(window.OverworldMaps[this.progress.mapId], initialHeroState);

    this.bindActionInput();
    this.bindHeroPositionCheck();

    this.startGameLoop();

    // this.map.startCutscene([
    //   { type: "changeMap", map: "DemoRoom"}
    //   // { type: "battle", enemyId: "beth" }
    // ])
  }
}