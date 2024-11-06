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

function randomLocationOnScreen(w, h, s) {
  return [
    Math.floor(Math.random() * (w - s)),
    Math.floor(Math.random() * (h - s)),
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
    setInterval(this.update, 1000 / 10);
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
    this.offset = props.o
    this.container = document.createElement("div");
    this.container.style.position = "absolute";
    this.container.style.left = "0px";
    this.container.style.top = "0px";
    this.parent = props.p;
    this.parent.appendChild(this.container);

    this.head = new Head(
      { i: props.i, c: randomizeColor(), v: [this.SPEED, this.SPEED], s: this.BOX_SIZE, z: props.l, p: this.container },
    );

    this.box = [];
    const opacStep = 0.9 / (props.l);
    let opacity = 1 - opacStep;
    const sizeStep = this.BOX_SIZE / (props.l);
    let curSize = this.BOX_SIZE;
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
        this.box[i].update(this.box[i - 1].pos, this.box[i - 1].color);
      }
      this.box[0].update(this.head.pos, this.head.color);
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

    this.div = document.createElement("div");
    this.div.style.backgroundColor = `rgb(${this.color[0]}, ${this.color[1]}, ${this.color[2]})`;
    this.div.style.width = `${this.size}px`;
    this.div.style.height = `${this.size}px`;
    this.div.style.left = `${this.pos[0] - this.size / 2}px`;
    this.div.style.top = `${this.pos[1] - this.size / 2}px`;
    this.div.style.zIndex = props.z;
    props.p.appendChild(this.div);

    this.stuck = [false, false];
  }
  update = (width, height) => {
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
  update = (pos, color) => {
    const delta = [
      this.pos[0] - pos[0],
      this.pos[1] - pos[1]
    ];
    // if (
    //   Math.abs(delta[0]) > this.offset ||
    //   Math.abs(delta[1]) > this.offset
    // ) {
    //   this.pos = [...pos];
    //   // this.pos[0] += Math.sign(delta[0]) * this.offset;
    //   // this.pos[1] += Math.sign(delta[1]) * this.offset;
    //   // this.pos[0] = pos[0]
    //   // this.pos[0] += Math.sign(delta[0]) * this.offset;
    // }
    // if (
    //   Math.abs(delta[1]) > this.offset
    // ) {
    //   // this.pos[1] = pos[1]
    //   // this.pos[1] += Math.sign(delta[1]) * this.offset;
    // }
    this.pos = [...pos];
    // this.pos[0] += Math.sign(delta[0]) * this.offset;
    // this.pos[1] += Math.sign(delta[1]) * this.offset;
    this.color = [...color];
    this.div.style.left = `${this.pos[0] - this.size / 2}px`;
    this.div.style.top = `${this.pos[1] - this.size / 2}px`;
    this.div.style.backgroundColor = `rgba(${this.color[0]}, ${this.color[1]}, ${this.color[2]}, ${this.opac})`;
  };
}

const Main = new BouncerContainer({
  w: 800,
  h: 600,
  b: [
    {
      l: 5,
      v: 50,
      s: 50,
      i: randomLocationOnScreen(800, 600, 20),
      o: 10
    },
  ],
  p: document.getElementById("bonka"),
});

window.onload = Main.init();