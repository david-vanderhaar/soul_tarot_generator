const createSun = ({
  x,
  y,
  maxDiameter,
  layerCount = 1,
  layerMultiplier = 1,
  detailModifier = 0,
  theme,
  noiseShift = 0,
  circumference,
  lineCount,
  lineGap,
  segmentCount,
  segmentGutter,
  burstCount,
  stippleCount,
  stippleSize,
  stippleFilled,
  rotationStep,
  rotationOffset,
}) => {
  for (let i = 0; i < layerCount; i++) {
    const noiseValue = noise(noiseShift);

    let layerDiameter = (maxDiameter / layerCount);
    const layerTypes = [
      beam,
      ripple,
      stipple,
      burst,
      burstCurve,
      disc,
    ];
    const index = floor((noise((i * i) + noiseShift) * (layerTypes.length)) % (layerTypes.length))
    let flipped = false;
    if (index === 1) flipped = round(noiseValue);
    if (i === layerCount - 1 || i === 0) flipped = round(noiseValue);
    const layerType = layerTypes[index];

    const params = {
      diameterStart: i * layerDiameter,
      diameterEnd: ((i + 1) * layerDiameter),
      centerX: x,
      centerY: y,
      layerCount: layerMultiplier,
      lineCount,
      lineGap,
      segmentCount,
      segmentGutter: radians(segmentGutter),
      burstCount,
      stippleCount,
      stippleSize,
      rotationStep: radians(rotationStep),
      rotationOffset: radians(rotationOffset),
      // rotationOffset: flipped ? radians(rotationOffset - 180) : radians(rotationOffset),
      circumference: radians(circumference) || radians(360),
      filled: stippleFilled,
      // filled: round(noiseValue),
      theme,
    };

    layerType(params);
  }
}