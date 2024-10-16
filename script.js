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

function xor(x, y) {
  return !(x && y) && (x || y);
}

class Bouncer {
  constructor(length, speed, size, initPos) {
    this.SPEED = speed;
    this.BOX_SIZE = size;
    this.container = document.createElement("div");
    this.container.style.position = "absolute";
    this.container.style.left = "0px";
    this.container.style.top = "0px";
    document.body.appendChild(this.container);

    this.head = new Head(
      initPos,
      randomizeColor(),
      [this.SPEED, this.SPEED],
      this.BOX_SIZE,
      length,
      this.container
    );
    this.box = [];
    const opacStep = 0.9 / (length - 1);
    let opacity = 1 - opacStep;
    const sizeStep = this.BOX_SIZE / (length - 1);
    let curSize = this.BOX_SIZE;
    for (let i = 0; i < length - 1; i++) {
      this.box.push(
        new Box(
          initPos,
          randomizeColor(),
          [this.SPEED, this.SPEED],
          curSize,
          opacity,
          length - 1 - i,
          this.container
        )
      );
      opacity -= opacStep;
      curSize -= sizeStep;
    }
  }
  update = () => {
    const width = document.body.offsetWidth;
    const height = document.body.offsetHeight;
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
  constructor(pos, color, speed, BOX_SIZE, index, parent) {
    this.pos = [...pos];
    this.color = [...color];
    this.speed = [...speed];
    this.size = BOX_SIZE;

    this.div = document.createElement("div");
    this.div.style.backgroundColor = `rgb(${this.color[0]}, ${this.color[1]}, ${this.color[2]})`;
    this.div.style.width = `${this.size}px`;
    this.div.style.height = `${this.size}px`;
    this.div.style.left = `${this.pos[0] - this.size / 2}px`;
    this.div.style.top = `${this.pos[1] - this.size / 2}px`;
    this.div.style.zIndex = index;
    parent.appendChild(this.div);

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
    // this.div.style.left = `${this.pos[0]}px`;
    // this.div.style.top = `${this.pos[1]}px`;
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
  constructor(pos, color, speed, BOX_SIZE, opac, index, parent) {
    this.pos = [...pos];
    this.color = [...color];
    this.speed = [...speed];
    this.size = BOX_SIZE;
    this.opac = opac;

    this.div = document.createElement("div");
    this.div.style.backgroundColor = `rgba(${this.color[0]}, ${this.color[1]}, ${this.color[2]}, ${this.opac})`;
    this.div.style.width = `${this.size}px`;
    this.div.style.height = `${this.size}px`;
    this.div.style.left = `${this.pos[0] - this.size / 2}px`;
    this.div.style.top = `${this.pos[1] - this.size / 2}px`;
    this.div.style.zIndex = index;
    parent.appendChild(this.div);
  }
  update = (pos, color) => {
    this.pos = [...pos];
    this.color = [...color];
    this.div.style.left = `${this.pos[0] - this.size / 2}px`;
    this.div.style.top = `${this.pos[1] - this.size / 2}px`;
    this.div.style.backgroundColor = `rgba(${this.color[0]}, ${this.color[1]}, ${this.color[2]}, ${this.opac})`;
  };
}

const Bouncers = [];

function addBouncers(settings) {
  for (let b = 0; b < settings.length; b++) {
    const temp = settings[b];
    Bouncers.push(new Bouncer(...temp));
  }
}
function updateBouncers() {
  Bouncers.forEach((element) => {
    element.update();
  });
}
function init(settings) {
  addBouncers(settings);
  setInterval(updateBouncers, 1000 / 60);
}
function randomLocationOnScreen(size) {
  return [
    Math.floor(Math.random() * (document.body.offsetWidth - size)),
    Math.floor(Math.random() * (document.body.offsetHeight - size)),
  ];
}
window.onload = init([
  // [2, 10, 500, randomLocationOnScreen(500)],
  [2, 10, 100, randomLocationOnScreen(50)],
  [2, 10, 100, randomLocationOnScreen(50)],
  [2, 10, 100, randomLocationOnScreen(50)],
  [2, 10, 100, randomLocationOnScreen(50)],
]);
