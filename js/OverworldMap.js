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

   //厨房交互
    if (this.id === "Kitchen") {
  const interactions = [
    {
      text: "新线索【灰烬】\n桶内底层有一些灰白色的纸灰和少量未完全烧尽的碎纸片，纸片边缘卷曲焦黑，已经看不清了。",
      range: { xStart: 35, xEnd: 37, yStart: 21, yEnd: 24 }
    },
    {
      text: "新线索【冰箱】\n一台嗡嗡作响的老旧冰箱。",
      range: { xStart: 26, xEnd: 29, yStart: 15, yEnd: 15 },
      events: [
        { type: "textMessage", text: "新线索【冰箱】\n一台嗡嗡作响的老旧冰箱。" },
        { 
          type: "interactionMenu",
          title: "冰箱",
          options: [
            {
              label: "打开冰箱",
              description: "仔细检查冰箱内部",
              handler: () => {
                // 触发冰箱内部检查的文本消息
                const message = new TextMessage({
                  text: "你打开了冰箱门。\n\n几瓶矿泉水\n一小盒吃了一半的超市沙拉\n一小罐果酱\n看不到需要烹饪的新鲜食材。",
                  backgroundImage: "./fridge_open.png",
                  onComplete: () => {
                    console.log("冰箱检查完成");
                  }
                });
                message.init(document.querySelector(".game-container"));
              }
            },
            {
              label: "离开",
              description: "不检查冰箱",
              handler: () => {
                console.log("离开冰箱");
              }
            }
          ]
        }
      ]
    },
    {
      text: "水槽旁的橱柜\n柜门虚掩着。",
      range: { xStart: 17, xEnd: 20, yStart: 15, yEnd: 15 }
    },
    {
      text: "微波炉\n里面是空的。",
      range: { xStart: 5, xEnd: 7, yStart: 15, yEnd: 15 }
    },
    {
      text: "灶台\n保持的比较干净。",
      range: { xStart: 9, xEnd: 12, yStart: 15, yEnd: 15 }
    },
     {
      text: "水槽\n水槽里有一点水渍。",
      range: { xStart: 13, xEnd: 16, yStart: 15, yEnd: 15 }
    },
     {
      text: "碗柜\n整齐地摆放着碗碟和玻璃杯。",
      range: { xStart: 22, xEnd: 24, yStart: 15, yEnd: 15 }
    },
     {
      text: "花盆\n为单调的厨房增添了一抹色彩。",
      range: { xStart: 39, xEnd: 41, yStart: 17, yEnd: 24 }
    },
     {
      text: "桌子\n似乎是在厨房用餐的地方，桌子上只摆着一杯水和一个干净的大盘子。",
      range: { xStart: 31, xEnd: 37, yStart: 15, yEnd: 15 }
    },
  ];

  interactions.forEach(({ text, range, events }) => {
    for (let x = range.xStart; x <= range.xEnd; x++) {
      for (let y = range.yStart; y <= range.yEnd; y++) {
        this.cutsceneSpaces[utils.asGridCoord(x, y)] = [
          {
            events: events || [
              { type: "textMessage", text }
            ]
          }
        ];
      }
    }
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
    // 先检查面向格子是否有 cutsceneSpaces（用于像垃圾桶这种无法站上去的交互）
    const faceKey = `${nextCoords.x},${nextCoords.y}`;
    const spaceMatch = this.cutsceneSpaces[faceKey];
    if (!this.isCutscenePlaying && spaceMatch) {
      this.startCutscene(spaceMatch[0].events);
      return;
    }

    // 若没有面向的触发点，则检查是否面对可对话的 NPC
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
