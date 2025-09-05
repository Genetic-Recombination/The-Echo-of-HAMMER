// 游戏世界地图
class OverworldMap {
  constructor(config) {
    this.overworld = null;
    this.gameObjects = config.configObjects;
    this.cutsceneSpaces = config.cutsceneSpaces || {};
    this.walls = config.walls || {};

    this.lowerImage = new Image();
    this.lowerImage.src = config.lowerSrc;

    // 只有当upperSrc存在时才创建upperImage
    if (config.upperSrc) {
      this.upperImage = new Image();
      this.upperImage.src = config.upperSrc;
    } else {
      this.upperImage = null;
    }

    this.isCutscenePlaying = false;
    this.isPaused = false;
  }

  drawLowerImage(ctx, cameraPerson) {
    // 使用画布中心作为摄像机中心，以人物居中
    ctx.drawImage(
      this.lowerImage,
      ctx.canvas.width / 2 - cameraPerson.x,
      ctx.canvas.height / 2 - cameraPerson.y
    );
  }

  drawUpperImage(ctx, cameraPerson) {
    // 只有当upperImage存在时才绘制上层图像
    if (this.upperImage) {
      ctx.drawImage(
        this.upperImage,
        ctx.canvas.width / 2 - cameraPerson.x,
        ctx.canvas.height / 2 - cameraPerson.y
      );
    }
  }

  isSpaceTaken(currentX, currentY, direction) {
    const { x, y } = utils.nextPosition(currentX, currentY, direction);
    if (this.walls[`${x},${y}`]) {
      return true;
    }
    return Object.values(this.gameObjects).find(obj => {
      if (obj.x === x && obj.y === y) {
        return true;
      }
      if (obj.intentPosition && obj.intentPosition[0] === x && obj.intentPosition[1] === y) {
        return true;
      }
      return false;
    });
  }

  mountObjects() {
    Object.keys(this.gameObjects).forEach(key => {
      let objectConfig = this.gameObjects[key];
      
      // 根据配置创建实际的游戏对象实例
      let object;
      if (objectConfig.type === "Person") {
        object = new Person(objectConfig);
      } else {
        object = new GameObject(objectConfig);
      }
      
      object.id = key;
      object.mount(this);
      
      // 将实例化的对象替换配置对象
      this.gameObjects[key] = object;
    });
  }

  async startCutscene(events) {
    this.isCutscenePlaying = true;

    for (let i = 0; i < events.length; i++) {
      const eventHandler = new OverworldEvent({
        event: events[i],
        map: this,
      });
      const result = await eventHandler.init();
      if (result === "LOST_BATTLE") {
        break;
      }
    }

    this.isCutscenePlaying = false;
  }

  checkForActionCutscene() {
    const hero = this.gameObjects["hero"];
    const nextCoords = utils.nextPosition(hero.x, hero.y, hero.direction);
    const match = Object.values(this.gameObjects).find(object => {
      return `${object.x},${object.y}` === `${nextCoords.x},${nextCoords.y}`;
    });
    if (!this.isCutscenePlaying && match && match.talking.length) {

      const relevantScenario = match.talking.find(scenario => {
        return (scenario.required || []).every(sf => {
          return playerState.storyFlags[sf];
        });
      });
      relevantScenario && this.startCutscene(relevantScenario.events);
    }
  }

  checkForFootstepCutscene() {
    const hero = this.gameObjects["hero"];
    const match = this.cutsceneSpaces[`${hero.x},${hero.y}`];
    if (!this.isCutscenePlaying && match) {
      this.startCutscene(match[0].events);
    }
  }

  addWall(x, y) {
    this.walls[`${x},${y}`] = true;
  }
  removeWall(x, y) {
    delete this.walls[`${x},${y}`];
  }
  moveWall(wasX, wasY, direction) {
    this.removeWall(wasX, wasY);
    const { x, y } = utils.nextPosition(wasX, wasY, direction);
    this.addWall(x, y);
  }
}