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
  [utils.asGridCoord(15, 26)]: [
        {
          events: [
            { type: "textMessage", text: "【新线索】:一个捆得很紧的麻袋",backgroundImage:"./image in the game/article/客厅麻袋.png"},
            { type: "textMessage", text: "zq警官:打开看看吧，这能是什么呢？", who: "zq"},
            { type: "textMessage", text: "一件沾血的风衣，帽子和墨镜", backgroundImage:"./image in the game/article/麻袋里：沾血的风衣.png"},
            { type: "textMessage", text: "zq警官:！！！什么！！！是榔头男作案时的风衣帽子和墨镜，看来这的确就是榔头男的家了", who: "zq" },
          ]
        }
      ],
  // 麻袋交互点 - 相邻位置
  [utils.asGridCoord(16, 26)]: [
        {
          events: [
            { type: "textMessage", text: "【新线索】:一个捆得很紧的麻袋",backgroundImage:"./image in the game/article/客厅麻袋.png"},
            { type: "textMessage", text: "zq警官:打开看看吧，这能是什么呢？", who: "zq"},
            { type: "textMessage", text: "一件沾血的风衣，帽子和墨镜", backgroundImage:"./image in the game/article/麻袋里：沾血的风衣.png"},
            { type: "textMessage", text: "zq警官:！！！什么！！！是榔头男作案时的风衣帽子和墨镜，看来这的确就是榔头男的家了", who: "zq" },
          ]
        }
      ],
  [utils.asGridCoord(17, 26)]: [
        {
          events: [
            { type: "textMessage", text: "【新线索】:一个捆得很紧的麻袋",backgroundImage:"./image in the game/article/客厅麻袋.png"},
            { type: "textMessage", text: "zq警官:打开看看吧，这能是什么呢？", who: "zq"},
            { type: "textMessage", text: "一件沾血的风衣，帽子和墨镜", backgroundImage:"./image in the game/article/麻袋里：沾血的风衣.png"},
            { type: "textMessage", text: "zq警官:！！！什么！！！是榔头男作案时的风衣帽子和墨镜，看来这的确就是榔头男的家了", who: "zq" },
          ]
        }
      ],
  [utils.asGridCoord(19, 27)]: [
        {
          events: [
            { type: "textMessage", text: "【新线索】:一个捆得很紧的麻袋",backgroundImage:"./image in the game/article/客厅麻袋.png"},
            { type: "textMessage", text: "zq警官:打开看看吧，这能是什么呢？", who: "zq"},
            { type: "textMessage", text: "一件沾血的风衣，帽子和墨镜", backgroundImage:"./image in the game/article/麻袋里：沾血的风衣.png"},
            { type: "textMessage", text: "zq警官:！！！什么！！！是榔头男作案时的风衣帽子和墨镜，看来这的确就是榔头男的家了", who: "zq" },
          ]
        }
      ],
  [utils.asGridCoord(19, 28)]: [
        {
          events: [
            { type: "textMessage", text: "【新线索】:一个捆得很紧的麻袋",backgroundImage:"./image in the game/article/客厅麻袋.png"},
            { type: "textMessage", text: "zq警官:打开看看吧，这能是什么呢？", who: "zq"},
            { type: "textMessage", text: "一件沾血的风衣，帽子和墨镜", backgroundImage:"./image in the game/article/麻袋里：沾血的风衣.png"},
            { type: "textMessage", text: "zq警官:！！！什么！！！是榔头男作案时的风衣帽子和墨镜，看来这的确就是榔头男的家了", who: "zq" },
          ]
        }
      ],
  // 当玩家走到坐标(15, 25)时显示图片，
    [utils.asGridCoord(19, 31)]: [
        {
          events: [
            { type: "textMessage", text: "【新线索】：这应该是快递员送来的包裹，有几处可能是运输时的碰撞导致的凹陷。箱子有一点重量", backgroundImage:"./image in the game/article/客厅快递箱.png" },
            { type: "textMessage", text: "zq警官:！！扳手！这大小……确实很像凶器！完全有可能造成死者头部的伤痕！"},
            { type: "textMessage", text: "zq警官:但是这也太干净了。不像是凶器……不过也有可能被凶手细致的清洗过了"},
            { type: "textMessage", text: "wx警官:很有可能是取货员用这个扳手杀了人，清洗干净再藏到这个快递箱中，嫁祸给快递员！！"},
            { type: "textMessage", text: "zq警官:大胆假设，小心求证。你有证据吗？"},
          ]
        }
      ],
  // 快递箱交互点 - 相邻位置
    [utils.asGridCoord(19, 32)]: [
        {
          events: [
            { type: "textMessage", text: "【新线索】：这应该是快递员送来的包裹，有几处可能是运输时的碰撞导致的凹陷。箱子有一点重量", backgroundImage:"./image in the game/article/客厅快递箱.png" },
            { type: "textMessage", text: "zq警官:！！扳手！这大小……确实很像凶器！完全有可能造成死者头部的伤痕！"},
            { type: "textMessage", text: "zq警官:但是这也太干净了。不像是凶器……不过也有可能被凶手细致的清洗过了"},
            { type: "textMessage", text: "wx警官:很有可能是取货员用这个扳手杀了人，清洗干净再藏到这个快递箱中，嫁祸给快递员！！"},
            { type: "textMessage", text: "zq警官:大胆假设，小心求证。你有证据吗？"},
          ]
        }
      ],
    [utils.asGridCoord(19, 33)]: [
        {
          events: [
            { type: "textMessage", text: "【新线索】：这应该是快递员送来的包裹，有几处可能是运输时的碰撞导致的凹陷。箱子有一点重量", backgroundImage:"./image in the game/article/客厅快递箱.png" },
            { type: "textMessage", text: "zq警官:！！扳手！这大小……确实很像凶器！完全有可能造成死者头部的伤痕！"},
            { type: "textMessage", text: "zq警官:但是这也太干净了。不像是凶器……不过也有可能被凶手细致的清洗过了"},
            { type: "textMessage", text: "wx警官:很有可能是取货员用这个扳手杀了人，清洗干净再藏到这个快递箱中，嫁祸给快递员！！"},
            { type: "textMessage", text: "zq警官:大胆假设，小心求证。你有证据吗？"},
          ]
        }
      ],
  // 鞋柜交互点 - 原始位置
  [utils.asGridCoord(28, 39)]: [
        {
          events: [
            { type: "textMessage", text: "【新线索】：一个简陋的木质鞋柜，看起来有些年头了",backgroundImage:"./image in the game/article/客厅鞋柜.png" },
          ]
        }
      ],//鞋柜
  // 鞋柜交互点 - 相邻位置
  [utils.asGridCoord(28, 40)]: [
        {
          events: [
            { type: "textMessage", text: "【新线索】：一个简陋的木质鞋柜，看起来有些年头了",backgroundImage:"./image in the game/article/客厅鞋柜.png" },
          ]
        }
      ],
  [utils.asGridCoord(28, 41)]: [
        {
          events: [
            { type: "textMessage", text: "【新线索】：一个简陋的木质鞋柜，看起来有些年头了",backgroundImage:"./image in the game/article/客厅鞋柜.png" },
          ]
        }
      ],
  [utils.asGridCoord(28, 42)]: [
        {
          events: [
            { type: "textMessage", text: "【新线索】：一个简陋的木质鞋柜，看起来有些年头了",backgroundImage:"./image in the game/article/客厅鞋柜.png" },
          ]
        }
      ],
  [utils.asGridCoord(26, 38)]: [
        {
          events: [
            { type: "textMessage", text: "【新线索】：一个简陋的木质鞋柜，看起来有些年头了",backgroundImage:"./image in the game/article/客厅鞋柜.png" },
          ]
        }
      ],
  // 垃圾桶交互点 - 原始位置
   [utils.asGridCoord(41, 28)]: [
        {
          events: [
            { type: "textMessage", text: "【新线索】：很脏很乱的垃圾桶，像是很久没人打理了" ,backgroundImage:"./image in the game/article/客厅的垃圾桶.png"},
            { type: "textMessage", text: "zq警官:这榔头男也太不讲卫生了，怎么会这么乱啊" , who: "zq"},
          ]
        }
      ],//垃圾桶
  // 垃圾桶交互点 - 相邻位置
   [utils.asGridCoord(41, 27)]: [
        {
          events: [
            { type: "textMessage", text: "【新线索】：很脏很乱的垃圾桶，像是很久没人打理了" ,backgroundImage:"./image in the game/article/客厅的垃圾桶.png"},
            { type: "textMessage", text: "zq警官:这榔头男也太不讲卫生了，怎么会这么乱啊" , who: "zq"},
          ]
        }
      ],
   [utils.asGridCoord(42, 26)]: [
        {
          events: [
            { type: "textMessage", text: "【新线索】：很脏很乱的垃圾桶，像是很久没人打理了" ,backgroundImage:"./image in the game/article/客厅的垃圾桶.png"},
            { type: "textMessage", text: "zq警官:这榔头男也太不讲卫生了，怎么会这么乱啊" , who: "zq"},
          ]
        }
      ],
   [utils.asGridCoord(43, 26)]: [
        {
          events: [
            { type: "textMessage", text: "【新线索】：很脏很乱的垃圾桶，像是很久没人打理了" ,backgroundImage:"./image in the game/article/客厅的垃圾桶.png"},
            { type: "textMessage", text: "zq警官:这榔头男也太不讲卫生了，怎么会这么乱啊" , who: "zq"},
          ]
        }
      ],
   [utils.asGridCoord(41, 26)]: [
        {
          events: [
            { type: "textMessage", text: "【新线索】：很脏很乱的垃圾桶，像是很久没人打理了" ,backgroundImage:"./image in the game/article/客厅的垃圾桶.png"},
            { type: "textMessage", text: "zq警官:这榔头男也太不讲卫生了，怎么会这么乱啊" , who: "zq"},
          ]
        }
      ],
  // 披萨盒交互点 - 原始位置
    [utils.asGridCoord(12, 32)]: [
        {
          events: [
            { type: "textMessage", text: "【新线索】：披萨和收据",backgroundImage:"./image in the game/article/客厅披萨盒.png" },
            { type: "textMessage", text: "wx警官:这张单据是披萨外卖员留下的，上面有他的联系方式以及店铺的联系方式。价格和送到的披萨口味一致。" , who: "wx"},
            { type: "textMessage", text: "zq警官:奇怪？？送货员和机车女的收据怎么不见了呢？" , who: "zq"},
          ]
        }
      ],
  // 披萨盒交互点 - 相邻位置
    [utils.asGridCoord(12, 32)]: [
        {
          events: [
            { type: "textMessage", text: "【新线索】：披萨和收据",backgroundImage:"./image in the game/article/客厅披萨盒.png" },
            { type: "textMessage", text: "wx警官:这张单据是披萨外卖员留下的，上面有他的联系方式以及店铺的联系方式。价格和送到的披萨口味一致。" , who: "wx"},
            { type: "textMessage", text: "zq警官:奇怪？？送货员和机车女的收据怎么不见了呢？" , who: "zq"},
          ]
        }
      ],
    [utils.asGridCoord(12, 31)]: [
        {
          events: [
            { type: "textMessage", text: "【新线索】：披萨和收据",backgroundImage:"./image in the game/article/客厅披萨盒.png" },
            { type: "textMessage", text: "wx警官:这张单据是披萨外卖员留下的，上面有他的联系方式以及店铺的联系方式。价格和送到的披萨口味一致。" , who: "wx"},
            { type: "textMessage", text: "zq警官:奇怪？？送货员和机车女的收据怎么不见了呢？" , who: "zq"},
          ]
        }
      ],
    [utils.asGridCoord(12, 33)]: [
        {
          events: [
            { type: "textMessage", text: "【新线索】：披萨和收据",backgroundImage:"./image in the game/article/客厅披萨盒.png" },
            { type: "textMessage", text: "wx警官:这张单据是披萨外卖员留下的，上面有他的联系方式以及店铺的联系方式。价格和送到的披萨口味一致。" , who: "wx"},
            { type: "textMessage", text: "zq警官:奇怪？？送货员和机车女的收据怎么不见了呢？" , who: "zq"},
          ]
        }
      ],
    [utils.asGridCoord(12, 30)]: [
        {
          events: [
            { type: "textMessage", text: "【新线索】：披萨和收据",backgroundImage:"./image in the game/article/客厅披萨盒.png" },
            { type: "textMessage", text: "wx警官:这张单据是披萨外卖员留下的，上面有他的联系方式以及店铺的联系方式。价格和送到的披萨口味一致。" , who: "wx"},
            { type: "textMessage", text: "zq警官:奇怪？？送货员和机车女的收据怎么不见了呢？" , who: "zq"},
          ]
        }
      ],
  // 置物箱交互点 - 原始位置
      [utils.asGridCoord(9, 34)]: [
        {
          events: [
            { type: "textMessage", text: "【新线索】：一个置物箱，杂七杂八的东西都堆在一块",backgroundImage:"./image in the game/article/客厅的置物篮.png" },
            { type: "textMessage", text: "wx警官:这都是些啥啊，好乱啊", who: "wx" },
          ]
        }
      ],
  // 置物箱交互点 - 相邻位置
      [utils.asGridCoord(10, 34)]: [
        {
          events: [
            { type: "textMessage", text: "【新线索】：一个置物箱，杂七杂八的东西都堆在一块",backgroundImage:"./image in the game/article/客厅的置物篮.png" },
            { type: "textMessage", text: "wx警官:这都是些啥啊，好乱啊", who: "wx" },
          ]
        }
      ],
      [utils.asGridCoord(9, 34)]: [
        {
          events: [
            { type: "textMessage", text: "【新线索】：一个置物箱，杂七杂八的东西都堆在一块",backgroundImage:"./image in the game/article/客厅的置物篮.png" },
            { type: "textMessage", text: "wx警官:这都是些啥啊，好乱啊", who: "wx" },
          ]
        }
      ],
      [utils.asGridCoord(8, 33)]: [
        {
          events: [
            { type: "textMessage", text: "【新线索】：一个置物箱，杂七杂八的东西都堆在一块",backgroundImage:"./image in the game/article/客厅的置物篮.png" },
            { type: "textMessage", text: "wx警官:这都是些啥啊，好乱啊", who: "wx" },
          ]
        }
      ],
  // 沙发交互点 - 原始位置
      [utils.asGridCoord(19, 36)]: [
        {
          events: [
            { type: "textMessage", text: "【新线索】：一张款式老旧的布艺沙发靠墙摆放。沙发套看起来有些日子没洗了，颜色暗淡。",backgroundImage: "image in the game/article/客厅.png"},
          ]
        }
      ],
  // 沙发交互点 - 相邻位置
      [utils.asGridCoord(19, 37)]: [
        {
          events: [
            { type: "textMessage", text: "【新线索】：一张款式老旧的布艺沙发靠墙摆放。沙发套看起来有些日子没洗了，颜色暗淡。",backgroundImage: "image in the game/article/客厅.png"},
          ]
        }
      ],
      [utils.asGridCoord(19, 36)]: [
        {
          events: [
            { type: "textMessage", text: "【新线索】：一张款式老旧的布艺沙发靠墙摆放。沙发套看起来有些日子没洗了，颜色暗淡。",backgroundImage: "image in the game/article/客厅.png"},
          ]
        }
      ],
      [utils.asGridCoord(19, 35)]: [
        {
          events: [
            { type: "textMessage", text: "【新线索】：一张款式老旧的布艺沙发靠墙摆放。沙发套看起来有些日子没洗了，颜色暗淡。",backgroundImage: "image in the game/article/客厅.png"},
          ]
        }
      ],
      [utils.asGridCoord(19, 34)]: [
        {
          events: [
            { type: "textMessage", text: "【新线索】：一张款式老旧的布艺沙发靠墙摆放。沙发套看起来有些日子没洗了，颜色暗淡。",backgroundImage: "image in the game/article/客厅.png"},
          ]
        }
      ],
  // 纸箱交互点 - 原始位置
      [utils.asGridCoord(37, 36)]: [
        {
          events: [
            { type: "textMessage", text: "【新线索】：墙边堆着两个扁平的空棕色瓦楞纸箱" ,backgroundImage:"./image in the game/article/客厅箱子.png" },
            { type: "textMessage", text: "wx警官:看来这榔头男随时准备搬家逃跑啊，辛亏我们接到线报就一直在这监视" , who: "wx"},
          ]
        }
      ],
  // 纸箱交互点 - 相邻位置
      [utils.asGridCoord(37, 35)]: [
        {
          events: [
            { type: "textMessage", text: "【新线索】：墙边堆着两个扁平的空棕色瓦楞纸箱" ,backgroundImage:"./image in the game/article/客厅箱子.png" },
            { type: "textMessage", text: "wx警官:看来这榔头男随时准备搬家逃跑啊，辛亏我们接到线报就一直在这监视" , who: "wx"},
          ]
        }
      ],
      [utils.asGridCoord(37, 34)]: [
        {
          events: [
            { type: "textMessage", text: "【新线索】：墙边堆着两个扁平的空棕色瓦楞纸箱" ,backgroundImage:"./image in the game/article/客厅箱子.png" },
            { type: "textMessage", text: "wx警官:看来这榔头男随时准备搬家逃跑啊，辛亏我们接到线报就一直在这监视" , who: "wx"},
          ]
        }
      ],
      [utils.asGridCoord(37, 33)]: [
        {
          events: [
            { type: "textMessage", text: "【新线索】：墙边堆着两个扁平的空棕色瓦楞纸箱" ,backgroundImage:"./image in the game/article/客厅箱子.png" },
            { type: "textMessage", text: "wx警官:看来这榔头男随时准备搬家逃跑啊，辛亏我们接到线报就一直在这监视" , who: "wx"},
          ]
        }
      ],
      [utils.asGridCoord(38, 33)]: [
        {
          events: [
            { type: "textMessage", text: "【新线索】：墙边堆着两个扁平的空棕色瓦楞纸箱" ,backgroundImage:"./image in the game/article/客厅箱子.png" },
            { type: "textMessage", text: "wx警官:看来这榔头男随时准备搬家逃跑啊，辛亏我们接到线报就一直在这监视" , who: "wx"},
          ]
        }
      ],
      [utils.asGridCoord(39, 33)]: [
        {
          events: [
            { type: "textMessage", text: "【新线索】：墙边堆着两个扁平的空棕色瓦楞纸箱" ,backgroundImage:"./image in the game/article/客厅箱子.png" },
            { type: "textMessage", text: "wx警官:看来这榔头男随时准备搬家逃跑啊，辛亏我们接到线报就一直在这监视" , who: "wx"},
          ]
        }
      ],
  // 大时钟交互点 - 原始位置
      [utils.asGridCoord(26, 14)]: [
        {
          events: [
            { type: "textMessage", text: "【新线索】：破旧的大时钟，看来指针已经停摆好久了" },
          ]
        }
      ],
  // 大时钟交互点 - 相邻位置
      [utils.asGridCoord(25, 14)]: [
        {
          events: [
            { type: "textMessage", text: "【新线索】：破旧的大时钟，看来指针已经停摆好久了" },
          ]
        }
      ],
      [utils.asGridCoord(27, 14)]: [
        {
          events: [
            { type: "textMessage", text: "【新线索】：破旧的大时钟，看来指针已经停摆好久了" },
          ]
        }
      ],
      [utils.asGridCoord(27, 13)]: [
        {
          events: [
            { type: "textMessage", text: "【新线索】：破旧的大时钟，看来指针已经停摆好久了" },
          ]
        }
      ],
      [utils.asGridCoord(27, 12)]: [
        {
          events: [
            { type: "textMessage", text: "【新线索】：破旧的大时钟，看来指针已经停摆好久了" },
          ]
        }
      ],
  // 仙人掌交互点 - 原始位置
      [utils.asGridCoord(37, 15)]: [
        {
          events: [
            { type: "textMessage", text: "一盆普通的仙人掌" },
          ]
        }
      ],
  // 仙人掌交互点 - 相邻位置
      [utils.asGridCoord(37, 16)]: [
        {
          events: [
            { type: "textMessage", text: "一盆普通的仙人掌" },
          ]
        }
      ],
      [utils.asGridCoord(37, 17)]: [
        {
          events: [
            { type: "textMessage", text: "一盆普通的仙人掌" },
          ]
        }
      ],
      [utils.asGridCoord(38, 17)]: [
        {
          events: [
            { type: "textMessage", text: "一盆普通的仙人掌" },
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
  // 卧室绿植交互点 - 原始位置
      [utils.asGridCoord(45, 16)]: [
        {
          events: [
            { type: "textMessage", text: "不算名贵的绿植" },
          ]
        }
      ],
  // 卧室绿植交互点 - 相邻位置
      [utils.asGridCoord(45, 15)]: [
        {
          events: [
            { type: "textMessage", text: "不算名贵的绿植" },
          ]
        }
      ],
      [utils.asGridCoord(46, 17)]: [
        {
          events: [
            { type: "textMessage", text: "不算名贵的绿植" },
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
      [utils.asGridCoord(48, 17)]: [
        {
          events: [
            { type: "textMessage", text: "不算名贵的绿植" },
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
    ...utils.verticalWall(14, 17,20),//死人左
    ...utils.verticalWall(17, 17,20),//死人右

    ...utils.horizontalWall(20, 25, 28),//通往客厅门上厕横墙
    ...utils.horizontalWall(15, 13, 24),//衣柜下方横墙
    ...utils.horizontalWall(19, 8, 11),//床下厕边界
    ...utils.horizontalWall(15, 4, 8),//篮子下边界
    ...utils.horizontalWall(21, 4, 7),//沙发上边界
    ...utils.horizontalWall(29, 0, 16),//沙发下横墙
    ...utils.horizontalWall(25, 21, 30),//沙发下横墙
    ...utils.horizontalWall(33, 0, 100),
    ...utils.horizontalWall(17, 14,17),//死人上
    ...utils.horizontalWall(20, 14,17),//死人下
    },
    cutsceneSpaces: {
  // 通往客厅 (28,21..24)
  ...utils.portalColumn(21, 24, 28, "LivingRoom", 5, 18, "right"),
  // 通往洗手间 (17..20,31)
  ...utils.portalLine(17, 20, 31, "Toilet", 20, 6, "down"),
  [utils.asGridCoord(14, 15)]: [
    {
      events: [
        { type: "textMessage", text: "床头柜上的书",backgroundImage: "./image in the game/article/床头柜.png" },
      ]
    }
  ],
  [utils.asGridCoord(15, 15)]: [
    {
      events: [
        { type: "textMessage", text: "床头柜上的书",backgroundImage: "./image in the game/article/床头柜.png" },
      ]
    }
  ],
  [utils.asGridCoord(13, 15)]: [
    {
      events: [
        { type: "textMessage", text: "床头柜上的书",backgroundImage: "./image in the game/article/床头柜.png" },
      ]
    }
  ],

  [utils.asGridCoord(18, 15)]: [
    {
      events: [
        { type: "textMessage", text: "老式的大衣柜，柜门都有些破损" },
      ]
    }
  ],
  [utils.asGridCoord(17, 15)]: [
    {
      events: [
        { type: "textMessage", text: "老式的大衣柜，柜门都有些破损" },
      ]
    }
  ],
  [utils.asGridCoord(19, 15)]: [
    {
      events: [
        { type: "textMessage", text: "老式的大衣柜，柜门都有些破损" },
      ]
    }
  ],

  [utils.asGridCoord(22, 15)]: [
    {
      events: [
        { type: "textMessage", text: "【新线索】：卧室抽屉柜",backgroundImage: "./image in the game/article/卧室抽屉柜.png"},
        { type: "textMessage", text: "zq警官:空的吗，里面的东西被人拿走了还是本来就什么也没放啊" , who: "zq"},
      ]
    }
  ],
  [utils.asGridCoord(23, 15)]: [
    {
      events: [
        { type: "textMessage", text: "【新线索】：卧室抽屉柜",backgroundImage: "./image in the game/article/卧室抽屉柜.png"},
        { type: "textMessage", text: "zq警官:空的吗，里面的东西被人拿走了还是本来就什么也没放啊" , who: "zq"},
      ]
    }
  ],
  [utils.asGridCoord(24, 15)]: [
    {
      events: [
        { type: "textMessage", text: "【新线索】：卧室抽屉柜",backgroundImage: "./image in the game/article/卧室抽屉柜.png"},
        { type: "textMessage", text: "zq警官:空的吗，里面的东西被人拿走了还是本来就什么也没放啊" , who: "zq"},
      ]
    }
  ],
  [utils.asGridCoord(7, 22)]: [
    {
      events: [
        { type: "textMessage", text: "【新线索】：卧室沙发",backgroundImage: "./image in the game/article/我是沙发.png"},
        { type: "textMessage", text: "zq警官:诶？这个沙发床怎么这么小巧啊，据说榔头男身高八尺有余，就睡在这个沙发上吗" , who: "zq"},
        { type: "textMessage", text: "wx警官:那都是都市传说啦，实际上没人见过榔头男的真面目，那天的目击者喝醉了酒其实也没看清" , who: "wx"},
        { type: "textMessage", text: "zq警官:哦？我想起来了，就像尼斯湖水怪是吧，大众根据想象具体化了凶手的形象" , who: "zq"},
        { type: "textMessage", text: "wx警官:就是这样的，你看倒下的榔头男也不过170公分而已" , who: "wx"},
      ]
    }
  ],
  [utils.asGridCoord(7, 23)]: [
    {
      events: [
        { type: "textMessage", text: "【新线索】：卧室沙发",backgroundImage: "./image in the game/article/我是沙发.png"},
        { type: "textMessage", text: "zq警官:诶？这个沙发床怎么这么小巧啊，据说榔头男身高八尺有余，就睡在这个沙发上吗" , who: "zq"},
        { type: "textMessage", text: "wx警官:那都是都市传说啦，实际上没人见过榔头男的真面目，那天的目击者喝醉了酒其实也没看清" , who: "wx"},
        { type: "textMessage", text: "zq警官:哦？我想起来了，就像尼斯湖水怪是吧，大众根据想象具体化了凶手的形象" , who: "zq"},
        { type: "textMessage", text: "wx警官:就是这样的，你看倒下的榔头男也不过170公分而已" , who: "wx"},
      ]
    }
  ],
  [utils.asGridCoord(7, 24)]: [
    {
      events: [
        { type: "textMessage", text: "【新线索】：卧室沙发",backgroundImage: "./image in the game/article/我是沙发.png"},
        { type: "textMessage", text: "zq警官:诶？这个沙发床怎么这么小巧啊，据说榔头男身高八尺有余，就睡在这个沙发上吗" , who: "zq"},
        { type: "textMessage", text: "wx警官:那都是都市传说啦，实际上没人见过榔头男的真面目，那天的目击者喝醉了酒其实也没看清" , who: "wx"},
        { type: "textMessage", text: "zq警官:哦？我想起来了，就像尼斯湖水怪是吧，大众根据想象具体化了凶手的形象" , who: "zq"},
        { type: "textMessage", text: "wx警官:就是这样的，你看倒下的榔头男也不过170公分而已" , who: "wx"},
      ]
    }
  ],
  [utils.asGridCoord(7, 25)]: [
    {
      events: [
        { type: "textMessage", text: "【新线索】：卧室沙发",backgroundImage: "./image in the game/article/我是沙发.png"},
        { type: "textMessage", text: "zq警官:诶？这个沙发床怎么这么小巧啊，据说榔头男身高八尺有余，就睡在这个沙发上吗" , who: "zq"},
        { type: "textMessage", text: "wx警官:那都是都市传说啦，实际上没人见过榔头男的真面目，那天的目击者喝醉了酒其实也没看清" , who: "wx"},
        { type: "textMessage", text: "zq警官:哦？我想起来了，就像尼斯湖水怪是吧，大众根据想象具体化了凶手的形象" , who: "zq"},
        { type: "textMessage", text: "wx警官:就是这样的，你看倒下的榔头男也不过170公分而已" , who: "wx"},
      ]
    }
  ],
  [utils.asGridCoord(7, 26)]: [
    {
      events: [
        { type: "textMessage", text: "【新线索】：卧室沙发",backgroundImage: "./image in the game/article/我是沙发.png"},
        { type: "textMessage", text: "zq警官:诶？这个沙发床怎么这么小巧啊，据说榔头男身高八尺有余，就睡在这个沙发上吗" , who: "zq"},
        { type: "textMessage", text: "wx警官:那都是都市传说啦，实际上没人见过榔头男的真面目，那天的目击者喝醉了酒其实也没看清" , who: "wx"},
        { type: "textMessage", text: "zq警官:哦？我想起来了，就像尼斯湖水怪是吧，大众根据想象具体化了凶手的形象" , who: "zq"},
        { type: "textMessage", text: "wx警官:就是这样的，你看倒下的榔头男也不过170公分而已" , who: "wx"},
      ]
    }
  ],
  [utils.asGridCoord(7, 27)]: [
    {
      events: [
        { type: "textMessage", text: "【新线索】：卧室沙发",backgroundImage: "./image in the game/article/我是沙发.png"},
        { type: "textMessage", text: "zq警官:诶？这个沙发床怎么这么小巧啊，据说榔头男身高八尺有余，就睡在这个沙发上吗" , who: "zq"},
        { type: "textMessage", text: "wx警官:那都是都市传说啦，实际上没人见过榔头男的真面目，那天的目击者喝醉了酒其实也没看清" , who: "wx"},
        { type: "textMessage", text: "zq警官:哦？我想起来了，就像尼斯湖水怪是吧，大众根据想象具体化了凶手的形象" , who: "zq"},
        { type: "textMessage", text: "wx警官:就是这样的，你看倒下的榔头男也不过170公分而已" , who: "wx"},
      ]
    }
  ],
  [utils.asGridCoord(7, 28)]: [
    {
      events: [
        { type: "textMessage", text: "【新线索】：卧室沙发",backgroundImage: "./image in the game/article/我是沙发.png"},
        { type: "textMessage", text: "zq警官:诶？这个沙发床怎么这么小巧啊，据说榔头男身高八尺有余，就睡在这个沙发上吗" , who: "zq"},
        { type: "textMessage", text: "wx警官:那都是都市传说啦，实际上没人见过榔头男的真面目，那天的目击者喝醉了酒其实也没看清" , who: "wx"},
        { type: "textMessage", text: "zq警官:哦？我想起来了，就像尼斯湖水怪是吧，大众根据想象具体化了凶手的形象" , who: "zq"},
        { type: "textMessage", text: "wx警官:就是这样的，你看倒下的榔头男也不过170公分而已" , who: "wx"},
      ]
    }
  ],
  [utils.asGridCoord(6, 21)]: [
    {
      events: [
        { type: "textMessage", text: "【新线索】：卧室沙发",backgroundImage: "./image in the game/article/我是沙发.png"},
        { type: "textMessage", text: "zq警官:诶？这个沙发床怎么这么小巧啊，据说榔头男身高八尺有余，就睡在这个沙发上吗" , who: "zq"},
        { type: "textMessage", text: "wx警官:那都是都市传说啦，实际上没人见过榔头男的真面目，那天的目击者喝醉了酒其实也没看清" , who: "wx"},
        { type: "textMessage", text: "zq警官:哦？我想起来了，就像尼斯湖水怪是吧，大众根据想象具体化了凶手的形象" , who: "zq"},
        { type: "textMessage", text: "wx警官:就是这样的，你看倒下的榔头男也不过170公分而已" , who: "wx"},
      ]
    }
  ],
  [utils.asGridCoord(5, 21)]: [
    {
      events: [
        { type: "textMessage", text: "【新线索】：卧室沙发",backgroundImage: "./image in the game/article/我是沙发.png"},
        { type: "textMessage", text: "zq警官:诶？这个沙发床怎么这么小巧啊，据说榔头男身高八尺有余，就睡在这个沙发上吗" , who: "zq"},
        { type: "textMessage", text: "wx警官:那都是都市传说啦，实际上没人见过榔头男的真面目，那天的目击者喝醉了酒其实也没看清" , who: "wx"},
        { type: "textMessage", text: "zq警官:哦？我想起来了，就像尼斯湖水怪是吧，大众根据想象具体化了凶手的形象" , who: "zq"},
        { type: "textMessage", text: "wx警官:就是这样的，你看倒下的榔头男也不过170公分而已" , who: "wx"},
      ]
    }
  ],
  [utils.asGridCoord(7, 21)]: [
    {
      events: [
        { type: "textMessage", text: "【新线索】：卧室沙发",backgroundImage: "./image in the game/article/我是沙发.png"},
        { type: "textMessage", text: "zq警官:诶？这个沙发床怎么这么小巧啊，据说榔头男身高八尺有余，就睡在这个沙发上吗" , who: "zq"},
        { type: "textMessage", text: "wx警官:那都是都市传说啦，实际上没人见过榔头男的真面目，那天的目击者喝醉了酒其实也没看清" , who: "wx"},
        { type: "textMessage", text: "zq警官:哦？我想起来了，就像尼斯湖水怪是吧，大众根据想象具体化了凶手的形象" , who: "zq"},
        { type: "textMessage", text: "wx警官:就是这样的，你看倒下的榔头男也不过170公分而已" , who: "wx"},
      ]
    }
  ],
  // 新增：卧室尸体九格触发
  ...(() => {
    const spaces = {};
    const firstTimeEvents = [
      { type: "textMessage", text: "(卧室里，一个高大的男人仰面躺在地上一动不动。他穿着厚重的长袖外套，头上戴着一顶压得很低的帽子，仿佛随时准备出门。穿得异常整齐。)" },
      { type: "textMessage", text: "(在他的手边，倾倒着一个棕色的药瓶，几粒白色药片散落在枕边和地面上。)" },

      { type: "textMessage", text: "wx&zq：\n（同时惊呼）“喂！？你怎么样？！”" , who: "wx&zq"},
      { type: "textMessage", text: "(两人迅速冲上前去。zq警官检查颈动脉，wx警官则注意到了那个药瓶。)" },

      { type: "textMessage", text: "zq警官：\n（收回手，面色沉重地摇了摇头）\n“死了”" , who: "zq"},
      { type: "textMessage", text: "wx警官：\n（拿起药瓶看了一眼）\n“是安眠药！”" , who: "wx"},

      { type: "textMessage", text: "(两位警官都沉默了，目光从尸体移到散落的药片，再移到死者过于整齐的穿着上。现场看起来像是一场…)" },
      { type: "textMessage", text: "wx警官：\n（语气带着不确定的推测）\n“难道…是畏罪自杀？他穿好衣服戴上帽子…是原本想逃跑，但发现逃不掉后，就选择了自我了断？”" , who: "wx"},

      { type: "textMessage", text: "(凝重的背景音乐响起...)" },
      { type: "showImage", src: "./image in the game/article/big_dead.png" },

      {
        type: "interactionMenu",
        title: "对现场的判断",
        options: [
          {
            label: "A：【得出结论】",
            description: "看来就是这样了。",
            handler: () => {
              const message = new TextMessage({
                text: "你选择了：得出结论。\n调查暂时结束。",
                onComplete: () => {
                  playerState.storyFlags["bedroom_conclusion"] = true;
                }
              });
              message.init(document.querySelector(".game-container"));
            }
          },
          {
            label: "B：【提出质疑】",
            description: "不对！这太不合常理了。我们再仔细看看！",
            handler: () => {
              const message = new TextMessage({
                text: "你选择了：提出质疑。\n继续仔细搜查现场……",
                onComplete: () => {
                  playerState.storyFlags["bedroom_investigate_more"] = true;
                }
              });
              message.init(document.querySelector(".game-container"));
            }
          }
        ]
      },
      // 关键：无论选择什么，立即标记已查看尸体，用于“一次性” gating
      { type: "addStoryFlag", flag: "bedroom_corpse_viewed" }
    ];

    const repeatEvents = [
      { type: "textMessage", text: "(再次检查尸体...)" },
      {
        type: "interactionMenu",
        title: "选择检查部位",
        options: [
          {
            label: "查看安眠药",
            description: "仔细检查死者旁边的安眠药瓶和散落的药片",
            handler: () => {
              // 使用事件系统创建文本消息，而不是直接创建
              window.overworld.map.startCutscene([
                { type: "textMessage", text: "药瓶上的标签显示这是一种强效安眠药，需要凭处方购买。瓶子里还剩下几粒药片，地上散落的药片数量不多，看起来死者并没有服用过量的药物。" }
              ]);
            }
          },
          {
            label: "掀开帽子",
            description: "查看死者的面部特征",
            handler: () => {
              // 使用事件系统创建文本消息，而不是直接创建
              window.overworld.map.startCutscene([
                { type: "textMessage", text: "你小心地掀开死者的帽子，露出了一张中年男性的脸。他的表情平静，没有痛苦或挣扎的迹象。脸色略显苍白，但没有明显的外伤或异常。" }
              ]);
            }
          },
          {
            label: "检查上衣",
            description: "检查死者穿着的外套",
            handler: () => {
              // 使用事件系统创建文本消息，而不是直接创建
              window.overworld.map.startCutscene([
                { type: "textMessage", text: "死者穿着一件厚重的长袖外套，衣物整洁，没有明显的撕扯或搏斗痕迹。口袋里有一张皱巴巴的纸条，上面写着一串数字，可能是某种密码或联系方式。" }
              ]);
            }
          },
          {
            label: "检查裤子",
            description: "检查死者的裤子和口袋",
            handler: () => {
              // 使用事件系统创建文本消息，而不是直接创建
              window.overworld.map.startCutscene([
                { type: "textMessage", text: "死者的裤子也很整洁，口袋里有一把公寓钥匙和一些零钱。没有发现钱包或身份证件，这有些奇怪，一个准备出门的人通常会携带这些物品。" }
              ]);
            }
          }
        ]
      }
    ];

    for (let x = 15; x <= 17; x++) {
      for (let y = 18; y <= 20; y++) {
        spaces[utils.asGridCoord(x, y)] = [
          { required: ["bedroom_corpse_viewed"], events: repeatEvents },
          { events: firstTimeEvents }
        ];
      }
    }
    return spaces;
  })()
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
      // 返回卧室
      ...utils.portalLine(18, 19, 6, "Bedroom", 18, 30, "up"),
      [utils.asGridCoord(20, 6)]: [
        {
          events: [
            { type: "changeMap", map: "Bedroom", x: utils.withGrid(18), y: utils.withGrid(31), direction: "up" }
          ]
        }
      ],
       [utils.asGridCoord(22, 17)]: [
        {
          events: [
            { type: "textMessage", text: "【新线索】:分外干净的马桶" },
            { type: "textMessage", text: "zq警官:奇怪，这到了卫生间就好像换了一番景象" , who: "zq"},
            { type: "textMessage", text: "wx警官:是啊，洁净的有些诡异了" , who: "wx"},
          ]
        }
      ],
      [utils.asGridCoord(22, 23)]: [
        {
          events: [
            { type: "textMessage", text: "【新线索】:垃圾桶,一个小的不锈钢脚踏式垃圾桶，里面套着干净的垃圾袋，桶内空空如也。" ,backgroundImage:"./image in the game/article/卫生间垃圾桶.png"},
            { type: "textMessage", text: "zq警官:刚倒的垃圾吗，里面一点垃圾都没有" , who: "zq"},
            { type: "textMessage", text: "wx警官:奇怪，为什么客厅的垃圾就没倒呢" , who: "wx"},
          ]
        }
      ], 
      [utils.asGridCoord(15, 12)]: [
        {
          events: [
            { type: "textMessage", text: "【新线索】:洗手台",backgroundImage:"./image in the game/article/厕所洗手台.png" },
          ]
        }
      ],
       [utils.asGridCoord(11, 14)]: [
        {
          events: [
            { type: "textMessage", text: "【新线索】:置物台",backgroundImage:"./image in the game/article/置物台.png" },
            { type: "textMessage", text: "wx警官:这置物台也这么整洁啊？！" , who: "wx"},
            { type: "textMessage", text: "zq警官:这些牙膏啥的也像是刚囤的货" , who: "zq"},
          ]
        }
      ],
      [utils.asGridCoord(8, 15)]: [
        {
          events: [
            { type: "textMessage", text: "【新线索】:装洗浴用品的篮子",backgroundImage: "./image in the game/article/卫生间收纳盒.png"},
          ]
        }
      ], 
      [utils.asGridCoord(8, 23)]: [
        {
          events: [
            { type: "textMessage", text: "【新线索】:浴缸",backgroundImage: "./image in the game/article/浴缸.png" },
            { type: "textMessage", text: "zq警官:这浴缸也是一点使用痕迹都没有啊" , who: "zq"},
            { type: "textMessage", text: "wx警官:是的，这应该也是才打扫过不久的" , who: "wx"},
          ]
        }
      ],
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
      ...utils.portalLine(18, 20, 24, "LivingRoom", 13, 15, "down")
    }
  }
}