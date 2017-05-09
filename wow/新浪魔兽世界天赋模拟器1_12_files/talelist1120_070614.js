/*
*/
maxLevel = 60;
talentPoints = 0;
currentTalent = 0;

icons = new Array();

function talList() {

    var win = window.open("","","resizable=1,toolbar=0,width=825,height=450,status=0,scrollbars=1,menubar=1");

	if(win != null)
	{
		win.document.write("<HTML><HEAD><LINK REL=\"stylesheet\" TYPE=\"text/css\" HREF=\"wwv/vault.css\"><TITLE>WoW "+currentClass+" talents</TITLE></HEAD>\n");
		win.document.write("<BODY BGCOLOR=\"#FFFFFF\" TEXT=\"000000\">\n");
		
		win.document.write(getAllTalents());
		
		win.document.write("</BODY></HTML>");
		win.document.close();
	}
	else
	{
		alert("An error occurred when displaying the talents list window. If you do not allow popup windows, you must copy/paste the info in the talent window to save the template.");
	}
}


function getAllTalents() {
	//sort: type *28 + 4*row + col
	var sortedTalents = new Array(28*3);
	var typeIdx = new Array();
	var tId;
	var rId;
	var cId;
	var sId;
	var html="<table width=85% border=1>";
	typeIdx[types[0]]= 0;
	typeIdx[types[1]]= 1;
	typeIdx[types[2]]= 2;
	
	for (var talentId in talents) {
		tId = typeIdx[talents[talentId].Type];
		rId = talents[talentId].Tier;
		cId = talents[talentId].Column;
		sId = tId*28+rId*4-4+cId;
		sortedTalents[sId] = talentId;
	}

	for (sId =0;sId< 28*3 ;sId++) {
		if (sId == 0) {
			html += "<tr><td align=middle><font class=\"accent\" size=20>"+types[0]+"</font></td><tr>";
		}
		if (sId == 28) {
			html += "<tr><td align=middle><font class=\"accent\" size=20>"+types[1]+"</font></td><tr>";
		}
		if (sId == 56) {
			html += "<tr><td align=middle><font class=\"accent\" size=20>"+types[2]+"</font></td><tr>";
		}

		if ( null != sortedTalents[sId] ) {
			html += showTalent2(sortedTalents[sId]);
		}
	}
	return html+"</table>";
}


function showTalent2(id)
{

	var html = "";
	html += "<tr><td>";
	if (iconEnable && !document.getElementById("simpleOutput").checked) {
		    html += "<img src="+ iconUrl + talents[id].Icon + ">";
	}

	html += "<nobr><span class=\"accent\"><b>" + talents[id].Name + "</b></span></nobr>";

	html += " 0";
	html += "/" + talents[id].Info.length + "</nobr><b> ["+talents[id].Type+"]</b>";
	for(var i in talents[id].Requirements)
	{
		var req = talents[id].Requirements[i];
		html += "<br><nobr><span class=\"smalltext\"";
		if(learned[req.Id] == null || learned[req.Id] < req.Amount)
		{
			html += " style=\"color: red;\"";
		}
		if(chinese){
			html += ">需要 " + req.Amount + " 点";
		}else{
			html += ">Req " + req.Amount + " Point";
			if(req.Amount != 1)
			{			html += "s";		}
		}
		if(chinese){
		html += " 在 " + talents[req.Id].Name + "</span></nobr>";
		}else{
		html += " in " + talents[req.Id].Name + "</span></nobr>";
		}
	}
	if(talents[id].Tier > 1)
	{
		var typereq = (talents[id].Tier - 1) * 5;
		html += "<br><nobr><span class=\"smalltext\"";
		if(masteries[talents[id].Type] < typereq)
		{
			html += " style=\"color: red;\"";
		}
		if(chinese){
		html += ">需要 " + typereq + " 点";
		}else{
		html += ">Req " + typereq + " Point";
		if(talents[id].TypeReq != 1)
		{
			html += "s";
		}
		}
		if(chinese){
		html += " 在 " + talents[id].Type + " 天赋</span></nobr>";
		}else{
		html += " in " + talents[id].Type + " Talent</span></nobr>";
		}
	}
	var minLevel = getMinLevel(id);
	html += "<br><nobr><span class=\"smalltext\"";
	if(currentLevel < minLevel)
	{
	    html += " style=\"color: red;\"";
	}
	if(chinese){
	html += ">最低等级: " + minLevel;
	}else{
	html += ">Min Level: " + minLevel;
	}
	html += "</span></nobr>";

    html += "<br><br>";
    if(talents[id].Info.length > 0)
    {
	for (var j=1;j<=talents[id].Info.length;j++)
	{
	    if(chinese){
	    html += "<b>等级 "+j+":</b> ";
	    }else{
	    html += "<b>Rank "+j+":</b> ";
	    }
	    var details = talents[id].Details;
	    if(details == "")
	    {
	        details = talents[id].Info[j-1].Details;
	    }
	    if(details != "")
	    {
	        html += "<span class=\"smalltext\">" + details + "</span><br>";
	    }
	    html += "<span class=\"accent\">" + getTalentDescription(id, j) + "</span><br>";
	}
    }
    return html;
}

//----8<-------------------------------------------[2005/01/13 16:53:39]


function showClassList() {
		var tmpStr="";
	for(var rId in classId){
		if (currentClass == rId) {
		tmpStr += "<INPUT type=radio name=\"radio\" checked onclick=\"OnSelectRadio("+classId[rId]+");\">"+rId;
		}else{
		tmpStr += "<INPUT type=radio name=\"radio\" onclick=\"OnSelectRadio("+classId[rId]+");\">"+rId;
		}
		setInnerHTML(document.getElementById("cn3"), tmpStr);
	}

}


function initLoad(){

if (currentClass == null || classId[currentClass] == null) {

var url2class;
if (window.location.href.match(/\?/)) {
url2class = window.location.href.replace(/^.*\?/,"");

if (url2class && !isNaN(url2class) && (url2class < 9)) {
	currentClass = classLst[url2class];
}}else{

	currentClass = classLst[5]; //---修改当前默认职业
}

	OnSelectType(currentClass);
	loadTalents();
	talents_main();
}
}

//----8<-------------------------------------------[
//constructor
//----8<-------------------------------------------[
function Talent(name, type, tier, column, icon, coords, details, description, info, requirements)
{
    this.Name = name;
    this.Type = type;
    this.Tier = tier;
    this.Column = column;
    this.Icon = icon;
    this.Coords = coords;
    this.Details = details;
    this.Description = description;
    this.Info = info;
    this.Requirements = requirements;
}

function TalentInfo(rank, amount, details, description)
{
    this.Rank = rank;
    this.Amount = amount;
    this.Details = details;
    this.Description = description;
}

function TalentImage(name, image, imageMap)
{
	this.Name = name;
	this.Image = iconUrl + image;
	this.imageMap = mapUrl + imageMap;
}

function TalentRequirement(id, amount)
{
	this.Id = id;
	this.Amount = amount;
}
//----8<-------------------------------------------[
//data
//----8<-------------------------------------------[
function preDefineClass(){
	classIdCn = {
		"德鲁伊":0,
		"猎人"	:1,
		"法师"	:2,
		"圣骑士":3,
		"牧师"	:4,
		"盗贼"	:5,
		"萨满祭司":6,
		"术士"	:7,
		"战士"	:8
	};
	
	for ( var cId in classIdCn ) {
		classLstCn[classIdCn[cId]] = cId;
	}
	
	classIdEn = {
		"Druid"		:0,
		"Hunter"	:1,
		"Mage"		:2,
		"Paladin"	:3,
		"Priest"	:4,
		"Rogue"		:5,
		"Shaman"	:6,
		"Warlock"	:7,
		"Warrior"	:8
	}
	
	for ( var cId in classIdEn ) {
		classLstEn[classIdEn[cId]] = cId;
	}
	
	//classId * 3 [0-2]
	typesIdCn = new Array(
		"平衡", "野性战斗", "恢复",
		"野兽掌握", "射击", "生存",
		"奥术", "冰霜", "火焰",
		"神圣", "防护", "惩戒",
		"戒律", "神圣", "暗影",
		"刺杀", "战斗", "敏锐",
		"元素", "增强", "恢复",
		"痛苦", "恶魔学识", "毁灭",
		"武器", "狂怒", "防护"
	);
	
	typesIdEn = new Array(
		"Balance", "Feral Combat", "Restoration",
		"Beast Mastery", "Marksmanship", "Survival",     
		"Arcane", "Frost", "Fire",		       
		"Holy", "Protection", "Retribution",	     
		"Discipline", "Holy", "Shadow",		  
		"Assassination", "Combat", "Subtlety",	   
		"Elemental Combat", "Enhancement", "Restoration",
		"Affliction", "Demonology", "Destruction",       
		"Arms", "Fury", "Protection"
		);		    

	for ( var cId in classIdEn ) {
		if(null==classStr) {
			classStr = cId;
		}else {
			classStr += ":"+cId;
		}
	}
}

function loadType() {
	if(chinese) {
		classId = classIdCn;
		classLst = classLstCn;
		typesId = typesIdCn;
	} else {
		classId = classIdEn;
		classLst = classLstEn;
		typesId = typesIdEn;	
	}

}

function loadBigImage(){
	talentImages[classLst[0]+typesId[0]] = iconUrl + "talent_druidbalance_r180.jpg";
	talentImages[classLst[0]+typesId[1]] = iconUrl + "talent_druidferalcombat_r180.jpg";
	talentImages[classLst[0]+typesId[2]] = iconUrl + "talent_druid_restoration_1p11.jpg";
	
	talentImages[classLst[1]+typesId[3]] = iconUrl + "talent_hunterbeastmastery_r170.jpg";
	talentImages[classLst[1]+typesId[4]] = iconUrl + "talent_huntermarksmanship_r170.jpg";
	talentImages[classLst[1]+typesId[5]] = iconUrl + "talent_huntersurvival_r170.jpg";
	
	talentImages[classLst[2]+typesId[6]] = iconUrl + "talent_mage_arcane_1p11_2.jpg";
	talentImages[classLst[2]+typesId[7]] = iconUrl + "talent_mage_frost_1p11_2.jpg";
	talentImages[classLst[2]+typesId[8]] = iconUrl + "talent_mage_fire_1p11_2.jpg";
	
	talentImages[classLst[3]+typesId[9]] = iconUrl + "talent_paladinholy_r191.jpg";
	talentImages[classLst[3]+typesId[10]] = iconUrl + "talent_paladinprotection_r191.jpg";
	talentImages[classLst[3]+typesId[11]] = iconUrl + "talent_paladinretribution_r192.jpg";
	
	talentImages[classLst[4]+typesId[12]] = iconUrl + "talent_priestdiscipline_r1.10.jpg";
	talentImages[classLst[4]+typesId[13]] = iconUrl + "talent_priestholy_r1.10.jpg";
	talentImages[classLst[4]+typesId[14]] = iconUrl + "talent_priestshadow_r1.10.jpg";
	
	talentImages[classLst[5]+typesId[15]] = iconUrl + "talent_rogueassassination_r112.jpg";
	talentImages[classLst[5]+typesId[16]] = iconUrl + "talent_roguecombat_r112.jpg";
	talentImages[classLst[5]+typesId[17]] = iconUrl + "talent_roguesubtlety_r112.jpg";
	
	talentImages[classLst[6]+typesId[18]] = iconUrl + "talent_shaman_elementalcombat_1p11_2.jpg";
	talentImages[classLst[6]+typesId[19]] = iconUrl + "talent_shaman_enhancement_1p11.jpg";
	talentImages[classLst[6]+typesId[20]] = iconUrl + "talent_shaman_restoration_1p11_2.jpg";
	
	talentImages[classLst[7]+typesId[21]] = iconUrl + "talent_warlockaffliction_r1.jpg";
	talentImages[classLst[7]+typesId[22]] = iconUrl + "talent_warlockdemonology_r1.jpg";
	talentImages[classLst[7]+typesId[23]] = iconUrl + "talent_warlockdestruction_r1.jpg";
	
	talentImages[classLst[8]+typesId[24]] = iconUrl + "talent_warriorarms_r1.jpg";
	talentImages[classLst[8]+typesId[25]] = iconUrl + "talent_warriorfury_r1.jpg";
	talentImages[classLst[8]+typesId[26]] = iconUrl + "talent_warriorprotection_r1.jpg";
}


//awu	get ID from option
function OnSelectType(i) {
	//alert(i+":"+typesId[3*classId[i]]+":"+typesId[3*classId[i]+1]+":"+typesId[3*classId[i]+2]+"<br>");
	types = new Array(typesId[3*classId[i]],typesId[3*classId[i]+1],typesId[3*classId[i]+2]);
	currentType = types[0];

	var tt;
	tt = document.getElementById("type_0");
	tt.value = types[0];
	tt = document.getElementById("type_1");
	tt.value = types[1];
	tt = document.getElementById("type_2");
	tt.value = types[2];
}


function OnSelectRadio(radio_id){
//	var isChange = confirm("选择"+classLst[radio_id]+"，确认吗?");
//	if (isChange == true) {
	currentClass = classLst[radio_id];
	OnSelectType(currentClass);
	loadTalents();
	talents_main();
//	}
}

//----8<-------------------------------------------[2005/01/10 19:47:55]


