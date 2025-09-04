//=============================================================================
// CustomizeCritical.js
// ----------------------------------------------------------------------------
// (C)2020 Triacontane
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.4.1 2022/01/30 スキルのダメージの会心を「あり」に設定したあとで、ダメージタイプを「なし」に変更した場合、会心判定されてしまう問題を修正
// 1.4.0 2022/01/26 専用のクリティカルメッセージが表示されたとき、デフォルトのクリティカルメッセージを抑制する機能を追加
// 1.3.1 2021/08/22 1.3.0の修正により会心でないときにも効果音が演奏されてしまう不具合を修正
// 1.3.0 2021/08/21 パラメータから共通の計算式、効果音、演出アニメーション、メッセージを指定できる機能を追加
// 1.2.0 2021/08/20 MZ向けに修正
// 1.1.4 2020/07/11 複数ヒットする攻撃の会心判定が、ヒットごとに行われていなかった問題を修正
// 1.1.3 2017/09/01 様子を見る等の一部の行動を敵キャラが実行するとエラーになる問題を修正（byツミオさま）
// 1.1.2 2017/07/09 ヘルプのメモ欄「<CC計算式:JavaScript計算式>」の記述例が誤っていたので修正
// 1.1.1 2017/05/31 1.1.0の修正でメニュー画面でスキルを使用するとエラーになる不具合を修正
// 1.1.0 2017/05/27 連続ヒットする攻撃の2ヒット目以降のダメージが正常に表示されない問題を修正。YEP_BattleEngineCore.jsとの競合を解消
// 1.0.0 2016/05/05 初版
// ----------------------------------------------------------------------------
// [Blog]   : https://triacontane.blogspot.jp/
// [Twitter]: https://twitter.com/triacontane/
// [GitHub] : https://github.com/triacontane/
//=============================================================================

/*:zh-CN
 * @plugindesc 三十烷-暴击拓展插件
 * @target MZ
 * @url https://github.com/triacontane/RPGMakerMV/tree/mz_master/CustomizeCritical.js
 * @base PluginCommonBase
 * @orderAfter PluginCommonBase
 * @author トリアコンタン
 *
 * @param commonFormula
 * @text 暴击计算公式
 * @desc 暴击发生时的通用伤害计算公式。但会优先执行备注栏的设置。
 * @default
 * @type multiline_string
 *
 * @param commonMessage
 * @text 暴击显示信息
 * @desc 暴击发生时的通用提示信息。但会优先执行备注栏的设置。
 * @default
 *
 * @param commonAnimation
 * @text 暴击发动动画
 * @desc 暴击时攻击者身上的显示动画。但会优先执行备注栏的设置。
 * @default 0
 * @type animation
 *
 * @param commonSe
 * @text 暴击音效
 * @desc 暴击时的通用播放音效。但会优先执行备注栏的设置。
 * @default
 * @type struct<SE>
 *
 * @param suppressDefault
 * @text 关闭默认提示信息
 * @desc False-显示设置的暴击信息，关闭默认的暴击信息提示。
 * @default false
 * @type boolean
 *
 * @help 自定义暴击的伤害和动画等
 *
 * 请在技能的备注栏输入命令:
 * (为方便理解和使用，我将备注命令也进行了汉化。但如果有异常请使用//后面的日文原命令。)
 *
 * <CC暴击伤害:XXX> 暴击造成的伤害，XXX可以使用数值、变量或自定义公式如a.atk * 4。 // <CC計算式：XXX>
 * <CC暴击率设定:XX> 直接指定这个技能的暴击率，忽略攻击者自身暴击率。 // <CC確率変更:XX>
 * <CC暴击率加成:XX> 在攻击者自身暴击率基础上获得一个加成数值。 // <CC確率加算:XX>
 * <CC暴击动画:XX> 被暴击的目标身上播放一个动画，XX=动画ID。 // <CCアニメ:XX>
 *
 * 注：设置了暴击伤害，就会忽视系统默认的3倍暴击伤害。
 * 
 * ----------------------------------------------------------------------------------
 * 下述命令还没搞清楚用法，请自行测试，我稍后也会更新：
 * 是在角色、职业、敌人、武器、防具、状态的备注栏输入的命令。
 * ----------------------------------------------------------------------------------
 * 会心発生時の演出を追加します。アクター、職業、敵キャラ、武器、防具、ステート
 * いずれかのメモ欄に以下の通り記述してください。
 * ただし、フロントビューの場合、敵キャラのアニメーションは表示されません。
 *
 * ・演出用の戦闘アニメを実行前に表示します。
 * <CC演出:戦闘アニメID>
 *
 * ・演出用の専用メッセージを実行前に表示します。
 * <CCメッセージ:メッセージ内容>
 *
 * ※ 敵全体あるいは複数回攻撃するスキルの場合、1回でも会心判定になった場合
 * 会心用の演出となります。
 * ---------------------------------------------------------------------------------- *
 * 本插件需要PluginCommonBase.js的支持，
 * 请将本插件放在PluginCommonBase的下面。
 * 你可以在下列路径找到PluginCommonBase.js:
 * dlc/BasicResources/plugins/official
 *
 * 使用条款：
 * 无任何使用限制
 * 作者不对使用后果负责
 * 这个插件现在是你的了
 */

