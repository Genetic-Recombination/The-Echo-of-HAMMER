//=============================================================================
// DynamicEquipParam.js
// ----------------------------------------------------------------------------
// (C)2017 Triacontane
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.1.0 2021/05/03 MZで動作するよう修正
// 1.0.2 2021/05/03 動的パラメータがお店のパラメータ増減に反映されていなかった問題を修正
// 1.0.1 2017/07/23 ヘルプにアクターのレベルやIDを参照する計算式を追記
// 1.0.0 2017/07/18 初版
// ----------------------------------------------------------------------------
// [Blog]   : https://triacontane.blogspot.jp/
// [Twitter]: https://twitter.com/triacontane/
// [GitHub] : https://github.com/triacontane/
//=============================================================================

/*:
 * @plugindesc 装備品パラメータの動的設定プラグイン
 * @target MZ
 * @url https://github.com/triacontane/RPGMakerMV/tree/mz_master/DynamicEquipParam.js
 * @base PluginCommonBase
 * @orderAfter PluginCommonBase
 * @author トリアコンタン
 *
 * @help 装備品のパラメータを現在のアクターの状態に応じて動的に変更します。
 * 武器と防具のメモ欄に以下の通り指定してください。
 * 設定にはJavaScript計算式を使用します。
 *
 * <DEP_攻撃力:[計算式]>   # 攻撃力に計算式を適用
 * <DEP_防御力:[計算式]>   # 防御力に計算式を適用
 * <DEP_魔法力:[計算式]>   # 魔法力に計算式を適用
 * <DEP_魔法防御:[計算式]> # 魔法防御に計算式を適用
 * <DEP_敏捷性:[計算式]>   # 敏捷性に計算式を適用
 * <DEP_運:[計算式]>       # 運に計算式を適用
 * <DEP_最大HP:[計算式]>   # 最大HPに計算式を適用
 * <DEP_最大MP:[計算式]>   # 最大MPに計算式を適用
 *
 * 計算式に使用できる要素は以下の通りです。
 * 各パラメータの値は本プラグインによる変動分は含みません。
 * param # データベースで指定した元々の値
 * a.hp  # HP
 * a.mp  # MP
 * a.tp  # TP
 * a.mhp # 最大HP
 * a.mmp # 最大MP
 * a.atk # 攻撃力
 * a.def # 防御力
 * a.mat # 魔法力
 * a.mdf # 魔法防御
 * a.agi # 敏捷性
 * a.luk # 運
 * a.hpRate() # HPレート(0.0 - 1.0)
 * a.mpRate() # MPレート(0.0 - 1.0)
 * a.tpRate() # TPレート(0.0 - 1.0)
 * a.special('aaa') # メモ欄の[aaa]の値(※)
 * a.level        # レベル
 * a.actorId()    # アクターID
 * a._classId     # 職業ID
 * a.currentExp() # 経験値
 *
 * ※特徴を有するメモ欄から指定した内容に対応する数値を取得
 * <aaa:100> # a.special('aaa')で[100]を返す。
 *
 * 特定のキャラクターが装備すると強化されたり
 * 組み合わせによる強化やステートによる強化が可能になります。
 *
 * このプラグインにはプラグインコマンドはありません。
 *
 * 利用規約：
 *  作者に無断で改変、再配布が可能で、利用形態（商用、18禁利用等）
 *  についても制限はありません。
 *  このプラグインはもうあなたのものです。
 */

