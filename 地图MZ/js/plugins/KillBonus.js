//=============================================================================
// KillBonus.js
// ----------------------------------------------------------------------------
// (C)2016 Triacontane
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 2.1.1 2023/07/07 経験値とゴールドのレートを変更したとき、小数値になってしまう場合がある問題を修正
// 2.1.0 2023/01/09 撃破ボーナスの適用条件に「特定のスキルを使った場合」を追加
// 2.0.1 2022/09/04 ドロップ率に関する仕様をヘルプに記載
// 2.0.0 2022/09/04 MZ向けに再設計
// 1.4.0 2020/03/10 撃破ボーナス発生時にボーナス対象にアニメーションを再生できる機能を追加
// 1.3.0 2019/11/09 条件に指定ターン以内撃破、クリティカル撃破を追加。ボーナスに最初のドロップアイテムの確率変更追加
// 1.2.0 2019/06/11 撃破ボーナスとして任意の変数を増減させる機能を追加
// 1.1.0 2017/06/08 ボーナス取得条件としてノーダメージ、ノーデス、ノースキルおよびスイッチを追加
// 1.0.0 2016/08/07 初版
// ----------------------------------------------------------------------------
// [Blog]   : https://triacontane.blogspot.jp/
// [Twitter]: https://twitter.com/triacontane/
// [GitHub] : https://github.com/triacontane/
//=============================================================================

/*:zh-CN
 * @plugindesc 击杀奖励插件
 * @target MZ
 * @url https://github.com/triacontane/RPGMakerMV/tree/mz_master/KillBonus.js
 * @base PluginCommonBase
 * @orderAfter PluginCommonBase
 * @author トリアコンタン
 *
 * @param bonusList
 * @text 击杀奖励列表
 * @desc 设置你的击杀奖励
 * @default []
 * @type struct<Setting>[]
 *
 * @help KillBonus.js
 *
 * 【插件简介】
 * 战斗中击杀目标后，可以获得相应的奖励：
 * 1. HP/MP/TP按数值恢复或减少，或者按比例恢复。
 * 2. 战利品、金币、经验的掉落比例调整，金币数量调整。
 * 3. 变量的增减，执行脚本等。
 * 4. 获得状态（击杀者本体或全队，或敌人全队）
 * 5. 显示动画
 * 另，可以[color=Blue]设置一些击杀条件来提高难度[/color]。
 * 如：需要无伤击杀、暴击击杀、3回合击杀等。
 *
 * 【备注栏设置】
 * 通过在角色、职业、武器、防具等，和敌人的备注栏输入命令，
 * 来设置击杀后获得的相关奖励。
 * <KillBonus:bonus01> // bonus01 = 插件参数中设定的击杀奖励ID。
 * 1.角色、职业：可以随时触发击杀奖励。
 * 2.武器、防具、状态：需要角色佩戴相关装备，或获得状态，才可以触发击杀奖励。
 * 3.敌人：敌人满足击杀条件，也能获得对应奖励。
 *
 * 1.当击杀目标激活了多个关于金币和经验的击杀奖励时，
 *   会自动选取其中最大值的项目发放奖励，即使它们不在同一条奖励设置中，同时也不会叠加。
 * 2.如果参数设置内的战利品、金币和经验的相关掉落设置为0，
 *   则按敌人默认设置的掉率和掉落数量。
 *
 * 【使用条款】
 * 无任何使用限制。不要求声明著作权。
 * 作者不对插件使用后果负责，但会尽量修复异常。
 *
 * 【版本更新记录】
 * V2.1.1 2023/07/07 修复经验和金币获得时可能出现小数的问题。
 * V2.1.0 2023/01/09 新增击杀条件：使用指定技能击杀
 * V2.0.1 2022/09/04 插件说明中列出掉率规格？（ドロップ率に関する仕様をヘルプに記載）
 * V2.0.0 2022/09/04 重新设计为MZ可用版本。
 * V1.4.0 2020/03/10 新增击杀时可以播放指定动画。
 * V1.3.0 2019/11/09 新增击杀条件：一定回合内击杀、暴击击杀；新增修改默认战利品掉落。
 * V1.2.0 2019/06/11 新增击杀奖励：变量变化
 * V1.1.0 2017/06/08 新增击杀条件：无伤、无阵亡、无技能、开关
 * V1.0.0 2016/08/07 初版
 */

