var cnv = document.getElementById('canvas');
var ctx = cnv.getContext('2d');
var width = 400, height = 400;

cnv.width = width;
cnv.height = height;
cnv.style.backgroundColor = '#B4B4B4';


ctx.strokeStyle = 'blue';
ctx.lineWidth = 5;

var fillRect = function (x, y, w, h) {
    ctx.fillRect(x, y, w, h);
    ctx.fillStyle = 'black';
};

var strokeRect = function (x, y, w, h) {
    ctx.strokeRect(x, y, w, h);
};

var Rect = function (x, y, w, h){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.selected = false;
    };


Rect.prototype = {
    draw : function() {
        fillRect(this.x, this.y, this.w, this.h)
    },

    stroke : function(){
        strokeRect(this.x, this.y, this.w, this.h)
    },

    select :function() {
        this.selected = !this.selected;
    }

};

var rect = [], 
    rect2 = [],
    rect3 = [],
    rect4 = [];
for (i = 0; i < 8; i += 2)
for (j = 0; j < 8; j += 2){
    rect.push(new Rect(i * 50, j * 50, 50,50));
    rect2.push(new Rect((i + 1) * 50, (j + 1) * 50, 50,50));
    rect3.push(new Rect((i + 1) * 50, (j + 1) * 50 - 50, 50,50));
    rect4.push(new Rect(i * 50, 50 + j * 50, 50,50))
};

console.log(rect)

var isCursorInRect = function(x, y, rect){
    return x > rect.x && x < rect.x + rect.w && 
           y > rect.y && y < rect.y + rect.w;
};

cnv.onclick = function(e){
    var x = e.clientX,
        y = e.clientY;

    for(i in rect){
        if(isCursorInRect(x, y, rect[i]))
            rect[i].select();
    }
    for(i in rect2){
        if(isCursorInRect(x, y, rect2[i]))
            rect2[i].select();
    }
    for(i in rect3){
        if(isCursorInRect(x, y, rect3[i]))
            rect3[i].select();
    }
    for(i in rect4){
        if(isCursorInRect(x, y, rect4[i]))
            rect4[i].select();
    }
};


setInterval(function(){
    ctx.clearRect(0, 0, width, height)
    for (i in rect){
        rect[i].draw();
        if (rect[i].selected)
            rect[i].stroke();
    }
    for (i in rect2){
        rect2[i].draw();
        if (rect2[i].selected)
            rect2[i].stroke();
    }
    for (i in rect3){
        rect3[i].draw();
        ctx.fillStyle = 'white';
        if (rect3[i].selected)
            rect3[i].stroke();
    }
    for (i in rect4){
        rect4[i].draw();
        ctx.fillStyle = 'white';
        if (rect4[i].selected)
            rect4[i].stroke();
    }
    
},30);