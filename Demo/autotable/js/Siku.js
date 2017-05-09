var Siku = {
	formToJson : (function(form){
		function strToObj(str){
	        str = str.replace(/&/g,"','");    
	        str = str.replace(/=/g,"':'");    
	        str = "({'"+str +"'})";    
	        obj = eval(str);     
	        return obj;    
	    }   
		return function(form){
			return strToObj($(form).serialize());
		}
	})(),
	load : function(){
	if ( $('.L-dropListBox').length )// 采购管理框架页左侧导航
	{
		$('.L-dropListBox dl:first dt').addClass('lh28 fz16 pl15');
		$('.L-dropListBox dd:has(a),.L-dropListBox dt:has(a)').click(function(){
			$('.L-dropListBox dd,.L-dropListBox dt').removeClass('ML-wz');
			$(this).addClass('ML-wz');
		});
		$('.L-dropListBox dd,.L-dropListBox dt').eq(0).trigger('click');
	}
	
	if ( $('.supp-L-dropListBox').length )// 供应商管理框架页左侧导航
	{
		$('.supp-L-dropListBox ul li:not(:eq(2)),.supp-L-dropListBox ul li dd').click(function(e){
			if(!$(this).children('a').attr('href')){
				return;
			}
			else{
				$('.supp-L-dropListBox').find('.current').removeClass('current');
				$(this).addClass('current');
			}
			
			if (ceresobj.Urlhash != '' || ceresobj.Urlhash != undefined){
				window.location.hash = '';
			}
			
			if ( $(this).get(0).nodeName.toLowerCase() == 'dd' )
			{
				$(this).parents('li').siblings('li').removeClass('current');
				e.stopPropagation();
			}
		});
		if ($('.supp-L-dropListBox').has('.current').length == 0){
			$('.supp-L-dropListBox ul li').eq(0).trigger('click');
		}
	}
	/* 页面中服务端返回客户端的弹出层生成 */
	$('body').append('<div class="SYS-errorBox show-popup bgfff pb20 undis"><div class="popup-bar bge80 H25"><b class="fz14 fontYH I-B pl15 pt3 titleMsg"></b></div><table border="0"><tr><td align="center" valign="middle" width="80"><img class="errIco" src="/images/errorIco2.gif" width="60" height="60" /></td><td valign="middle" class="errerBox" height="90"></td></tr><tr><td align="center" colspan="2" valign="middle" class="text_center"><input type="button" class="MyBtn3_Btn showErrorCloseBtn" value="关 闭" /></td></tr></table></div>');
},
id: (function(){
	var i = 0;
	return function(){return 'siku-' + ++i}
})(),
tabChange : function(ulALink) {//头部的tab切换
	$(ulALink).each(function(i){
		$(this).click(function(ev){
			$(this).siblings('ul').css("display", 'block');
			$(this).parent('li').addClass('active');
			$(this).parent('li').siblings('li').removeClass('active');
			$(this).parent('li').siblings('li').children('ul').css("display", 'none');
		});
	});
},
editInTable : function(thisTable) {//表格中编辑删除一行的内容
	var $thisTable = $(thisTable);
	$thisTable.delegate('.edit-btn','click',function(){
		$editBtn = $(this);
		$editBtn.parents('td').siblings('td.enable-edit').each(function(e){
			$(this).html("");
			$('<input type="text" value="25" class="sk-input" />').appendTo($(this));
			  // $(this).text();
			$('<a class="action-btn save-btn">保存</a>').prependTo($editBtn.parents('td'));
			$editBtn.remove();
		});
	});
	$thisTable.delegate('.save-btn','click',function(){
		$editBtn = $(this);
		$editBtn.parents('td').siblings('td.enable-edit').each(function(e){
			$(this).html($(this).children('input').val());
			$(this).children('input').remove();
		});
		$('<a class="action-btn edit-btn">编辑</a>').prependTo($editBtn.parents('td'));
		$editBtn.remove();
	});

	$thisTable.delegate('.delete-btn','click',function(){
		$delBtn = $(this);
		$delBtn.parents('td').parents('tr').remove();
	});
},
/*
	var menu = new Siku.DropMenu({
			className: 'drop-menu',		下拉菜单的样式名
			anchorCssSelector: 'input',		触发下拉菜单元素的Css选择符
			menuItems: [		下拉菜单项，
				{
					text: 'Menu text',			菜单项文字
					handler: function(jQueryEvent, anchor){		点击调用的函数，函数参数为jqueryEvent和触发菜单的anchor
						
					}
				},
				{
					text: 'Menu text',
					handler: function(jQueryEvent, anchor){
						
					}
				}
			]
		});
 */
DropMenu: (function(){
	var shownMenuId = null,
		menuPool = {};
	
	function generateHTML(menu){
		var className = menu.config.className || 'drop-menu';
			html = '<ul class="' + className + '" id="' + menu.id + '">';
		for(var i = 0, l = menu.config.menuItems.length; i < l; ++i){
			html += '<li class="drop-menu-item">' + menu.config.menuItems[i].text + '</li>';
		}
		html += '</ul>';
		$(document.body).append(html);
	}
	
	function eventAttach(menu){
		var menuItems = $('#' + menu.id + ' li');
		for(var i = 0, l = menu.config.menuItems.length; i < l; ++i){
			menuItems.eq(i).click({
				menu: menuPool[menu.id],
				menuItemIndex: i
			}, _onMenuClick);
		}
		$(menu.config.anchorCssSelector).click({menu: menu}, onAnchorClick);
	}
	
	function _onMenuClick(e){
		e.stopPropagation();
		var menu = e.data.menu,
			menuItemIndex = e.data.menuItemIndex;
		
		try{
			menu.config.menuItems[menuItemIndex].handler(e, menu.currentAnchor);
		}
		catch(e){}
		menu.hide();
	}
	
	function onAnchorClick(e){
		e.stopPropagation();
		var menu = e.data.menu;
		if(menu.shown && menu.currentAnchor == e.delegateTarget){
			menu.hide();
			menu.currentAnchor = null;
		}
		else{
			menu.currentAnchor = e.delegateTarget
			var anchor = $(menu.currentAnchor),
				anchorOffset = anchor.offset(),
				anchorHeight = anchor.outerHeight(),
				anchorWidth = anchor.width(),
				menuWidth = $('#' + menu.id).width(),
				x = (anchorOffset.left + menuWidth) > document.body.clientWidth ? anchorOffset.left - (menuWidth - anchorWidth) : anchorOffset.left,
				y = anchorOffset.top + anchorHeight;

			menu.show(x, y);
		}
	}
	
	function constructor(config){
		this.config = config;
		this.id = Siku.id();
		menuPool[this.id] = this;
		generateHTML(this);
		eventAttach(this);
	}
	
	$.extend(constructor.prototype, {
		id: null,
		config: null,
		currentAnchor: null,
		shown: false,
		hide: function(){
			if(shownMenuId && shownMenuId != this.id)menuPool[shownMenuId].hide();
			$('#' + this.id).css({
				left: '-10000px',
				top: '-10000px'
			});
			this.shown = false;
			shownMenuId = null;
		},
		show: function(x, y){
			if(shownMenuId)menuPool[shownMenuId].hide();
			$('#' + this.id).css({
				left: x + 'px',
				top: y + 'px'
			});
			this.shown = true;
			shownMenuId = this.id;
		}
	});
	$(document).click(function(){
		if(shownMenuId)menuPool[shownMenuId].hide();
	});
	return constructor;
})(),
gotoURL: function(url){
	window.location = url;
},
showPopup : function(sourceObj,popObj,width,height,closeObj){
	if(typeof(sourceObj)=='object')
	{
		var SObj=sourceObj;
	}else{
		var SObj=$(sourceObj);
	};

	$(popObj).on('click', '.limited-coupon', function(){
		$(this).addClass('current').parents('li').siblings('li').children('.current').removeClass('current');
		SObj.val($(this).children('.icon').attr('title'));
		PObj.css('display','none');
	});

	var PObj = $(popObj);


	//PObj.css({'position':'absolute','left':(SObj.offset().left-width*0.5+SObj.width()*0.5)+'px','top':(SObj.offset().top+SObj.outerHeight()+2)+'px','width':width+"px",'height':height+'px'}).fadeIn('slow');
	PObj.css({'position':'absolute','left':SObj.offset().left+'px','top':(SObj.offset().top+SObj.outerHeight()+2)+'px','width':width+"px",'height':'auto'}).css('display','block');
	PObj.find(closeObj).bind('click',function(){PObj.css('display','none');})
},
dropListDown : function(thisBox,dropBox){
	$(thisBox).each(function(i){
		var input = $(this).children('input:text'),
			filedName = input.attr('name') || '';
		input.attr('name', filedName + '_text');
		$(this).click(function(ev){
			$(thisBox).not(this).find(dropBox).add('.cityConBox,.otherDropDownBox').slideUp('fast');
			var ev = ev || window.event;
			$(this).find(dropBox).css({"top":($(this).outerHeight()+2)+"px"});
			if ($(this).find(dropBox).text()!='')
			{
				$(this).find(dropBox).slideToggle("fast");
			}
			ev.stopPropagation();
		}).append('<input type="hidden" name="' + filedName + '" />');

		$(this).delegate('a','click',function(){
			var text = $(this).text(),
				value = $(this).attr('value') || text;
			$(this).parents(thisBox).children('input:text').val(text).attr('key',$(this).attr('rel')).attr('title',$(this).text());
			$(this).parents(thisBox).children(':hidden').val(value)
		});
	});
	$('html').click(function(){
		$(thisBox).find(dropBox).hide();
		$('.dropDownConBox,.resultOUBox').hide();
	});
},
tableSizeFix: function(){
	var ua = navigator.userAgent;
	$('table.scroll-table').each(function(){
		var scrollTable = this,
			scrollInnerTable = $('table.scroll-table-innertable', scrollTable);
			
		if(scrollInnerTable.get(0).rows.length == 1)return true;
		var lastRowHeight = $('td.scroll-table-innertable-boxtd', scrollTable).height() - scrollInnerTable.height() + scrollInnerTable.get(0).rows[1].clientHeight,
			browserFix = ua.indexOf('MSIE') >= 0 ? -1 : 0;
		
		scrollInnerTable = scrollInnerTable.get(0);
		scrollTable.rows[0].style.height = scrollInnerTable.rows[0].clientHeight + browserFix + 'px';
		for(var i = 1, l = scrollTable.rows.length; i < l - 1; ++i){
			scrollTable.rows[i].style.height = (scrollInnerTable.rows[i].clientHeight + browserFix) + 'px';
		}
		scrollTable.rows[scrollTable.rows.length - 1].style.height = 1 + lastRowHeight + 'px';
		scrollInnerTable.style.minWidth = lastRowHeight = $('div.scroll-table-innertable-box', scrollTable).width() + 'px';
	});
},
tableSelectInit: function(){
	var checkboxs = $('table.checkable-table :checkbox');
	if(!checkboxs)return;
	var checkboxs_num = checkboxs.length - 1,
		checked_num =0,
		p_checkbox = $(checkboxs.get(0)),
		sub_checkbox = checkboxs.not(':first');
	
	p_checkbox.bind('click', function(){
		var checked = this.checked;
		$('table.checkable-table :checkbox').not(':first').each(function(){
			this.checked = checked;
		});
		checked_num = this.checked ? checkboxs_num : 0;
	});
	checkboxs.not(':first').bind('click', function(){
		checked_num += this.checked ? 1 : -1;
		p_checkbox.get(0).checked = checked_num == checkboxs_num;
	});
},
popWindowInit: function(selector){
	$(selector).each(function(i, window_box){
		$('input.pop-window-close-btn, a.pop-window-close-btn', this).bind('click', function(){
			Siku.hidePopWindow(window_box);
		});
	});
},
showPopWindow: function(window_boxs){
	$(window_boxs).each(function(i, window_box){
		var t = $(window_box);
		t.css('left', ($(window).width() - t.width()) / 2 + 'px');
		t.css('top', ($(window).height() - t.height()) / 2 + 'px');
	});
	
	$('#mask').css({
		height: $(document).height() + 'px'
	}).show();
},
hidePopWindow: function(window_box){
	$(window_box).each(function(){
		$(window_box).css({
			left: '-10000px',
			top: '-10000px'
		});
	});
	$('#mask').hide();
},
//输入类型的限制
inputTypeInit: (function(){
	var regExps = {
			number: /\d/,
			letter: /[a-zA-Z]/,
			up_letter: /[A-Z]/,
			low_letter: /[a-z]/,
			number_letter: /[a-zA-Z\d]/
		};
	
	function onKeyPress(e){
		if(!String.fromCharCode(e.keyCode || e.charCode).match(e.data.regExp))return e.preventDefault();
	}
	
	return function(inputElement, type){
		var regExp = regExps[type];
		if(!regExp)return false;
		$(inputElement).keypress({'regExp': regExp}, onKeyPress);
	}
})(),
/**
	默认给input.bank-selector-input元素增加选择功能，Siku.BankSelectorInit(CSS_selector or HTMLElement)可以给指定的input增加功能
*/
BankSelectorInit: (function(){
	var BSDP = null,
		BSDP_tab_head = null,
		BSDP_tab_head_btn = null,
		BSDP_tab_body_panel = null,
		BSDP_tab_body = null,
		BSDP_tab_body_li = null,
		currentActivedElement = null,
		lastTabIndex = 0,
		isDropPanelShow = false;

	function init(){
		BSDP = $('div.BSDP');
		BSDP_tab_head = $('div.BSDP-tab-head', BSDP);
		BSDP_tab_head_btn = $('li', BSDP_tab_head),
		BSDP_tab_body = $('div.BSDP-tab-body', BSDP);
		BSDP_tab_body_panel = $('ul.BSDP-tab-body-panel', BSDP_tab_body),
		BSDP_tab_body_li = $('li', BSDP_tab_body);
		
		$('li', BSDP_tab_head).each(function(i){
			$(this).attr('tab-index', i);
		});
		
		BSDP_tab_body_li.mouseenter(function(e){
			$(e.delegateTarget).addClass('hover');
			last_actived_li = e.delegateTarget;
		}).mouseleave(function(e){
			$(e.delegateTarget).removeClass('hover');
		});
		
		BSDP_tab_head.click(onTabHeadBtnClick);
		$('a.BSDP-close-btn', BSDP).click(function(e){
			BSDP_hide();
		});
		
		$('div.BSDP-tab-body', BSDP).click(onBankPoolClick);
		$('input.bank-selector-input').click(onInputClick);
	}
	
	function onTabHeadBtnClick(e){
		var tabIndex = e.target.getAttribute('tab-index');
		if(tabIndex){
			tabSelect(Number(tabIndex));
		}
	}
	
	function tabSelect(tabIndex){
		BSDP_tab_head_btn.eq(tabIndex).addClass('actived');
		BSDP_tab_head_btn.eq(lastTabIndex).removeClass('actived');
		BSDP_tab_body_panel.eq(tabIndex).addClass('actived');
		BSDP_tab_body_panel.eq(lastTabIndex).removeClass('actived');
		lastTabIndex = tabIndex;
	}
	
	function BSDP_hide(){
		BSDP.css({left:'-1000px',top:'-1000px'});
		isDropPanelShow = false;
		currentActivedElement = null;
	}
	
	function BSDP_show(x, y){
		BSDP.css({left: x + 'px',top: y + 'px'});
		isDropPanelShow = true;
	}
	
	function onBankPoolClick(e){
		var bankName = (e.target.tagName == 'LI' ? $(e.target) : $(e.target).parents('li')).find('span').text();
		if(bankName){
			currentActivedElement.value = bankName;
			BSDP_hide();
			return;
		}
	}
	
	function onInputClick(e){
		if(currentActivedElement != e.target || !isDropPanelShow){
			var inputBoxElement = $(this).parents('span'),
				offset = inputBoxElement.offset(),
				inputHeight = inputBoxElement.height(),
				inputWidth = inputBoxElement.width(),
				BSDPWidth = BSDP.width(),
				x = offset.left,
				y = offset.top + inputHeight;
			
			x = (BSDPWidth + x) <= document.body.clientWidth ? x : offset.left - (BSDPWidth - inputWidth);
			
			BSDP_show(x, offset.top + inputHeight);
			currentActivedElement = e.target;
		}
		else{
			BSDP_hide();
			currentActivedElement = null;
		}
	}
	
	$(init);
	
	function constructor(){
		$(input_element).click(onInputClick);
	}
	
	constructor.hide = BSDP_hide;
	return constructor;
})(),
/*
*添加table选项
*data格式： json {name:'项目维度', lnk:'analyticalStatement.html', selected:true }
*yhx add
*/
TabSelectInit:function(data){
	var panel = $(".report-tab");
	for(var i = 0; i < data.length; i++){
		var html = "";
		if(data[i].selected)
			html = "<div class=\"report-tab-selector\" link=\'" + data[i].lnk + "\'>" + data[i].name + "</a></div>";
		else 
			html = "<div class=\"report-tab-non-selector\" link=\'" + data[i].lnk + "\'>" + data[i].name + "</a></div>";				
		panel.append(html);
	}
	
	$("div",panel).bind("click", function(){
		Siku.gotoURL($(this).attr("link"));
	}); 
},
/******************添加左边导航栏********************/
LeftMenuInit:(function(){
	function init(){
		$("#animate_btn").bind('click', function(){
			if($(this).attr("show")=="true"){
				$(this).attr("show","false");
				$(".left-menu").animate({"left":"-200px"},"slow");
				$(".left_munu_btn").animate({"left":"0px"},"slow");
				$(".right-wrap").animate({"width":"980px"},"slow");
				
				$(this).addClass("left_munu_btn_disabled");
				$(this).removeClass("left_munu_btn");
			}
			else{
				$(this).addClass("left_munu_btn");
				$(this).removeClass("left_munu_btn_disabled");
				
				$(this).attr("show","true");
				$(".left-menu").animate({"left":"0px"},"slow");
				$(".left_munu_btn").animate({"left":"160px"},"slow");
				$(".right-wrap").animate({"width":"822px"},"slow");
			}	
		});
	}
	
	$(init);
})(),
/*
*给span.editspan元素增加可编辑功能，在需要的页面使用Siku.EditSpanInit()初始化即可
*默认为左对齐，右对齐时需要在span中使用edit-span-right样式
*yhx add
*/
EditSpanInit:function(){
	 function init(){
		$("span.editspan").each(function(){
			var Float = "edit-span-left";
			if($(this).hasClass('edit-span-right')) {
				Float = "edit-span-right";	
			}
			var sign = $('<div>', {'class': 'edit-sign ' + Float});
			sign.bind("click",function(){
				onInputClick(sign);
			});
			
			var span = $('<div>', {'class': 'edit-span ' + Float});	
			span.text($(this).text());
			$(this).text("");
			
			if(Float == "edit-span-right"){
				$(this).append(sign);
				$(this).append(span);
			}else{
				$(this).append(span);
				$(this).append(sign);
			}
		});
	}
		
	function onInputClick(sign, typ){
		/*处理对其样式*/
		var val = $(sign).parent().find(".edit-span").text();
		var Float = "edit-span-left";
		/**/
		if($(sign).parent().hasClass('edit-span-right')) {
			Float = "edit-span-right";
		}
		var input = $('<input>', {'type':'text', 'class':'edit-input ' + Float});
			input.val(val);
			input.bind("blur", function(){			
				onInputBlur(input);
			});
		
		var tem = $(sign).parent();
		tem.children().remove();
		tem.append(input);
		input.focus();
	}
	
	function onInputBlur(input){
		/*处理对其样式*/
		var Float = "edit-span-left";
		if($(input).parent().hasClass('edit-span-right')) {
			Float = "edit-span-right";	
		}
		/**/
		var val = input.val();		
		var tmp = input.parent();
		var sign = $('<div>', {'class': 'edit-sign ' + Float});
		sign.bind("click",function(){
			onInputClick(sign);
		}); 
		
		var span = $('<div>', {'class': 'edit-span ' + Float});			
		span.text(val);
		
		if(Float == "edit-span-right"){
			tmp.append(sign);
			tmp.append(span);
		}else{
			tmp.append(span);
			tmp.append(sign);
		}
		
		
		input.remove();
	}
		
	$(init);
},
EditWdateSpanInit:(function(){
	function init(){
		$("span.editWdate").each(function(){	
			var float = "edit-span-left";
			if($(this).hasClass('edit-span-right')) {
				float = "edit-span-right";	
			}	
			var sign = $('<div>', {'class': 'edit-sign ' + float});
			sign.bind("click",function(){
				onInputClick(sign);
			}); 
			
			var input = $('<input>', {'class': 'edit-input-non-border ' + float, 'readonly':'readonly'});			
			input.val($(this).text());
			$(this).text("");
			
			if( float == "edit-span-left"){
				$(this).append(input);
				$(this).append(sign);
			}else{
				$(this).append(sign);
				$(this).append(input);				
			}
		});
	}
	
	function onInputClick(sign){
		
		var input = sign.parent().find("input");
		input.bind("blur", function(){			
			onInputBlur(this);
		});
		
		input.bind("focus", function(){			
			sign.parent().find(".edit-sign").remove();
		});
		
		input.bind("click", function(){			
			WdatePicker();
		});
		
		input.addClass("Wdate");
		
		var tem = $(input).parent();
		//tem.find(".edit-sign").css("display", "none");
		sign.parent().find(".edit-sign").remove();
		input.focus();
		input.removeClass("edit-input-non-border");		
		input.addClass("edit-input-Wdate");
	}
	
	function onInputBlur(input){
		
		var float = "edit-span-left";
		if($(this).hasClass('edit-span-right')) {
			float = "edit-span-right";	
		}	
		var sign = $('<div>', {'class': 'edit-sign ' + float});
		sign.bind("click",function(){
			onInputClick(sign);
		}); 		
		
		$(input).parent().find(".edit-sign").remove();
		$(input).parent().append(sign);
		
		$(input).addClass("edit-input-non-border " + float);
		$(input).removeClass("edit-input-Wdate");
		$(input).removeClass("Wdate");
		$(input).unbind("click");
		
	}
	
	
	return init;
})(),
//TODO:待完成
BUOULinkageDropListInit: function(){
	
},
/*
	联动下拉框
	config: {
		main: {
			dropList: CssSelector or HTMLElement  (single),
			loadURL: URL String
		},
		minor: {
			dropList: CssSelector or HTMLElement  (single),
			loadURL: URL String
		}
		
	}
 */
LinkageDropList: (function(){
	function constructor(config){
		this.config = config;
		this.mainDropList = $(config.main.dropList);
		this.minorDropList = $(config.minor.dropList);
		loadDropListData(config.main.loadURL, this.mainDropList);
		attachEventHandler(this);
	}
	
	function getListItemValue(ele){
		return $(ele).attr('value') || $(ele).text();
	}
	
	function attachEventHandler(linkageDropList){
		linkageDropList.mainDropList.find('div.drop-down-con').delegate('a','click',function(e){
			var mainDropListValue = $(e.target).attr('value') || $(e.target).text();
			loadDropListData(linkageDropList.config.minor.loadURL, linkageDropList.minorDropList, {value: mainDropListValue});
		});
	}
	
	function loadDropListData(url, dropList, argus){
		if(argus){
			argus.t = (new Date).getTime();
		}
		else{
			argus = {t:(new Date).getTime()};
		}
		$.getJSON(url, argus, function(json){
			appendData(json, dropList);
		});
	}
	
	function appendData(data, dropList){
		var html = '';
		$.each(data, function(i, item){
			html += '<a value="' + item.value + '">' + item.text + '</a>';
		});
		dropList.find('div.drop-down-con').html(html);
	}
	
	$.extend(constructor.prototype, {
		id: null,
		config: null,
		mainDropList: null,
		minorDropList: null
	});
	return constructor;
})(),
/*
	 config: {
		 anchor: CSS_Selector or HTMLElement,
		 dropPanel: CSS_Selector or HTMLElement (single)
		 onPanelClick: Function
	 }
 */
AnchorDropPanel: (function(){
	var instancePool = {};
	
	function constructor(config){
		this.id = Siku.id();
		this.config = config;
		this.anchor = $(config.anchor);
		this.dropPanel = $(config.dropPanel);
		this.onPanelClick = config.onPanelClick || this.onPanelClick;
		instancePool[this.id] = this;
		attachEventHandler(this, config);
	}
	
	function _onDocumentClick(e){
		e.data.anchorDropPanel.hide();
	}
	
	function attachEventHandler(anchorDropPanel){
		$(anchorDropPanel.anchor).click({anchorDropPanel: anchorDropPanel}, _onAnchorClick);
		$(anchorDropPanel.dropPanel).click({anchorDropPanel: anchorDropPanel}, _onPanelClick);
		$(document).click({anchorDropPanel:anchorDropPanel}, _onDocumentClick);
	}
	
	function _onAnchorClick(evt){
		evt.stopPropagation();
		var anchorDropPanel = evt.data.anchorDropPanel,
			anchor = evt.delegateTarget;
		
		if(anchorDropPanel.currentAnchor == anchor){
			return anchorDropPanel.hide();
		}
		anchorDropPanel.show(anchor);
	}
	
	function calculateDropPanelXY(anchor, dropPanel){
		var anchor = $(anchor),
			anchorOffset = anchor.offset(),
			anchorHeight = anchor.outerHeight(),
			anchorWidth = anchor.outerWidth(),
			dropPanelWidth = dropPanel.outerWidth(),
			x = anchorOffset.left,
			y = anchorOffset.top + anchorHeight + 1;
		
		x = (dropPanelWidth + x) <= document.body.clientWidth ? x : anchorOffset.left - (dropPanelWidth - anchorWidth);
		return [x, y]
	}
	
	function _onPanelClick(evt){
		evt.stopPropagation();
		var anchorDropPanel = evt.data.anchorDropPanel;
		anchorDropPanel.onPanelClick();
	}
	
	$.extend(constructor.prototype, {
		id: null,
		config: null,
		dropPanel: null,
		anchors: null,
		onPanelClick: jQuery.noop,
		currentAnchor: null,
		showAt: function(x, y){
			$(this.dropPanel).css({left: x + 'px', top: y + 'px'});
		},
		show: function(anchor){
			var xy = calculateDropPanelXY(anchor, this.dropPanel);
			this.showAt(xy[0], xy[1]);
			this.currentAnchor = anchor;
		},
		hide: function(){
			$(this.dropPanel).css({left: '-10000px', top: '-10000px'});
			this.currentAnchor = null;
		}
	});
	return constructor;
})(),
/*
	折叠表格
	config: {
		table: CssSelector or HTMLElement,
		expanedRowIndex: 展开行index
	}
 */
FoldableTable: (function(){
	var defaultCssSelector = 'table.foldable-table',
		rowTriggleButtonCssSelector = 'a.row-triggle-btn';
	
	function constructor(config){
		this.table = $(config.table).eq(0);
		attachEvent(this);
		this.expandRow(config.expanedRowIndex || 1);
	}
	
	function attachEvent(foldableTable){
		foldableTable.table.click({foldableTable: foldableTable}, onTableClick);
	}
	
	function onTableClick(jQueryEvent){
		var foldableTable = jQueryEvent.data.foldableTable
			target = $(jQueryEvent.target);
		
		if(target.is(rowTriggleButtonCssSelector)){
			var	currentTableRow = target.parents('tr'),
				currentTableRowExpanded = currentTableRow.hasClass('expanded-subhead'),
				rowIndex = currentTableRow.get(0).rowIndex;
			foldableTable.collapseRow(foldableTable.expandedSubRowIndex);
			if(currentTableRowExpanded == false){
				foldableTable.expandRow(rowIndex);
			}
		}
	}
	
	$.extend(constructor.prototype, {
		table: null,
		expandedSubRowIndex: -1,
		expandRow: function(rowIndex){
			var tableRow = this.table.find('tr:eq(' + rowIndex + ')');
			if(tableRow.length == 0)return;
			tableRow.addClass('expanded-subhead')
				.nextUntil('tr.foldable-table-subhead')
				.addClass('expanded-row');
			this.expandedSubRowIndex = rowIndex;
		},
		collapseRow: function(rowIndex){
			var tableRow = this.table.find('tr:eq(' + rowIndex + ')');
			if(tableRow.length == 0)return;
			tableRow.removeClass('expanded-subhead')
				.nextUntil('tr.foldable-table-subhead')
				.removeClass('expanded-row');
			this.expandedSubRowIndex = -1;
		}
	});
	return constructor;
})(),
BankBranchSelector: (function(){
	var BBS = null,
		anchorDropPanel = null,
		country_selector = null,
		province_selector = null,
		city_selector = null,
		BBS_body = null,
		currentInput = null,
		BBSId = null;
	
	function init(){
		BBSId = Siku.id();
		generateHTML();
	}
	
	function _onBranckPanelClick(e){
		$(e.target)
	}
	
	function _onDropPanelClick(e){
		var target = $(e.target);
		if(target.is('a.BBS-close-btn')){
			anchorDropPanel.hide();
		}
	}
	
	function appendBranch(data){
		var html = '';
		$.each(data, function(i, item){
			html += '<li><span>' + item.text + '</li></span>';
		});
		BBS_body.html(html);
	}
	
	function loadBranch(url, argus){
		$.getJSON(url, argus, function(json){
			appendBranch(data);
		});
	}
	
	function constructor(inputs){		//inputs:  HTMLElement or CssSelector
		anchorDropPanel = new Siku.AnchorDropPanel({
			anchor: inputs,
			dropPanel: '#' + BBSId,
			onPanelClick: _onDropPanelClick //传入参数
		});
	}
	
	function generateHTML(){
		var BBSHtml = '<div class="BBS" id="' + BBSId + '">' +
			'<a class="BBS-close-btn"></a>' +
			'<div class="BBS-region-select-panel search-panel">' +
			  '<ul>' +
				'<li><em>国家：</em><span class="drop-list-down">' +
				  '<input type="text" readonly="readonly" class="BBS-country-input">' +
				  '<label class="drop-down-btn"></label>' +
				  '<div style="display: none;" class="drop-down-con"><a href="javascript:void(0)">中国</a><a href="javascript:void(0)">美国</a></div>' +
				  '</span></li>' +
				'<li><em>省：</em><span class="drop-list-down">' +
				  '<input type="text" readonly="readonly" class="BBS-country-input">' +
				  '<label class="drop-down-btn"></label>' +
				  '<div style="display: none;" class="drop-down-con"><a href="javascript:void(0)">浙江</a><a href="javascript:void(0)">江苏</a></div>' +
				  '</span></li>' +
				'<li><em>市：</em><span class="drop-list-down">' +
				  '<input type="text" readonly="readonly" class="BBS-city-input">' +
				  '<label class="drop-down-btn"></label>' +
				  '<div style="display: none;" class="drop-down-con"><a href="javascript:void(0)">杭州</a><a href="javascript:void(0)">宁波市</a><a href="javascript:void(0)">湖州市</a><a href="javascript:void(0)">湖州市</a><a href="javascript:void(0)">市市市市市市市</a> <a href="javascript:void(0)">嘉兴市</a> </div>' +
				  '</span></li>' +
			  '</ul>' +
			'</div>' +
		  '<div class="BBS-body">' +
			'<ul>' +
				'<li class="hover"><span>西湖支行</span></li>' +
				'<li class="actived"><span>西湖支行</span></li>' +
			'</ul>' +
		  '</div>' +
		'</div>';
		$(document.body).append(BBSHtml);
	}
	
	$.extend(constructor.prototype, {
		loadUrl: 'http://localhost/bank_branch.json',
		loadingView: null,	//加载视图
		errorView: null,	//错误提示视图
		expand: function(){
			this.anchorDropPanel.show(this.input);
		},
		collapse: function(){
			this.anchorDropPanel.hide();
		},
		loading: function(){
			var _this = this;
			this.loadingView.show();
			$.getJSON(this.loadUrl, function(data){
				
			}).fail(function() {
				_this.errorView.show();
			});
		}
	});
	
	$(init);
	return constructor;
})(),
Mask: (function(){
	var maskHTML = '<div class="mask"></div>';
	function constructor(appendElement){
		this.id = Siku.id();
		$(document.body).append('<div class="mask" id="' + this.id + '"></div>');
		this.ele = $('#' + this.id);
		appendElement && this.ele.css({'zIndex': (parseInt($(appendElement).css('zIndex')) || 1) - 1});
	}
	
	$.extend(constructor.prototype, {
		id: null,
		ele: null,
		resize: function(){
			this.ele.css({
				height: $(document).height() + 'px'
			});
		},
		show: function(){
			this.resize();
			this.ele.css({display:'block'});
		},
		hide: function(){
			this.ele.css({display:'none'});
		}
	});
	
	return constructor;
})(),
confirm: (function(){
	var onOkClick = jQuery.noop;
	function init(){
		$('#confirm input.ok-btn').click(function(){
			onOkClick();
			onOkClick = jQuery.noop;
			$('#confirm').css({left:'-10000px',top:'-10000px'});
		});
		$('#confirm input.cancel-btn').click(function(){
			$('#confirm').css({left:'-10000px',top:'-10000px'});
		});
	}
	
	function constructor(content, callback){
		$('#confirm').css({
			left: '50%',
			top: '45%'
		}).find('span.content-text').text(content);
		this.mask = new Siku.Mask('#confirm');
		if($.isFunction(callback)) onOkClick = callback;
	}
	
	$(init);
	return constructor;
})()
};



$(document).ready(function(){
	Siku.dropListDown('.drop-list-down','.drop-down-con'); // 下拉列表事件
	Siku.tabChange('.main-menu-ul a'); // 下拉列表事件
	Siku.editInTable('.change-sx-table'); // 表单中编辑一行
	Siku.tableSelectInit();
	Siku.tableSizeFix();
});

Siku.util = {
		getFileIds: function (){
		    var fileids = [];
		    $('div.upBtnBox li[name=_li]').each(function(){
		       fileids.push(this.getAttribute('fileid'))
		   });
		   return fileids;
		}
};