/*~struct~Setting:zh-CN
 *
 * @param id
 * @text 击杀奖励ID
 * @desc 设置一个奖励ID，它会在备注命令中被引用。
 * 可以是字母数字组合，需要唯一性，注意大小写。
 * @default bonus01
 *
 * @param hp
 * @text HP恢复（数值）
 * @desc 设置HP恢复的数值。（范围：-99999到99999）
 * @default 0
 * @type number
 * @min -99999
 * @max 99999
 *
 * @param hpRate
 * @text HP恢复（百分比）
 * @desc 设置HP恢复的百分比。（范围：0到100）
 * @default 0
 * @type number
 * @min 0
 * @max 100
 *
 * @param mp
 * @text MP恢复（数值）
 * @desc 设置MP恢复的数值。（范围：-99999到99999）
 * @default 0
 * @type number
 * @min -99999
 * @max 99999
 *
 * @param mpRate
 * @text MP恢复（百分比）
 * @desc 设置MP恢复的百分比。（范围：0到100）
 * @default 0
 * @type number
 * @min 0
 * @max 100
 *
 * @param tp
 * @text TP恢复（数值）
 * @desc 设置TP恢复的数值。（范围：-99999到99999）
 * @default 0
 * @type number
 * @min -99999
 * @max 99999
 *
 * @param tpRate
 * @text TP恢复（百分比）
 * @desc 设置TP恢复的百分比。（范围：0到100）
 * @default 0
 * @type number
 * @min 0
 * @max 100
 *
 * @param gold
 * @text 金币获得（数值）
 * @desc 设置金币获得的数量
 * @default 0
 * @type number
 *
 * @param goldRate
 * @text 金币获得（百分比）
 * @desc 设置金币获得的倍率百分比，基于敌人设置的金币掉落数量。
 * 如：100=默认的1倍，200=2倍，以此类推。
 * @default 100
 * @type number
 *
 * @param expRate
 * @text 经验值获得（百分比）
 * @desc 设置经验值获得的倍率百分比，基于敌人设置的经验值获得数量。
 * 如：100=默认的1倍，200=2倍，以此类推。
 * @default 100
 * @type number
 *
 * @param drop1Rate
 * @text 1号战利品掉率
 * @desc 修改敌人设置中的1号战利品的掉率，设置后会忽略原设置的默认掉落。
 * （范围：0到100）
 * @default 0
 * @type number
 * @min 0
 * @max 100
 *
 * @param drop2Rate
 * @text 2号战利品掉率
 * @desc 修改敌人设置中的2号战利品的掉率，设置后会忽略原设置的默认掉落。
 * （范围：0到100）
 * @default 0
 * @type number
 * @min 0
 * @max 100
 *
 * @param drop3Rate
 * @text 3号战利品掉率
 * @desc 修改敌人设置中的3号战利品的掉率，设置后会忽略原设置的默认掉落。
 * （范围：0到100）
 * @default 0
 * @type number
 * @min 0
 * @max 100
 *
 * @param state
 * @text 单人获得状态
 * @desc 当角色击杀目标时获得一个指定的状态。
 * @default 0
 * @type state
 *
 * @param stateParty
 * @text 全员获得状态
 * @desc 当角色击杀目标时，全部队员获得一个指定的状态。
 * @default 0
 * @type state
 *
 * @param stateTroop
 * @text 全敌获得状态
 * @desc 使全部敌人获得一个指定的状态。
 * @default 0
 * @type state
 *
 * @param variableId
 * @text 变量ID
 * @desc 设置一个变量ID，击杀时使该变量值发生变化。
 * @default 0
 * @type variable
 *
 * @param variableValue
 * @text 设置变量值
 * @desc 设置这个变量增加了或者减少了。
 * @default 0
 * @type number
 * @min -999999
 * @parent variableId
 *
 * @param script
 * @text 运行脚本
 * @desc 设置一段脚本，击杀目标后运行。
 * @default
 * @type multiline_string
 *
 * @param animationId
 * @text 播放动画
 * @desc 当击杀目标后，播放一个指定的动画。
 * @default 0
 * @type animation
 *
 * @param condition
 * @text 击杀条件
 * @desc 设置一些击杀条件，符合条件的击杀才会获得奖励。
 * （不设置则只要击杀就有奖励）
 * @type struct<Condition>
 * @default
 *
 */

