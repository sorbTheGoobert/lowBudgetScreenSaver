var box1 = document.getElementById("box1");
var box2 = document.getElementById("box2");
var box3 = document.getElementById("box3");
var box4 = document.getElementById("box4");
var box5 = document.getElementById("box5");
var box = [box5, box4, box3, box2, box1];
var savedColor;
var bonk = 0;
var tokenx = [0, 0, 0, 0, 0];
var tokeny = [0, 0, 0, 0, 0];
var r = [0, 0, 0, 0, 0], g = [0, 0, 0, 0, 0], b = [0, 0, 0, 0, 0];

function randomColor() {
    return Math.floor(Math.random() * 256);
}


for(i = 0; i<5; i++){
    r[i] = randomColor();
    g[i] = randomColor();
    b[i] = randomColor();
}

for(i=0; i<5; i++){
    box[i].style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
}


function change() {
    var devHeight = document.body.offsetHeight - 100;
    var devWidth = document.body.offsetWidth - 100;
    for (let i = 0; i < 5; i++) {
        var x = box[i].offsetLeft;
        var y = box[i].offsetTop;
        if (tokenx[i] % 2 == 0) {
            x++;
            if (x > devWidth) {
                x = devWidth - 1;
                tokenx[i]++;
                if(i == 4){
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
                if (i == 4) {
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
                if (i == 4) {
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
                if (i == 4) {
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
    for (let i = 1; i <= 5; i++) {
        for (let j = 0; j < i; j++) {
            box[j].style.left = 50 * j + "px";
            box[j].style.top = 50 * j + "px";
        }
    }
    setInterval(change, 1);
}