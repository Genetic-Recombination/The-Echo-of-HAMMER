//=============================================================================
// AutoRaise.js
// ----------------------------------------------------------------------------
// (C)2017 Triacontane
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.4.0 2022/03/10 自動蘇生時にコスト消費できる機能を追加
// 1.3.0 2022/02/15 自動蘇生の発動確率を設定できる機能を追加
// 1.2.0 2021/11/23 MZで動作するよう修正
// 1.1.1 2020/02/12 蘇生時のHP割合をステートに記述している場合に値が取得できない問題を修正
// 1.1.0 2020/02/11 蘇生が発動したとき発動アイテムをロストする機能を追加
//                  戦闘中にスキルなどで一時的に自動蘇生を付与できる機能を追加
// 1.0.0 2017/04/02 初版
// ----------------------------------------------------------------------------
// [Blog]   : https://triacontane.blogspot.jp/
// [Twitter]: https://twitter.com/triacontane/
// [GitHub] : https://github.com/triacontane/
//=============================================================================

/*:
 * @plugindesc 自動蘇生プラグイン
 * @target MZ
 * @url https://github.com/triacontane/RPGMakerMV/tree/mz_master/AutoRaise.js
 * @base PluginCommonBase
 * @orderAfter PluginCommonBase
 * @author トリアコンタン
 *
 * @param raiseAnimationId
 * @text 蘇生アニメID
 * @desc 自動蘇生時に表示されるアニメーションのID
 * @default 4
 * @type animation
 *
 * @param raiseIconId
 * @text 蘇生アイコンインデックス
 * @desc 自動蘇生が可能な場合に表示されるアイコンのインデックス
 * @default 84
 *
 * @help AutoRaise.js
 *
 * 戦闘時に、決められた回数分だけ自動蘇生できます。
 * 回数の決定は戦闘開始直後に1回だけ行われます。戦闘中は再計算されません。
 * 特徴を有するメモ欄のプラグインに以下の通り入力してください。
 *
 * <自動蘇生:3>      # 戦闘不能時に3回まで自動蘇生します。
 * <AutoRaise:3>     # 同上
 * <蘇生HPレート:50> # 自動蘇生時にHPが50%まで回復します。
 * <RaiseHpRate:50>  # 同上
 * <蘇生ロスト>      # 自動蘇生が発動したとき対象の装備品を失います。
 * <RaiseLost>       # 同上
 * <蘇生確率:50>     # 蘇生の発動率が50%になります。
 * <RaiseProb:50>    # 同上
 *
 * 指定すると蘇生時にコストを消費します。足りなければ蘇生できません。
 * <蘇生MPコスト:10> # 自動蘇生時にMPを10消費します。
 * <RaiseMpCost:10> # 同上
 * <蘇生TPコスト:10> # 自動蘇生時にTPを10消費します。
 * <RaiseTpCost:10> # 同上
 *
 * スキルなどを使って戦闘中に付与したい場合はステートに
 * 以下のメモ欄を設定してください。
 * <一時自動蘇生>    # 戦闘不能時に自動蘇生します。
 * <TempAutoRaise>  # 同上
 *
 * このプラグインにはプラグインコマンドはありません。
 *
 * 利用規約：
 *  作者に無断で改変、再配布が可能で、利用形態（商用、18禁利用等）
 *  についても制限はありません。
 *  このプラグインはもうあなたのものです。
 */

