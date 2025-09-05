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
        x: utils.withGrid(33),
        y: utils.withGrid(43),
        src: "./image in the game/character/detectivewalking.png",
        walkingSrc: "./image in the game/character/detectivewalking.png",
        useShadow: false,
      },
      npc1: {
        type: "Person",
        x: utils.withGrid(35),
        y: utils.withGrid(35),
        src: "./image in the game/character/1walking.png",
        talking: [
          {
            events: [
              { type: "textMessage", text: "这是一个测试", faceHero: "npc1" },
              { type: "textMessage", text: "这还是测试" },
            ]
          }
        ]
      },
      npc2: {
        type: "Person",
        x: utils.withGrid(30),
        y: utils.withGrid(35),
        src: "./image in the game/character/2walking.png",
        talking: [
          {
            events: [
              { type: "textMessage", text: "这是一个测试", faceHero: "npc2" },
            ]
          }
        ]
      },
      npc3: {
        type: "Person",
        x: utils.withGrid(25),
        y: utils.withGrid(35),
        src: "./image in the game/character/3walking.png",
        talking: [
          {
            events: [
              { type: "textMessage", text: "你好，这是测试", faceHero: "npc1" },
              { type: "textMessage", text: "这还是测试" },
            ]
          }
        ]
      },
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
            { type: "changeMap", map: "Kitchen", x: utils.withGrid(8), y: utils.withGrid(6), direction: "left" }
          ]
        }
      ],
      [utils.asGridCoord(52, 18)]: [
        {
          events: [
            { type: "changeMap", map: "Kitchen", x: utils.withGrid(8), y: utils.withGrid(6), direction: "left" }
          ]
        }
      ],
      [utils.asGridCoord(52, 19)]: [
        {
          events: [
            { type: "changeMap", map: "Kitchen", x: utils.withGrid(8), y: utils.withGrid(6), direction: "left" }
          ]
        }
      ],
      [utils.asGridCoord(52, 20)]: [
        {
          events: [
            { type: "changeMap", map: "Kitchen", x: utils.withGrid(8), y: utils.withGrid(6), direction: "left" }
          ]
        }
      ],
      // 通往阳台的门
      [utils.asGridCoord(12, 14)]: [
        {
          events: [
            { type: "changeMap", map: "Balcony", x: utils.withGrid(2), y: utils.withGrid(7), direction: "left" }
          ]
        }
      ],
      [utils.asGridCoord(13, 14)]: [
        {
          events: [
            { type: "changeMap", map: "Balcony", x: utils.withGrid(2), y: utils.withGrid(7), direction: "left" }
          ]
        }
      ],
      [utils.asGridCoord(14, 14)]: [
        {
          events: [
            { type: "changeMap", map: "Balcony", x: utils.withGrid(2), y: utils.withGrid(7), direction: "left" }
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
      [utils.asGridCoord(0, 4)]: true,
      [utils.asGridCoord(0, 5)]: true,
      [utils.asGridCoord(0, 6)]: true,
      [utils.asGridCoord(0, 7)]: true,
      [utils.asGridCoord(0, 8)]: true,
      [utils.asGridCoord(1, 3)]: true,
      [utils.asGridCoord(2, 3)]: true,
      [utils.asGridCoord(3, 3)]: true,
      [utils.asGridCoord(4, 3)]: true,
      [utils.asGridCoord(6, 3)]: true,
      [utils.asGridCoord(7, 3)]: true,
      [utils.asGridCoord(8, 3)]: true,
      [utils.asGridCoord(9, 3)]: true,
      [utils.asGridCoord(10, 4)]: true,
      [utils.asGridCoord(10, 5)]: true,
      [utils.asGridCoord(10, 6)]: true,
      [utils.asGridCoord(10, 7)]: true,
      [utils.asGridCoord(10, 8)]: true,
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
            { type: "changeMap", map: "LivingRoom", x: utils.withGrid(5), y: utils.withGrid(18), direction: "right" }
          ]
        }
      ],
      [utils.asGridCoord(28, 23)]: [
        {
          events: [
            { type: "changeMap", map: "LivingRoom", x: utils.withGrid(5), y: utils.withGrid(18), direction: "right" }
          ]
        }
      ],
      [utils.asGridCoord(28, 24)]: [
        {
          events: [
            { type: "changeMap", map: "LivingRoom", x: utils.withGrid(5), y: utils.withGrid(18), direction: "right" }
          ]
        }
      ],
      // 通往洗手间
      [utils.asGridCoord(18, 31)]: [
        {
          events: [
            { type: "changeMap", map: "Toilet", x: utils.withGrid(3), y: utils.withGrid(8), direction: "left" }
          ]
        }
      ],
      [utils.asGridCoord(19, 31)]: [
        {
          events: [
            { type: "changeMap", map: "Toilet", x: utils.withGrid(3), y: utils.withGrid(8), direction: "left" }
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
        src: "./image in the game/character/picture/detective.png",
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
      [utils.asGridCoord(0, 3)]: true,
      [utils.asGridCoord(0, 4)]: true,
      [utils.asGridCoord(0, 5)]: true,
      [utils.asGridCoord(0, 6)]: true,
      [utils.asGridCoord(0, 7)]: true,
      [utils.asGridCoord(1, 2)]: true,
      [utils.asGridCoord(2, 2)]: true,
      [utils.asGridCoord(3, 2)]: true,
      [utils.asGridCoord(5, 2)]: true,
      [utils.asGridCoord(6, 2)]: true,
      [utils.asGridCoord(7, 2)]: true,
      [utils.asGridCoord(8, 2)]: true,
      [utils.asGridCoord(9, 3)]: true,
      [utils.asGridCoord(9, 4)]: true,
      [utils.asGridCoord(9, 5)]: true,
      [utils.asGridCoord(9, 6)]: true,
      [utils.asGridCoord(9, 7)]: true,
      [utils.asGridCoord(1, 8)]: true,
      [utils.asGridCoord(2, 8)]: true,
      [utils.asGridCoord(3, 8)]: true,
      [utils.asGridCoord(4, 8)]: true,
      [utils.asGridCoord(5, 8)]: true,
      [utils.asGridCoord(6, 8)]: true,
      [utils.asGridCoord(7, 8)]: true,
      [utils.asGridCoord(8, 8)]: true,
    },
    cutsceneSpaces: {
      // 返回客厅
      [utils.asGridCoord(5, 10)]: [
        {
          events: [
            { type: "changeMap", map: "LivingRoom", x: utils.withGrid(7), y: utils.withGrid(19), direction: "down" }
          ]
        }
      ],
      // 通往洗手间
      [utils.asGridCoord(9, 6)]: [
        {
          events: [
            { type: "changeMap", map: "Toilet", x: utils.withGrid(3), y: utils.withGrid(8), direction: "left" }
          ]
        }
      ]
    }
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
        src: "./image in the game/character/picture/detective.png",
        walkingSrc: "./image in the game/character/detectivewalking.png",
        useShadow: true,
      }
    },
    walls: {
      [utils.asGridCoord(0, 4)]: true,
      [utils.asGridCoord(0, 5)]: true,
      [utils.asGridCoord(0, 6)]: true,
      [utils.asGridCoord(0, 7)]: true,
      [utils.asGridCoord(1, 3)]: true,
      [utils.asGridCoord(2, 3)]: true,
      [utils.asGridCoord(4, 3)]: true,
      [utils.asGridCoord(5, 3)]: true,
      [utils.asGridCoord(6, 4)]: true,
      [utils.asGridCoord(6, 5)]: true,
      [utils.asGridCoord(6, 6)]: true,
      [utils.asGridCoord(6, 7)]: true,
      [utils.asGridCoord(1, 9)]: true,
      [utils.asGridCoord(2, 9)]: true,
      [utils.asGridCoord(4, 9)]: true,
      [utils.asGridCoord(5, 9)]: true,
    },
    cutsceneSpaces: {
      // 返回客厅
      [utils.asGridCoord(3, 9)]: [
        {
          events: [
            { type: "changeMap", map: "LivingRoom", x: utils.withGrid(8), y: utils.withGrid(6), direction: "down" }
          ]
        }
      ],
      // 返回卧室
      [utils.asGridCoord(6, 6)]: [
        {
          events: [
            { type: "changeMap", map: "Bedroom", x: utils.withGrid(8), y: utils.withGrid(6), direction: "right" }
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
        src: "./image in the game/character/picture/detective.png",
        walkingSrc: "./image in the game/character/detectivewalking.png",
        useShadow: true,
      },
      witness: {
        type: "Person",
        x: utils.withGrid(6),
        y: utils.withGrid(4),
        src: "./image in the game/character/picture/2.png",
        talking: [
          {
            events: [
              { type: "textMessage", text: "我在阳台上看到了一些可疑的活动。", faceHero: "witness" },
              { type: "textMessage", text: "大约在晚上8点左右，我听到了争吵声。" },
            ]
          }
        ]
      }
    },
    walls: {
      [utils.asGridCoord(0, 3)]: true,
      [utils.asGridCoord(0, 4)]: true,
      [utils.asGridCoord(0, 5)]: true,
      [utils.asGridCoord(0, 6)]: true,
      [utils.asGridCoord(0, 7)]: true,
      [utils.asGridCoord(1, 2)]: true,
      [utils.asGridCoord(3, 2)]: true,
      [utils.asGridCoord(4, 2)]: true,
      [utils.asGridCoord(5, 2)]: true,
      [utils.asGridCoord(6, 2)]: true,
      [utils.asGridCoord(7, 2)]: true,
      [utils.asGridCoord(8, 3)]: true,
      [utils.asGridCoord(8, 4)]: true,
      [utils.asGridCoord(8, 5)]: true,
      [utils.asGridCoord(8, 6)]: true,
      [utils.asGridCoord(8, 7)]: true,
      [utils.asGridCoord(1, 8)]: true,
      [utils.asGridCoord(3, 8)]: true,
      [utils.asGridCoord(4, 8)]: true,
      [utils.asGridCoord(5, 8)]: true,
      [utils.asGridCoord(6, 8)]: true,
      [utils.asGridCoord(7, 8)]: true,
    },
    cutsceneSpaces: {
      // 返回客厅
      [utils.asGridCoord(1, 7)]: [
        {
          events: [
            { type: "changeMap", map: "LivingRoom", x: utils.withGrid(8), y: utils.withGrid(5), direction: "right" }
          ]
        }
      ]
    }
  }
};