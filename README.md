practical semester program by 基因重·组
```

## 变更日志

- 2025-09-05: 修复 `js/TextMessage.js` 中对话完成回调被覆盖的问题，导致触发对话后游戏卡住无法继续移动（现在对话结束会正确恢复控制）。验证步骤：在浏览器打开 `game.html`，与客厅 NPC 对话并确认对话结束后可以继续使用方向键移动角色。
 - 2025-09-06: 将 `LivingRoom` 地图中 `npc1`/`npc2`/`npc3` 的初始化与对话配置从 `js/MapConfigs.js` 迁移到 `js/OverworldMap.js`（运行时注入），以便后续在 `OverworldMap` 统一管理物品与交互逻辑。验证步骤：刷新游戏，进入 LivingRoom，面向 NPC 并按交互键，确认对话行为与先前一致。