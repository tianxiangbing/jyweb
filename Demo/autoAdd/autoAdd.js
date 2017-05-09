
/*
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//滚动条插件，使用方法:jquery容器.moveScroll({参数}); by 田想兵 2011.9.5
//options{  speed:滚动速率,step:步长速度 }
//调用示例$(".content").moveScroll();
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
*/
(function($) {
    $.fn.moveScroll = function(options) {
        var settings = { speed: 40, step: 10 };
        if (options) $.extend(settings, options);
        var container = $(this);
        var table = container.children();
        var isActive = false;
        $("body").append('<div style="width:50px;position:absolute;display:none;font-size:20px;font-weight:bolder; background-color:gray;filter:alpha(opacity=50);opacity: 0.5; -moz-opacity:0.5;cursor:pointer;" id="scrollBar">></div>');
        var tmp;
        var bar = $("#scrollBar");
        bar.css("height", container.height());
        container.mouseover(function() {
            $(this).bind("mousemove", function(evt) {
                //console.log(evt.clientX);
                //console.log(container.offset().left);
                var pos = evt.clientX - container.offset().left;
                if (pos > container.width() - 50 && !isActive && container.scrollLeft() < table.get(0).clientWidth - container.width()) {
                    bar.html(">>");
                    showBar(container.width() + container.offset().left - 50, container.offset().top);
                    bar.attr("pos", "right");
                    if (isActive)
                        bar.bind("click", function() {
                            var temp = parseInt(container.scrollLeft()) + settings.step;
                            //console.log(temp);
                            //container.scrollLeft(temp);
                            container.animate({ scrollLeft: temp }, settings.speed);
                        });
                } else {
                    hideBar();
                }
                if (pos < 50 && !isActive && container.scrollLeft() > 0) {
                    showBar(container.offset().left, container.offset().top);
                    bar.html(" <<");
                    bar.attr("pos", "left");
                    if (isActive)
                        bar.bind("click", function() {
                            var temp = parseInt(container.scrollLeft()) - settings.step;
                            //console.log(temp);
                            temp = temp < 0 ? 0 : temp;
                            //container.scrollLeft(temp);
                            container.animate({ scrollLeft: temp }, settings.speed);
                        });
                }
                //console.log(container.width());
                //console.log(table.get(0).clientWidth);
            });
        }).mouseout(function() {
            $(this).unbind("mousemove");
        });
        container.scroll(function() {
            //console.log(container.scrollLeft());
            if ((container.scrollLeft() >= table.get(0).clientWidth - container.width() || container.scrollLeft() == 0) && isActive) {
                hideBar();
                bar.unbind("click");
            }
        });
        bar.mouseout(hideBar);
        function showBar(pos, top) {
            bar.show().css("left", pos).css("top", top);
            isActive = true;
        }
        function hideBar() {
            isActive = false;
            bar.hide();
            bar.unbind("click");
            if (tmp)
                clearInterval(tmp);
        }
        bar.mousedown(function(e) {
            //console.log("down");
            tmp = setInterval(function() {
                var tempx = 0
                switch (bar.attr("pos")) {
                    case "left":
                        {
                            tempx = parseInt(container.scrollLeft()) - 10;
                            //console.log(temp);
                            tempx = tempx < 0 ? 0 : tempx;
                        } break;
                    case "right":
                        {
                            tempx = parseInt(container.scrollLeft()) + 10;
                        } break;
                }
                //console.log(tempx);
                container.scrollLeft(tempx);
            }, 40);
        }).mouseup(function() {
            if (tmp)
                clearInterval(tmp);
        });
    }
})(jQuery);
/*
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//自动添加行，使用方法:jquery容器.autoAdd({参数}); by 田想兵 2011.9.7
//options{tempRowClass:"模版行样式", addButtonClass:"添加按钮样式",delButtonClass:"删除按钮样式"}
//调用示例$(".content").autoAdd();
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
*/
(function($) {
    $.fn.autoAdd = function(options) {
        var settings = { changeInput: $("#input"), tempRowClass: "tempRow", min: 1, max: 90, addButtonClass: "addbtn", delButtonClass: "delbtn", addCallBack: null, delCallBack: null, indexClass: "index", insertClass: "insertbtn", moveUpClass: "moveupbtn", moveDownClass: "movedownbtn" };
        if (options) $.extend(settings, options);
        var content = this;
        var count = content.find("." + settings.tempRowClass).length;
        settings.changeInput.change(function() {
            if (/^\d+$/.test($(this).val())) {
                if ($(this).val() > settings.max || $(this).val() < settings.min) {
                    alert("请输入大于等于 " + settings.min + " 并且小于等于 " + settings.max + " 的数!");
                    if ($(this).val() > settings.max)
                        $(this).val(settings.max);
                    if ($(this).val() < settings.min)
                        $(this).val(settings.min);
                    $(this).change();
                } else {
                    addRow($(this).val());
                }
            } else {
                alert("请输入有效的整数！");
                $(this).val("");
                $(this).focus();
            }
        });
        content.find("." + settings.tempRowClass).each(function() {
            $(this).find(".richText,input").each(function() {
                if (!$(this).attr("id"))
                    $(this).attr("id", "txt_" + Math.round(Math.random() * new Date().getTime()))

            });
        });
        function addRow(num, isInsert, target) {
            //console.log(temp);
            //var strTemp = "";
            for (var i = 0; i < num - count; i++) {
                var temp = content.find("." + settings.tempRowClass).first().clone(true);
                temp.find("input").val("");
                temp.find("select").val("-1");
                temp.find("textarea").val("");
                temp.find(":checkbox").attr("checked", false);
                temp.attr("id", "");
                temp.find("input,tr,textarea,select,:checkbox,tbody").attr("id", "");
                if (temp.find(".richText").length > 0) {
                    temp.find(".ke-container").remove();
                }
                temp.find(".richText,input").each(function() {
                    $(this).attr("id", "txt_" + Math.round(Math.random() * new Date().getTime()))
                    $(this).show();
                });
                //strTemp += "<tr>" + temp.html() + "</tr>";
                if (isInsert) {
                    temp.insertBefore(target.closest("." + settings.tempRowClass));
                } else {
                    content.append(temp);
                }
            }
            if (num < count) {
                for (var j = count - 1; j >= num; j--) {
                    delRow(content.find("."+settings.tempRowClass).eq(j));
                }
            } else {
                //content.append($(strTemp));
                if (settings.addCallBack)
                    settings.addCallBack($(temp));
            }
            count = content.find("." + settings.tempRowClass).length;
            settings.changeInput.val(count);
            sumIndex();
            showhideBtn();
            //console.log(strTemp);
        };
        function showhideBtn() {
            content.find("." + settings.tempRowClass).find("." + settings.moveUpClass + ",." + settings.moveDownClass).show();
            content.find("." + settings.tempRowClass).first().find("." + settings.moveUpClass).hide();
            content.find("." + settings.tempRowClass).last().find("." + settings.moveDownClass).hide();
        }
        content.find("." + settings.addButtonClass).bind("click", function() {
            //console.log(count);
            if (count >= settings.max) {
                alert("最多只能添加 " + settings.max + " 行记录!");
            } else {
                addRow(count + 1);
            }
            return false;
        });
        content.find("." + settings.insertClass).bind("click", function() {
            if (count >= settings.max) {
                alert("最多只能添加 " + settings.max + " 行记录!");
            } else {
                addRow(count + 1, true, $(this));
            }
            return false;
        });
        content.find("." + settings.moveUpClass).bind("click", function() {
            $(this).closest("." + settings.tempRowClass).insertBefore($(this).closest("." + settings.tempRowClass).prev("." + settings.tempRowClass));
            showhideBtn();
            sumIndex();
            return false;
        });
        content.find("." + settings.moveDownClass).bind("click", function() {
            $(this).closest("." + settings.tempRowClass).insertAfter($(this).closest("." + settings.tempRowClass).next("." + settings.tempRowClass));
            showhideBtn();
            sumIndex();
            return false;
        });
        content.find("." + settings.delButtonClass).bind("click", function() {
            //console.log(count);
            if (count > settings.min) {
                count--;
                delRow($(this).closest("." + settings.tempRowClass));
            } else {
                alert("需至少保留 " + settings.min + " 行记录!");
            }
            return false;
        });
        function delRow(row) {
            row.remove();
            count = content.find("." + settings.tempRowClass).length;
            settings.changeInput.val(count);
            if (settings.delCallBack)
                settings.delCallBack(content.children().eq(j));
            showhideBtn();
            sumIndex();
        }
        function sumIndex() {
            content.find("." + settings.indexClass).each(function(index, domEle) {
                $(this).html(index + 1);
            });
        }
        showhideBtn();
    }
})(jQuery);
$(function() {
    $(".autoAdd").each(function() {
        $(this).autoAdd();
    });
});
function querystring(uri, val) {
    var re = new RegExp("" + val + "\=([^\&\?]*)", "ig");
    return ((uri.match(re)) ? (uri.match(re)[0].substr(val.length + 1)) : null);
}