function loadTalents(){

	talents = new Array();	//for quick
	loadType();
	showClassList();
	loadBigImage();
	if(chinese) {
		loadTalentsCn();
	} else {
		loadTalentsEn();
	}
}
function loadTalentsCn(){

if (currentClass == classLst[0]) {

	talents[225] = new Talent( "血之狂暴", "野性战斗", 4, 3, "Ability_GhoulFrenzy.png", "", "", "你在猎豹形态下的所有可增加连击点数的技能在对敌人造成致命一击之后有{0}的几率增加一个额外的连击点数。", new Array(), new Array(new TalentRequirement(223, 3)));
	talents[537] = new Talent( "精灵之火 (野兽)", "野性战斗", 5, 3, "Spell_Nature_FaerieFire.png", "", "30码有效距离<br>瞬发<br>6秒冷却时间<br>需要猎豹形态，熊形态，巨熊形态<br>", "使目标的护甲降低175点，持续40秒。在效果持续期间，目标无法潜行或隐形。<br><br>Rank 2: -285点护甲<br>Rank 3: -395点护甲<br>Rank 4: -505点护甲", new Array(), new Array());
	talents[540] = new Talent( "豹之迅捷", "野性战斗", 3, 1, "Spell_Nature_SpiritWolf.png", "", "", "使你在猎豹形态下的移动速度提高 {0}，并且提高在猎豹形态下的闪避几率 {1}，只能在户外生效。", new Array(), new Array());
	talents[786] = new Talent( "野性冲锋", "野性战斗", 3, 2, "Ability_Hunter_Pet_Bear.png", "", "5 怒气<br>瞬发法术<br>15 秒冷却时间<br>8-25 码距离<br>需要熊形态，巨熊形态<br>", "向目标冲锋，使其停止动作，并使其在4秒内不能施放任何法术。", new Array(), new Array());
	talents[220] = new Talent( "凶暴", "野性战斗", 1, 2, "Ability_Hunter_Pet_Hyena.png", "", "", "使你的槌击、挥击、爪击和扫击技能的怒气或能量消耗减少 {0} 怒气或精力点", new Array(), new Array());
	talents[190] = new Talent( "激怒", "恢复", 1, 3, "Spell_Holy_BlessingOfStamina.png", "", "", "在你进入熊形态和巨熊形态时有 {0} 的几率获得 10点 怒气值，或者在进入豹形态时获得 40点 精力。", new Array(), new Array());
	talents[784] = new Talent( "枭兽形态", "平衡", 7, 2, "Spell_Moonkin_Form.png", "", "684 法力<br>瞬发法术<br>", "德鲁依进入枭兽形态，在这种形态下，护甲值提高360%，半径30码范围内的所有队友的法术致命一击率都提高3%。枭兽形态下只能施放平衡系的法术。<br><br>变身可以解除施法者身上的所有变形和移动限制效果。", new Array(), new Array());
	talents[222] = new Talent( "野蛮冲撞", "野性战斗", 2, 2, "Ability_Druid_Bash.png", "", "", "使你的重击和突袭技能的击晕效果持续时间延长 {0}", new Array(), new Array());
	talents[221] = new Talent( "野性侵略", "野性战斗", 1, 3, "Ability_Druid_DemoralizingRoar.png", "", "", "使你的挫志咆哮的攻击强度减弱效果提高 {0}，凶猛撕咬所造成的伤害提高 {1}", new Array(), new Array());
	talents[526] = new Talent( "强化狂怒", "恢复", 2, 3, "Ability_Druid_Enrage.png", "", "", "使你的狂怒技能立即产生 {0} 怒气值。", new Array(), new Array());
	talents[207] = new Talent( "强化缠绕根须", "平衡", 2, 1, "Spell_Nature_StrangleVines.png", "", "", "使你有{0}的几率在施放纠缠根须时不会因为承受伤害而被打断。", new Array(), new Array());
	talents[192] = new Talent( "强化治疗之触", "恢复", 2, 1, "Spell_Nature_HealingTouch.png", "", "", "使你的治疗之触的施法时间减少 {0}", new Array(), new Array());
	talents[189] = new Talent( "强化野性印记", "恢复", 1, 2, "Spell_Nature_Regeneration.png", "", "", "使你的野性印记的效果提高{0}", new Array(), new Array());
	talents[208] = new Talent( "强化月火术", "平衡", 2, 2, "Spell_Nature_StarFall.png", "", "", "使你的月火术的伤害和致命一击几率提高{0}", new Array(), new Array());
	talents[782] = new Talent( "强化自然之握", "平衡", 1, 3, "Spell_Nature_NaturesWrath.png", "", "", "增加自然之握施展纠缠根须缠住敌人的几率{0}", new Array(), new Array(new TalentRequirement(781, 1)));
	talents[235] = new Talent( "兽群领袖", "野性战斗", 7, 2, "Spell_Holy_BlessingOfStamina.png", "", "", "在猎豹、熊或巨熊形态下，使半径45码范围内的所有小队成员的远程和近战攻击打出致命一击的几率提高3%。", new Array(), new Array());
	talents[542] = new Talent( "野蛮暴怒", "野性战斗", 5, 1, "Ability_Druid_Ravage.png", "", "", "使你的爪击、扫击、槌击和挥击技能所造成的伤害提高 {0}", new Array(), new Array());
	talents[532] = new Talent( "强化愈合", "恢复", 6, 3, "Spell_Nature_ResistNature.png", "", "", "使你的愈合法术产生极效治疗效果的几率提高{0}", new Array(), new Array());
	talents[198] = new Talent( "强化回春术", "恢复", 4, 4, "Spell_Nature_Rejuvenation.png", "", "", "使你的回春术的效果提高 {0}", new Array(), new Array());
	talents[227] = new Talent( "强化撕碎", "野性战斗", 4, 1, "INV_Misc_MonsterFang_01.png", "", "", "使你的撕碎技能所消耗的能量值减少 {0}", new Array(), new Array());
	talents[211] = new Talent( "强化星火术", "平衡", 4, 3, "Spell_Arcane_StarFire.png", "", "", "使你的星火术施法时间减少 {0} 秒，并且有 {1} 的几率将目标击昏3秒。", new Array(), new Array());
	talents[214] = new Talent( "强化荆棘术", "平衡", 3, 1, "Spell_Nature_Thorns.png", "", "", "使你的荆棘术对敌人造成的伤害提高 {0}", new Array(), new Array());
	talents[201] = new Talent( "强化宁静", "恢复", 5, 4, "Spell_Nature_Tranquility.png", "", "", "使你的宁静法术产生的威胁度降低 {0}", new Array(), new Array());
	talents[780] = new Talent( "强化愤怒", "平衡", 1, 1, "Spell_Nature_AbolishMagic.png", "", "", "使你的愤怒法术的施法时间减少{0}", new Array(), new Array());
	talents[788] = new Talent( "迅捷治疗", "恢复", 7, 2, "swiftmend.png", "", "20%基础法力值<br>40码有效距离<br>瞬发<br>15秒冷却时间<br>", "将友方目标身上的回春术或愈合效果转化为瞬发治疗，立即治疗目标相当于12秒的回春术治疗量，或者15秒的愈合治疗量。", new Array(), new Array(new TalentRequirement(529, 5)));
	talents[534] = new Talent( "月怒", "平衡", 6, 2, "Spell_Nature_MoonGlow.png", "", "", "使你的星火术、月火术和愤怒所能造成的伤害提高 {0}", new Array(), new Array(new TalentRequirement(544, 1)));
	talents[215] = new Talent( "月光", "平衡", 5, 3, "Spell_Nature_Sentinal.png", "", "", "使你的月火术、星火术、愤怒、治疗之触、愈合和回春术所消耗的法力值减少 {0}。", new Array(), new Array());
	talents[528] = new Talent( "自然赐福", "恢复", 5, 3, "Spell_Nature_ProtectionformNature.png", "", "", "使你的治疗法术的效果提高 {0}", new Array(), new Array(new TalentRequirement(527, 1)));
	talents[191] = new Talent( "自然集中", "恢复", 2, 2, "Spell_Nature_HealingWaveGreater.png", "", "", "使你在施放治疗之触、回春术和愈合时有 {0} 的几率不会因受到伤害而被打断。", new Array(), new Array());
	talents[544] = new Talent( "自然之赐", "平衡", 5, 2, "Spell_Nature_NaturesBlessing.png", "", "", "在你使用任何法术对目标造成致命一击效果之后使你获得自然的赐福，使你的下一个法术施法时间减少 0.5 秒。", new Array(), new Array());
	talents[781] = new Talent( "自然之握", "平衡", 1, 2, "Spell_Nature_NaturesWrath.png", "", "50法力值<br>瞬发<br>1分冷却时间<br>", "激活之后，任何击中施法者的敌人都有35%的几率被施展纠缠根须（等级 1）。只能在户外使用，可生效1次，持续45秒。<br><br>18级：纠缠根须（等级 1）<br>28级：纠缠根须（等级 2）<br>38级：纠缠根须（等级 3）<br>48级：纠缠根须（等级 4）<br>58级：纠缠根须（等级 5）", new Array(), new Array());
	talents[209] = new Talent( "自然延伸", "平衡", 3, 4, "Spell_Nature_NatureTouchGrow.png", "", "", "使你的愤怒、纠缠根须、精灵之火（人型状态下）、月火术和星火术的射程增加{0}", new Array(), new Array());
	talents[199] = new Talent( "自然迅捷", "恢复", 5, 1, "Spell_Nature_RavenForm.png", "", "瞬发法术<br>3分钟冷却时间<br>", "激活之后，你的下一个自然法术会成为瞬发法术。", new Array(), new Array(new TalentRequirement(192, 5)));
	talents[543] = new Talent( "清晰预兆", "平衡", 3, 3, "INV_Misc_Orb_01.png", "", "120法力值<br>瞬发<br>", "以自然的力量强化德鲁伊的武器，每次击中敌人都有一定几率令德鲁伊进入节能施法状态。该状态可以让你的下一个伤害或治疗法术所消耗的法力值降低100%。持续5分钟。", new Array(), new Array(new TalentRequirement(546, 5)));
	talents[536] = new Talent( "猛兽攻击", "野性战斗", 4, 2, "Ability_Hunter_Pet_Cat.png", "", "", "使你在猎豹、熊和巨熊形态下的攻击强度加成提高，数值相当于你的当前等级的 {0}", new Array(), new Array());
	talents[787] = new Talent( "原始狂怒", "野性战斗", 4, 4, "Ability_Racial_Cannibalize.png", "", "", "使你在熊形态和巨熊形态下对目标造成致命一击后，有 {0} 的几率获得 5 点怒气值", new Array(), new Array(new TalentRequirement(223, 3)));
	talents[234] = new Talent( "野性本能", "野性战斗", 2, 1, "Ability_Ambush.png", "", "", "使你在熊形态和巨熊形态下产生的威胁度提高 {0}，并且当你在潜行时可降低敌人侦测出你的几率。", new Array(), new Array());
	talents[530] = new Talent( "反射", "恢复", 3, 2, "Spell_Frost_WindWalkOn.png", "", "", "使你在施法时仍保持 {0} 的法力回复速度。", new Array(), new Array());
	talents[223] = new Talent( "锋利兽爪", "野性战斗", 3, 3, "INV_Misc_MonsterClaw_04.png", "", "", "使你在熊、巨熊或豹形态下的致命一击几率提高 {0}", new Array(), new Array());
	talents[541] = new Talent( "野性之心", "野性战斗", 6, 2, "Spell_Holy_BlessingOfAgility.png", "", "", "使你的智力提高 {0}。另外，当在熊或巨熊形态下耐力提高 {1}，当在豹形态下力量提高 {2}", new Array(), new Array(new TalentRequirement(536, 3)));
	talents[531] = new Talent( "微妙", "恢复", 3, 4, "Ability_EyeOfTheOwl.png", "", "", "使你的治疗法术造成的威胁值降低 {0}。", new Array(), new Array());
	talents[783] = new Talent( "自然变形", "平衡", 2, 4, "Spell_Nature_WispSplode.png", "", "", "使你的所有变形法术所消耗的法力值减少 {0}", new Array(), new Array());
	talents[539] = new Talent( "厚皮", "野性战斗", 2, 3, "INV_Misc_Pelt_Bear_03.png", "", "", "使你从装备上获得的护甲值提高 {0}", new Array(), new Array());
	talents[545] = new Talent( "复仇", "平衡", 4, 2, "Spell_Nature_Purge.png", "", "", "使你的星火术、月火术和愤怒的致命一击伤害提高 {0}。", new Array(), new Array(new TalentRequirement(208, 5)));
	talents[546] = new Talent( "自然武器", "平衡", 2, 3, "INV_Staff_01.png", "", "", "使你在所有形态下的所造成的物理攻击伤害提高 {0}", new Array(), new Array());
	talents[527] = new Talent( "虫群", "恢复", 3, 3, "Spell_Shadow_Contagion.png", "", "45点法力值<br>30码有效距离<br>瞬发<br>", "敌人被飞虫围绕，攻击命中率降低2%，在12秒内受到总计66点自然伤害。<br><br>Rank 2: 85法力值，138点伤害<br>Rank 3: 100法力值，174点伤害<br>Rank 4: 140法力值，264点伤害<br>Rank 5: 160法力值，324点伤害", new Array(), new Array());
	talents[529] = new Talent( "宁静之魂", "恢复", 4, 2, "Ability_Druid_Tranquil_Spirit.png", "", "", "使你的治疗之触和宁静所消耗的法力值减少 {0}。", new Array(), new Array());
	talents[225].Info[0] = new TalentInfo(1, "50%", "", "");
	talents[225].Info[1] = new TalentInfo(2, "100%", "", "");
	talents[537].Info[0] = new TalentInfo(1, "", "", "");
	talents[540].Info[0] = new TalentInfo(1, "", "", "");
	talents[786].Info[0] = new TalentInfo(1, "", "", "");
	talents[220].Info[0] = new TalentInfo(1, "1", "", "");
	talents[220].Info[1] = new TalentInfo(2, "2", "", "");
	talents[220].Info[2] = new TalentInfo(3, "3", "", "");
	talents[220].Info[3] = new TalentInfo(4, "4", "", "");
	talents[220].Info[4] = new TalentInfo(5, "5", "", "");
	talents[190].Info[0] = new TalentInfo(1, "20%", "", "");
	talents[190].Info[1] = new TalentInfo(2, "40%", "", "");
	talents[190].Info[2] = new TalentInfo(3, "60%", "", "");
	talents[190].Info[3] = new TalentInfo(4, "80%", "", "");
	talents[190].Info[4] = new TalentInfo(5, "100%", "", "");
	talents[528].Info[0] = new TalentInfo(1, "2%", "", "");
	talents[528].Info[1] = new TalentInfo(2, "4%", "", "");
	talents[528].Info[2] = new TalentInfo(3, "6%", "", "");
	talents[528].Info[3] = new TalentInfo(4, "8%", "", "");
	talents[528].Info[4] = new TalentInfo(5, "10%", "", "");
	talents[784].Info[0] = new TalentInfo(1, "", "", "");
	talents[222].Info[0] = new TalentInfo(1, "0.5 秒", "", "");
	talents[222].Info[1] = new TalentInfo(2, "1 秒", "", "");
	talents[221].Info[0] = new TalentInfo(1, "8%,3%", "", "");
	talents[221].Info[1] = new TalentInfo(2, "16%,6%", "", "");
	talents[221].Info[2] = new TalentInfo(3, "24%,9%", "", "");
	talents[221].Info[3] = new TalentInfo(4, "32%,12%", "", "");
	talents[221].Info[4] = new TalentInfo(5, "40%,15%", "", "");
	talents[526].Info[0] = new TalentInfo(1, "5 点", "", "");
	talents[526].Info[1] = new TalentInfo(2, "10 点", "", "");
	talents[207].Info[0] = new TalentInfo(1, "40%", "", "");
	talents[207].Info[1] = new TalentInfo(2, "70%", "", "");
	talents[207].Info[2] = new TalentInfo(3, "100%", "", "");
	talents[192].Info[0] = new TalentInfo(1, "0.1 秒", "", "");
	talents[192].Info[1] = new TalentInfo(2, "0.2 秒", "", "");
	talents[192].Info[2] = new TalentInfo(3, "0.3 秒", "", "");
	talents[192].Info[3] = new TalentInfo(4, "0.4 秒", "", "");
	talents[192].Info[4] = new TalentInfo(5, "0.5 秒", "", "");
	talents[189].Info[0] = new TalentInfo(1, "7%", "", "");
	talents[189].Info[1] = new TalentInfo(2, "14%", "", "");
	talents[189].Info[2] = new TalentInfo(3, "21%", "", "");
	talents[189].Info[3] = new TalentInfo(4, "28%", "", "");
	talents[189].Info[4] = new TalentInfo(5, "35%", "", "");
	talents[208].Info[0] = new TalentInfo(1, "2%", "", "");
	talents[208].Info[1] = new TalentInfo(2, "4%", "", "");
	talents[208].Info[2] = new TalentInfo(3, "6%", "", "");
	talents[208].Info[3] = new TalentInfo(4, "8%", "", "");
	talents[208].Info[4] = new TalentInfo(5, "10%", "", "");
	talents[782].Info[0] = new TalentInfo(1, "15%", "", "");
	talents[782].Info[1] = new TalentInfo(2, "30%", "", "");
	talents[782].Info[2] = new TalentInfo(3, "45%", "", "");
	talents[782].Info[3] = new TalentInfo(4, "65%", "", "");
	talents[235].Info[0] = new TalentInfo(1, "", "", "");
	talents[542].Info[0] = new TalentInfo(1, "10%", "", "");
	talents[542].Info[1] = new TalentInfo(2, "20%", "", "");
	talents[532].Info[0] = new TalentInfo(1, "10%", "", "");
	talents[532].Info[1] = new TalentInfo(2, "20%", "", "");
	talents[532].Info[2] = new TalentInfo(3, "30%", "", "");
	talents[532].Info[3] = new TalentInfo(4, "40%", "", "");
	talents[532].Info[4] = new TalentInfo(5, "50%", "", "");
	talents[198].Info[0] = new TalentInfo(1, "5%", "", "");
	talents[198].Info[1] = new TalentInfo(2, "10%", "", "");
	talents[198].Info[2] = new TalentInfo(3, "15%", "", "");
	talents[227].Info[0] = new TalentInfo(1, "6 点", "", "");
	talents[227].Info[1] = new TalentInfo(2, "12 点", "", "");
	talents[211].Info[0] = new TalentInfo(1, "0.1,3%", "", "");
	talents[211].Info[1] = new TalentInfo(2, "0.2,6%", "", "");
	talents[211].Info[2] = new TalentInfo(3, "0.3,9%", "", "");
	talents[211].Info[3] = new TalentInfo(4, "0.4,12%", "", "");
	talents[211].Info[4] = new TalentInfo(5, "0.5,15%", "", "");
	talents[214].Info[0] = new TalentInfo(1, "25%", "", "");
	talents[214].Info[1] = new TalentInfo(2, "50%", "", "");
	talents[214].Info[2] = new TalentInfo(3, "75%", "", "");
	talents[201].Info[0] = new TalentInfo(1, "40%", "", "");
	talents[201].Info[1] = new TalentInfo(2, "80%", "", "");
	talents[780].Info[0] = new TalentInfo(1, "0.1 秒", "", "");
	talents[780].Info[1] = new TalentInfo(2, "0.2 秒", "", "");
	talents[780].Info[2] = new TalentInfo(3, "0.3 秒", "", "");
	talents[780].Info[3] = new TalentInfo(4, "0.4 秒", "", "");
	talents[780].Info[4] = new TalentInfo(5, "0.5 秒", "", "");
	talents[788].Info[0] = new TalentInfo(1, "", "", "");
	talents[534].Info[0] = new TalentInfo(1, "2%", "", "");
	talents[534].Info[1] = new TalentInfo(2, "4%", "", "");
	talents[534].Info[2] = new TalentInfo(3, "6%", "", "");
	talents[534].Info[3] = new TalentInfo(4, "8%", "", "");
	talents[534].Info[4] = new TalentInfo(5, "10%", "", "");
	talents[215].Info[0] = new TalentInfo(1, "3%", "", "");
	talents[215].Info[1] = new TalentInfo(2, "6%", "", "");
	talents[215].Info[2] = new TalentInfo(3, "9%", "", "");
	talents[191].Info[0] = new TalentInfo(1, "14%", "", "");
	talents[191].Info[1] = new TalentInfo(2, "28%", "", "");
	talents[191].Info[2] = new TalentInfo(3, "42%", "", "");
	talents[191].Info[3] = new TalentInfo(4, "56%", "", "");
	talents[191].Info[4] = new TalentInfo(5, "70%", "", "");
	talents[544].Info[0] = new TalentInfo(1, "", "", "");
	talents[781].Info[0] = new TalentInfo(1, "", "", "");
	talents[209].Info[0] = new TalentInfo(1, "10%", "", "");
	talents[209].Info[1] = new TalentInfo(2, "20%", "", "");
	talents[199].Info[0] = new TalentInfo(1, "", "", "");
	talents[543].Info[0] = new TalentInfo(1, "", "", "");
	talents[536].Info[0] = new TalentInfo(1, "50%", "", "");
	talents[536].Info[1] = new TalentInfo(2, "100%", "", "");
	talents[536].Info[2] = new TalentInfo(3, "150%", "", "");
	talents[787].Info[0] = new TalentInfo(1, "50%", "", "");
	talents[787].Info[1] = new TalentInfo(2, "100%", "", "");
	talents[234].Info[0] = new TalentInfo(1, "25%", "", "");
	talents[530].Info[0] = new TalentInfo(1, "5%", "", "");
	talents[530].Info[1] = new TalentInfo(2, "10%", "", "");
	talents[530].Info[2] = new TalentInfo(3, "15%", "", "");
	talents[223].Info[0] = new TalentInfo(1, "2%", "", "");
	talents[223].Info[1] = new TalentInfo(2, "4%", "", "");
	talents[223].Info[2] = new TalentInfo(3, "6%", "", "");
	talents[234].Info[0] = new TalentInfo(1, "3%", "", "");
	talents[234].Info[1] = new TalentInfo(2, "6%", "", "");
	talents[234].Info[2] = new TalentInfo(3, "9%", "", "");
	talents[234].Info[3] = new TalentInfo(4, "12%", "", "");
	talents[234].Info[4] = new TalentInfo(5, "15%", "", "");
	talents[541].Info[0] = new TalentInfo(1, "4%,4%,4%", "", "");
	talents[541].Info[1] = new TalentInfo(2, "8%,8%,8%", "", "");
	talents[541].Info[2] = new TalentInfo(3, "12%,12%,12%", "", "");
	talents[541].Info[3] = new TalentInfo(4, "16%,16%,16%", "", "");
	talents[541].Info[4] = new TalentInfo(5, "20%,20%,20%", "", "");
	talents[531].Info[0] = new TalentInfo(1, "4%", "", "");
	talents[531].Info[1] = new TalentInfo(2, "8%", "", "");
	talents[531].Info[2] = new TalentInfo(3, "12%", "", "");
	talents[531].Info[3] = new TalentInfo(4, "16%", "", "");
	talents[531].Info[4] = new TalentInfo(5, "20%", "", "");
	talents[783].Info[0] = new TalentInfo(1, "10%", "", "");
	talents[783].Info[1] = new TalentInfo(2, "20%", "", "");
	talents[783].Info[2] = new TalentInfo(3, "30%", "", "");
	talents[539].Info[0] = new TalentInfo(1, "2%", "", "");
	talents[539].Info[1] = new TalentInfo(2, "4%", "", "");
	talents[539].Info[2] = new TalentInfo(3, "6%", "", "");
	talents[539].Info[3] = new TalentInfo(4, "8%", "", "");
	talents[539].Info[4] = new TalentInfo(5, "10%", "", "");
	talents[545].Info[0] = new TalentInfo(1, "20%", "", "");
	talents[545].Info[1] = new TalentInfo(2, "40%", "", "");
	talents[545].Info[2] = new TalentInfo(3, "60%", "", "");
	talents[545].Info[3] = new TalentInfo(4, "80%", "", "");
	talents[545].Info[4] = new TalentInfo(5, "100%", "", "");
	talents[546].Info[0] = new TalentInfo(1, "2%", "", "");
	talents[546].Info[1] = new TalentInfo(2, "4%", "", "");
	talents[546].Info[2] = new TalentInfo(3, "6%", "", "");
	talents[546].Info[3] = new TalentInfo(4, "8%", "", "");
	talents[546].Info[4] = new TalentInfo(5, "10%", "", "");	
	talents[540].Info[0] = new TalentInfo(1, "15%,2%", "", "");
	talents[540].Info[1] = new TalentInfo(2, "30%,4%", "", "");
	talents[527].Info[0] = new TalentInfo(2, "", "", "");
	talents[529].Info[0] = new TalentInfo(1, "2%", "", "");
	talents[529].Info[1] = new TalentInfo(2, "4%", "", "");
	talents[529].Info[2] = new TalentInfo(3, "6%", "", "");
	talents[529].Info[3] = new TalentInfo(4, "8%", "", "");
	talents[529].Info[4] = new TalentInfo(5, "10%", "", "");


//----8<-------------------------------------------

}
if (currentClass == classLst[1]) {

	talents[688] = new Talent( "瞄准射击", "射击", 3, 1, "INV_Spear_07.png", "", "68 法力值<br>3 秒施法时间<br>6 秒钟冷却时间<br>8-35码有效距离<br>需要远程武器<br>", "瞄准目标射击，使远程伤害提高70点。", new Array(), new Array());
	talents[690] = new Talent( "弹幕", "射击", 5, 2, "Ability_UpgradeMoonGlaive.png", "", "", "使你的多重射击和乱射法术的伤害提高 {0}", new Array(), new Array());
	talents[673] = new Talent( "野兽戒律", "野兽掌握", 5, 4, "Spell_Nature_AbolishMagic.png", "", "", "使你的宠物的集中值回复速度提高 {0}。", new Array(), new Array());
	talents[675] = new Talent( "野兽迅捷", "野兽掌握", 3, 2, "Ability_Druid_Dash.png", "", "", "使你的宠物在户外的移动速度提高30%。", new Array(), new Array());
	talents[711] = new Talent( "反击", "生存", 5, 3, "Ability_Warrior_Challange.png", "", "45 法力值<br>瞬发法术<br>5 秒冷却时间<br>5码有效距离<br>", "在招架敌人的攻击之后可以使用的技能，对敌人造成40点伤害，并使其无法行动，持续5秒。反击无法被格挡、躲闪或招架。", new Array(), new Array(new TalentRequirement(705, 1)));
	talents[708] = new Talent( "强化假死[Improved Feign Death]", "生存", 4, 4, "ImprovedFeignDeath.png", "", "", "使敌人抵抗你的假死技能的几率降低 {0}。", new Array(), new Array());
	talents[705] = new Talent( "威慑", "生存", 3, 3, "Ability_Whirlwind.png", "", "瞬发法术<br>5分钟冷却时间<br>", "激活之后，使你的躲闪和招架几率提高25%，持续10秒。", new Array(), new Array());
	talents[685] = new Talent( "效率", "射击", 1, 3, "Spell_Frost_WizardMark.png", "", "", "使你施放射击和钉刺技能所消耗的法力值减少 {0}", new Array(), new Array());
	talents[670] = new Talent( "耐久训练", "野兽掌握", 1, 3, "Spell_Nature_Reincarnation.png", "", "", "使你的宠物的生命值提高{0}", new Array(), new Array());
	talents[700] = new Talent( "诱捕", "生存", 2, 1, "Spell_Nature_StrangleVines.png", "", "", "使你的献祭陷阱、冰霜陷阱和爆炸陷阱有 {0} 的几率困住目标，令它们无法移动，持续5秒。", new Array(), new Array());
	talents[680] = new Talent( "凶暴", "野兽掌握", 4, 3, "INV_Misc_MonsterClaw_04.png", "", "", "使你的宠物打出致命一击的几率提高 {0}", new Array(), new Array());
	talents[682] = new Talent( "狂乱", "野兽掌握", 6, 3, "INV_Misc_MonsterClaw_03.png", "", "", "使你的宠物有{0}的几率在对敌人造成致命一击后获得攻击速度提高30%的效果，持续8秒。", new Array(), new Array(new TalentRequirement(680, 5)));
	talents[694] = new Talent( "鹰眼", "射击", 3, 4, "Ability_TownWatch.png", "", "", "使你的远程武器的射程延长 {0}", new Array(), new Array());
	talents[689] = new Talent( "强化奥术射击", "射击", 3, 2, "Ability_ImpalingBolt.png", "", "", "使你的奥术射击的冷却时间减少{0}", new Array(), new Array());
	talents[669] = new Talent( "强化雄鹰守护", "野兽掌握", 1, 2, "Spell_Nature_RavenForm.png", "", "", "当雄鹰守护处于激活状态时，所有普通的远程攻击都有{0}的几率使你的远程攻击速度提高30%，持续8秒。", new Array(), new Array());
	talents[672] = new Talent( "强化灵猴守护", "野兽掌握", 2, 2, "Ability_Hunter_AspectOfTheMonkey.png", "", "", "使你的灵猴守护提供{0}的额外躲闪几率。", new Array(), new Array());
	talents[684] = new Talent( "强化震荡射击", "射击", 1, 2, "Spell_Frost_Stun.png", "", "", "使你的震荡射击有 {0} 的几率令目标昏迷3秒", new Array(), new Array());
	talents[707] = new Talent( "稳固[Surefooted]", "生存", 4, 2, "Ability_Kick.png", "", "", "使你的攻击命中敌人的几率提高 {0}，并使你抵抗移动限制效果的几率提高 {1}。", new Array(), new Array());
	talents[671] = new Talent( "强化野兽之眼", "野兽掌握", 2, 1, "Ability_EyeOfTheOwl.png", "", "", "使你的野兽之眼的效果持续时间延长 {0}", new Array(), new Array());
	talents[706] = new Talent( "陷阱掌握[Trap Mastery]", "生存", 4, 1, "TrapMastery.png", "", "", "使敌人抵抗你的陷阱效果的几率降低 {0}。", new Array(), new Array());
	talents[686] = new Talent( "强化猎人印记", "射击", 2, 2, "Ability_Hunter_SniperShot.png", "", "", "使你的猎人印记法术所提供的远程攻击强度加成提高{0}", new Array(), new Array());
	talents[703] = new Talent( "陷阱增效[Trap Efficiency]", "生存", 3, 1, "TrapEfficiency.png", "", "", "使你的冰冻陷阱和冰霜陷阱的效果持续时间提高 {0}，献祭陷阱和爆炸陷阱所造成的伤害提高 {1}。", new Array(), new Array());
	talents[679] = new Talent( "强化治疗宠物", "野兽掌握", 4, 2, "Ability_Hunter_MendPet.png", "", "", "使你的治疗宠物法术有{0}的几率每5秒驱散宠物身上的1个诅咒、疾病、魔法或中毒效果。", new Array(), new Array());
	talents[704] = new Talent( "生存专家[Survivalist]", "生存", 3, 2, "Survivalist.png", "", "", "使你的生命上限提高{0}", new Array(), new Array());
	talents[699] = new Talent( "偏斜", "生存", 1, 3, "Ability_Parry.png", "", "", "使你的招架几率提高 {0}。", new Array(), new Array());
	talents[674] = new Talent( "强化复活宠物", "野兽掌握", 2, 4, "Ability_Hunter_BeastSoothe.png", "", "", "使你的复活宠物法术的施法时间减少{0}，法力值消耗降低{1}，宠物复活后的生命值提高{2}。", new Array(), new Array());
	talents[695] = new Talent( "强化毒蝎钉刺", "射击", 5, 3, "Ability_Hunter_CriticalShot.png", "", "", "使目标的力量因毒蝎钉刺的效果而降低时，其耐力也随之降低。耐力的降低值相当于力量降低值的{0}", new Array(), new Array());
	talents[691] = new Talent( "强化毒蛇钉刺", "射击", 4, 2, "Ability_Hunter_Quickshot.png", "", "", "使你的毒蛇钉刺所造成的伤害提高{0}", new Array(), new Array());
	talents[702] = new Talent( "强化摔绊", "生存", 2, 3, "Ability_Rogue_Trip.png", "", "", "使你的摔绊技能有 {0} 的几率令目标在5秒内无法移动。", new Array(), new Array());
	talents[681] = new Talent( "胁迫", "野兽掌握", 5, 2, "Ability_Devour.png", "", "137 法力值<br>瞬发法术<br>1 分钟冷却时间<br>100码有效距离<br>", "命令你的宠物在下次击中敌人时进行胁迫，造成大量的威胁值，并使目标昏迷3秒。", new Array(), new Array());
	talents[714] = new Talent( "翼龙钉刺", "生存", 7, 2, "WyvernSting.png", "", "115 法力值<br>瞬发法术<br>8-35 码有效距离<br>2 分钟冷却时间<br>", "钉刺目标，使其沉睡12秒。任何伤害都会取消沉睡效果。当目标醒来时，钉刺会在12秒内对其造成300点自然伤害。只能在非战斗状态下使用。每个猎人在同一时间内只能对一个目标使用一种钉刺，且同类钉刺无法叠加。", new Array(), new Array(new TalentRequirement(710, 3)));
	talents[687] = new Talent( "夺命射击", "射击", 2, 3, "Ability_SearingArrow.png", "", "", "使你的远程武器造成致命一击的几率提高{0}", new Array(), new Array());
	talents[701] = new Talent( "野蛮打击[Savage Strikes]", "生存", 2, 2, "Ability_Racial_BloodRage.png", "", "", "使你的猛禽一击和猫鼬撕咬的致命一击几率提高 {0}。", new Array(), new Array());
	talents[713] = new Talent( "闪电反射[Lightning Refexes]", "生存", 6, 3, "Spell_Nature_Invisibilty.png", "", "", "使你的敏捷提高{0}", new Array(), new Array());
	talents[692] = new Talent( "致死射击", "射击", 4, 3, "Ability_PierceDamage.png", "", "", "使你的远程武器致命一击伤害提高{0}", new Array(), new Array(new TalentRequirement(687, 5)));
	talents[677] = new Talent( "寻路", "野兽掌握", 3, 1, "Ability_Mount_JungleTiger.png", "", "", "使你的猎豹守护和豹群守护的速度加成效果提高 {0}。", new Array(), new Array());
	talents[698] = new Talent( "人型生物杀手[Humanoid Slaying]", "生存", 1, 2, "HumanoidSlaying.png", "", "", "使你对人型生物所造成的所有伤害提高 {0}，对人型生物所造成的致命一击伤害提高 {1}。", new Array(), new Array());
	talents[696] = new Talent( "远程武器专精", "射击", 6, 3, "INV_Weapon_Rifle_06.png", "", "", "使你的远程武器造成的伤害提高{0}", new Array(), new Array());
	talents[710] = new Talent( "杀戮本能[Killer Instinct]", "生存", 5, 2, "Spell_Holy_BlessingOfStamina.png", "", "", "使你的所有攻击造成致命一击的几率提高 {0}。", new Array(), new Array());
	talents[693] = new Talent( "驱散射击", "射击", 5, 1, "Ability_GolemStormBolt.png", "", "123 法力值<br>瞬发法术<br>30 秒冷却时间<br>15 码有效距离<br>需要远程武器<br>", "短程射击，对目标造成50%的武器伤害，并使其迷惑4秒。任何伤害都会解除这个效果。", new Array(), new Array());
	talents[683] = new Talent( "灵魂连接", "野兽掌握", 5, 1, "Ability_Druid_DemoralizingRoar.png", "", "", "当你的宠物被激活后，你和你的宠物都会每10秒回复 {0} 的生命值。", new Array(), new Array());
	talents[678] = new Talent( "厚皮", "野兽掌握", 2, 3, "INV_Misc_Pelt_Bear_03.png", "", "", "使你的宠物的护甲值提高{0}", new Array(), new Array());
	talents[697] = new Talent( "强击光环", "射击", 7, 2, "Ability_TrueShot.png", "", "325 法力值<br>瞬发法术<br>", "使半径45码范围内的小队成员的远程和近战攻击强度提高50点，持续30分钟。", new Array(), new Array(new TalentRequirement(694, 3)));
	talents[676] = new Talent( "狂怒释放", "野兽掌握", 3, 3, "Ability_BullRush.png", "", "", "使你的宠物所造成的伤害提高{0}", new Array(), new Array());
	talents[836] = new Talent( "狂野怒火", "野兽掌握", 7, 2, "BestialWrath.png", "", "12% 基础法力值<br>瞬发法术<br>2 分钟冷却时间<br>100 码有效距离<br>", "使宠物进入疯狂状态，对目标造成的伤害提高50%，持续18秒。在这种状态下，宠物不会有任何恐惧和怜悯，也无法停止下来，除非被杀死。", new Array(), new Array(new TalentRequirement(681, 1)));
	talents[837] = new Talent( "野兽杀手[Monster Slaying]", "生存", 1, 1, "MonsterSlaying.png", "", "", "使你对野兽、巨人和龙类所造成的所有伤害提高 {0}，对野兽、巨人和龙类所造成的致命一击伤害提高 {1}。", new Array(), new Array());
	talents[837].Info[0] = new TalentInfo(1, "1%,1%", "", "");
	talents[837].Info[1] = new TalentInfo(2, "2%,2%", "", "");
	talents[837].Info[2] = new TalentInfo(3, "3%,3%", "", "");
	talents[836].Info[0] = new TalentInfo(1, "", "", "");
	talents[688].Info[0] = new TalentInfo(1, "", "", "");
	talents[683].Info[0] = new TalentInfo(1, "1%", "", "");
	talents[683].Info[1] = new TalentInfo(2, "2%", "", "");
	talents[690].Info[0] = new TalentInfo(1, "5%", "", "");
	talents[690].Info[1] = new TalentInfo(2, "10%", "", "");
	talents[690].Info[2] = new TalentInfo(3, "15%", "", "");
	talents[673].Info[0] = new TalentInfo(1, "10%", "", "");
	talents[673].Info[1] = new TalentInfo(2, "20%", "", "");
	talents[675].Info[0] = new TalentInfo(1, "30%", "", "");
	talents[711].Info[0] = new TalentInfo(1, "", "", "");
	talents[708].Info[0] = new TalentInfo(1, "2%", "", "");
	talents[708].Info[1] = new TalentInfo(2, "4%", "", "");
	talents[705].Info[0] = new TalentInfo(1, "", "", "");
	talents[685].Info[0] = new TalentInfo(1, "2%", "", "");
	talents[685].Info[1] = new TalentInfo(2, "4%", "", "");
	talents[685].Info[2] = new TalentInfo(3, "6%", "", "");
	talents[685].Info[3] = new TalentInfo(4, "8%", "", "");
	talents[685].Info[4] = new TalentInfo(5, "10%", "", "");
	talents[670].Info[0] = new TalentInfo(1, "3%", "", "");
	talents[670].Info[1] = new TalentInfo(2, "6%", "", "");
	talents[670].Info[2] = new TalentInfo(3, "9%", "", "");
	talents[670].Info[3] = new TalentInfo(4, "12%", "", "");
	talents[670].Info[4] = new TalentInfo(5, "15%", "", "");
	talents[700].Info[0] = new TalentInfo(1, "5%", "", "");
	talents[700].Info[1] = new TalentInfo(2, "10%", "", "");
	talents[700].Info[2] = new TalentInfo(3, "15%", "", "");
	talents[700].Info[3] = new TalentInfo(4, "20%", "", "");
	talents[700].Info[4] = new TalentInfo(5, "25%", "", "");
	talents[680].Info[0] = new TalentInfo(1, "3%", "", "");
	talents[680].Info[1] = new TalentInfo(2, "6%", "", "");
	talents[680].Info[2] = new TalentInfo(3, "9%", "", "");
	talents[680].Info[3] = new TalentInfo(4, "12%", "", "");
	talents[680].Info[4] = new TalentInfo(5, "15%", "", "");
	talents[682].Info[0] = new TalentInfo(1, "20%", "", "");
	talents[682].Info[1] = new TalentInfo(2, "40%", "", "");
	talents[682].Info[2] = new TalentInfo(3, "60%", "", "");
	talents[682].Info[3] = new TalentInfo(4, "80%", "", "");
	talents[682].Info[4] = new TalentInfo(5, "100%", "", "");
	talents[694].Info[0] = new TalentInfo(1, "2 码", "", "");
	talents[694].Info[1] = new TalentInfo(2, "4 码", "", "");
	talents[694].Info[2] = new TalentInfo(3, "6 码", "", "");
	talents[689].Info[0] = new TalentInfo(1, "0.2 秒", "", "");
	talents[689].Info[1] = new TalentInfo(2, "0.4 秒", "", "");
	talents[689].Info[2] = new TalentInfo(3, "0.6 秒", "", "");
	talents[689].Info[3] = new TalentInfo(4, "0.8 秒", "", "");
	talents[689].Info[4] = new TalentInfo(5, "1 秒", "", "");
	talents[669].Info[0] = new TalentInfo(1, "1%", "", "");
	talents[669].Info[1] = new TalentInfo(2, "2%", "", "");
	talents[669].Info[2] = new TalentInfo(3, "3%", "", "");
	talents[669].Info[3] = new TalentInfo(4, "4%", "", "");
	talents[669].Info[4] = new TalentInfo(5, "5%", "", "");
	talents[672].Info[0] = new TalentInfo(1, "1%", "", "");
	talents[672].Info[1] = new TalentInfo(2, "2%", "", "");
	talents[672].Info[2] = new TalentInfo(3, "3%", "", "");
	talents[672].Info[3] = new TalentInfo(4, "4%", "", "");
	talents[672].Info[4] = new TalentInfo(5, "5%", "", "");
	talents[684].Info[0] = new TalentInfo(1, "4%", "", "");
	talents[684].Info[1] = new TalentInfo(2, "8%", "", "");
	talents[684].Info[2] = new TalentInfo(3, "12%", "", "");
	talents[684].Info[3] = new TalentInfo(4, "16%", "", "");
	talents[684].Info[4] = new TalentInfo(5, "20%", "", "");
	talents[707].Info[0] = new TalentInfo(1, "1%,5%", "", "");
	talents[707].Info[1] = new TalentInfo(2, "2%,10%", "", "");
	talents[707].Info[2] = new TalentInfo(3, "3%,15%", "", "");
	talents[671].Info[0] = new TalentInfo(1, "30 秒", "", "");
	talents[671].Info[1] = new TalentInfo(2, "60 秒", "", "");
	talents[706].Info[0] = new TalentInfo(1, "5%", "", "");
	talents[706].Info[1] = new TalentInfo(2, "10%", "", "");
	talents[686].Info[0] = new TalentInfo(1, "3%", "", "");
	talents[686].Info[1] = new TalentInfo(2, "6%", "", "");
	talents[686].Info[2] = new TalentInfo(3, "9%", "", "");
	talents[686].Info[3] = new TalentInfo(4, "12%", "", "");
	talents[686].Info[4] = new TalentInfo(5, "15%", "", "");
	talents[703].Info[0] = new TalentInfo(1, "15%,15%", "", "");
	talents[703].Info[1] = new TalentInfo(2, "30%,30%", "", "");
	talents[679].Info[0] = new TalentInfo(1, "15%", "", "");
	talents[679].Info[1] = new TalentInfo(2, "50%", "", "");
	talents[704].Info[0] = new TalentInfo(1, "2%", "", "");
	talents[704].Info[1] = new TalentInfo(2, "4%", "", "");
	talents[704].Info[2] = new TalentInfo(3, "6%", "", "");
	talents[704].Info[3] = new TalentInfo(4, "8%", "", "");
	talents[704].Info[4] = new TalentInfo(5, "10%", "", "");
	talents[699].Info[0] = new TalentInfo(1, "1%", "", "");
	talents[699].Info[1] = new TalentInfo(2, "2%", "", "");
	talents[699].Info[2] = new TalentInfo(3, "3%", "", "");
	talents[699].Info[3] = new TalentInfo(4, "4%", "", "");
	talents[699].Info[4] = new TalentInfo(5, "5%", "", "");
	talents[674].Info[0] = new TalentInfo(1, "3 秒,20%,15%", "", "");
	talents[674].Info[1] = new TalentInfo(2, "6 秒,40%,30%", "", "");
	talents[695].Info[0] = new TalentInfo(1, "10%", "", "");
	talents[695].Info[1] = new TalentInfo(2, "20%", "", "");
	talents[695].Info[2] = new TalentInfo(3, "30%", "", "");
	talents[691].Info[0] = new TalentInfo(1, "2%", "", "");
	talents[691].Info[1] = new TalentInfo(2, "4%", "", "");
	talents[691].Info[2] = new TalentInfo(3, "6%", "", "");
	talents[691].Info[3] = new TalentInfo(4, "8%", "", "");
	talents[691].Info[4] = new TalentInfo(5, "10%", "", "");
	talents[702].Info[0] = new TalentInfo(1, "4%", "", "");
	talents[702].Info[1] = new TalentInfo(2, "8%", "", "");
	talents[702].Info[2] = new TalentInfo(3, "12%", "", "");
	talents[702].Info[3] = new TalentInfo(4, "16%", "", "");
	talents[702].Info[4] = new TalentInfo(5, "20%", "", "");
	talents[681].Info[0] = new TalentInfo(1, "", "", "");
	talents[714].Info[0] = new TalentInfo(1, "", "", "");
	talents[687].Info[0] = new TalentInfo(1, "1%", "", "");
	talents[687].Info[1] = new TalentInfo(2, "2%", "", "");
	talents[687].Info[2] = new TalentInfo(3, "3%", "", "");
	talents[687].Info[3] = new TalentInfo(4, "4%", "", "");
	talents[687].Info[4] = new TalentInfo(5, "5%", "", "");
	talents[701].Info[0] = new TalentInfo(1, "10%", "", "");
	talents[701].Info[1] = new TalentInfo(2, "20%", "", "");
	talents[713].Info[0] = new TalentInfo(1, "3%", "", "");
	talents[713].Info[1] = new TalentInfo(2, "6%", "", "");
	talents[713].Info[2] = new TalentInfo(3, "9%", "", "");
	talents[713].Info[3] = new TalentInfo(4, "12%", "", "");
	talents[713].Info[4] = new TalentInfo(5, "15%", "", "");
	talents[692].Info[0] = new TalentInfo(1, "6%", "", "");
	talents[692].Info[1] = new TalentInfo(2, "12%", "", "");
	talents[692].Info[2] = new TalentInfo(3, "18%", "", "");
	talents[692].Info[3] = new TalentInfo(4, "24%", "", "");
	talents[692].Info[4] = new TalentInfo(5, "30%", "", "");
	talents[677].Info[0] = new TalentInfo(1, "3%", "", "");
	talents[677].Info[1] = new TalentInfo(2, "6%", "", "");
	talents[698].Info[0] = new TalentInfo(1, "1%,1%", "", "");
	talents[698].Info[1] = new TalentInfo(2, "2%,2%", "", "");
	talents[698].Info[2] = new TalentInfo(3, "3%,3%", "", "");
	talents[696].Info[0] = new TalentInfo(1, "1%", "", "");
	talents[696].Info[1] = new TalentInfo(2, "2%", "", "");
	talents[696].Info[2] = new TalentInfo(3, "3%", "", "");
	talents[696].Info[3] = new TalentInfo(4, "4%", "", "");
	talents[696].Info[4] = new TalentInfo(5, "5%", "", "");
	talents[710].Info[0] = new TalentInfo(1, "1%", "", "");
	talents[710].Info[1] = new TalentInfo(2, "2%", "", "");
	talents[710].Info[2] = new TalentInfo(3, "3%", "", "");
	talents[693].Info[0] = new TalentInfo(1, "", "", "");
	talents[678].Info[0] = new TalentInfo(1, "10%", "", "");
	talents[678].Info[1] = new TalentInfo(2, "20%", "", "");
	talents[678].Info[2] = new TalentInfo(3, "30%", "", "");
	talents[697].Info[0] = new TalentInfo(1, "", "", "");
	talents[676].Info[0] = new TalentInfo(1, "4%", "", "");
	talents[676].Info[1] = new TalentInfo(2, "8%", "", "");
	talents[676].Info[2] = new TalentInfo(3, "12%", "", "");
	talents[676].Info[3] = new TalentInfo(4, "16%", "", "");
	talents[676].Info[4] = new TalentInfo(5, "20%", "", "");
//----8<-------------------------------------------[


}
if (currentClass == classLst[2]) {
	talents[313] = new Talent( "强化奥术飞弹", "奥术", 1, 3, "Spell_Nature_StarFall.png", "", "", "使你有{0}的几率在施放奥术飞弹时不会因为受到伤害而中断施法。", new Array(), new Array());
	
	talents[487] = new Talent( "奥术精妙", "奥术", 1, 1, "Spell_Holy_DispelMagic.png", "", "", "使你的目标对你的所有法术抗性降低 {0}，并使你的奥术系法术所造成的威胁值降低 {1} 。", new Array(), new Array());
	
	talents[315] = new Talent( "奥术专注", "奥术", 2, 3, "Spell_Shadow_ManaBurn.png", "", "", "使你有 {0} 的几率在施放任何一种伤害性法术之后进入节能施法状态。节能施法状态可以使你的下一个伤害性法术所消耗的法力值减少100%。", new Array(), new Array());
	
	talents[314] = new Talent( "魔杖专精", "奥术", 2, 1, "INV_Wand_01.png", "", "", "使你的魔杖造成的伤害提高 {0}", new Array(), new Array());
	
	talents[312] = new Talent( "奥术集中", "奥术", 1, 2, "Spell_Holy_Devotion.png", "", "", "使你的敌人抵抗你的奥术魔法的几率降低 {0}", new Array(), new Array());
	
	talents[563] = new Talent( "魔法协调", "奥术", 3, 1, "Spell_Nature_AbolishMagic.png", "", "", "使你的魔法增效和魔法抑制的效果提高 {0}。", new Array(), new Array());
	
	talents[564] = new Talent( "强化魔爆术", "奥术", 3, 2, "Spell_Nature_WispSplode.png", "", "", "使你的魔爆术的致命一击率提高 {0}。", new Array(), new Array());
	
	talents[759] = new Talent( "奥术活力", "奥术", 3, 3, "arcaneresilience.png", "", "", "使你的护甲值提高，数值相当于智力的50%。", new Array(), new Array());
	
	talents[566] = new Talent( "强化法力护盾", "奥术", 4, 1, "Spell_Shadow_DetectLesserInvisibility.png", "", "", "使你的法力护盾所吸收的伤害值提高 {0}。", new Array(), new Array());
	
	talents[567] = new Talent( "强化法术反制", "奥术", 4, 2, "Spell_Frost_IceShock.png", "", "", "使你的法术反制有 {0} 的几率使目标沉默4秒。", new Array(), new Array());
	
	talents[760] = new Talent( "奥术冥想", "奥术", 4, 4, "Spell_Shadow_SiphonMana.png", "", "", "使你在施法时仍保持 {0} 的法力回复速度。", new Array(), new Array());
	
	talents[569] = new Talent( "气定神闲", "奥术", 5, 2, "Spell_Nature_EnchantArmor.png", "", "瞬发法术<br>3分钟冷却时间<br>", "激活之后，你的下一个施法时间低于10秒的法师法术会成为瞬发法术。", new Array(), new Array());
	
	talents[761] = new Talent( "奥术心智", "奥术", 5, 3, "Spell_Shadow_Charm.png", "", "", "使你的法力值上限提高{0}。", new Array(), new Array(new TalentRequirement(759, 1)));
	
	talents[571] = new Talent( "奥术增效", "奥术", 6, 2, "Spell_Shadow_Teleport.png", "", "", "使你的法术伤害和重击几率提高{0}", new Array(), new Array(new TalentRequirement(569, 1)));
	
	talents[572] = new Talent( "奥术能量", "奥术", 7, 2, "Spell_Nature_Lightning.png", "", "瞬发法术<br>3分钟冷却时间<br>", "激活之后，你的法术伤害提高30%，法力消耗也提高30%，该效果持续15秒。", new Array(), new Array(new TalentRequirement(571, 3)));
	
	talents[840] = new Talent( "魔法吸收", "奥术", 2, 2, "Spell_Nature_AstralRecal.png", "", "", "使你的所有魔法抗性提高 {0}，并且当你抵抗掉一个魔法后你的法力将回复你法力值上限的 {1}。", new Array(), new Array());
	
	talents[236] = new Talent( "强化火球术", "火焰", 1, 2, "Spell_Fire_FlameBolt.png", "", "", "使你的火球术的施法时间减少{0}", new Array(), new Array());
	
	talents[237] = new Talent( "冲击", "火焰", 1, 3, "Spell_Fire_MeteorStorm.png", "", "", "使你的火焰魔法有 {0} 的几率令目标昏迷2秒。", new Array(), new Array());
	
	talents[547] = new Talent( "点燃", "火焰", 2, 1, "Spell_Fire_Incinerate.png", "", "", "你的火焰法术在造成致命一击后使目标燃烧，令其在4秒内承受相当于该法术伤害 {0} 的额外伤害。", new Array(), new Array());
	
	talents[548] = new Talent( "烈焰投掷", "火焰", 2, 2, "Spell_Fire_Flare.png", "", "", "使你的火焰法术的射程增加 {0}。", new Array(), new Array());
	
	talents[238] = new Talent( "强化火焰冲击", "火焰", 2, 3, "Spell_Fire_Fireball.png", "", "", "使你的火焰冲击的冷却时间减少 {0}。", new Array(), new Array());
	
	talents[549] = new Talent( "烧尽", "火焰", 3, 1, "Spell_Fire_FlameShock.png", "", "", "使你的火焰冲击和灼烧法术的致命一击率提高{0}", new Array(), new Array());
	
	talents[550] = new Talent( "炎爆术", "火焰", 3, 3, "Spell_Fire_Fireball02.png", "", "125 法力值<br>6 秒施法时间<br>35码有效距离<br>", "发射一枚巨大的火球，对目标造成148到195点火焰伤害，并在12秒内造成总计56点额外伤害。", new Array(), new Array());
	
	talents[240] = new Talent( "强化烈焰风暴", "火焰", 3, 2, "Spell_Fire_SelfDestruct.png", "", "", "使你的烈焰风暴造成致命一击的几率提高{0}。", new Array(), new Array());
	
	talents[241] = new Talent( "燃烧之魂", "火焰", 3, 4, "Spell_Fire_Fire.png", "", "", "使你的火焰系法术有 {0} 的几率在受到伤害时不被干扰而增加施法时间，并且你的所有火焰系法术所产生的威胁值降低 {1}。", new Array(), new Array());
	
	talents[493] = new Talent( "强化灼烧", "火焰", 4, 1, "Spell_Fire_SoulBurn.png", "", "", "使你的灼烧法术有 {0} 的几率令目标更容易受到火焰伤害，在其受到火焰系攻击时承受的伤害提高3%，持续30秒。最多可叠加5次。", new Array(), new Array());
	
	talents[551] = new Talent( "强化火焰防护结界", "火焰", 4, 2, "Spell_Fire_FireArmor.png", "", "", "使你的火焰防护结界有 {0} 的几率反射火焰系法术。", new Array(), new Array());
	
	talents[611] = new Talent( "元素大师", "火焰", 4, 4, "masterofelements.png", "", "", "你的火焰系和冰霜系法术产生致命一击后会返回 {0} 的法力值消耗。", new Array(), new Array());
	
	talents[552] = new Talent( "火焰重击", "火焰", 5, 2, "Spell_Nature_WispHeal.png", "", "", "使你的火焰法术造成致命一击的几率提高{0}。", new Array(), new Array());
	
	talents[553] = new Talent( "冲击波", "火焰", 5, 3, "Spell_Holy_Excorcism_02.png", "", "215点法力值<br>瞬发法术<br>45秒冷却时间<br>", "施法者放出一道火焰冲击波，所有被冲击波触及的敌人都会受到160至192点火焰伤害并眩晕6秒。", new Array(), new Array(new TalentRequirement(550, 1)));
	
	talents[554] = new Talent( "火焰强化", "火焰", 6, 3, "Spell_Fire_Immolation.png", "", "", "使你的火焰法术造成的伤害提高{0}。", new Array(), new Array());
	
	talents[555] = new Talent( "燃烧", "火焰", 7, 2, "Spell_Fire_SealOfFire.png", "", "瞬发法术<br>3分钟冷却时间<br>", "激活之后，你施放的每个火焰系伤害法术都令你的火焰系伤害法术的致命一击几率提高提高10%，该效果将持续到你的火焰系法术造成3次致命一击。", new Array(), new Array(new TalentRequirement(552, 3)));
	
	talents[248] = new Talent( "强化冰霜新星", "冰霜", 2, 3, "Spell_Frost_FrostNova.png", "", "", "使你的冰霜新星的冷却时间减少 {0}。", new Array(), new Array());
	
	talents[24] = new Talent( "强化寒冰箭", "冰霜", 1, 2, "Spell_Frost_FrostBolt02.png", "", "", "使你的寒冰箭的施法时间减少 {0}。", new Array(), new Array());
	
	talents[245] = new Talent( "极寒冰霜", "冰霜", 2, 4, "Spell_Frost_Wisp.png", "", "", "使你的冰冷效果的持续时间延长 {0}，令目标减速的效果提高 {1}。", new Array(), new Array());
	
	talents[762] = new Talent( "寒冰碎片", "冰霜", 2, 1, "Spell_Frost_IceShard.png", "", "", "使你的冰霜法术致命一击所造成的伤害提高{0}", new Array(), new Array());
	
	talents[255] = new Talent( "冰霜障壁", "冰霜", 1, 1, "Spell_Frost_FrostWard.png", "", "", "使你的霜甲术和冰甲术所提供的护甲值和抗性值效果提高 {0} 。另外，你的防护冰霜结界有 {1} 的几率将冰霜系法术和魔法效果放射给施法者。", new Array(), new Array());
	
	talents[258] = new Talent( "霜寒刺骨", "冰霜", 2, 2, "Spell_Frost_FrostArmor.png", "", "", "使你的寒冷效果有 {0} 的几率将目标冻结5秒。", new Array(), new Array());
	
	talents[556] = new Talent( "刺骨寒冰", "冰霜", 3, 1, "Spell_Frost_Frostbolt.png", "", "", "使你的冰霜法术所造成的伤害提高{0}", new Array(), new Array());
	
	talents[557] = new Talent( "急速冷却", "冰霜", 3, 2, "Spell_Frost_WizardMark.png", "", "瞬发法术<br>10分钟冷却时间<br>", "激活之后，使你的所有冰霜法术的冷却时间结束。", new Array(), new Array());
	
	talents[562] = new Talent( "强化暴风雪", "冰霜", 3, 4, "Spell_Frost_IceStorm.png", "", "", "为你的暴风雪法术增加冰冷效果，使目标的移动速度降低 {0}，持续 1.50 秒。", new Array(), new Array());
	
	talents[558] = new Talent( "极寒延伸", "冰霜", 4, 1, "Spell_Shadow_DarkRitual.png", "", "", "使你的冰霜新星和冰锥术的有效半径以及寒冰箭的射程和暴风雪的法术范围增加 {0}。", new Array(), new Array());
	
	talents[559] = new Talent( "冰霜导能", "冰霜", 4, 2, "Spell_Frost_Stun.png", "", "", "使你的所有冰霜法术所消耗的法力值减少 {0} ，冰霜法术所造成的威胁值降低 {1} 。", new Array(), new Array());
	
	talents[789] = new Talent( "碎冰", "冰霜", 4, 3, "Spell_Frost_FrostShock.png", "", "", "使你的所有法术在击中被冰冻的敌人时造成致命一击的几率提高 {0}。", new Array(), new Array(new TalentRequirement(248, 2)));
	
	talents[560] = new Talent( "寒冰屏障", "冰霜", 5, 2, "Spell_Frost_Frost.png", "", "15 法力值<br>瞬发法术<br>5分钟冷却时间<br>", "你被一道寒冰屏障所笼罩，在10秒内不会受到任何物理和法术伤害，但是在这期间你也无法攻击、移动或施法。", new Array(), new Array());
	
	talents[256] = new Talent( "强化冰锥术", "冰霜", 5, 3, "Spell_Frost_Glacier.png", "", "", "使你的冰锥术所造成的伤害提高{0}", new Array(), new Array());
	
	talents[561] = new Talent( "寒冰护体", "冰霜", 7, 2, "Spell_Ice_Lament.png", "", "305 法力值<br>瞬发法术<br>30秒冷却时间<br>", "立即为目标加上魔法护盾，可吸收438点伤害，持续1分钟。只要护盾存在，受保护者的施法就不会被打断。<br><br>Rank 2: 吸收549点伤害<br>Rank 3: 吸收678点伤害<br>Rank 4: 吸收818点伤害", new Array(), new Array(new TalentRequirement(560, 1)));
	
	talents[247] = new Talent( "深冬之寒", "冰霜", 6, 3, "Spell_Frost_ChillingBlast.png", "", "", "使你的冰霜系伤害法术有 {0} 的几率附加深冬之寒的效果，令冰霜系法术对目标造成致命一击的几率提高2%，该效果持续15秒。可叠加最多5次。", new Array(), new Array());
	
	talents[841] = new Talent( "元素专注", "冰霜", 1, 3, "Spell_Ice_MagicDamage.png", "", "", "使你的目标抵抗火焰和冰霜系法术的几率降低 {0}。", new Array(), new Array());
	
	talents[315].Info[0] = new TalentInfo(1, "2%", "", "");
	talents[315].Info[1] = new TalentInfo(2, "4%", "", "");
	talents[315].Info[2] = new TalentInfo(3, "6%", "", "");
	talents[315].Info[3] = new TalentInfo(4, "8%", "", "");
	talents[315].Info[4] = new TalentInfo(5, "10%", "", "");
	talents[312].Info[0] = new TalentInfo(1, "2%", "", "");
	talents[312].Info[1] = new TalentInfo(2, "4%", "", "");
	talents[312].Info[2] = new TalentInfo(3, "6%", "", "");
	talents[312].Info[3] = new TalentInfo(4, "8%", "", "");
	talents[312].Info[4] = new TalentInfo(5, "10%", "", "");
	talents[487].Info[0] = new TalentInfo(1, "5 点,20%", "", "");
	talents[487].Info[1] = new TalentInfo(2, "10 点,40%", "", "");
	talents[571].Info[0] = new TalentInfo(1, "1%", "", "");
	talents[571].Info[1] = new TalentInfo(2, "2%", "", "");
	talents[571].Info[2] = new TalentInfo(3, "3%", "", "");
	talents[760].Info[0] = new TalentInfo(1, "5%", "", "");
	talents[760].Info[1] = new TalentInfo(2, "10%", "", "");
	talents[760].Info[2] = new TalentInfo(3, "15%", "", "");
	talents[761].Info[0] = new TalentInfo(1, "2%", "", "");
	talents[761].Info[1] = new TalentInfo(2, "4%", "", "");
	talents[761].Info[2] = new TalentInfo(3, "6%", "", "");
	talents[761].Info[3] = new TalentInfo(4, "8%", "", "");
	talents[761].Info[4] = new TalentInfo(5, "10%", "", "");
	talents[572].Info[0] = new TalentInfo(1, "", "", "");
	talents[558].Info[0] = new TalentInfo(1, "10%", "", "");
	talents[558].Info[1] = new TalentInfo(2, "20%", "", "");
	talents[553].Info[0] = new TalentInfo(1, "", "", "");
	talents[557].Info[0] = new TalentInfo(1, "", "", "");
	talents[555].Info[0] = new TalentInfo(1, "", "", "");
	talents[551].Info[0] = new TalentInfo(1, "10%", "", "");
	talents[551].Info[1] = new TalentInfo(2, "20%", "", "");
	talents[552].Info[0] = new TalentInfo(1, "2%", "", "");
	talents[552].Info[1] = new TalentInfo(2, "4%", "", "");
	talents[552].Info[2] = new TalentInfo(3, "6%", "", "");
	talents[759].Info[0] = new TalentInfo(1, "", "", "");
	talents[554].Info[0] = new TalentInfo(1, "2%", "", "");
	talents[554].Info[1] = new TalentInfo(2, "4%", "", "");
	talents[554].Info[2] = new TalentInfo(3, "6%", "", "");
	talents[554].Info[3] = new TalentInfo(4, "8%", "", "");
	talents[554].Info[4] = new TalentInfo(5, "10%", "", "");
	talents[548].Info[0] = new TalentInfo(1, "3 码", "", "");
	talents[548].Info[1] = new TalentInfo(2, "6 码", "", "");
	talents[559].Info[0] = new TalentInfo(1, "5%,10%", "", "");
	talents[559].Info[1] = new TalentInfo(2, "10%,20%", "", "");
	talents[559].Info[2] = new TalentInfo(3, "15%,30%", "", "");
	talents[611].Info[0] = new TalentInfo(1, "10%", "", "");
	talents[611].Info[1] = new TalentInfo(2, "20%", "", "");
	talents[611].Info[2] = new TalentInfo(3, "30%", "", "");
	talents[258].Info[0] = new TalentInfo(1, "5%", "", "");
	talents[258].Info[1] = new TalentInfo(2, "10%", "", "");
	talents[258].Info[2] = new TalentInfo(3, "15%", "", "");
	talents[561].Info[0] = new TalentInfo(1, "", "", "");
	talents[560].Info[0] = new TalentInfo(1, "", "", "");
	talents[762].Info[0] = new TalentInfo(1, "20%", "", "");
	talents[762].Info[1] = new TalentInfo(2, "40%", "", "");
	talents[762].Info[2] = new TalentInfo(3, "60%", "", "");
	talents[762].Info[3] = new TalentInfo(4, "80%", "", "");
	talents[762].Info[4] = new TalentInfo(5, "100%", "", "");
	talents[547].Info[0] = new TalentInfo(1, "8%", "", "");
	talents[547].Info[1] = new TalentInfo(2, "16%", "", "");
	talents[547].Info[2] = new TalentInfo(3, "24%", "", "");
	talents[547].Info[3] = new TalentInfo(4, "32%", "", "");
	talents[547].Info[4] = new TalentInfo(5, "40%", "", "");
	talents[237].Info[0] = new TalentInfo(1, "2%", "", "");
	talents[237].Info[1] = new TalentInfo(2, "4%", "", "");
	talents[237].Info[2] = new TalentInfo(3, "6%", "", "");
	talents[237].Info[3] = new TalentInfo(4, "8%", "", "");
	talents[237].Info[4] = new TalentInfo(5, "10%", "", "");
	talents[238].Info[0] = new TalentInfo(1, "0.5 秒", "", "");
	talents[238].Info[1] = new TalentInfo(2, "1 秒", "", "");
	talents[238].Info[2] = new TalentInfo(3, "1.5 秒", "", "");
	talents[563].Info[0] = new TalentInfo(1, "25%", "", "");
	talents[563].Info[1] = new TalentInfo(2, "50%", "", "");
	talents[564].Info[0] = new TalentInfo(1, "2%", "", "");
	talents[564].Info[1] = new TalentInfo(2, "4%", "", "");
	talents[564].Info[2] = new TalentInfo(3, "6%", "", "");
	talents[313].Info[0] = new TalentInfo(1, "20%", "", "");
	talents[313].Info[1] = new TalentInfo(2, "40%", "", "");
	talents[313].Info[2] = new TalentInfo(3, "60%", "", "");
	talents[313].Info[3] = new TalentInfo(4, "80%", "", "");
	talents[313].Info[4] = new TalentInfo(5, "100%", "", "");
	talents[562].Info[0] = new TalentInfo(1, "30%", "", "");
	talents[562].Info[1] = new TalentInfo(2, "50%", "", "");
	talents[562].Info[2] = new TalentInfo(3, "65%", "", "");
	talents[256].Info[0] = new TalentInfo(1, "15%", "", "");
	talents[256].Info[1] = new TalentInfo(2, "25%", "", "");
	talents[256].Info[2] = new TalentInfo(3, "35%", "", "");
	talents[566].Info[0] = new TalentInfo(1, "10%", "", "");
	talents[566].Info[1] = new TalentInfo(2, "20%", "", "");
	talents[567].Info[0] = new TalentInfo(1, "50%", "", "");
	talents[567].Info[1] = new TalentInfo(2, "100%", "", "");
	talents[236].Info[0] = new TalentInfo(1, "0.1 秒", "", "");
	talents[236].Info[1] = new TalentInfo(2, "0.2 秒", "", "");
	talents[236].Info[2] = new TalentInfo(3, "0.3 秒", "", "");
	talents[236].Info[3] = new TalentInfo(4, "0.4 秒", "", "");
	talents[236].Info[4] = new TalentInfo(5, "0.5 秒", "", "");
	talents[240].Info[0] = new TalentInfo(1, "5%", "", "");
	talents[240].Info[1] = new TalentInfo(2, "10%", "", "");
	talents[240].Info[2] = new TalentInfo(3, "15%", "", "");
	talents[241].Info[0] = new TalentInfo(1, "35%,15%", "", "");
	talents[241].Info[1] = new TalentInfo(2, "70%,30%", "", "");
	talents[248].Info[0] = new TalentInfo(1, "2 秒", "", "");
	talents[248].Info[1] = new TalentInfo(2, "4 秒", "", "");
	talents[255].Info[0] = new TalentInfo(1, "15%,10%", "", "");
	talents[255].Info[1] = new TalentInfo(2, "30%,20%", "", "");
	talents[24].Info[0] = new TalentInfo(1, "0.1 秒", "", "");
	talents[24].Info[1] = new TalentInfo(2, "0.2 秒", "", "");
	talents[24].Info[2] = new TalentInfo(3, "0.3 秒", "", "");
	talents[24].Info[3] = new TalentInfo(4, "0.4 秒", "", "");
	talents[24].Info[4] = new TalentInfo(5, "0.5 秒", "", "");
	talents[493].Info[0] = new TalentInfo(1, "33%", "", "");
	talents[493].Info[1] = new TalentInfo(2, "66%", "", "");
	talents[493].Info[2] = new TalentInfo(3, "100%", "", "");
	talents[549].Info[0] = new TalentInfo(1, "2%", "", "");
	talents[549].Info[1] = new TalentInfo(2, "4%", "", "");
	talents[245].Info[0] = new TalentInfo(1, "1 秒,4%", "", "");
	talents[245].Info[1] = new TalentInfo(2, "2 秒,7%", "", "");
	talents[245].Info[2] = new TalentInfo(3, "3 秒,10%", "", "");
	talents[556].Info[0] = new TalentInfo(1, "2%", "", "");
	talents[556].Info[1] = new TalentInfo(2, "4%", "", "");
	talents[556].Info[2] = new TalentInfo(3, "6%", "", "");
	talents[569].Info[0] = new TalentInfo(1, "", "", "");
	talents[550].Info[0] = new TalentInfo(1, "", "", "");
	talents[789].Info[0] = new TalentInfo(1, "10%", "", "");
	talents[789].Info[1] = new TalentInfo(2, "20%", "", "");
	talents[789].Info[2] = new TalentInfo(3, "30%", "", "");
	talents[789].Info[3] = new TalentInfo(4, "40%", "", "");
	talents[789].Info[4] = new TalentInfo(5, "50%", "", "");
	talents[314].Info[0] = new TalentInfo(1, "13%", "", "");
	talents[314].Info[1] = new TalentInfo(2, "25%", "", "");
	talents[247].Info[0] = new TalentInfo(1, "20%", "", "");
	talents[247].Info[1] = new TalentInfo(2, "40%", "", "");
	talents[247].Info[2] = new TalentInfo(3, "60%", "", "");
	talents[247].Info[3] = new TalentInfo(4, "80%", "", "");
	talents[247].Info[4] = new TalentInfo(5, "100%", "", "");
	talents[840].Info[0] = new TalentInfo(1, "2 点,1%", "", "");
	talents[840].Info[1] = new TalentInfo(2, "4 点,2%", "", "");
	talents[840].Info[2] = new TalentInfo(3, "6 点,3%", "", "");
	talents[840].Info[3] = new TalentInfo(4, "8 点,4%", "", "");
	talents[840].Info[4] = new TalentInfo(5, "10 点,5%", "", "");
	talents[841].Info[0] = new TalentInfo(1, "2%", "", "");
	talents[841].Info[1] = new TalentInfo(2, "4%", "", "");
	talents[841].Info[2] = new TalentInfo(3, "6%", "", "");

//----8<-------------------------------------------[


}
if (currentClass == classLst[3]) {
	talents[753] = new Talent( "正义追击", "惩戒", 3, 4, "Paladin_Pursuit_of_Justice.png", "", "", "使圣骑士的移动速度和乘骑速度提高{0}。这个效果不能和其它加速效果叠加。", new Array(), new Array());
	talents[747] = new Talent( "祈福", "惩戒", 1, 3, "Spell_Frost_WindWalkOn.png", "", "", "使你的惩戒系法术所消耗的法力值减少{0}", new Array(), new Array());
	talents[758] = new Talent( "王者祝福", "防护", 3, 1, "Spell_Magic_MageArmor.png", "", "75 法力值<br>瞬发法术<br>30 码有效距离<br>", "为友方目标施加祝福，使其所有属性提高 10%，持续 5 分钟。每个圣骑士在同一时间内只能给目标施加一种祝福，同类型的祝福不能重叠。", new Array(), new Array());
	talents[734] = new Talent( "庇护祝福", "防护", 5, 2, "Spell_Nature_LightningShield.png", "", "45 法力值<br>瞬发法术<br>30码有效距离<br>", "为友方目标施加祝福，使其所受到的所有类型的伤害都减少最多7点，持续5分钟。另外，当目标成功格档住一次近战攻击后攻击者将受到 10 点神圣伤害。每个圣骑士在同一时间内只能给目标施加一种祝福，同类型的祝福不能重叠。", new Array(), new Array());
	talents[756] = new Talent( "奉献", "神圣", 3, 2, "Spell_Holy_InnerFire.png", "", "135 法力值<br>瞬发法术<br>8秒冷却时间<br>", "将圣洁的能量灌入圣骑士脚下的土地，在 8 秒内对进入该区域的所有敌人造成 64 点神圣伤害。", new Array(), new Array());
	talents[757] = new Talent( "定罪", "惩戒", 3, 2, "Spell_Holy_RetributionAura.png", "", "", "使你用近战武器对敌人造成致命一击的几率提高 {0}。", new Array(), new Array());
	talents[750] = new Talent( "偏斜", "惩戒", 2, 3, "Ability_Parry.png", "", "", "使你的招架几率提高 {0}。", new Array(), new Array());
	talents[728] = new Talent( "神圣之力", "神圣", 1, 2, "Ability_GolemThunderClap.png", "", "", "使你的力量提高 {0}", new Array(), new Array());
	talents[725] = new Talent( "神圣智慧", "神圣", 1, 3, "Spell_Nature_Sleep.png", "", "", "使你的智力上限提高 {0}", new Array(), new Array());
	talents[742] = new Talent( "神圣之盾", "防护", 7, 2, "Spell_Holy_BlessingOfProtection.png", "", "140 法力值<br>瞬发法术<br>10秒冷却时间<br>需要盾牌<br>", "使你的格挡几率提高30%，持续10秒。在此期间每次成功格挡都会对攻击者造成50点神圣伤害，每次成功格挡会消耗掉一次格挡机会，最多可格挡4次。", new Array(), new Array(new TalentRequirement(734, 1)));
	talents[729] = new Talent( "神圣震击", "神圣", 7, 2, "Spell_Holy_SearingLight.png", "", "255法力值<br>瞬发法术<br>30秒冷却时间<br>20码有效距离<br>", "以神圣的能量冲击目标，对敌人造成204到220点神圣伤害，或者对友方造成204到220点治疗。", new Array(), new Array(new TalentRequirement(721, 1)));
	talents[719] = new Talent( "启发", "神圣", 4, 2, "Spell_Holy_GreaterHeal.png", "", "", "在你的圣光闪现或圣光术造成极效治疗效果之后，使你有 {0} 的几率回复施法所消耗的法力值。", new Array(), new Array());
	talents[737] = new Talent( "预知", "防护", 3, 4, "Spell_Magic_LesserInvisibilty.png", "", "", "使你的防御技能提高 {0}。", new Array(), new Array());
	talents[746] = new Talent( "强化力量祝福", "惩戒", 1, 2, "Spell_Holy_FistOfJustice.png", "", "", "使你的力量祝福所提供的攻击强度加成提高{0}", new Array(), new Array());
	talents[732] = new Talent( "守护者的宠爱", "防护", 2, 2, "Spell_Holy_SealOfProtection.png", "", "", "使你的保护祝福的冷却时间减少{0}，并使你的自由祝福的持续时间延长{1}。", new Array(), new Array());
	talents[743] = new Talent( "强化制裁之锤", "防护", 4, 2, "Spell_Holy_SealOfProtection.png", "", "", "使你的制裁之锤的冷却时间减少 {0}。", new Array(), new Array());
	talents[720] = new Talent( "强化智慧祝福", "神圣", 4, 3, "Spell_Holy_SealOfWisdom.png", "", "", "使你的智慧祝福的效果提高 {0}。", new Array(), new Array());
	talents[730] = new Talent( "强化虔诚光环", "防护", 1, 2, "Spell_Holy_DevotionAura.png", "", "", "使你的虔诚光环提供额外护甲值的效果增强{0}", new Array(), new Array());
	talents[723] = new Talent( "不灭信仰", "神圣", 3, 4, "Paladin_Unyielding_Faith.png", "", "", "使你抵抗恐惧和魅惑效果的几率提高 {0}。", new Array(), new Array());
	talents[717] = new Talent( "治愈之光", "神圣", 3, 1, "Spell_Holy_HolyBolt.png", "", "", "使你的圣光术和圣光闪现的治疗量提高 {0}", new Array(), new Array());
	talents[715] = new Talent( "强化圣疗术", "神圣", 3, 3, "Spell_Holy_LayOnHands.png", "", "", "被你的圣疗术治疗的目标因装备而获得的护甲值提高 {0}，持续 5 分钟。另外，你的圣疗术的法术冷却时间将减少 {1} 分钟。", new Array(), new Array());
	talents[754] = new Talent( "强化惩戒光环", "惩戒", 4, 3, "Spell_Holy_AuraOfLight.png", "", "", "使你的惩戒光环所能造成的伤害提高{0}", new Array(), new Array(new TalentRequirement(752, 1)));
	talents[735] = new Talent( "强化正义之怒", "防护", 3, 2, "Spell_Holy_SealOfFury.png", "", "", "使你的正义之怒所产生的威胁值提高 {0}。", new Array(), new Array());
	talents[738] = new Talent( "精确", "防护", 2, 1, "Ability_Rogue_Ambush.png", "", "", "使你的近战武器击中敌人的几率提高 {0}。", new Array(), new Array());
	talents[727] = new Talent( "持久审判", "神圣", 5, 3, "Spell_Holy_HealingAura.png", "", "", "使你的光明审判和智慧审判的持续时间延长 {0}。", new Array(), new Array());
	talents[722] = new Talent( "强化正义圣印", "神圣", 2, 3, "Ability_ThunderBolt.png", "", "", "使你的正义圣印所能造成的伤害提高 {0}", new Array(), new Array());
	talents[749] = new Talent( "强化十字军圣印", "惩戒", 2, 2, "Spell_Holy_HolySmite.png", "", "", "使你的十字军圣印的攻击强度加成和十字军审判所能造成的神圣伤害提高 {0}。", new Array(), new Array());
	talents[744] = new Talent( "单手武器专精", "防护", 6, 3, "INV_Sword_20.png", "", "", "使你的单手近战武器所能造成的伤害提高{0}", new Array(), new Array());
	talents[755] = new Talent( "双手武器专精", "惩戒", 5, 1, "INV_Hammer_04.png", "", "", "使你的双手近战武器造成的伤害提高 {0}。", new Array(), new Array());
	talents[741] = new Talent( "清算", "防护", 5, 3, "Spell_Holy_BlessingOfStrength.png", "", "", "使你在遭受致命一击之后有{0}的几率获得一次额外的攻击机会。", new Array(), new Array());
	talents[731] = new Talent( "盾牌壁垒", "防护", 1, 3, "Ability_Defend.png", "", "", "使你在遭受致命一击之后使用盾牌格挡攻击的几率提高{0}。持续10秒或格挡5次攻击。", new Array(), new Array());
	talents[745] = new Talent( "忏悔", "惩戒", 7, 2, "Spell_Holy_PrayerOfHealing.png", "", "60 法力值<br>瞬发法术<br>1分钟冷却时间<br>20码有效距离<br>", "使目标进入冥想状态，最多持续6秒。任何伤害都会唤醒目标。只对人型生物有效。", new Array(), new Array());
	talents[718] = new Talent( "神圣强化", "神圣", 6, 3, "Paladin_Holy_Power.png", "", "", "使你的神圣系法术造成致命一击的几率提高 {0}。", new Array(), new Array());
	talents[752] = new Talent( "命令圣印", "惩戒", 3, 3, "Ability_Warrior_InnerRage.png", "", "63法力值<br>瞬发法术<br>", "命令之魂充满圣骑士的体内，持续30秒，使其有一定几率对目标造成相当于与圣骑士的武器伤害总量70%的神圣伤害。圣骑士在同一时间内只能激活一种圣印。<br><br>释放这种圣印的能量将对目标造成审判效果，立即造成45到49点神圣伤害。如果在此期间该目标被击昏，它就会受到137到147点神圣伤害。", new Array(), new Array());
	talents[736] = new Talent( "盾牌专精", "防护", 3, 3, "INV_Shield_06.png", "", "", "使你的盾牌所能吸收的伤害提高 {0}。", new Array(), new Array(new TalentRequirement(731, 5)));
	talents[716] = new Talent( "精神集中", "神圣", 2, 2, "Spell_Arcane_Blink.png", "", "", "使你的圣光闪现和圣光术有 {0} 的几率在受到伤害时不会延长施法时间。", new Array(), new Array());
	talents[733] = new Talent( "坚韧", "防护", 2, 4, "Spell_Holy_Devotion.png", "", "", "使你因装备而获得的护甲值提高{0}", new Array(), new Array());
	talents[748] = new Talent( "辩护", "惩戒", 3, 1, "Paladin_Vindication.png", "", "", "圣骑士的近战攻击有可能使目标的力量和敏捷降低 {0}，持续10秒钟。", new Array(), new Array());
	talents[751] = new Talent( "复仇", "惩戒", 6, 2, "Ability_Racial_Avatar.png", "", "", "使你在对敌人造成致命一击之后有 {0} 的物理和神圣伤害加成，持续8秒。", new Array(), new Array(new TalentRequirement(757, 5)));
	talents[724] = new Talent( "强化专注光环", "防护", 4, 3, "Spell_Holy_MindSooth.png", "", "", "使你的专注光环的效果提高 {0}，并且受作用的友方目标抵抗沉默和打断施法技能的能力提高 {1}。", new Array(), new Array());
	talents[709] = new Talent( "强化审判", "惩戒", 2, 1, "Spell_Holy_RighteousFury.png", "", "", "使你的审判的法术冷却时间减少 {0}。", new Array(), new Array());
	talents[712] = new Talent( "以眼还眼", "惩戒", 4, 1, "Paladin_Eye_for_an_Eye.png", "", "", "圣骑士在受到法术致命一击后，将把{0}的伤害反馈给施法者。但该技能产生的伤害数值不会超过圣骑士生命值总量的50%。", new Array(), new Array());
	talents[721] = new Talent( "神恩术", "神圣", 5, 2, "Spell_Holy_Heal.png", "", "60 法力值<br>瞬发法术<br>2分钟冷却时间<br>", "激活之后，使你的下一个圣光闪现或圣光术有 100% 的几率造成极效治疗效果。", new Array(), new Array(new TalentRequirement(719, 5)));
	talents[726] = new Talent( "圣洁光环", "惩戒", 5, 3, "Spell_Holy_MindVision.png", "", "瞬发法术", "使半径 30 码范围内的队友的神圣系攻击对敌人造成的伤害提高 10%。每个圣骑士在同一时间内只能开启一种光环，且同类光环的效果无法叠加。", new Array(), new Array());
	talents[726].Info[0] = new TalentInfo(1, "", "", "");
	talents[753].Info[0] = new TalentInfo(1, "4%", "", "");
	talents[753].Info[1] = new TalentInfo(2, "8%", "", "");
	talents[747].Info[0] = new TalentInfo(1, "3%", "", "");
	talents[747].Info[1] = new TalentInfo(2, "6%", "", "");
	talents[747].Info[2] = new TalentInfo(3, "9%", "", "");
	talents[747].Info[3] = new TalentInfo(4, "12%", "", "");
	talents[747].Info[4] = new TalentInfo(5, "15%", "", "");
	talents[758].Info[0] = new TalentInfo(1, "", "", "");
	talents[734].Info[0] = new TalentInfo(1, "", "", "");
	talents[756].Info[0] = new TalentInfo(1, "", "", "");
	talents[721].Info[0] = new TalentInfo(1, "", "", "");
	talents[757].Info[0] = new TalentInfo(1, "1%", "", "");
	talents[757].Info[1] = new TalentInfo(2, "2%", "", "");
	talents[757].Info[2] = new TalentInfo(3, "3%", "", "");
	talents[757].Info[3] = new TalentInfo(4, "4%", "", "");
	talents[757].Info[4] = new TalentInfo(5, "5%", "", "");
	talents[750].Info[0] = new TalentInfo(1, "1%", "", "");
	talents[750].Info[1] = new TalentInfo(2, "2%", "", "");
	talents[750].Info[2] = new TalentInfo(3, "3%", "", "");
	talents[750].Info[3] = new TalentInfo(4, "4%", "", "");
	talents[750].Info[4] = new TalentInfo(5, "5%", "", "");
	talents[728].Info[0] = new TalentInfo(1, "2%", "", "");
	talents[728].Info[1] = new TalentInfo(2, "4%", "", "");
	talents[728].Info[2] = new TalentInfo(3, "6%", "", "");
	talents[728].Info[3] = new TalentInfo(4, "8%", "", "");
	talents[728].Info[4] = new TalentInfo(5, "10%", "", "");
	talents[725].Info[0] = new TalentInfo(1, "2%", "", "");
	talents[725].Info[1] = new TalentInfo(2, "4%", "", "");
	talents[725].Info[2] = new TalentInfo(3, "6%", "", "");
	talents[725].Info[3] = new TalentInfo(4, "8%", "", "");
	talents[725].Info[4] = new TalentInfo(5, "10%", "", "");
	talents[742].Info[0] = new TalentInfo(1, "", "", "");
	talents[729].Info[0] = new TalentInfo(1, "", "", "");
	talents[719].Info[0] = new TalentInfo(1, "20%", "", "");
	talents[719].Info[1] = new TalentInfo(2, "40%", "", "");
	talents[719].Info[2] = new TalentInfo(3, "60%", "", "");
	talents[719].Info[3] = new TalentInfo(4, "80%", "", "");
	talents[719].Info[4] = new TalentInfo(5, "100%", "", "");
	talents[737].Info[0] = new TalentInfo(1, "2", "", "");
	talents[737].Info[1] = new TalentInfo(2, "4", "", "");
	talents[737].Info[2] = new TalentInfo(3, "6", "", "");
	talents[737].Info[3] = new TalentInfo(4, "8", "", "");
	talents[737].Info[4] = new TalentInfo(5, "10", "", "");
	talents[746].Info[0] = new TalentInfo(1, "4%", "", "");
	talents[746].Info[1] = new TalentInfo(2, "8%", "", "");
	talents[746].Info[2] = new TalentInfo(3, "12%", "", "");
	talents[746].Info[3] = new TalentInfo(4, "16%", "", "");
	talents[746].Info[4] = new TalentInfo(5, "20%", "", "");
	talents[732].Info[0] = new TalentInfo(1, "60秒,3秒", "", "");
	talents[732].Info[1] = new TalentInfo(2, "120秒,6秒", "", "");
	talents[743].Info[0] = new TalentInfo(1, "5 秒", "", "");
	talents[743].Info[1] = new TalentInfo(2, "10 秒", "", "");
	talents[743].Info[2] = new TalentInfo(3, "15 秒", "", "");
	talents[720].Info[0] = new TalentInfo(1, "10%", "", "");
	talents[720].Info[1] = new TalentInfo(2, "20%", "", "");
	talents[730].Info[0] = new TalentInfo(1, "5%", "", "");
	talents[730].Info[1] = new TalentInfo(2, "10%", "", "");
	talents[730].Info[2] = new TalentInfo(3, "15%", "", "");
	talents[730].Info[3] = new TalentInfo(4, "20%", "", "");
	talents[730].Info[4] = new TalentInfo(5, "25%", "", "");
	talents[723].Info[0] = new TalentInfo(1, "5%", "", "");
	talents[723].Info[1] = new TalentInfo(2, "10%", "", "");
	talents[717].Info[0] = new TalentInfo(1, "4%", "", "");
	talents[717].Info[1] = new TalentInfo(2, "8%", "", "");
	talents[717].Info[2] = new TalentInfo(3, "12%", "", "");
	talents[715].Info[0] = new TalentInfo(1, "25%,10", "", "");
	talents[715].Info[1] = new TalentInfo(2, "50%,20", "", "");
	talents[754].Info[0] = new TalentInfo(1, "25%", "", "");
	talents[754].Info[1] = new TalentInfo(2, "50%", "", "");
	talents[735].Info[0] = new TalentInfo(1, "16%", "", "");
	talents[735].Info[1] = new TalentInfo(2, "33%", "", "");
	talents[735].Info[2] = new TalentInfo(3, "50%", "", "");
	talents[738].Info[0] = new TalentInfo(1, "1%", "", "");
	talents[738].Info[1] = new TalentInfo(2, "2%", "", "");
	talents[738].Info[2] = new TalentInfo(3, "3%", "", "");
	talents[727].Info[0] = new TalentInfo(1, "10 秒", "", "");
	talents[727].Info[1] = new TalentInfo(2, "20 秒", "", "");
	talents[727].Info[2] = new TalentInfo(3, "30 秒", "", "");
	talents[722].Info[0] = new TalentInfo(1, "3%", "", "");
	talents[722].Info[1] = new TalentInfo(2, "6%", "", "");
	talents[722].Info[2] = new TalentInfo(3, "9%", "", "");
	talents[722].Info[3] = new TalentInfo(4, "12%", "", "");
	talents[722].Info[4] = new TalentInfo(5, "15%", "", "");
	talents[749].Info[0] = new TalentInfo(1, "5%", "", "");
	talents[749].Info[1] = new TalentInfo(2, "10%", "", "");
	talents[749].Info[2] = new TalentInfo(3, "15%", "", "");
	talents[744].Info[0] = new TalentInfo(1, "2%", "", "");
	talents[744].Info[1] = new TalentInfo(2, "4%", "", "");
	talents[744].Info[2] = new TalentInfo(3, "6%", "", "");
	talents[744].Info[3] = new TalentInfo(4, "8%", "", "");
	talents[744].Info[4] = new TalentInfo(5, "10%", "", "");
	talents[755].Info[0] = new TalentInfo(1, "2%", "", "");
	talents[755].Info[1] = new TalentInfo(2, "4%", "", "");
	talents[755].Info[2] = new TalentInfo(3, "6%", "", "");
	talents[741].Info[0] = new TalentInfo(1, "20%", "", "");
	talents[741].Info[1] = new TalentInfo(2, "40%", "", "");
	talents[741].Info[2] = new TalentInfo(3, "60%", "", "");
	talents[741].Info[3] = new TalentInfo(4, "80%", "", "");
	talents[741].Info[4] = new TalentInfo(5, "100%", "", "");
	talents[731].Info[0] = new TalentInfo(1, "6%", "", "");
	talents[731].Info[1] = new TalentInfo(2, "12%", "", "");
	talents[731].Info[2] = new TalentInfo(3, "18%", "", "");
	talents[731].Info[3] = new TalentInfo(4, "24%", "", "");
	talents[731].Info[4] = new TalentInfo(5, "30%", "", "");
	talents[745].Info[0] = new TalentInfo(1, "", "", "");
	talents[718].Info[0] = new TalentInfo(1, "1%", "", "");
	talents[718].Info[1] = new TalentInfo(2, "2%", "", "");
	talents[718].Info[2] = new TalentInfo(3, "3%", "", "");
	talents[718].Info[3] = new TalentInfo(4, "4%", "", "");
	talents[718].Info[4] = new TalentInfo(5, "5%", "", "");
	talents[752].Info[0] = new TalentInfo(1, "", "", "");
	talents[736].Info[0] = new TalentInfo(1, "10%", "", "");
	talents[736].Info[1] = new TalentInfo(2, "20%", "", "");
	talents[736].Info[2] = new TalentInfo(3, "30%", "", "");
	talents[716].Info[0] = new TalentInfo(1, "14%", "", "");
	talents[716].Info[1] = new TalentInfo(2, "28%", "", "");
	talents[716].Info[2] = new TalentInfo(3, "42%", "", "");
	talents[716].Info[3] = new TalentInfo(4, "56%", "", "");
	talents[716].Info[4] = new TalentInfo(5, "70%", "", "");
	talents[733].Info[0] = new TalentInfo(1, "2%", "", "");
	talents[733].Info[1] = new TalentInfo(2, "4%", "", "");
	talents[733].Info[2] = new TalentInfo(3, "6%", "", "");
	talents[733].Info[3] = new TalentInfo(4, "8%", "", "");
	talents[733].Info[4] = new TalentInfo(5, "10%", "", "");
	talents[748].Info[0] = new TalentInfo(1, "5%", "", "");
	talents[748].Info[1] = new TalentInfo(2, "10%", "", "");
	talents[748].Info[2] = new TalentInfo(3, "15%", "", "");
	talents[751].Info[0] = new TalentInfo(1, "3%", "", "");
	talents[751].Info[1] = new TalentInfo(2, "6%", "", "");
	talents[751].Info[2] = new TalentInfo(3, "9%", "", "");
	talents[751].Info[3] = new TalentInfo(4, "12%", "", "");
	talents[751].Info[4] = new TalentInfo(5, "15%", "", "");
	talents[724].Info[0] = new TalentInfo(1, "5%,5%", "", "");
	talents[724].Info[1] = new TalentInfo(2, "10%,10%", "", "");
	talents[724].Info[2] = new TalentInfo(3, "15%,15%", "", "");
	talents[709].Info[0] = new TalentInfo(1, "1 秒", "", "");
	talents[709].Info[1] = new TalentInfo(2, "2 秒", "", "");
	talents[712].Info[0] = new TalentInfo(1, "15%", "", "");
	talents[712].Info[1] = new TalentInfo(2, "30%", "", "");


//----8<-------------------------------------------[


}
if (currentClass == classLst[4]) {
	talents[161] = new Talent( "昏厥", "暗影", 1, 3, "Spell_Shadow_GatherShadows.png", "", "", "使你的暗影系伤害性法术有{0}的几率令目标昏迷3秒。", new Array(), new Array());
	talents[774] = new Talent( "黑暗", "暗影", 6, 3, "Spell_Shadow_Twilight.png", "", "", "使你的暗影法术伤害提高{0}", new Array(), new Array());
	talents[769] = new Talent( "神圣延伸", "神圣", 4, 1, "holyreach.png", "", "", "使你的惩击和神圣之火的射程、治疗祷言和神圣新星的作用半径提高{0}", new Array(), new Array());
	talents[659] = new Talent( "能量灌注", "戒律", 7, 2, "powerinfusion.png", "", "182点法力值<br>瞬发<br>30码<br>3分钟冷却<br>", "能量灌注目标全身，使其法术伤害和治疗效果提高20%，持续15秒。", new Array(), new Array(new TalentRequirement(654, 5)));
	talents[651] = new Talent( "神圣之灵", "戒律", 5, 3, "divinespirit.png", "", "285点法力值<br>瞬发<br>30码<br>", "神圣的力量充满全身，令其精神提高17点，持续30分钟。", new Array(), new Array(new TalentRequirement(656, 3)));
	talents[658] = new Talent( "意志之力", "戒律", 6, 3, "Spell_Nature_SlowingTotem.png", "", "", "使你的法术伤害提高{0}，攻击性法术的致命一击几率提高{1}", new Array(), new Array());
	talents[767] = new Talent( "神圣新星", "神圣", 3, 1, "holynova.png", "", "230点法力值<br>瞬发<br>", "制造一次以施法者为中心的能了爆炸，对半径10码内的所有目标造成36到40点神圣伤害，并为半径19码范围内的所有小队成员恢复65到70点生命值。这些效果不对怪物产生任何威胁值。", new Array(), new Array());
	talents[646] = new Talent( "光明之泉", "神圣", 7, 2, "lightwell.png", "", "225点法力值<br>3秒施法时间<br>10分钟冷却<br>", "在牧师身边制造一个光明之泉。友方单位可以点击光明之泉，在10秒内恢复800点生命值。被攻击会中断这个效果。光明之泉在2分钟或者在被使用5次后消失。", new Array(), new Array(new TalentRequirement(770, 1)));
	talents[764] = new Talent( "神圣专精", "神圣", 1, 3, "Spell_Holy_SealOfSalvation.png", "", "", "提高你的神圣法术造成致命一击的几率{0}", new Array(), new Array());
	talents[662] = new Talent( "强化渐隐术", "暗影", 4, 2, "Spell_Magic_LesserInvisibilty.png", "", "", "使你的渐隐术的冷却时间减少{0}。", new Array(), new Array());
	talents[643] = new Talent( "法术屏障", "神圣", 2, 2, "spellwarding.png", "", "", "使你受到的所有法术伤害降低{0}。", new Array(), new Array());
	talents[642] = new Talent( "强化治疗术", "神圣", 4, 2, "Spell_Holy_Heal.png", "", "", "使你的次级治疗术、治疗术和强效治疗术的法力值消耗降低{0}", new Array(), new Array());
	talents[653] = new Talent( "强化心灵之火", "戒律", 4, 1, "Spell_Holy_InnerFire.png", "", "", "使你的心灵之火的效果提高{0}", new Array(), new Array());
	talents[655] = new Talent( "强化法力燃烧", "戒律", 4, 4, "Spell_Shadow_ManaBurn.png", "", "", "使你的法力燃烧的施法时间减少{0}", new Array(), new Array());
	talents[166] = new Talent( "强化心灵震爆", "暗影", 3, 2, "Spell_Shadow_SpectralSight.png", "", "", "使你的心灵震爆的冷却时间减少{0}", new Array(), new Array());
	talents[650] = new Talent( "强化真言术：韧", "戒律", 2, 2, "Spell_Holy_WordFortitude.png", "", "", "使你的真言术：韧的效果提高{0}", new Array(), new Array());
	talents[649] = new Talent( "强化真言术：盾", "戒律", 2, 3, "Spell_Holy_PowerWordShield.png", "", "", "使你的真言术：盾所吸收的伤害量提高{0}", new Array(), new Array());
	talents[483] = new Talent( "强化治疗祷言", "神圣", 5, 1, "Spell_Holy_PrayerOfHealing02.png", "", "", "使你的治疗祷言所消耗的法力值减少{0}", new Array(), new Array());
	talents[660] = new Talent( "强化心灵尖啸", "暗影", 3, 1, "Spell_Shadow_PsychicScream.png", "", "", "使你的心灵尖啸的冷却时间减少{0}", new Array(), new Array());
	talents[763] = new Talent( "强化恢复", "神圣", 1, 2, "Spell_Holy_Renew.png", "", "", "使你的恢复法术的治疗效果提高{0}", new Array(), new Array());
	talents[163] = new Talent( "强化暗言术：痛", "暗影", 2, 2, "Spell_Shadow_ShadowWordPain.png", "", "", "使你的暗言术：痛的持续时间延长{0}", new Array(), new Array());
	talents[766] = new Talent( "神圣之怒", "神圣", 2, 3, "divinefury.png", "", "", "使你的惩击、神圣之火、治疗术和强效治疗术的施法时间减少{0}。", new Array(), new Array());
	talents[657] = new Talent( "心灵专注", "戒律", 3, 2, "Spell_Frost_WindWalkOn.png", "", "瞬发<br>3分钟冷却<br>", "激活之后，你的下一个法术所消耗的法力值减少100%，造成致命一击或极效治疗的几率提高25%（如果它有可能造成这些效果的话）。", new Array(), new Array());
	talents[768] = new Talent( "灵感", "神圣", 3, 4, "Spell_Holy_LayOnHands.png", "", "", "在你的快速治疗、治疗术、强效治疗术或治疗祷言对目标造成极效治疗效果后，使目标的护甲值提高{0}，持续15秒。", new Array(), new Array());
	talents[648] = new Talent( "殉难", "戒律", 2, 4, "Spell_Nature_Tranquility.png", "", "", "使你有{0}的几率在受到敌人近战或远程致命一击后得到专注施法效果，持续6秒。专注施法效果可以让你在施法时不会因为受到伤害而延长施法时间，且令你抵抗打断效果的几率提高{1}。", new Array(), new Array());
	talents[771] = new Talent( "神恩回复", "神圣", 3, 2, "blessedrecovery.png", "", "", "在遭受近战或远程攻击的致命一击后，为你在6秒内恢复相当于该伤害总量{0}的生命值。", new Array(), new Array());
	talents[656] = new Talent( "冥想", "戒律", 3, 3, "Spell_Nature_Sleep.png", "", "", "使你在施法时仍保持{0}的法力回复速度。", new Array(), new Array());
	talents[652] = new Talent( "精神敏锐", "戒律", 4, 2, "Ability_Hibernation.png", "", "", "使你的瞬发法术所消耗的法力值减少{0}", new Array(), new Array());
	talents[654] = new Talent( "心灵之力", "戒律", 5, 2, "Spell_Nature_EnchantArmor.png", "", "", "使你的法力值上限提高{0}", new Array(), new Array());
	talents[661] = new Talent( "精神鞭笞", "暗影", 3, 3, "Spell_Shadow_SiphonMana.png", "", "45点法力值<br>瞬发<br>20码<br>需引导<br>", "以暗影能量攻击目标的灵魂，在3秒内对其造成总计75点暗影伤害，并使其移动速度降低到普通速度的50%。", new Array(), new Array());
	talents[162] = new Talent( "暗影亲和", "暗影", 2, 1, "Spell_Shadow_ShadowWard.png", "", "", "使你的暗影法术造成的威胁值降低{0}", new Array(), new Array());
	talents[164] = new Talent( "暗影集中", "暗影", 2, 3, "Spell_Shadow_BurningSpirit.png", "", "", "使目标抵抗你的暗影法术的机率下降{0}", new Array(), new Array());
	talents[421] = new Talent( "暗影延伸", "暗影", 4, 3, "Spell_Shadow_ChillTouch.png", "", "", "使你的暗影系伤害性法术的射程提高{0}", new Array(), new Array());
	talents[773] = new Talent( "暗影之波", "暗影", 4, 4, "Spell_Shadow_ShadeTrueSight.png", "", "", "你的暗影系伤害性法术有{0}的机会使你的目标在受到暗影系攻击时更脆弱，受到的伤害提高3%，持续15秒。此效果最多可叠加5次。", new Array(), new Array());
	talents[775] = new Talent( "暗影形态", "暗影", 7, 2, "Spell_Shadow_Shadowform.png", "", "550点法力值<br>瞬发<br>1.5秒冷却时间<br>", "进入暗影形态，使你能造成的暗影伤害提高15%，受到物理攻击时承受的伤害降低15%。但是在这个形态下，你不能施放神圣系的法术。", new Array(), new Array(new TalentRequirement(664, 1)));
	talents[663] = new Talent( "沉默", "暗影", 5, 1, "Spell_Shadow_ImpPhaseShift.png", "", "225 法力值<br>瞬发法术<br>45秒冷却时间<br>20码有效距离", "使目标沉默，在5秒内不能施法。", new Array(), new Array(new TalentRequirement(660, 2)));
	talents[175] = new Talent( "无声消退", "戒律", 2, 1, "Spell_Nature_ManaRegenTotem.png", "", "", "使你的法术造成的威胁值降低{0}", new Array(), new Array());
	talents[770] = new Talent( "救赎之魂", "神圣", 5, 2, "INV_Enchant_EssenceEternalLarge.png", "", "", "在死亡时，牧师变成一个救赎之魂，持续10秒钟。救赎之魂无法移动、攻击，也不会受到任何法术或效果的影响。在这个状态下，牧师可以施放任何治疗法术，不需要任何法力值。当救赎之魂效果结束时，牧师死亡。", new Array(), new Array());
	talents[160] = new Talent( "精神分流", "暗影", 1, 2, "Spell_Shadow_Requiem.png", "", "", "使你有{0}的几率在杀死一个敌人并因此获得经验值之后精神属性提高100%。在这段时间里，你的法力值可以在施法时仍保持50%的回复速度。持续15秒。", new Array(), new Array());
	talents[765] = new Talent( "精神治疗", "神圣", 6, 3, "Spell_Nature_MoonGlow.png", "", "", "使你的治疗法术的治疗效果提高{0}", new Array(), new Array());
	talents[640] = new Talent( "治疗专注", "神圣", 1, 1, "healingfocus.png", "", "", "使你有{0}的几率在施放任何治疗法术时不会因为受到伤害而中断施法。", new Array(), new Array());
	talents[174] = new Talent( "坚定意志", "戒律", 1, 2, "Spell_Magic_MageArmor.png", "", "", "使你抵抗昏迷、恐惧和沉默效果的几率提高{0}", new Array(), new Array());
	talents[664] = new Talent( "吸血鬼的拥抱", "暗影", 5, 2, "Spell_Shadow_UnsummonBuilding.png", "", "40点法力值<br>瞬发<br>10秒钟冷却<br>30码有效距离<br>", "暗影魔法的能量笼罩你的目标，使你对其造成的暗影伤害总量的20%转而治疗所有队友。效果持续1分钟。", new Array(), new Array());
	talents[467] = new Talent( "魔杖专精", "戒律", 1, 3, "INV_Wand_01.png", "", "", "使你的魔杖造成的伤害提高{0}", new Array(), new Array());
	talents[838] = new Talent( "灼热之光", "神圣", 4, 3, "searinglight.png", "", "", "使你的惩戒和神圣之火造成的伤害提高{0}", new Array(), new Array(new TalentRequirement(766, 5)));
	talents[772] = new Talent( "精神指引", "神圣", 5, 3, "spiritualguidance.png", "", "", "使你的法术的伤害和治疗效果提高，数值最多相当于你精神值的{0}", new Array(), new Array());
	talents[839] = new Talent( "强化吸血鬼的拥抱", "暗影", 5, 3, "improvedvampiricembrace.png", "", "", "使吸血鬼的拥抱恢复生命的百分比提高{0}", new Array(), new Array(new TalentRequirement(664, 1)));
	
	talents[161].Info[0] = new TalentInfo(1, "2%", "",  "");
	talents[161].Info[1] = new TalentInfo(2, "4%", "",  "");
	talents[161].Info[2] = new TalentInfo(3, "6%", "",  "");
	talents[161].Info[3] = new TalentInfo(4, "8%", "",  "");
	talents[161].Info[4] = new TalentInfo(5, "10%", "", "");
	talents[774].Info[0] = new TalentInfo(1, "2%", "", "");
	talents[774].Info[1] = new TalentInfo(2, "4%", "", "");
	talents[774].Info[2] = new TalentInfo(3, "6%", "", "");
	talents[774].Info[3] = new TalentInfo(4, "8%", "", "");
	talents[774].Info[4] = new TalentInfo(5, "10%", "", "");
	talents[769].Info[0] = new TalentInfo(1, "10%", "", "");
	talents[769].Info[1] = new TalentInfo(2, "20%", "", "");
	talents[659].Info[0] = new TalentInfo(1, "", "", "");
	talents[651].Info[0] = new TalentInfo(1, "", "", "");
	talents[658].Info[0] = new TalentInfo(1, "1%, 1%", "", "");
	talents[658].Info[1] = new TalentInfo(2, "2%, 2%", "", "");
	talents[658].Info[2] = new TalentInfo(3, "3%, 3%", "", "");
	talents[658].Info[3] = new TalentInfo(4, "4%, 4%", "", "");
	talents[658].Info[4] = new TalentInfo(5, "5%, 5%", "", "");
	talents[767].Info[0] = new TalentInfo(1, "", "", "");
	talents[646].Info[0] = new TalentInfo(1, "", "", "");
	talents[772].Info[0] = new TalentInfo(1, "", "", "");
	talents[764].Info[0] = new TalentInfo(1, "1%", "", "");
	talents[764].Info[1] = new TalentInfo(2, "2%", "", "");
	talents[764].Info[2] = new TalentInfo(3, "3%", "", "");
	talents[764].Info[3] = new TalentInfo(4, "4%", "", "");
	talents[764].Info[4] = new TalentInfo(5, "5%", "", "");
	talents[662].Info[0] = new TalentInfo(1, "3秒", "", "");
	talents[662].Info[1] = new TalentInfo(2, "6秒", "", "");
	talents[643].Info[0] = new TalentInfo(1, "2%", "", "");
	talents[643].Info[1] = new TalentInfo(2, "4%", "", "");
	talents[643].Info[2] = new TalentInfo(3, "6%", "", "");
	talents[643].Info[3] = new TalentInfo(4, "8%", "", "");
	talents[643].Info[4] = new TalentInfo(5, "10%", "", "");
	talents[642].Info[0] = new TalentInfo(1, "5%", "", "");
	talents[642].Info[1] = new TalentInfo(2, "10%", "", "");
	talents[642].Info[2] = new TalentInfo(3, "15%", "", "");
	talents[653].Info[0] = new TalentInfo(1, "10%", "", "");
	talents[653].Info[1] = new TalentInfo(2, "20%", "", "");
	talents[653].Info[2] = new TalentInfo(3, "30%", "", "");
	talents[655].Info[0] = new TalentInfo(1, "0.25 秒", "", "");
	talents[655].Info[1] = new TalentInfo(2, "0.5 秒", "", "");
	talents[166].Info[0] = new TalentInfo(1, "0.5 秒", "", "");
	talents[166].Info[1] = new TalentInfo(2, "1 秒", "", "");
	talents[166].Info[2] = new TalentInfo(3, "1.5 秒", "", "");
	talents[166].Info[3] = new TalentInfo(4, "2 秒", "", "");
	talents[166].Info[4] = new TalentInfo(5, "2.5 秒", "", "");
	talents[650].Info[0] = new TalentInfo(1, "15%", "", "");
	talents[650].Info[1] = new TalentInfo(2, "30%", "", "");
	talents[649].Info[0] = new TalentInfo(1, "5%", "", "");
	talents[649].Info[1] = new TalentInfo(2, "10%", "", "");
	talents[649].Info[2] = new TalentInfo(3, "15%", "", "");
	talents[483].Info[0] = new TalentInfo(1, "10%", "", "");
	talents[483].Info[1] = new TalentInfo(2, "20%", "", "");
	talents[660].Info[0] = new TalentInfo(1, "2 秒", "", "");
	talents[660].Info[1] = new TalentInfo(2, "4 秒", "", "");
	talents[763].Info[0] = new TalentInfo(1, "5%", "", "");
	talents[763].Info[1] = new TalentInfo(2, "10%", "", "");
	talents[763].Info[2] = new TalentInfo(3, "15%", "", "");
	talents[163].Info[0] = new TalentInfo(1, "3 秒", "", "");
	talents[163].Info[1] = new TalentInfo(2, "6 秒", "", "");
	talents[766].Info[0] = new TalentInfo(1, "0.1秒", "", "");
	talents[766].Info[1] = new TalentInfo(2, "0.2秒", "", "");
	talents[766].Info[2] = new TalentInfo(3, "0.3秒", "", "");
	talents[766].Info[3] = new TalentInfo(4, "0.4秒", "", "");
	talents[766].Info[4] = new TalentInfo(5, "0.5秒", "", "");
	talents[657].Info[0] = new TalentInfo(1, "", "", "");
	talents[768].Info[0] = new TalentInfo(1, "8%", "", "");
	talents[768].Info[1] = new TalentInfo(2, "16%", "", "");
	talents[768].Info[2] = new TalentInfo(3, "25%", "", "");
	talents[648].Info[0] = new TalentInfo(1, "50%,10%", "", "");
	talents[648].Info[1] = new TalentInfo(2, "100%,20%", "", "");
	talents[771].Info[0] = new TalentInfo(1, "8%", "", "");
	talents[771].Info[1] = new TalentInfo(2, "16%", "", "");
	talents[771].Info[2] = new TalentInfo(3, "25%", "", "");
	talents[656].Info[0] = new TalentInfo(1, "5%", "", "");
	talents[656].Info[1] = new TalentInfo(2, "10%", "", "");
	talents[656].Info[2] = new TalentInfo(3, "15%", "", "");
	talents[652].Info[0] = new TalentInfo(1, "2%", "", "");
	talents[652].Info[1] = new TalentInfo(2, "4%", "", "");
	talents[652].Info[2] = new TalentInfo(3, "6%", "", "");
	talents[652].Info[3] = new TalentInfo(4, "8%", "", "");
	talents[652].Info[4] = new TalentInfo(5, "10%", "", "");
	talents[654].Info[0] = new TalentInfo(1, "2%", "", "");
	talents[654].Info[1] = new TalentInfo(2, "4%", "", "");
	talents[654].Info[2] = new TalentInfo(3, "6%", "", "");
	talents[654].Info[3] = new TalentInfo(4, "8%", "", "");
	talents[654].Info[4] = new TalentInfo(5, "10%", "", "");
	talents[661].Info[0] = new TalentInfo(1, "", "", "");
	talents[162].Info[0] = new TalentInfo(1, "8%", "", "");
	talents[162].Info[1] = new TalentInfo(2, "16%", "", "");
	talents[162].Info[2] = new TalentInfo(3, "25%", "", "");
	talents[164].Info[0] = new TalentInfo(1, "2%", "", "");
	talents[164].Info[1] = new TalentInfo(2, "4%", "", "");
	talents[164].Info[2] = new TalentInfo(3, "6%", "", "");
	talents[164].Info[3] = new TalentInfo(4, "8%", "", "");
	talents[164].Info[4] = new TalentInfo(5, "10%", "", "");
	talents[421].Info[0] = new TalentInfo(1, "6%", "", "");
	talents[421].Info[1] = new TalentInfo(2, "13%", "", "");
	talents[421].Info[2] = new TalentInfo(3, "20%", "", "");
	talents[773].Info[0] = new TalentInfo(1, "20%", "", "");
	talents[773].Info[1] = new TalentInfo(2, "40%", "", "");
	talents[773].Info[2] = new TalentInfo(3, "60%", "", "");
	talents[773].Info[3] = new TalentInfo(4, "80%", "", "");
	talents[773].Info[4] = new TalentInfo(5, "100%", "", "");
	talents[775].Info[0] = new TalentInfo(1, "", "", "");
	talents[663].Info[0] = new TalentInfo(1, "", "", "");
	talents[175].Info[0] = new TalentInfo(1, "4%", "", "");
	talents[175].Info[1] = new TalentInfo(2, "8%", "", "");
	talents[175].Info[2] = new TalentInfo(3, "12%", "", "");
	talents[175].Info[3] = new TalentInfo(4, "16%", "", "");
	talents[175].Info[4] = new TalentInfo(5, "20%", "", "");
	talents[770].Info[0] = new TalentInfo(1, "", "", "");
	talents[160].Info[0] = new TalentInfo(1, "20%", "",  "");
	talents[160].Info[1] = new TalentInfo(2, "40%", "",  "");
	talents[160].Info[2] = new TalentInfo(3, "60%", "",  "");
	talents[160].Info[3] = new TalentInfo(4, "80%", "",  "");
	talents[160].Info[4] = new TalentInfo(5, "100%", "", "");
	talents[765].Info[0] = new TalentInfo(1, "2%", "", "");
	talents[765].Info[1] = new TalentInfo(2, "4%", "", "");
	talents[765].Info[2] = new TalentInfo(3, "6%", "", "");
	talents[765].Info[3] = new TalentInfo(4, "8%", "", "");
	talents[765].Info[4] = new TalentInfo(5, "10%", "", "");
	talents[640].Info[0] = new TalentInfo(1, "35%", "", "");
	talents[640].Info[1] = new TalentInfo(2, "70%", "", "");
	talents[174].Info[0] = new TalentInfo(1, "3%", "", "");
	talents[174].Info[1] = new TalentInfo(2, "6%", "", "");
	talents[174].Info[2] = new TalentInfo(3, "9%", "", "");
	talents[174].Info[3] = new TalentInfo(4, "12%", "", "");
	talents[174].Info[4] = new TalentInfo(5, "15%", "", "");
	talents[664].Info[0] = new TalentInfo(1, "", "", "");
	talents[467].Info[0] = new TalentInfo(1, "5%", "", "");
	talents[467].Info[1] = new TalentInfo(2, "10%", "", "");
	talents[467].Info[2] = new TalentInfo(3, "15%", "", "");
	talents[467].Info[3] = new TalentInfo(4, "20%", "", "");
	talents[467].Info[4] = new TalentInfo(5, "25%", "", "");
	talents[838].Info[0] = new TalentInfo(1, "5%", "", "");
	talents[838].Info[1] = new TalentInfo(2, "10%", "", "");
	talents[772].Info[0] = new TalentInfo(1, "5%", "", "");
	talents[772].Info[1] = new TalentInfo(2, "10%", "", "");
	talents[772].Info[2] = new TalentInfo(3, "15%", "", "");
	talents[772].Info[3] = new TalentInfo(4, "20%", "", "");
	talents[772].Info[4] = new TalentInfo(5, "25%", "", "");
	talents[839].Info[0] = new TalentInfo(1, "5%", "", "");
	talents[839].Info[1] = new TalentInfo(2, "10%", "", "");


//----8<-------------------------------------------[

}

if (currentClass == classLst[5]) {
	talents[358] = new Talent("冲动", "战斗", 7, 2, "Spell_Shadow_ShadowWordDominate.png", "", "瞬发<br>5分钟冷却时间", "使你的能量值回复速度提高100%，持续15秒。", new Array(), new Array());
	talents[833] = new Talent("侵略", "战斗", 6, 3, "Ability_Racial_Avatar.png", "", "", "使你的邪恶攻击和剔骨技能的伤害提高{0}。", new Array(), new Array());
	talents[581] = new Talent("剑刃乱舞", "战斗", 5, 2, "Ability_Warrior_PunishingBlow.png", "", "25 能量<br>瞬发<br>2分钟冷却时间<br>需要近战武器", "使你的攻击速度提高20%。另外还可以对附近的一个额外的敌人造成伤害。持续15秒。", new Array(), new Array());
	talents[359] = new Talent("伺机而动", "敏锐", 1, 3, "Ability_Warrior_WarCry.png", "", "", "使你在从背后使用背刺、绞喉或伏击技能偷袭敌人时所造成的伤害值提高{0}。", new Array(), new Array());
	talents[829] = new Talent("冷血", "刺杀", 5, 2, "Spell_Ice_Lament.png", "", "瞬发<br>3 分钟冷却时间", "激活之后，你的下一次邪恶攻击、背刺、伏击或剔骨造成致命一击的几率提高100%。", new Array(), new Array());
	talents[580] = new Talent("匕首专精", "战斗", 4, 2, "INV_Weapon_ShortBlade_05.png", "", "", "使你的匕首造成致命一击的几率提高{0}。", new Array(), new Array());
	talents[576] = new Talent("偏斜", "战斗", 2, 2, "Ability_Parry.png", "", "", "使你的招架几率提高{0}。", new Array(), new Array());
	talents[352] = new Talent("双武器专精", "战斗", 4, 3, "Ability_DualWield.png", "", "", "使你的副手武器造成的伤害提高{0}。", new Array(), new Array(new TalentRequirement(347, 5)));
	talents[589] = new Talent("飘忽不定", "敏锐", 2, 2, "Spell_Magic_LesserInvisibilty.png", "", "", "使你的消失和致盲技能的冷却时间缩短{0}。", new Array(), new Array());
	talents[110] = new Talent("拳套专精", "战斗", 5, 4, "INV_Gauntlets_04.png", "", "", "使你的拳套造成致命一击的几率提高{0}。", new Array(), new Array());
	talents[590] = new Talent("鬼魅攻击", "敏锐", 3, 2, "Spell_Shadow_Curse.png", "", "40 能量<br>瞬发<br>20 秒冷却时间<br>5 码有效距离", "对敌人造成125%武器伤害，并使你躲闪攻击的几率提高15%，持续7秒。奖励1个连击点数。", new Array(), new Array());
	talents[594] = new Talent("出血", "敏锐", 5, 4, "Spell_Shadow_LifeDrain.png", "", "35 能量<br>瞬发<br>5 码有效距离<br>需要近战武器", "立即对目标造成伤害并令其流血不止，使其在受到物理攻击时所承受的伤害提高最多3点。可最多生效30次，或者持续15秒。奖励1个连击点数。", new Array(), new Array(new TalentRequirement(591,3)));
	talents[363] = new Talent("强化伏击", "敏锐", 3, 3, "Ability_Rogue_Ambush.png", "", "", "使你的伏击技能造成致命一击的几率提高{0}。", new Array(), new Array());
	talents[575] = new Talent("强化背刺", "战斗", 2, 1, "Ability_BackStab.png", "", "", "使你的背刺技能造成致命一击的几率提高{0}。", new Array(), new Array());
	talents[369] = new Talent("卑鄙", "敏锐", 5, 3, "dirtydeeds.png", "", "", "使你的偷袭和绞喉技能所消耗的能量值减少{0}。", new Array(), new Array());
	talents[339] = new Talent("致命", "敏锐", 6, 3, "deadliness.png", "", "", "攻击强度提高{0}。", new Array(), new Array());
	talents[592] = new Talent("强化扰乱", "敏锐", 5, 4, "Ability_Rogue_Distract.png", "", "", "使你的扰乱技能的作用半径扩大{0}。", new Array(), new Array());
	talents[577] = new Talent("耐久", "战斗", 3, 1, "Spell_Shadow_ShadowWard.png", "", "", "使你的疾跑/闪避技能的冷却时间降低{0}。", new Array(), new Array());
	talents[326] = new Talent("强化剔骨", "刺杀", 1, 1, "Ability_Rogue_Eviscerate.png", "", "", "使你的剔骨技能所造成的伤害提高{0}。", new Array(), new Array());
	talents[332] = new Talent("强化破甲", "刺杀", 3, 2, "Ability_Warrior_Riposte.png", "", "", "额外增加破甲技能的护甲值削减量{0}。", new Array(), new Array());
	talents[362] = new Talent("察觉", "敏锐", 5, 1, "Ability_Ambush.png", "", "", "增加你侦测潜行的能力，并降低你被法术与远程攻击命中的几率{0}。", new Array(), new Array());
	talents[573] = new Talent("强化凿击", "战斗", 1, 1, "Ability_Gouge.png", "", "", "使你的凿击技能的效果持续时间延长{0}。", new Array(), new Array());
	talents[337] = new Talent("强化速效毒药", "刺杀", 4, 3, "Ability_Poisons.png", "", "", "使你的毒药对敌人生效的几率提高{0}。", new Array(), new Array());
	talents[579] = new Talent("强化脚踢", "战斗", 4, 1, "Ability_Kick.png", "", "", "使你的脚踢技能有{0}的几率令目标沉默2秒。", new Array(), new Array());
	talents[585] = new Talent("强化肾击", "刺杀", 5, 3, "Ability_Rogue_KidneyShot.png", "", "", "目标受到你的肾击技能影响之后，任何攻击者对其所造成的伤害量都提高{0}。", new Array(), new Array());
	talents[591] = new Talent("锯齿利刃", "敏锐", 4, 3, "serratedblades.png", "", "", "使你的攻击忽视目标每等级{0}点护甲，并使你的割裂技能所造成的伤害提高{1}。削弱目标护甲的效果随着你的等级提高而提高。。", new Array(), new Array());
	talents[367] = new Talent("强化闷棍", "敏锐", 4, 2, "Ability_Sap.png", "", "", "使你有{0}的几率在使用闷棍技能之后重新转入潜行模式。", new Array(), new Array());
	talents[574] = new Talent("强化邪恶攻击", "战斗", 1, 2, "Spell_Shadow_RitualOfSacrifice.png", "", "", "使你的邪恶攻击技能所消耗的能量值减少 {0}。", new Array(), new Array());
	talents[331] = new Talent("强化切割", "刺杀", 2, 4, "Ability_Rogue_SliceDice.png", "", "", "使你的切割技能的效果持续时间延长{0}。", new Array(), new Array());
	talents[350] = new Talent("强化疾跑", "战斗", 3, 4, "Ability_Rogue_Sprint.png", "", "", "当你激活疾跑技能的时候，使你有{0}的几率移除所有移动限制效果。", new Array(), new Array());
	talents[360] = new Talent("先发制人", "敏锐", 3, 1, "Spell_Shadow_Fumble.png", "", "", "使你有{0}的几率在使用伏击、绞喉或偷袭技能后获得1个额外的连击点数。", new Array(), new Array());
	talents[828] = new Talent("致命偷袭", "刺杀", 3, 3, "Ability_CriticalStrike.png", "", "", "使你的邪恶攻击、绞喉、背刺、鬼魅攻击或出血技能的致命一击所造成的额外伤害提高{0}。", new Array(), new Array(new TalentRequirement(328, 5)));
	talents[96] = new Talent("闪电反射", "战斗", 1, 3, "Spell_Nature_Invisibilty.png", "", "", "使你的躲闪几率提高{0}。", new Array(), new Array());
	talents[353] = new Talent("锤类武器专精", "战斗", 5, 1, "INV_Mace_01.png", "", "", "使你的锤类武器技能提高{0}点，使用锤类武器击中目标时有{1}的几率将其击晕3秒。", new Array(), new Array());
	talents[328] = new Talent("恶意", "刺杀", 1, 3, "Ability_Racial_BloodRage.png", "", "", "使你的致命一击几率提高{0}。", new Array(), new Array());
	talents[587] = new Talent("欺诈大师", "敏锐", 1, 2, "Spell_Shadow_Charm.png", "", "", "当你在潜行状态下时，降低敌人侦测到你的几率。{0}", new Array(), new Array());
	talents[330] = new Talent("谋杀", "刺杀", 2, 2, "Spell_Shadow_DeathScream.png", "", "", "使你对人形生物、巨人、野兽和龙类目标造成的所有伤害提高{0}。", new Array(), new Array());
	talents[588] = new Talent("伪装", "敏锐", 2, 3, "Ability_Stealth.png", "", "", "使你在潜行后的移动速度提高 {0}，并使你的潜行技能的冷却时间减少 {1}。", new Array(), new Array());
	talents[347] = new Talent("精确", "战斗", 2, 3, "Ability_Marksmanship.png", "", "", "使你的近战武器击中目标的几率提高{0}。", new Array(), new Array());
	talents[834] = new Talent("预谋", "敏锐", 7, 2, "Spell_Shadow_Possession.png", "", "10 能量<br>1 秒施法时间<br>2 分钟冷却时间<br>15 码有效距离<br>需要潜行<br>", "使用此技能后，为你的当前目标增加2个连击点数。你必须在10秒内消耗掉这些点数，否则它们就会消失。", new Array(), new Array(new TalentRequirement(368,1)));
	talents[368] = new Talent("伺机待发", "敏锐", 5, 2, "Spell_Shadow_AntiShadow.png", "", "瞬发<br>10 分钟冷却时间<br>", "激活之后，这项技能立刻令你的其它盗贼技能的冷却时间结束。", new Array(), new Array());
	talents[586] = new Talent("强化佯攻", "敏锐", 2, 1, "sleightofhand.png", "", "", "使你的佯攻技能减少威胁值的效果提高{0}，并使你被近战和远程攻击致命一击的几率降低{1}。", new Array(), new Array());
	talents[584] = new Talent("无情打击", "刺杀", 3, 1, "Ability_Warrior_DecisiveStrike.png", "", "", "你的终结技有每连击点数20%的几率恢复25点能量值。", new Array(), new Array());
	talents[827] = new Talent("冷酷攻击", "刺杀", 1, 2, "Ability_FiegnDead.png", "", "", "在你杀死一个敌人并得到经验值后，你的下一次邪恶攻击、背刺、伏击或鬼魅攻击有{0}的额外几率造成致命一击，效果持续20秒。", new Array(), new Array());
	talents[831] = new Talent("还击", "战斗", 3, 2, "Ability_Warrior_Challange.png", "", "10 能量<br>瞬发法术<br>6秒钟冷却时间<br>5 码有效距离", "在招架了敌人的攻击之后可以使用的技能，对目标造成150%的武器伤害，并使其被缴械，持续6秒。", new Array(), new Array(new TalentRequirement(576, 5)));
	talents[329] = new Talent("无情", "刺杀", 2, 1, "Ability_Druid_Disembowel.png", "", "", "使你的终结技有{0}的几率为目标增加一个连击点数。", new Array(), new Array());
	talents[830] = new Talent("封印命运", "刺杀", 6, 2, "Spell_Shadow_ChillTouch.png", "", "", "如果你的某个可以增加连击点数的技能造成了致命一击，那么它就有{0}的几率增加一个额外的连击点数。", new Array(), new Array(new TalentRequirement(829, 1)));
	talents[593] = new Talent("调整", "敏锐", 4, 1, "Spell_Nature_MirrorImage.png", "", "", "使你有{0}的几率在成功抵抗敌人的攻击之后获得一个连击点数。", new Array(), new Array());
	talents[355] = new Talent("剑类武器专精", "战斗", 5, 3, "INV_Sword_27.png", "", "", "使你在用剑类武器击中敌人后有{0}的几率进行一次额外的攻击。", new Array(), new Array());
	talents[832] = new Talent("武器大师", "战斗", 6, 2, "weaponexpertise.png", "", "", "使你的单手剑和匕首武器技能提高 {0}。", new Array(), new Array());
	talents[342] = new Talent("精力", "刺杀", 7, 2, "Spell_Nature_EarthBindTotem.png", "", "", "使你的能量值上限提高10点。", new Array(), new Array());
	talents[336] = new Talent("恶性毒药", "刺杀", 4, 2, "Ability_Rogue_FeignDeath.png", "", "", "使你的毒药所造成的伤害提高{0}，并使它有{1}的额外几率抵抗一次驱散效果。", new Array(), new Array());
	talents[358].Info[0] = new TalentInfo(1, "", "", "");
	talents[833].Info[0] = new TalentInfo(1, "2%", "", "");
	talents[833].Info[1] = new TalentInfo(2, "4%", "", "");
	talents[833].Info[2] = new TalentInfo(3, "6%", "", "");
	talents[581].Info[0] = new TalentInfo(1, "", "", "");
	talents[588].Info[0] = new TalentInfo(1, "3%,1秒", "", "");
	talents[588].Info[1] = new TalentInfo(2, "6%,2秒", "", "");
	talents[588].Info[2] = new TalentInfo(3, "9%,3秒", "", "");
	talents[588].Info[3] = new TalentInfo(4, "12%,4秒", "", "");
	talents[588].Info[4] = new TalentInfo(5, "15%,5秒", "", "");
	talents[829].Info[0] = new TalentInfo(1, "", "", "");
	talents[580].Info[0] = new TalentInfo(1, "1%", "", "");
	talents[580].Info[1] = new TalentInfo(2, "2%", "", "");
	talents[580].Info[2] = new TalentInfo(3, "3%", "", "");
	talents[580].Info[3] = new TalentInfo(4, "4%", "", "");
	talents[580].Info[4] = new TalentInfo(5, "5%", "", "");
	talents[576].Info[0] = new TalentInfo(1, "1%", "", "");
	talents[576].Info[1] = new TalentInfo(2, "2%", "", "");
	talents[576].Info[2] = new TalentInfo(3, "3%", "", "");
	talents[576].Info[3] = new TalentInfo(4, "4%", "", "");
	talents[576].Info[4] = new TalentInfo(5, "5%", "", "");
	talents[352].Info[0] = new TalentInfo(1, "10%", "", "");
	talents[352].Info[1] = new TalentInfo(2, "20%", "", "");
	talents[352].Info[2] = new TalentInfo(3, "30%", "", "");
	talents[352].Info[3] = new TalentInfo(4, "40%", "", "");
	talents[352].Info[4] = new TalentInfo(5, "50%", "", "");
	talents[589].Info[0] = new TalentInfo(1, "45秒", "", "");
	talents[589].Info[1] = new TalentInfo(2, "90秒", "", "");
	talents[110].Info[0] = new TalentInfo(1, "1%", "", "");
	talents[110].Info[1] = new TalentInfo(2, "2%", "", "");
	talents[110].Info[2] = new TalentInfo(3, "3%", "", "");
	talents[110].Info[3] = new TalentInfo(4, "4%", "", "");
	talents[110].Info[4] = new TalentInfo(5, "5%", "", "");
	talents[590].Info[0] = new TalentInfo(1, "", "", "");
	talents[594].Info[0] = new TalentInfo(1, "", "", "");
	talents[363].Info[0] = new TalentInfo(1, "15%", "", "");
	talents[363].Info[1] = new TalentInfo(2, "30%", "", "");
	talents[363].Info[2] = new TalentInfo(3, "40%", "", "");
	talents[575].Info[0] = new TalentInfo(1, "10%", "", "");
	talents[575].Info[1] = new TalentInfo(2, "20%", "", "");
	talents[575].Info[2] = new TalentInfo(3, "30%", "", "");
	talents[369].Info[0] = new TalentInfo(1, "10点", "", "");
	talents[369].Info[1] = new TalentInfo(2, "20点", "", "");
	talents[339].Info[0] = new TalentInfo(1, "2%", "", "");
	talents[339].Info[1] = new TalentInfo(2, "4%", "", "");
	talents[339].Info[2] = new TalentInfo(3, "6%", "", "");
	talents[339].Info[3] = new TalentInfo(4, "8%", "", "");
	talents[339].Info[4] = new TalentInfo(5, "10%", "", "");
	talents[592].Info[0] = new TalentInfo(1, "3 码", "", "");
	talents[592].Info[1] = new TalentInfo(2, "5 码", "", "");
	talents[577].Info[0] = new TalentInfo(1, "45 秒", "", "");
	talents[577].Info[1] = new TalentInfo(2, "90 秒", "", "");
	talents[326].Info[0] = new TalentInfo(1, "5%", "", "");
	talents[326].Info[1] = new TalentInfo(2, "10%", "", "");
	talents[326].Info[2] = new TalentInfo(3, "15%", "", "");
	talents[332].Info[0] = new TalentInfo(1, "6%", "", "");
	talents[332].Info[1] = new TalentInfo(2, "12%", "", "");
	talents[362].Info[0] = new TalentInfo(1, "2%", "", "");
	talents[362].Info[1] = new TalentInfo(2, "4%。 比察觉（等级1）更为有效", "", "");
	talents[573].Info[0] = new TalentInfo(1, "0.5 秒", "", "");
	talents[573].Info[1] = new TalentInfo(2, "1 秒", "", "");
	talents[573].Info[2] = new TalentInfo(3, "1.5 秒", "", "");
	talents[337].Info[0] = new TalentInfo(1, "2%", "", "");
	talents[337].Info[1] = new TalentInfo(2, "4%", "", "");
	talents[337].Info[2] = new TalentInfo(3, "6%", "", "");
	talents[337].Info[3] = new TalentInfo(4, "8%", "", "");
	talents[337].Info[4] = new TalentInfo(5, "10%", "", "");
	talents[579].Info[0] = new TalentInfo(1, "50%", "", "");
	talents[579].Info[1] = new TalentInfo(2, "100%", "", "");
	talents[585].Info[0] = new TalentInfo(1, "3%", "", "");
	talents[585].Info[1] = new TalentInfo(2, "6%", "", "");
	talents[585].Info[2] = new TalentInfo(3, "9%", "", "");
	talents[591].Info[0] = new TalentInfo(1, "1.7,10%", "", "");
	talents[591].Info[1] = new TalentInfo(2, "3.3,20%", "", "");
	talents[591].Info[2] = new TalentInfo(3, "5,30%", "", "");
	talents[367].Info[0] = new TalentInfo(1, "30%", "", "");
	talents[367].Info[1] = new TalentInfo(2, "60%", "", "");
	talents[367].Info[2] = new TalentInfo(3, "90%", "", "");
	talents[574].Info[0] = new TalentInfo(1, "3 点", "", "");
	talents[574].Info[1] = new TalentInfo(2, "5 点", "", "");
	talents[331].Info[0] = new TalentInfo(1, "15%", "", "");
	talents[331].Info[1] = new TalentInfo(2, "30%", "", "");
	talents[331].Info[2] = new TalentInfo(3, "45%", "", "");
	talents[350].Info[0] = new TalentInfo(1, "50%", "", "");
	talents[350].Info[1] = new TalentInfo(2, "100%", "", "");
	talents[360].Info[0] = new TalentInfo(1, "25%", "", "");
	talents[360].Info[1] = new TalentInfo(2, "50%", "", "");
	talents[360].Info[2] = new TalentInfo(3, "75%", "", "");
	talents[828].Info[0] = new TalentInfo(1, "6%", "", "");
	talents[828].Info[1] = new TalentInfo(2, "12%", "", "");
	talents[828].Info[2] = new TalentInfo(3, "18%", "", "");
	talents[828].Info[3] = new TalentInfo(4, "24%", "", "");
	talents[828].Info[4] = new TalentInfo(5, "30%", "", "");
	talents[96].Info[0] = new TalentInfo(1, "1%", "", "");
	talents[96].Info[1] = new TalentInfo(2, "2%", "", "");
	talents[96].Info[2] = new TalentInfo(3, "3%", "", "");
	talents[96].Info[3] = new TalentInfo(4, "4%", "", "");
	talents[96].Info[4] = new TalentInfo(5, "5%", "", "");
	talents[353].Info[0] = new TalentInfo(1, "1,1%", "", "");
	talents[353].Info[1] = new TalentInfo(2, "2,2%", "", "");
	talents[353].Info[2] = new TalentInfo(3, "3,3%", "", "");
	talents[353].Info[3] = new TalentInfo(4, "4,4%", "", "");
	talents[353].Info[4] = new TalentInfo(5, "5,5%", "", "");
	talents[328].Info[0] = new TalentInfo(1, "1%", "", "");
	talents[328].Info[1] = new TalentInfo(2, "2%", "", "");
	talents[328].Info[2] = new TalentInfo(3, "3%", "", "");
	talents[328].Info[3] = new TalentInfo(4, "4%", "", "");
	talents[328].Info[4] = new TalentInfo(5, "5%", "", "");
	talents[587].Info[0] = new TalentInfo(1, " ", "", "");
	talents[587].Info[1] = new TalentInfo(2, "比 欺诈大师（等级1）更有效", "", "");
	talents[587].Info[2] = new TalentInfo(3, "比 欺诈大师（等级2）更有效", "", "");
	talents[587].Info[3] = new TalentInfo(4, "比 欺诈大师（等级3）更有效", "", "");
	talents[587].Info[4] = new TalentInfo(5, "比 欺诈大师（等级4）更有效", "", "");
	talents[330].Info[0] = new TalentInfo(1, "1%", "", "");
	talents[330].Info[1] = new TalentInfo(2, "2%", "", "");
	talents[359].Info[0] = new TalentInfo(1, "4%", "", "");
	talents[359].Info[1] = new TalentInfo(2, "8%", "", "");
	talents[359].Info[2] = new TalentInfo(3, "12%", "", "");
	talents[359].Info[3] = new TalentInfo(4, "16%", "", "");
	talents[359].Info[4] = new TalentInfo(5, "20%", "", "");
	talents[347].Info[0] = new TalentInfo(1, "1%", "", "");
	talents[347].Info[1] = new TalentInfo(2, "2%", "", "");
	talents[347].Info[2] = new TalentInfo(3, "3%", "", "");
	talents[347].Info[3] = new TalentInfo(4, "4%", "", "");
	talents[347].Info[4] = new TalentInfo(5, "5%", "", "");
	talents[834].Info[0] = new TalentInfo(1, "", "", "");
	talents[368].Info[0] = new TalentInfo(1, "", "", "");
	talents[586].Info[0] = new TalentInfo(1, "10%,1%", "", "");
	talents[586].Info[1] = new TalentInfo(2, "20%,2%", "", "");
	talents[584].Info[0] = new TalentInfo(1, "20%", "", "");
	talents[827].Info[0] = new TalentInfo(1, "20%", "", "");
	talents[827].Info[1] = new TalentInfo(5, "40%", "", "");
	talents[831].Info[0] = new TalentInfo(1, "", "", "");
	talents[329].Info[0] = new TalentInfo(1, "20%", "", "");
	talents[329].Info[1] = new TalentInfo(2, "40%", "", "");
	talents[329].Info[2] = new TalentInfo(3, "60%", "", "");
	talents[830].Info[0] = new TalentInfo(1, "20%", "", "");
	talents[830].Info[1] = new TalentInfo(2, "40%", "", "");
	talents[830].Info[2] = new TalentInfo(3, "60%", "", "");
	talents[830].Info[3] = new TalentInfo(4, "80%", "", "");
	talents[830].Info[4] = new TalentInfo(5, "100%", "", "");
	talents[593].Info[0] = new TalentInfo(1, "15%", "", "");
	talents[593].Info[1] = new TalentInfo(2, "30%", "", "");
	talents[593].Info[2] = new TalentInfo(3, "45%", "", "");
	talents[355].Info[0] = new TalentInfo(1, "1%", "", "");
	talents[355].Info[1] = new TalentInfo(2, "2%", "", "");
	talents[355].Info[2] = new TalentInfo(3, "3%", "", "");
	talents[355].Info[3] = new TalentInfo(4, "4%", "", "");
	talents[355].Info[4] = new TalentInfo(5, "5%", "", "");
	talents[832].Info[0] = new TalentInfo(1, "3 点", "", "");
	talents[832].Info[1] = new TalentInfo(2, "5 点", "", "");
	talents[342].Info[0] = new TalentInfo(1, "10", "", "");
	talents[336].Info[0] = new TalentInfo(1, "3%,8%", "", "");
	talents[336].Info[1] = new TalentInfo(2, "6%,16%", "", "");
	talents[336].Info[2] = new TalentInfo(3, "9%,24%", "", "");
	talents[336].Info[3] = new TalentInfo(4, "12%,32%", "", "");
	talents[336].Info[4] = new TalentInfo(5, "15%,40%", "", "");
}


if (currentClass == classLst[6]) {
	talents[262] = new Talent( "传导", "元素", 1, 2, "Spell_Nature_WispSplode.png", "", "", "使你的震击、闪电箭和闪电链法术所消耗的法力值减少 {0}。", new Array(), new Array());
	
	talents[263] = new Talent( "震荡", "元素", 1, 3, "Spell_Fire_Fireball.png", "", "", "使你的闪电箭、闪电链和震击法术所造成的伤害提高 {0}。", new Array(), new Array());
	
	talents[264] = new Talent( "大地之握", "元素", 2, 1, "Spell_Nature_StoneClawTotem.png", "", "", "使你的石爪图腾的生命值提高 {0}，地缚图腾的影响范围提高 {1}。", new Array(), new Array());
	
	talents[265] = new Talent( "烈焰召唤", "元素", 2, 3, "Spell_Fire_Immolation.png", "", "", "使你的火系图腾所能造成的伤害提高 {0}。", new Array(), new Array());
	
	talents[266] = new Talent( "元素防护", "元素", 2, 2, "elementalwarding.png", "", "", "使你在受到火焰、冰霜或自然系法术击中时所受到的伤害量降低 {0}。", new Array(), new Array());
	
	talents[596] = new Talent( "元素集中", "元素", 3, 1, "Spell_Shadow_ManaBurn.png", "", "", "使你有10%的几率在施放任何火焰、冰霜或自然系的伤害性法术之后进入节能施法状态。这个状态可以使你的下一个伤害性法术所消耗的法力值减少100%。", new Array(), new Array());
	
	talents[269] = new Talent( "回响", "元素", 3, 2, "Spell_Frost_FrostWard.png", "", "", "使你的震击法术的冷却时间减少 {0}。", new Array(), new Array());
	
	talents[268] = new Talent( "雷霆召唤", "元素", 3, 3, "Spell_Nature_CallStorm.png", "", "", "使你的闪电箭和闪电链法术造成致命一击的几率提高 {0}。", new Array(), new Array());
	
	talents[271] = new Talent( "强化火焰图腾", "元素", 4, 1, "Spell_Fire_SealOfFire.png", "", "", "使你的火焰新星图腾激活所需的延迟时间减少 {0}，熔岩图腾所造成的威胁值降低 {1}。", new Array(), new Array());
	
	talents[267] = new Talent( "风暴之眼", "元素", 4, 2, "eyeofthestorm.png", "", "", "使你有 {0} 的几率在受到近战或远程致命一击之后获得持续6秒的专注施法效果，在此期间，你不会因为受到伤害而延长施法时间。", new Array(), new Array());
	
	talents[273] = new Talent( "风暴来临", "元素", 5, 1, "stormreach.png", "", "", "使你的闪电箭和闪电链的射程延长 {0}。", new Array(), new Array());
	
	talents[597] = new Talent( "元素浩劫", "元素", 4, 4, "elementaldevastation.png", "", "", "使你的攻击性法术在造成致命一击后将令你的近战攻击的致命一击率提高 {0}，持续10秒。", new Array(), new Array());
	
	talents[272] = new Talent( "元素之怒", "元素", 5, 2, "Spell_Fire_Volcano.png", "", "", "使你的火焰、冰霜和自然法术的致命一击伤害加成提高100%。", new Array(), new Array());
	
	talents[275] = new Talent( "闪电掌握", "元素", 6, 3, "Spell_Lightning_LightningBolt01.png", "", "", "使你的闪电箭和闪电链的施法时间减少 {0}。", new Array(), new Array(new TalentRequirement(268, 5)));
	
	talents[598] = new Talent( "元素掌握", "元素", 7, 2, "Spell_Nature_WispHeal.png", "", "瞬发<br>3分钟冷却时间<br>", "激活之后，使你的下一个伤害性的火焰、冰霜或自然法术有100%的几率造成致命一击，且法力值消耗降低100%。", new Array(), new Array(new TalentRequirement(272, 1)));
	
	talents[292] = new Talent( "盾牌专精", "增强", 1, 3, "INV_Shield_06.png", "", "", "使你用盾牌格挡攻击的几率提高 {0}，格挡成功后所减免的伤害量提高 {1}。", new Array(), new Array());
	
	talents[293] = new Talent( "守护图腾", "增强", 2, 1, "Spell_Nature_StoneSkinTotem.png", "", "", "使你的石肤图腾和风墙图腾所能吸收的伤害提高 {0}，根基图腾的冷却时间减少 {1}。", new Array(), new Array());
	
	talents[297] = new Talent( "强化图腾", "增强", 3, 1, "Spell_Nature_EarthBindTotem.png", "", "", "使你的大地之力图腾和风之优雅图腾的效果提高 {0}。", new Array(), new Array());
	
	talents[610] = new Talent( "坚韧", "增强", 4, 3, "Spell_Holy_Devotion.png", "", "", "使你因装备而获得的护甲值提高{0}。", new Array(), new Array());
	
	talents[299] = new Talent( "乱舞", "增强", 4, 2, "Ability_GhoulFrenzy.png", "", "", "在你打出致命一击之后，使你的下3次近战攻击速度提高 {0}。", new Array(), new Array(new TalentRequirement(294, 5)));
	
	talents[607] = new Talent( "强化武器图腾", "增强", 5, 1, "INV_Axe_02.png", "", "", "使你的风怒图腾所提供的近战攻击强度加成提高 {0}，火舌图腾所造成的伤害提高 {1}。", new Array(), new Array());
	
	talents[608] = new Talent( "元素武器", "增强", 5, 2, "Spell_Fire_FlameTounge.png", "", "", "使你的石化武器所提供的近战攻击强度加成提高 {0}，风怒武器所提供的近战攻击强度加成提高 {1}，火舌武器和冰封武器所造成的伤害提高 {2}。", new Array(), new Array());
	
	talents[609] = new Talent( "招架", "增强", 5, 3, "Ability_Parry.png", "", "", "有一定几率招架敌人的近战攻击。", new Array(), new Array());
	
	talents[303] = new Talent( "武器掌握", "增强", 6, 3, "Ability_Hunter_SwiftStrike.png", "", "", "使你用所有武器造成的伤害都提高{0}。", new Array(), new Array());
	
	talents[296] = new Talent( "强化闪电之盾", "增强", 2, 4, "Spell_Nature_LightningShield.png", "", "", "使你的闪电之盾法术所造成的伤害提高 {0}。", new Array(), new Array());
	
	talents[294] = new Talent( "雷鸣猛击", "增强", 2, 2, "Ability_ThunderBolt.png", "", "", "使你武器造成致命一击的几率提高 {0}。", new Array(), new Array());
	
	talents[291] = new Talent( "先祖知识", "增强", 1, 2, "Spell_Shadow_GrimWard.png", "", "", "使你的法力值上限提高 {0}。", new Array(), new Array());
	
	talents[295] = new Talent( "强化幽灵之狼", "增强", 2, 3, "Spell_Nature_SpiritWolf.png", "", "", "使你的幽魂之狼法术的施法时间减少{0}。", new Array(), new Array());
	
	talents[612] = new Talent( "风暴打击", "增强", 7, 2, "Spell_Holy_SealOfMight.png", "", "204点法力值<br>瞬发法术<br>20 秒冷却时间<br>9码有效距离<br>", "使你获得一次额外的攻击机会。另外，你的下2次攻击对敌人造成的自然伤害提高20%，持续12秒。", new Array(), new Array(new TalentRequirement(608, 3)));
	
	talents[606] = new Talent( "预知", "增强", 3, 4, "Spell_Nature_MirrorImage.png", "", "", "使你的躲闪几率提高 {0}。", new Array(), new Array());
	
	talents[605] = new Talent( "双手斧和锤", "增强", 3, 3, "INV_Axe_10.png", "", "", "使你可以使用双手斧和双手锤。", new Array(), new Array());
	
	talents[599] = new Talent( "潮汐集中", "恢复", 1, 3, "Spell_Frost_ManaRecharge.png", "", "", "使你的治疗法术所消耗的法力值减少{0}。", new Array(), new Array());
	
	talents[277] = new Talent( "强化治疗波", "恢复", 1, 2, "Spell_Nature_ResistMagic.png", "", "", "使你的治疗波的施法时间减少 {0}。", new Array(), new Array());
	
	talents[778] = new Talent( "强化复生", "恢复", 2, 1, "Spell_Nature_Reincarnation.png", "", "", "使你的复生法术的冷却时间减少 {0}，并使你在重生后所获得的生命值和法力值提高 {1}。", new Array(), new Array());
	
	talents[280] = new Talent( "先祖治疗", "恢复", 2, 2, "Spell_Nature_UndyingStrength.png", "", "", "在你的任何一个治疗法术对目标造成极效治疗效果后，使目标因装备而获得的护甲值提高 {0}，持续15秒。", new Array(), new Array());
	
	talents[600] = new Talent( "图腾集中", "恢复", 2, 3, "Spell_Nature_MoonGlow.png", "", "", "使你施放图腾所消耗的法力值减少 {0}。", new Array(), new Array());
	
	talents[601] = new Talent( "自然指引", "恢复", 3, 1, "Spell_Frost_Stun.png", "", "", "使你的法术和近战攻击命中目标的几率提高 {0}。", new Array(), new Array());
	
	talents[283] = new Talent( "治疗专注", "恢复", 3, 2, "Spell_Nature_HealingWaveLesser.png", "", "", "使你在施放任意治疗法术的时候有 {0} 的几率避免因受到伤害而被打断。", new Array(), new Array());
	
	talents[282] = new Talent( "图腾掌握", "恢复", 3, 3, "Spell_Nature_NullWard.png", "", "", "使你的图腾对友方目标的影响半径延长 {0}。", new Array(), new Array());
	
	talents[777] = new Talent( "治疗之赐", "恢复", 3, 4, "Spell_Nature_HealingTouch.png", "", "", "使你的所有治疗法术所造成的威胁值降低 {0}。", new Array(), new Array());
	
	talents[287] = new Talent( "恢复图腾", "恢复", 4, 2, "Spell_Nature_ManaRegenTotem.png", "", "", "使你的法力之泉图腾和治疗之泉图腾的效果提高 {0}。", new Array(), new Array());
	
	talents[779] = new Talent( "法力之潮图腾", "恢复", 7, 2, "Spell_Frost_SummonWaterElemental.png", "", "20 法力值<br>瞬发法术<br>5 分钟冷却时间<br>工具: 水之图腾[Water Totem]<br>", "在施法者身边召唤一个生命值为5点的法力之潮图腾，持续12秒。它可以为半径20码范围内的小队成员每3秒回复170点法力值。<br><br>Rank 2: 40点法力值，回复230点法力值<br>Rank 3: 60点法力值，回复290点法力值", new Array(), new Array(new TalentRequirement(287, 5)));
	
	talents[603] = new Talent( "自然迅捷", "恢复", 5, 3, "Spell_Nature_RavenForm.png", "", "瞬发法术<br>3分钟冷却时间<br>", "激活之后，你的下一个施法时间在10秒之内的自然法术会成为瞬发法术。", new Array(), new Array());
	
	talents[613] = new Talent( "净化", "恢复", 6, 3, "Spell_Frost_WizardMark.png", "", "", "使你的治疗法术的效果提高 {0}。", new Array(), new Array());
	
	talents[602] = new Talent( "潮汐掌握", "恢复", 4, 3, "Spell_Nature_Tranquility.png", "", "", "使你的治疗法术产生极效治疗的效果和闪电法术造成致命一击的效果提高{0}。", new Array(), new Array());
	
	talents[309] = new Talent( "治疗之道", "恢复", 5, 1, "healingway.png", "", "", "你的治疗波有 {0} 的几率令你的目标由以后的治疗波获得额外的治疗效果。这个效果使目标所受到的治疗波治疗效果提高6%，持续15秒，最多可叠加3次。", new Array(), new Array());
	
	talents[265].Info[0] = new TalentInfo(1, "5%", "", "");
	talents[265].Info[1] = new TalentInfo(2, "10%", "", "");
	talents[265].Info[2] = new TalentInfo(3, "15%", "", "");
	talents[268].Info[0] = new TalentInfo(1, "1%", "", "");
	talents[268].Info[1] = new TalentInfo(2, "2%", "", "");
	talents[268].Info[2] = new TalentInfo(3, "3%", "", "");
	talents[268].Info[3] = new TalentInfo(4, "4%", "", "");
	talents[268].Info[4] = new TalentInfo(5, "6%", "", "");
	talents[262].Info[0] = new TalentInfo(1, "2%", "", "");
	talents[262].Info[1] = new TalentInfo(2, "4%", "", "");
	talents[262].Info[2] = new TalentInfo(3, "6%", "", "");
	talents[262].Info[3] = new TalentInfo(4, "8%", "", "");
	talents[262].Info[4] = new TalentInfo(5, "10%", "", "");
	talents[263].Info[0] = new TalentInfo(1, "1%", "", "");
	talents[263].Info[1] = new TalentInfo(2, "2%", "", "");
	talents[263].Info[2] = new TalentInfo(3, "3%", "", "");
	talents[263].Info[3] = new TalentInfo(4, "4%", "", "");
	talents[263].Info[4] = new TalentInfo(5, "5%", "", "");
	talents[264].Info[0] = new TalentInfo(1, "25%,10%", "", "");
	talents[264].Info[1] = new TalentInfo(2, "50%,20%", "", "");
	talents[266].Info[0] = new TalentInfo(1, "4%", "", "");
	talents[266].Info[1] = new TalentInfo(2, "7%", "", "");
	talents[266].Info[2] = new TalentInfo(3, "10%", "", "");
	talents[267].Info[0] = new TalentInfo(1, "33%", "", "");
	talents[267].Info[1] = new TalentInfo(2, "66%", "", "");
	talents[267].Info[2] = new TalentInfo(3, "100%", "", "");
	talents[269].Info[0] = new TalentInfo(1, "0.2 秒", "", "");
	talents[269].Info[1] = new TalentInfo(2, "0.4 秒", "", "");
	talents[269].Info[2] = new TalentInfo(3, "0.6 秒", "", "");
	talents[269].Info[3] = new TalentInfo(4, "0.8 秒", "", "");
	talents[269].Info[4] = new TalentInfo(5, "1 秒", "", "");
	talents[271].Info[0] = new TalentInfo(1, "1秒,25%", "", "");
	talents[271].Info[1] = new TalentInfo(2, "2秒,50%", "", "");
	talents[272].Info[0] = new TalentInfo(1, "", "", "");
	talents[273].Info[0] = new TalentInfo(1, "3码", "", "");
	talents[273].Info[1] = new TalentInfo(2, "6码", "", "");
	talents[275].Info[0] = new TalentInfo(1, "0.2秒", "", "");
	talents[275].Info[1] = new TalentInfo(2, "0.4秒", "", "");
	talents[275].Info[2] = new TalentInfo(3, "0.6秒", "", "");
	talents[275].Info[3] = new TalentInfo(4, "0.8秒", "", "");
	talents[275].Info[4] = new TalentInfo(5, "1秒", "", "");
	talents[277].Info[0] = new TalentInfo(1, "0.1 秒", "", "");
	talents[277].Info[1] = new TalentInfo(2, "0.2 秒", "", "");
	talents[277].Info[2] = new TalentInfo(3, "0.3 秒", "", "");
	talents[277].Info[3] = new TalentInfo(4, "0.4 秒", "", "");
	talents[277].Info[4] = new TalentInfo(5, "0.5 秒", "", "");
	talents[280].Info[0] = new TalentInfo(1, "8%", "",  "");
	talents[280].Info[1] = new TalentInfo(2, "16%", "", "");
	talents[280].Info[2] = new TalentInfo(3, "25%", "", "");
	talents[282].Info[0] = new TalentInfo(1, "5 码", "", "");
	talents[283].Info[0] = new TalentInfo(1, "14%", "", "");
	talents[283].Info[1] = new TalentInfo(2, "28%", "", "");
	talents[283].Info[2] = new TalentInfo(3, "42%", "", "");
	talents[283].Info[3] = new TalentInfo(4, "56%", "", "");
	talents[283].Info[4] = new TalentInfo(5, "70%", "", "");
	talents[287].Info[0] = new TalentInfo(1, "5%", "", "");
	talents[287].Info[1] = new TalentInfo(2, "10%", "", "");
	talents[287].Info[2] = new TalentInfo(3, "15%", "", "");
	talents[287].Info[3] = new TalentInfo(4, "20%", "", "");
	talents[287].Info[4] = new TalentInfo(5, "25%", "", "");
	talents[291].Info[0] = new TalentInfo(1, "1%", "", "");
	talents[291].Info[1] = new TalentInfo(2, "2%", "", "");
	talents[291].Info[2] = new TalentInfo(3, "3%", "", "");
	talents[291].Info[3] = new TalentInfo(4, "4%", "", "");
	talents[291].Info[4] = new TalentInfo(5, "5%", "", "");
	talents[292].Info[0] = new TalentInfo(1, "1%,5%", "", "");
	talents[292].Info[1] = new TalentInfo(2, "2%,10%", "", "");
	talents[292].Info[2] = new TalentInfo(3, "3%,15%", "", "");
	talents[292].Info[3] = new TalentInfo(4, "4%,20%", "", "");
	talents[292].Info[4] = new TalentInfo(5, "5%,25%", "", "");
	talents[293].Info[0] = new TalentInfo(1, "10%,1秒", "", "");
	talents[293].Info[1] = new TalentInfo(2, "20%,2秒", "", "");
	talents[296].Info[0] = new TalentInfo(1, "5%", "", "");
	talents[296].Info[1] = new TalentInfo(2, "10%", "", "");
	talents[296].Info[2] = new TalentInfo(3, "15%", "", "");
	talents[297].Info[0] = new TalentInfo(1, "8%", "", "");
	talents[297].Info[1] = new TalentInfo(2, "15%", "", "");
	talents[295].Info[0] = new TalentInfo(1, "1 秒", "", "");
	talents[295].Info[1] = new TalentInfo(2, "2 秒", "", "");
	talents[299].Info[0] = new TalentInfo(1, "10%", "", "");
	talents[299].Info[1] = new TalentInfo(2, "15%", "", "");
	talents[299].Info[2] = new TalentInfo(3, "20%", "", "");
	talents[299].Info[3] = new TalentInfo(4, "25%", "", "");
	talents[299].Info[4] = new TalentInfo(5, "30%", "", "");
	talents[303].Info[0] = new TalentInfo(1, "2%", "", "");
	talents[303].Info[1] = new TalentInfo(2, "4%", "", "");
	talents[303].Info[2] = new TalentInfo(3, "6%", "", "");
	talents[303].Info[3] = new TalentInfo(4, "8%", "", "");
	talents[303].Info[4] = new TalentInfo(5, "10%", "", "");
	talents[309].Info[0] = new TalentInfo(1, "33%", "", "");
	talents[309].Info[1] = new TalentInfo(2, "66%", "", "");
	talents[309].Info[2] = new TalentInfo(3, "100%", "", "");
	talents[596].Info[0] = new TalentInfo(1, "10%", "", "");
	talents[598].Info[0] = new TalentInfo(1, "", "", "");
	talents[601].Info[0] = new TalentInfo(1, "1%", "", "");
	talents[601].Info[1] = new TalentInfo(2, "2%", "", "");
	talents[601].Info[2] = new TalentInfo(3, "3%", "", "");
	talents[606].Info[0] = new TalentInfo(1, "1%", "", "");
	talents[606].Info[1] = new TalentInfo(2, "2%", "", "");
	talents[606].Info[2] = new TalentInfo(3, "3%", "", "");
	talents[606].Info[3] = new TalentInfo(4, "4%", "", "");
	talents[606].Info[4] = new TalentInfo(5, "5%", "", "");
	talents[608].Info[0] = new TalentInfo(1, "7%,13%,5%", "", "");
	talents[608].Info[1] = new TalentInfo(2, "14%,27%,10%", "", "");
	talents[608].Info[2] = new TalentInfo(3, "20%,40%,15%", "", "");
	talents[777].Info[0] = new TalentInfo(1, "5%", "", "");
	talents[777].Info[1] = new TalentInfo(2, "10%", "", "");
	talents[777].Info[2] = new TalentInfo(3, "15%", "", "");
	talents[607].Info[0] = new TalentInfo(1, "15%,6%", "", "");
	talents[607].Info[1] = new TalentInfo(2, "30%,12%", "", "");
	talents[778].Info[0] = new TalentInfo(1, "10分钟,10%", "", "");
	talents[778].Info[1] = new TalentInfo(2, "20分钟,20%", "", "");
	talents[597].Info[0] = new TalentInfo(1, "3%", "", "");
	talents[597].Info[1] = new TalentInfo(2, "6%", "", "");
	talents[597].Info[2] = new TalentInfo(3, "9%", "", "");
	talents[779].Info[0] = new TalentInfo(1, "", "", "");
	talents[603].Info[0] = new TalentInfo(1, "", "", "");
	talents[609].Info[0] = new TalentInfo(1, "", "", "");
	talents[613].Info[0] = new TalentInfo(1, "2%", "", "");
	talents[613].Info[1] = new TalentInfo(2, "4%", "", "");
	talents[613].Info[2] = new TalentInfo(3, "6%", "", "");
	talents[613].Info[3] = new TalentInfo(4, "8%", "", "");
	talents[613].Info[4] = new TalentInfo(5, "10%", "", "");
	talents[612].Info[0] = new TalentInfo(1, "", "", "");
	talents[294].Info[0] = new TalentInfo(1, "1%", "", "");
	talents[294].Info[1] = new TalentInfo(2, "2%", "", "");
	talents[294].Info[2] = new TalentInfo(3, "3%", "", "");
	talents[294].Info[3] = new TalentInfo(4, "4%", "", "");
	talents[294].Info[4] = new TalentInfo(5, "5%", "", "");
	talents[599].Info[0] = new TalentInfo(1, "1%", "", "");
	talents[599].Info[1] = new TalentInfo(2, "2%", "", "");
	talents[599].Info[2] = new TalentInfo(3, "3%", "", "");
	talents[599].Info[3] = new TalentInfo(4, "4%", "", "");
	talents[599].Info[4] = new TalentInfo(5, "5%", "", "");
	talents[602].Info[0] = new TalentInfo(1, "1%", "", "");
	talents[602].Info[1] = new TalentInfo(2, "2%", "", "");
	talents[602].Info[2] = new TalentInfo(3, "3%", "", "");
	talents[602].Info[3] = new TalentInfo(4, "4%", "", "");
	talents[602].Info[4] = new TalentInfo(5, "5%", "", "");
	talents[600].Info[0] = new TalentInfo(1, "5%", "", "");
	talents[600].Info[1] = new TalentInfo(2, "10%", "", "");
	talents[600].Info[2] = new TalentInfo(3, "15%", "", "");
	talents[600].Info[3] = new TalentInfo(4, "20%", "", "");
	talents[600].Info[4] = new TalentInfo(5, "25%", "", "");
	talents[610].Info[0] = new TalentInfo(1, "2%", "", "");
	talents[610].Info[1] = new TalentInfo(2, "4%", "", "");
	talents[610].Info[2] = new TalentInfo(3, "6%", "", "");
	talents[610].Info[3] = new TalentInfo(4, "8%", "", "");
	talents[610].Info[4] = new TalentInfo(5, "10%", "", "");
	talents[605].Info[0] = new TalentInfo(1, "", "", "");


//----8<-------------------------------------------[


}
if (currentClass == classLst[7]) {
	talents[428] = new Talent( "清算", "毁灭", 2, 3, "Spell_Fire_Fire.png", "", "", "使你的毁灭系法术有{0}的几率令目标眩晕5秒。", new Array(), new Array());
	talents[790] = new Talent( "诅咒增幅", "痛苦", 3, 3, "Spell_Shadow_Contagion.png", "", "瞬发<br>3分钟冷却时间", "使你的下一个虚弱诅咒或痛苦诅咒的效果提高50%，或使你的下一个疲劳诅咒的效果提高20%。", new Array(), new Array());
	talents[429] = new Talent( "灾祸", "毁灭", 2, 2, "Spell_Shadow_DeathPact.png", "", "", "使你的地狱烈焰、暗影箭和献祭的施法时间减少 {0}，灵魂之火的施法时间减少 {1}。", new Array(), new Array());
	talents[427] = new Talent( "灾变", "毁灭", 1, 3, "Spell_Fire_WindsofWoe.png", "", "", "使你的毁灭系法术所消耗的法力值减少{0}。", new Array(), new Array());
	talents[797] = new Talent( "燃烧", "毁灭", 7, 2, "Spell_Fire_Fireball.png", "", "165 法力值<br>瞬发法术<br>10秒冷却时间<br>30码有效距离<br>", "点燃一个已经受到献祭效果影响的目标，对其造成240到306点火焰伤害，并吞噬献祭法术的效果。<br><br>等级2：200点法力消耗，316到396点火焰伤害，需要等级48。<br>等级3：230点法力消耗，383到479点火焰伤害，需要等级54。<br>等级4：255点法力消耗，447到557点火焰伤害，需要等级60。", new Array(), new Array(new TalentRequirement(438, 5)));
	talents[791] = new Talent( "疲劳诅咒", "痛苦", 5, 3, "Spell_Shadow_GrimWard.png", "", "108点法力值<br>瞬发法术<br>30码有效距离<br>", "使目标的速度降低到普通速度的90%，持续12秒。每个术士只能对一个目标施加一种诅咒，且同类诅咒不能叠加。", new Array(), new Array(new TalentRequirement(790, 1)));
	talents[793] = new Talent( "黑暗契约", "痛苦", 7, 2, "Spell_Shadow_DarkRitual.png", "", "瞬发<br>20码有效距离<br>", "从你的宠物身上抽取150点法力值并全部转化给你。<br><br>等级50：200点法力值<br>等级60：250点法力值", new Array(), new Array());
	talents[498] = new Talent( "恶魔之拥", "恶魔学识", 1, 3, "Spell_Shadow_Metamorphosis.png", "", "", "使你的耐力提高{0}，同时使你的精神降低{1}。", new Array(), new Array());
	talents[508] = new Talent( "恶魔牺牲", "恶魔学识", 5, 2, "Spell_Shadow_PsychicScream.png", "", "瞬发<br>100码有效距离<br>", "激活之后，牺牲你当前所召唤的恶魔，使你获得一种特殊效果，持续30分钟。如果在此期间你召唤任意一个恶魔，该效果就会被取消。<br><br>小鬼：使你的火焰技能伤害提高15%。<br><br>虚空行者：使你每4秒回复3%的生命值。<br>魅魔：使你的暗影技能伤害提高15%。<br>地狱犬：使你每4秒回复2%的法力值。", new Array(), new Array());
	talents[514] = new Talent( "毁灭延伸", "毁灭", 4, 2, "Spell_Shadow_CorpseExplode.png", "", "", "使你的毁灭系法术的射程增加{0}。", new Array(), new Array());
	talents[431] = new Talent( "破坏", "毁灭", 3, 3, "Spell_Fire_FlameShock.png", "", "", "使你的毁灭系法术的致命一击几率提高 {0}", new Array(), new Array());
	talents[444] = new Talent( "恶魔专注", "痛苦", 3, 2, "Spell_Shadow_FingerOfDeath.png", "", "", "使你有{0}的几率在施放吸取生命、吸取法力或吸取灵魂法术时不会因受到伤害而被打断。", new Array(), new Array());
	talents[503] = new Talent( "恶魔支配", "恶魔学识", 3, 2, "Spell_Nature_RemoveCurse.png", "", "瞬发<br>15分钟冷却时间", "你的下一个召唤小鬼、虚空行者、魅魔或地狱猎犬的法术施法时间减少5.5秒，法力消耗减少50%。", new Array(), new Array());
	talents[501] = new Talent( "恶魔智慧", "恶魔学识", 2, 3, "Spell_Holy_MagicalSentry.png", "", "", "使你的小鬼、虚空行者、魅魔和地狱猎犬的法力值上限提高{0}。", new Array(), new Array());
	talents[504] = new Talent( "恶魔耐力", "恶魔学识", 3, 3, "Spell_Shadow_AntiShadow.png", "", "", "使你的小鬼、虚空行者、魅魔和地狱猎犬的生命值上限提高{0}。", new Array(), new Array());
	talents[446] = new Talent( "无情延伸", "痛苦", 4, 1, "Spell_Shadow_CallofBone.png", "", "", "使你的痛苦系法术的射程延长{0}。", new Array(), new Array());
	talents[440] = new Talent( "强化腐蚀术", "痛苦", 1, 3, "Spell_Shadow_AbominationExplosion.png", "", "", "使你的腐化法术的施法时间减少{0}。", new Array(), new Array());
	talents[517] = new Talent( "强化痛苦诅咒", "痛苦", 3, 1, "Spell_Shadow_CurseOfSargeras.png", "", "", "使你的痛苦诅咒所造成的伤害提高{0}。", new Array(), new Array());
	talents[792] = new Talent( "强化疲劳诅咒", "痛苦", 5, 4, "Spell_Shadow_GrimWard.png", "", "", "使你的疲劳诅咒的减速效果提高{0}。", new Array(), new Array(new TalentRequirement(791, 1)));
	talents[515] = new Talent( "强化虚弱诅咒", "痛苦", 2, 1, "Spell_Shadow_CurseOfMannoroth.png", "", "", "使你的虚弱诅咒的效果提高{0}。", new Array(), new Array());
	talents[442] = new Talent( "强化吸取生命", "痛苦", 2, 4, "Spell_Shadow_LifeDrain02.png", "", "", "使你的吸取生命法术所吸取的生命值提高{0}。", new Array(), new Array());
	talents[520] = new Talent( "强化吸取法力", "痛苦", 4, 4, "Spell_Shadow_SiphonMana.png", "", "", "使你的吸取法力技能所吸取的法力值的{0}对目标造成等量伤害。", new Array(), new Array());
	talents[516] = new Talent( "强化吸取灵魂", "痛苦", 2, 2, "Spell_Shadow_Haunting.png", "", "", "在目标死于你的吸取灵魂过程中时，你有{0}的几率获得100%的法力值回复速度加成，持续10秒。在此期间，你在施法时也可保持50%的法力值回复速度。", new Array(), new Array());
	talents[507] = new Talent( "强化奴役恶魔", "恶魔学识", 5, 1, "Spell_Shadow_UnsummonBuilding.png", "", "", "使你的奴役恶魔法术的攻击速度和施法速度惩罚减轻{0}，恶魔抵抗奴役效果的几率降低{1}", new Array(), new Array());
	talents[433] = new Talent( "强化火焰箭", "毁灭", 3, 1, "Spell_Fire_FireBolt.png", "", "", "使小鬼的火焰箭的施法时间减少{0}。", new Array(), new Array());
	talents[509] = new Talent( "强化火焰石", "恶魔学识", 5, 4, "INV_Ammo_FireTar.png", "", "", "使你的火焰石的效果和伤害加成提高{0}。", new Array(), new Array());
	talents[499] = new Talent( "强化生命通道", "恶魔学识", 2, 1, "Spell_Shadow_LifeDrain.png", "", "", "使你的生命通道法术所转化的生命值提高{0}。", new Array(), new Array());
	talents[496] = new Talent( "强化治疗石", "恶魔学识", 1, 1, "INV_Stone_04.png", "", "", "使你的治疗石所恢复的生命值增加{0}。", new Array(), new Array());
	talents[438] = new Talent( "强化献祭", "毁灭", 5, 2, "Spell_Fire_Immolation.png", "", "", "使你的献祭法术的初始伤害提高{0}。", new Array(), new Array());
	talents[497] = new Talent( "强化小鬼", "恶魔学识", 1, 2, "Spell_Shadow_SummonImp.png", "", "", "使小鬼的火焰箭、火焰之盾和血之契印的效果提高{0}。", new Array(), new Array());
	talents[432] = new Talent( "强化巨痛鞭笞", "毁灭", 3, 2, "Spell_Holy_RemoveCurse.png", "", "", "使魅魔的剧痛鞭笞的冷却时间减少{0}。", new Array(), new Array());
	talents[443] = new Talent( "强化生命分流", "痛苦", 2, 3, "Spell_Shadow_BurningSpirit.png", "", "", "使你的生命分流法术所转化的法力值提高{0}。", new Array(), new Array());
	talents[434] = new Talent( "强化灼热之痛", "毁灭", 4, 4, "Spell_Fire_SoulBurn.png", "", "", "使你的灼热之痛造成致命一击的几率提高{0}。", new Array(), new Array());
	talents[426] = new Talent( "强化暗影箭", "毁灭", 1, 2, "Spell_Shadow_ShadowBolt.png", "", "", "在你的暗影箭对目标造成致命一击后，你对其造成的接连4次暗影伤害都将提高 {0}。<br>效果最多持续12秒。", new Array(), new Array());
	talents[512] = new Talent( "强化法术石", "恶魔学识", 7, 3, "INV_Misc_Gem_Sapphire_01.png", "", "", "使你的法术石所能吸收的伤害总量提高{0}。", new Array(), new Array());
	talents[502] = new Talent( "强化魅魔", "恶魔学识", 3, 1, "Spell_Shadow_SummonSuccubus.png", "", "", "使你的魅魔的剧痛鞭笞和安抚之吻法术的效果提高{0}，并使你的魅魔的诱惑和次级隐形术的持续时间延长{1}。", new Array(), new Array());
	talents[500] = new Talent( "强化虚空行者", "恶魔学识", 2, 2, "Spell_Shadow_SummonVoidWalker.png", "", "", "使你的虚空行者的折磨、吞噬暗影、牺牲和受难法术的效果提高{0}。", new Array(), new Array());
	talents[454] = new Talent( "琥珀风暴", "毁灭", 6, 3, "Spell_Fire_SelfDestruct.png", "", "", "使你的火焰法术造成的伤害提高{0}。", new Array(), new Array());
	talents[436] = new Talent( "强烈", "毁灭", 4, 1, "Spell_Fire_LavaSpawn.png", "", "", "使你有{0}的几率在施放火焰之雨或地狱烈焰法术时不会因受到伤害而被打断。", new Array(), new Array());
	talents[506] = new Talent( "邪恶强化", "恶魔学识", 4, 3, "Spell_Shadow_ShadowWordDominate.png", "", "", "使你的虚空行者、魅魔和地狱猎犬的近战伤害提高{0}。", new Array(), new Array());
	talents[505] = new Talent( "召唤大师", "恶魔学识", 4, 2, "Spell_Shadow_ImpPhaseShift.png", "", "", "使你召唤小鬼、虚空行者、魅魔和地狱猎犬的施法时间减少{0}，法力值消耗降低{1}", new Array(), new Array(new TalentRequirement(503, 1)));
	talents[519] = new Talent( "夜幕", "痛苦", 4, 2, "Spell_Shadow_Twilight.png", "", "", "使你的腐蚀术和吸取生命法术有{0}的几率在对敌人造成伤害之后令你进入暗影冥思状态。暗影冥思状可以令你的下一个暗影箭法术的施法时间减少100%。", new Array(), new Array());
	talents[439] = new Talent( "火焰冲击", "毁灭", 5, 1, "Spell_Fire_Volcano.png", "", "", "使你的火焰之雨和地狱烈焰法术有{0}的几率使目标昏迷3秒。", new Array(), new Array(new TalentRequirement(436, 2)));
	talents[796] = new Talent( "毁灭", "毁灭", 5, 3, "Spell_Shadow_ShadowWordPain.png", "", "", "使你的毁灭系法术的致命一击伤害加成提高100%。", new Array(), new Array(new TalentRequirement(431, 5)));
	talents[524] = new Talent( "暗影掌握", "痛苦", 6, 2, "Spell_Shadow_ShadeTrueSight.png", "", "", "使你的暗影法术所造成的伤害或吸取的生命值提高{0}。", new Array(), new Array(new TalentRequirement(521, 1)));
	talents[795] = new Talent( "暗影灼烧", "毁灭", 3, 4, "Spell_Shadow_ScourgeBuild.png", "", "105 法力值<br>瞬发法术<br>15秒冷却时间<br>20码有效距离<br><br>需要材料：灵魂碎片<br>", "立即使用暗影能量冲击目标，对其造成91到104点暗影伤害。如果目标死于暗影灼烧，且施法者因此获得经验值或荣誉，则施法者获得一块灵魂碎片。", new Array(), new Array());
	talents[521] = new Talent( "生命虹吸", "痛苦", 5, 2, "Spell_Shadow_Requiem.png", "", "150 法力值<br>瞬发<br>30码有效距离<br>", "每 3 秒将目标的 15 点生命值转移给施法者，持续 30 秒。<br><br>等级38：每 3 秒 22 点生命<br>等级48：每 3 秒 33 点生命<br>等级58：每 3 秒 45 点生命", new Array(), new Array());
	talents[794] = new Talent( "灵魂链接", "恶魔学识", 7, 2, "Spell_Shadow_GatherShadows.png", "", "270法力值<br>瞬发<br>100码有效距离<br>", "激活后，施法者受到伤害的30%将转化给召唤出来的恶魔宠物。另外，恶魔宠物和施法者所受到的伤害都降低3%。该效果一直持续到恶魔宠物消失才会被取消。", new Array(), new Array(new TalentRequirement(508, 1)));
	talents[441] = new Talent( "镇压", "痛苦", 1, 2, "Spell_Shadow_UnsummonBuilding.png", "", "", "使敌人抵抗你的痛苦系法术的几率降低{0}。", new Array(), new Array());
	talents[510] = new Talent( "恶魔学识大师", "恶魔学识", 6, 3, "Spell_Shadow_ShadowPact.png", "", "", "使术士和他所召唤的恶魔均获得一个特殊效果，只要该恶魔处于激活状态就不会消失。<br>小鬼 - 对敌人造成的威胁降低{0}。<br>虚空行者受到物理攻击时承受的伤害降低{1}。<br>魅魔对敌人造成的所有伤害提高{2}。<br>地狱猎犬 - 每等级所有抗性提高{3}。<br>", new Array(), new Array(new TalentRequirement(506, 5)));
	talents[428].Info[0] = new TalentInfo(1, "2%", "", "");
	talents[428].Info[1] = new TalentInfo(2, "4%", "", "");
	talents[428].Info[2] = new TalentInfo(3, "6%", "", "");
	talents[428].Info[3] = new TalentInfo(4, "8%", "", "");
	talents[428].Info[4] = new TalentInfo(5, "10%", "", "");
	talents[790].Info[0] = new TalentInfo(1, "", "", "");
	talents[429].Info[0] = new TalentInfo(1, "0.1 秒,0.4 秒", "", "");
	talents[429].Info[1] = new TalentInfo(2, "0.2 秒,0.8 秒", "", "");
	talents[429].Info[2] = new TalentInfo(3, "0.3 秒,1.2 秒", "", "");
	talents[429].Info[3] = new TalentInfo(4, "0.4 秒,1.6 秒", "", "");
	talents[429].Info[4] = new TalentInfo(5, "0.5 秒,2.0 秒", "", "");
	talents[427].Info[0] = new TalentInfo(1, "1%", "", "");
	talents[427].Info[1] = new TalentInfo(2, "2%", "", "");
	talents[427].Info[2] = new TalentInfo(3, "3%", "", "");
	talents[427].Info[3] = new TalentInfo(4, "4%", "", "");
	talents[427].Info[4] = new TalentInfo(5, "5%", "", "");
	talents[797].Info[0] = new TalentInfo(1, "", "", "");
	talents[791].Info[0] = new TalentInfo(1, "", "", "");
	talents[793].Info[0] = new TalentInfo(1, "", "", "");
	talents[498].Info[0] = new TalentInfo(1, "3%, 1%", "", "");
	talents[498].Info[1] = new TalentInfo(2, "6%, 2%", "", "");
	talents[498].Info[2] = new TalentInfo(3, "9%, 3%", "", "");
	talents[498].Info[3] = new TalentInfo(4, "12%, 4%", "", "");
	talents[498].Info[4] = new TalentInfo(5, "15%, 5%", "", "");
	talents[508].Info[0] = new TalentInfo(1, "", "", "");
	talents[514].Info[0] = new TalentInfo(1, "10%", "", "");
	talents[514].Info[1] = new TalentInfo(2, "20%", "", "");
	talents[431].Info[0] = new TalentInfo(1, "1%", "", "");
	talents[431].Info[1] = new TalentInfo(2, "2%", "", "");
	talents[431].Info[2] = new TalentInfo(3, "3%", "", "");
	talents[431].Info[3] = new TalentInfo(4, "4%", "", "");
	talents[431].Info[4] = new TalentInfo(5, "5%", "", "");
	talents[444].Info[0] = new TalentInfo(1, "14%", "", "");
	talents[444].Info[1] = new TalentInfo(2, "28%", "", "");
	talents[444].Info[2] = new TalentInfo(3, "42%", "", "");
	talents[444].Info[3] = new TalentInfo(4, "56%", "", "");
	talents[444].Info[4] = new TalentInfo(5, "70%", "", "");
	talents[503].Info[0] = new TalentInfo(1, "5.5 秒, 50%", "", "");
	talents[501].Info[0] = new TalentInfo(1, "3%", "", "");
	talents[501].Info[1] = new TalentInfo(2, "6%", "", "");
	talents[501].Info[2] = new TalentInfo(3, "9%", "", "");
	talents[501].Info[3] = new TalentInfo(4, "12%", "", "");
	talents[501].Info[4] = new TalentInfo(5, "15%", "", "");
	talents[504].Info[0] = new TalentInfo(1, "3%", "", "");
	talents[504].Info[1] = new TalentInfo(2, "6%", "", "");
	talents[504].Info[2] = new TalentInfo(3, "9%", "", "");
	talents[504].Info[3] = new TalentInfo(4, "12%", "", "");
	talents[504].Info[4] = new TalentInfo(5, "15%", "", "");
	talents[446].Info[0] = new TalentInfo(1, "10%", "", "");
	talents[446].Info[1] = new TalentInfo(2, "20%", "", "");
	talents[440].Info[0] = new TalentInfo(1, "0.4 秒", "", "");
	talents[440].Info[1] = new TalentInfo(2, "0.8 秒", "", "");
	talents[440].Info[2] = new TalentInfo(3, "1.2 秒", "", "");
	talents[440].Info[3] = new TalentInfo(4, "1.6 秒", "", "");
	talents[440].Info[4] = new TalentInfo(5, "2 秒", "", "");
	talents[517].Info[0] = new TalentInfo(1, "2%", "", "");
	talents[517].Info[1] = new TalentInfo(2, "4%", "", "");
	talents[517].Info[2] = new TalentInfo(3, "6%", "", "");
	talents[792].Info[0] = new TalentInfo(1, "5%", "", "");
	talents[792].Info[1] = new TalentInfo(2, "10%", "", "");
	talents[792].Info[2] = new TalentInfo(3, "15%", "", "");
	talents[792].Info[3] = new TalentInfo(4, "20%", "", "");
	talents[515].Info[0] = new TalentInfo(1, "6%", "", "");
	talents[515].Info[1] = new TalentInfo(2, "13%", "", "");
	talents[515].Info[2] = new TalentInfo(3, "20%", "", "");
	talents[442].Info[0] = new TalentInfo(1, "2%", "", "");
	talents[442].Info[1] = new TalentInfo(2, "4%", "", "");
	talents[442].Info[2] = new TalentInfo(3, "6%", "", "");
	talents[442].Info[3] = new TalentInfo(4, "8%", "", "");
	talents[442].Info[4] = new TalentInfo(5, "10%", "", "");
	talents[520].Info[0] = new TalentInfo(1, "15%", "", "");
	talents[520].Info[1] = new TalentInfo(2, "30%", "", "");
	talents[516].Info[0] = new TalentInfo(1, "50%", "", "");
	talents[516].Info[1] = new TalentInfo(2, "100%", "", "");
	talents[507].Info[0] = new TalentInfo(1, "2%,2%", "", "");
	talents[507].Info[1] = new TalentInfo(2, "4%,4%", "", "");
	talents[507].Info[2] = new TalentInfo(3, "6%,6%", "", "");
	talents[507].Info[3] = new TalentInfo(4, "8%,8%", "", "");
	talents[507].Info[4] = new TalentInfo(5, "10%,10%", "", "");
	talents[433].Info[0] = new TalentInfo(1, "0.5 秒", "", "");
	talents[433].Info[1] = new TalentInfo(2, "1 秒", "", "");
	talents[509].Info[0] = new TalentInfo(1, "15%", "", "");
	talents[509].Info[1] = new TalentInfo(2, "30%", "", "");
	talents[499].Info[0] = new TalentInfo(1, "10%", "", "");
	talents[499].Info[1] = new TalentInfo(2, "20%", "", "");
	talents[496].Info[0] = new TalentInfo(1, "10%", "", "");
	talents[496].Info[1] = new TalentInfo(2, "20%", "", "");
	talents[438].Info[0] = new TalentInfo(1, "5%", "", "");
	talents[438].Info[1] = new TalentInfo(2, "10%", "", "");
	talents[438].Info[2] = new TalentInfo(3, "15%", "", "");
	talents[438].Info[3] = new TalentInfo(4, "20%", "", "");
	talents[438].Info[4] = new TalentInfo(5, "25%", "", "");
	talents[497].Info[0] = new TalentInfo(1, "10%", "", "");
	talents[497].Info[1] = new TalentInfo(2, "20%", "", "");
	talents[497].Info[2] = new TalentInfo(3, "30%", "", "");
	talents[432].Info[0] = new TalentInfo(1, "3 秒", "", "");
	talents[432].Info[1] = new TalentInfo(2, "6 秒", "", "");
	talents[443].Info[0] = new TalentInfo(1, "10%", "", "");
	talents[443].Info[1] = new TalentInfo(2, "20%", "", "");
	talents[434].Info[0] = new TalentInfo(1, "2%", "", "");
	talents[434].Info[1] = new TalentInfo(2, "4%", "", "");
	talents[434].Info[2] = new TalentInfo(3, "6%", "", "");
	talents[434].Info[3] = new TalentInfo(4, "8%", "", "");
	talents[434].Info[4] = new TalentInfo(5, "10%", "", "");
	talents[426].Info[0] = new TalentInfo(1, "4%", "", "");
	talents[426].Info[1] = new TalentInfo(2, "8%", "", "");
	talents[426].Info[2] = new TalentInfo(3, "12%", "", "");
	talents[426].Info[3] = new TalentInfo(4, "16%", "", "");
	talents[426].Info[4] = new TalentInfo(5, "20%", "", "");
	talents[512].Info[0] = new TalentInfo(1, "15%", "", "");
	talents[512].Info[1] = new TalentInfo(2, "30%", "", "");
	talents[502].Info[0] = new TalentInfo(1, "10%, 10%", "", "");
	talents[502].Info[1] = new TalentInfo(2, "20%, 20%", "", "");
	talents[502].Info[2] = new TalentInfo(3, "30%, 30%", "", "");
	talents[500].Info[0] = new TalentInfo(1, "10%", "", "");
	talents[500].Info[1] = new TalentInfo(2, "20%", "", "");
	talents[500].Info[2] = new TalentInfo(3, "30%", "", "");
	talents[454].Info[0] = new TalentInfo(1, "2%", "", "");
	talents[454].Info[1] = new TalentInfo(2, "4%", "", "");
	talents[454].Info[2] = new TalentInfo(3, "6%", "", "");
	talents[454].Info[3] = new TalentInfo(4, "8%", "", "");
	talents[454].Info[4] = new TalentInfo(5, "10%", "", "");
	talents[436].Info[0] = new TalentInfo(1, "35%", "", "");
	talents[436].Info[1] = new TalentInfo(2, "70%", "", "");
	talents[506].Info[0] = new TalentInfo(1, "4%", "", "");
	talents[506].Info[1] = new TalentInfo(2, "8%", "", "");
	talents[506].Info[2] = new TalentInfo(3, "12%", "", "");
	talents[506].Info[3] = new TalentInfo(4, "16%", "", "");
	talents[506].Info[4] = new TalentInfo(5, "20%", "", "");
	talents[505].Info[0] = new TalentInfo(1, "2 秒,20%", "", "");
	talents[505].Info[1] = new TalentInfo(2, "4 秒,40%", "", "");
	talents[519].Info[0] = new TalentInfo(1, "2%", "", "");
	talents[519].Info[1] = new TalentInfo(2, "4%", "", "");
	talents[439].Info[0] = new TalentInfo(1, "13%", "", "");
	talents[439].Info[1] = new TalentInfo(2, "26%", "", "");
	talents[796].Info[0] = new TalentInfo(1, "", "", "");
	talents[524].Info[0] = new TalentInfo(1, "2%", "", "");
	talents[524].Info[1] = new TalentInfo(2, "4%", "", "");
	talents[524].Info[2] = new TalentInfo(3, "6%", "", "");
	talents[524].Info[3] = new TalentInfo(4, "8%", "", "");
	talents[524].Info[4] = new TalentInfo(5, "10%", "", "");
	talents[795].Info[0] = new TalentInfo(1, "", "", "");
	talents[521].Info[0] = new TalentInfo(1, "", "", "");
	talents[794].Info[0] = new TalentInfo(1, "", "", "");
	talents[441].Info[0] = new TalentInfo(1, "2%", "", "");
	talents[441].Info[1] = new TalentInfo(2, "4%", "", "");
	talents[441].Info[2] = new TalentInfo(3, "6%", "", "");
	talents[441].Info[3] = new TalentInfo(4, "8%", "", "");
	talents[441].Info[4] = new TalentInfo(5, "10%", "", "");
	talents[510].Info[0] = new TalentInfo(1, "4%,2%,2%,0.2", "", "");
	talents[510].Info[1] = new TalentInfo(2, "8%,4%,4%,0.4", "", "");
	talents[510].Info[2] = new TalentInfo(3, "12%,6%,6%,0.6", "", "");
	talents[510].Info[3] = new TalentInfo(4, "16%,8%,8%,0.8", "", "");
	talents[510].Info[4] = new TalentInfo(5, "20%,10%,10%,1", "", "");

//----8<-------------------------------------------[
}
if (currentClass == classLst[8]) {
	talents[798] = new Talent( "愤怒掌控", "武器", 3, 2, "Spell_Holy_BlessingOfStamina.png", "", "", "当脱离战斗后，使你的怒气减少速度降低 30%。", new Array(), new Array(new TalentRequirement(376, 5)));
	talents[815] = new Talent( "预知", "防护", 1, 3, "Spell_Nature_MirrorImage.png", "", "", "使你的防御技能提高 {0}。", new Array(), new Array());
	talents[383] = new Talent( "斧专精", "武器", 5, 1, "INV_Axe_06.png", "", "", "使你的斧类武器造成致命一击的几率提高{0}。", new Array(), new Array());
	talents[805] = new Talent( "血之狂热", "狂怒", 3, 3, "Spell_Shadow_SummonImp.png", "", "", "在受到致命一击之后的6秒内恢复生命值总量的{0}。", new Array(), new Array());
	talents[813] = new Talent( "嗜血", "狂怒", 7, 2, "Spell_Nature_BloodLust.png", "", "30怒气<br>瞬发<br>5码有效距离<br>6秒冷却时间<br>", "立即攻击目标，对其造成相当于你的攻击强度40%的伤害。另外，你的下5次成功的近战攻击每次都可令你回复10点生命。效果持续8秒。", new Array(), new Array(new TalentRequirement(809, 1)));
	talents[803] = new Talent( "震耳嗓音", "狂怒", 1, 2, "Spell_Nature_Purge.png", "", "", "使你的战斗怒吼和挫志怒吼效果的作用范围和持续时间提高{0}。", new Array(), new Array());
	talents[825] = new Talent( "震荡猛击", "防护", 5, 3, "Ability_ThunderBolt.png", "", "15 怒气<br>瞬发<br>45 秒冷却时间<br>需要近战武器", "野蛮的攻击，令目标昏迷5秒。", new Array(), new Array());
	talents[66] = new Talent( "残忍", "狂怒", 1, 3, "Ability_Rogue_Eviscerate.png", "", "", "使你用近战武器对敌人造成致命一击的几率提高{0}。", new Array(), new Array());
	talents[809] = new Talent( "死亡之愿", "狂怒", 5, 2, "Spell_Shadow_DeathPact.png", "", "10 怒气<br>瞬发<br>3分钟冷却时间<br>", "激活之后，你的物理攻击伤害提高20%，并免疫恐惧效果，但是对所有攻击的防御力都降低20%。持续30秒。", new Array(), new Array());
	talents[459] = new Talent( "重伤", "武器", 3, 3, "Ability_BackStab.png", "", "", "你的致命一击导致目标流血，使其在12秒内遭受相当于你的武器平均伤害值的{0}的伤害。", new Array(), new Array(new TalentRequirement(375, 3)));
	talents[820] = new Talent( "挑衅", "防护", 3, 4, "Ability_Warrior_InnerRage.png", "", "", "使你在防御姿态下由于攻击而造成的威胁值提高{0}。", new Array(), new Array());
	talents[374] = new Talent( "偏斜", "武器", 1, 2, "Ability_Parry.png", "", "", "使你的招架几率提高 {0}。", new Array(), new Array());
	talents[835] = new Talent( "双武器专精", "狂怒", 4, 1, "Ability_DualWield.png", "", "", "使你的副手武器所造成的伤害提高{0}", new Array(), new Array());
	talents[376] = new Talent( "战术掌握", "武器", 2, 2, "Spell_Nature_EnchantArmor.png", "", "", "在改变姿态的时候可以保留最多 {0}。", new Array(), new Array());
	talents[808] = new Talent( "狂怒", "狂怒", 4, 3, "Spell_Shadow_UnholyFrenzy.png", "", "", "使你在遭到敌人的致命一击之后所进行的12次近战攻击都获得{0}的额外伤害加值，效果持续12秒。", new Array(), new Array());
	talents[812] = new Talent( "乱舞", "狂怒", 6, 3, "Ability_GhoulFrenzy.png", "", "", "当你的近战攻击打出致命一击之后，你的下3次近战攻击速度将提高 {0}。", new Array(), new Array(new TalentRequirement(808, 5)));
	talents[460] = new Talent( "穿刺", "武器", 4, 3, "Ability_SearingArrow.png", "", "", "使你在战斗姿态、防御姿态和狂暴姿态下的各种技能的致命一击伤害加成提高{0}。", new Array(), new Array(new TalentRequirement(459, 3)));
	talents[375] = new Talent( "强化撕裂", "武器", 1, 3, "Ability_Gouge.png", "", "", "使你的撕裂技能的流血伤害效果每次生效时都提高 {0}", new Array(), new Array());
	talents[82] = new Talent( "强化冲锋", "武器", 2, 1, "Ability_Warrior_Charge.png", "", "", "使你的冲锋技能积攒的怒气值提高 {0}。", new Array(), new Array());
	talents[806] = new Talent( "强化战斗怒吼", "狂怒", 3, 4, "Ability_Warrior_BattleShout.png", "", "", "使你的战斗怒吼提高攻击强度的效果增强{0}", new Array(), new Array());
	talents[811] = new Talent( "强化狂暴之怒", "狂怒", 6, 1, "Spell_Nature_AncestralGuardian.png", "", "", "在使用狂暴之怒技能之后获得{0}怒气值。", new Array(), new Array());
	talents[619] = new Talent( "强化血性狂暴", "防护", 2, 1, "Ability_Racial_BloodRage.png", "", "", "使你的血性狂暴技能所产生的怒气值提高 {0}。", new Array(), new Array());
	talents[804] = new Talent( "强化顺劈斩", "狂怒", 3, 1, "Ability_Warrior_Cleave.png", "", "", "使你的顺劈斩技能附加的伤害提高{0}。", new Array(), new Array());
	talents[403] = new Talent( "强化挫志怒吼", "狂怒", 2, 2, "Ability_Warrior_WarCry.png", "", "", "使你的挫志怒吼技能降低敌人攻击强度的效果提高{0}。", new Array(), new Array());
	talents[821] = new Talent( "强化缴械", "防护", 4, 2, "Ability_Warrior_Disarm.png", "", "", "使你的缴械技能的效果持续时间延长{0}。", new Array(), new Array());
	talents[807] = new Talent( "强化斩杀", "狂怒", 4, 2, "INV_Sword_48.png", "", "", "使你的斩杀技能的怒气值消耗减少{0}。", new Array(), new Array());
	talents[388] = new Talent( "强化断筋", "武器", 6, 3, "Ability_ShockWave.png", "", "", "使你的断筋技能有 {0} 的几率令目标无法移动，持续5秒。", new Array(), new Array());
	talents[373] = new Talent( "强化英勇打击", "武器", 1, 1, "Ability_Rogue_Ambush.png", "", "", "使你的英勇打击技能所消耗的怒气值减少 {0}。", new Array(), new Array());
	talents[810] = new Talent( "强化拦截", "狂怒", 5, 4, "Ability_Rogue_Sprint.png", "", "", "使你的拦截技能的冷却时间减少{0}。", new Array(), new Array());
	talents[378] = new Talent( "强化压制", "武器", 3, 1, "INV_Sword_05.png", "", "", "使你的压制技能造成致命一击的几率提高{0}。", new Array(), new Array());
	talents[819] = new Talent( "强化复仇", "防护", 3, 3, "Ability_Warrior_Revenge.png", "", "", "使你的复仇技能有 {0} 的几率令目标昏迷3秒。", new Array(), new Array());
	talents[824] = new Talent( "强化盾击", "防护", 5, 2, "Ability_Warrior_ShieldBash.png", "", "", "使你的盾击技能有{0}的几率使目标沉默3秒。", new Array(), new Array());
	talents[818] = new Talent( "强化盾牌格挡", "防护", 3, 2, "Ability_Defend.png", "", "", "使你的盾牌格档技能可以额外格档一次攻击，并使其有效时间延长{0}。", new Array(), new Array(new TalentRequirement(814, 5)));
	talents[823] = new Talent( "强化盾墙", "防护", 5, 1, "Ability_Warrior_ShieldWall.png", "", "", "使你的盾墙技能的有效时间延长{0}。", new Array(), new Array());
	talents[632] = new Talent( "强化猛击", "狂怒", 5, 1, "Ability_Warrior_DecisiveStrike.png", "", "", "使你的猛击技能的施放时间减少{0}。", new Array(), new Array());
	talents[623] = new Talent( "强化破甲攻击", "防护", 4, 1, "Ability_Warrior_Sunder.png", "", "", "减少破甲技能所消耗的怒气 {0}。", new Array(), new Array());
	talents[822] = new Talent( "强化嘲讽", "防护", 4, 3, "Spell_Nature_Reincarnation.png", "", "", "使你的嘲讽技能的冷却时间减少{0}。", new Array(), new Array());
	talents[377] = new Talent( "强化雷霆一击", "武器", 2, 4, "Ability_ThunderClap.png", "", "", "使你的雷霆一击技能所消耗的怒气值减少 {0}。", new Array(), new Array());
	talents[49] = new Talent( "钢铁意志", "防护", 2, 4, "Spell_Magic_MageArmor.png", "", "", "使你抵抗昏迷和魅惑效果的几率提高{0}。", new Array(), new Array());
	talents[817] = new Talent( "破釜沉舟", "防护", 3, 1, "Spell_Holy_AshesToAshes.png", "", "瞬发<br>10分钟冷却时间", "激活之后，使你暂时获得30%的生命值，持续20秒。在效果解除之后，这些生命值会被扣除。", new Array(), new Array(new TalentRequirement(619, 2)));
	talents[461] = new Talent( "锤类武器专精", "武器", 5, 3, "INV_Mace_01.png", "", "", "使你的单手锤在击中目标时有 {0} 的机会将其击晕3秒。", new Array(), new Array());
	talents[802] = new Talent( "致死打击", "武器", 7, 2, "Ability_Warrior_SavageBlow.png", "", "30怒气<br>瞬发<br>6秒冷却时间<br>5码有效距离<br>需要近战武器<br>", "一次邪恶的攻击，对目标造成武器伤害外加85点伤害，并使任何形式的治疗对其产生的效果降低50%，持续10秒。<br><br>　技能等级提升后的效果：<br>　等级2：+110伤害<br>　等级3：+135伤害<br>　等级4：+160伤害", new Array(), new Array(new TalentRequirement(799, 1)));
	talents[400] = new Talent( "单手武器专精", "防护", 6, 2, "INV_Sword_20.png", "", "", "使你的单手近战武器所能造成的伤害提高{0}。", new Array(), new Array());
	talents[628] = new Talent( "刺耳怒吼", "狂怒", 3, 2, "Spell_Shadow_DeathScream.png", "", "10 怒气<br>瞬发<br>", "使战士附近的所有敌人震慑6秒。", new Array(), new Array());
	talents[801] = new Talent( "长柄武器专精", "武器", 6, 1, "INV_Weapon_Halbard_01.png", "", "", "使你的矛和长柄武器造成致命一击的几率提高{0}。", new Array(), new Array());
	talents[826] = new Talent( "盾牌猛击", "防护", 7, 3, "INV_Shield_05.png", "", "30 怒气<br>瞬发<br>5码有效距离<br>6秒冷却时间<br>", "用盾牌击打目标，对其造成288到352点伤害，并有50%的几率驱散目标身上的1个魔法效果，同时产生一定量的威胁值。", new Array(), new Array(new TalentRequirement(825, 1)));
	talents[814] = new Talent( "盾牌专精", "防护", 1, 2, "INV_Shield_06.png", "", "", "使你用盾牌格挡攻击的几率提高{0}，在成功格挡后有{1}的几率得到1点怒气。", new Array(), new Array());
	talents[799] = new Talent( "横扫攻击", "武器", 5, 2, "Ability_Rogue_SliceDice.png", "", "30怒气<br>瞬发<br>30秒冷却时间<br>需要近战武器<br>需要战斗姿态<br>", "你在接下来的5次近战攻击中可以攻击到一个额外的敌人。", new Array(), new Array());
	talents[800] = new Talent( "剑类武器专精", "武器", 5, 4, "INV_Sword_27.png", "", "", "使你在用剑类武器击中敌人后有{0}的几率进行一次额外的攻击。", new Array(), new Array());
	talents[816] = new Talent( "坚韧", "防护", 2, 3, "Spell_Holy_Devotion.png", "", "", "使你因装备而获得的护甲值提高{0}。", new Array(), new Array());
	talents[615] = new Talent( "双手武器专精", "武器", 4, 2, "INV_Axe_09.png", "", "", "使你的双手近战武器造成的伤害提高{0}。", new Array(), new Array());
	talents[404] = new Talent( "怒不可遏", "狂怒", 2, 3, "Spell_Nature_StoneClawTotem.png", "", "", "使你有{0}的几率在对敌人造成近战伤害之后获得1个额外的怒气点数。", new Array(), new Array());
	talents[835].Info[0] = new TalentInfo(1, "5%", "", "");
	talents[835].Info[1] = new TalentInfo(2, "10%", "", "");
	talents[835].Info[2] = new TalentInfo(3, "15%", "", "");
	talents[835].Info[3] = new TalentInfo(4, "20%", "", "");
	talents[835].Info[4] = new TalentInfo(5, "25%", "", "");
	talents[798].Info[0] = new TalentInfo(1, "", "", "");
	talents[815].Info[0] = new TalentInfo(1, "2 点", "", "");
	talents[815].Info[1] = new TalentInfo(2, "4 点", "", "");
	talents[815].Info[2] = new TalentInfo(3, "6 点", "", "");
	talents[815].Info[3] = new TalentInfo(4, "8 点", "", "");
	talents[815].Info[4] = new TalentInfo(5, "10 点", "", "");
	talents[383].Info[0] = new TalentInfo(1, "1%", "", "");
	talents[383].Info[1] = new TalentInfo(2, "2%", "", "");
	talents[383].Info[2] = new TalentInfo(3, "3%", "", "");
	talents[383].Info[3] = new TalentInfo(4, "4%", "", "");
	talents[383].Info[4] = new TalentInfo(5, "5%", "", "");
	talents[805].Info[0] = new TalentInfo(1, "1%", "", "");
	talents[805].Info[1] = new TalentInfo(2, "2%", "", "");
	talents[805].Info[2] = new TalentInfo(3, "3%", "", "");
	talents[813].Info[0] = new TalentInfo(1, "", "", "");
	talents[803].Info[0] = new TalentInfo(1, "10%", "", "");
	talents[803].Info[1] = new TalentInfo(2, "20%", "", "");
	talents[803].Info[2] = new TalentInfo(3, "30%", "", "");
	talents[803].Info[3] = new TalentInfo(4, "40%", "", "");
	talents[803].Info[4] = new TalentInfo(5, "50%", "", "");
	talents[825].Info[0] = new TalentInfo(1, "", "", "");
	talents[66].Info[0] = new TalentInfo(1, "1%", "", "");
	talents[66].Info[1] = new TalentInfo(2, "2%", "", "");
	talents[66].Info[2] = new TalentInfo(3, "3%", "", "");
	talents[66].Info[3] = new TalentInfo(4, "4%", "", "");
	talents[66].Info[4] = new TalentInfo(5, "5%", "", "");
	talents[809].Info[0] = new TalentInfo(1, "", "", "");
	talents[459].Info[0] = new TalentInfo(1, "20%", "", "");
	talents[459].Info[1] = new TalentInfo(2, "40%", "", "");
	talents[459].Info[2] = new TalentInfo(3, "60%", "", "");
	talents[820].Info[0] = new TalentInfo(1, "3%", "", "");
	talents[820].Info[1] = new TalentInfo(2, "6%", "", "");
	talents[820].Info[2] = new TalentInfo(3, "9%", "", "");
	talents[820].Info[3] = new TalentInfo(4, "12%", "", "");
	talents[820].Info[4] = new TalentInfo(5, "15%", "", "");
	talents[374].Info[0] = new TalentInfo(1, "1%", "", "");
	talents[374].Info[1] = new TalentInfo(2, "2%", "", "");
	talents[374].Info[2] = new TalentInfo(3, "3%", "", "");
	talents[374].Info[3] = new TalentInfo(4, "4%", "", "");
	talents[374].Info[4] = new TalentInfo(5, "5%", "", "");
	talents[808].Info[0] = new TalentInfo(1, "5%", "", "");
	talents[808].Info[1] = new TalentInfo(2, "10%", "", "");
	talents[808].Info[2] = new TalentInfo(3, "15%", "", "");
	talents[808].Info[3] = new TalentInfo(4, "20%", "", "");
	talents[808].Info[4] = new TalentInfo(5, "25%", "", "");
	talents[812].Info[0] = new TalentInfo(1, "10%", "", "");
	talents[812].Info[1] = new TalentInfo(2, "15%", "", "");
	talents[812].Info[2] = new TalentInfo(3, "20%", "", "");
	talents[812].Info[3] = new TalentInfo(4, "25%", "", "");
	talents[812].Info[4] = new TalentInfo(5, "30%", "", "");
	talents[460].Info[0] = new TalentInfo(1, "10%", "", "");
	talents[460].Info[1] = new TalentInfo(2, "20%", "", "");
	talents[806].Info[0] = new TalentInfo(1, "5%", "", "");
	talents[806].Info[1] = new TalentInfo(2, "10%", "", "");
	talents[806].Info[2] = new TalentInfo(3, "15%", "", "");
	talents[806].Info[3] = new TalentInfo(4, "20%", "", "");
	talents[806].Info[4] = new TalentInfo(5, "25%", "", "");
	talents[811].Info[0] = new TalentInfo(1, "5 点", "", "");
	talents[811].Info[1] = new TalentInfo(2, "10 点", "", "");
	talents[619].Info[0] = new TalentInfo(1, "2 点", "", "");
	talents[619].Info[1] = new TalentInfo(2, "5 点", "", "");
	talents[82].Info[0] = new TalentInfo(1, "3 点", "", "");
	talents[82].Info[1] = new TalentInfo(2, "6 点", "", "");
	talents[804].Info[0] = new TalentInfo(1, "40%", "", "");
	talents[804].Info[1] = new TalentInfo(2, "80%", "", "");
	talents[804].Info[2] = new TalentInfo(3, "120%", "", "");
	talents[403].Info[0] = new TalentInfo(1, "8%", "", "");
	talents[403].Info[1] = new TalentInfo(2, "16%", "", "");
	talents[403].Info[2] = new TalentInfo(3, "24%", "", "");
	talents[403].Info[3] = new TalentInfo(4, "32%", "", "");
	talents[403].Info[4] = new TalentInfo(5, "40%", "", "");
	talents[821].Info[0] = new TalentInfo(1, "1 秒", "", "");
	talents[821].Info[1] = new TalentInfo(2, "2 秒", "", "");
	talents[821].Info[2] = new TalentInfo(3, "3 秒", "", "");
	talents[807].Info[0] = new TalentInfo(1, "2点", "", "");
	talents[807].Info[1] = new TalentInfo(2, "5点", "", "");
	talents[388].Info[0] = new TalentInfo(1, "5%", "", "");
	talents[388].Info[1] = new TalentInfo(2, "10%", "", "");
	talents[388].Info[2] = new TalentInfo(3, "15%", "", "");
	talents[373].Info[0] = new TalentInfo(1, "1 点", "", "");
	talents[373].Info[1] = new TalentInfo(2, "2 点", "", "");
	talents[373].Info[2] = new TalentInfo(3, "3 点", "", "");
	talents[810].Info[0] = new TalentInfo(1, "5 秒", "", "");
	talents[810].Info[1] = new TalentInfo(2, "10 秒", "", "");
	talents[378].Info[0] = new TalentInfo(1, "25%", "", "");
	talents[378].Info[1] = new TalentInfo(2, "50%", "", "");
	talents[375].Info[0] = new TalentInfo(1, "15%", "", "");
	talents[375].Info[1] = new TalentInfo(2, "25%", "", "");
	talents[375].Info[2] = new TalentInfo(3, "35%", "", "");
	talents[819].Info[0] = new TalentInfo(1, "15%", "", "");
	talents[819].Info[1] = new TalentInfo(2, "30%", "", "");
	talents[819].Info[2] = new TalentInfo(3, "45%", "", "");
	talents[824].Info[0] = new TalentInfo(1, "50%", "", "");
	talents[824].Info[1] = new TalentInfo(2, "100%", "", "");
	talents[818].Info[0] = new TalentInfo(1, "0.5 秒", "", "");
	talents[818].Info[1] = new TalentInfo(2, "1 秒", "", "");
	talents[818].Info[2] = new TalentInfo(3, "2 秒", "", "");
	talents[823].Info[0] = new TalentInfo(1, "3 秒", "", "");
	talents[823].Info[1] = new TalentInfo(2, "5 秒", "", "");
	talents[632].Info[0] = new TalentInfo(1, "0.1 秒", "", "");
	talents[632].Info[1] = new TalentInfo(2, "0.2 秒", "", "");
	talents[632].Info[2] = new TalentInfo(3, "0.3 秒", "", "");
	talents[632].Info[3] = new TalentInfo(4, "0.4 秒", "", "");
	talents[632].Info[4] = new TalentInfo(5, "0.5 秒", "", "");
	talents[623].Info[0] = new TalentInfo(1, "1 点", "", "");
	talents[623].Info[1] = new TalentInfo(2, "2 点", "", "");
	talents[623].Info[2] = new TalentInfo(3, "3 点", "", "");
	talents[822].Info[0] = new TalentInfo(1, "1 秒", "", "");
	talents[822].Info[1] = new TalentInfo(2, "2 秒", "", "");
	talents[377].Info[0] = new TalentInfo(1, "1 点", "", "");
	talents[377].Info[1] = new TalentInfo(2, "2 点", "", "");
	talents[377].Info[2] = new TalentInfo(3, "4 点", "", "");
	talents[49].Info[0] = new TalentInfo(1, "3%", "", "");
	talents[49].Info[1] = new TalentInfo(2, "6%", "", "");
	talents[49].Info[2] = new TalentInfo(3, "9%", "", "");
	talents[49].Info[3] = new TalentInfo(4, "12%", "", "");
	talents[49].Info[4] = new TalentInfo(5, "15%", "", "");
	talents[817].Info[0] = new TalentInfo(1, "", "", "");
	talents[461].Info[0] = new TalentInfo(1, "1%", "", "");
	talents[461].Info[1] = new TalentInfo(2, "2%", "", "");
	talents[461].Info[2] = new TalentInfo(3, "3%", "", "");
	talents[461].Info[3] = new TalentInfo(4, "4%", "", "");
	talents[461].Info[4] = new TalentInfo(5, "6%", "", "");
	talents[802].Info[0] = new TalentInfo(1, "", "", "");
	talents[400].Info[0] = new TalentInfo(1, "2%", "", "");
	talents[400].Info[1] = new TalentInfo(2, "4%", "", "");
	talents[400].Info[2] = new TalentInfo(3, "6%", "", "");
	talents[400].Info[3] = new TalentInfo(4, "8%", "", "");
	talents[400].Info[4] = new TalentInfo(5, "10%", "", "");
	talents[628].Info[0] = new TalentInfo(1, "", "", "");
	talents[801].Info[0] = new TalentInfo(1, "1%", "", "");
	talents[801].Info[1] = new TalentInfo(2, "2%", "", "");
	talents[801].Info[2] = new TalentInfo(3, "3%", "", "");
	talents[801].Info[3] = new TalentInfo(4, "4%", "", "");
	talents[801].Info[4] = new TalentInfo(5, "5%", "", "");
	talents[826].Info[0] = new TalentInfo(1, "", "", "");
	talents[814].Info[0] = new TalentInfo(1, "1%,20%", "", "");
	talents[814].Info[1] = new TalentInfo(2, "2%,40%", "", "");
	talents[814].Info[2] = new TalentInfo(3, "3%,60%", "", "");
	talents[814].Info[3] = new TalentInfo(4, "4%,80%", "", "");
	talents[814].Info[4] = new TalentInfo(5, "5%,100%", "", "");
	talents[799].Info[0] = new TalentInfo(1, "", "", "");
	talents[800].Info[0] = new TalentInfo(1, "1%", "", "");
	talents[800].Info[1] = new TalentInfo(2, "2%", "", "");
	talents[800].Info[2] = new TalentInfo(3, "3%", "", "");
	talents[800].Info[3] = new TalentInfo(4, "4%", "", "");
	talents[800].Info[4] = new TalentInfo(5, "5%", "", "");
	talents[376].Info[0] = new TalentInfo(1, "5点怒气", "", "");
	talents[376].Info[1] = new TalentInfo(2, "10点怒气", "", "");
	talents[376].Info[2] = new TalentInfo(3, "15点怒气", "", "");
	talents[376].Info[3] = new TalentInfo(4, "20点怒气", "", "");
	talents[376].Info[4] = new TalentInfo(5, "25点怒气", "", "");
	talents[816].Info[0] = new TalentInfo(1, "2%", "", "");
	talents[816].Info[1] = new TalentInfo(2, "4%", "", "");
	talents[816].Info[2] = new TalentInfo(3, "6%", "", "");
	talents[816].Info[3] = new TalentInfo(4, "8%", "", "");
	talents[816].Info[4] = new TalentInfo(5, "10%", "", "");
	talents[615].Info[0] = new TalentInfo(1, "1%", "", "");
	talents[615].Info[1] = new TalentInfo(2, "2%", "", "");
	talents[615].Info[2] = new TalentInfo(3, "3%", "", "");
	talents[615].Info[3] = new TalentInfo(4, "4%", "", "");
	talents[615].Info[4] = new TalentInfo(5, "5%", "", "");
	talents[404].Info[0] = new TalentInfo(1, "8%", "", "");
	talents[404].Info[1] = new TalentInfo(2, "16%", "", "");
	talents[404].Info[2] = new TalentInfo(3, "24%", "", "");
	talents[404].Info[3] = new TalentInfo(4, "32%", "", "");
	talents[404].Info[4] = new TalentInfo(5, "40%", "", "");
}
}