/*~struct~Condition:zh-CN
 *
 * @param noDamage
 * @text 无伤秒杀
 * @desc 角色没有受到过伤害的前提下击杀目标。
 * @default false
 * @type boolean
 *
 * @param noSkill
 * @text 无技能击杀
 * @desc 角色没有使用过技能的前提下击杀目标。
 * @default false
 * @type boolean
 *
 * @param noDeath
 * @text 无死亡击杀
 * @desc 角色没有死亡过的前提下击杀目标。
 * @default false
 * @type boolean
 * 
 * @param critical
 * @text 暴击击杀
 * @desc 对目标造成暴击时击杀。
 * @default false
 * @type boolean
 * 
 * @param switchId
 * @text 开关
 * @desc 当指定开关为ON时击杀目标。
 * @default 0
 * @type switch
 *
 * @param skillId
 * @text 指定技能击杀
 * @desc 使用指定的技能击杀目标。
 * @default 0
 * @type skill
 * 
 * @param turnCount
 * @text 指定回合内击杀
 * @desc 在指定的回合数内击杀目标。
 * @default 0
 * @type number
 * 
 * @param script
 * @text 运行脚本击杀
 * @desc 当成功触发并运行了指定的脚本后击杀目标。
 * @default 
 *
 */


/*:
 * @plugindesc 撃破ボーナスプラグイン
 * @target MZ
 * @url https://github.com/triacontane/RPGMakerMV/tree/mz_master/KillBonus.js
 * @base PluginCommonBase
 * @orderAfter PluginCommonBase
 * @author トリアコンタン
 *
 * @param bonusList
 * @text ボーナス設定リスト
 * @desc 撃破ボーナスの設定リストです。
 * @default []
 * @type struct<Setting>[]
 *
 * @help KillBonus.js
 *
 * 敵を撃破した際に何らかの報酬を得ることができます。
 * 報酬は主に以下の通りです。
 * ・パラメータ回復
 * ・報酬レート、獲得率変動
 * ・変数加算、スクリプト実行
 * ・ステート付与
 * ・アニメーション表示
 *
 * 撃破するとHPやMPを回復するステートや装備品などが作成できます。
 * 具体的な報酬の内容はプラグインパラメータで指定してください。
 *
 * 特徴を有するデータベース(アクター、職業、武具、ステート、敵キャラ)のメモ欄に
 * 以下の通り記述してください。
 * "撃破した側"がボーナスの特徴を持っていると撃破ボーナスを獲得できます。
 *
 * bonus01 : プラグインパラメータで指定した識別子
 * <撃破ボーナス:bonus01>
 * <KillBonus:bonus01>
 *
 * ※1 複数の撃破ボーナスが有効な場合、経験値やお金のレートやドロップ率は
 * 最も高い値が採用されます。
 *
 * ※2 ドロップ率に0を指定すると、DBで指定したデフォルトの
 * ドロップ率になります。
 *
 * 利用規約：
 *  作者に無断で改変、再配布が可能で、利用形態（商用、18禁利用等）
 *  についても制限はありません。
 *  このプラグインはもうあなたのものです。
 */

