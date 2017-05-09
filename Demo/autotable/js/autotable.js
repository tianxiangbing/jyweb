/****
* 自动格式化表格
* by 田想兵 @ 2014.4.18
* 55342775@qq.com
* 注:表格数ajax请求，自带分页，父子两级数据绑定
* 例：
 $(".autoTable").autoTable({
	column:[{
			name:"name",type:"link",url:"asdfasd.html",args:["id"]
		},{
			name:"money",type:"money",align:'right'
		},{
			name:"money",type:"money",align:'right'
		},{
			name:"money",type:"money",align:'right'
		},{
			name:"money",type:"money",align:'right'
		},{
			name:"type",type:"text"
		},{
			name:"NO",type:"text"
		},{
			name:"status",type:"text"
		},{
			action:true,child:[
				{
					isp:true,
					type:'html',click:function(){

					},
					html:'<span class="action-drop-btn gnslect">功能选项<a class="action-btn-icon"></a></span>'
				},
					{
					isc:true,
					type:'html',click:function(){

					},
					html:'<a class="action-btn edit" >编辑</a>&nbsp;&nbsp;<a class="action-btn">追溯</a>'
				}
			]
		}
	],
	className:'scroll-table-innertable',
	ref:'id',
	datasource:"data.txt",//请求
	childsource:'data2.txt',//请求
	ispager:true, //是否有分页
	pagerContainer:$(".pagerCon")//分页容器
  });
*
****/
(function($){
  $.fn.dockTable = function(args){
  	var table = $(this);
  	var columns = args.columns;
  	var dockTr = '';
  	for(var i =0 ,l = columns.length ; i <l ; i++){
  		if (columns[i].type =="dock"){
  			//固定列
  			var column= columns[i].column;
  			if (column.action){
  				if(column.html){
  					dockTr = '<tr><td class="operate">'+column.html+'</td></tr>';
  					// table.append(trstr);
  				}
  			}
  		}else{
  			args.column = columns[i].column;
  			var callback = args.callback;
  			args.callback=function(args){
				var autotable = args ;
				var rowspan = $(autotable).find('tr').size();
				var str = '';
				for(var j = 1 ;j <rowspan;j++){
					str+=dockTr;
				};
				$(table).children('tbody').children().eq(0).nextAll().remove();
				$(table).append(str);
				$(autotable).closest('td').prop("rowspan",rowspan);//合并行
				callback?callback(args):null;
			}
			var obj = new AUTOTable(table.find('.autoTable'),args);
			obj.init();
  		}
  	}
  };
  $.fn.autoTable = function(args){
	var table = $(this);
	var obj = new AUTOTable(table,args);
	obj.init();
	return obj;
  };
  function AUTOTable (table,args){
	this.table = table;
	this.tbody = table.children('tbody');
	this.config = $.extend({},args);
	this.page = 1;
	this.pageCount= 1;
  };
  //金额转换
  function formatCurrency(num) {
    num = num.toString().replace(/\$|\,/g,'');
    if(isNaN(num))
    num = "0";
    sign = (num == (num = Math.abs(num)));
    num = Math.floor(num*10+0.50000000001);
    cents = num;
    num = Math.floor(num/10).toString();
    for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)
    num = num.substring(0,num.length-(4*i+3))+','+
    num.substring(num.length-(4*i+3));
    return (((sign)?'':'-') + num + '.' + cents);
}
  AUTOTable.prototype={
	constructor:AUTOTable,
	changeSource:function(args){
		$(this.table).children('tbody').html('');
		this.page = 1;
		this.ajaxSource(args);
	},
	init:function(){
		var _this = this;
		this.ajaxSource().done(function(){
			if (_this.config.ispager){
				_this.initPager();
			};
			_this.bindEvt();
		});
	}
	,initPager:function(){
		var _html ='<div class="table-page"> <a href="javascript:void(0);" class="table-page-btn page-start-unabled"><span>&nbsp;</span></a> <a href="javascript:void(0);" class="table-page-btn page-pre-unabled"><span>&nbsp;</span></a>\
        <div class="table-page-input-box">\
          <input type="text" class="table-page-input" value="1"><span class="totalPager"></span> </div>\
        <a href="javascript:void(0);" class="table-page-btn page-next-unabled"><span>&nbsp;</span></a> <a href="javascript:void(0);" class="table-page-btn page-end-unabled"><span>&nbsp;</span></a> </div>';
		this.pageHtml = $(_html);
		if ( this.config.pagerContainer){
			this.config.pagerContainer.append(this.pageHtml);
		}else{
			$(this.table).after(this.pageHtml);
		}
		$(this.pageHtml).find('.totalPager').html(' / '+this.pageCount);
		this.bindPageEvt();
	}
	,bindPageEvt:function(){
		var _this = this;
		this.pageHtml.find('.table-page-input').keydown(function(e){
			if(e.keyCode==13){
				$(_this.table).children('tbody').html('');
				var value = parseInt($(this).val())||1;
				_this.page = Math.max( Math.min(_this.pageCount,value),1);
				$(this).val(_this.page);
				_this.ajaxSource();
			}
		});
		this.pageHtml.find('.page-pre-unabled').click(function(e){
			var value = _this.page- 1;
			var oldpage = _this.page;
			_this.page = Math.max( Math.min(_this.pageCount,value),1);
			if (oldpage == _this.page){
				return false;
			};
			_this.pageHtml.find('.table-page-input').val(_this.page);
			$(_this.table).children('tbody').html('');
			_this.ajaxSource();
		});
		this.pageHtml.find('.page-next-unabled').click(function(e){
			var value = _this.page+ 1;
			var oldpage = _this.page;
			_this.page = Math.max( Math.min(_this.pageCount,value),1);
			if (oldpage == _this.page){
				return false;
			};
			_this.pageHtml.find('.table-page-input').val(_this.page);
			$(_this.table).children('tbody').html('');
			_this.ajaxSource();
		});
		this.pageHtml.find('.page-start-unabled').click(function(e){
			var value = 1;
			var oldpage = _this.page;
			_this.page = Math.max( Math.min(_this.pageCount,value),1);
			if (oldpage == _this.page){
				return false;
			};
			_this.pageHtml.find('.table-page-input').val(_this.page);
			$(_this.table).children('tbody').html('');
			_this.ajaxSource();
		});
		this.pageHtml.find('.page-end-unabled').click(function(e){
			var value = _this.pageCount;
			var oldpage = _this.page;
			_this.page = Math.max( Math.min(_this.pageCount,value),1);
			if (oldpage == _this.page){
				return false;
			};
			_this.pageHtml.find('.table-page-input').val(_this.page);
			$(_this.table).children('tbody').html('');
			_this.ajaxSource();
		});
	}
	,ajaxSource:function(args){
		var _this = this;
		return $.ajax({
			url : this.config.datasource,
			type:'get',
			dataType:'json',
			data:$.extend({page:this.page},this.config.args,args),
			success:function(result){
				if (!result.hasError){
					// var data =  result.content.data;
					// for(var i = 0 ,l < data.length; i < l ;i ++){
					// 	data[i][_this.config.ref]=data[i][_this.config.pid];
					// 	data[i][_this.config.pid]=0;
					// }
					if(_this.config.complete){
						_this.config.complete(result.content.data);
						_this.data = result.content.data;
						var arr = result.content.data;
						console.log(arr)
						var a= [];
						for(var i = 0 ,l = arr.length;i<l;i++){
							var  o = arr[i];
							a=a.concat(o.data);
						}
						_this.formatHTML(a);
					}else{
						_this.formatHTML(result.content.data);
					}
					_this.pageCount = result.content.pagecount;
				}
			}
		});
	},
	bindEvt:function(){
		var _this = this;
		$(this.table).delegate('.row-triggle-btn','click',function(){
			var row = $(this).closest('tr');
			var id = row.attr('ref');
			var _self = this;
			var child =  $(this).closest('table').find("tr[pid='"+id+"']");//$(_this.table).find("[pid='"+id+"']");
			if ($(this).hasClass('exted')){
				child.hide();
				$(this).removeClass('exted');
			}else{
				$(this).closest('tr').siblings("tr[pid='0']").find(" .row-triggle-btn").filter('.exted').click();
				//console.log($(this).closest('tr').siblings("tr[pid='0']").find(" .row-triggle-btn"))
				if (child.length == 0){
					$.ajax({
						url : _this.config.childsource,
						type:'get',
						dataType:'json',
						data:{pid:id},
						success:function(result){
							if (!result.hasError){
								if (result.content.data.length==0){
									$(_self).hide();
									return false;
								}
								_this.formatHTML(result.content.data,row,_this.config.childColumn);
								$(_self).addClass('exted');
							}
						}
					});
				}else{
					child.show();
					$(this).addClass('exted');
				}
			}
		})
		$(this.table).delegate(':checkbox.checkChild','click',function(){			
			var row = $(this).closest('tr');
			var id = row.attr('ref');
			var child =  $(this).closest('table').find("tr[pid='"+id+"']");
			if ($(this).filter(":checked").length ){
				child.find('.checkChild').prop('checked',true)
			}else{
				child.find('.checkChild').prop('checked',false)
			}
		});
		$(this.table).delegate('.editcell','click',function(){			
			$(this).hide();
			var td = $(this).closest('td');
			var width = td.width();
			var dataType = $(td).attr("data-type");
			var dataValue = $(td).attr("data-value");
			if (dataType == "money"){
				var input = $('<input type="text" class="edit-input" value="'+dataValue+'"/>');
				$(this).parent(input).html(input);
				input .focus();
			}else
			if (dataType =="date"){
				var input = $('<input type="text" class="edit-input Wdate edit-input-Wdate" readonly="readonly" value="'+dataValue+'"/>');
				input.click(function(){
					WdatePicker({onpicked:function(args){
						var id = $(this).closest('tr').attr('ref');
						var obj = {};
						obj[$(args.el).parent().attr('updatename')] = $(args.el).val();
						_this.updateCell(id,obj,$(args.el))
					}});
				});
				$(this).parent(input).html(input);
			}else{
				var input = $('<input type="text" class="edit-input"/>');
				input.val($(this).next().html());
				$(this).parent(input).html(input);
				input .focus();
			}
			input.not('.Wdate').bind('blur',function(){
				var id = $(this).closest('tr').attr('ref');
				var obj = {};
				obj[$(this).parent().attr('updatename')] = $(this).val();
				_this.updateCell(id,obj,$(this));
			})
		});
	}
	,updateCellSucc:function(id,obj,input ){
		var con = $('<div class="edit-sign edit-span-right editcell"></div><div class="edit-span edit-span-right editcon"></div>');
		var value = input.val();
		input .closest('td').attr('data-value',value);
		var dataType = input .closest('td').attr('data-type');
		if (dataType=="money"){
			value = formatCurrency( parseFloat( value),2);
		}
		con.filter('.editcon').html(value);
		if (input.parent().attr('callback')){
			window[input.parent().attr('callback')].call(input,obj);
		}
		input.parent().html(con);
		input.remove();
	}
	//更新列
	,updateCell:function(id,obj,input ){
		//console.log(id,obj)
		var o = {};
		o[this.config.ref] = id;
		var _this = this;
		if(input.parent().attr('updateurl')){
			$.ajax({
				url : input.parent().attr('updateurl'),
				type:'post',
				dataType:'json',
				data:$.extend(o,obj),
				success:function(result){
					if (!result.hasError){
						//console.log('update ok!');
						_this.updateCellSucc(id,obj,input );
					}
				}
			});
		}else{
			_this.updateCellSucc(id,obj,input );
		}
	}
	,formatHTML:function(data,parent,columnAttr){
		var _this = this;
		var columns = this.config.column;
		if (columnAttr){
			columns=columnAttr
		}
		for (var i = 0 ,l = data.length ; i<l ; i++){
			var tdstr = '';
			var item = data[i];
			for (var  j = 0 , len = columns.length; j<len ; j++ ){
				var column = columns[j];
				var str = '',dataType="",dataValue="";				
				if (column.type =="link" &&item[column.name]){
					var url = column.url+"?";
					var argstr = [];
					for (var ii = 0 ,ll =column.args.length ;ii<ll ; ii++){
						argstr.push(column.args[ii]+'='+item[column.args[ii]])
					}
					url += argstr.join("&");
					str='<a href="'+url+'">'+item[column.name]+'</a>';
				}else
				if (column.type=="moneylink"&&item[column.name]){
					var url = column.url+"?";
					var argstr = [];
					for (var ii = 0 ,ll =column.args.length ;ii<ll ; ii++){
						argstr.push(column.args[ii]+'='+item[column.args[ii]])
					}
					url += argstr.join("&");
					str='<a href="'+url+'">'+formatCurrency(item[column.name],2)+'</a>';
				}else
				if(column.type=="money"&&item[column.name]){
					str=formatCurrency(item[column.name],2);
					dataType = 'data-type="money"';
					dataValue = 'data-value="'+item[column.name]+'"';
				}else
				if(column.type=="rate"&&item[column.name]){
					str = formatCurrency(item[column.name],4);
					dataType = 'data-type="rate"';
					dataValue = 'data-value="'+item[column.name]+'"';
				}else
				if(column.type =="date"&&item[column.name]){
					str=item[column.name];
					dataType = 'data-type="date"';
					dataValue = 'data-value="'+item[column.name]+'"';
				}else
				if(column.type =="twoField" ){
					str = '<span class="text-left"><span class="bank-name">'+item[column.name.split('|')[0]]+'</span><span class="bank-sub-branch-name gray-text">'+item[column.name.split('|')[1]]+'</span></span>';
				}else
				if (column.name&&item[column.name]){
					str=item[column.name];
				}else{
					if (column.action){
						var actionstr = '';
						for (var k=0,n= column.child.length;k<n;k++ ){
							var tmp = column.child[k];
							if (tmp.type =="checkbox" ){
								actionstr+='<input type="checkbox" name="chk" value="1" class="checkChild"/>';
							};
							if (tmp.type =="extend" && !item[this.config.pid]){
								actionstr+='<a class="row-triggle-btn"></a>';
							};
							if (tmp.type=="html"){
								if (!item[this.config.pid] && tmp.isp){
									actionstr+=tmp.html;
								}else
								if (item[this.config.pid] && tmp.isc){
									actionstr+=tmp.html;
								}else if(!tmp.isc&&!tmp.isp){
									actionstr+=tmp.html;
								}
							}
						}
						str=actionstr;
					}
				};
				var align = column.align ? 'align='+column.align:"";
				var className = column.className ?'class='+column.className:"";
				if (column.update){
					var updateurl = column.updateurl || "";
					var callback = column.callback || "";
					str ='<span class="editspan edit-span-right" updateName="'+column.name+'" updateurl="'+updateurl+'" callback="'+callback+'"><div class="edit-sign edit-span-right editcell"></div><div class="edit-span edit-span-right editcon">'+str+'</div></span>';
				}
				tdstr+='<td '+align+' '+dataValue+' '+className+' '+dataType+'>'+str+'</td>';
			}
			var classNmae =!item[this.config.pid]?this.config.className:"white-row";
			var pid= item[this.config.pid] ||0;
			var tr = $('<tr ref="'+item[this.config.ref]+'" pid="'+pid+'" class="'+classNmae+'">'+tdstr+'</tr>');
			if (parent){
				parent.after(tr);
			}else{
				this.tbody.append(tr);
			};
			if (item.children){
				if (item.children.length>0){
					tr.find('.row-triggle-btn').addClass('exted')
					this.formatHTML(item.children,null,_this.config.childColumn);
				}
			}
		}
		if (this.config.callback){
			this.config.callback.call(this,this.table);
		}
	  }
  }
  })(jQuery);
 
  