function talents_main(){
	className = currentClass;
	masteries = new Array();
	for(var i in types)
	{
		masteries[types[i]] = 0;
	}
	resetTalents();
	learned = new Array();
	currentTalent = 0;

	var tmpTalList ;
	if (chinese) {
		tmpTalList = "点击查看所有天赋";
	}else{
		tmpTalList = "Click to Show All Talentes";
	}

	setInnerHTML(document.getElementById("curClass"), "["+currentClass+"]:<span class=\"accent\"onmouseover=\"this.style.cursor='hand'\" onclick=\"talList();\">"+tmpTalList+"</span>");
	
	mozilla = false;
	if(/Netscape/.test(navigator.appName))
	{
		mozilla = true;
		document.write("<div id=\"tooltip\" class=\"tooltip\" style=\"z-index: 3; position: absolute; width:250; visibility: hidden;\"></div>");
	}
	
	changeTree();
	icons = new Array();
	loadImages();
	setLevel(60);
	refreshTemplateDetails();
	changeType(currentType);
//	chkNoInfoId();
}
//--add change the tree name in html
function changeTree(){
	var tmp_id;
	for (var i=0;i<=2;i++) {
	tmp_id = document.getElementById("Atype_"+i);
	setInnerHTML(tmp_id, "<b>"+types[i]+"</b>");
	tmp_id = document.getElementById("type_"+i);
	setInnerHTML(tmp_id, "<b>"+types[i]+":&nbsp;</b>");
	}
}
function refreshTemplateDetails()
{
	var talentHtml = "<table cellspacing=0 cellpadding=2 border=0 width=100% height=100%>";
	
	talentHtml += "<tr><td valign=top>";
    talentHtml += "<div width=100% style=\"overflow: auto; height: 310; scrollbar-base-color: black; scrollbar-arrow-color: #999999\">";
    
    talentHtml += getLearnedText();
	talentHtml += "</div>";
	talentHtml += "</td></tr>";
	talentHtml += "</table>";
	var descDiv = document.getElementById("talent_description");
	setInnerHTML(descDiv, talentHtml);
	
	refreshTemplateData();
}
function refreshTemplateData()
{
    var formTemplate = document.getElementById("DataDetail_Template");
    if(formTemplate != null)
    {
	formTemplate.value = getTemplateData();
    }
    
    var templateUnspent = document.getElementById("DataDetail_Unspent");
    if(templateUnspent != null)
    {
	templateUnspent.value = talentPoints;
    }
}
function showTalent(e, id)
{
	var learn = canLearn(id);
	var html = "<table cellspacing=0 cellpadding=2 border=0>";
	html += "<tr><td><nobr><span class=\"accent\"><b>" + talents[id].Name + "</b></span></nobr>";
	if(chinese){
		html += "<br><nobr><b>等级 ";
	}else{
		html += "<br><nobr><b>Rank ";
	}
	if(learned[id] == null)
	{
		html += "0";
	}
	else
	{
		html += learned[id];
	}
	html += "/" + talents[id].Info.length + "</b></nobr>";
	for(var i in talents[id].Requirements)
	{
		var req = talents[id].Requirements[i];
		html += "<br><nobr><span class=\"smalltext\"";
		if(learned[req.Id] == null || learned[req.Id] < req.Amount)
		{
			html += " style=\"color: red;\"";
		}
		if(chinese){
			html += ">需要 " + req.Amount + " 点";
		}else{
			html += ">Req " + req.Amount + " Point";
			if(req.Amount != 1)
			{			html += "s";		}
		}
		if(chinese){
		html += " 在 " + talents[req.Id].Name + "</span></nobr>";
		}else{
		html += " in " + talents[req.Id].Name + "</span></nobr>";
		}
	}
	if(talents[id].Tier > 1)
	{
		var typereq = (talents[id].Tier - 1) * 5;
		html += "<br><nobr><span class=\"smalltext\"";
		if(masteries[talents[id].Type] < typereq)
		{
			html += " style=\"color: red;\"";
		}
		if(chinese){
		html += ">需要 " + typereq + " 点";
		}else{
		html += ">Req " + typereq + " Point";
		if(talents[id].TypeReq != 1)
		{
			html += "s";
		}
		}
		if(chinese){
		html += " 在 " + talents[id].Type + " 天赋</span></nobr>";
		}else{
		html += " in " + talents[id].Type + " Talent</span></nobr>";
		}
	}
	var minLevel = getMinLevel(id);
	html += "<br><nobr><span class=\"smalltext\"";
	if(currentLevel < minLevel)
	{
	    html += " style=\"color: red;\"";
	}
	if(chinese){
	html += ">最低等级: " + minLevel;
	}else{
	html += ">Min Level: " + minLevel;
	}
	html += "</span></nobr>";
    html += "<br><br>";
    if(talents[id].Info.length > 0)
    {
	if(talents[id].Info.length != 1)
	{
	    if(chinese){
	    html += "<b>等级 1:</b> ";
	    }else{
	    html += "<b>Rank 1:</b> ";
	    }
	}
	var details = talents[id].Details;
	if(details == "")
	{
	    details = talents[id].Info[0].Details;
	}
	if(details != "")
	{
	    html += "<span class=\"smalltext\">" + details + "</span><br>";
	}
	html += "<span class=\"accent\">" + getTalentDescription(id, 1) + "</span><br>";
    }
    if(talents[id].Info.length > 1)
    {
	for(var i = 1; i < talents[id].Info.length; i++)
	{
	    if(chinese){html += "<b>等级 " + talents[id].Info[i].Rank + ":</b> <span class=\"accent\">";
	    }else{html += "<b>Rank " + talents[id].Info[i].Rank + ":</b> <span class=\"accent\">";}
	    if(talents[id].Info[i].Amount == "")
	    {
		html += "?";
	    }
	    else
	    {
		html += talents[id].Info[i].Amount;
	    }
	    html += "</span><br>";
	}
    }
	
	if(learn)
	{
		if(chinese){html += "<br><nobr><span class=\"smalltext\"><span style=\"color:LimeGreen\"><b>左键点击学习 双击学到头</b></span></span></nobr>";
		}else{html += "<br><nobr><span class=\"smalltext\"><span style=\"color:LimeGreen\"><b>OnClick to Learn; Double Click to Learn Max</b></span></span></nobr>";}
	}
	if(canUnlearn(id))
	{
	    if(chinese){html += "<br><nobr><span class=\"smalltext\"><span style=\"color:Red\"><b>右键点击 忘却</b></span></span></nobr>";
	    }else{html += "<br><nobr><span class=\"smalltext\"><span style=\"color:Red\"><b>Right Click to Unlearn</b></span></span></nobr>";}
	}
	html += "</td></tr>";
	html += "</table>";
	var toolTipDiv = document.getElementById("tooltip");
	setInnerHTML(toolTipDiv, html);
	
	moveTalent(e);
}
function moveTalent(e, id)
{
	var toolTipDiv = document.getElementById("tooltip");
	if(toolTipDiv != null)
	{
		if(getInnerHTML(toolTipDiv) != "")
		{
			if(e != null)
			{
				toolTipDiv.style.visibility = "visible";
				toolTipDiv.style.left = window.scrollX + e.clientX + 10;
				toolTipDiv.style.top = window.scrollY + e.clientY + 10;
			}
			else
			{
				toolTipDiv.style.visibility = "visible";
				toolTipDiv.style.bottom = 439 - event.offsetY + 5;
				toolTipDiv.style.left = event.offsetX + 5;
			}
		}
		else
		{
			showTalent(e, id);
		}
	}
}
function hideTalent()
{
	var toolTipDiv = document.getElementById("tooltip");
	toolTipDiv.style.visibility = "hidden";
	setInnerHTML(toolTipDiv, "");
}
function showTalentMap(type)
{
    if(talentImages[currentClass+type] != null)
    {
	var talentDiv = document.getElementById("talents");
	if(talentDiv != null)
	{
	    var imageHtml = "<img src=\"" + talentImages[currentClass+type] + "\" usemap=\"#Talent_" + type + "\" border=0 onContextMenu=\"return false;\">";
	    imageHtml += "<map name=\"Talent_" + type + "\">";
	    for(var i in talents)
	    {
		if(talents[i] != null && talents[i].Type == type)
		{
					talents[i].Coords = calculateImageCoords(talents[i].Tier, talents[i].Column, talents[i].Coords);
					if(talents[i].Coords != "")
					{
						imageHtml += "<area id=\"area_" + talents[i].Id + "\" shape=rect coords=\"";
						imageHtml += talents[i].Coords;
						imageHtml += "\" onMouseOver=\"showTalent(arguments[0], " + i + ");\" onMouseMove=\"moveTalent(arguments[0], " + i + ");\" OnMouseOut=\"hideTalent();\" onClick=\"learnTalent(" + i + "); showTalent(arguments[0], " + i + ");\" ondblClick=\"learnTalent2(" + i + "); showTalent(arguments[0], " + i + ");\" onMouseDown=\"onClickTalent(" + i + "); showTalent(arguments[0], " + i + ");\" onContextMenu=\"unlearnTalent(" + i + "); showTalent(arguments[0], " + i + "); return false;\">";
					}
		}
	    }
	    imageHtml += "</map>";
	    
	    for(var i in talents)
	    {
		if(talents[i] != null && talents[i].Type == type && talents[i].Coords != "")
		{
		    var x, y;
					if(build == "b4")
					{
						x = getX1Coord(talents[i].Coords)*1.0 + 36;
		    	y = getY1Coord(talents[i].Coords)*1.0 + 31;
					}
					else
					{
						x = getX1Coord(talents[i].Coords)*1.0 + 39;
		    	y = getY1Coord(talents[i].Coords)*1.0 + 34;
					}
		    imageHtml += "<div id=\"inc_" + i + "\" style=\"z-index: 2; position:absolute; left: " + x + "; top: " + y + ";\"><span style=\"color:Red\">+</span></div>";
		}
	    }
	    
			if(!mozilla)
			{
		    imageHtml += "<div id=\"tooltip\" class=\"tooltip\" style=\"z-index: 3; position: absolute; width:250; visibility: hidden;\"></div>";
			}
	    
	    setInnerHTML(talentDiv, imageHtml);
	}
    }
    
    refreshTalents();
}
function calculateImageCoords(tier, column, coords)
{
	if(build == "b4" || column == 0)
	{
		return coords;
	}
	else
	{
		var baseX = 36;
		var baseY = 7;
		var width = 44;
		var height = 44;
		
		var x1 = (column - 1) * 66 + baseX;
		var y1 = (tier - 1) * 63 + baseY;
		var x2 = x1 + width - 1;
		var y2 = y1 + height - 1;
		
		return x1 + "," + y1 + "," + x2 + "," + y2;
	}
}
function getX1Coord(coords)
{
    if(coords.indexOf(",") > 0)
    {
	return coords.substring(0, coords.indexOf(","));
    }
}
function getY1Coord(coords)
{
    if(coords.indexOf(",") > 0)
    {
	var index = coords.indexOf(",");
	var newIndex = coords.indexOf(",", index + 1);
	if(newIndex > 0)
	{
	    return coords.substring(index + 1, newIndex);
	}
    }
}
function changeType(type)
{//
    showTalentMap(type);
	var oldType;
	var newType;
	for (var aId in types) {
		if ( types[aId] == currentType) { oldType = aId;}
		if ( types[aId] == type) { newType = aId;}
	}
	
	var oldTabDiv = document.getElementById("Atype_"+oldType);
	if(oldTabDiv != null)
	{
		setInnerHTML(oldTabDiv, "<b>" + currentType + "</b>");
	}
	
	var newTabDiv = document.getElementById("Atype_"+newType);
	if(newTabDiv != null)
	{
		setInnerHTML(newTabDiv, "<b><span class=\"accent\"> " + type + "</span></b>");
	}
	
	currentType = type;
	
	refreshTalents();
}
function onType(type)
{
	var tabDiv = document.getElementById(type);
	if(tabDiv != null)
	{
		setInnerHTML(tabDiv, "<b><span class=\"accent\">" + type + "</span></b>");
	}
}
function offType(type)
{
//	var tabDiv = document.getElementById(type);
//	if(tabDiv != null)
//	{
//		tabDiv.innerHTML = "<b>" + type + "</b>";
//	}
}
function canLearn(talent_id)
{
	var canLearn = true;
	
	// Must have enough talent points
	if(talentPoints == 0)
	{
		canLearn = false;
	}
	// Must have the required mastery
	else if(masteries[talents[talent_id].Type] < ((talents[talent_id].Tier - 1) * 5))
	{
		canLearn = false;
	}
	// Must not have talent maxed
	else if(isMaxed(talent_id))
	{
		canLearn = false;
	}
	// Must have prerequisite skills
	else
	{
		for(var i in talents[talent_id].Requirements)
		{
			var req = talents[talent_id].Requirements[i];
			if((learned[req.Id] == null) ||
				(learned[req.Id] < req.Amount))
			{
				canLearn = false;
				break;
			}
		}
	}
	
	return canLearn;
}
function canUnlearn(id)
{
    if(learned[id] != null && learned[id] > 0)
    {
		var type = talents[id].Type;
		// Make sure no skills depend on it as a prereq
	for(var i in talents)
	{
			// Direct prereq
	    for(var j in talents[i].Requirements)
	    {
		var req = talents[i].Requirements[j];
				
		if(req.Id == id && learned[i] != null && learned[i] > 0)
		{
		    return false;
		}
	    }
	}
	
		// Mastery prereq
		for(var i in learned)
		{
			var typeReq = (talents[i].Tier - 1) * 5.0;
			if((i != id) && (learned[i] != null) && (learned[i] != 0) && (talents[i].Type == type))
			{
				if(talents[i].Tier > talents[id].Tier)
				{
					var masteryTier = 0;
					for(var j in learned)
					{
						if((learned[j] != null) && (talents[j].Type == type) && (talents[j].Tier < talents[i].Tier))
						{
							masteryTier += learned[j];
						}
					}
					if(masteryTier - 1 < typeReq)
					{
						return false;
					}
				}
			}
		}
	return true;
    }
    
    return false;
}
function isMaxed(id)
{
    if((learned[id] == talents[id].Info.length) ||
	    (learned[id] == null && talents[id].Info.length == 0))
	{
	    return true;
	}
}
function getMinLevel(id)
{
    var minTalentPoints = getMinTalentPoints(id);
    return minTalentPoints + 9;
}
function getMinTalentPoints(id)
{
    var minTalentPoints = 1;
    
    minTalentPoints = (talents[id].Tier - 1) * 5 + 1;
    if(talents[id].Requirements.length > 0)
    {
	for(var i in talents[id].Requirements)
	{
	    var req = talents[id].Requirements[i];
	    var reqTalentPoints = getMinTalentPoints(req.Id) + req.Amount;
	    if(reqTalentPoints > minTalentPoints)
	    {
		minTalentPoints = reqTalentPoints;
	    }
	}
    }
    
    return minTalentPoints;
}
function doAction()
{
	var actionSelect = document.getElementById("action");
	if(actionSelect != null)
	{
		if(actionSelect.value == "+1")
		{
			setLevel(currentLevel + 1);
		}
		else if(actionSelect.value == "+5")
		{
			setLevel(currentLevel + 5);
		}
		else if(actionSelect.value == "+10")
		{
			setLevel(currentLevel + 10);
		}
		else if(actionSelect.value == "max")
		{
			setLevel(maxLevel);
		}
		else if(actionSelect.value == "reset")
		{
		    resetTalents();
		}
		else if(actionSelect.value == "save")
		{
		    saveTemplate();
		}
	}
}
function setLevel(value)
{
	var levelDiv = document.getElementById("player_level");
	if(levelDiv != null && value <= maxLevel)
	{
		currentLevel = value * 1.0;
		setInnerHTML(levelDiv, currentLevel);
		setTalentPoints();
		
		var levelText = document.getElementById("level_text");
		if(levelText != null)
		{
		    levelText.value = currentLevel;
		}
		refreshTalents();
	}
    var templateLevel = document.getElementById("DataDetail_Level");
    if(templateLevel != null)
    {
	templateLevel.value = currentLevel;
    }
}
function setMastery(mastery, value)
{
	var typeIdx = new Array();
	typeIdx[types[0]]= 0;
	typeIdx[types[1]]= 1;
	typeIdx[types[2]]= 2;
	
	var masteryDiv = document.getElementById("mastery_" + typeIdx[mastery]);
	if(masteryDiv != null)
	{
		masteries[mastery] = value;
		setInnerHTML(masteryDiv, masteries[mastery]);
	}
}
function setTalentPoints()
{
	var talentDiv = document.getElementById("talent_points");
	if(talentDiv != null)
	{
		talentPoints = currentLevel - 9 - getSpentTalentPoints();
		if(talentPoints < 0)
		{
		    talentPoints = 0;
		}
		setInnerHTML(talentDiv, talentPoints);
	}
}
function resetTalents()
{
	learned = new Array();
	for(var index in types)
	{
		setMastery(types[index], 0);
	}
	talentPoints = currentLevel - 1;
	setTalentPoints();
	refreshTalents();
}
function resetCurrentTree()
{
	for(var index in learned)
	{
		if(talents[index].Type == currentType)
		{
			learned[index] = 0;
		}
	}
	
	talentPoints = talentPoints - masteries[currentType];
	setMastery(currentType, 0);
	
	setTalentPoints();
	refreshTalents();
}
function getSpentTalentPoints()
{
	var spent = 0;
	for(var i in learned)
	{
		spent += learned[i];
	}
	return spent;
}
function learnTalent(id)
{
    if(!canLearn(id))
    {
	return;
    }
	if(learned[id] == null && talents[id].Info.length > 0)
	{
		learned[id] = 1;
	}
	else if(learned[id] < talents[id].Info.length)
	{
		learned[id]++;
	}
	
	talentPoints--;
	setTalentPoints();
	setMastery(talents[id].Type, masteries[talents[id].Type] + 1);
    refreshTalents();
}
function learnTalent2(id)	//learn all
{
    if(!canLearn(id))
    {
	return;
    }
	if(learned[id] == null && talents[id].Info.length > 0)
	{
		learned[id] = 0;
	}
	var addPoints = talents[id].Info.length - learned[id];
	
	if(talentPoints < addPoints)
	{addPoints = talentPoints;}
	learned[id]+= addPoints;
	talentPoints -= addPoints;
	setTalentPoints();
	setMastery(talents[id].Type, masteries[talents[id].Type] + addPoints);
    refreshTalents();
}
function unlearnTalent(id)
{
    if(!canUnlearn(id))
    {
        return;
    }
    
    learned[id]--;
    talentPoints++;
    setTalentPoints();
    
    setMastery(talents[id].Type, masteries[talents[id].Type] - 1);
    
    refreshTalents();
}

