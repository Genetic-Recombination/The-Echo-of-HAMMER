// 游戏初始化文件
(function () {
  const overworld = new Overworld({
    element: document.querySelector(".game-container")
  });
  
  // 初始化坐标调试器
  const coordinateDebugger = new CoordinateDebugger();
  
  // 将调试器添加到overworld对象中
  overworld.coordinateDebugger = coordinateDebugger;
  
  window.overworld = overworld;
  overworld.init();
})();

// 线索资源配置（根据 /image in the game/article 文件夹）
window.CLUE_CONFIG = [
  { id: "clue_01", title: "厨房-冰箱内部", image: "./image in the game/article/冰箱内景.png", desc: "描述待补充" },
  { id: "clue_02", title: "卧室-书柜", image: "./image in the game/article/卧室书柜.png", desc: "描述待补充" },
  { id: "clue_03", title: "卧室-抽屉柜", image: "./image in the game/article/卧室抽屉柜.png", desc: "描述待补充" },
  { id: "clue_04", title: "卫生间-垃圾桶", image: "./image in the game/article/卫生间垃圾桶.png", desc: "描述待补充" },
  { id: "clue_05", title: "卫生间-收纳盒", image: "./image in the game/article/卫生间收纳盒.png", desc: "描述待补充" },
  { id: "clue_06", title: "洗手间-洗手台", image: "./image in the game/article/厕所洗手台.png", desc: "描述待补充" },
  { id: "clue_07", title: "厨房-垃圾桶", image: "./image in the game/article/厨房的垃圾桶.png", desc: "描述待补充" },
  { id: "clue_08", title: "厨房-柜子", image: "./image in the game/article/厨房的柜子.png", desc: "描述待补充" },
  { id: "clue_09", title: "客厅-门口纸条", image: "./image in the game/article/客厅门口纸条.png", desc: "描述待补充" },
  { id: "clue_10", title: "客厅-快递箱", image: "./image in the game/article/客厅快递箱.png", desc: "描述待补充" },
  { id: "clue_11", title: "客厅-披萨盒", image: "./image in the game/article/客厅披萨盒.png", desc: "描述待补充" },
  { id: "clue_12", title: "客厅-箱子", image: "./image in the game/article/客厅箱子.png", desc: "描述待补充" },
  { id: "clue_13", title: "客厅-垃圾桶", image: "./image in the game/article/客厅的垃圾桶.png", desc: "描述待补充" },
  { id: "clue_14", title: "客厅-置物篮", image: "./image in the game/article/客厅的置物篮.png", desc: "描述待补充" },
  { id: "clue_15", title: "客厅-鞋柜", image: "./image in the game/article/客厅鞋柜.png", desc: "描述待补充" },
  { id: "clue_16", title: "客厅-麻袋", image: "./image in the game/article/客厅麻袋.png", desc: "描述待补充" },
  { id: "clue_17", title: "卧室-尸体", image: "./image in the game/article/big_dead.png", desc: "描述待补充" },
  { id: "clue_18", title: "卧室-沙发", image: "./image in the game/article/我是沙发.png", desc: "描述待补充" },
  { id: "clue_19", title: "阳台-洗衣机", image: "./image in the game/article/洗衣机内景.png", desc: "描述待补充" },
  { id: "clue_20", title: "洗手间-浴缸", image: "./image in the game/article/浴缸.png", desc: "描述待补充" },
  { id: "clue_21", title: "洗手间-置物台", image: "./image in the game/article/置物台.png", desc: "描述待补充" },
  { id: "clue_22", title: "阳台-置物篮", image: "./image in the game/article/阳台置物篮.png", desc: "描述待补充" },
  { id: "clue_23", title: "阳台-木桶", image: "./image in the game/article/阳台木桶.png", desc: "描述待补充" },
  { id: "clue_24", title: "卧室-床头柜", image: "./image in the game/article/床头柜.png", desc: "描述待补充" }
];

// 等待 ClueManager 完成初始化后注入配置
(function applyClueConfig(){
  function tryApply(){
    if (window.clueManager && typeof window.clueManager.setConfig === 'function' && Array.isArray(window.CLUE_CONFIG)) {
      window.clueManager.setConfig(window.CLUE_CONFIG);
      return true;
    }
    return false;
  }
  if (!tryApply()) {
    const timer = setInterval(() => { if (tryApply()) clearInterval(timer); }, 200);
  }
})();