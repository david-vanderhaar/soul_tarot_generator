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

const INPUT_TYPE = {
  SLIDER: 0,
  INTEGER: 1,
  TEXT: 2,
  TOGGLE: 3,
  SELECT: 4,
}


let URL_PARAMETERS = getParametersFromUrl()

function getParametersFromUrl() {
  if (!!!window.location.search) return {}
  const urlSearchParams = new URLSearchParams(window.location.search).entries()
  return Object.fromEntries(urlSearchParams)
}

const PARAMETER_OVERRIDES = {
  seed: {
    inputContainerId: 'primary-input-container',
    displayName: 'Seed',
    initialValue: URL_PARAMETERS.seed || 8,
    inputType: INPUT_TYPE.INTEGER,
    min: 'none',
    max: 'none',
    getValue: () => getInputValue('seed'),
    // getValue: () => getInputValue('seed', parsePhraseAsInt),
  },
  cardSuit: {
    inputContainerId: 'primary-input-container',
    displayName: 'Suit',
    initialValue: URL_PARAMETERS.cardSuit || SUIT.SUN,
    inputType: INPUT_TYPE.SELECT,
    values: Object.keys(SUIT),
    getValue: () => getSelectInputValue('cardSuit'),
  },
  cardValue: {
    inputContainerId: 'primary-input-container',
    displayName: 'Value',
    initialValue: URL_PARAMETERS.cardValue || 1,
    inputType: INPUT_TYPE.INTEGER,
    min: 1,
    max: 10,
    getValue: () => getInputValue('cardValue'),
  },
  layerCount: {
    inputContainerId: 'primary-input-container',
    displayName: 'Layer Count',
    initialValue: URL_PARAMETERS.layerCount || 7,
    inputType: INPUT_TYPE.INTEGER,
    getValue: () => getInputValue('layerCount'),
  },
  layerMultiplier: {
    inputContainerId: 'primary-input-container',
    displayName: 'Layer Multiplier',
    initialValue: URL_PARAMETERS.layerMultiplier || 1,
    inputType: INPUT_TYPE.INTEGER,
    min: 1,
    max: 20,
    getValue: () => getInputValue('layerMultiplier'),
  },
  detailModifier: {
    inputContainerId: 'advanced-input-container',
    displayName: 'detail modifier',
    initialValue: URL_PARAMETERS.detailModifier || .2,
    inputType: INPUT_TYPE.SLIDER,
    min: 0.1,
    max: 1,
    step: 0.1,
    getValue: () => getInputValue('detailModifier'),
  },
  noiseShift: {
    inputContainerId: 'advanced-input-container',
    displayName: 'noise shift',
    initialValue: URL_PARAMETERS.noiseShift || 0,
    inputType: INPUT_TYPE.SLIDER,
    min: 0,
    max: 100,
    step: 0.1,
    getValue: () => getInputValue('noiseShift'),
  },
  circumference: {
    inputContainerId: 'advanced-input-container',
    displayName: 'circumference',
    suits: [SUIT.SUN],
    initialValue: URL_PARAMETERS.circumference || 0,
    inputType: INPUT_TYPE.SLIDER,
    min: 0,
    max: 360,
    step: 1,
    getValue: () => getInputValue('circumference'),
  },
  lineCount: {
    inputContainerId: 'advanced-input-container',
    displayName: 'line count',
    suits: [SUIT.SUN],
    initialValue: URL_PARAMETERS.lineCount || 1,
    inputType: INPUT_TYPE.INTEGER,
    min: 1,
    max: 1000,
    step: 1,
    getValue: () => getInputValue('lineCount'),
  },
  lineGap: {
    inputContainerId: 'advanced-input-container',
    displayName: 'lineGap',
    suits: [SUIT.SUN],
    initialValue: URL_PARAMETERS.lineGap || 0,
    inputType: INPUT_TYPE.INTEGER,
    min: 0,
    max: 1000,
    step: 1,
    getValue: () => getInputValue('lineGap'),
  },
  segmentCount: {
    inputContainerId: 'advanced-input-container',
    displayName: 'segmentCount',
    suits: [SUIT.SUN],
    initialValue: URL_PARAMETERS.segmentCount || 20,
    inputType: INPUT_TYPE.INTEGER,
    min: 0,
    max: 1000,
    step: 1,
    getValue: () => getInputValue('segmentCount'),
  },
  segmentGutter: {
    inputContainerId: 'advanced-input-container',
    displayName: 'segmentGutter',
    suits: [SUIT.SUN],
    initialValue: URL_PARAMETERS.segmentGutter || 4,
    inputType: INPUT_TYPE.INTEGER,
    min: 0,
    max: 360,
    step: 1,
    getValue: () => getInputValue('segmentGutter'),
  },
  burstCount: {
    inputContainerId: 'advanced-input-container',
    displayName: 'burstCount',
    suits: [SUIT.SUN],
    initialValue: URL_PARAMETERS.burstCount || 5,
    inputType: INPUT_TYPE.INTEGER,
    min: 0,
    max: 1000,
    step: 1,
    getValue: () => getInputValue('burstCount'),
  },
  stippleCount: {
    inputContainerId: 'advanced-input-container',
    displayName: 'stippleCount',
    suits: [SUIT.SUN],
    initialValue: URL_PARAMETERS.stippleCount || 10,
    inputType: INPUT_TYPE.INTEGER,
    min: 0,
    max: 1000,
    step: 1,
    getValue: () => getInputValue('stippleCount'),
  },
  stippleSize: {
    inputContainerId: 'advanced-input-container',
    displayName: 'stippleSize',
    suits: [SUIT.SUN],
    initialValue: URL_PARAMETERS.stippleSize || 10,
    inputType: INPUT_TYPE.INTEGER,
    min: 0,
    max: 200,
    step: 1,
    getValue: () => getInputValue('stippleSize'),
  },
  rotationStep: {
    inputContainerId: 'advanced-input-container',
    displayName: 'rotationStep',
    suits: [SUIT.SUN],
    initialValue: URL_PARAMETERS.rotationStep || 0,
    inputType: INPUT_TYPE.INTEGER,
    min: 0,
    max: 360,
    step: 1,
    getValue: () => getInputValue('rotationStep'),
  },
  rotationOffset: {
    inputContainerId: 'advanced-input-container',
    displayName: 'rotationOffset',
    suits: [SUIT.SUN],
    initialValue: URL_PARAMETERS.rotationOffset || 0,
    inputType: INPUT_TYPE.INTEGER,
    min: 0,
    max: 360,
    step: 1,
    getValue: () => getInputValue('rotationOffset'),
  },
  stippleFilled: {
    inputContainerId: 'advanced-input-container',
    displayName: 'stipple filled',
    suits: [SUIT.SUN],
    initialValue: URL_PARAMETERS.stippleFilled === 'true' || false,
    inputType: INPUT_TYPE.TOGGLE,
    getValue: () => getToggleInputValue('stippleFilled'),
  },
}

