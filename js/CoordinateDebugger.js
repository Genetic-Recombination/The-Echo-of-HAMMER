// 坐标调试工具
class CoordinateDebugger {
  constructor() {
    this.isEnabled = false;
    this.debugElement = null;
    this.gridEnabled = false;
    this.collisionEnabled = false;
    this.portalEnabled = false;
    this.createDebugUI();
  }

  createDebugUI() {
    // 创建调试面板
    this.debugElement = document.createElement('div');
    this.debugElement.style.cssText = `
      position: fixed;
      top: 10px;
      left: 10px;
      background: rgba(0, 0, 0, 0.9);
      color: white;
      padding: 15px;
      border-radius: 8px;
      font-family: monospace;
      font-size: 12px;
      z-index: 1000;
      display: none;
      max-width: 350px;
    `;
    document.body.appendChild(this.debugElement);

    // 创建调试控制面板
    const controlPanel = document.createElement('div');
    controlPanel.style.cssText = `
      position: fixed;
      top: 10px;
      right: 10px;
      background: rgba(0, 0, 0, 0.9);
      color: white;
      padding: 15px;
      border-radius: 8px;
      font-family: monospace;
      font-size: 12px;
      z-index: 1001;
    `;
    
    controlPanel.innerHTML = `
      <div style="margin-bottom: 10px; font-weight: bold; color: #4CAF50;">🛠️ 调试工具</div>
      <button id="toggleCoords" style="display: block; width: 100%; margin: 5px 0; padding: 8px; background: #4CAF50; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 11px;">显示坐标 [C]</button>
      <button id="toggleGrid" style="display: block; width: 100%; margin: 5px 0; padding: 8px; background: #2196F3; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 11px;">显示网格 [G]</button>
      <button id="toggleCollision" style="display: block; width: 100%; margin: 5px 0; padding: 8px; background: #f44336; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 11px;">显示碰撞 [X]</button>
      <button id="togglePortal" style="display: block; width: 100%; margin: 5px 0; padding: 8px; background: #9C27B0; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 11px;">显示传送门 [P]</button>
    `;
    
    document.body.appendChild(controlPanel);
    
    // 绑定按钮事件
    document.getElementById('toggleCoords').addEventListener('click', () => this.toggleCoords());
    document.getElementById('toggleGrid').addEventListener('click', () => this.toggleGrid());
    document.getElementById('toggleCollision').addEventListener('click', () => this.toggleCollision());
    document.getElementById('togglePortal').addEventListener('click', () => this.togglePortal());

    // 键盘快捷键监听
    document.addEventListener('keydown', (e) => {
      if (e.key === 'c' || e.key === 'C') {
        this.toggle();
      } else if (e.key === 'g' || e.key === 'G') {
        this.toggleGrid();
      } else if (e.key === 'x' || e.key === 'X') {
        this.toggleCollision();
      } else if (e.key === 'p' || e.key === 'P') {
        this.togglePortal();
      }
    });
  }

  toggle() {
    this.isEnabled = !this.isEnabled;
    this.debugElement.style.display = this.isEnabled ? 'block' : 'none';
    this.updateButtonText('toggleCoords', this.isEnabled ? '隐藏坐标 [C]' : '显示坐标 [C]');
  }
  
  toggleCoords() {
    this.toggle();
  }
  
  toggleGrid() {
    this.gridEnabled = !this.gridEnabled;
    this.updateButtonText('toggleGrid', this.gridEnabled ? '隐藏网格 [G]' : '显示网格 [G]');
  }
  
  toggleCollision() {
    this.collisionEnabled = !this.collisionEnabled;
    this.updateButtonText('toggleCollision', this.collisionEnabled ? '隐藏碰撞 [X]' : '显示碰撞 [X]');
  }
  
  togglePortal() {
    this.portalEnabled = !this.portalEnabled;
    this.updateButtonText('togglePortal', this.portalEnabled ? '隐藏传送门 [P]' : '显示传送门 [P]');
  }
  
