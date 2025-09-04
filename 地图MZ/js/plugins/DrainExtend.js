//=============================================================================
// DrainExtend.js
// ----------------------------------------------------------------------------
// (C)2017 Triacontane
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 2.0.0 2022/05/26 MZ向けに全面的に仕様変更
// 1.2.0 2020/04/29 計算式中でローカル変数[a][b]を使えるよう修正
// 1.1.0 2020/04/29 吸収HPの有効率を設定できる機能を追加
//                  各種メモ欄にJavaScript計算式を使用できる機能を追加
// 1.0.2 2017/02/07 端末依存の記述を削除
// 1.0.0 2017/01/17 初版
// ----------------------------------------------------------------------------
// [Blog]   : https://triacontane.blogspot.jp/
// [Twitter]: https://twitter.com/triacontane/
// [GitHub] : https://github.com/triacontane/
//=============================================================================

/*:
 * @plugindesc 吸収拡張プラグイン
 * @target MZ
 * @url https://github.com/triacontane/RPGMakerMV/tree/mz_master/DrainExtend.js
 * @base PluginCommonBase
 * @orderAfter PluginCommonBase
 * @author トリアコンタン
 *
 * @param drainList
 * @text 吸収設定のリスト
 * @desc 吸収設定の一覧です。
 * @default []
 * @type struct<Drain>[]
 *
 * @param recoverSe
 * @text 回復効果音
 * @desc 吸収成功時に回復効果音を演奏します。
 * @default false
 * @type boolean
 *
 * @help DrainExtend.js
 *
 * ダメージタイプの「HP吸収」および「MP吸収」の仕様を拡張します。
 * 1. 吸収率を指定して与えたダメージのN%回復などが可能
 * 2. HPダメージに対してMPやTPを回復することが可能
 * 3. MPダメージに対してHPやTPを回復することが可能
 * 4. 通常ダメージ時のメッセージと効果音に変更可能
 * 5. HP吸収の上限が相手の残HPになる吸収の仕様を撤廃可能
 *
 * スキルもしくはアイテムのダメージタイプを「HP吸収」もしくは「MP吸収」
 * にしてからメモ欄に以下の通り記述してください。
 * id : パラメータで指定した吸収仕様の識別子
 * <吸収拡張:id>
 * <DrainEx:id>
 *
 * パラメータの値は制御文字に加えてJavaScript計算式が使用できます。
 * さらに計算式中では以下の変数が使えます。
 * a : 攻撃者
 * b : 対象者
 *
 * 吸収攻撃を受ける側に有効度を設定できます。与えるダメージには影響しません。
 * 特徴を有するデータベースのメモ欄に以下の通り指定してください。
 * <吸収有効率:50>  # 吸収率が[50%]になります。
 * <DrainRate:50> # 同上
 *
 * このプラグインの利用にはベースプラグイン『PluginCommonBase.js』が必要です。
 * 『PluginCommonBase.js』は、RPGツクールMZのインストールフォルダ配下の
 * 以下のフォルダに格納されています。
 * dlc/BasicResources/plugins/official
 *
 * 利用規約：
 *  作者に無断で改変、再配布が可能で、利用形態（商用、18禁利用等）
 *  についても制限はありません。
 *  このプラグインはもうあなたのものです。
 */

/*~struct~Drain:
 *
 * @param id
 * @text 識別子
 * @desc メモ欄で指定する吸収設定の識別子です。他と重複しない値を指定してください。
 * @default drain01
 *
 * @param hpRate
 * @text HP吸収率
 * @desc 与えたダメージに対するHPの吸収率を設定します。
 * @default 0
 * @type number
 * @min -10000
 *
 * @param mpRate
 * @text MP吸収率
 * @desc 与えたダメージに対するMPの吸収率を設定します。
 * @default 0
 * @type number
 * @min -10000
 *
 * @param tpRate
 * @text TP吸収率
 * @desc 与えたダメージに対するTPの吸収率を設定します。
 * @default 0
 * @type number
 * @min -10000
 *
 * @param useAttackMessage
 * @text 攻撃メッセージ使用
 * @desc メッセージが(吸収用ではなく)通常攻撃のものに変更されます。
 * @default false
 * @type boolean
 *
 * @param limitOver
 * @text 上限突破
 * @desc 吸収値が相手の残HPを超えるようになります。
 * @default false
 * @type boolean
 *
 */