/*~struct~Setting:
 *
 * @param id
 * @text 識別子
 * @desc 識別子です。一意の値を指定してください。この値をメモ欄に指定します。
 * @default bonus01
 *
 * @param hp
 * @text HP回復
 * @desc HPが指定したぶんだけ回復します。
 * @default 0
 * @type number
 * @min -99999
 * @max 99999
 *
 * @param hpRate
 * @text HP回復レート
 * @desc HPが指定した割合(0-100)だけ回復します。
 * @default 0
 * @type number
 * @min 0
 * @max 100
 *
 * @param mp
 * @text MP回復
 * @desc MPが指定したぶんだけ回復します。
 * @default 0
 * @type number
 * @min -99999
 * @max 99999
 *
 * @param mpRate
 * @text MP回復レート
 * @desc MPが指定した割合(0-100)だけ回復します。
 * @default 0
 * @type number
 * @min 0
 * @max 100
 *
 * @param tp
 * @text TP回復
 * @desc TPが指定したぶんだけ回復します。
 * @default 0
 * @type number
 * @min -99999
 * @max 99999
 *
 * @param tpRate
 * @text TP回復レート
 * @desc TPが指定した割合(0-100)だけ回復します。
 * @default 0
 * @type number
 * @min 0
 * @max 100
 *
 * @param gold
 * @text お金
 * @desc 指定した額のお金を直接獲得します。
 * @default 0
 * @type number
 *
 * @param goldRate
 * @text お金レート
 * @desc 指定した倍率で対象の獲得金額が変動します。
 * @default 100
 * @type number
 *
 * @param expRate
 * @text 経験値レート
 * @desc 指定した倍率で対象の獲得経験値が変動します。
 * @default 100
 * @type number
 *
 * @param drop1Rate
 * @text ドロップ1レート
 * @desc ドロップアイテム1の取得率を指定値に変更します。データベースで指定した値は無視されます。
 * @default 0
 * @type number
 * @min 0
 * @max 100
 *
 * @param drop2Rate
 * @text ドロップ2レート
 * @desc ドロップアイテム2の取得率を指定値に変更します。データベースで指定した値は無視されます。
 * @default 0
 * @type number
 * @min 0
 * @max 100
 *
 * @param drop3Rate
 * @text ドロップ3レート
 * @desc ドロップアイテム3の取得率を指定値に変更します。データベースで指定した値は無視されます。
 * @default 0
 * @type number
 * @min 0
 * @max 100
 *
 * @param state
 * @text ステート
 * @desc 自身に指定したステートを付与します。
 * @default 0
 * @type state
 *
 * @param stateParty
 * @text パーティステート
 * @desc パーティ全員にステートを付与します。
 * @default 0
 * @type state
 *
 * @param stateTroop
 * @text 敵グループステート
 * @desc 敵グループ全員にステートを付与します。
 * @default 0
 * @type state
 *
 * @param variableId
 * @text 変数番号
 * @desc 変数を加算させたい対象の変数IDです。
 * @default 0
 * @type variable
 *
 * @param variableValue
 * @text 変数の設定値
 * @desc 変数の加算値です。
 * @default 0
 * @type number
 * @min -999999
 * @parent variableId
 *
 * @param script
 * @text スクリプト
 * @desc 指定したスクリプトを実行します。
 * @default
 * @type multiline_string
 *
 * @param animationId
 * @text アニメーション
 * @desc 撃破ボーナスの発動時にアニメーションを再生できます。
 * @default 0
 * @type animation
 *
 * @param condition
 * @text 適用条件
 * @desc 撃破ボーナスが適用される条件です。指定が無い場合は常に適用されます。
 * @type struct<Condition>
 * @default
 *
 */

/*~struct~Condition:
 *
 * @param noDamage
 * @text ノーダメージ
 * @desc ダメージを受けずに撃破したとき、条件を満たします。
 * @default false
 * @type boolean
 *
 * @param noSkill
 * @text スキル不使用
 * @desc スキルを使わずに撃破したとき、条件を満たします。
 * @default false
 * @type boolean
 *
 * @param noDeath
 * @text ノーデス
 * @desc 戦闘不能者を出さずに撃破したとき、条件を満たします。
 * @default false
 * @type boolean
 * 
 * @param critical
 * @text クリティカル
 * @desc クリティカルで撃破したとき、条件を満たします。
 * @default false
 * @type boolean
 * 
 * @param switchId
 * @text スイッチ
 * @desc 指定したスイッチがONのとき条件を満たします。
 * @default 0
 * @type switch
 *
 * @param skillId
 * @text スキルID
 * @desc 特定のスキルで撃破したとき条件を満たします。
 * @default 0
 * @type skill
 * 
 * @param turnCount
 * @text ターン数
 * @desc 指定したターン数以内に撃破したとき、条件を満たします。
 * @default 0
 * @type number
 * 
 * @param script
 * @text スクリプト
 * @desc 指定したスクリプトがtrueを返したとき条件を満たします。
 * @default 
 *
 */

