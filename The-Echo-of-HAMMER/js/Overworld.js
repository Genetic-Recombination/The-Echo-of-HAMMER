// 主游戏世界类
class Overworld {
  constructor(config) {
    this.element = config.element;
    this.canvas = this.element.querySelector(".game-canvas");
    this.ctx = this.canvas.getContext("2d");
    this.map = null;
    this.currentEvent = null;
  }

  startGameLoop() {
    const step = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      const cameraPerson = this.map.gameObjects.hero;

      // heroTrail 在移动完成事件中记录，避免逐帧采样导致跟随滞后过大

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
      // 若当前有对话框/菜单/过场在进行，交由其处理，不触发新的交互
      const hasOverlay = document.querySelector(".TextMessage") || document.querySelector(".InteractionMenu") || this.map?.isCutscenePlaying;
      if (hasOverlay) {
        return;
      }
      // 防抖：角色移动途中不允许触发交互，避免坐标未对齐导致误判
      const hero = this.map?.gameObjects?.hero;
      if (!hero || hero.movingProgressRemaining > 0) {
        return;
      }
      this.map.checkForActionCutscene();
    });
    new KeyPressListener("Escape", () => {
      // ESC 优先级最高：无论是否处于过场/对话，都可以打开暂停菜单
      if (!this.map) return;
      if (this.map.isPaused || document.querySelector('.PauseMenu')) {
        // 已经在暂停菜单由其自身 ESC 处理关闭，这里避免重复触发
        return;
      }
      // 直接触发暂停事件，不经过 startCutscene（避免被 isCutscenePlaying 拦截）
      try {
        new OverworldEvent({ map: this.map, event: { type: "pause" } }).init();
      } catch (e) {
        // 兜底：若发生异常，仍尝试旧路径
        try {
          this.map.startCutscene([{ type: "pause" }]);
        } catch (e2) {
          console.warn('[ESC] 打开暂停菜单失败:', e2);
        }
      }
    });
  }

  bindHeroPositionCheck() {
    document.addEventListener("PersonWalkingComplete", e => {
      if (e.detail.whoId === "hero") {
        this.map.checkForFootstepCutscene();
        // 在主角完成一步移动时记录轨迹点（以格为单位），避免过密
        const hero = this.map.gameObjects.hero;
        if (!this.map.heroTrail) this.map.heroTrail = [];
        const last = this.map.heroTrail[this.map.heroTrail.length - 1];
        if (!last || last.x !== hero.x || last.y !== hero.y) {
          this.map.heroTrail.push({ x: hero.x, y: hero.y });
          if (this.map.heroTrail.length > 60) this.map.heroTrail.shift();
        }
      }
    });
  }

  startMap(mapConfig, heroInitialState) {
    // 深拷贝地图配置（保留函数），避免在mount过程中污染全局的window.OverworldMaps，且不丢失交互菜单中的 handler
    const deepClonePreserveFunctions = (value, seen = new WeakMap()) => {
      if (value === null || typeof value !== "object") {
        // 基本类型或函数：直接返回，函数引用将被保留
        return value;
      }
      if (seen.has(value)) {
        return seen.get(value);
      }
      const clone = Array.isArray(value) ? [] : {};
      seen.set(value, clone);
      for (const key of Object.keys(value)) {
        const v = value[key];
        clone[key] = (typeof v === "function") ? v : deepClonePreserveFunctions(v, seen);
      }
      return clone;
    };

    const mapConfigCopy = deepClonePreserveFunctions(mapConfig);
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

    // 注入两个全程跟随的NPC（不阻挡 hero）
    const hero = this.map.gameObjects.hero;
    const follower1 = new Person({
      x: hero.x,
      y: hero.y,
      direction: hero.direction,
      src: "./image in the game/character/wxwalking.png",
      walkingSrc: "./image in the game/character/wxwalking.png",
      useShadow: true,
      isFollower: true,
      nonBlockingForHero: true,
      followIndex: 0,
      desiredLagTiles: 1, // 折中：第1名跟随者与主角保持约1格距离
    });
    follower1.id = "wx";
    follower1.mount(this.map);

    const follower2 = new Person({
      x: hero.x,
      y: hero.y,
      direction: hero.direction,
      src: "./image in the game/character/zqwalking.png",
      walkingSrc: "./image in the game/character/zqwalking.png",
      useShadow: true,
      isFollower: true,
      nonBlockingForHero: true,
      followIndex: 0,
      desiredLagTiles: 2, // 折中：第2名跟随者与主角保持约2格距离
    });
    follower2.id = "zq";
    follower2.mount(this.map);

    // 将跟随者纳入gameObjects，参与渲染与排序
    this.map.gameObjects.wx = follower1;
    this.map.gameObjects.zq = follower2;

    // 初始化 hero 轨迹（以格为单位）
    this.map.heroTrail = [{ x: hero.x, y: hero.y }];
    follower1.followIndex = 0;
    follower2.followIndex = 0;
  }

  async init() {
    const container = document.querySelector(".game-container");

    // 解析 URL 参数（slot、load）
    const params = new URLSearchParams(window.location.search);
    const rawSlot = params.get("slot");
    const parsed = parseInt(rawSlot, 10);
    const slot = Number.isFinite(parsed) ? parsed : 1; // 默认 1 槽位

    this.progress = new Progress(slot);

    // 检测URL参数是否强制读档（来自菜单或存档管理页）
    const forceLoad = ["1", "true", "yes"].includes((params.get("load") || "").toLowerCase());

    this.titleScreen = new TitleScreen({
      progress: this.progress
    });
    const titleResult = await this.titleScreen.init(container);

    // 与标题画面选择结果合并
    let useSaveFile = !!titleResult || forceLoad;

    let initialHeroState = null;
    if (useSaveFile) {
      const file = this.progress.getSaveFile();
      if (file) {
        this.progress.load();
        initialHeroState = {
          x: this.progress.startingHeroX,
          y: this.progress.startingHeroY,
          direction: this.progress.startingHeroDirection,
        };
      } else {
        // 未找到有效存档，则回退为新游戏
        useSaveFile = false;
      }
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

    // 立即保存一次存档，确保即使玩家不进行任何操作，存档也会被保留
    setTimeout(() => {
      try {
        this.progress.save();
        console.log('[Overworld] 初始存档已保存');
      } catch(e) {
        console.warn('[Overworld] 初始存档保存失败:', e);
      }
    }, 1000); // 延迟1秒确保游戏完全初始化

    // this.map.startCutscene([
    //   { type: "changeMap", map: "DemoRoom"}
    //   // { type: "battle", enemyId: "beth" }
    // ])
  }
}