/*:zh-CN
 * @plugindesc 吸收技能拓展（HP/MP/TP）
 * @target MZ
 * @url https://github.com/triacontane/RPGMakerMV/tree/mz_master/DrainExtend.js
 * @base PluginCommonBase
 * @orderAfter PluginCommonBase
 * @author トリアコンタン（三十烷）
 *
 * @param drainList
 * @text 吸收设置列表
 * @desc 拓展吸收效果的设置列表
 * @default []
 * @type struct<Drain>[]
 *
 * @param recoverSe
 * @text 吸收音效
 * @desc 吸收成功时播放音效
 * @default false
 * @type boolean
 *
 * @help DrainExtend.js 吸收技能拓展插件
 *
 * 一、拓展修改吸收类技能伤害类型的效果：
 * 1. 吸收率指定为固定比例，如可以根据伤害的N%来恢复生命或魔法。
 * 2. 生命吸收时可以恢复MP和TP。
 * 3. 魔法吸收时可以恢复HP和TP。
 * 4. 可以修改为普通伤害信息和音效。
 * 5. 可以突破吸收上限不能超过目标剩余HP的限制。 
 * 
 * 二、将技能或物品的伤害类型设置为"生命吸收"或"魔法吸收"
 * 然后将以下命令输入到备注栏内。
 * <DrainEx:id>
 * ID指插件参数里面吸收效果列表内设置的ID。
 * 这个ID不一定是数字，可以是"drain01"之类的字母+数字组合。
 * 请注意区分大小写（以防万一）。
 *
 * 三、参数值除控制字符外，除了可以用控制字符，还可以用JS计算表达公式和以下变量。
 * a: 攻击者
 * b: 被攻击者
 * （翻译者注：这个我没弄明白，有弄明白的请分享告知~）
 *
 * 四、设置吸收成功的几率。但不会影响技能的伤害和命中率。
 * <DrainRate:50>
 * 可以设置0~100吧。 
 *
 * 五、本插件需要[PluginCommonBase.js]支持，
 * 请在插件列表中将本插件至于PluginCommonBase之下。
 * PluginCommonBase是官方插件，可以在以下途径找到：
 * RM目录/dlc/BasicResources/plugins/official
 *
 * 六、使用条款
 * 没有任何限制。
 * 作者不对使用该插件发生的任何后果负责。
 * 这个插件现在是你的了。
 */

/*~struct~Drain:zh-CN
 *
 * @param id
 * @text 吸收效果ID
 * @desc 吸收效果设置列表的ID（可以是数字或字母+数字，注意大小写）
 * @default drain01
 *
 * @param hpRate
 * @text HP吸收率
 * @desc 设置技能所造成伤害的生命吸收比率。
 * @default 0
 * @type number
 * @min -10000
 *
 * @param mpRate
 * @text MP吸收率
 * @desc 设置技能所造成伤害的魔法吸收比率。
 * @default 0
 * @type number
 * @min -10000
 *
 * @param tpRate
 * @text TP吸收率
 * @desc 设置技能所造成伤害的特技值吸收比率。
 * @default 0
 * @type number
 * @min -10000
 *
 * @param useAttackMessage
 * @text 使用攻击信息
 * @desc 将技能使用提示信息修改为普通攻击，而不是吸收。
 * @default false
 * @type boolean
 *
 * @param limitOver
 * @text 吸收上限突破
 * @desc 设置吸收时是否可以突破目标剩余血量作为上限。
 * @default false
 * @type boolean
 *
 */