function onClickTalent(id)
{
	if(event == null)
	{
		learnTalent(id);
	}
    else if(event.button == 2)
    {
	unlearnTalent(id);
    }
}
function refreshTalents()
{
    for(var i in talents)
    {
	if(talents[i].Type == currentType)
	{
	    var talentDiv = document.getElementById("inc_" + i);
	    if(talentDiv != null)
	    {
		var talentHtml = "";
		var level = learned[i];
		if(level == null)
		{
		    level = 0;
		}
		if(canLearn(i))
		{
		    talentHtml = "<span style=\"color: LimeGreen\">" + level + "</span>";
		}
		else if(isMaxed(i))
		{
		    talentHtml = "<span style=\"color: White\">" + level + "</span>";
		}
		else
		{
		    talentHtml = "<span style=\"color: Red\">" + level + "</span>";
		}
		
		setInnerHTML(talentDiv, talentHtml);
	    }
	}
    }
    
    refreshTemplateDetails();
}
function loadImages()
{
    for(var i in talentImages)
    {
	for(var j in types)
	{
	    if(j == i)
	    {
		var image = new Image();
		image.src = talentImages[i];
	    }
	}
    }
    for(var i in talents)
    {
	icons[i] = new Image();
	icons[i].src = iconUrl + talents[i].Icon;
    }
}
function saveTemplate()
{

    var win = window.open("","","resizable=1,toolbar=0,width=825,height=450,status=0,scrollbars=1,menubar=0");
	if(win != null)
	{
		//win.document.write("<HTML><HEAD><LINK REL=\"stylesheet\" TYPE=\"text/css\" HREF=\"wwv/vault.css\"><TITLE>WoW Talent Template</TITLE></HEAD>\n");
		var tmp = iconEnable ;
		iconEnable = 0;
		win.document.write("<BODY BGCOLOR=\"#FFFFFF\" TEXT=\"000000\">\n");
		
		win.document.write(getTemplateText());
		
		win.document.write("</BODY></HTML>");
		win.document.execCommand ("SaveAs",true,"");    
		win.document.close();
		iconEnable = tmp;
	}
	else
	{
		alert("An error occurred when displaying the save template window. If you do not allow popup windows, you must copy/paste the info in the talent window to save the template.");
	}
}
function getTemplateText()
{
    if(chinese) {
    var template = "<b>保存模板</b><br><br>\n";
    template += "职业: " + className + "<br>\n";
    template += "等级: " + currentLevel + "<br>\n";
    }else {
    var template = "<b>Save Template</b><br><br>\n";
    template += "Class: " + className + "<br>\n";
    template += "Level: " + currentLevel + "<br>\n";
    }
    
    
    template += "<br><hr><br>\n";
    if(chinese){template += "<b>配置字符:</b> " + "<br>\n";}
    else{template += "<b>Build Strings:</b> " + "<br>\n";}
    template += getTemplateStr();
    template += "<br><hr><br>\n";
    
    template += getLearnedText();
    
    if(talentPoints != 0)
    {
	template += "<br><br>\n";
	if (chinese) {template += "<b>剩余天赋点数: " + talentPoints + "</b>";}
	else {template += "<b>Unused Talent Points: " + talentPoints + "</b>";
	}
                                                                
    }
    return template;
}
function getLearnedText()
{
    var template = "";
    for(var i in types)
    {
	if(chinese) {template += "<b><u>" + types[i] + " 天赋</u></b> ";}
	else  {template += "<b><u>" + types[i] + " Talent</u></b> ";}
	
	var masteryPoints = masteries[types[i]];
	if(masteryPoints != null)
	{
	    if(chinese) {template += "(" + masteryPoints + " 点";} 
	    else{
	    	template += "(" + masteryPoints + " Point";
	    	if(masteryPoints != 1)
	    	{
			template += "s";
	    	}
	    }
	    template += ")";
	}
	template += "<br><br>";
	
	var typeUsed = false;
	for(var tier = 1; tier <= 7; tier++)
	{
	    for(var j in learned)
	    {
		if(talents[j].Tier == tier && talents[j].Type == types[i] && learned[j] != 0)
		{
		    
		    if (iconEnable && !document.getElementById("simpleOutput").checked) {
		    template += "<img src="+ iconUrl + talents[j].Icon + ">";
		    }else {template += "<li>";}
		    template += "<b>" + talents[j].Name + "</b> - " + learned[j] + "/";
		    template += talents[j].Info.length;

		    if (chinese) {
	    		template += " 点";
		    } else {
		    	template += " Point";
			    if(learned[j] != 1)
			    {
				template += "s";
			    }
			    if(talents[j].Info.length == learned[j])
			    {
				template += " (max)";
			    }
			}

		if( !document.getElementById("simpleOutput").checked){
		    template += "<br>\n";
		    template += getTalentDescription(j, learned[j]);
		    template += "<br>\n";
		    }
		    template += "<br></li>\n";
		    typeUsed = true;
		}
	    }
	}
	
	if(!typeUsed)
	{
	    if(chinese) {
	    	template += "<li>无</li>\n";
	    	} else {
	    	template += "<li>None</li>\n";
	    	}
	}
	template += "<br><br>\n";
    }
    
    return template;
}
function levelKeyPressed()
{
    var key = event.keyCode;
    if(key == 13)
    {
	validateLevel();
    }
}
function validateLevel()
{
    var levelTextBox = document.getElementById("level_text");
    var level = (levelTextBox.value * 1.0).toFixed(0);
    
    if(level == "" || level == null || isNaN(level))
    {
	levelTextBox.value = currentLevel;
	return;
    }
    
    if(level == currentLevel)
    {
	return;
    }
    
    if(level < 1 || level > 60)
    {
	alert("Player level must be between 1 and 60.");
	levelTextBox.value = currentLevel;
	return;
    }
    
    var newLevel = level;
    if(newLevel < 10)
    {
	newLevel = 9;
    }
    if((level < currentLevel) && 
	(currentLevel - newLevel > talentPoints))
    {
	alert("You must unlearn some talents before decreasing your level. Use the Reset Talents button to unlearn all talents.");
	levelTextBox.value = currentLevel;
	return;
    }
    
    setLevel(level);
}
function getTemplateData()
{
    var templateText = "";
    var first = true;
    for(var j in learned)
    {
	if(learned[j] != 0)
	{
	    if(!first)
	    {
		templateText += ",";
	    }
	    first = false;
	    templateText += j + "=" + learned[j];
	}
    }
    
    return templateText;
}
function getTalentDescription(id, rank)
{
    if(talents[id].Description == "")
    {
	return talents[id].Info[rank - 1].Description;
    }
    else
    {
	var description = talents[id].Description;
	var i = 0;
	var rankInfo = talents[id].Info[rank - 1].Amount;
	var amounts = rankInfo.split(",");
	var found = false;
	if(description.indexOf("{" + i + "}") >= 0)
	{
	    found = true;
	}
	while(found)
	{
	    if((amounts.length <= i) || amounts[i] == "")
	    {
		description = description.replace("{" + i + "}", "?");
	    }
	    else
	    {
		description = description.replace("{" + i + "}", amounts[i]);
	    }
	    i++;
	    if(description.indexOf("{" + i + "}") == -1)
	    {
		found = false;
	    }
	}
//	for(var i = 0; i < amounts.length; i++)
//	{
//	    if(amounts[i] == null || amounts[i] == "")
//	    {
//		description = description.replace("{" + i + "}", "?");
//	    }
//	    else
//	    {
//		description = description.replace("{" + i + "}", amounts[i]);
//	    }
//	}
	
	return description;
    }
}
function setInnerHTML(object, html)
{
	if(mozilla)
	{
		var r = object.ownerDocument.createRange();
		r.selectNodeContents(object);
		r.deleteContents();
		var df = r.createContextualFragment(html);
		object.appendChild(df);
	}
	else if(navigator.appName == "Microsoft Internet Explorer")
	{
		object.innerHTML = html;
	}
}
function getInnerHTML(object)
{
	if(mozilla)
	{
		if(object.childNodes.length == 0)
		{
			return "";
		}
		else
		{
			return object.childNodes[0];
		}
	}
	else if(navigator.appName == "Microsoft Internet Explorer")
	{
		return object.innerHTML;
	}
}