  updateButtonText(buttonId, text) {
    const button = document.getElementById(buttonId);
    if (button) button.textContent = text;
  }

  update(overworld) {
    if (!overworld || !overworld.map) {
      return;
    }

    // 绘制调试覆盖层
    this.drawDebugOverlay(overworld);
    
    // 更新坐标信息
    if (this.isEnabled && overworld.map.gameObjects.hero) {
      const hero = overworld.map.gameObjects.hero;
      const gridX = hero.x / 16;
      const gridY = hero.y / 16;
      const pixelX = hero.x;
      const pixelY = hero.y;
      
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
        <div>💡 快捷键: C坐标 G网格 X碰撞 P传送门</div>
        <div>🎮 当前地图: ${overworld.map.id || '未知'}</div>
      `;
    }
  }
  
  drawDebugOverlay(overworld) {
    if (!this.gridEnabled && !this.collisionEnabled && !this.portalEnabled) {
      return;
    }
    
    const ctx = overworld.ctx;
    const cameraPerson = overworld.map.gameObjects.hero;
    if (!cameraPerson) return;
    
    const canvasWidth = ctx.canvas.width;
    const canvasHeight = ctx.canvas.height;
    
    // 计算相机偏移
    const cameraOffsetX = canvasWidth / 2 - cameraPerson.x;
    const cameraOffsetY = canvasHeight / 2 - cameraPerson.y;
    
    // 绘制网格线
    if (this.gridEnabled) {
      this.drawGrid(ctx, cameraOffsetX, cameraOffsetY, canvasWidth, canvasHeight);
    }
    
    // 绘制碰撞区域
    if (this.collisionEnabled) {
      this.drawCollisions(ctx, overworld.map, cameraOffsetX, cameraOffsetY);
    }
    
    // 绘制传送门
    if (this.portalEnabled) {
      this.drawPortals(ctx, overworld.map, cameraOffsetX, cameraOffsetY);
    }
  }
  
  drawGrid(ctx, offsetX, offsetY, canvasWidth, canvasHeight) {
    ctx.save();
    
    const gridSize = 16;
    
    // 计算网格起始位置
    const startX = Math.floor(-offsetX / gridSize) * gridSize;
    const startY = Math.floor(-offsetY / gridSize) * gridSize;
    
    // 绘制网格线 - 增强可见性
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.lineWidth = 1;
    
    // 绘制垂直线
    for (let x = startX; x < startX + canvasWidth + gridSize; x += gridSize) {
      const screenX = x + offsetX;
      if (screenX >= 0 && screenX <= canvasWidth) {
        ctx.beginPath();
        ctx.moveTo(screenX, 0);
        ctx.lineTo(screenX, canvasHeight);
        ctx.stroke();
      }
    }
    
    // 绘制水平线
    for (let y = startY; y < startY + canvasHeight + gridSize; y += gridSize) {
      const screenY = y + offsetY;
      if (screenY >= 0 && screenY <= canvasHeight) {
        ctx.beginPath();
        ctx.moveTo(0, screenY);
        ctx.lineTo(canvasWidth, screenY);
        ctx.stroke();
      }
    }
    
    // 绘制坐标轴标注
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.font = '10px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // X轴坐标标注
    for (let x = startX; x < startX + canvasWidth + gridSize; x += gridSize) {
      const screenX = x + offsetX;
      const gridX = x / gridSize;
      if (screenX >= 0 && screenX <= canvasWidth && gridX % 2 === 0) {
        // 绘制背景
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(screenX - 8, 2, 16, 12);
        // 绘制文字
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fillText(gridX.toString(), screenX, 8);
      }
    }
    
    // Y轴坐标标注
    ctx.textAlign = 'left';
    for (let y = startY; y < startY + canvasHeight + gridSize; y += gridSize) {
      const screenY = y + offsetY;
      const gridY = y / gridSize;
      if (screenY >= 0 && screenY <= canvasHeight && gridY % 2 === 0) {
        // 绘制背景
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(2, screenY - 6, 16, 12);
        // 绘制文字
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fillText(gridY.toString(), 4, screenY);
      }
    }
    
    ctx.restore();
  }
  
  drawCollisions(ctx, map, offsetX, offsetY) {
    ctx.save();
    
    // 绘制墙体碰撞 - 增强可见性
    ctx.fillStyle = 'rgba(255, 0, 0, 0.7)';
    ctx.strokeStyle = 'rgba(255, 0, 0, 0.9)';
    ctx.lineWidth = 2;
    
    Object.keys(map.walls).forEach(coord => {
      const [x, y] = coord.split(',').map(Number);
      const screenX = x * 16 + offsetX;
      const screenY = y * 16 + offsetY;
      
      if (screenX > -16 && screenX < ctx.canvas.width && screenY > -16 && screenY < ctx.canvas.height) {
        // 填充区域
        ctx.fillRect(screenX, screenY, 16, 16);
        // 绘制边框
        ctx.strokeRect(screenX, screenY, 16, 16);
        // 添加X标记
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(screenX + 3, screenY + 3);
        ctx.lineTo(screenX + 13, screenY + 13);
        ctx.moveTo(screenX + 13, screenY + 3);
        ctx.lineTo(screenX + 3, screenY + 13);
        ctx.stroke();
        ctx.strokeStyle = 'rgba(255, 0, 0, 0.9)';
        ctx.lineWidth = 2;
      }
    });
    
    // 绘制NPC碰撞 - 增强可见性
    ctx.fillStyle = 'rgba(255, 100, 0, 0.7)';
    ctx.strokeStyle = 'rgba(255, 100, 0, 0.9)';
    ctx.lineWidth = 2;
    
    Object.values(map.gameObjects).forEach(obj => {
      if (obj.isMounted && !obj.isPlayerControlled) {
        const screenX = obj.x + offsetX;
        const screenY = obj.y + offsetY;
        
        if (screenX > -16 && screenX < ctx.canvas.width && screenY > -16 && screenY < ctx.canvas.height) {
          // 填充区域
          ctx.fillRect(screenX, screenY, 16, 16);
          // 绘制边框
          ctx.strokeRect(screenX, screenY, 16, 16);
          // 添加人物图标
          ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
          ctx.font = '12px Arial';
          ctx.textAlign = 'center';
          ctx.fillText('👤', screenX + 8, screenY + 12);
          ctx.fillStyle = 'rgba(255, 100, 0, 0.7)';
        }
      }
    });
    
    ctx.restore();
  }
  
  drawPortals(ctx, map, offsetX, offsetY) {
    ctx.save();
    
    Object.keys(map.cutsceneSpaces).forEach(coord => {
      const [x, y] = coord.split(',').map(Number);
      const screenX = x * 16 + offsetX;
      const screenY = y * 16 + offsetY;
      
      if (screenX > -16 && screenX < ctx.canvas.width && screenY > -16 && screenY < ctx.canvas.height) {
        // 填充传送门区域 - 增强可见性
        ctx.fillStyle = 'rgba(0, 100, 255, 0.8)';
        ctx.fillRect(screenX, screenY, 16, 16);
        
        // 绘制边框
        ctx.strokeStyle = 'rgba(0, 150, 255, 1.0)';
        ctx.lineWidth = 3;
        ctx.strokeRect(screenX, screenY, 16, 16);
        
        // 绘制内部边框
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.lineWidth = 1;
        ctx.strokeRect(screenX + 2, screenY + 2, 12, 12);
        
        // 绘制传送门图标
        ctx.fillStyle = 'rgba(255, 255, 255, 1.0)';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('🚪', screenX + 8, screenY + 8);
        
        // 添加闪烁效果
        const time = Date.now() * 0.005;
        const alpha = 0.3 + 0.3 * Math.sin(time);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.fillRect(screenX, screenY, 16, 16);
      }
    });
    
    ctx.restore();
  }
}

// 导出调试器
window.CoordinateDebugger = CoordinateDebugger;