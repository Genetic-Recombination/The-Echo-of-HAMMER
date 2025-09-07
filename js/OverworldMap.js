// 游戏世界地图
class OverworldMap {
  constructor(config) {
    this.overworld = null;
    this.id = config.id;
    this.gameObjects = config.configObjects || {};
    this.cutsceneSpaces = config.cutsceneSpaces || {};
    this.walls = config.walls || {};

    this.lowerImage = this.loadImage(config.lowerSrc);
    this.upperImage = config.upperSrc ? this.loadImage(config.upperSrc) : null;

    this.isCutscenePlaying = false;
    this.isPaused = false;
  }

  // 工具：加载图片
  loadImage(src) {
    const img = new Image();
    img.src = src;
    return img;
  }

  // 绘制图层（lower / upper）
  drawImageLayer(ctx, cameraPerson, image) {
    if (image) {
      ctx.drawImage(
        image,
        ctx.canvas.width / 2 - cameraPerson.x,
        ctx.canvas.height / 2 - cameraPerson.y
      );
    }
  }
  drawLowerImage(ctx, cameraPerson) {
    this.drawImageLayer(ctx, cameraPerson, this.lowerImage);
  }
  drawUpperImage(ctx, cameraPerson) {
    this.drawImageLayer(ctx, cameraPerson, this.upperImage);
  }

  // 是否有物体/墙壁占用
  isSpaceTaken(currentX, currentY, direction) {
    const { x, y } = utils.nextPosition(currentX, currentY, direction);
    if (this.walls[`${x},${y}`]) return true;

    return Object.values(this.gameObjects).some(obj =>
      (obj.x === x && obj.y === y) ||
      (obj.intentPosition && obj.intentPosition[0] === x && obj.intentPosition[1] === y)
    );
  }

  // 挂载对象
  mountObjects() {
    // 特殊地图注入 NPC
    if (this.id === "LivingRoom") {
      Object.assign(this.gameObjects, {
        npc1: {
          type: "Person",
          x: utils.withGrid(35),
          y: utils.withGrid(20),
          src: "./image in the game/character/1walking.png",
          talking: [
            { events: [
              { type: "textMessage", text: "这是一个测试", faceHero: "npc1" },
              { type: "textMessage", text: "这还是测试" },
            ]}
          ]
        },
        npc2: {
          type: "Person",
          x: utils.withGrid(30),
          y: utils.withGrid(20),
          src: "./image in the game/character/2walking.png",
          talking: [
            { events: [
              { type: "textMessage", text: "这是一个测试", faceHero: "npc2" },
            ]}
          ]
        },
        npc3: {
          type: "Person",
          x: utils.withGrid(25),
          y: utils.withGrid(20),
          src: "./image in the game/character/3walking.png",
          talking: [
            { events: [
              { type: "textMessage", text: "你好，这是测试", faceHero: "npc1" },
              { type: "textMessage", text: "这还是测试" },
            ]}
          ]
        },
        npc4: {
          type: "Person",
          x: utils.withGrid(15),
          y: utils.withGrid(26),
          src: "./image in the game/character/2walking.png",
          visible: false// 快递箱
        },
        npc5: {
          type: "Person",
          x: utils.withGrid(15),
          y: utils.withGrid(26),
          src: "./image in the game/character/2walking.png",
          visible: false // 初始隐藏
        },
        npc6: {
          type: "Person",
          x: utils.withGrid(15),
          y: utils.withGrid(26),
          src: "./image in the game/character/2walking.png",
          visible: false // 初始隐藏
        },
        npc7: {
          type: "Person",
          x: utils.withGrid(15),
          y: utils.withGrid(26),
          src: "./image in the game/character/2walking.png",
          visible: false // 初始隐藏
        },
        npc8: {
          type: "Person",
          x: utils.withGrid(15),
          y: utils.withGrid(26),
          src: "./image in the game/character/2walking.png",
          visible: false // 初始隐藏
        },
        npc9: {
          type: "Person",
          x: utils.withGrid(15),
          y: utils.withGrid(26),
          src: "./image in the game/character/2walking.png",
          visible: false // 初始隐藏
        },
      });
    }

    // 实例化对象
    Object.keys(this.gameObjects).forEach(key => {
      const conf = this.gameObjects[key];
      const object = conf.type === "Person" ? new Person(conf) : new GameObject(conf);
      object.id = key;
      object.mount(this);
      this.gameObjects[key] = object;
    });
  }

  // 剧情相关
  async startCutscene(events) {
    this.isCutscenePlaying = true;
    for (const event of events) {
      const result = await new OverworldEvent({ event, map: this }).init();
      if (result === "LOST_BATTLE") break;
    }
    this.isCutscenePlaying = false;
  }

  checkForActionCutscene() {
    const hero = this.gameObjects["hero"];
    const nextCoords = utils.nextPosition(hero.x, hero.y, hero.direction);
    const match = Object.values(this.gameObjects).find(obj =>
      `${obj.x},${obj.y}` === `${nextCoords.x},${nextCoords.y}`
    );

    if (!this.isCutscenePlaying && match?.talking?.length) {
      const scenario = match.talking.find(s => (s.required || []).every(f => playerState.storyFlags[f]));
      scenario && this.startCutscene(scenario.events);
    }
  }

  checkForFootstepCutscene() {
    const hero = this.gameObjects["hero"];
    const match = this.cutsceneSpaces[`${hero.x},${hero.y}`];
    if (!this.isCutscenePlaying && match) {
      this.startCutscene(match[0].events);
    }
  }

  // 墙体操作
  addWall(x, y) { this.walls[`${x},${y}`] = true; }
  removeWall(x, y) { delete this.walls[`${x},${y}`]; }
  moveWall(wasX, wasY, direction) {
    this.removeWall(wasX, wasY);
    const { x, y } = utils.nextPosition(wasX, wasY, direction);
    this.addWall(x, y);
  }
}
