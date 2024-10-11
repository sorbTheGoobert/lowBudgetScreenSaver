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

class Bouncer {
  constructor(length, speed, size, initPos) {
    this.SPEED = speed;
    this.BOX_SIZE = size;

    this.head = new Head(
      initPos,
      randomizeColor(),
      [this.SPEED, this.SPEED],
      this.BOX_SIZE
    );
    this.box = [];
    const stepSize = 0.9 / (length - 1);
    let opacity = 1 - stepSize;
    for (let i = 0; i < length - 1; i++) {
      this.box.push(
        new Box(
          initPos,
          randomizeColor(),
          [this.SPEED, this.SPEED],
          this.BOX_SIZE,
          opacity
        )
      );
      opacity -= stepSize;
    }
  }
  update = () => {
    const width = document.body.offsetWidth;
    const height = document.body.offsetHeight;
    for (let i = this.box.length - 1; i > 0; i--) {
      this.box[i].update(this.box[i - 1].pos, this.box[i - 1].color);
    }
    this.box[0].update(this.head.pos, this.head.color);
    this.head.update(width, height);
  };
}

class Head {
  constructor(pos, color, speed, BOX_SIZE) {
    this.pos = [...pos];
    this.color = [...color];
    this.speed = [...speed];
    this.size = BOX_SIZE;

    this.div = document.createElement("div");
    this.div.style.backgroundColor = `rgb(${this.color[0]}, ${this.color[1]}, ${this.color[2]})`;
    this.div.style.width = `${this.size}px`;
    this.div.style.height = `${this.size}px`;
    this.div.style.left = `${this.pos[0]}px`;
    this.div.style.top = `${this.pos[1]}px`;
    document.body.appendChild(this.div);
  }
  update = (width, height) => {
    this.pos[0] += this.speed[0];
    if (this.pos[0] < 0) {
      this.pos[0] -= this.speed[0];
      this.speed[0] *= -1;
      this.color = [...randomizeColor()];
    }
    if (this.pos[0] + this.size > width) {
      this.pos[0] -= this.speed[0];
      this.speed[0] *= -1;
      this.color = [...randomizeColor()];
    }

    this.pos[1] += this.speed[1];
    if (this.pos[1] < 0) {
      this.pos[1] -= this.speed[1];
      this.speed[1] *= -1;
      this.color = [...randomizeColor()];
    }
    if (this.pos[1] + this.size > height) {
      this.pos[1] -= this.speed[1];
      this.speed[1] *= -1;
      this.color = [...randomizeColor()];
    }

    this.div.style.left = `${this.pos[0]}px`;
    this.div.style.top = `${this.pos[1]}px`;
    this.div.style.backgroundColor = `rgb(${this.color[0]}, ${this.color[1]}, ${this.color[2]})`;
  };
}

class Box {
  constructor(pos, color, speed, BOX_SIZE, opac) {
    this.pos = [...pos];
    this.color = [...color];
    this.speed = [...speed];
    this.size = BOX_SIZE;
    this.opac = opac;

    this.div = document.createElement("div");
    this.div.style.backgroundColor = `rgba(${this.color[0]}, ${this.color[1]}, ${this.color[2]}, ${this.opac})`;
    this.div.style.width = `${this.size}px`;
    this.div.style.height = `${this.size}px`;
    this.div.style.left = `${this.pos[0]}px`;
    this.div.style.top = `${this.pos[1]}px`;
    document.body.appendChild(this.div);
  }
  update = (pos, color) => {
    this.pos = [...pos];
    this.color = [...color];
    this.div.style.left = `${this.pos[0]}px`;
    this.div.style.top = `${this.pos[1]}px`;
    this.div.style.backgroundColor = `rgba(${this.color[0]}, ${this.color[1]}, ${this.color[2]}, ${this.opac})`;
  };
}

const Bouncers = [];

function addBouncers(settings) {
  for (let b = 0; b < settings.length; b++) {
    const temp = settings[b];
    console.log(temp);
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
  [10, 5, 50, randomLocationOnScreen(50)],
  [10, 5, 50, randomLocationOnScreen(50)],
  [10, 5, 50, randomLocationOnScreen(50)],
  [10, 5, 50, randomLocationOnScreen(50)],
  [10, 5, 50, randomLocationOnScreen(50)],
  [10, 5, 50, randomLocationOnScreen(50)],
  [10, 5, 50, randomLocationOnScreen(50)],
  [10, 5, 50, randomLocationOnScreen(50)],
  [10, 5, 50, randomLocationOnScreen(50)],
  [10, 5, 50, randomLocationOnScreen(50)],
  [10, 5, 50, randomLocationOnScreen(50)],
  [10, 5, 50, randomLocationOnScreen(50)],
  [10, 5, 50, randomLocationOnScreen(50)],
  [10, 5, 50, randomLocationOnScreen(50)],
  [10, 5, 50, randomLocationOnScreen(50)],
]);
