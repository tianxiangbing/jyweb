var rx = 100, ry = 100, radio = 60;
window.onload = draw;
function draw() {
    drawBg();
    drawHour();
    drawMinutes();
    drawSecond();
    drawFontClock();    
    var can = document.getElementById("can_bg");
    if (can.getContext) {
        setInterval(drawSecond, 100);
    }
}
function drawFontClock() {
    var can = document.getElementById("can_bg");
    if (can.getContext) {
        var ctx = can.getContext("2d");
        ctx.translate(0, 0);
        ctx.clearRect(20, 60, 200, 200);
        ctx.font = "12px Times New Roman";
        var now = new Date();
        if (ctx.fillText) {
            ctx.save();
            ctx.fillText("www.lovewebgames.com", -100, -90);
            ctx.fillText(now.toLocaleTimeString(), 20, 90);
            ctx.restore();
        }
        if (ctx.mozDrawText) {
            ctx.save();
            ctx.translate(-90, -90);
            ctx.mozTextStyle = "12px Times New Roman";
            ctx.mozDrawText("恋爱时钟lovewebgames");
            ctx.restore();
            ctx.save();
            ctx.translate(20, 90);
            ctx.mozDrawText(now.toLocaleTimeString());
            ctx.restore();
        }
    }
}
function drawSecond() {
    drawFontClock();
    var now = new Date();
    var second = now.getSeconds();
    var millisecond = now.getMilliseconds();
    var minutes =now.getMinutes();
    var can = document.getElementById("can_sec");
    if (can.getContext) {
        var ctx = can.getContext("2d");
        ctx.clearRect(0, 0, can.width, can.height);
        ctx.save();
        ctx.translate(rx, ry);
        ctx.strokeStyle = "#ccc";
        ctx.beginPath();
        ctx.rotate(Math.PI / 30 * (second + millisecond/1000));
        ctx.lineWidth = 1;
        ctx.moveTo(0, 0);
        ctx.lineTo(0, -50);
        ctx.stroke();
        ctx.restore();
        if (second == 0) {
            drawMinutes();
        }
        if (minutes % 6 == 0) {
            drawHour();
        }
    }
}
function drawMinutes() {
    var now = new Date();
    var minutes = now.getMinutes();
    var can = document.getElementById("can_min");
    if (can.getContext) {
        var ctx = can.getContext("2d");
        ctx.clearRect(0, 0, can.width, can.height);
        ctx.save();
        ctx.translate(rx, ry);
        ctx.strokeStyle = "#ccc";
        ctx.beginPath();
        ctx.rotate(Math.PI / 30 * minutes);
        ctx.lineWidth = 2;
        ctx.moveTo(0, 0);
        ctx.lineTo(0, -45);
        ctx.stroke();
        ctx.restore();
    }
}
function drawHour() {
    var now = new Date();
    var hour = now.getHours();
    var minutes =now.getMinutes();
    var can = document.getElementById("can_hour");
    if (can.getContext) {
        var ctx = can.getContext("2d");
        ctx.clearRect(0, 0, can.width, can.height);
        ctx.save();
        ctx.translate(rx, ry);
        ctx.strokeStyle = "#ccc";
        ctx.beginPath();
        ctx.rotate(Math.PI / 6 * (hour + minutes/60));
        ctx.lineWidth = 3;
        ctx.moveTo(0, 0);
        ctx.lineTo(0, -35);
        ctx.stroke();
        ctx.restore();
    }
}
function drawBg() {
    var can = document.getElementById("can_bg");
    if (can.getContext) {
        var ctx = can.getContext("2d");
        ctx.strokeStyle = "rgba(30,30,30,.5)";
        ctx.translate(rx, ry);
        ctx.save();
        ctx.beginPath();
        ctx.arc(0, 0, radio, 0, Math.PI * 2, true);
        ctx.restore();
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, 2, 0, Math.PI * 2, true);
        ctx.stroke();
        ctx.strokeStyle = "#ccc";
        ctx.save();
        for (var i = 0; i < 12; i++) {
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(0, -radio);
            ctx.lineTo(0, -(radio - 8));
            ctx.stroke();
            ctx.lineWidth = 1;
            for (var j = 0; j < 4; j++) {
                ctx.rotate(Math.PI / 30);
                ctx.beginPath();
                ctx.moveTo(0, -radio);
                ctx.lineTo(0, -(radio - 5));
                ctx.stroke();
            }
            ctx.rotate(Math.PI / 30);
        }
    }
}
