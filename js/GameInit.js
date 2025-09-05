// 游戏初始化文件
(function () {
  const overworld = new Overworld({
    element: document.querySelector(".game-container")
  });
  window.overworld = overworld;
  overworld.init();
})();