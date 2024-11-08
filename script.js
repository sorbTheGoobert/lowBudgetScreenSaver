/**
 * * Here is the quote
 * You are well lucky
 * Now seek the Gargantua
 */

function randomizeColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return [r, g, b];
}

function pythagroean(x, y) {
  return Math.sqrt(x * x + y * y);
}

function randomLocationOnScreen(w, h, s) {
  return [
    Math.floor(Math.random() * (w - s)) + s / 2,
    Math.floor(Math.random() * (h - s)) + s / 2,
  ];
}

function xor(x, y) {
  return !(x && y) && (x || y);
}

class BouncerContainer {
  constructor(props) {
    this.container = document.createElement("div");
    this.container.style.position = "relative";
    this.container.style.width = `${props.w}px`;
    this.container.style.height = `${props.h}px`;
    props.p.appendChild(this.container);
    this.Bouncers = [];
    for (let B = 0; B < props.b.length; B++) {
      this.Bouncers.push(new Bouncer({ ...props.b[B], p: this.container }));
    }
  }
  init = () => {
    // setInterval(this.update, 1);
    setInterval(this.update, 1000 / 60);
  }
  update = () => {
    this.Bouncers.forEach((element) => {
      element.update();
    });
  }
}

class Bouncer {
  constructor(props) {


    this.SPEED = props.v;
    this.BOX_SIZE = props.s;
    this.TRAIL_SIZE = props.t;
    this.TRAIL_SIZE = Math.min(this.TRAIL_SIZE, 1);
    this.offset = props.o
    this.container = document.createElement("div");
    this.container.style.position = "absolute";
    this.container.style.left = "0px";
    this.container.style.top = "0px";
    this.parent = props.p;
    this.parent.appendChild(this.container);

    this.head = new Head(
      { i: props.i, c: randomizeColor(), v: [this.SPEED, this.SPEED], s: this.BOX_SIZE, z: props.l, p: this.container, o: this.offset },
    );

    this.box = [];
    const opacStep = 0.9 / (props.l);
    let opacity = 0.9;
    const sizeStep = (this.BOX_SIZE * this.TRAIL_SIZE) / (props.l);
    let curSize = this.BOX_SIZE * this.TRAIL_SIZE;
    for (let i = 0; i < props.l; i++) {
      this.box.push(
        new Box(
          { i: props.i, c: randomizeColor(), s: curSize, o: opacity, f: this.offset, z: props.l - i, p: this.container }
        )
      );
      opacity -= opacStep;
      curSize -= sizeStep;
    }
  }
  update = () => {
    const width = this.parent.offsetWidth;
    const height = this.parent.offsetHeight;
    if (this.box.length > 0) {
      for (let i = this.box.length - 1; i > 0; i--) {
        this.box[i].update(this.box[i - 1].pos, this.box[i - 1].color, this.head.stepCounter);
      }
      this.box[0].update(this.head.pos, this.head.color, this.head.stepCounter);
    }
    this.head.update(width, height);
  };
}

