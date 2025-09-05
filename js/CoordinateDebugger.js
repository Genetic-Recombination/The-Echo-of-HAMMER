// 坐标调试工具
class CoordinateDebugger {
  constructor() {
    this.isEnabled = false;
    this.debugElement = null;
    this.createDebugUI();
  }

  createDebugUI() {
    // 创建调试面板
    this.debugElement = document.createElement('div');
    this.debugElement.style.cssText = `
      position: fixed;
      top: 10px;
      left: 10px;
      background: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 10px;
      border-radius: 5px;
      font-family: monospace;
      font-size: 14px;
      z-index: 1000;
      display: none;
    `;
    document.body.appendChild(this.debugElement);

    // 创建切换按钮
    const toggleButton = document.createElement('button');
    toggleButton.textContent = '显示坐标';
    toggleButton.style.cssText = `
      position: fixed;
      top: 10px;
      right: 10px;
      background: #4CAF50;
      color: white;
      border: none;
      padding: 10px 15px;
      border-radius: 5px;
      cursor: pointer;
      font-size: 12px;
      z-index: 1001;
    `;
    
    toggleButton.addEventListener('click', () => {
      this.toggle();
      toggleButton.textContent = this.isEnabled ? '隐藏坐标' : '显示坐标';
    });
    
    document.body.appendChild(toggleButton);

    // 监听键盘快捷键 (按C键切换)
    document.addEventListener('keydown', (e) => {
      if (e.key.toLowerCase() === 'c' && !e.ctrlKey && !e.altKey) {
        this.toggle();
        toggleButton.textContent = this.isEnabled ? '隐藏坐标' : '显示坐标';
      }
    });
  }

  toggle() {
    this.isEnabled = !this.isEnabled;
    this.debugElement.style.display = this.isEnabled ? 'block' : 'none';
  }

  update(overworld) {
    if (!this.isEnabled || !overworld || !overworld.map || !overworld.map.gameObjects.hero) {
      return;
    }

    const hero = overworld.map.gameObjects.hero;
    const gridX = hero.x / 16; // 转换为网格坐标
    const gridY = hero.y / 16;
    const pixelX = hero.x;
    const pixelY = hero.y;
    
    // 计算utils.asGridCoord格式的坐标
    const gridCoord = `utils.asGridCoord(${gridX}, ${gridY})`;
    const withGridCoord = `utils.withGrid(${gridX}), utils.withGrid(${gridY})`;

    this.debugElement.innerHTML = `
      <div><strong>🎯 角色坐标调试器</strong></div>
      <div>━━━━━━━━━━━━━━━━━━━━</div>
      <div>📍 网格坐标: (${gridX}, ${gridY})</div>
      <div>📐 像素坐标: (${pixelX}, ${pixelY})</div>
      <div>━━━━━━━━━━━━━━━━━━━━</div>
      <div><strong>📋 配置代码:</strong></div>
      <div style="background: rgba(255,255,255,0.1); padding: 5px; margin: 5px 0; border-radius: 3px;">
        <div>// 传送门位置</div>
        <div>[${gridCoord}]: [</div>
        <div>&nbsp;&nbsp;{</div>
        <div>&nbsp;&nbsp;&nbsp;&nbsp;events: [</div>
        <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{ type: "changeMap", map: "目标地图", </div>
        <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;x: ${withGridCoord.split(',')[0]}, </div>
        <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;y: ${withGridCoord.split(',')[1]}, </div>
        <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;direction: "up" }</div>
        <div>&nbsp;&nbsp;&nbsp;&nbsp;]</div>
        <div>&nbsp;&nbsp;}</div>
        <div>]</div>
      </div>
      <div>━━━━━━━━━━━━━━━━━━━━</div>
      <div>💡 按 C 键切换显示</div>
      <div>🎮 当前地图: ${overworld.map.id || '未知'}</div>
    `;
  }
}

// 导出调试器
window.CoordinateDebugger = CoordinateDebugger;