(()=> {
    'use strict';
    const script = document.currentScript;
    const param = PluginManagerEx.createParameter(script);
    if (!param.drainList) {
        param.drainList = [];
    }

    //=============================================================================
    // Game_BattlerBase
    //  吸収の有効率を設定します。
    //=============================================================================
    Game_BattlerBase.prototype.getDrainEffectiveRate = function(subject) {
        let rate = null;
        const a = subject;
        const b = this;
        this.traitObjects().forEach(function(traitObj) {
            const meta = PluginManagerEx.findMetaValue(traitObj, ['DrainRate', '吸収有効率']);
            if (meta) {
                rate = Math.max(rate || 0, eval(meta) / 100);
            }
        });
        return rate !== null ?  rate : 1.0;
    };

    //=============================================================================
    // Game_Action
    //  吸収の仕様を拡張します。
    //=============================================================================
    const _Game_Action_isDrain = Game_Action.prototype.isDrain;
    Game_Action.prototype.isDrain = function() {
        if (this._temporaryDisableDrain) {
            this._temporaryDisableDrain = false;
            return false;
        }
        return _Game_Action_isDrain.apply(this, arguments);
    };

    Game_Action.prototype.findDrainParam = function() {
        const drainId = PluginManagerEx.findMetaValue(this.item(), ['DrainEx', '吸収拡張']);
        return param.drainList.find(item => item.id === drainId) || {};
    };

    Game_Action.prototype.isDrainExtend = function() {
        return !!this.findDrainParam().id;
    };

    Game_Action.prototype.getDrainRate = function(propName) {
        const rate = this.findDrainParam()[propName];
        if (rate === parseInt(rate)) {
            return rate / 100;
        } else {
            const a = this.subject();
            const b = this._drainTarget;
            return eval(rate) / 100;
        }
    };

    Game_Action.prototype.getDrainValue = function(propName, value, effectiveRate) {
        return Math.floor(value * this.getDrainRate(propName) * effectiveRate);
    };

    Game_Action.prototype.isDrainMessageAttack = function() {
        return this.findDrainParam().useAttackMessage;
    };

    Game_Action.prototype.isDrainLimitOver = function() {
        return this.findDrainParam().limitOver;
    };

    const _Game_Action_apply = Game_Action.prototype.apply;
    Game_Action.prototype.apply = function(target) {
        if (this.isDrainMessageAttack()) {
            this._temporaryDisableDrain = true;
        }
        this._drainTarget = target;
        return _Game_Action_apply.apply(this, arguments);
    };

    const _Game_Action_executeHpDamage = Game_Action.prototype.executeHpDamage;
    Game_Action.prototype.executeHpDamage = function(target, value) {
        if (this.isDrainLimitOver()) {
            this._temporaryDisableDrain = true;
        }
        _Game_Action_executeHpDamage.apply(this, arguments);
    };

    const _Game_Action_gainDrainedHp = Game_Action.prototype.gainDrainedHp;
    Game_Action.prototype.gainDrainedHp = function(value) {
        if (this.isDrainExtend()) {
            this.gainDrainedParam(value);
        } else {
            _Game_Action_gainDrainedHp.apply(this, arguments);
        }
    };

    const _Game_Action_gainDrainedMp = Game_Action.prototype.gainDrainedMp;
    Game_Action.prototype.gainDrainedMp = function(value) {
        if (this.isDrainExtend()) {
            this.gainDrainedParam(value);
        } else {
            _Game_Action_gainDrainedMp.apply(this, arguments);
        }
    };

    Game_Action.prototype.gainDrainedParam = function(value) {
        const effectiveRate = this._drainTarget.getDrainEffectiveRate(this.subject());
        const hpValue = this.getDrainValue('hpRate', value, effectiveRate);
        if (hpValue !== 0) {
            _Game_Action_gainDrainedHp.call(this, hpValue);
        }
        const mpValue = this.getDrainValue('mpRate', value, effectiveRate);
        if (mpValue !== 0) {
            _Game_Action_gainDrainedMp.call(this, mpValue);
        }
        const tpValue = this.getDrainValue('tpRate', value, effectiveRate);
        if (tpValue !== 0) {
            this.gainDrainedTp(tpValue);
        }
    };

    Game_Action.prototype.gainDrainedTp = function(value) {
        if (this.isDrain()) {
            let gainTarget = this.subject();
            if (this._reflectionTarget !== undefined) {
                gainTarget = this._reflectionTarget;
            }
            gainTarget.gainTp(value);
        }
    };

    //=============================================================================
    // Window_BattleLog
    //  吸収時に回復効果音を演奏します。
    //=============================================================================
    const _Window_BattleLog_displayDamage = Window_BattleLog.prototype.displayDamage;
    Window_BattleLog.prototype.displayDamage = function(target) {
        _Window_BattleLog_displayDamage.apply(this, arguments);
        if (this.isNeedDrainRecoverSe(target.result())) {
            this.push('performRecovery', target);
        }
    };

    Window_BattleLog.prototype.isNeedDrainRecoverSe = function(result) {
        return param.recoverSe && !result.missed && !result.evaded && result.drain;
    };
})();