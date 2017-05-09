
//******js弹出层提示txb20100110********//
function objDIV() {
    this.bgdiv ;
    this.infodiv ;
}
objDIV.prototype.openBG = function() {
    openBackDiv(this);
    document.body.appendChild(this.bgdiv);
    this.bgdiv.style.display = "block";
    this.bgdiv.style.width = document.documentElement.clientWidth + "px";
    this.bgdiv.style.height = document.documentElement.scrollHeight + "px";
}
objDIV.prototype.openRegInfo = function() {
    this.openBG();
    openDiv(this);
}
objDIV.prototype.openLoading = function() {
    this.openBG();
    openLoadDiv(this);
}
objDIV.prototype.openLoad = function() {
    openLoadDiv(this);
}
objDIV.prototype.removeBG = function() {
    if (this.bgdiv || document.getElementById("overDiv")) {
        if (this.bgdiv) {
            document.body.removeChild(this.bgdiv);
        } else {
            document.body.removeChild(document.getElementById("overDiv"));
        }
    }
}
objDIV.prototype.removeInfo = function() {
    this.removeBG();
    if (this.infodiv) {
        document.body.removeChild(this.infodiv);
    } else {
    document.body.removeChild(document.getElementById("div_info"));
    }
}

function openLoadDiv(txbdiv) {
    txbdiv.infodiv = document.createElement("div");
    txbdiv.infodiv.setAttribute("id", "div_info");
    txbdiv.infodiv.innerHTML = "<div style=\" line-height:1.5;background:url(tips-top-bg.gif) repeat-x; height:54px; text-align:center;\"><img border=\"0\" src=\"xtts.gif\" /></div><div style='padding:20px; font-size:14px; color:#b44201;'><div style='width:100px; float:left;margin:60px 0 0 60px; height:80px;'><img src='loading.gif' width='100px' height='100' border='0'/></div><div style='float:left; width:250px;margin:90px 0 0 20px;'><p>请稍等，正在处理中...</p></div></div></div>";
    document.body.appendChild(txbdiv.infodiv);
    txbdiv.infodiv.style.width = "550px";
    txbdiv.infodiv.style.height = "270px";
    txbdiv.infodiv.style.fontSize = "14px";
    txbdiv.infodiv.style.position = "absolute";
    txbdiv.infodiv.style.background = "#fff";
    txbdiv.infodiv.style.zIndex = "9999";

    centerobject();
}

function openBackDiv(txbdiv) {
    txbdiv.bgdiv = document.createElement("div");
    txbdiv.bgdiv.setAttribute("id", "overDiv");
    //alert(document.documentElement.clientWidth);
    txbdiv.bgdiv.innerHTML = "<iframe frameborder=\"no\" class=\"overPanel\" id=\"ifrover\"></iframe>";
    //"<div id=\"overPanel\" > <iframe frameborder=\"no\" class=\"overPanel\" id=\"ifrover\"></iframe></div>";
    //txbdiv.openBG();
}
function openDiv(txbdiv) {
    //txbdiv.openBG();
    txbdiv.infodiv = document.createElement("div");
    txbdiv.infodiv.setAttribute("id", "div_info");
    txbdiv.infodiv.innerHTML = "<div style=\" line-height:1.5;background:url(tips-top-bg.gif) repeat-x; height:54px; text-align:center;\"><img border=\"0\" src=\"xtts.gif\" /></div><div style=\"padding:20px;\"><div style=\"width:120px; float:left;\"><img src=\"xin.gif\" /></div><div style=\"float:right; width:350px;color:#b44201;\" id=\"showdivinfo\"><p>恭喜您，注册成功!</p><p>请牢记您的账号：<font color=\"#b44201\" id=\"orpai_ID\">5678537</font></p></div><div style=\"margin:0 auto;\"><input type='button' value='确认' onclick='new objDIV().removeInfo();'/></div></div>";
    document.body.appendChild(txbdiv.infodiv);
    txbdiv.infodiv.style.width = "550px";
    txbdiv.infodiv.style.height = "270px";
    txbdiv.infodiv.style.fontSize = "14px";
    txbdiv.infodiv.style.position = "absolute";
    txbdiv.infodiv.style.background = "#fff";
    txbdiv.infodiv.style.zIndex = "9999";

    centerobject();
}

function centerobject() {
    if (document.getElementById("overDiv")) {
        var objdiv = document.getElementById("overDiv").style;
        objdiv.height = document.documentElement.scrollHeight + "px";
        objdiv.left = parseInt((document.documentElement.clientWidth - parseInt(objdiv.width)) / 2) + "px";
        //alert(document.documentElement.scrollHeight)
        objdiv.top = parseInt((document.documentElement.clientHeight - parseInt(objdiv.height)) / 2) + "px";
    }
    if (document.getElementById("div_info")) {
        var div_info = document.getElementById("div_info").style;
        div_info.left = parseInt((document.documentElement.clientWidth - parseInt(div_info.width)) / 2) + "px";
        div_info.top = parseInt((document.documentElement.clientHeight - parseInt(div_info.height)) / 2) + "px";
    }
}

function centerDIV(objId) {
    if (document.getElementById(objId)) {
        var objdiv = document.getElementById(objId).style;
        objdiv.height = document.getElementById(objId).scrollHeight + "px";
        objdiv.width = document.getElementById(objId).scrollWidth + "px";
        objdiv.left = parseInt((document.documentElement.clientWidth - parseInt(objdiv.width)) / 2) + "px";
        //alert(document.documentElement.scrollHeight)
        objdiv.top = parseInt((document.documentElement.clientHeight  - parseInt(objdiv.height))/ 2) + "px";
        
    }
}

function centerObj(obj) {
    if (obj) {
        var objdiv = obj.style;
        objdiv.height = obj.scrollHeight + "px";
        objdiv.width = obj.scrollWidth + "px";
        objdiv.left = parseInt((document.documentElement.clientWidth - parseInt(objdiv.width)) / 2) + "px";
        //alert(document.documentElement.scrollHeight)
        objdiv.top = parseInt((document.documentElement.clientHeight - parseInt(objdiv.height)) / 2) + "px";
    }
}
//window.onresize = centerobject;   