//	output str to ID:profileStringOut
/*
**	use tier * col to save the current setting
*/
function getTemplateStr ()
{
	//Class|lvl|tree1:xxxxx|tree2:xxxx|tree3:xxxx
	var strA = new Array(27);
	var strB = new Array(27);
	var strC = new Array(27);
	for (var i = 0; i < 28; i++) {
   		strA[i] = 0;
   		strB[i] = 0;
   		strC[i] = 0;
   	}
	for (var id in talents) {
		if (null != learned[id]) {
			if (talents[id].Type == types[0])
				strA[(talents[id].Tier - 1) * 4 + talents[id].Column - 1] = learned[id];
			if (talents[id].Type == types[1])
				strB[(talents[id].Tier - 1) * 4 + talents[id].Column - 1] = learned[id];
			if (talents[id].Type == types[2])
				strC[(talents[id].Tier - 1) * 4 + talents[id].Column - 1] = learned[id];
		}
	}
	//get the ID from classLst
	//currentClass->	classId[currentClass] -> classLstEn[classId[currentClass]]
	var str2 = classLstEn[classId[currentClass]]+"%7C"+currentLevel+"%7C"+typesIdEn[3*classId[currentClass]]+"%3A"+strA+"%7C"+typesIdEn[3*classId[currentClass]+1]+"%3A"+strB+"%7C"+typesIdEn[3*classId[currentClass]+2]+"%3A"+strC;
	str2 = str2.replace(/,/g,"");
	str2 = str2.replace(/ /g, "%20");
	return str2;
}
function encodeCustomProfileString(){
	document.getElementById("profileStringOut").value=getTemplateStr();
}
    
    /**
     * 从字符串中解析出天赋加点数据。并与数据文件进行合法性检查。
     * 此方法会自动加载数据文件，因此无需再次调用加载数据文件的相关方法。
     */
    function decodeCustomProfileString(str)
    {
	if ( null == str )
	{
	    str = document.getElementById("profileString").value;
	}
	if ( str.length <= 0 ){
	    return;
	}
	//check string
	if (! decodeFromString(str)) {return;}
	
    }
    /**	class|level|type1:xxxx|type2:xxxx|type3:xxxx
     * 从字符串中解析出天赋加点数据。并与数据文件进行合法性检查。
     * 此方法会自动加载数据文件，因此无需再次调用加载数据文件的相关方法。
     * @param str 字符串。
     * @return 如果字符串格式合法，返回 true，否则返回 false 。
     * @create 2004-10-30 source0
     */
    function decodeFromString (str)
    {	
	str = unescape(str);
	str = str.replace(/%7C/g, "|");
	str = str.replace(/%3A/g, ":");
	str = str.replace(/%20/g, " ");
	var info = str.split("|");

	/* 至少需要包含职业ID、文件地址、一个天赋系ID*/
	if ( info.length < 3 )
	{
	    alert ("数据格式错误，至少需要包含职业ID、文件地址、一个天赋系ID。请检查您的数据：\n" + str);
	    return false;
	}

	//class|level|type1:xxxx|type2:xxxx|type3:xxxx
	/* 检查职业ID 。*/
	if (  classIdEn[info[0]] == null ){
	    alert ("数据文件与配置数据不匹配：\n数据文件职业ID："+ classStr + "\n配置数据职业ID：" + info[0]);
	    return false;
	}

	var tmpLvl= parseInt(info[1]);

	if (isNaN(tmpLvl) || tmpLvl < 10 || tmpLvl > 60){
		alert("配置数据等级无效\n"+info[1]);
	    	return false;
	}
	/* 检查各个数据段。 */

	for ( var i = 2; i < info.length; i++ )
	{
	    /* 必须有ID 。*/
	    if ( info[i].indexOf(":") == 0 )
	    {
		alert ("数据格式错误，必须包含天赋系ID。请检查您的数据：\n" + info[i]);
		return false;
	    }
	    /* 如果仅有ID，需要检查ID 。*/
	    else if ( info[i].indexOf(":") < 0 )
	    {
		if ( !/^\w+$/.test(info[i]) )
		//if ( !/^.*$/.test(info[i]) )	//maybe some chinese char
		{
		alert ("数据格式错误，天赋系ID的格式不正确。请检查您的数据：\n" + info[i]);
		return false;
		}
	    }
	    /* ID:数据 的格式。*/
	    else
	    {
		//if ( !/^\w+:[0-5]{28}$/.test(info[i]) )
		if ( !/^.*:[0-5]{28}$/.test(info[i]) )
		{
		    alert ("数据格式错误，加点数据不正确。请检查您的数据：\n" + info[i]);
		    return false;
		}
	    }
	}
	//class sel
	currentClass = classLst[classIdEn[info[0]]];
	OnSelectType(currentClass);
	loadTalents();
	talents_main();

	var MAX_TIER = 7;
	var MAX_COLUMN = 4;
	var tmp_tal = new Array(6);
	//default
	tmp_tal[0] = types[0];
	tmp_tal[1] = "0000000000000000000000000000";
	tmp_tal[2] = types[1];
	tmp_tal[3] = "0000000000000000000000000000";
	tmp_tal[4] = types[2];
	tmp_tal[5] = "0000000000000000000000000000";
	//info[i] like combat:xxxx or combat
	for ( var i = 2; i < info.length; i++ )
	{
		var reg = new RegExp(".*:[0-5]{" + MAX_TIER * MAX_COLUMN + "}");
		if ( reg.test(info[i]) ){
			var tmpTypes = new Array(
			typesIdEn[classIdEn[info[0]]*3],
			typesIdEn[classIdEn[info[0]]*3+1],
			typesIdEn[classIdEn[info[0]]*3+2]
			);
		    if (tmpTypes[0] == info[i].substring(0, info[i].indexOf(":"))) {
		    	tmp_tal[1] = info[i].substring(parseInt(info[i].indexOf(":")) + 1, info[i].length);
		    }
		    else if (tmpTypes[1] == info[i].substring(0, info[i].indexOf(":"))) {
		    	tmp_tal[3] = info[i].substring(parseInt(info[i].indexOf(":")) + 1, info[i].length);
		    }
		    else if (tmpTypes[2] == info[i].substring(0, info[i].indexOf(":"))) {
		    	tmp_tal[5] = info[i].substring(parseInt(info[i].indexOf(":")) + 1, info[i].length);
		    } else {
		    	alert("天赋树不匹配\n"+info[i].substring(0, info[i].indexOf(":")));
		    	return false;
		    }
		}
	}
	
	var tal_typ0 = new Array(28);
	var tal_typ1 = new Array(28);
	var tal_typ2 = new Array(28);
	var treePoints = new Array(2);
	var totalPoints;
	treePoints[0] = 0;
	treePoints[1] = 0;
	treePoints[2] = 0;
	totalPoints = 0;
	for (var i = 0; i < tmp_tal[1].length;i++) {
	    tal_typ0[i] = parseInt(tmp_tal[1].charAt(i));
	    totalPoints += tal_typ0[i];
	    treePoints[0] += tal_typ0[i];
	}
	for (var i = 0; i < tmp_tal[3].length;i++) {
	    tal_typ1[i] = parseInt(tmp_tal[3].charAt(i));
	    totalPoints += tal_typ1[i];
	    treePoints[1] += tal_typ1[i];
	}
	for (var i = 0; i < tmp_tal[5].length;i++) {
	    tal_typ2[i] = parseInt(tmp_tal[5].charAt(i));
	    totalPoints += tal_typ2[i];
	    treePoints[2] += tal_typ2[i];
	}
	if (treePoints[0] > tmpLvl - 9 || treePoints[1] > tmpLvl - 9 || treePoints[2] > tmpLvl - 9 || totalPoints > tmpLvl - 9 ){
	    alert ("数据格式错误，加点数据超过了最大值。请检查您的数据：\n" + str);
	    return false;
	}
	resetTalents();
	for (var id in talents) {
		if (talents[id].Type == types[0]) {
			learned[id]= tal_typ0[(talents[id].Tier-1)*4+talents[id].Column-1];
		}else if (talents[id].Type == types[1]) {
			learned[id]= tal_typ1[(talents[id].Tier-1)*4+talents[id].Column-1];
		}else if (talents[id].Type == types[2]) {
			learned[id]= tal_typ2[(talents[id].Tier-1)*4+talents[id].Column-1];
		}
	}
	//alert(tal_typ0+tal_typ1+tal_typ2);
	setLevel(tmpLvl)
	setMastery(types[0], treePoints[0]);
	setMastery(types[1], treePoints[1]);
	setMastery(types[2], treePoints[2]);
	showTalentMap(currentType);
	return true;
    }
    /**
     * 从字符串中解析出天赋加点数据。
     * @param str 字符串。为28字节长的数字并且总和小于51。
     * @return 如果字符串格式合法，返回 CTalentClassForProfile 实例，否则返回 null 。
     * @create 2004-10-30 source0
     */
    function decodeDataString(str)
    {
	var MAX_TIER = 7;
	var MAX_COLUMN = 4;
    
	var reg = new RegExp("[(a-z)(A-Z)_]+:[0-5]{" + MAX_TIER * MAX_COLUMN + "}");
	if ( !reg.test(str) )
	{
	    return null;
	}
	tc.id = str.substring(0, str.indexOf(":"));
	tc.talents = new Array();
	var data = str.substring(parseInt(str.indexOf(":")) + 1, str.length);
	/* 计算点数是否正确，如不正确，返回 null。 */
	var count = 0;
	for ( var i = 0; i < MAX_TIER * MAX_COLUMN; i++ )
	{
	    count += parseInt(data.charAt(i));
	}
	if ( count > 51 )
	{
	    return null;
	}
	/* 查找天赋系，如果没找到，说明是非法数据。 */
	var talentClassModel = null;
	for ( var i = 0; i < 3; i++ )
	{
	    if ( ROLE_FOR_PROFILE.talentClasses[i].id == tc.id )
	    {
		talentClassModel = ROLE_FOR_PROFILE.talentClasses[i];
		break;
	    }
	}
	if ( null == talentClassModel )
	{
	    return null;
	}
	/* 使用加点信息初始化。 */
	var tvs = talentClassModel.getTalentViews();
	for ( var key in tvs )
	{
	    var tv = tvs[key];
	    var rank = data.charAt(4 * tv.model.tier + parseInt(tv.column));
	    if ( rank > 0 )
	    {
		tc.add(tv.model.id, rank);
	    }
	}
	return tc;
    }