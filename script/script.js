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
var constX = Math.floor(Math.random() * 2);
var constY = Math.floor(Math.random() * 2);
var box = [/*box25,box24,box23,box22,box21,box20,box19,box18,box17,box16,box15,box14,box13,box12,box11,*/box10, box9, box8, box7, box6, box5, box4, box3, box2, box1];
var savedColor;
var tokenx = [constX, constX, constX, constX, constX, constX, constX, constX, constX, constX];
var tokeny = [constY, constY, constY, constY, constY, constY, constY, constY, constY, constY];
var r, g, b;
var devHeight = document.body.offsetHeight - 100;
var devWidth = document.body.offsetWidth - 100;
var ranX = Math.floor(Math.random() * (devWidth - 100)) + 100;
var ranY = Math.floor(Math.random() * (devHeight - 100)) + 100;
var loopId;
var text1 = document.getElementById("text1");
var text2 = document.getElementById("text2");

function randomColor() {
    return Math.floor(Math.random() * 256);
}

//change 10 to 25  for chaos also activate every comment for 25 afterimages

r = randomColor();
g = randomColor();
b = randomColor();


for (i = 0; i < 10; i++) {
    box[i].style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    console.log(box[i].style.backgroundColor);
}

function move(i, j) {
    var x = box[i].offsetLeft;
    var y = box[i].offsetTop;
    if (tokenx[i] % 2 == 0) {
        x += j;
        if (x > devWidth) {
            x -= j;
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
    else {
        x -= j;
        if (x < 0) {
            x += j;
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
        y += j;
        if (y > devHeight) {
            y -= j;
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
        y -= j;
        if (y < 0) {
            y += j;
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

    if ((x == 0 && y == 0) || (x == devWidth && y == 0) || (x == 0 && y == devHeight) || (x == devWidth && y == devHeight)) {
        monologue();
    }

}

function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

async function monologue() {
    for (let q = 0; q < 10; q++) {
        box[q].style.backgroundColor = "rgb(0, 0, 0)";
    }
    document.body.style.backgroundColor = "rgb(255, 255, 255)";
    clearInterval(loopId);
    await sleep(3000)
    await blockFadeAway()
}

async function blockFadeAway() {
    for (let i = 0; i < 10; i++) {
        box[i].classList.add("fade");
        box[i].style.opacity = 0;
    }
    await sleep(3000);
    text1Appear();
}

async function text1Appear() {
    text1.style.opacity = 1;
    await sleep(3000);
    text2Appear();
}

async function text2Appear() {
    text2.style.opacity = 1;
    await sleep(3000);
    nothing();
}

async function nothing() {
    text1.style.opacity = 0;
    text2.style.opacity = 0;
    await sleep(3000);
    youHavePassedTheTest();
}

async function youHavePassedTheTest(){
    location.reload();
}

function change() {
    devHeight = document.body.offsetHeight - 100;
    devWidth = document.body.offsetWidth - 100;
    for (let i = 0; i < 10; i++) {
        move(i, 1);
    }
}

function startup() {

    for (let i = 0; i <= 9; i++) {
        box[i].style.left = ranX + "px";
        box[i].style.top = ranY + "px";
    }


    for (let i = 0; i <= 9; i++) {
        for (let j = 0; j < i; j++) {
            //change these 10 to get some weird ares (from calamatiy ofcourse) chains (still staying family friendly)
            move(i, 10);
        }
    }

    loopId = setInterval(change, 1);

}