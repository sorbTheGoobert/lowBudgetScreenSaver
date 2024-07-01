var box1 = document.getElementById("box1");
var box2 = document.getElementById("box2");
var box3 = document.getElementById("box3");
var box4 = document.getElementById("box4");
var box5 = document.getElementById("box5");
var box6 = document.getElementById("box6");
var box7 = document.getElementById("box7");
var box8 = document.getElementById("box8");
var box9 = document.getElementById("box9");
var box10 = document.getElementById("box10");
/*
var box11 = document.getElementById("box11");
var box12 = document.getElementById("box12");
var box13 = document.getElementById("box13");
var box14 = document.getElementById("box14");
var box15 = document.getElementById("box15");
var box16 = document.getElementById("box16");
var box17 = document.getElementById("box17");
var box18 = document.getElementById("box18");
var box19 = document.getElementById("box19");
var box20 = document.getElementById("box20");
var box21 = document.getElementById("box21");
var box22 = document.getElementById("box22");
var box23 = document.getElementById("box23");
var box24 = document.getElementById("box24");
var box25 = document.getElementById("box25");
*/
var box = [/*box25,box24,box23,box22,box21,box20,box19,box18,box17,box16,box15,box14,box13,box12,box11,*/box10,box9,box8,box7,box6,box5, box4, box3, box2, box1];
var savedColor;
var bonk = 0;
var tokenx = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0/*, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0*/];
var tokeny = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0/*, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0*/];
var r = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0/*, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0*/], g = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0/*, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0*/], b = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0/*, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0*/];

function randomColor() {
    return Math.floor(Math.random() * 256);
}

//change 10 to 25  for chaos also activate every comment for 25 afterimages

for(i = 0; i<10; i++){
    r[i] = randomColor();
    g[i] = randomColor();
    b[i] = randomColor();
}

for(i=0; i<10; i++){
    box[i].style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
}


function change() {
    var devHeight = document.body.offsetHeight - 100;
    var devWidth = document.body.offsetWidth - 100;
    for (let i = 0; i < 10; i++) {
        var x = box[i].offsetLeft;
        var y = box[i].offsetTop;
        if (tokenx[i] % 2 == 0) {
            x++;
            if (x > devWidth) {
                x = devWidth - 1;
                tokenx[i]++;
                if(i ==9){
                    box[i].style.backgroundColor = `rgb(${randomColor()}, ${randomColor()}, ${randomColor()})`
                    savedColor = box[i].style.backgroundColor;
                }
                else{
                    box[i].style.backgroundColor = savedColor;
                }
            }
        }
        else {
            x--;
            if (x < 0) {
                x = 1;
                tokenx[i]++;
                if (i == 9) {
                    box[i].style.backgroundColor = `rgb(${randomColor()}, ${randomColor()}, ${randomColor()})`
                    savedColor = box[i].style.backgroundColor;
                }
                else {
                    box[i].style.backgroundColor = savedColor;
                }
            }
        }
        if (tokeny[i] % 2 == 0) {
            y++;
            if (y > devHeight) {
                y = devHeight - 1;
                tokeny[i]++;
                if (i == 9) {
                    box[i].style.backgroundColor = `rgb(${randomColor()}, ${randomColor()}, ${randomColor()})`
                    savedColor = box[i].style.backgroundColor;
                }
                else {
                    box[i].style.backgroundColor = savedColor;
                }
            }
        }
        else {
            y--;
            if (y < 0) {
                y = 1;
                tokeny[i]++;
                if (i == 9) {
                    box[i].style.backgroundColor = `rgb(${randomColor()}, ${randomColor()}, ${randomColor()})`
                    savedColor = box[i].style.backgroundColor;
                }
                else {
                    box[i].style.backgroundColor = savedColor;
                }
            }
        }
        box[i].style.left = `${x}px`;
        box[i].style.top = `${y}px`;
    }
}

function startup(){
    for (let i = 1; i <= 10; i++) {
        for (let j = 0; j < i; j++) {

            //change these 10 to get some weird ares (from calamatiy ofcourse) chains (still staying family friendly)
            box[j].style.left = 10 * j + "px";
            box[j].style.top = 10 * j + "px";
        }
    }
    setInterval(change, 1);
}