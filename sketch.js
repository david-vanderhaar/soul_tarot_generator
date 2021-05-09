//plotter resources
/*
https://drawingbots.net/resources
https://awesomeopensource.com/project/beardicus/awesome-plotters#g-code
https://maxwellito.github.io/vivus/
https://maxwellito.github.io/vivus-instant/
*/

let CANVAS_RENDERER;
const WIDTH = Math.min(window.innerWidth - 10, 540);
const HEIGHT = WIDTH * 1.39;
const diameter = 50;
const diameterStep = 10;

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
let cardValue = 0;
let layerCount = 5;
let detailModifier = .2;

function setup() {
  // CANVAS_RENDERER = P2D;
  CANVAS_RENDERER = SVG;
  const canvas = createCanvas(WIDTH, HEIGHT, CANVAS_RENDERER);
  moveCanvasNodeToWrapper('cardCanvas', 'defaultCanvas0');
  stroke(theme.strokeColor);
  rectMode(CENTER)
  frameRate(30);
  strokeWeight(1)
  noLoop();
  background(230);
}

function draw() {
  customClear()
  const cardWidth = min(WIDTH - 10, 540);
  const cardHeight = cardWidth * 1.39;
  const cardPadding = 25;
  const centerX = (WIDTH / 2);
  const centerY = cardHeight / 2;
  card({
    x: centerX,
    y: centerY,
    w: cardWidth,
    h: cardHeight,
    bgColor: theme.cardColor,
    strokeColor: theme.strokeColor,
    padding: cardPadding,
  });
  // theFool({centerX, centerY, theme, scaleOption: 1});
  // oneOfSun({centerX, centerY, theme, scaleOption: 1});
  // threeOfSun({centerX, centerY, theme});
  // let seed = getInputValue('seed', parsePhraseAsInt);
  let seed = getInputValue('seed', (val) => val);
  noiseSeed(seed)

  // dashed({
  //   startX: centerX,
  //   startY: centerY - 250,
  //   endX: centerX,
  //   endY: centerY + 250,
  //   lineCount: 5,
  // })
  // circle(centerX, centerY - 250, 10)
  // circle(centerX, centerY + 250, 20)
  // curved({
  //   startX: centerX,
  //   startY: centerY - 250,
  //   endX: centerX,
  //   endY: centerY + 250,
  //   curveStrength: 100,
  //   curveType: CURVE_TYPES.E,
  // })

  const cardStats = createCard({ 
    value: cardValue,
    suit: SUIT.SUN, 
    description: '' 
  });
  const nodeParams = {
    layerCount,
    detailModifier: () => detailModifier,
    theme,
  };
  generateCardNodes({
    cardWidth: cardWidth - (cardPadding * 2),
    cardHeight,
    cardX: centerX,
    cardY: centerY,
    slotCount: cardStats.slotCount,
    slotPadding: 50,
    // slotPadding: 100,
    nodeParams,
    createNode: createSun,
  })
}

function moveCanvasNodeToWrapper (wrapperId, canvasId) {
  let canvasWrapper = document.getElementById(wrapperId);
  let canvas = document.getElementById(canvasId);
  canvasWrapper.appendChild(canvas);
}

function getInputValue(id, parse = parseFloat) {
  let el = document.getElementById(id)
  return parse(el.value);
}

const parsePhraseAsInt = (s) => {
  return s.split('').reduce((acc, curr) => acc + curr.toLowerCase().charCodeAt(0), 0);
}

function saveImage() {
  let current_seed = getInputValue('seed', (val) => val);
  let filename = current_seed.toString() + '__soul_gen';
  save(filename, 'svg'); // give file name
}

function regenerate() {
  // seed = getInputValue('seed', parsePhraseAsInt);
  seed = getInputValue('seed', (val) => val);
  cardValue = getInputValue('card_value');
  layerCount = getInputValue('layer_count');
  detailModifier = getInputValue('detail_modifier');
  console.table({
    seed,
    cardValue,
    layerCount,
    detailModifier,
  })
  redraw();
}

function seedKeyPressed() {
  let newSeed = seed;
  if (keyCode === RIGHT_ARROW) {
    newSeed += 1;
  } else if (keyCode === LEFT_ARROW) {
    newSeed -= 1;
  }
  if (newSeed !== seed) {
    seed = newSeed;
    let el = document.getElementById('seed')
    el.value = seed;
    redraw();
  }
}

function cardKeyPressed() {
  let newCardValue = cardValue;
  if (keyCode === UP_ARROW) {
    newCardValue += 1;
  } else if (keyCode === DOWN_ARROW) {
    newCardValue -= 1;
  }
  if (newCardValue !== cardValue) {
    cardValue = newCardValue;
    let el = document.getElementById('card_value')
    el.value = cardValue;
    redraw();
  }
}

function saveKeyPressed() {
  if (keyCode === ENTER) {
    saveImage();
  }
}

// function keyPressed() {
//   // seedKeyPressed();
//   // cardKeyPressed();
//   // saveKeyPressed();
// }

function isMobile() {
  return window.devicePixelRatio > 1;
}


function customClear() {
  clearP2D();
  clearSVG();
}

function clearP2D() {
  if (CANVAS_RENDERER === P2D) clear();
}

function clearSVG() {
  if (CANVAS_RENDERER === SVG) {
    // const el = querySVG('g')[0];
    // const node = el.elt;
    // console.log(el);
    // console.log(el.elt);
    // node.childNodes.forEach(element => {
    //   node.removeChild(element);
    // });
  }
}
