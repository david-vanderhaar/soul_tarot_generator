const createSun = ({
  x,
  y,
  maxDiameter,
  layerCount,
  detailModifier = () => 0,
  theme,
}) => {
  for (let i = 0; i < layerCount; i++) {
    let layerDiameter = (maxDiameter / layerCount);
    const layerTypes = [
      beam,
      ripple,
      stipple,
      burst,
      burstCurve,
      disc,
    ];
    const index = floor((noise(i * i) * (layerTypes.length)) % (layerTypes.length))
    let flipped = false;
    // if (index === 1) flipped = round(noise(0));
    // if (i === layerCount - 1 || i === 0) flipped = round(noise(0));
    const layerType = layerTypes[index];
    const params = {
      diameterStart: i * layerDiameter,
      diameterEnd: ((i + 1) * layerDiameter),
      centerX: x,
      centerY: y,
      layerCount: ceil(noise(0) * (20 * detailModifier())),
      lineCount: ceil(noise(0) * (50 * detailModifier())),
      lineGap: 0,
      segmentCount: ceil(noise(0) * (20 * detailModifier())),
      segmentGutter: radians(noise(0) * 35 - (10 * detailModifier())),
      burstCount: round(10 * detailModifier()),
      stippleCount: round(50 * detailModifier()),
      stippleSize: round(10 * detailModifier()),
      rotationStep: radians(noise(0) * 15),
      rotationOffset: flipped ? radians(180) : radians(0),
      circumference: radians(noise(0) * 360),
      filled: round(noise(0)),
      theme,
    }
    layerType(params);
  }
}