function getOverrideKeyValuesObject() {
  return Object.entries(PARAMETER_OVERRIDES).reduce((prev, [key, details]) => ({...prev, [key]: details.getValue()}), {})
}

function createSelectInputElement(inputName, inputDetails) {
  return htmlToElement(
    `<div class="select-input-field">
      <select class="select-input-field__text" id="${inputName}" onchange="regenerate()">
        ${inputDetails.values.map((name) => `<option value="${name}" ${inputDetails.initialValue === name ? 'selected' : ''}>${SUIT[name]}</option>`)}
      </select>
      <span class="select-input-field__highlight"></span>
      <span class="select-input-field__bar"></span>
      <label class="select-input-field__label" for="${inputName}">${inputDetails.displayName}</label>
    </div>`
  )
}

function createToggleInputElement(inputName, inputDetails) {
  return htmlToElement(
    `<label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="${inputName}">
      <input type="checkbox" id="${inputName}" onchange="regenerate()" class="mdl-checkbox__input" ${inputDetails.initialValue && 'checked'}>
      <span class="mdl-checkbox__label">${inputDetails.displayName}</span>
    </label>`
  )
}

function createTextInputElement(inputName, inputDetails) {
  return htmlToElement(
    `<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
      <input class="mdl-textfield__input" onchange="regenerate()" id="${inputName}" type="text" value="${inputDetails.initialValue}">
      <label class="mdl-textfield__label" for="${inputName}">${inputDetails.displayName}</label>
      <span class="mdl-textfield__error">Input is not a number!</span>
    </div>`
  )
}

function createIntegerInputElement(inputName, inputDetails) {
  return htmlToElement(
    `<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
      <input class="mdl-textfield__input" onchange="regenerate()" id="${inputName}" type="number" min="${inputDetails.min}" max="${inputDetails.max}" value="${inputDetails.initialValue}">
      <label class="mdl-textfield__label" for="${inputName}">${inputDetails.displayName}</label>
      <span class="mdl-textfield__error">Input is not a number!</span>
    </div>`
  )
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
    case INPUT_TYPE.INTEGER:
      return createIntegerInputElement(inputName, inputDetails);
    case INPUT_TYPE.TEXT:
      return createTextInputElement(inputName, inputDetails);
    case INPUT_TYPE.TOGGLE:
      return createToggleInputElement(inputName, inputDetails);
    case INPUT_TYPE.SELECT:
      return createSelectInputElement(inputName, inputDetails);
    default:
      return createSliderInputElement(inputName, inputDetails);
  }
}

function createParameterOverrideInput(inputName, inputDetails) {
  const container = document.getElementById(inputDetails.inputContainerId);
  const element = createElementBasedOnType(inputName, inputDetails)
  container.appendChild(element);
}

function addControlInputs() {
  Object.entries(PARAMETER_OVERRIDES).forEach(([key, details]) => createParameterOverrideInput(key, details))
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
  addControlInputs();
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
  const {seed, cardValue, cardSuit, ...overrideParameters} = getOverrideKeyValuesObject();
  noiseSeed(seed)

  const cardStats = createCard({ 
    value: cardValue,
    suit: cardSuit, 
    description: '' 
  });

  const nodeParams = {
    theme,
    centerX,
    centerY,
    scaleOption: 1,
    ...overrideParameters,
  };
  generateCardNodes({
    cardWidth: cardWidth - (cardPadding * 2),
    cardHeight,
    cardX: centerX,
    cardY: centerY,
    slotCount: cardStats.slotCount,
    slotPadding: 100,
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

function getToggleInputValue(id) {
  let el = document.getElementById(id)
  return el.checked;
}

function getSelectInputValue(id) {
  return getInputValue(id, (value) => value)
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
  // seed = getInputValue('seed');
  // cardValue = getInputValue('card_value');
  // layerCount = getInputValue('layer_count');
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
