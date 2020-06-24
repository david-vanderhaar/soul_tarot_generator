//plotter resources
/*
https://drawingbots.net/resources
https://awesomeopensource.com/project/beardicus/awesome-plotters#g-code
https://maxwellito.github.io/vivus/
https://maxwellito.github.io/vivus-instant/
*/

const WIDTH = 898;
const HEIGHT = 764;

const diameter = 50;
const diameterStep = 10;
const centerX = (WIDTH / 2);
const centerY = (HEIGHT / 2);

let angle = 0;

const THEME = {
  soul: {
    fillColor: '#e4a77b',
    strokeColor: '#e4a77b',
    cardColor: 'rgb(24,24,24)',
  },
  rose: {
    fillColor: '#FFBC42',
    strokeColor: '#FFBC42',
    cardColor: '#8F2D56',
  },
  magma: {
    fillColor: '#EC6A5C',
    strokeColor: '#EC6A5C',
    cardColor: '#3E4348',
  },
  poison: {
    fillColor: '#a5d296',
    strokeColor: '#a5d296',
    cardColor: '#54546c',
  },
  smog: {
    fillColor: '#8283a7',
    strokeColor: '#8283a7',
    cardColor: '#404146',
  },
  terra: {
    fillColor: '#e77e4d',
    strokeColor: '#e77e4d',
    cardColor: '#6f2108',
  },
  wolf: {
    fillColor: '#e5e5e5',
    strokeColor: '#e5e5e5',
    cardColor: '#14213d',
  },
  bloom: {
    fillColor: '#e07a5f',
    strokeColor: '#e07a5f',
    cardColor: '#f4f1de',
  },
};

function inverseTheme(theme) {
  return {
    fillColor: theme.cardColor,
    strokeColor: theme.cardColor,
    cardColor: theme.strokeColor,
  };
}

let theme = THEME.soul;
// theme = inverseTheme(theme);
let seed = 0;
function setup() {
  createCanvas(WIDTH, HEIGHT, SVG);
  stroke(theme.strokeColor);
  rectMode(CENTER)
  frameRate(30);
  strokeWeight(1)
  noLoop();
  background(230);
  card({
    x: centerX,
    y: centerY,
    w: 540,
    h: 750,
    bgColor: theme.cardColor,
    strokeColor: theme.strokeColor
  });
  // theFool({centerX, centerY, theme, scaleOption: 1});
  // oneOfSun({centerX, centerY, theme, scaleOption: 1});
  noiseSeed(seed)
  createSun({
    x: centerX, 
    y: centerY - 250, 
    maxDiameter: 100,
    layerCount: 5,
    detailModifier: () => .2,
    theme,
  });
  createSun({
    x: centerX, 
    y: centerY, 
    maxDiameter: 300,
    layerCount: 10,
    detailModifier: () => .3,
    theme,
  });
  createSun({
    x: centerX,
    y: centerY + 250,
    maxDiameter: 100,
    layerCount: 5,
    detailModifier: () => .2,
    theme,
  });
  // const cards = Array(10).fill(null).map(() => createCard({value: Math.floor(random(15)), suit: SUIT.SUN, description: ''}));
  // print(cards);
}

function draw() {
  // background(0);
  // angle += 1;
  background(230);
  card({
    x: centerX,
    y: centerY,
    w: 540,
    h: 750,
    bgColor: theme.cardColor,
    strokeColor: theme.strokeColor
  });
  // theFool({centerX, centerY, theme, scaleOption: 1});
  // oneOfSun({centerX, centerY, theme, scaleOption: 1});
  noiseSeed(seed)
  createSun({
    x: centerX,
    y: centerY - 250,
    maxDiameter: 100,
    layerCount: 5,
    detailModifier: () => .2,
    theme,
  });
  createSun({
    x: centerX,
    y: centerY,
    maxDiameter: 300,
    layerCount: 10,
    detailModifier: () => .3,
    theme,
  });
  createSun({
    x: centerX,
    y: centerY + 250,
    maxDiameter: 100,
    layerCount: 5,
    detailModifier: () => .2,
    theme,
  });
}

// function mouseClicked() {
//   print("saved svg");
//   save("soul_gen.svg"); // give file name
// }

function saveImage() {
  print("saved svg");
  save("soul_gen.svg"); // give file name
}

function regenerate() {
  let el = document.getElementById('seed')
  seed = parseInt(el.value);
  redraw();
}