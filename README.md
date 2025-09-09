practical semester program by 基因重·组
```

## 变更日志

- 2025-09-05: 修复 `js/TextMessage.js` 中对话完成回调被覆盖的问题，导致触发对话后游戏卡住无法继续移动（现在对话结束会正确恢复控制）。验证步骤：在浏览器打开 `game.html`，与客厅 NPC 对话并确认对话结束后可以继续使用方向键移动角色。
 - 2025-09-06: 将 `LivingRoom` 地图中 `npc1`/`npc2`/`npc3` 的初始化与对话配置从 `js/MapConfigs.js` 迁移到 `js/OverworldMap.js`（运行时注入），以便后续在 `OverworldMap` 统一管理物品与交互逻辑。验证步骤：刷新游戏，进入 LivingRoom，面向 NPC 并按交互键，确认对话行为与先前一致。
- 2025-09-08: 修复冰箱二级交互按空格会重复触发的问题（在 `js/Overworld.js` 为全局 Space 触发增加遮挡检查；在 `js/TextMessage.js` 阻止 Space 冒泡并在按钮点击中阻止冒泡；在 `js/InteractionMenu.js` 支持 Space 确认并在关闭时解绑监听）。同时修复 Kitchen 垃圾桶与橱柜的背景图不显示（在 `js/OverworldMap.js` 透传 `backgroundImage` 等参数到默认 `textMessage`）。并回滚 `js/MapConfigs.js` 误改文本，将“穿得异常整齐”“迅速冲上前去”恢复为正确表述。验证：1) Kitchen 面对冰箱选择“打开冰箱”，最后一段文本按空格只能退出不会再次弹出；2) Kitchen 垃圾桶/橱柜交互时能看到对应背景图；3) 卧室尸体事件对话文本为上述正确表述。