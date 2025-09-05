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
        x: utils.withGrid(5),
        y: utils.withGrid(6),
        src: "./image in the game/character/detective.png",
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
      [utils.asGridCoord(0, 4)]: true,
      [utils.asGridCoord(0, 5)]: true,
      [utils.asGridCoord(0, 6)]: true,
      [utils.asGridCoord(0, 7)]: true,
      [utils.asGridCoord(0, 8)]: true,
      [utils.asGridCoord(0, 9)]: true,
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
      [utils.asGridCoord(10, 9)]: true,
      [utils.asGridCoord(1, 10)]: true,
      [utils.asGridCoord(2, 10)]: true,
      [utils.asGridCoord(3, 10)]: true,
      [utils.asGridCoord(4, 10)]: true,
      [utils.asGridCoord(5, 10)]: true,
      [utils.asGridCoord(6, 10)]: true,
      [utils.asGridCoord(7, 10)]: true,
      [utils.asGridCoord(8, 10)]: true,
      [utils.asGridCoord(9, 10)]: true,
    },
    cutsceneSpaces: {
<<<<<<< Updated upstream
      [utils.asGridCoord(5, 3)]: [
=======
      // 通往卧室的门
      [utils.asGridCoord(7, 20)]: [
>>>>>>> Stashed changes
        {
          events: [
            { type: "changeMap", map: "Bedroom", x: utils.withGrid(5), y: utils.withGrid(9), direction: "up" }
          ]
        }
<<<<<<< Updated upstream
=======
      ],
      // 通往厨房的门
      [utils.asGridCoord(53, 20)]: [
        {
          events: [
            { type: "changeMap", map: "Kitchen", x: utils.withGrid(8), y: utils.withGrid(6), direction: "left" }
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
>>>>>>> Stashed changes
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
        src: "./image in the game/character/detective.png",
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
<<<<<<< Updated upstream
=======
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
>>>>>>> Stashed changes
  }
};