/*~struct~SE:zh-CN
 *
 * @param name
 * @text SE音效
 * @desc 选择一个暴击时的SE音效
 * @require 1
 * @dir audio/se/
 * @type file
 * @default
 *
 * @param volume
 * @text SE音量
 * @desc 设置SE的音量
 * @type number
 * @default 90
 * @min 0
 * @max 100
 *
 * @param pitch
 * @text SE音调
 * @desc 设置SE的音调
 * @type number
 * @default 100
 * @min 50
 * @max 150
 *
 * @param pan
 * @text SE音频
 * @desc 设置SE的音频
 * @type number
 * @default 0
 * @min -100
 * @max 100
 */


/*:
 * @plugindesc 会心カスタマイズプラグイン
 * @target MZ
 * @url https://github.com/triacontane/RPGMakerMV/tree/mz_master/CustomizeCritical.js
 * @base PluginCommonBase
 * @orderAfter PluginCommonBase
 * @author トリアコンタン
 *
 * @param commonFormula
 * @text 共通計算式
 * @desc 会心が発生したときの共通計算式です。メモ欄の指定があればそちらが優先されます。
 * @default
 * @type multiline_string
 *
 * @param commonMessage
 * @text 共通メッセージ
 * @desc 会心が発生したときの共通メッセージです。メモ欄の指定があればそちらが優先されます。
 * @default
 *
 * @param commonAnimation
 * @text 共通演出
 * @desc 会心が発生したときの共通演出アニメーションです。メモ欄の指定があればそちらが優先されます。
 * @default 0
 * @type animation
 *
 * @param commonSe
 * @text 共通効果音
 * @desc 会心が発生したときの演奏する効果音です。
 * @default
 * @type struct<SE>
 *
 * @param suppressDefault
 * @text デフォルトメッセージ抑制
 * @desc 専用のクリティカルメッセージが表示されたとき、デフォルトのクリティカルメッセージを抑制します。
 * @default false
 * @type boolean
 *
 * @help 会心（クリティカルヒット）の確率とダメージ、演出をカスタマイズします。
 *
 * スキルのメモ欄に以下の通り記述してください。
 *
 * ・会心に専用計算式を適用します。書式はダメージ計算式と同様です。
 * 　計算式を適用した場合、デフォルトのダメージ3倍は無効になります。
 * 　ローカル変数「normalDamage」から元のダメージ値を参照できます。
 * <CC計算式:JavaScript計算式>
 * 例：<CC計算式:a.atk * 4> //攻撃力の4倍で相手の防御は無視
 *
 * ・会心の確率を加算します。元の確率に計算結果が加算されます。(百分率)
 * <CC確率加算:加算値>
 * 例：<CC確率加算:50> //元の確率+50%で発生
 *
 * ・会心の確率を変更します。元の確率は無視されます。(百分率)
 * <CC確率変更:変更値>
 * 例：<CC確率変更:\v[1]> //変数[1]の値の確率で発生
 *
 * ・会心発生時の専用の戦闘アニメを適用します。
 * <CCアニメ:戦闘アニメID>
 *
 * 会心発生時の演出を追加します。アクター、職業、敵キャラ、武器、防具、ステート
 * いずれかのメモ欄に以下の通り記述してください。
 * ただし、フロントビューの場合、敵キャラのアニメーションは表示されません。
 *
 * ・演出用の戦闘アニメを実行前に表示します。
 * <CC演出:戦闘アニメID>
 *
 * ・演出用の専用メッセージを実行前に表示します。
 * <CCメッセージ:メッセージ内容>
 *
 * ※ 敵全体あるいは複数回攻撃するスキルの場合、1回でも会心判定になった場合
 * 会心用の演出となります。
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

/*~struct~SE:
 *
 * @param name
 * @text SEファイル名
 * @desc SEのファイル名です。
 * @require 1
 * @dir audio/se/
 * @type file
 * @default
 *
 * @param volume
 * @text SEボリューム
 * @desc SEのボリュームです。
 * @type number
 * @default 90
 * @min 0
 * @max 100
 *
 * @param pitch
 * @text SEピッチ
 * @desc SEのピッチです。
 * @type number
 * @default 100
 * @min 50
 * @max 150
 *
 * @param pan
 * @text SEバランス
 * @desc SEの左右バランスです。
 * @type number
 * @default 0
 * @min -100
 * @max 100
 */

