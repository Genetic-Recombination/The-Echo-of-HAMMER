const bedroomRange = { xStart: 2, xEnd: 6, yStart: 12, yEnd: 22 };
// 游戏世界地图
class OverworldMap {
  constructor(config) {
    this.overworld = null;
    this.id = config.id;
    this.gameObjects = config.configObjects || {};
    this.cutsceneSpaces = config.cutsceneSpaces || {};
    this.walls = config.walls || {};

    playerState.storyFlags = playerState.storyFlags || {};
    playerState.storyFlags["npc1_search_unlocked"] ??= false;
    playerState.storyFlags["npc2_search_unlocked"] ??= false;
    playerState.storyFlags["npc3_search_unlocked"] ??= false;

    playerState.storyFlags = playerState.storyFlags || {};
    playerState.storyFlags["npc1_interrogated"] ??= false;
    playerState.storyFlags["npc2_interrogated"] ??= false;
    playerState.storyFlags["npc3_interrogated"] ??= false;

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
  isSpaceTaken(currentX, currentY, direction, movingObject) {
    const { x, y } = utils.nextPosition(currentX, currentY, direction);
    if (this.walls[`${x},${y}`]) return true;

    return Object.values(this.gameObjects).some(obj => {
      // 跳过自己
      if (obj === movingObject) return false;
      
      // 如果移动对象是主人公，跳过跟随NPC的碰撞检测
      if (movingObject && movingObject.isPlayerControlled && obj.isFollower) {
        return false;
      }
      
      // 如果移动对象是跟随NPC，跳过与主人公的碰撞检测
      if (movingObject && movingObject.isFollower && obj.isPlayerControlled) {
        return false;
      }
      
      return (obj.x === x && obj.y === y) ||
             (obj.intentPosition && obj.intentPosition[0] === x && obj.intentPosition[1] === y);
    });
  }

  // 挂载对象
  mountObjects() {
    // 特殊地图注入 NPC
    if (this.id === "LivingRoom") {
  Object.assign(this.gameObjects, {
  npc1: {
    type: "Person",
    x: utils.withGrid(35),
    y: utils.withGrid(30),
    src: "./image in the game/character/1walking.png",
    talking: [
      {
        events: [
          { type: "textMessage", text: "警官，我是快递送货员！", faceHero: "npc1", who: "npc1" },
          {
            type: "interactionMenu",
            title: "如何处理送货员",
            options: [
              {
                label: "盘问",
                description: "对快递员进行盘问",
                handler: () => {
                  const messages = [
                    "zq警官: 你是第一个进入公寓的，你去305房做什么？见到里面的房客了吗？",
                    "快递员:（很着急的看手机）警官，能不能快一点？我车上还有一车货要送，快超时了。",
                    "zq警官: 毕竟出现了案件，我们会尽快解决的，也请您耐心等一等",
                    "快递员: 我是来送货的，一个小包裹。没见到人，门是虚掩着的。门口地上贴了张纸，说他感冒了怕传染，让我直接进去把包裹放客厅桌上就行。运费就放在桌子上的一个信封里，我拿了之后清点数目，确认没错之后留下一张送货单就离开了。",
                    "zq警官: 门是虚掩的？纸条上还说什么了？",
                    "快递员: 纸上特地写了‘门未锁，直接进入。离开时无需关门。我们这行奇怪要求见多了，照做就是。"
                  ];

                  const showMessageSequence = (index) => {
                    if (index < messages.length) {
                      new TextMessage({
                        text: messages[index],
                        onComplete: () => showMessageSequence(index + 1)
                      }).init(document.querySelector(".game-container"));
                    } else {
                      // 标记盘问完成
                      playerState.storyFlags["npc1_interrogated"] = true;
                      checkAllInterrogated(this);
                    }
                  };

                  showMessageSequence(0);
                }
              },
              {
                label: "搜身",
                description: "搜查快递员的随身物品",
                handler: () => {
                  window.overworld.map.startCutscene([
                    { type: "discoverClue", id: "clue_12" }
                  ]);

                  const runOriginalSearch = () => {
                    const messages = [
                      "你选择了：搜身快递员",
                      "zq警官:这是？",
                      "快递员：人到中年容易高血压，我这随身备着降压药呢"
                    ];

                    const showMessageSequence = (index) => {
                      if (index < messages.length) {
                        new TextMessage({
                          text: messages[index],
                          backgroundImage: index === 0 ? "./image in the game/article/快递员搜身.png" : undefined,
                          onComplete: () => showMessageSequence(index + 1)
                        }).init(document.querySelector(".game-container"));
                      } else {
                        playerState.storyFlags["npc1_searched"] = true;
                      }
                    };

                    showMessageSequence(0);
                  };

                  if (!playerState.storyFlags["npc1_search_unlocked"]) {
                    new TextMessage({ text: "还是先去卧室看看吧。" }).init(document.querySelector(".game-container"));
                    return;
                  }

                  runOriginalSearch();
                }
              }
            ]
          }
        ]
      }
    ]
  },

  npc2: {
    type: "Person",
    x: utils.withGrid(30),
    y: utils.withGrid(30),
    src: "./image in the game/character/2walking.png",
    talking: [
      {
        events: [
          { type: "textMessage", text: "警官，我是机车收货员，里面发生什么事了吗", faceHero: "npc2", who: "npc2" },
          {
            type: "interactionMenu",
            title: "如何处理机车女",
            options: [
              {
                label: "盘问",
                description: "对机车女进行盘问",
                handler: () => {
                  const messages = [
                    "zq警官: 你是第二个进入公寓的，你去305房做什么？也是没有见到里面的房客吗？",
                    "机车女: 我是来取件的。我进去时门也是虚掩的。纸条上写明了让我取走桌上的这个黑色包裹，还特意用笔圈出了一行字‘离开时请勿关门，保持原状’。我还觉得这要求有点怪，但客户是上帝嘛。我拿了钱也留下了收货单，有我的联系方式在上面。",
                    "zq警官: 情况我们了解了，还请您也在现场多等一会",
                  ];

                  const showMessageSequence = (index) => {
                    if (index < messages.length) {
                      new TextMessage({
                        text: messages[index],
                        onComplete: () => showMessageSequence(index + 1)
                      }).init(document.querySelector(".game-container"));
                    } else {
                      playerState.storyFlags["npc2_interrogated"] = true;
                      checkAllInterrogated(this);
                    }
                  };

                  showMessageSequence(0);
                }
              },
              {
                label: "搜身",
                description: "搜查机车女的随身物品",
                handler: () => {
                  window.overworld.map.startCutscene([
                    { type: "discoverClue", id: "clue_08" }
                  ]);
                  const runOriginalSearch = () => {
                    const messages = [
                      "你选择了：搜身机车女",
                      "wx警官: 这就是榔头男要送出去的东西吗，打开我们看看吧",
                      "zq警官: 可恶的榔头男！！！还是个无耻的内衣大盗！！"
                    ];

                    const showMessageSequence = (index) => {
                      if (index < messages.length) {
                        new TextMessage({
                          text: messages[index],
                          backgroundImage: index === 0 ? "./image in the game/article/机车女搜身.png" : undefined,
                          onComplete: () => showMessageSequence(index + 1)
                        }).init(document.querySelector(".game-container"));
                      } else {
                        playerState.storyFlags["npc2_searched"] = true;
                      }
                    };

                    showMessageSequence(0);
                  };

                  if (!playerState.storyFlags["npc2_search_unlocked"]) {
                    new TextMessage({ text: "还是先去卧室看看吧。" }).init(document.querySelector(".game-container"));
                    return;
                  }

                  runOriginalSearch();
                }
              }
            ]
          }
        ]
      }
    ]
  },

  npc3: {
    type: "Person",
    x: utils.withGrid(25),
    y: utils.withGrid(30),
    src: "./image in the game/character/3walking.png",
    talking: [
      {
        events: [
          { type: "textMessage", text: "警官，我是外卖员，我可什么都没干啊", faceHero: "npc3", who: "npc3" },
          {
            type: "interactionMenu",
            title: "如何处理外卖员",
            options: [
              {
                label: "盘问",
                description: "对外卖员进行盘问",
                handler: () => {
                  const messages = [
                    "zq警官: 你是最后一个进入公寓的，你去305房做了什么？",
                    "外卖员: 一样。门没锁，纸条上写着让我把披萨放在桌上，从桌上的信封里自己拿钱，还特别用大字写着‘请勿关门，通风，谢谢’。",
                    "zq警官: 原来如此，看俩你们都没见到榔头男了",
                  ];

                  const showMessageSequence = (index) => {
                    if (index < messages.length) {
                      new TextMessage({
                        text: messages[index],
                        onComplete: () => showMessageSequence(index + 1)
                      }).init(document.querySelector(".game-container"));
                    } else {
                      playerState.storyFlags["npc3_interrogated"] = true;
                      checkAllInterrogated(this);
                    }
                  };

                  showMessageSequence(0);
                }
              },
              {
                label: "搜身",
                description: "搜查外卖员的随身物品",
                handler: () => {
                  const runOriginalSearch = () => {
                    new TextMessage({
                      text: "什么都没有发现",
                      onComplete: () => { playerState.storyFlags["npc3_searched"] = true; }
                    }).init(document.querySelector(".game-container"));
                  };

                  if (!playerState.storyFlags["npc3_search_unlocked"]) {
                    new TextMessage({ text: "还是先去卧室看看吧。" }).init(document.querySelector(".game-container"));
                    return;
                  }

                  runOriginalSearch();
                }
              }
            ]
          }
        ]
      }
    ]
  }
    });
// NPC 初始剧情挂载（LivingRoom）
setTimeout(() => {
  if (!playerState.storyFlags["intro_interrogation"]) {
    this.startCutscene([
      { type: "textMessage", text: "wx警官: 我们先来问问这三个进入过房间的人的基本情况。" }
    ]).then(() => {
      // 事件结束后再锁定按钮和房间
      ["npc1", "npc2", "npc3"].forEach(npcId => {
        const npc = this.gameObjects[npcId];
        if (npc && npc.talking) {
          npc.talking.forEach(scenario => {
            scenario.events.forEach(evt => {
              if (evt.type === "interactionMenu") {
                evt.options.forEach(opt => {
                  if (opt.label === "搜身") {
                    opt.disabled = true;      
                    opt.label += " (锁定)";  
                  }
                });
              }
            });
          });
        }
      });
      this.lockedRooms = { Kitchen: true, Bedroom: true, Balcony: true };
    });
    playerState.storyFlags["intro_interrogation"] = true;
  }
}, 100);
}
// ======= 辅助函数：检查三个 NPC 是否都被盘问 =======
function checkAllInterrogated(mapInstance) {
  const allInterrogated =
    playerState.storyFlags["npc1_interrogated"] &&
    playerState.storyFlags["npc2_interrogated"] &&
    playerState.storyFlags["npc3_interrogated"];

  const been_to_bedroom =
    playerState.storyFlags["npc1_search_unlocked"] &&
    playerState.storyFlags["npc2_search_unlocked"] &&
    playerState.storyFlags["npc3_search_unlocked"];

  // hero 对象
  const hero = mapInstance.gameObjects["hero"];
  console.log("玩家是否都被盘问过:", allInterrogated);
  console.log("玩家是否去过卧室:", been_to_bedroom);
  if (allInterrogated && !been_to_bedroom) {
    
    new TextMessage({
      text: "wx警官: 既然他们都提到了卧室，我们赶紧去卧室看看吧。",
      onComplete: () => {}
    }).init(document.querySelector(".game-container"));
  }
}
   //厨房交互
    if (this.id === "Kitchen") {
  const interactions = [
    {
      // 修复：将原先未被使用的 handler 改为事件列表，确保发现线索被触发
      events: [
        {
          type: "textMessage",
          text: "新线索【厨房-垃圾桶】\n桶内底层有一些灰白色的纸灰和少量未完全烧尽的碎纸片，纸片边缘卷曲焦黑，已经看不清了。",
          backgroundImage: "./image in the game/article/厨房的垃圾桶.png"
        },
        { type: "discoverClue", id: "clue_07" }
      ],
      range: { xStart: 35, xEnd: 37, yStart: 21, yEnd: 24 }
    },
    {
      text: "新线索【厨房-冰箱】\n一台嗡嗡作响的老旧冰箱。",
      range: { xStart: 26, xEnd: 29, yStart: 15, yEnd: 15 },
      events: [
        { type: "textMessage", text: "新线索【厨房-冰箱】\n一台嗡嗡作响的老旧冰箱。" },
        { 
          type: "interactionMenu",
          title: "厨房-冰箱",
          options: [
            {
              label: "打开冰箱",
              description: "仔细检查冰箱内部",
              handler: () => {
                // 先触发线索发现事件
                window.overworld.map.startCutscene([
                  { type: "discoverClue", id: "clue_01" }
                ]);
                // 触发线索发现事件后，再触发冰箱内部检查的文本消息
                const message = new TextMessage({
                  text: "你打开了冰箱门。\n\n几瓶矿泉水\n一小盒吃了一半的超市沙拉\n一小罐果酱\n看不到需要烹饪的新鲜食材。",
                  backgroundImage: "./image in the game/article/冰箱内景.png",
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
      text: "水槽旁的橱柜\n柜门虚掩着。",backgroundImage: "./image in the game/article/厨房的柜子.png",
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

  interactions.forEach(({ text, range, events, backgroundImage }) => {
    for (let x = range.xStart; x <= range.xEnd; x++) {
      for (let y = range.yStart; y <= range.yEnd; y++) {
        this.cutsceneSpaces[utils.asGridCoord(x, y)] = [
          {
            events: events || [
              { type: "textMessage", text, backgroundImage }
            ]
          }
        ];
      }
    }
  });
}
// 阳台交互
    if (this.id === "Balcony") {
      const interactions = [
        {
          // 占位坐标，后续可自行修改为准确位置
          range: { xStart: 22, xEnd: 26, yStart: 10, yEnd: 15 },
          events: [
            { type: "textMessage", text: "你来到洗衣机前。" },
            {
              type: "interactionMenu",
              title: "是否要打开洗衣机",
              options: [
                {
                  label: "打开",
                  description: "打开洗衣机看看里面有什么",
                  handler: () => {
                    window.overworld.map.startCutscene([
                      { type: "discoverClue", id: "clue_19" }
                    ]);
                    const message = new TextMessage({
                      text: "你打开了洗衣机\n\n【新线索】阳台-洗衣机\n一些没洗的衣服\n两件宽大的t恤\n一件黑色工装外套\n一条深蓝色工装裤。",
                      backgroundImage: "./image in the game/article/洗衣机内景.png",
                      onComplete: () => {}
                    });
                    message.init(document.querySelector(".game-container"));
                  }
                },
                {
                  label: "离开",
                  description: "暂时不打开",
                  handler: () => {}
                }
              ]
            }
          ]
        },
        {
          range: { xStart: 5, xEnd:8, yStart: 18, yEnd:21 },
          events: [
            { type: "discoverClue", id: "clue_23" },
            { type: "textMessage", text: "【新线索】阳台-木桶:洗衣房的一个木桶，但里面什么都没有。", backgroundImage: "./image in the game/article/阳台木桶.png" },
          ]
        },
         {
          range: { xStart: 5, xEnd:8, yStart: 13, yEnd:17 },
          events: [
            { type: "textMessage", text: "【新线索】阳台-置物篮:洗衣房的置物筐。" },
            {
              type: "interactionMenu",
              title: "是否要仔细查看",
              options: [
                {
                  label: "仔细查看",
                  description: "合格的侦探需要细心和耐心，不要忽略任何细节。",
                  handler: () => {
                    window.overworld.map.startCutscene([
                      { type: "discoverClue", id: "clue_22" }
                    ]);
                    const message = new TextMessage({
                      text: "你仔细查看了置物筐里的衣物\n\n里面放了一些外套和牛仔裤。",
                      backgroundImage: "./image in the game/article/阳台置物篮.png",
                      onComplete: () => {}
                    });
                    message.init(document.querySelector(".game-container"));
                  }
                },
                {
                  label: "离开",
                  description: "衣物跟案件无关，不看也罢",
                  handler: () => {}
                }
              ]
            }
          ]
        },
      ];

      interactions.forEach(({ text, range, events, backgroundImage }) => {
        for (let x = range.xStart; x <= range.xEnd; x++) {
          for (let y = range.yStart; y <= range.yEnd; y++) {
            this.cutsceneSpaces[utils.asGridCoord(x, y)] = [
              {
                events: events || [
                  { type: "textMessage", text, backgroundImage }
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
      const scenario = spaceMatch.find(s => (s.required || []).every(f => playerState.storyFlags[f])) || spaceMatch[0];
      // 修复：不要使用 JSON 深拷贝（会丢失函数，如 interactionMenu 的 handler），改为浅拷贝以保留函数
      const eventsCopy = scenario.events.map(ev => ({ ...ev }));
      this.startCutscene(eventsCopy);
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
      // === 新增：检查是否在卧室范围，解锁搜身 ===
    const heroGridX = hero.x / 16;
    const heroGridY = hero.y / 16;

    const inBedroom =
      heroGridX >= bedroomRange.xStart && heroGridX <= bedroomRange.xEnd &&
      heroGridY >= bedroomRange.yStart && heroGridY <= bedroomRange.yEnd;

    if (inBedroom) {
      playerState.storyFlags["npc1_search_unlocked"] = true;
      playerState.storyFlags["npc2_search_unlocked"] = true;
      playerState.storyFlags["npc3_search_unlocked"] = true;
    }
    // console.log("调试: npc1_search_unlocked =", playerState.storyFlags["npc1_search_unlocked"]);
    // console.log("调试: npc2_search_unlocked =", playerState.storyFlags["npc2_search_unlocked"]);
    // console.log("调试: npc3_search_unlocked =", playerState.storyFlags["npc3_search_unlocked"]);
    const match = this.cutsceneSpaces[`${hero.x},${hero.y}`];
    if (!this.isCutscenePlaying && match) {
      const scenario = match.find(s => (s.required || []).every(f => playerState.storyFlags[f])) || match[0];
      // 修复：不要使用 JSON 深拷贝，改为浅拷贝保留函数（如 interactionMenu 的 handler）
      const eventsCopy = scenario.events.map(ev => ({ ...ev }));
      this.startCutscene(eventsCopy);
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