class Head {
  constructor(props) {

    this.pos = [...props.i];
    this.color = [...props.c];
    this.speed = [...props.v];
    this.size = props.s;
    this.offset = props.o;

    this.div = document.createElement("div");
    this.div.style.backgroundColor = `rgb(${this.color[0]}, ${this.color[1]}, ${this.color[2]})`;
    this.div.style.width = `${this.size}px`;
    this.div.style.height = `${this.size}px`;
    this.div.style.left = `${this.pos[0] - this.size / 2}px`;
    this.div.style.top = `${this.pos[1] - this.size / 2}px`;
    this.div.style.zIndex = props.z;
    props.p.appendChild(this.div);

    this.stuck = [false, false];
    this.stepCounter = 0;
  }
  update = (width, height) => {

    if (this.stepCounter > this.offset) {
      this.stepCounter %= this.offset;
    }

    this.pos[0] += this.speed[0];
    if (this.pos[0] - this.size / 2 < 0 && !this.stuck[0]) {
      this.pos[0] -= this.speed[0];
      this.speed[0] = this.speed[0] < 0 ? -this.speed[0] : this.speed[0];

      // Inconsistent but could try
      // this.speed[0] *= -1;
      this.color = [...randomizeColor()];
    } else if (this.pos[0] + this.size / 2 > width && !this.stuck[0]) {
      this.pos[0] -= this.speed[0];
      this.speed[0] = this.speed[0] > 0 ? -this.speed[0] : this.speed[0];

      // Inconsistent but could try
      // this.speed[0] *= -1;
      this.color = [...randomizeColor()];
    }

    this.pos[1] += this.speed[1];
    if (this.pos[1] - this.size / 2 < 0 && !this.stuck[1]) {
      this.pos[1] -= this.speed[1];
      this.speed[1] = this.speed[1] < 0 ? -this.speed[1] : this.speed[1];
      this.color = [...randomizeColor()];

      // Inconsistent but could try
      // this.speed[1] *= -1;
    } else if (this.pos[1] + this.size / 2 > height && !this.stuck[1]) {
      this.pos[1] -= this.speed[1];
      this.speed[1] = this.speed[1] > 0 ? -this.speed[1] : this.speed[1];
      this.color = [...randomizeColor()];

      // Inconsistent but could try
      // this.speed[1] *= -1;
    }

    this.stepCounter += pythagroean(this.speed[0], this.speed[1]);

    this.div.style.left = `${this.pos[0] - this.size / 2}px`;
    this.div.style.top = `${this.pos[1] - this.size / 2}px`;
    this.div.style.backgroundColor = `rgb(${this.color[0]}, ${this.color[1]}, ${this.color[2]})`;

    this.stuck[0] = xor(
      this.pos[0] - this.size / 2 < 0,
      this.pos[0] + this.size / 2 > width
    );
    this.stuck[1] = xor(
      this.pos[1] - this.size / 2 < 0,
      this.pos[1] + this.size / 2 > height
    );
  };
}

class Box {
  constructor(props) {

    this.pos = [...props.i];
    this.color = [...props.c];
    this.size = props.s;
    this.opac = props.o;
    this.offset = props.f;

    this.div = document.createElement("div");
    this.div.style.backgroundColor = `rgba(${this.color[0]}, ${this.color[1]}, ${this.color[2]}, ${this.opac})`;
    this.div.style.width = `${this.size}px`;
    this.div.style.height = `${this.size}px`;
    this.div.style.left = `${this.pos[0] - this.size / 2}px`;
    this.div.style.top = `${this.pos[1] - this.size / 2}px`;
    this.div.style.zIndex = props.z;
    props.p.appendChild(this.div);
  }
  update = (pos, color, step) => {
    const delta = [
      this.pos[0] - pos[0],
      this.pos[1] - pos[1]
    ];

    if (
      step > this.offset
    ) {
      this.pos = [...pos];
    }

    this.color = [...color];
    this.div.style.left = `${this.pos[0] - this.size / 2}px`;
    this.div.style.top = `${this.pos[1] - this.size / 2}px`;
    this.div.style.backgroundColor = `rgba(${this.color[0]}, ${this.color[1]}, ${this.color[2]}, ${this.opac})`;
  };
}

const WIDTH = 100;
const HEIGHT = 100;
const SIZE = 50;
const VEL = 10;
const LEN = 100;
const OFF = 20;
const S_OFF = 0.6;

const Main = new BouncerContainer({
  w: WIDTH,
  h: HEIGHT,
  b: [
    {
      l: LEN,
      v: VEL,
      s: SIZE,
      i: randomLocationOnScreen(WIDTH, HEIGHT, SIZE),
      o: OFF,
      t: S_OFF,
    },
  ],
  p: document.getElementById("bonka"),
});

window.onload = Main.init();