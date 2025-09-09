// 游戏初始化文件
(function () {
  const overworld = new Overworld({
    element: document.querySelector(".game-container")
  });
  
  // 初始化坐标调试器（如果可用）
  if (typeof CoordinateDebugger !== 'undefined') {
    const coordinateDebugger = new CoordinateDebugger();
    overworld.coordinateDebugger = coordinateDebugger;
  }
  
  window.overworld = overworld;
  overworld.init();
})();

// 线索资源配置（根据 /image in the game/article 文件夹）
window.CLUE_CONFIG = [
  { id: "clue_01", title: "厨房-冰箱", image: "./image%20in%20the%20game/article/冰箱内景.png", desc: "几瓶矿泉水\n一小盒吃了一半的超市沙拉\n一小罐果酱\n看不到需要烹饪的新鲜食材。" },
  { id: "clue_02", title: "客厅-箱子", image: "./image%20in%20the%20game/article/客厅箱子.png", desc: "墙边堆着两个扁平的空棕色瓦楞纸箱\nwx警官:看来这榔头男随时准备搬家逃跑啊，辛亏我们接到线报就一直在这监视" },
  { id: "clue_03", title: "卧室-抽屉柜", image: "./image%20in%20the%20game/article/卧室抽屉柜.png", desc: "zq警官:空的吗，里面的东西被人拿走了还是本来就什么也没放啊" },
  { id: "clue_04", title: "卫生间-垃圾桶", image: "./image%20in%20the%20game/article/卫生间垃圾桶.png", desc: "一个小的不锈钢脚踏式垃圾桶，里面套着干净的垃圾袋，桶内空空如也。\nzq警官:刚倒的垃圾吗，里面一点垃圾都没有\nwx警官:奇怪，为什么客厅的垃圾就没倒呢" },
  { id: "clue_05", title: "卫生间-收纳盒", image: "./image%20in%20the%20game/article/卫生间收纳盒.png", desc: "装洗浴用品的篮子" },
  { id: "clue_06", title: "卫生间-洗手台", image: "./image%20in%20the%20game/article/厕所洗手台.png", desc: "台面上放置的物品少得可怜：一支瘪掉的牙膏，还有一个打开的空漱口杯。镜柜的玻璃门一尘不染。" },
  { id: "clue_07", title: "厨房-垃圾桶", image: "./image%20in%20the%20game/article/厨房的垃圾桶.png", desc: "桶内底层有一些灰白色的纸灰和少量未完全烧尽的碎纸片，纸片边缘卷曲焦黑，已经看不清了。" },
  { id: "clue_08", title: "搜身-机车女", image: "./image%20in%20the%20game/article/机车女搜身.png", desc: "wx警官: 这就是榔头男要送出去的东西吗，打开我们看看吧\nzq警官: 可恶的榔头男！！！还是个无耻的内衣大盗！！" },
  { id: "clue_09", title: "客厅-门口纸条", image: "./image%20in%20the%20game/article/客厅门口纸条.png", desc: "纸条上面写着：我发烧了，请不要打扰我。\n亲爱的快递员：包裹在桌上。费用在1号信封中，请自取。无需关门，通风。\n亲爱的取件员：取走桌上的黑色背包。费用在2号信封中，请自取。无需关门，通风。\n亲爱的外卖员：披萨放桌上。费用在3号信封中，请自取。无需关门，通风。" },
  { id: "clue_10", title: "客厅-快递箱", image: "./image%20in%20the%20game/article/客厅快递箱.png", desc: "这应该是快递员送来的包裹，有几处可能是运输时的碰撞导致的凹陷。箱子有一点重量\nzq警官:！！扳手！这大小……确实很像凶器！完全有可能造成死者头部的伤痕！\nzq警官:但是这也太干净了。不像是凶器……不过也有可能被凶手细致的清洗过了！\nwx警官:很有可能是取货员用这个扳手杀了人，清洗干净再藏到这个快递箱中，嫁祸给快递员！！\nzq警官:大胆假设，小心求证。你有证据吗？" },
  { id: "clue_11", title: "客厅-披萨盒", image: "./image%20in%20the%20game/article/客厅披萨盒.png", desc: "披萨和收据\nwx警官:这张单据是披萨外卖员留下的，上面有他的联系方式以及店铺的联系方式。价格和送到的披萨口味一致。\nzq警官:奇怪？？送货员和机车女的收据怎么不见了呢？" },
  { id: "clue_12", title: "搜身-快递员", image: "./image%20in%20the%20game/article/快递员搜身.png", desc: "快递员说自己有高血压，这是他随身备的降压药" },
  { id: "clue_13", title: "客厅-垃圾桶", image: "./image%20in%20the%20game/article/客厅的垃圾桶.png", desc: "很脏很乱的垃圾桶，像是很久没人打理了\nzq警官:这榔头男也太不讲卫生了，怎么会这么乱啊" },
  { id: "clue_14", title: "客厅-置物篮", image: "./image%20in%20the%20game/article/客厅的置物篮.png", desc: "一个置物篮，杂七杂八的东西都堆在一块\nwx警官:这都是些啥啊，好乱啊" },
  { id: "clue_15", title: "客厅-鞋柜", image: "./image%20in%20the%20game/article/客厅鞋柜.png", desc: "一个简陋的木质鞋柜，看起来有些年头了" },
  { id: "clue_16", title: "客厅-麻袋", image: "./image%20in%20the%20game/article/麻袋里：沾血的风衣.png", desc: "一个捆得很紧的麻袋，打开后，赫然可见里面有一件沾血的风衣，帽子和墨镜" },
  { id: "clue_17", title: "卧室-尸体", image: "./image%20in%20the%20game/article/big_dead.png", desc: "一个高大的男人仰面躺在地上一动不动。他穿着厚重的长袖外套，头上戴着一顶压得很低的帽子，仿佛随时准备出门。穿得异常整齐。在他的手边，倾倒着一个棕色的药瓶，几粒白色药片散落在枕边和地面上。\nwx&zq：（同时惊呼）“喂！？你怎么样？！\n(两人迅速冲上前去。zq警官检查颈动脉，wx警官则注意到了那个药瓶。zq警官：（收回手，面色沉重地摇了摇头）死了\nwx警官：（拿起药瓶看了一眼）“是安眠药！\n(两位警官都沉默了，目光从尸体移到散落的药片，再移到死者过于整齐的穿着上。现场看起来像是一场…)\nwx警官：（语气带着不确定的推测）难道…是畏罪自杀？他穿好衣服戴上帽子…是原本想逃跑，但发现逃不掉后，就选择了自我了断？但好像又不是…" },
  { id: "clue_18", title: "卧室-沙发", image: "./image%20in%20the%20game/article/我是沙发.png", desc: "zq警官:诶？这个沙发床怎么这么小巧啊，据说榔头男身高八尺有余，就睡在这个沙发上吗\nwx警官:那都是都市传说啦，实际上没人见过榔头男的真面目，那天的目击者喝醉了酒其实也没看清\nzq警官:哦？我想起来了，就像尼斯湖水怪是吧，大众根据想象具体化了凶手的形象\nwx警官:就是这样的，你看倒下的榔头男也不过170公分而已" },
  { id: "clue_19", title: "阳台-洗衣机", image: "./image%20in%20the%20game/article/洗衣机内景.png", desc: "一些没洗的衣服\n两件宽大的t恤\n一件黑色工装外套\n一条深蓝色工装裤。" },
  { id: "clue_20", title: "卫生间-浴缸", image: "./image%20in%20the%20game/article/浴缸.png", desc: "zq警官:这浴缸也是一点使用痕迹都没有啊\nwx警官:是的，这应该也是才打扫过不久的" },
  { id: "clue_21", title: "卫生间-置物台", image: "./image%20in%20the%20game/article/置物台.png", desc: "置物台上面有几盒牙膏，应该是囤货，用完了也不必出门采购。一把吹风机，感觉很旧了，用了很久。还有一个电动刮胡刀，和卫生间一样干净，没有藏污纳垢。\nwx警官:这置物台也这么整洁啊？！\nzq警官:这些牙膏啥的也像是刚囤的货" },
  { id: "clue_22", title: "阳台-置物篮", image: "./image%20in%20the%20game/article/阳台置物篮.png", desc: "你仔细查看了置物筐里的衣物\n里面放了一些外套和牛仔裤。" },
  { id: "clue_23", title: "阳台-木桶", image: "./image%20in%20the%20game/article/阳台木桶.png", desc: "洗衣房的一个木桶，但里面什么都没有。" },
  { id: "clue_24", title: "客厅-客厅全貌", image: "./image%20in%20the%20game/article/客厅.png", desc: "一张款式老旧的布艺沙发靠墙摆放。沙发套看起来有些日子没洗了，颜色暗淡。" }
];

// 等待 ClueManager 完成初始化后注入配置
(function applyClueConfig(){
  function tryApply(){
    if (window.clueManager && typeof window.clueManager.setConfig === 'function' && Array.isArray(window.CLUE_CONFIG)) {
      window.clueManager.setConfig(window.CLUE_CONFIG);
      return true;
    }
    return false;
  }
  if (!tryApply()) {
    const timer = setInterval(() => { if (tryApply()) clearInterval(timer); }, 200);
  }
})();