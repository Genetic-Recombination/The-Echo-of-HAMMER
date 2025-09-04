/*:-----------------------------------------------------------------------------------
 * NUUN_StoppingFeature.js
 * 
 * Copyright (C) 2021 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */ 
 
/*:
 * @target MZ
 * @plugindesc 踏み止まり特徴
 * @author NUUN
 * @version 1.1.1
 * 
 * @help
 * 戦闘中のダメージで0になったときに、戦闘不能にならずHPが１で止まる特徴を設定できます。
 * 条件付きベースプラグインと併用することで、特定の条件で踏み止まる特徴を設定できます。
 * 
 * 特徴を有するメモ欄
 * <Stopping:[rate], [ratio], [condMode]>
 * [rate]：発動確立
 * [ratio]：発動するダメージ前のHPの割合。残りHPが指定したHPの割合以上なら発動します。
 * [condMode]：条件付きベースプラグインでの条件指定時のモード　※省略可能
 * <Stopping:100, 30> HPが３０％以上で戦闘不能になったとき１００％の確率でダメージが１で踏み止まります。
 * <Stopping:50, 0> 50%の確立で戦闘不能になったときにHPが１で踏み止まります。
 * [condMode]は条件付きベースプラグインを導入してない場合は省略してください。
 * 
 * 以下のタグは条件付きベースプラグインが必要です。
 * <StoppingCond:[id], [id], [id]...> 攻撃したバトラーが指定したIDの条件を満たしたときに発動。
 * <TargetStoppingCond:[id], [id], [id]...> 撃破されたバトラーが指定したIDの条件を満たしたときに発動。
 * <PartyStoppingCond:[id], [id], [id]...> パーティメンバーが指定したIDの条件を満たしたときに発動。
 * <TroopStoppingCond:[id], [id], [id]...> 敵グループのメンバーが指定したIDの条件を満たしたときに発動。
 * 
 * <StoppingEraseState:[stateId]> 踏み止まり成功時に指定のステートを解除します。
 * [stateId]:ステートID
 * 
 * スキル、アイテムのメモ欄
 * <InvalidStopping:[rate]> このタグがあるスキル、アイテムは踏み止まりを無効化します。
 * [rate]：無効にする確立
 * <InvalidStopping:50> 撃破時50％の確率で踏み止まりを無効化します。
 * 
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2023/6/22 Ver.1.1.1
 * 処理の修正。
 * 2023/6/21 Ver.1.1.0
 * 踏み止まった時に指定のステートを解除する機能を追加。
 * 2021/11/18 Ver.1.0.0
 * 初版
 * 
 * @param StoppingMessage
 * @text 踏み止まり時メッセージ
 * @desc 踏み止まり時のメッセージ。%1使用者　%2対象
 * @default 
 * @type string
 * 
 * @param StoppingSESetting
 * @text 踏み止まり時SE設定
 * @default ------------------------------
 * 
 * @param StoppingSE
 * @text 踏み止まり時SE
 * @desc 踏み止まり時のSE
 * @type file
 * @dir audio/se/
 * @parent StoppingSESetting
 * 
 * @param volume
 * @text 音量
 * @desc 音量。
 * @type number
 * @default 90
 * @parent StoppingSESetting
 * 
 * @param pitch
 * @text ピッチ
 * @desc ピッチ。
 * @type number
 * @default 100
 * @parent StoppingSESetting
 * 
 * @param pan
 * @text 位相
 * @desc 位相。
 * @type number
 * @default 50
 * @parent StoppingSESetting
 * 
 */

 
/*:zh-CN
 * @target MZ
 * @plugindesc 防秒杀插件
 * @author NUUN
 * @version 1.1.1
 * 
 * @help
 * 当角色/敌人在战斗中符合一定条件时不会被秒杀且保留1点HP。
 * 
 * 在有特性的设置备注栏内输入以下指令：
 * 1、<Stopping:[rate], [ratio], [condMode]>
 * [rate]：发动几率
 * [ratio]：HP比例多少以上时发动。如50%则输入50。
 * [condMode]：发动条件拓展，需要使用NUUN_Base和NUUN_ConditionsBase插件。
 * 没有使用则请忽略该项。（见下文） 
 * 【举个例子】
 * <Stopping:100, 30> 当角色HP在30%以上时遭到秒杀，HP会保留1点。
 * <Stopping:50, 0> 当被秒杀时，有50%几率HP会保留1点。
 *
 * 2、<StoppingEraseState:[stateId]> 防秒杀触发后，解除指定状态。
 * [stateId]:状态ID
 * 
 * 3、在技能或物品的备注栏输入以下指令：
 * <InvalidStopping:[rate]> 有几率使防秒杀机制失效。
 * [rate]：几率值
 * 【举个例子】
 * <InvalidStopping:50> 被秒杀时有50%几率不触发防秒杀机制。
 *
 *
 * 
 * 以下的发动条件拓展，需要使用NUUN_Base和NUUN_ConditionsBase插件。没有使用则请忽略。
 * <StoppingCond:[id], [id], [id]...> 当攻击方符合对应发动条件的ID时会触发。
 * <TargetStoppingCond:[id], [id], [id]...> 当被攻击方符合对应发动条件的ID时会触发。
 * <PartyStoppingCond:[id], [id], [id]...> 当角色成员符合对应发动条件的ID时会触发。
 * <TroopStoppingCond:[id], [id], [id]...> 当地方成员符合对应发动条件的ID时会触发。
 * 
 * 使用条款
 * 请遵守MIT条约
 *
 * 配套插件的链接：（没汉化）
 * 【NUUN_Base】NUUM 核心插件
 * https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_Base.js
 * 【NUUN_ConditionsBase】NUUN条件基础（发动条件拓展）
 * https://raw.githubusercontent.com/nuun888/mz/master/NUUN_ConditionsBase.js
 * 
 * 更新历史
 * 2023/6/22 Ver.1.1.1
 * 修复一些BUG。
 * 2023/6/21 Ver.1.1.0
 * 添加了防秒杀时取消指定状态的功能
 * 2021/11/18 Ver.1.0.0
 * 初版
 * 
 * @param StoppingMessage
 * @text 被秒杀时的描述。
 * @desc 被秒杀时的文字描述。%1是攻击者，%2是被攻击者。
 * @default %2差点被%1秒杀了！
 * @type string
 * 
 * @param StoppingSESetting
 * @text 设置防秒杀音效
 * @default 
 * 
 * @param StoppingSE
 * @text 防秒杀音效SE
 * @desc 防秒杀机制生效时的音效SE
 * @type file
 * @dir audio/se/
 * @parent StoppingSESetting
 * 
 * @param volume
 * @text 音量
 * @desc 设置音量
 * @type number
 * @default 90
 * @parent StoppingSESetting
 * 
 * @param pitch
 * @text 音调
 * @desc 设置音调
 * @type number
 * @default 100
 * @parent StoppingSESetting
 * 
 * @param pan
 * @text 音频
 * @desc 设置音频
 * @type number
 * @default 50
 * @parent StoppingSESetting
 * 
 */


