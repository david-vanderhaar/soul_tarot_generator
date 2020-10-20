const createCard = ({
  value,
  suit,
  description,
}) => {
  let slotCount;
  if (value === 0) {
    slotCount = 1;
    decorationCount = 1;
  } else if (value > 10) {
    slotCount = 1;
    decorationCount = 14 - value;
  } else {
    slotCount = value;
    decorationCount = 0;
  }
  return {
    value,
    suit,
    description,
    baseSymbol: () => null,
    slotCount,
    decorationCount,
  }
};

const LAYOUTS = {
  0: [
    {x: 0, y: 0, sizeModifier: 1},
  ],
  1: [
    {x: 0, y: 0, sizeModifier: 1},
  ],
  2: [
    {x: 0, y: -1, sizeModifier: 0.5},
    {x: 0, y: 1, sizeModifier: 0.5},
  ],
  3: [
    {x: 0, y: -1, sizeModifier: 0.33},
    {x: 0, y: 0, sizeModifier: 0.33},
    {x: 0, y: 1, sizeModifier: 0.33},
  ],
  4: [
    {x: -1, y: -1, sizeModifier: 0.35},
    {x: 1, y: -1, sizeModifier: 0.35},
    {x: -1, y: 1, sizeModifier: 0.35},
    {x: 1, y: 1, sizeModifier: 0.35},
  ],
  5: [
    {x: -1, y: -1, sizeModifier: 0.35},
    {x: 1, y: -1, sizeModifier: 0.35},
    {x: 0, y: 0, sizeModifier: 0.35},
    {x: -1, y: 1, sizeModifier: 0.35},
    {x: 1, y: 1, sizeModifier: 0.35},
  ],
  6: [
    {x: -1, y: -1, sizeModifier: 0.35},
    {x: -1, y: 0, sizeModifier: 0.35},
    {x: -1, y: 1, sizeModifier: 0.35},
    {x: 1, y: -1, sizeModifier: 0.35},
    {x: 1, y: 0, sizeModifier: 0.35},
    {x: 1, y: 1, sizeModifier: 0.35},
  ],
  7: [
    {x: -1, y: -1, sizeModifier: 0.25},
    {x: -1, y: 0, sizeModifier: 0.25},
    {x: -1, y: 1, sizeModifier: 0.25},
    {x: 1, y: -1, sizeModifier: 0.25},
    {x: 1, y: 0, sizeModifier: 0.25},
    {x: 1, y: 1, sizeModifier: 0.25},
    {x: 0, y: -2, sizeModifier: 0.25},
  ],
  8: [
    {x: -1, y: -1, sizeModifier: 0.25},
    {x: -1, y: 0, sizeModifier: 0.25},
    {x: -1, y: 1, sizeModifier: 0.25},
    {x: 1, y: -1, sizeModifier: 0.25},
    {x: 1, y: 0, sizeModifier: 0.25},
    {x: 1, y: 1, sizeModifier: 0.25},
    {x: 0, y: -2, sizeModifier: 0.25},
    {x: 0, y: 2, sizeModifier: 0.25},
  ],
  9: [
    {x: -1, y: -1, sizeModifier: 0.20},
    {x: -2, y: 0, sizeModifier: 0.20},
    {x: -1, y: 1, sizeModifier: 0.20},
    {x: 1, y: -1, sizeModifier: 0.20},
    {x: 2, y: 0, sizeModifier: 0.20},
    {x: 1, y: 1, sizeModifier: 0.20},
    {x: 0, y: -2, sizeModifier: 0.20},
    {x: 0, y: 0, sizeModifier: 0.20},
    {x: 0, y: 2, sizeModifier: 0.20},
  ],
  10: [
    {x: -2, y: -1, sizeModifier: 0.20},
    {x: -2, y: 0, sizeModifier: 0.20},
    {x: -2, y: 1, sizeModifier: 0.20},
    {x: 2, y: -1, sizeModifier: 0.20},
    {x: 2, y: 0, sizeModifier: 0.20},
    {x: 2, y: 1, sizeModifier: 0.20},
    {x: 0, y: -2, sizeModifier: 0.20},
    {x: 0, y: -0.75, sizeModifier: 0.20},
    {x: 0, y: 0.75, sizeModifier: 0.20},
    {x: 0, y: 2, sizeModifier: 0.20},
  ],
};

const generateCardNodes = ({
  cardWidth,
  cardHeight,
  cardX,
  cardY,
  slotCount,
  slotPadding,
  nodeParams,
  createNode = () => null,
}) => {
  const nodePositions = LAYOUTS[slotCount];
  nodePositions.forEach((pos, i) => {
    const nodeWidth = (cardWidth - (slotPadding)) * pos.sizeModifier;
    const nodeHeight = (cardHeight - (slotPadding)) * pos.sizeModifier;

    const x = cardX + (pos.x * (nodeWidth / 2)) + (pos.x * slotPadding / 2);
    const y = cardY + (pos.y * (nodeHeight / 2)) + (pos.y * slotPadding / 2);
    createNode({
      ...nodeParams,
      x,
      y,
      maxDiameter: nodeWidth,
    })
  });
}