/*:zh-CN
 * @plugindesc 自动复活插件
 * @target MZ
 * @url https://github.com/triacontane/RPGMakerMV/tree/mz_master/AutoRaise.js
 * @base PluginCommonBase
 * @orderAfter PluginCommonBase
 * @author トリアコンタン（三十烷）
 *
 * @param raiseAnimationId
 * @text 复活动画ID
 * @desc 自动复活时播放的动画ID
 * @default 4
 * @type animation
 *
 * @param raiseIconId
 * @text 复活图标ID
 * @desc 自动复活时显示的图标ID
 * @default 84
 *
 * @help AutoRaise.js 自动复活插件
 * 战斗中可以进行一定次数的自动复活。
 * 插件参数可以设置能够自动复活时的状态图标，和复活动画。
 *
 * 【使用方法】
 * 1、如果一个装备或状态的复活次数设置1次以上，
 *    实际可复活的次数会-1。如设置3次实际为2次，以此类推。
 *    战斗中不会重复计算。
 * 2、不同装备、状态之间的复活次数可以叠加。但消耗顺序未知。
 * 3、在武器或防具的备注栏内输入以下命令，
 *    并需要佩戴该装备在角色身上才能生效。
 * <AutoRaise:3>    #无法战斗时，可以有2次机会自动复活。
 * <RaiseLost>      #自动复活时，丢失目标装备。
 * <RaiseProb:50>   #自动复活的几率为50%。（可自行设置数值）
 * <RaiseHpRate:50> #自动复活时，恢复50%HP。（可自行设置数值）
 * <RaiseMpCost:10> #自动复活时，消耗10点MP。（可自行设置数值。但如果不满足消耗条件，自动复活会失败）
 * <RaiseTpCost:10> #自动复活时，消耗10点TP。（可自行设置数值。但如果不满足消耗条件，自动复活会失败）
 *
 * 4、如果想通过技能施加状态来达到自动复活时，
 *    在状态的备注栏输入以下命令：
 * <TempAutoRaise>  #自动复活后，该状态解除。
 * 然后加设上述的其他复活次数、几率、血量或消耗均可。
 *
 * 【汉化测试者注】
 * 1、本来插件参数可以设置佩戴了复活装备时会有一个状态图标（战斗中才看到）。
 * 2、而如果是通过技能施加自动复活状态，
 *    角色头顶就会有2个自动复活的图标，不知道是不是BUG。
 *    但其实是同一个东西。
 * 3、如果又佩戴了装备、又施加自动复活的技能状态，可能就会有更多图标吧...笑
 * 4、插件原文描述是：在有特性的备注栏输入命令就可以自动复活。
 *    但测试中设置在物品备注栏是不会生效的，可能是指使用物品后才获得效果？请自行测试。
 *
 * 本插件没有插件命令。
 *
 * 【使用条款】
 * 没有任何限制。
 * 作者不对使用该插件发生的任何后果负责。
 * 这个插件现在是你的了。
 */


