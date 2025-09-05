// 精灵类
class Sprite {
  constructor(config) {
    this.image = new Image();
    this.image.src = config.src;
    this.image.onload = () => {
      this.isLoaded = true;
    }
    this.isLoaded = false;
    
    // 行走时的图像资源
    this.walkingSrc = config.walkingSrc;
    if (this.walkingSrc) {
      this.walkingImage = new Image();
      this.walkingImage.src = this.walkingSrc;
      this.walkingImage.onload = () => {
        this.isWalkingLoaded = true;
      }
      this.isWalkingLoaded = false;
    }
    this.useShadow = config.useShadow || false;
    if (this.useShadow) {
      this.shadow = new Image();
      this.shadow.src = "./image in the game/character/shadow.png";
    }
    this.gameObject = config.gameObject;

    // 动画配置
    this.animations = config.animations || {
      "idle-down": [[0, 0]],
      "idle-right": [[0, 1]],
      "idle-up": [[0, 2]],
      "idle-left": [[0, 3]],
      "walk-down": [[1, 0], [0, 0], [3, 0], [0, 0]],
      "walk-right": [[1, 1], [0, 1], [3, 1], [0, 1]],
      "walk-up": [[1, 2], [0, 2], [3, 2], [0, 2]],
      "walk-left": [[1, 3], [0, 3], [3, 3], [0, 3]]
    };
    this.currentAnimation = config.currentAnimation || "idle-down";
    this.currentAnimationFrame = 0;

    this.animationFrameLimit = config.animationFrameLimit || 8;
    this.animationFrameProgress = this.animationFrameLimit;
    
    // 初始化当前使用的图像
    this.currentImage = this.image;
    this.currentIsLoaded = this.isLoaded;
  }

  get frame() {
    return this.animations[this.currentAnimation][this.currentAnimationFrame];
  }

  setAnimation(key) {
    if (this.currentAnimation !== key) {
      this.currentAnimation = key;
      this.currentAnimationFrame = 0;
      this.animationFrameProgress = this.animationFrameLimit;
      
      // 根据动画类型切换图像源
      if (key.startsWith('walk-') && this.walkingSrc) {
        this.currentImage = this.walkingImage;
        this.currentIsLoaded = this.isWalkingLoaded;
      } else {
        this.currentImage = this.image;
        this.currentIsLoaded = this.isLoaded;
      }
    }
  }

  updateAnimationProgress() {
    if (this.animationFrameProgress > 0) {
      this.animationFrameProgress -= 1;
      return;
    }

    this.animationFrameProgress = this.animationFrameLimit;
    this.currentAnimationFrame += 1;

    if (this.frame === undefined) {
      this.currentAnimationFrame = 0;
    }
  }

  draw(ctx, cameraPerson) {
    const x = this.gameObject.x - 8 + utils.withGrid(8) - cameraPerson.x;
    const y = this.gameObject.y - 18 + utils.withGrid(5) - cameraPerson.y;

    this.useShadow && this.shadow && this.shadow.complete && ctx.drawImage(this.shadow, x, y);

    const [frameX, frameY] = this.frame;

    this.currentIsLoaded && ctx.drawImage(this.currentImage,
      frameX * 32, frameY * 32,
      32, 32,
      x, y,
      32, 32
    );

    this.updateAnimationProgress();
  }
}