var Imported = Imported || {};
NUUN_StoppingFeature = true;

(() => {
const parameters = PluginManager.parameters('NUUN_StoppingFeature');
const StoppingMessage = String(parameters['StoppingMessage'] || '');
const StoppingSE = String(parameters['StoppingSE'] || '');
const volume = Number(parameters['volume'] || 90);
const pitch = Number(parameters['pitch'] || 100);
const pan = Number(parameters['pan'] || 50);
let eraseStateId = 0;

const _Game_Action_executeHpDamage = Game_Action.prototype.executeHpDamage;
Game_Action.prototype.executeHpDamage = function(target, value) {
    eraseStateId = 0;
    const hp = target.hp;
    if (hp - value <= 0 && this.stopping(target, hp) && !this.getInvalidStoppingRate()) {   
        value = hp - Math.max(hp - value, 0) - 1;
        target.result()._stopping = true;
        target.removeState(eraseStateId);
    }
    _Game_Action_executeHpDamage.call(this, target, value);
};

Game_Action.prototype.stopping = function(target, value) {
    return target.traitObjects().some(trait => {
        const stopping = getStoppingMeta(trait);
        const id = this.stoppingEraseState(trait);
        if (stopping && id > 0) {
            eraseStateId = id;
        }
        return (stopping && getStoppingResult(target, value, stopping) && this.condStoppingResult(stopping, trait, target));
    })
};

Game_Action.prototype.condStoppingResult = function(stopping, trait, target) {
    if (!Imported.NUUN_ConditionsBase) {
        return true;
    }
    const mode = stopping[2] || 0;
    const action = $gameTemp.getActionData();
    return this.triggerConditions(trait, target, 'StoppingCond', 'TargetStoppingCond', 'PartyStoppingCond', 'TroopStoppingCond', action.damage, mode);
};

Game_Action.prototype.getInvalidStoppingRate = function() {
    const invalidStopping = this.item().meta.InvalidStopping;
    return invalidStopping ? Math.floor(Math.random() * 100) < parseInt(invalidStopping) : false;
};

Game_Action.prototype.stoppingEraseState = function(trait) {
    return trait.meta.StoppingEraseState ? Number(trait.meta.StoppingEraseState) : 0;
};

const _Game_ActionResult_clear = Game_ActionResult.prototype.clear;
Game_ActionResult.prototype.clear = function() {
    _Game_ActionResult_clear.call(this);
    this._stopping = false;
};


const _Window_BattleLog_displayActionResults = Window_BattleLog.prototype.displayActionResults;
Window_BattleLog.prototype.displayActionResults = function(subject, target) {
	_Window_BattleLog_displayActionResults.call(this, subject, target);
	if (target.result().used && target.result()._stopping) {
		this.displayStopping(subject, target);
        this.push("pushBaseLine");
	}
};

Window_BattleLog.prototype.displayStopping = function(subject, target) {
    if (StoppingMessage) {
        this.push("addText", StoppingMessage.format(subject.name(), target.name()));
    }
    stoppingSE();
};

function stoppingSE() {
    if (StoppingSE) {
      AudioManager.playSe({"name":StoppingSE,"volume":volume,"pitch":pitch,"pan":pan});
    }
};

function getStoppingResult(target, value, stopping) {
    return getStoppingRate(stopping[0]) && value >= (target.mhp * stopping[1]) / 100;
};

function getStoppingRate(rate) {
    return Math.floor(Math.random() * 100) < rate;
};

function getStoppingMeta(trait) {
    return trait.meta.Stopping ? trait.meta.Stopping.split(',').map(Number) : null;
};

})();