/*:zh-CN
 * @plugindesc 装备的能力加成动态化
 * @target MZ
 * @url https://github.com/triacontane/RPGMakerMV/tree/mz_master/DynamicEquipParam.js
 * @base PluginCommonBase
 * @orderAfter PluginCommonBase
 * @author トリアコンタン
 *
 * @help 使装备根据使用者的能力值自动动态化调整
 * 1.在武器和装备的备注栏输入指令。
 * 2.使用使用JavaScript公式进行设置。（公式不需要输入[]号）
 * 3.原作是使用文字的备注命令，我在这里修改为英文，注意区分大小写。
 *（如原作指令<DEP_攻撃力:[計算式]>现在改为<DEP_ATK:[公式]，类推>
 *
 * <DEP_ATK:[公式]>   # 修改攻击力的动态公式
 * <DEP_DEF:[公式]>   # 修改防御力的动态公式
 * <DEP_MAT:[公式]>   # 修改魔法攻击的动态公式
 * <DEP_MDF:[公式]>   # 修改魔法防御的动态公式
 * <DEP_AGI:[公式]>   # 修改敏捷的动态公式
 * <DEP_LUK:[公式]>   # 修改幸运的动态公式
 * <DEP_MHP:[公式]>   # 修改最大生命力的动态公式
 * <DEP_MMP:[公式]>   # 修改最大魔法力的动态公式
 *
 * 动态公式的各种元素如下。
 * 一个装备的动态公式不会计算因为其他装备动态公式带来的能力变化。
 * 只会对角色所有装备、状态、特性自身设定好的能力变化合计来进行动态变化。
 *
 * param # 使用数据库中的对应能力值（不明白）
 * a.hp  # 当前生命力
 * a.mp  # 当前魔法力
 * a.tp  # 当前特技值
 * a.mhp # 最大生命力
 * a.mmp # 最大魔法力
 * a.atk # 攻击力
 * a.def # 防御力
 * a.mat # 魔法攻击
 * a.mdf # 魔法防御
 * a.agi # 敏捷
 * a.luk # 幸运
 * a.hpRate() # 生命力比例(当前/最大值 = 0.0 - 1.0)
 * a.mpRate() # 法力值比例(当前/最大值 = 0.0 - 1.0)
 * a.tpRate() # 特技值比例(当前/最大值 = 0.0 - 1.0)
 * a.special('aaa') # 备注字段中[aaa]的值(※)
 * a.level        # 当前等级
 * a.actorId()    # 角色ID
 * a._classId     # 职业ID
 * a.currentExp() # 当前经验值
 *
 * ※从具有特征的备注字段中获取指定内容对应的数值
 * <aaa:100> # 使用 a.special('aaa') 返回 [100]。（没搞懂）
 *
 * 该插件没有插件指令。
 * 需要使用PluginCommonBase.js，并将本插件放在PluginCommonBase下面。
 *
 * [使用条款]
 *  无任何使用限制，作者不负责任，这个插件现在是你的了。
 *
 * [举几个例子]
 * <DED_MHP:a.level*1000> 角色动态最大生命力=自身生命力上限+等级×1000
 * <DED_ATK:a.atk*2+a.level*10> 角色动态攻击力=自身攻击力×3+等级*10
 * <DED_MAT:a.mat-a.atk/2> 角色动态魔法攻击=自身魔法攻击×2-自身攻击力的一半
 * 因为自身有ATK和MAT的基础值，所以动态公式内加1个就等于×2了。以此类推。
 *
 */

(()=> {
    'use strict';

    //=============================================================================
    // Game_Actor
    //  装備品パラメータの動的設定を追加します。
    //=============================================================================
    Game_Actor._paramNames = [
    /*  ['DEP_最大HP', 'DEP_Mhp'],
        ['DEP_最大MP', 'DEP_Mmp'],
        ['DEP_攻撃力', 'DEP_Atk'],
        ['DEP_防御力', 'DEP_Def'],
        ['DEP_魔法力', 'DEP_Mat'],
        ['DEP_魔法防御', 'DEP_Mdf'],
        ['DEP_敏捷性', 'DEP_Agi'],
        ['DEP_運', 'DEP_Luk'],
	*/
		['DEP_MHP', 'DEP_Mhp'],
        ['DEP_MMP', 'DEP_Mmp'],
        ['DEP_ATK', 'DEP_Atk'],
        ['DEP_DEF', 'DEP_Def'],
        ['DEP_MAT', 'DEP_Mat'],
        ['DEP_MDF', 'DEP_Mdf'],
        ['DEP_AGI', 'DEP_Agi'],
        ['DEP_LUK', 'DEP_Luk']
    ];

    const _Game_Actor_paramPlus = Game_Actor.prototype.paramPlus;
    Game_Actor.prototype.paramPlus = function (paramId) {
        let value = _Game_Actor_paramPlus.apply(this, arguments);
        if (this._calcParam) return value;
        this._calcParam = true;
        this.equips().forEach(item => {
            if (item) value += this.paramPlusDynamic(paramId, item);
        }, this);
        this._calcParam = false;
        return value;
    };

    Game_Actor.prototype.paramPlusDynamic = function (paramId, item) {
        const paramFormula = PluginManagerEx.findMetaValue(item, Game_Actor._paramNames[paramId]);
        let value = 0;
        if (paramFormula) {
            const param = item.params[paramId];
            const a = this;
            value = Math.round(eval(paramFormula)) - param;
        }
        return value;
    };

    Game_Actor.prototype.special = function (tagName) {
        let value = 0;
        this.traitObjects().forEach(function (traitObject) {
            value += PluginManagerEx.findMetaValue(traitObject, tagName);
        });
        return Math.round(value);
    };

    // override
    Window_ShopStatus.prototype.drawActorParamChange = function (x, y, actor, item1) {
        const width = this.innerWidth - this.itemPadding() - x;
        const paramId = this.paramId();
        const targetParam = actor.paramPlusDynamic(paramId, this._item) + this._item.params[paramId];
        const equipParam = item1 ? actor.paramPlusDynamic(paramId, item1) + item1.params[paramId] : 0;
        const change = targetParam - equipParam;
        this.changeTextColor(ColorManager.paramchangeTextColor(change));
        this.drawText((change > 0 ? "+" : "") + change, x, y, width, "right");
    };
})();
