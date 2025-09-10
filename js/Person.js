// 人物类
class Person extends GameObject {
  constructor(config) {
    super(config);
    this.movingProgressRemaining = 0;
    this.isStanding = false;
    this.intentPosition = null;

    this.isPlayerControlled = config.isPlayerControlled || false;
    // 跟随者标记与参数
    this.isFollower = config.isFollower || false;
    this.nonBlockingForHero = config.nonBlockingForHero || false;
    this.followIndex = config.followIndex || 0; // 读取hero轨迹的游标
    this.desiredLagTiles = config.desiredLagTiles || 0; // 期望滞后格数
    this.followAxisLock = null; // 跟随轴向锁："x" | "y" | null

    this.directionUpdate = {
      "up": ["y", -1],
      "down": ["y", 1],
      "left": ["x", -1],
      "right": ["x", 1],
    };
  }

  update(state) {
    if (this.movingProgressRemaining > 0) {
      this.updatePosition();
    } else {
      if (this.isFollower) {
        this.updateFollower(state);
      } else if (!state.map.isCutscenePlaying && this.isPlayerControlled && state.arrow) {
        this.startBehavior(state, {
          type: "walk",
          direction: state.arrow
        });
      }
      this.updateSprite(state);
    }
  }

  // 粘性跟随：锁定一个轴向先对齐直到该轴对齐完成，再换另一个轴，避免频繁轴向切换导致抖动
  updateFollower(state) {
    const trail = state.map.heroTrail || [];
    if (trail.length === 0) return;

    const targetIndex = Math.max(0, trail.length - 1 - (this.desiredLagTiles || 0));
    const target = trail[targetIndex];
    if (!target) return;

    // 已位于目标格则不动
    if (this.x === target.x && this.y === target.y) {
      return;
    }

    const dx = target.x - this.x;
    const dy = target.y - this.y;
    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);

    // 若锁定轴已对齐，则解除锁定
    if (this.followAxisLock === "x" && absDx === 0) this.followAxisLock = null;
    if (this.followAxisLock === "y" && absDy === 0) this.followAxisLock = null;

    // 当锁定轴接近对齐且另一轴距离更大时，提前切换锁，解决“上下行走时主角横移到另一列”导致的原地上下尝试
    // 阈值：当前轴 <= 半格(8px) 且 另一轴 >= 一整格(16px)
    if (this.followAxisLock === "y" && absDy <= 8 && absDx >= 16) {
      this.followAxisLock = "x";
    }
    if (this.followAxisLock === "x" && absDx <= 8 && absDy >= 16) {
      this.followAxisLock = "y";
    }

    // 选择轴向：优先使用锁定轴；否则按距离更大的轴锁定
    let axis = this.followAxisLock;
    if (!axis) {
      if (absDx === 0 && absDy === 0) return;
      axis = (absDy > absDx) ? "y" : "x";
      // 避免选择到已为0的轴
      if (axis === "x" && absDx === 0) axis = "y";
      if (axis === "y" && absDy === 0) axis = "x";
      this.followAxisLock = axis;
    }

    // 按选择的轴构造方向
    let direction = null;
    if (axis === "y") {
      direction = dy < 0 ? "up" : "down";
    } else {
      direction = dx < 0 ? "left" : "right";
    }

    // 首选轴若被阻挡，则尝试另一轴；成功则切换锁
    if (state.map.isSpaceTaken(this.x, this.y, direction, this)) {
      let altAxis = axis === "x" ? "y" : "x";
      let altDir = null;
      if (altAxis === "y" && absDy > 0) altDir = dy < 0 ? "up" : "down";
      if (altAxis === "x" && absDx > 0) altDir = dx < 0 ? "left" : "right";
      if (altDir && !state.map.isSpaceTaken(this.x, this.y, altDir, this)) {
        this.followAxisLock = altAxis;
        this.startBehavior(state, { type: "walk", direction: altDir });
      }
      return;
    }

    this.startBehavior(state, { type: "walk", direction });
  }

  startBehavior(state, behavior) {
    if (!this.isMounted) {
      return;
    }

    if (behavior.type === "walk") {
      const desiredDirection = behavior.direction;
      if (state.map.isSpaceTaken(this.x, this.y, desiredDirection, this)) {
        behavior.retry && setTimeout(() => {
          this.startBehavior(state, behavior);
        }, 10);
        return;
      }

      // 只有在确认可以移动时才更新朝向，避免因阻挡导致原地抽搐
      this.direction = desiredDirection;
      this.movingProgressRemaining = 8;

      const intentPosition = utils.nextPosition(this.x, this.y, this.direction);
      this.intentPosition = [intentPosition.x, intentPosition.y];

      this.updateSprite(state);
    }

    if (behavior.type === "stand") {
      this.direction = behavior.direction;
      this.isStanding = true;
      setTimeout(() => {
        utils.emitEvent("PersonStandComplete", {
          whoId: this.id
        });
        this.isStanding = false;
      }, behavior.time);
    }
  }

  updatePosition() {
    const [property, change] = this.directionUpdate[this.direction];
    this[property] += change * 2;
    this.movingProgressRemaining -= 1;

    if (this.movingProgressRemaining === 0) {
      this.intentPosition = null;
      utils.emitEvent("PersonWalkingComplete", {
        whoId: this.id
      });
    }
  }

  updateSprite() {
    if (this.movingProgressRemaining > 0) {
      this.sprite.setAnimation("walk-" + this.direction);
      this.sprite.pauseAnimation = false; // 行走时正常推进动画
      return;
    }

    // 停下时显示对应方向的 idle（面朝 last direction）
    this.sprite.setAnimation("idle-" + this.direction);
    this.sprite.pauseAnimation = false;
  }
}