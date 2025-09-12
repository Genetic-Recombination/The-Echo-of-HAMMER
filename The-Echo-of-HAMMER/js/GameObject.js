// 游戏对象基类
class GameObject {
  constructor(config) {
    this.id = null;
    this.isMounted = false;
    this.x = config.x || 0;
    this.y = config.y || 0;
    this.direction = config.direction || "down";
    this.visible = config.visible !== undefined ? config.visible : true; // 默认可见
    this.sprite = new Sprite({
      gameObject: this,
      src: config.src || "./image in the game/character/detective.png",
      walkingSrc: config.walkingSrc,
      useShadow: config.useShadow,
    });

    this.behaviorLoop = config.behaviorLoop || [];
    this.behaviorLoopIndex = 0;
    this.talking = config.talking || [];
  }

  mount(map) {
    this.isMounted = true;
    setTimeout(() => {
      this.doBehaviorEvent(map);
    }, 10);
  }

  update() {
    // 基类更新方法
  }

  async doBehaviorEvent(map) {
    if (this.behaviorLoop.length === 0) {
      return;
    }

    if (map.isCutscenePlaying) {
      setTimeout(() => {
        this.doBehaviorEvent(map);
      }, 1000);
      return;
    }

    let eventConfig = this.behaviorLoop[this.behaviorLoopIndex];
    eventConfig.who = this.id;

    const eventHandler = new OverworldEvent({ event: eventConfig, map });
    await eventHandler.init();

    this.behaviorLoopIndex += 1;
    if (this.behaviorLoopIndex === this.behaviorLoop.length) {
      this.behaviorLoopIndex = 0;
    }

    this.doBehaviorEvent(map);
  }
}