(()=> {
    'use strict';
    const script = document.currentScript;
    const param = PluginManagerEx.createParameter(script);

    //=============================================================================
    // BattleManager
    //  戦闘不能時に自動復活します。
    //=============================================================================
    const _BattleManager_setup = BattleManager.setup;
    BattleManager.setup      = function(troopId, canEscape, canLose) {
        _BattleManager_setup.apply(this, arguments);
        const members = $gameParty.allMembers().concat($gameTroop.members());
        members.forEach(member => member.initAutoRaiseCount());
    };

    //=============================================================================
    // Game_BattlerBase
    //  戦闘不能時に自動復活します。
    //=============================================================================
    const _Game_BattlerBase_allIcons      = Game_BattlerBase.prototype.allIcons;
    Game_BattlerBase.prototype.allIcons = function() {
        return _Game_BattlerBase_allIcons.apply(this, arguments).concat(this.getAutoRaiseIcon());
    };

    Game_BattlerBase.prototype.getAutoRaiseIcon = function() {
        return (this.canRaise() && param.raiseIconId > 0) ? [param.raiseIconId] : [];
    };

    Game_BattlerBase.prototype.initAutoRaiseCount = function() {
        this._autoRaiseCount = this.getAutoRaiseCount();
    };

    Game_BattlerBase.prototype.getAutoRaiseCount = function() {
        let raiseCount = 0;
        this.traitObjects().forEach(state => {
            const metaValue = PluginManagerEx.findMetaValue(state, ['自動蘇生', 'AutoRaise']);
            if (metaValue) {
                raiseCount += (metaValue === true ? 1 : metaValue);
            }
        });
        return raiseCount;
    };

    Game_BattlerBase.prototype.getRaiseHpRate = function() {
        if (!this.canRaise() || !this.isValidRaiseProbability()) {
            return 0;
        }
        let hpRate = 1;
        this.traitObjects().forEach(state => {
            const metaValue = PluginManagerEx.findMetaValue(state, ['蘇生HPレート', 'RaiseHpRate']);
            if (metaValue) {
                const newRate = (metaValue === true ? 1 : metaValue);
                hpRate = Math.max(hpRate, newRate);
            }
        });
        return hpRate;
    };

    Game_BattlerBase.prototype.isValidRaiseProbability = function() {
        let probability = 0;
        this.traitObjects().forEach(state => {
            const metaValue = PluginManagerEx.findMetaValue(state, ['蘇生確率', 'RaiseProb']);
            if (metaValue) {
                probability = Math.max(probability, metaValue / 100);
            }
        });
        return !probability || Math.random() < probability;
    };

    Game_BattlerBase.prototype.canRaise = function() {
        return (this.hasTempRaise() || this._autoRaiseCount > 0) && $gameParty.inBattle()
    };

    Game_BattlerBase.prototype.hasTempRaise = function() {
        return this.traitObjects().some(obj => {
            return PluginManagerEx.findMetaValue(obj, ['一時自動蘇生', 'TempAutoRaise']) !== undefined;
        });
    };

    Game_BattlerBase.prototype.executeAutoRaise = function(rate) {
        BattleManager.processAutoRaise(this);
        this.revive();
        const hp = Math.max(Math.floor(this.mhp * rate / 100), 1);
        this.setHp(hp);
    };

    const _Game_BattlerBase_die      = Game_BattlerBase.prototype.die;
    Game_BattlerBase.prototype.die = function() {
        const rate = this.getRaiseHpRate();
        const costResult = rate > 0 && this.payCostAutoRaise();
        if (costResult && !this.hasTempRaise()) {
            this._autoRaiseCount--;
            this.lostRaiseEquips();
        }
        _Game_BattlerBase_die.apply(this, arguments);
        if (costResult) {
            this.executeAutoRaise(rate);
        }
    };

    Game_BattlerBase.prototype.payCostAutoRaise = function() {
        const mpCost = this.traitObjects().reduce((prev, obj) => {
            return prev + (PluginManagerEx.findMetaValue(obj, ['蘇生MPコスト', 'RaiseMpCost']) || 0);
        }, 0);
        if (mpCost > 0) {
            if (this.mp >= mpCost) {
                this._mp -= mpCost;
            } else {
                return false;
            }
        }
        const tpCost = this.traitObjects().reduce((prev, obj) => {
            return prev + (PluginManagerEx.findMetaValue(obj, ['蘇生TPコスト', 'RaiseTpCost']) || 0);
        }, 0);
        if (tpCost > 0) {
            if (this.tp >= tpCost) {
                this._tp -= tpCost;
            } else {
                return false;
            }
        }
        return true;
    };

    Game_BattlerBase.prototype.lostRaiseEquips = function() { };

    Game_Actor.prototype.lostRaiseEquips = function() {
        this.equips().some((equip, slotId) => {
            if (equip && PluginManagerEx.findMetaValue(equip, ['蘇生ロスト', 'RaiseLost']) !== undefined) {
                this.changeEquip(slotId, null);
                $gameParty.loseItem(equip, 1, false);
            }
        });
    };

    BattleManager.processAutoRaise = function(target) {
        if (param.raiseAnimationId > 0) {
            this._logWindow.push('showNormalAnimation', [target], param.raiseAnimationId);
        }
    };
})();
