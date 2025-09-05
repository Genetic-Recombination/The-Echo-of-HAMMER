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
        x: utils.withGrid(8),
        y: utils.withGrid(4),
        src: "./image in the game/character/wx.png",
        talking: [
          {
            events: [
              { type: "textMessage", text: "你好，我是王警官。这里发生了一起案件。", faceHero: "npc1" },
              { type: "textMessage", text: "作为侦探，你需要仔细调查现场。" },
            ]
          }
        ]
      },
      npc2: {
        type: "Person",
        x: utils.withGrid(3),
        y: utils.withGrid(8),
        src: "./image in the game/character/huasheng.png",
        talking: [
          {
            events: [
              { type: "textMessage", text: "我是目击者花生，我看到了一些可疑的事情...", faceHero: "npc2" },
            ]
          }
        ]
      }
    },
    walls: {
      [utils.asGridCoord(2, 21)]: true,
      [utils.asGridCoord(2, 19)]: true,
      [utils.asGridCoord(2, 18)]: true,
      [utils.asGridCoord(2, 17)]: true,
      [utils.asGridCoord(2, 16)]: true,
      [utils.asGridCoord(2, 15)]: true,
      [utils.asGridCoord(2, 14)]: true,
      [utils.asGridCoord(2, 13)]: true,
      [utils.asGridCoord(2, 12)]: true,
      [utils.asGridCoord(2, 11)]: true,
      [utils.asGridCoord(2, 10)]: true,
      [utils.asGridCoord(2, 9)]: true,
      [utils.asGridCoord(2, 8)]: true,
      [utils.asGridCoord(1, 7)]: true,
      [utils.asGridCoord(1, 6)]: true,
      [utils.asGridCoord(1, 5)]: true,
      [utils.asGridCoord(1, 4)]: true,
      [utils.asGridCoord(1, 3)]: true,

      
      // 添加用户指定的坐标
      [utils.asGridCoord(6, 21)]: true,
      [utils.asGridCoord(6, 22)]: true,
      [utils.asGridCoord(6, 23)]: true,
      [utils.asGridCoord(6, 24)]: true,
      [utils.asGridCoord(6, 25)]: true,
      [utils.asGridCoord(6, 26)]: true,
      [utils.asGridCoord(6, 27)]: true,
      [utils.asGridCoord(6, 28)]: true,
      [utils.asGridCoord(6, 29)]: true,
      [utils.asGridCoord(6, 30)]: true,
      [utils.asGridCoord(6, 31)]: true,
      [utils.asGridCoord(6, 32)]: true,
      [utils.asGridCoord(6, 33)]: true,
      
      // 新增墙体 - 横坐标11
      [utils.asGridCoord(10, 5)]: true,
      [utils.asGridCoord(10, 6)]: true,
      [utils.asGridCoord(10, 7)]: true,
      [utils.asGridCoord(10, 8)]: true,
      [utils.asGridCoord(10, 9)]: true,
      [utils.asGridCoord(10, 10)]: true,
      [utils.asGridCoord(10, 11)]: true,
      [utils.asGridCoord(10, 12)]: true,
      [utils.asGridCoord(10, 13)]: true,
      [utils.asGridCoord(10, 14)]: true,
      [utils.asGridCoord(10, 15)]: true,
      
      // 新增墙体 - 横坐标14
      [utils.asGridCoord(14, 5)]: true,
      [utils.asGridCoord(14, 6)]: true,
      [utils.asGridCoord(14, 7)]: true,
      [utils.asGridCoord(14, 8)]: true,
      [utils.asGridCoord(14, 9)]: true,
      [utils.asGridCoord(14, 10)]: true,
      [utils.asGridCoord(14, 11)]: true,
      [utils.asGridCoord(14, 12)]: true,
      [utils.asGridCoord(14, 13)]: true,
      [utils.asGridCoord(14, 14)]: true,
      [utils.asGridCoord(14, 15)]: true,
      
      // 右侧纵向墙
      [utils.asGridCoord(48, 11)]: true,
      [utils.asGridCoord(48, 12)]: true,
      [utils.asGridCoord(48, 13)]: true,
      [utils.asGridCoord(48, 14)]: true,
      [utils.asGridCoord(48, 15)]: true,
      [utils.asGridCoord(48, 16)]: true,
      [utils.asGridCoord(52, 7)]: true,
      [utils.asGridCoord(52, 8)]: true,
      [utils.asGridCoord(52, 9)]: true,
      [utils.asGridCoord(52, 10)]: true,
      [utils.asGridCoord(52, 11)]: true,
      [utils.asGridCoord(52, 12)]: true,
      [utils.asGridCoord(52, 13)]: true,
      [utils.asGridCoord(52, 14)]: true,
      [utils.asGridCoord(52, 15)]: true,
      [utils.asGridCoord(52, 16)]: true,
      [utils.asGridCoord(52, 17)]: true,
      [utils.asGridCoord(52, 18)]: true,
      [utils.asGridCoord(52, 19)]: true,
      [utils.asGridCoord(52, 20)]: true,
      [utils.asGridCoord(52, 21)]: true,
      [utils.asGridCoord(44, 21)]: true,
      [utils.asGridCoord(44, 22)]: true,
      [utils.asGridCoord(44, 23)]: true,
      [utils.asGridCoord(44, 24)]: true,
      [utils.asGridCoord(44, 25)]: true,
      [utils.asGridCoord(44, 26)]: true,
      [utils.asGridCoord(44, 27)]: true,
      [utils.asGridCoord(44, 28)]: true,
      [utils.asGridCoord(44, 29)]: true,
      [utils.asGridCoord(44, 30)]: true,
      [utils.asGridCoord(44, 31)]: true,
      [utils.asGridCoord(44, 32)]: true,
      [utils.asGridCoord(44, 33)]: true,
      [utils.asGridCoord(44, 34)]: true,
      [utils.asGridCoord(44, 35)]: true,
      [utils.asGridCoord(44, 36)]: true,
      [utils.asGridCoord(44, 37)]: true,
      [utils.asGridCoord(36, 37)]: true,
      [utils.asGridCoord(36, 38)]: true,
      [utils.asGridCoord(36, 39)]: true,
      [utils.asGridCoord(36, 40)]: true,
      [utils.asGridCoord(36, 41)]: true,
      [utils.asGridCoord(36, 42)]: true,
      [utils.asGridCoord(36, 43)]: true,
      [utils.asGridCoord(36, 44)]: true,
      [utils.asGridCoord(36, 45)]: true,
      
      // 新增墙体 - 横坐标28
      [utils.asGridCoord(26, 37)]: true,
      [utils.asGridCoord(26, 38)]: true,
      [utils.asGridCoord(26, 39)]: true,
      [utils.asGridCoord(26, 40)]: true,
      [utils.asGridCoord(26, 41)]: true,
      [utils.asGridCoord(26, 42)]: true,
      [utils.asGridCoord(26, 43)]: true,
      [utils.asGridCoord(26, 44)]: true,
      [utils.asGridCoord(26, 45)]: true,
      
      
      // 底部横向墙
      [utils.asGridCoord(3, 14)]: true,
      [utils.asGridCoord(4, 14)]: true,
      [utils.asGridCoord(5, 14)]: true,
      [utils.asGridCoord(6, 14)]: true,
      [utils.asGridCoord(7, 14)]: true,
      [utils.asGridCoord(8, 14)]: true,
      [utils.asGridCoord(9, 14)]: true,
      [utils.asGridCoord(10, 14)]: true,
      [utils.asGridCoord(11, 10)]: true,
      [utils.asGridCoord(12, 10)]: true,
      [utils.asGridCoord(13, 10)]: true,
      [utils.asGridCoord(14, 10)]: true,
      [utils.asGridCoord(15, 14)]: true,
      [utils.asGridCoord(16, 14)]: true,
      [utils.asGridCoord(17, 14)]: true,
      [utils.asGridCoord(18, 14)]: true,
      [utils.asGridCoord(19, 14)]: true,
      [utils.asGridCoord(20, 14)]: true,
      [utils.asGridCoord(21, 14)]: true,
      [utils.asGridCoord(22, 14)]: true,
      [utils.asGridCoord(23, 14)]: true,


    },
    cutsceneSpaces: {
      // 通往卧室的门
      [utils.asGridCoord(7, 20)]: [
        {
          events: [
            { type: "changeMap", map: "Bedroom", x: utils.withGrid(5), y: utils.withGrid(9), direction: "up" }
          ]
        }
      ],
      // 通往厨房的门
      [utils.asGridCoord(5, 20)]: [
        {
          events: [
            { type: "changeMap", map: "Kitchen", x: utils.withGrid(8), y: utils.withGrid(6), direction: "left" }
          ]
        }
      ],
      // 通往卫生间的门
      [utils.asGridCoord(5, 3)]: [
        {
          events: [
            { type: "changeMap", map: "Toilet", x: utils.withGrid(3), y: utils.withGrid(8), direction: "left" }
          ]
        }
      ],
      // 通往阳台的门
      [utils.asGridCoord(15, 16)]: [
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
        x: utils.withGrid(5),
        y: utils.withGrid(9),
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
      [utils.asGridCoord(5, 10)]: [
        {
          events: [
            { type: "changeMap", map: "LivingRoom", x: utils.withGrid(5), y: utils.withGrid(4), direction: "down" }
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
      [utils.asGridCoord(9, 6)]: [
        {
          events: [
            { type: "changeMap", map: "LivingRoom", x: utils.withGrid(3), y: utils.withGrid(5), direction: "right" }
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