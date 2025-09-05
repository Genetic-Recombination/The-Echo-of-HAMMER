
class Sprite {
  constructor(config) {
    this.gameObject = config.gameObject;

    // base image (idle)
    this.image = new Image();
    this.image.src = config.src;
    this.isLoaded = false;
    this.image.onload = () => {
      this.isLoaded = true;
      if (this.currentImage === this.image) this.currentIsLoaded = true;
    };

    // walking image (optional)
    this.walkingSrc = config.walkingSrc;
    if (this.walkingSrc) {
      this.walkingImage = new Image();
      this.walkingImage.src = this.walkingSrc;
      this.isWalkingLoaded = false;
      this.walkingImage.onload = () => {
        this.isWalkingLoaded = true;
        if (this.currentImage === this.walkingImage) this.currentIsLoaded = true;
      };
    }

    this.useShadow = config.useShadow || false;
    if (this.useShadow) {
      this.shadow = new Image();
      this.shadow.src = "./image in the game/character/shadow.png";
    }

    // 动画配置
    this.animations = config.animations || {
      "idle-down": [[1,0]],
      "idle-right": [[1,2]],
      "idle-up": [[1,3]],
      "idle-left": [[1, 1]],
      "walk-down": [[1, 0], [0, 0], [2, 0], [0, 0]],
      "walk-right": [[1, 2], [0,2], [2, 2], [0, 2]],
      "walk-up": [[1, 3], [0, 3], [2, 3], [0, 3]],
      "walk-left": [[1, 1], [0,1], [2,1], [0,1]]
    };

    this.currentAnimation = config.currentAnimation || "idle-down";
    this.currentAnimationFrame = 0;

    this.animationFrameLimit = config.animationFrameLimit || 8;
    this.animationFrameProgress = this.animationFrameLimit;

  
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
    const centerX = ctx.canvas.width / 2;
    const centerY = ctx.canvas.height / 2;

    const x = this.gameObject.x - 8 + centerX - cameraPerson.x;
    const y = this.gameObject.y - 18 + centerY - cameraPerson.y;

    if (this.useShadow && this.shadow && this.shadow.complete) {
      ctx.drawImage(this.shadow, x, y);
    }

    const [frameX, frameY] = this.frame;

    if (this.currentIsLoaded) {
      ctx.drawImage(
        this.currentImage,
        frameX * 48, frameY * 48,
        48, 48,
        x, y,
        48, 48
      );
    }

    this.updateAnimationProgress();
  }
}