(()=> {
    'use strict';
    const script = document.currentScript;
    const param = PluginManagerEx.createParameter(script);

    //=============================================================================
    // Game_Action
    //  会心をカスタマイズします。
    //=============================================================================
    const _Game_Action_evalDamageFormula      = Game_Action.prototype.evalDamageFormula;
    Game_Action.prototype.evalDamageFormula = function(target) {
        const formula = this.findCriticalFormula();
        const normalDamage = _Game_Action_evalDamageFormula.apply(this, arguments);
        if (formula && target.result().critical) {
            try {
                const a     = this.subject();
                const b     = target;
                const v     = $gameVariables._data;
                const sign  = ([3, 4].contains(this.item().damage.type) ? -1 : 1);
                const value = Math.max(eval(formula), 0) * sign;
                return isNaN(value) ? 0 : value;
            } catch (e) {
                return 0;
            }
        } else {
            return normalDamage;
        }
    };

    Game_Action.prototype.findCriticalFormula = function() {
        return PluginManagerEx.findMetaValue(this.item(), ['CC計算式', 'CCFormula', 'CC暴击伤害']) || param.commonFormula; //增加备注命令
    };

    const _Game_Action_itemCri            = Game_Action.prototype.itemCri;
    Game_Action.prototype.itemCri = function(target) {
        const queue = this._criticalQueue;
        if (queue && queue.length > 0) {
            return queue.shift() ? 1.0 : 0.0;
        } else {
            return _Game_Action_itemCri.apply(this, arguments);
        }
    };

    Game_Action.prototype.judgeCritical = function(target) {
        const changeValue = PluginManagerEx.findMetaValue(this.item(), ['CC確率変更', 'CCProbChange', 'CC暴击率设定']); //增加备注命令
        let itemCritical;
        if (changeValue) {
            itemCritical = changeValue / 100;
        } else {
            if (this.item().damage.type === 0) {
                return;
            }
            const addValue = PluginManagerEx.findMetaValue(this.item(), ['CC確率加算', 'CCProbAdd', 'CC暴击率加成']); //增加备注命令
            itemCritical = _Game_Action_itemCri.apply(this, arguments) + (addValue ? addValue / 100 : 0);
        }
        this._criticalQueue.push(Math.random() < itemCritical);
    };

    Game_Action.prototype.initCriticalQueue = function() {
        this._criticalQueue = [];
    };

    Game_Action.prototype.isCritical = function() {
        if (!this._criticalQueue) {
            return false;
        }
        return this._criticalQueue.some(function(critical) {
            return critical;
        })
    };

    const _Game_Action_applyCritical      = Game_Action.prototype.applyCritical;
    Game_Action.prototype.applyCritical = function(damage) {
        const formula = this.findCriticalFormula();
        return formula ? damage : _Game_Action_applyCritical.apply(this, arguments);
    };

    //=============================================================================
    // Game_Battler
    //  データオブジェクトを取得します。
    //=============================================================================
    Game_Battler.prototype.findCriticalEffect = function(tags) {
        let result = null;
        this.traitObjects().some(obj => {
            result = PluginManagerEx.findMetaValue(obj, tags);
            return result !== null;
        });
        return result;
    };

    //=============================================================================
    // BattleManager
    //  会心判定を事前に行います。
    //=============================================================================
    BattleManager.judgeCritical = function(action, targets) {
        action.initCriticalQueue();
        targets.forEach(function(target) {
            action.judgeCritical(target);
        });
    };

    //=============================================================================
    // Window_BattleLog
    //  会心の演出を追加定義します。
    //=============================================================================
    const _Window_BattleLog_startAction      = Window_BattleLog.prototype.startAction;
    Window_BattleLog.prototype.startAction = function(subject, action, targets) {
        this._noCritialAnimationId = 0;
        this._currentAction = action;
        BattleManager.judgeCritical(action, targets);
        if (action.isCritical()) {
            this.showCriticalEffect(subject);
            const animationId = PluginManagerEx.findMetaValue(action.item(), ['CCアニメ', 'CCAnimation', 'CC暴击动画']); //增加备注命令
            if (animationId) {
                this._noCritialAnimationId = action.item().animationId;
                action.item().animationId  = animationId;
            }
        }
        _Window_BattleLog_startAction.apply(this, arguments);
    };

    const _Window_BattleLog_endAction      = Window_BattleLog.prototype.endAction;
    Window_BattleLog.prototype.endAction = function(subject) {
        _Window_BattleLog_endAction.apply(this, arguments);
        if (this._noCritialAnimationId) {
            this._currentAction.item().animationId = this._noCritialAnimationId;
            this._noCritialAnimationId = 0;
        }
        this._currentAction = null;
    };

    const _Window_BattleLog_displayCritical = Window_BattleLog.prototype.displayCritical;
    Window_BattleLog.prototype.displayCritical = function(target) {
        if (target.result().critical && param.commonSe　&& param.commonSe.name) {
            AudioManager.playSe(param.commonSe);
        }
        if (this._suppressCritialMessage) {
            this._suppressCritialMessage = false;
            return;
        }
        _Window_BattleLog_displayCritical.apply(this, arguments);
    };

    Window_BattleLog.prototype.showCriticalEffect = function(subject) {
        const message = subject.findCriticalEffect(['CCメッセージ', 'CCMessage']) || param.commonMessage; //效果不明？
        if (message) {
            if (param.suppressDefault) {
                this._suppressCritialMessage = true;
            }
            this.push('addText', message);
        }
        const animationId = subject.findCriticalEffect(['CC演出', 'CCエフェクト']) || param.commonAnimation; //效果不明？
        if (animationId > 0 && $dataAnimations[animationId]) {
            this.push('showNormalAnimation', [subject], animationId);
            this.push('waitForAnimation');
        }
    };

    const _Window_BattleLog_updateWaitMode      = Window_BattleLog.prototype.updateWaitMode;
    Window_BattleLog.prototype.updateWaitMode = function() {
        let waiting = false;
        if (this._waitMode === 'animation') {
            waiting = this._spriteset.isAnimationPlaying();
        }
        if (!waiting) {
            waiting = _Window_BattleLog_updateWaitMode.apply(this, arguments);
        }
        return waiting;
    };

    Window_BattleLog.prototype.waitForAnimation = function() {
        this.setWaitMode('animation');
    };
})();
