var http = require('http');
var fs = require('fs');
var BMP24 = require('gd-bmp').BMP24;

/*app
 用PCtoLCD2002取字模
 行列式扫描，正向取模（高位在前）
 */



//仿PHP的rand函数
function rand(min, max) {
    return Math.random()*(max-min+1) + min | 0; //特殊的技巧，|0可以强制转换为整数
}

//制造验证码图片
function makeCapcha() {
    var img = new BMP24(100, 32 );
    //边框
    //return img;
    //画曲线
    var w=img.w/2;
    var h=img.h;
    var color = rand(0, 0xffffff);
    var y1=rand(0,8); //Y轴位置调整
    var w2=rand(10,15); //数值越小频率越高
    var h3=rand(4,6); //数值越小幅度越大
    var bl = rand(1,5);
    for(var i=-w; i<w; i+=0.1) {
        var y = Math.floor(h/h3*Math.sin(i/w2)+h/2+y1);
        var x = Math.floor(i+w);
        for(var j=0; j<bl; j++){
            img.drawPoint(x, y+j, color);
        }
    }
    var p = "ABCDEFGHKMNPQRSTUVWXYZ23456789";
    var str = '';
    for(var i=0; i<4; i++){
        str += p.charAt(Math.random() * p.length |0);
    }
    var fonts = [BMP24.font8x16, BMP24.font12x24, BMP24.font16x32];
    var x = 15, y=8;
    for(var i=0; i<str.length; i++){
        var f = fonts[Math.random() * fonts.length |0];
        y = 8 + rand(-10, 1);
        img.drawChar(str[i], x, y, f, rand(-10, 0xffffff));
        x += f.w + rand(2, 6);
    }
    return {img: img, str: str};
}


exports.createCode = function (req,res) {
    var bmp = makeCapcha()
     img = bmp.img;
     str = bmp.str;
    const dataUrl = 'data:image/bmp;base64,' + img.getFileData().toString('base64');
    res.setHeader('Content-Type', 'image/bmp');
    res.send({url:dataUrl, str:str});
}