(()=> {
    'use strict';
    const script = document.currentScript;
    const param = PluginManagerEx.createParameter(script);
    if (!param.bonusList) {
        param.bonusList = [];
    }

    //=============================================================================
    // BattleManager
    //  スキルやダメージの状況を保持します。
    //=============================================================================
    const _BattleManager_setup = BattleManager.setup;
    BattleManager.setup = function(troopId, canEscape, canLose) {
        _BattleManager_setup.apply(this, arguments);
        $gameParty.members().forEach(member => member.initKillBonusCondition());
    };

    //=============================================================================
    // Game_BattlerBase
    //  スキルやダメージの状況を保持します。
    //=============================================================================
    Game_BattlerBase.prototype.initKillBonusCondition = function() {
        this._noSkill  = true;
        this._noDamage = true;
        this._noDeath  = true;
        this._usedSkillId = 0;
    };

    Game_BattlerBase.prototype.breakNoSkill = function() {
        this._noSkill  = false;
    };

    Game_BattlerBase.prototype.breakNoDamage = function() {
        this._noDamage  = false;
    };

    Game_BattlerBase.prototype.breakNoDeath = function() {
        this._noDeath  = false;
    };

    Game_BattlerBase.prototype.setUsedSkillId = function(skillId) {
        this._usedSkillId = skillId
    };

    Game_BattlerBase.prototype.findKillBonusParamList = function(critical) {
        return this.traitObjects()
            .map(obj => this.findKillBonusParam(obj))
            .filter(data => !!data && this.checkDataForKillBonus(data, critical));
    };

    Game_BattlerBase.prototype.findKillBonusParam = function(traitObj) {
        const id = PluginManagerEx.findMetaValue(traitObj, ['KillBonus', '撃破ボーナス']);
        return param.bonusList.filter(item => item.id === id)[0] || null;
    };

    Game_BattlerBase.prototype.checkDataForKillBonus = function(data, critical) {
        const condition = data.condition;
        if (!condition) {
            return true;
        }
        const conditions = [];
        conditions.push(() => condition.noDamage && !this._noDamage);
        conditions.push(() => condition.noSkill && !this._noSkill);
        conditions.push(() => condition.noDeath && !this._noDeath);
        conditions.push(() => condition.skillId && this._usedSkillId !== condition.skillId);
        conditions.push(() => condition.critical && !critical);
        conditions.push(() => condition.turnCount > 0 && condition.turnCount < $gameTroop.turnCount());
        conditions.push(() => condition.switchId > 0 && !$gameSwitches.value(condition.switchId));
        conditions.push(() => condition.script && !eval(condition.script));
        return !conditions.some(cond => cond.call(this));
    };

    const _Game_BattlerBase_die = Game_BattlerBase.prototype.die;
    Game_BattlerBase.prototype.die = function() {
        _Game_BattlerBase_die.apply(this, arguments);
        this.breakNoDeath();
    };

    //=============================================================================
    // Game_Battler
    //  ダメージ時にノーダメージフラグを解除します。
    //=============================================================================
    const _Game_Battler_performDamage = Game_Battler.prototype.performDamage;
    Game_Battler.prototype.performDamage = function() {
        _Game_Battler_performDamage.apply(this, arguments);
        this.breakNoDamage();
    };

    //=============================================================================
    // Game_Action
    //  撃破ボーナスを適用します。
    //=============================================================================
    const _Game_Action_testApply = Game_Action.prototype.testApply;
    Game_Action.prototype.testApply = function(target) {
        this._criticalForKillBonus = false;
        const result = _Game_Action_testApply.apply(this, arguments);
        if (result) {
            if (!this.isAttack() && !this.isGuard()) {
                this.subject().breakNoSkill();
            }
            if (DataManager.isSkill(this.item())) {
                this.subject().setUsedSkillId(this.item().id);
            }
        }
        return result;
    };

    const _Game_Action_applyCritical = Game_Action.prototype.applyCritical;
    Game_Action.prototype.applyCritical = function(damage) {
        this._criticalForKillBonus = true;
        return _Game_Action_applyCritical.apply(this, arguments);
    };

    const _Game_Action_executeHpDamage      = Game_Action.prototype.executeHpDamage;
    Game_Action.prototype.executeHpDamage = function(target, value) {
        _Game_Action_executeHpDamage.apply(this, arguments);
        if (target.hp === 0) {
            this.executeKillBonus(target);
        }
    };

    Game_Action.prototype.executeKillBonus = function(target) {
        const subject = this.subject();
        if (!subject) {
            return;
        }
        this._gainHp = 0;
        this._gainMp = 0;
        this._gainTp = 0;
        target.clearRewardRate();
        subject.findKillBonusParamList(this._criticalForKillBonus).forEach(data => {
            this.executeKillBonusRecover(data, subject);
            this.executeKillBonusState(data, subject);
            this.executeKillBonusVariable(data);
            this.executeKillBonusScript(data, subject, target);
            this.executeKillBonusReward(data, target);
            this.executeKillBonusAnimation(data, subject);
        });
        if (this._gainHp !== 0) subject.gainHp(this._gainHp);
        if (this._gainMp !== 0) subject.gainMp(this._gainMp);
        if (this._gainTp !== 0) subject.gainTp(this._gainTp);
    };

    Game_Action.prototype.executeKillBonusAnimation = function(data, subject) {
        const id = data.animationId
        if (id > 0) {
            $gameTemp.requestAnimation([subject], id, false);
        }
    };

    Game_Action.prototype.executeKillBonusRecover = function(data, subject) {
        if (data.hp) {
            this._gainHp += data.hp;
        }
        if (data.hpRate) {
            this._gainHp += Math.floor(subject.mhp * data.hpRate / 100);
        }
        if (data.mp) {
            this._gainMp += data.mp;
        }
        if (data.mpRate) {
            this._gainMp += Math.floor(subject.mhp * data.mpRate / 100);
        }
        if (data.tp) {
            this._gainTp += data.tp;
        }
        if (data.tpRate) {
            this._gainTp += Math.floor(subject.maxTp() * data.tpRate / 100);
        }
    };

    Game_Action.prototype.executeKillBonusVariable = function(data) {
        const id = data.variableId;
        if (id) {
            $gameVariables.setValue(id, $gameVariables.value(id) + data.variableValue);
        }
    };

    Game_Action.prototype.executeKillBonusState = function(data, subject) {
        if (data.state) {
            subject.addState(data.state);
        }
        if (data.stateParty) {
            subject.friendsUnit().members().forEach(member => member.addState(data.stateParty));
        }
        if (data.stateTroop) {
            subject.opponentsUnit().members().forEach(member => member.addState(data.stateTroop));
        }
    };

    Game_Action.prototype.executeKillBonusScript = function(data, subject, target) {
        if (data.script) {
            try {
                eval(data.script);
            } catch (e) {
                console.error(e.stack);
            }
        }
    };

    Game_Action.prototype.executeKillBonusReward = function(data, target) {
        if (data.gold) {
            $gameParty.gainGold(data.gold);
        }
        target.setRewardRate(data.drop1Rate, data.drop2Rate, data.drop3Rate, data.goldRate, data.expRate);
    };

    /**
     * Game_Enemy
     * ドロップ率変更を実装します。
     */
    Game_Battler.prototype.setRewardRate = function(drop1Rate, drop2Rate, drop3Rate, goldRate, expRate) {
        const rate = this._customRewardRate;
        if (this._customRewardRate) {
            rate.dropRate[0] = Math.max(rate.dropRate[0], drop1Rate);
            rate.dropRate[1] = Math.max(rate.dropRate[1], drop2Rate);
            rate.dropRate[2] = Math.max(rate.dropRate[2], drop3Rate);
            rate.goldRate = Math.max(rate.goldRate, goldRate);
            rate.expRate = Math.max(rate.expRate, expRate);
        } else {
            this._customRewardRate = {
                dropRate: [drop1Rate, drop2Rate, drop3Rate],
                goldRate: goldRate,
                expRate: expRate
            };
        }
    };

    Game_Battler.prototype.clearRewardRate = function () {
        this._customRewardRate = null;
    }

    const _Game_Enemy_exp = Game_Enemy.prototype.exp;
    Game_Enemy.prototype.exp = function() {
        const exp = _Game_Enemy_exp.apply(this, arguments);
        if (this._customRewardRate?.expRate) {
            return Math.floor(exp * this._customRewardRate.expRate / 100);
        } else {
            return exp;
        }
    };

    const _Game_Enemy_gold = Game_Enemy.prototype.gold;
    Game_Enemy.prototype.gold = function() {
        const gold = _Game_Enemy_gold.apply(this, arguments);
        if (this._customRewardRate?.goldRate) {
            return Math.floor(gold * this._customRewardRate.goldRate / 100);
        } else {
            return gold;
        }
    };

    const _Game_Enemy_makeDropItems = Game_Enemy.prototype.makeDropItems;
    Game_Enemy.prototype.makeDropItems = function() {
        const prevItems = _Game_Enemy_makeDropItems.apply(this, arguments);
        const newRate = this._customRewardRate?.dropRate || [];
        if (newRate[0] || newRate[1] || newRate[2]) {
            const rate = this.dropItemRate();
            return this.enemy().dropItems.reduce((r, dropItem, index) => {
                const customResult = newRate[index] ? Math.random() < newRate[index] / 100 : Math.random() * dropItem.denominator < rate;
                if (dropItem.kind > 0 && customResult) {
                    return r.concat(this.itemObject(dropItem.kind, dropItem.dataId));
                } else {
                    return r;
                }
            }, []);
        } else {
            return prevItems;
        }
    };
})();
