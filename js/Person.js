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

  // 简单跟随：沿 hero 的历史轨迹逐步移动（按格），并保持期望滞后
  updateFollower(state) {
    const trail = state.map.heroTrail || [];
    if (trail.length === 0) return;

    // 目标索引：当前轨迹末尾 - desiredLagTiles
    const targetIndex = Math.max(0, trail.length - 1 - (this.desiredLagTiles || 0));
    const target = trail[targetIndex];
    if (!target) return;

    // 已位于目标格则不动，避免抖动
    if (this.x === target.x && this.y === target.y) {
      return;
    }

    let direction = null;
    if (target.x < this.x) direction = "left";
    else if (target.x > this.x) direction = "right";
    else if (target.y < this.y) direction = "up";
    else if (target.y > this.y) direction = "down";

    if (direction) {
      // 检查是否被墙体或其他物体阻挡
      if (state.map.isSpaceTaken(this.x, this.y, direction, this)) {
        // 被阻挡时不重试，等待下次更新再尝试
        return;
      }
      
      this.startBehavior(state, { type: "walk", direction });
    }
  }

  startBehavior(state, behavior) {
    if (!this.isMounted) {
      return;
    }

    this.direction = behavior.direction;

    if (behavior.type === "walk") {
      if (state.map.isSpaceTaken(this.x, this.y, this.direction, this)) {
        behavior.retry && setTimeout(() => {
          this.startBehavior(state, behavior);
        }, 10);
        return;
      }

      this.movingProgressRemaining = 8;

      const intentPosition = utils.nextPosition(this.x, this.y, this.direction);
      this.intentPosition = [intentPosition.x, intentPosition.y];

      this.updateSprite(state);
    }

    if (behavior.type === "stand") {
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