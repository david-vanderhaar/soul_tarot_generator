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

var theme = THEME.soul;
let cardValue = 0;
let layerCount = 5;
let detailModifier = .2;
let noiseShift = 0;
let circumference = 0;

const INPUT_TYPE = {
  SLIDER: 0,
  INTEGER: 1,
  TEXT: 2,
}

const PARAMETER_OVERRIDES = {
  detailModifier: {
    displayName: 'detail modifier',
    initialValue: .2,
    inputType: INPUT_TYPE.SLIDER,
    min: 0.1,
    max: 1,
    step: 0.1,
    getValue: () => getInputValue('detailModifier'),
  },
  noiseShift: {
    displayName: 'noise shift',
    initialValue: 0,
    inputType: INPUT_TYPE.SLIDER,
    min: 0,
    max: 100,
    step: 0.1,
    getValue: () => getInputValue('noiseShift'),
  },
  circumference: {
    displayName: 'circumference',
    initialValue: 0,
    inputType: INPUT_TYPE.SLIDER,
    min: 0,
    max: 360,
    step: 1,
    getValue: () => getInputValue('circumference'),
  },
}

function getOverrideKeyValuesObject() {
  return Object.entries(PARAMETER_OVERRIDES).reduce((prev, [key, details]) => ({...prev, [key]: details.getValue()}), {})
}

function createSliderInputElement(inputName, inputDetails) {
  return htmlToElement(
    `<div class="control-slider">
      <div>${inputDetails.displayName}</div>
      <input class="mdl-slider mdl-js-slider" onchange="regenerate()" id="${inputName}" type="range" value="${inputDetails.initialValue}" min="${inputDetails.min}" max="${inputDetails.max}" step="${inputDetails.step}">
    </div>`
  )
}

function createElementBasedOnType(inputName, inputDetails) {
  switch (inputDetails.inputType) {
    case INPUT_TYPE.SLIDER:
      return createSliderInputElement(inputName, inputDetails);
    default:
      return createSliderInputElement(inputName, inputDetails);
  }
}

function createParameterOverrideInput(inputName, inputDetails) {
  const container = document.getElementById('advanced-input-container');
  const element = createElementBasedOnType(inputName, inputDetails)
  container.appendChild(element);
}

function themer(key) { 
  theme = THEME[key]
  redraw();
}

function inverseTheme(theme) {
  return {
    fillColor: theme.cardColor,
    strokeColor: theme.cardColor,
    cardColor: theme.strokeColor,
  };
}

function inverseCurrentTheme() {
  theme = inverseTheme(theme);
  redraw();
}

function addPresetButtons () {
  const container = document.getElementById('presets-container');
  for (key in THEME) {
    const value = THEME[key];
    let preset_element = htmlToElement(
      `<div class="preset" onclick="themer('${key}')">
        <button
          id="theme-${key}"
          class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect"
          style="background-color: ${value.cardColor}; color: ${value.strokeColor}; border: ${value.strokeColor} 2px solid;"
        >
          <i class="material-icons">auto_awesome</i>
        </button>
        <div class="mdl-tooltip mdl-tooltip--large" for="theme-${key}">
          ${key}
        </div>
      </div>`
    )
    container.appendChild(preset_element);
  }
}

function htmlToElement(html) {
  let template = document.createElement('template');
  html = html.trim(); // Never return a text node of whitespace as the result
  template.innerHTML = html;
  return template.content.firstChild;
}

function setup() {
  addPresetButtons();
  Object.entries(PARAMETER_OVERRIDES).forEach(([key, details]) => createParameterOverrideInput(key, details))
  CANVAS_RENDERER = P2D;
  // CANVAS_RENDERER = SVG;
  const canvas = createCanvas(WIDTH, HEIGHT, CANVAS_RENDERER);
  moveCanvasNodeToWrapper('cardCanvas', 'defaultCanvas0');
  rectMode(CENTER)
  frameRate(30);
  strokeWeight(1)
  noLoop();
  background(230);
}

function draw() {
  stroke(theme.strokeColor);
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
  let seed = getInputValue('seed');
  cardValue = getInputValue('card_value');
  layerCount = getInputValue('layer_count');
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
    theme,
    centerX,
    centerY,
    scaleOption: 1,
    ...getOverrideKeyValuesObject(),
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
  let current_seed = getInputValue('seed');
  let filename = current_seed.toString() + '__soul_gen';
  save(filename, 'svg'); // give file name
}

function regenerate() {
  // seed = getInputValue('seed', parsePhraseAsInt);
  seed = getInputValue('seed');
  cardValue = getInputValue('card_value');
  layerCount = getInputValue('layer_count');
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
