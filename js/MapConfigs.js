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
  // NPCs for LivingRoom are created at runtime in OverworldMap
    },
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
      // 通往卧室的门
      [utils.asGridCoord(4, 17)]: [
        {
          events: [
            { type: "changeMap", map: "Bedroom", x: utils.withGrid(27), y: utils.withGrid(23), direction: "left" }
          ]
        }
      ],
      [utils.asGridCoord(4, 18)]: [
        {
          events: [
            { type: "changeMap", map: "Bedroom", x: utils.withGrid(27), y: utils.withGrid(23), direction: "left" }
          ]
        }
      ],
      [utils.asGridCoord(4, 19)]: [
        {
          events: [
            { type: "changeMap", map: "Bedroom", x: utils.withGrid(27), y: utils.withGrid(23), direction: "left" }
          ]
        }
      ],
      [utils.asGridCoord(4, 20)]: [
        {
          events: [
            { type: "changeMap", map: "Bedroom", x: utils.withGrid(27), y: utils.withGrid(23), direction: "left" }
          ]
        }
      ],
      // 通往厨房的门
      [utils.asGridCoord(52, 17)]: [
        {
          events: [
            { type: "changeMap", map: "Kitchen", x: utils.withGrid(2), y: utils.withGrid(22), direction: "right" }
          ]
        }
      ],
      [utils.asGridCoord(52, 18)]: [
        {
          events: [
            { type: "changeMap", map: "Kitchen", x: utils.withGrid(2), y: utils.withGrid(22), direction: "right" }
          ]
        }
      ],
      [utils.asGridCoord(52, 19)]: [
        {
          events: [
            { type: "changeMap", map: "Kitchen", x: utils.withGrid(2), y: utils.withGrid(22), direction: "right" }
          ]
        }
      ],
      [utils.asGridCoord(52, 20)]: [
        {
          events: [
            { type: "changeMap", map: "Kitchen", x: utils.withGrid(2), y: utils.withGrid(22), direction: "right" }
          ]
        }
      ],
      // 通往阳台的门
      [utils.asGridCoord(12, 14)]: [
        {
          events: [
            { type: "changeMap", map: "Balcony", x: utils.withGrid(19), y: utils.withGrid(23), direction: "up" }
          ]
        }
      ],
      [utils.asGridCoord(13, 14)]: [
        {
          events: [
            { type: "changeMap", map: "Balcony", x: utils.withGrid(19), y: utils.withGrid(23), direction: "up" }
          ]
        }
      ],
      [utils.asGridCoord(14, 14)]: [
        {
          events: [
            { type: "changeMap", map: "Balcony", x: utils.withGrid(19), y: utils.withGrid(23), direction: "up" }
          ]
        }
      ]
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
      suspect: {
        type: "Person",
        x: utils.withGrid(7),
        y: utils.withGrid(5),
        src: "./image in the game/character/1.png",
        talking: [
          {
            events: [
              { type: "textMessage", text: "我是嫌疑人，但我是无辜的！", faceHero: "suspect" },
              { type: "textMessage", text: "请相信我，我没有做任何坏事。" },
            ]
          }
        ]
      }
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
      //通往客厅
      [utils.asGridCoord(28, 21)]: [
        {
          events: [
            { type: "changeMap", map: "LivingRoom", x: utils.withGrid(5), y: utils.withGrid(18), direction: "right" }
          ]
        }
      ],
      [utils.asGridCoord(28, 22)]: [
        {
          events: [
            { type: "changeMap", map: "LivingRoom", x: utils.withGrid(5), y: utils.withGrid(19), direction: "right" }
          ]
        }
      ],
      [utils.asGridCoord(28, 23)]: [
        {
          events: [
            { type: "changeMap", map: "LivingRoom", x: utils.withGrid(5), y: utils.withGrid(19), direction: "right" }
          ]
        }
      ],
      [utils.asGridCoord(28, 24)]: [
        {
          events: [
            { type: "changeMap", map: "LivingRoom", x: utils.withGrid(5), y: utils.withGrid(19), direction: "right" }
          ]
        }
      ],
      // 通往洗手间
      [utils.asGridCoord(18, 31)]: [
        {
          events: [
            { type: "changeMap", map: "Toilet", x: utils.withGrid(19), y: utils.withGrid(6), direction: "down" }
          ]
        }
      ],
      [utils.asGridCoord(19, 31)]: [
        {
          events: [
            { type: "changeMap", map: "Toilet", x: utils.withGrid(19), y: utils.withGrid(6), direction: "down" }
          ]
        }
      ]
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
      cook: {
        type: "Person",
        x: utils.withGrid(4),
        y: utils.withGrid(4),
        src: "./image in the game/character/picture/zq.png",
        talking: [
          {
            events: [
              { type: "textMessage", text: "我是厨师，案发时我在这里准备晚餐。", faceHero: "cook" },
              { type: "textMessage", text: "我什么都没有看到，只听到了一些奇怪的声音。" },
            ]
          }
        ]
      }
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
      // 返回客厅
      [utils.asGridCoord(1, 22)]: [
        {
          events: [
            { type: "changeMap", map: "LivingRoom", x: utils.withGrid(51), y: utils.withGrid(19), direction: "left" }
          ]
        }
      ],
      [utils.asGridCoord(1, 23)]: [
        {
          events: [
            { type: "changeMap", map: "LivingRoom", x: utils.withGrid(51), y: utils.withGrid(19), direction: "left" }
          ]
        }
      ],
      [utils.asGridCoord(1, 21)]: [
        {
          events: [
            { type: "changeMap", map: "LivingRoom", x: utils.withGrid(51), y: utils.withGrid(19), direction: "left" }
          ]
        }
      ],
      [utils.asGridCoord(1, 20)]: [
        {
          events: [
            { type: "changeMap", map: "LivingRoom", x: utils.withGrid(51), y: utils.withGrid(19), direction: "left" }
          ]
        }
      ]
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
    },
    cutsceneSpaces: {
      // 返回卧室
      [utils.asGridCoord(18, 6)]: [
        {
          events: [
            { type: "changeMap", map: "Bedroom", x: utils.withGrid(18), y: utils.withGrid(30), direction: "up" }
          ]
        }
      ],
      [utils.asGridCoord(19, 6)]: [
        {
          events: [
            { type: "changeMap", map: "Bedroom", x: utils.withGrid(18), y: utils.withGrid(30), direction: "up" }
          ]
        }
      ],
      [utils.asGridCoord(20, 6)]: [
        {
          events: [
            { type: "changeMap", map: "Bedroom", x: utils.withGrid(18), y: utils.withGrid(31), direction: "up" }
          ]
        }
      ]
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
      // 返回客厅
      [utils.asGridCoord(19, 24)]: [
        {
          events: [
            { type: "changeMap", map: "LivingRoom", x: utils.withGrid(13), y: utils.withGrid(15), direction: "down" }
          ]
        }
      ],
      [utils.asGridCoord(18, 24)]: [
        {
          events: [
            { type: "changeMap", map: "LivingRoom", x: utils.withGrid(13), y: utils.withGrid(15), direction: "down" }
          ]
        }
      ],
      [utils.asGridCoord(20, 24)]: [
        {
          events: [
            { type: "changeMap", map: "LivingRoom", x: utils.withGrid(13), y: utils.withGrid(15), direction: "down" }
          ]
        }
      ],
      [utils.asGridCoord(18, 24)]: [
        {
          events: [
            { type: "changeMap", map: "LivingRoom", x: utils.withGrid(13), y: utils.withGrid(15), direction: "right" }
          ]
        }
      ],
      [utils.asGridCoord(20, 24)]: [
        {
          events: [
            { type: "changeMap", map: "LivingRoom", x: utils.withGrid(13), y: utils.withGrid(15), direction: "right" }
          ]
        }
      ]
    }
  }
}