// JavaScript Document

/*dayArray = new Array(6)
dayArray[0]="星期日"
dayArray[1]="星期一"
dayArray[2]="星期二"
dayArray[3]="星期三"
dayArray[4]="星期四"
dayArray[5]="星期五"
dayArray[6]="星期六"*/


function addZero(num)
{
	if(num>10)
		return num;
	else
		return "0"+num;
}

function showTime()
{
	var today = new Date();
	var year = today.getYear();
	var month = today.getMonth();
	var date = today.getDate();
	var hour = today.getHours();
	var minute = today.getMinutes();
	var second = today.getSeconds();
	//var day = today.getDay();
	
	document.getElementById("stime").innerHTML=year+"年"+(month+1)+"月"+date+"日    "+addZero(hour)+":"+addZero(minute)+":"+addZero(second);

	setTimeout("showTime()",1000);
}
//showTime()
setInterval("showTime()",1000)