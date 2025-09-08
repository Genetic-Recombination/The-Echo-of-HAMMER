// 地图配置文件
window.OverworldMaps = {
  LivingRoom: {
    id: "LivingRoom",
    lowerSrc: "./image in the game/map/livingroom.png",
    upperSrc: null, // 不使用上层图像，避免遮挡人物
    configObjects: {
      hero: {
        type: "Person",
        isPlayerControlled: true,
        x: utils.withGrid(30),
        y: utils.withGrid(45),
        src: "./image in the game/character/detectivewalking.png",
        walkingSrc: "./image in the game/character/detectivewalking.png",
        useShadow: false,
      },
      // 添加一个可交互的物品
      // interactiveObject: {
      //   type: "Person",
      //   x: utils.withGrid(20),
      //   y: utils.withGrid(30),
      //   src: "./image in the game/character/1walking.png",
      //   talking: [
      //     {
      //       events: [
      //         { type: "textMessage", text: "你发现了一个神秘的物品！" },
      //         { type: "textMessage", text: "这可能是解开谜题的关键线索。" }
      //       ]
      //     }
      //   ]
      
      // },
       
  // NPCs for LivingRoom are created at runtime in OverworldMap
    },
      
      // 添加一个在特定位置显示的图片
     
    walls: {
  // 左侧纵向墙（原来 3,3 ~ 3,21）
  ...utils.verticalWall(3, 3, 21),

  // 用户指定的纵向墙（原来 7,21 ~ 7,36）
  ...utils.verticalWall(7, 21, 36),

  // 新增纵向墙 - x=11, y=5 ~ 17
  ...utils.verticalWall(11, 5, 16),

  // 新增纵向墙 - x=15, y=5 ~ 17
  ...utils.verticalWall(15, 5, 16),

  // 右侧纵向墙
  ...utils.verticalWall(49, 11, 16),
  ...utils.verticalWall(53, 7, 21),
  ...utils.verticalWall(45, 21, 37),
  ...utils.verticalWall(37, 39, 46),
  ...utils.verticalWall(28, 39, 46),
  //两株仙人掌
  ...utils.verticalWall(37, 13, 17),
  ...utils.verticalWall(40, 13, 17),
  ...utils.verticalWall(46, 13, 17),
  //钟表右侧
  ...utils.verticalWall(27, 11, 15),

  // 底部横向墙
  ...utils.horizontalWall(16, 3, 10),//左上两面墙
  ...utils.horizontalWall(16, 15, 24),
  // 墙体连接（横向） y=10, x=11 ~ 14
  ...utils.horizontalWall(10, 11, 14),
  //厨房底墙
  ...utils.horizontalWall(21, 45, 54),
  //厨房顶墙
  ...utils.horizontalWall(16, 45, 54),

  ...utils.horizontalWall(15, 25, 27),//钟表下侧
  ...utils.horizontalWall(12, 28, 48),//顶上方墙体
  ...utils.horizontalWall(17, 38, 39),//两株仙人掌
  ...utils.horizontalWall(17, 46, 48),
  ...utils.horizontalWall(38, 20, 28),//沙发右侧
  ...utils.horizontalWall(47, 29, 37),//最下端
  
  ...utils.horizontalWall(34, 7, 11),//沙发旁盒子
  ...utils.horizontalWall(26, 12, 19),//桌子上部
  ...utils.verticalWall(12, 26, 34),//桌子左侧
  ...utils.verticalWall(19, 26, 38),//桌子右侧
  ...utils.horizontalWall(38, 37, 45),//箱子下侧
  ...utils.horizontalWall(26, 41, 44),//垃圾堆上厕
  ...utils.horizontalWall(29, 41, 44),//垃圾堆下侧
  ...utils.verticalWall(41, 26, 29),//垃圾桶左侧
  ...utils.verticalWall(37, 33, 46),//箱子左侧
  ...utils.verticalWall(40, 33, 46),//箱子右侧
  ...utils.verticalWall(42, 35, 40),
  ...utils.horizontalWall(35, 42, 44),
  ...utils.horizontalWall(33, 37, 40),
},

    cutsceneSpaces: {
  // 通往卧室的门 (4,17..20)
  ...utils.portalColumn(17, 20, 4, "Bedroom", 27, 23, "left"),
  // 通往厨房的门 (52,17..20)
  ...utils.portalColumn(17, 20, 52, "Kitchen", 2, 22, "right"),
  // 通往阳台的门 (12..14,14)
  ...utils.portalLine(12, 14, 14, "Balcony", 19, 23, "up"),
  // 当玩家走到坐标(15, 25)时显示图片
  // 面向(15,25)时按空格触发
  [utils.asGridCoord(17, 26)]: [
    {
      events: [
        { type: "textMessage", text: "【新线索】:一个捆的很紧的麻袋" },
        { type: "showImage", src: "./image in the game/character/2walking.png" },
        { type: "textMessage", text: "zq警官:是榔头男作案时的风衣帽子和墨镜，看来这的确就是榔头男的家了" },
      ],
      trigger: "action" // 新增自定义标记，便于后续扩展
    }
  ],
  // 当玩家走到坐标(15, 25)时显示图片，
    [utils.asGridCoord(19, 32)]: [
        {
          events: [
            { type: "textMessage", text: "【新线索】：这应该是快递员送来的包裹，有几处可能是运输时的碰撞导致的凹陷。箱子有一点重量"},
            { type: "showImage", src: "./image in the game/character/2walking.png" },
            { type: "textMessage", text: "zq警官:！！扳手！这大小……确实很像凶器！完全有可能造成死者头部的伤痕！"},
            { type: "textMessage", text: "zq警官:但是这也太干净了。不像是凶器……不过也有可能被凶手细致的清洗过了"},
            { type: "textMessage", text: "wx警官:很有可能是取货员用这个扳手杀了人，清洗干净再藏到这个快递箱中，嫁祸给快递员！！"},
            { type: "textMessage", text: "zq警官:大胆假设，小心求证。你有证据吗？"},
          ]
        }
      ],
  [utils.asGridCoord(28, 41)]: [
        {
          events: [
            { type: "textMessage", text: "【新线索】：一个简陋的木质鞋柜，看起来有些年头了" },
            { type: "showImage", src: "./image in the game/character/shadow.png" }
          ]
        }
      ],//鞋柜
   [utils.asGridCoord(41, 28)]: [
        {
          events: [
            { type: "textMessage", text: "【新线索】：很脏很乱的垃圾桶，像是很久没人打理了" },
            { type: "showImage", src: "./image in the game/character/shadow.png" },
            { type: "textMessage", text: "zq警官:这榔头男也太不讲卫生了，怎么会这么乱啊" },
          ]
        }
      ],//垃圾桶
    [utils.asGridCoord(13, 32)]: [
        {
          events: [
            { type: "textMessage", text: "【新线索】：披萨和收据" },
            { type: "showImage", src: "./image in the game/character/shadow.png" },
            { type: "textMessage", text: "wx警官:这张单据是披萨外卖员留下的，上面有他的联系方式以及店铺的联系方式。价格和送到的披萨口味一致。" },
            { type: "textMessage", text: "zq警官:奇怪？？送货员和机车女的收据怎么不见了呢？" },
            { type: "interactionMenu",
              title: "披萨和收据",
              options: [
            {
              label: "打开披萨盒",
              description: "检查披萨盒内部",
              handler: () => {
                // 触发冰箱内部检查的文本消息
                const message = new TextMessage({
                  text: "你打开了披萨盒，披萨完好无损，似乎确实没有人动过他",
                  backgroundImage: "./fridge_open.png",
                  onComplete: () => {
                    console.log("披萨盒检查完成");
                  }
                });
                message.init(document.querySelector(".game-container"));
              }
            },
            {
              label: "离开",
              description: "让我再看看别处",
              handler: () => {
                console.log("离开披萨盒");
              }
            }
          ]},
          ]
        }
      ],
      [utils.asGridCoord(9, 34)]: [
        {
          events: [
            { type: "textMessage", text: "【新线索】：一个置物箱，杂七杂八的东西都堆在一块" },
            { type: "showImage", src: "./image in the game/character/shadow.png" },
            { type: "textMessage", text: "wx警官:这都是些啥啊，好乱啊" },
          ]
        }
      ],
      [utils.asGridCoord(20, 36)]: [
        {
          events: [
            { type: "textMessage", text: "【新线索】：一张款式老旧的布艺沙发靠墙摆放。沙发套看起来有些日子没洗了，颜色暗淡。" },
            { type: "showImage", src: "./image in the game/character/shadow.png" },
          ]
        }
      ],
      [utils.asGridCoord(36, 36)]: [
        {
          events: [
            { type: "textMessage", text: "【新线索】：墙边堆着两个扁平的棕色瓦楞纸箱" },
            { type: "showImage", src: "./image in the game/character/shadow.png" },
            { type: "textMessage", text: "wx警官:看来这榔头男随时准备搬家逃跑啊，辛亏我们接到线报就一直在这监视" },
          ]
        }
      ],
      [utils.asGridCoord(26, 15)]: [
        {
          events: [
            { type: "textMessage", text: "【新线索】：破旧的大时钟，看来指针已经停摆好久了" },
            { type: "showImage", src: "./image in the game/character/shadow.png" },
          ]
        }
      ],
      [utils.asGridCoord(39, 17)]: [
        {
          events: [
            { type: "textMessage", text: "一盆普通的仙人掌" },
          ]
        }
      ],
      [utils.asGridCoord(47, 17)]: [
        {
          events: [
            { type: "textMessage", text: "不算名贵的绿植" },
          ]
        }
      ],
    }
  },
  Bedroom: {
    id: "Bedroom",
    lowerSrc: "./image in the game/map/bedroom.png",
    upperSrc: null, // 不使用上层图像，避免遮挡人物
    configObjects: {
      hero: {
        type: "Person",
        isPlayerControlled: true,
        x: utils.withGrid(25),
        y: utils.withGrid(20),
        src: "./image in the game/character/detectivewalking.png",
        walkingSrc: "./image in the game/character/detectivewalking.png",
        useShadow: true,
      },
    },
    walls: {
    ...utils.verticalWall(25, 16, 20),//衣柜右侧竖墙
    ...utils.verticalWall(12, 16, 19),//床右侧边界
    ...utils.verticalWall(8, 15, 19),//床左侧边界
    ...utils.verticalWall(4, 15, 30),//床左侧墙壁
    ...utils.verticalWall(7, 21, 30),//沙发右边界
    ...utils.verticalWall(29, 0, 100),
    ...utils.verticalWall(21, 25, 33),//卫生间门右侧墙
    ...utils.verticalWall(16, 29, 100),

    ...utils.horizontalWall(20, 25, 28),//通往客厅门上厕横墙
    ...utils.horizontalWall(15, 13, 24),//衣柜下方横墙
    ...utils.horizontalWall(19, 8, 11),//床下厕边界
    ...utils.horizontalWall(15, 4, 8),//篮子下边界
    ...utils.horizontalWall(21, 4, 7),//沙发上边界
    ...utils.horizontalWall(29, 0, 16),//沙发下横墙
    ...utils.horizontalWall(25, 21, 30),//沙发下横墙
    ...utils.horizontalWall(33, 0, 100),
    },
    cutsceneSpaces: {
  // 通往客厅 (28,21..24)
  ...utils.portalColumn(21, 24, 28, "LivingRoom", 5, 18, "right"),
  // 通往洗手间 (17..20,31)
  ...utils.portalLine(17, 20, 31, "Toilet", 20, 6, "down")
    }
  },
  
  Kitchen: {
    id: "Kitchen",
    lowerSrc: "./image in the game/map/kitchen.png",
    upperSrc: null,
    configObjects: {
      hero: {
        type: "Person",
        isPlayerControlled: true,
        x: utils.withGrid(8),
        y: utils.withGrid(6),
        src: "./image in the game/character/detectivewalking.png",
        walkingSrc: "./image in the game/character/detectivewalking.png",
        useShadow: true,
      },
      
    },
    walls: {
    ...utils.verticalWall(4, 15, 19),//左侧墙
    ...utils.verticalWall(42, 0, 100),//右侧墙
    ...utils.verticalWall(38, 17, 19),
    ...utils.verticalWall(38, 21, 30),
    ...utils.verticalWall(35, 21, 30),

    ...utils.horizontalWall(19, 0, 4),//入口上横墙
    ...utils.horizontalWall(15, 0, 100),//上排
    ...utils.horizontalWall(24, 0, 100),//下墙
    ...utils.horizontalWall(17, 31, 33),//椅子上
    ...utils.horizontalWall(17, 35, 100),//椅子上
    ...utils.horizontalWall(18, 31, 33),//椅子下
    ...utils.horizontalWall(18, 35, 100),//椅子下
    ...utils.horizontalWall(19, 38, 100),
    ...utils.horizontalWall(21, 35, 100),

    },
    cutsceneSpaces: {
  // 返回客厅（合并成一列）
  ...utils.portalColumn(20, 23, 1, "LivingRoom", 51, 19, "left")
  },
},
  Toilet: {
    id: "Toilet",
    lowerSrc: "./image in the game/map/toilet.png",
    upperSrc: null,
    configObjects: {
      hero: {
        type: "Person",
        isPlayerControlled: true,
        x: utils.withGrid(3),
        y: utils.withGrid(8),
        src: "./image in the game/character/detectivewalking.png",
        walkingSrc: "./image in the game/character/detectivewalking.png",
        useShadow: true,
      }
    },
    walls: {
      ...utils.verticalWall(8, 0,30),
      ...utils.verticalWall(12, 0, 14),
      ...utils.verticalWall(17, 0, 12),
      ...utils.verticalWall(21, 0, 11),
      ...utils.verticalWall(25, 0, 30),
      ...utils.verticalWall(22, 13, 18),
      ...utils.verticalWall(24, 13, 18),
      ...utils.verticalWall(22, 21, 25),

     ...utils.horizontalWall(25, 0, 100),
     ...utils.horizontalWall(14, 0, 12),
     ...utils.horizontalWall(12, 0, 17),
     ...utils.horizontalWall(11, 21, 30),
     ...utils.horizontalWall(13, 22, 24),
     ...utils.horizontalWall(18, 22, 24),
     ...utils.horizontalWall(21, 22, 24),
     ...utils.horizontalWall(4, 0, 100),
    },
    cutsceneSpaces: {
  // 返回卧室：18~19 为同一目的地，20 为不同目标
  ...utils.portalLine(18, 19, 6, "Bedroom", 18, 30, "up"),
  ...utils.portalLine(20, 20, 6, "Bedroom", 18, 31, "up")
    }
  },
  
  Balcony: {
    id: "Balcony",
    lowerSrc: "./image in the game/map/balcony.png",
    upperSrc: null,
    configObjects: {
      hero: {
        type: "Person",
        isPlayerControlled: true,
        x: utils.withGrid(2),
        y: utils.withGrid(7),
        src: "./image in the game/character/detectivewalking.png",
        walkingSrc: "./image in the game/character/detectivewalking.png",
        useShadow: true,
      }
    },
    walls: {
      ...utils.verticalWall(25,16 ,21 ),//右墙
      ...utils.verticalWall(8, 12, 21),//左墙
      ...utils.verticalWall(22, 9, 15),//冰箱左
      ...utils.verticalWall(21, 22, 25),//底右
      ...utils.verticalWall(17, 22, 25),//底左


     ...utils.horizontalWall(21, 9, 17),//下左墙
     ...utils.horizontalWall(21, 21, 25),//下右墙
     ...utils.horizontalWall(26, 17, 21),//下墙
     ...utils.horizontalWall(15, 22, 25),//冰箱下
     ...utils.horizontalWall(12, 8, 22),//上墙
    },
    cutsceneSpaces: {
  // 返回客厅：先统一设置 18~20 为 down，随后用单点覆盖其中 18 与 20 为 right（保留原来覆盖顺序）
  ...utils.portalLine(18, 20, 24, "LivingRoom", 13, 15, "down"),
  ...utils.portalLine(18, 18, 24, "LivingRoom", 13, 15, "right"),
  ...utils.portalLine(20, 20, 24, "LivingRoom", 13, 15, "right")
    }
  }
}
