// 工具函数
const utils = {
  withGrid(n) {
    return n * 16;
  },
  asGridCoord(x, y) {
    return `${x * 16},${y * 16}`;
  },
  nextPosition(initialX, initialY, direction) {
    let x = initialX;
    let y = initialY;
    const size = 16;
    if (direction === "left") x -= size;
    else if (direction === "right") x += size;
    else if (direction === "up") y -= size;
    else if (direction === "down") y += size;
    return { x, y };
  },
  emitEvent(name, detail) {
    const event = new CustomEvent(name, { detail });
    document.dispatchEvent(event);
  },
  oppositeDirection(direction) {
    if (direction === "left") return "right";
    if (direction === "right") return "left";
    if (direction === "up") return "down";
    return "up";
  },

  // 生成竖直墙
  verticalWall(x, yStart, yEnd) {
    const result = {};
    for (let y = yStart; y <= yEnd; y++) {
      result[this.asGridCoord(x, y)] = true;
    }
    return result;
  },

  // 生成水平墙
  horizontalWall(y, xStart, xEnd) {
    const result = {};
    for (let x = xStart; x <= xEnd; x++) {
      result[this.asGridCoord(x, y)] = true;
    }
    return result;
  },

  // 生成一整排传送点
  portalLine(xStart, xEnd, y, targetMap, targetX, targetY, direction) {
    const result = {};
    for (let x = xStart; x <= xEnd; x++) {
      result[this.asGridCoord(x, y)] = [
        {
          events: [
            { type: "changeMap", map: targetMap, x: this.withGrid(targetX), y: this.withGrid(targetY), direction }
          ]
        }
      ];
    }
    return result;
  },
  portalColumn(yStart, yEnd, x, targetMap, targetX, targetY, direction) {
    const result = {};
    for (let y = yStart; y <= yEnd; y++) {
      result[this.asGridCoord(x, y)] = [
        {
          events: [
            { type: "changeMap", map: targetMap, x: this.withGrid(targetX), y: this.withGrid(targetY), direction }
          ]
        }
      ];
    }
    return result;
  },

  // 生成矩形范围的交互触发点
  interactionRange(xStart, xEnd, yStart, yEnd, eventsOrText, backgroundImage) {
    const result = {};

    const isEventsArray = Array.isArray(eventsOrText);
    const text = isEventsArray ? null : eventsOrText;

    for (let x = xStart; x <= xEnd; x++) {
      for (let y = yStart; y <= yEnd; y++) {
        result[this.asGridCoord(x, y)] = [
          {
            events: isEventsArray ? eventsOrText : [
              { type: "textMessage", text, backgroundImage }
            ]
          }
        ];
      }
    }
    return result;
  }
};