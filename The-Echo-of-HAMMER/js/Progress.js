class Progress {
  constructor(id = -1) {
    let currentUsername = localStorage["Sec-Sight-current-username"];
    this.mapId = "LivingRoom"; // 修改为当前游戏的起始地图
    // 使用地图配置中的默认英雄位置，避免首次加载时的坐标错位
    const defaultMapConfig = window.OverworldMaps?.[this.mapId];
    const defaultHero = defaultMapConfig?.configObjects?.hero;
    this.startingHeroX = defaultHero?.x || 0;
    this.startingHeroY = defaultHero?.y || 0;
    this.startingHeroDirection = defaultHero?.direction || "down";
    this.saveFileKey = "Second_Sight_SaveFile_" + currentUsername + "_" + id;
    this.getTime();
  }

  save() {
    window.localStorage.setItem(this.saveFileKey, JSON.stringify({
      mapId: this.mapId,
      startingHeroX: this.startingHeroX,
      startingHeroY: this.startingHeroY,
      startingHeroDirection: this.startingHeroDirection,
      playerState: {
        storyFlags: playerState.storyFlags,
        clues: playerState.clues || {}
      },
      time: this.time,
    }))
  }

  nowProgress() {
    return JSON.stringify({
      mapId: this.mapId,
      startingHeroX: this.startingHeroX,
      startingHeroY: this.startingHeroY,
      startingHeroDirection: this.startingHeroDirection,
      playerState: {
        storyFlags: playerState.storyFlags,
        clues: playerState.clues || {}
      },
      time: this.time,
    });
  }

  getSaveFile(whereToContinue = null) {
    if (!window.localStorage) {
      return null;
    }

    let whereToLoad = whereToContinue || this.saveFileKey;
    const file = window.localStorage.getItem(whereToLoad);
    return file ? JSON.parse(file) : null
  }

  load(whereToContinue = null) {
    const file = this.getSaveFile(whereToContinue);
    if (file) {
      this.mapId = file.mapId;
      this.startingHeroX = file.startingHeroX;
      this.startingHeroY = file.startingHeroY;
      this.startingHeroDirection = file.startingHeroDirection;
      Object.keys(file.playerState).forEach(key => {
        playerState[key] = file.playerState[key];
      })
    }
  }

  getTime() {
    this.time = new Date();
    this.month = this.time.getMonth() + 1; // 得到月份
    this.date = this.time.getDate(); // 得到日期
    this.hour = this.time.getHours(); // 得到小时数
    this.minute = this.time.getMinutes(); // 得到分钟数
  }

  setWhereToContinue() {
    window.localStorage.setItem("second_sight_whereToContinue", JSON.stringify({
      mapId: this.mapId,
      startingHeroX: this.startingHeroX,
      startingHeroY: this.startingHeroY,
      startingHeroDirection: this.startingHeroDirection,
      playerState: {
        storyFlags: playerState.storyFlags,
        clues: playerState.clues || {}
      },
      time: this.time,
    }))
  }
}