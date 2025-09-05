class Sprite {
  constructor(config) {

    //Set up the image
    this.image = new Image();
    this.image.src = config.src;
    this.image.onload = () => {
      this.isLoaded = true;
    }

    //Shadow
    this.shadow = new Image();
    this.useShadow = config.useShadow || false;
    if (this.useShadow) {
      this.shadow.src = "./images/characters/shadow.png";
    }
    this.shadow.onload = () => {
      this.isShadowLoaded = true;
    }

    //Configure Animation & Initial State
    this.animations = config.animations || {
      "idle-down" : [ [0,0] ],
      "idle-left" : [ [0,1] ],
      "idle-right": [ [0,2] ],
      "idle-up"   : [ [0,3] ],
      "walk-down" : [ [0,0],[1,0],[2,0], ],
      "walk-left" : [ [0,1],[1,1],[2,1], ],
      "walk-right": [ [0,2],[1,2],[2,2], ],
      "walk-up"   : [ [0,3],[1,3],[2,3], ],
    }
    this.currentAnimation = config.currentAnimation || "idle-down";
    this.currentAnimationFrame = 0;

    this.animationFrameLimit = config.animationFrameLimit || 8;
    this.animationFrameProgress = this.animationFrameLimit;
    

    //Reference the game object
    this.gameObject = config.gameObject;
  }

  get frame() {
    return this.animations[this.currentAnimation][this.currentAnimationFrame]
  }

  setAnimation(key) {
    if (this.currentAnimation !== key) {
      this.currentAnimation = key;
      this.currentAnimationFrame = 0;
      this.animationFrameProgress = this.animationFrameLimit;
    }
  }

  updateAnimationProgress() {
    //Downtick frame progress
    if (this.animationFrameProgress > 0) {
      this.animationFrameProgress -= 1;
      return;
    }

    //Reset the counter
    this.animationFrameProgress = this.animationFrameLimit;
    this.currentAnimationFrame += 1;

    if (this.frame === undefined) {
      this.currentAnimationFrame = 0
    }


  }
  

  draw(ctx, cameraPerson) {
    const offsetPerson = 4;
    const offsetShadow = 1;
    const x = this.gameObject.x + utils.withGrid(8) - cameraPerson.x;
    const y = this.gameObject.y + utils.withGrid(5) - cameraPerson.y;

    this.isShadowLoaded && ctx.drawImage(this.shadow, x, y - offsetShadow);

    const [frameX, frameY] = this.frame;

    this.isLoaded && ctx.drawImage(this.image,
      frameX * 48, frameY * 48,
      48,48,
      x,y - offsetPerson,
      48,48
    )

    this.updateAnimationProgress();
  }

}