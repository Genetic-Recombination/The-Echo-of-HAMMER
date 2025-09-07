// 游戏世界事件
class OverworldEvent {
  constructor({ map, event }) {
    this.map = map;
    this.event = event;
  }

  stand(resolve) {
    const who = this.map.gameObjects[this.event.who];
    who.startBehavior({
      map: this.map
    }, {
      type: "stand",
      direction: this.event.direction,
      time: this.event.time
    });

    const completeHandler = e => {
      if (e.detail.whoId === this.event.who) {
        document.removeEventListener("PersonStandComplete", completeHandler);
        resolve();
      }
    };
    document.addEventListener("PersonStandComplete", completeHandler);
  }

  walk(resolve) {
    const who = this.map.gameObjects[this.event.who];
    who.startBehavior({
      map: this.map
    }, {
      type: "walk",
      direction: this.event.direction,
      retry: true
    });

    const completeHandler = e => {
      if (e.detail.whoId === this.event.who) {
        document.removeEventListener("PersonWalkingComplete", completeHandler);
        resolve();
      }
    };
    document.addEventListener("PersonWalkingComplete", completeHandler);
  }

  textMessage(resolve) {
    if (this.event.faceHero) {
      const obj = this.map.gameObjects[this.event.faceHero];
      obj.direction = utils.oppositeDirection(this.map.gameObjects["hero"].direction);
    }

    const message = new TextMessage({
      text: this.event.text,
      onComplete: () => resolve()
    });
    message.init(document.querySelector(".game-container"));
  }

  changeMap(resolve) {
    // 卸载旧地图的所有对象
    Object.values(this.map.gameObjects).forEach(obj => {
      obj.isMounted = false;
    });

    const sceneTransition = new SceneTransition();
    sceneTransition.init(document.querySelector(".game-container"), () => {
      this.map.overworld.startMap(window.OverworldMaps[this.event.map], {
        x: this.event.x,
        y: this.event.y,
        direction: this.event.direction,
      });
      resolve();

      sceneTransition.fadeOut();
    });
  }

  pause(resolve) {
    this.map.isPaused = true;
    const menu = new PauseMenu({
      progress: this.map.overworld.progress,
      onComplete: () => {
        resolve();
        this.map.isPaused = false;
        this.map.overworld.startGameLoop();
      }
    });
    menu.init(document.querySelector(".game-container"));
  }

  addStoryFlag(resolve) {
    window.playerState.storyFlags[this.event.flag] = true;
    resolve();
  }

  craftingMenu(resolve) {
    const menu = new CraftingMenu({
      pizzas: this.event.pizzas,
      onComplete: () => {
        resolve();
      }
    });
    menu.init(document.querySelector(".game-container"));
  }

  // 控制对象可见性事件
  setVisibility(resolve) {
    const obj = this.map.gameObjects[this.event.objectId];
    if (obj) {
      obj.visible = this.event.visible;
    }
    resolve();
  }

  battle(resolve) {
    const battle = new Battle({
      enemy: this.event.enemyId,
      onComplete: (didWin) => {
        resolve(didWin ? "WON_BATTLE" : "LOST_BATTLE");
      }
    });
    battle.init(document.querySelector(".game-container"));
  }

  // 显示图片事件
  showImage(resolve) {
    const img = document.createElement("img");
    img.src = this.event.src;
    img.classList.add("popup-image");
    document.querySelector(".game-container").appendChild(img);

    // 按空格键后关闭
    const closeImage = () => {
      img.remove();
      document.removeEventListener("keydown", closeImage);
      resolve();
    };
    document.addEventListener("keydown", (e) => {
      if (e.key === " ") {
        closeImage();
      }
    });
  }

  init() {
    return new Promise(resolve => {
      this[this.event.type](resolve);
    });
  }
}