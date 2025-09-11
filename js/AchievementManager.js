(function () {
  'use strict';

  class AchievementManager {
    constructor(options = {}) {
      this.container = options.container || null;
      this.achievements = options.achievements || [];
      this.elements = {};
      this.initialized = false;
      
      // 成就图片路径数组
      this.achievementImages = [
        "../ap/1.png",
        "../ap/3.png",
        "../ap/5.png",
        "../ap/2.png",
        "../ap/4.png"
      ];
    }

    // 注入样式
    injectStyles() {
      if (document.getElementById('achievement-manager-styles')) return;
      const style = document.createElement('style');
      style.id = 'achievement-manager-styles';
      style.textContent = `
        .AchievementButton {
          position: absolute;
          top: 20px;
          left: 20px;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: linear-gradient(135deg, #FFD700, #FFA500);
          border: 2px solid #8B4513;
          cursor: pointer;
          box-shadow: 0 4px 8px rgba(0,0,0,0.3);
          z-index: 1000;
          transition: all 0.3s ease;
        }
        
        .AchievementButton:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 12px rgba(0,0,0,0.4);
        }
        
        .AchievementButton::before {
          content: "🏆";
          font-size: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
        }
        
        .AchievementPanel {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 80%;
          max-width: 600px;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border-radius: 15px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
          padding: 20px;
          z-index: 1001;
          display: none;
        }
        
        .AchievementPanel.open {
          display: block;
        }
        
        .ap-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
        
        .ap-title {
          margin: 0;
          font-size: 24px;
          color: #FFD700;
          text-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
        }
        
        .ap-close {
          background: none;
          border: 2px solid #FFD700;
          border-radius: 6px;
          padding: 4px 8px;
          color: #FFD700;
          cursor: pointer;
          font-size: 16px;
        }
        
        .ap-close:hover {
          background: rgba(255, 215, 0, 0.2);
        }
        
        .AchievementGrid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 15px;
        }
        
        .AchievementTile {
          width: 100%;
          aspect-ratio: 1;
          background: rgba(0, 0, 0, 0.3);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        
        .AchievementTile.locked {
          opacity: 0.5;
        }
        
        .AchievementTile:not(.locked):hover {
          transform: scale(1.05);
          box-shadow: 0 0 15px rgba(255, 215, 0, 0.5);
        }
        
        .AchievementTile .thumb {
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          border-radius: 10px;
        }
        
        .AchievementTile.locked::after {
          content: "🔒";
          font-size: 24px;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        
        /* 添加解锁动画效果 */
        @keyframes unlockAnimation {
          0% {
            transform: scale(1);
            box-shadow: 0 0 0 rgba(255, 215, 0, 0.5);
          }
          50% {
            transform: scale(1.2);
            box-shadow: 0 0 20px rgba(255, 215, 0, 0.8);
          }
          100% {
            transform: scale(1);
            box-shadow: 0 0 15px rgba(255, 215, 0, 0.5);
          }
        }
        
        .AchievementTile.unlocking {
          animation: unlockAnimation 0.5s ease;
        }
      `;
      document.head.appendChild(style);
    }

    buildUI() {
      this.injectStyles();
      const root = this.container;
      
      // 成就按钮
      const btn = document.createElement("button");
      btn.className = "AchievementButton";
      btn.title = "成就系统";
      btn.addEventListener("click", () => this.togglePanel());
      root.appendChild(btn);
      this.elements.btn = btn;

      // 成就面板
      const panel = document.createElement("div");
      panel.className = "AchievementPanel";
      panel.innerHTML = `
        <div class="ap-header">
          <h3 class="ap-title">成就系统</h3>
          <button class="ap-close">关闭</button>
        </div>
        <div class="AchievementGrid"></div>
        <div class="ap-footer" style="margin-top: 20px; text-align: center;">
          <button class="ap-unlock-all" style="margin: 0 10px; padding: 8px 16px; background: #4CAF50; color: white; border: none; border-radius: 4px; cursor: pointer;">解锁所有成就</button>
          <button class="ap-reset-all" style="margin: 0 10px; padding: 8px 16px; background: #f44336; color: white; border: none; border-radius: 4px; cursor: pointer;">重置所有成就</button>
        </div>
      `;
      panel.querySelector(".ap-close").addEventListener("click", () => this.togglePanel(false));
      panel.querySelector(".ap-unlock-all").addEventListener("click", () => {
        this.unlockAllAchievements();
      });
      panel.querySelector(".ap-reset-all").addEventListener("click", () => {
        this.resetAllAchievements();
      });
      root.appendChild(panel);
      this.elements.panel = panel;
      this.elements.grid = panel.querySelector(".AchievementGrid");
    }

    togglePanel(force) {
      const open = typeof force === 'boolean' ? force : !this.elements.panel.classList.contains('open');
      this.elements.panel.classList.toggle('open', open);
    }

    renderGrid() {
      if (!this.elements.grid) return;
      this.elements.grid.innerHTML = "";
      
      this.achievementImages.forEach((imgSrc, index) => {
        const discovered = this.isAchievementUnlocked(index);
        const tile = document.createElement("div");
        tile.className = "AchievementTile" + (discovered ? "" : " locked");
        tile.title = discovered ? this.getAchievementName(index) : "未解锁";
        
        tile.addEventListener('click', () => {
          if (!discovered) {
            this.unlockAchievement(index, tile);
          }
        });
        
        if (discovered) {
          const thumb = document.createElement("div");
          thumb.className = "thumb";
          thumb.style.backgroundImage = `url(${imgSrc})`;
          thumb.style.backgroundSize = "cover";
          thumb.style.backgroundPosition = "center";
          tile.appendChild(thumb);
        }
        
        this.elements.grid.appendChild(tile);
      });
    }
    
    getAchievementName(index) {
      const achievementNames = [
        "糊涂侦探",
        "明察秋毫",
        "蛛丝已成罗网",
        "乐不思蜀",
        "清汤大老爷"
      ];
      return achievementNames[index] || `成就 ${index + 1}`;
    }

    isAchievementUnlocked(index) {
      const currentUsername = window.localStorage.getItem("Sec-Sight-current-username");
      const file = window.localStorage.getItem("second_sight_achievements_" + currentUsername);
      let achievements = file ? JSON.parse(file) : {};
      const achievementIds = [
        "糊涂侦探",
        "明察秋毫",
        "蛛丝已成罗网",
        "乐不思蜀",
        "清汤大老爷"
      ];
      return !!achievements[achievementIds[index]];
    }

    unlockAchievement(index, tileElement) {
      if (!this.isAchievementUnlocked(index)) {
        const currentUsername = window.localStorage.getItem("Sec-Sight-current-username");
        const file = window.localStorage.getItem("second_sight_achievements_" + currentUsername);
        let achievements = file ? JSON.parse(file) : {};
        const achievementIds = [
          "糊涂侦探",
          "明察秋毫",
          "蛛丝已成罗网",
          "乐不思蜀",
          "清汤大老爷"
        ];
        achievements[achievementIds[index]] = true;
        window.localStorage.setItem("second_sight_achievements_" + currentUsername, JSON.stringify(achievements));

        if (tileElement) {
          tileElement.classList.add("unlocking");
          setTimeout(() => {
            tileElement.classList.remove("unlocking");
            this.renderGrid();
          }, 500);
        } else {
          this.renderGrid();
        }

        try { 
          window.overworld && window.overworld.progress && window.overworld.progress.save && window.overworld.progress.save(); 
        } catch(e) {}

        alert(`成就已解锁: ${this.getAchievementName(index)}`);
      }
    }

    unlockAllAchievements() {
      for (let i = 0; i < this.achievementImages.length; i++) {
        this.unlockAchievement(i);
      }
    }

    resetAllAchievements() {
      const currentUsername = window.localStorage.getItem("Sec-Sight-current-username");
      window.localStorage.setItem("second_sight_achievements_" + currentUsername, JSON.stringify({}));
      this.renderGrid();
    }

    init(container) {
      if (this.initialized) return;
      this.container = container || this.container || document.querySelector('.game-container');
      if (!this.container) return;
      this.buildUI();
      this.renderGrid();
      this.initialized = true;
      window.achievementManager = this;

      window.unlockFirstAchievement = () => {
        if (window.achievementManager) {
          window.achievementManager.unlockAchievement(0);
        }
      };

      window.unlockSecondAchievement = () => {
        if (window.achievementManager) {
          window.achievementManager.unlockAchievement(1);
        }
      };

      window.unlockThirdAchievement = () => {
        if (window.achievementManager) {
            window.achievementManager.unlockAchievement(2);
        }
      };

      window.unlockFifthAchievement = () => {
        if (window.achievementManager) {
            window.achievementManager.unlockAchievement(4);
        }
      };

    }
  }

  window.AchievementManager = AchievementManager;

  const bootstrap = () => {
    const container = document.querySelector('.game-container');
    if (!container) return false;
    if (!window.achievementManager) {
      const am = new AchievementManager({ container });
      am.init();
    }
    return true;
  };
  
  document.addEventListener('DOMContentLoaded', () => {
    const timer = setInterval(() => {
      if (bootstrap()) {
        clearInterval(timer);
      }
    }, 250);
  });
})();
