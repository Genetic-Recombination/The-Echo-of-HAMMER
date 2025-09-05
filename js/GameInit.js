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