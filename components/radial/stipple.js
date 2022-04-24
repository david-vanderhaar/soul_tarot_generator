function stipple({
  diameterStart,
  diameterEnd,
  centerX,
  centerY,
  layerCount,
  stippleCount,
  stippleSize,
  rotationStep,
  rotationOffset,
  circumference = radians(360),
  filled = false,
  node = ({x, y, diameter, layer}) => disc({centerX: x, centerY: y, diameterEnd: diameter, filled}),
  // node = ({x, y, diameter, layer}) => circle(x, y, diameter),
}) {
  const angleStep = circumference / stippleCount;
  const diameterStep = (diameterEnd - diameterStart) / layerCount;
  for (let i = 0; i < layerCount; i++) {
    const newDiameter = diameterEnd - ((i) * diameterStep);
    const rotation = (i * rotationStep) + rotationOffset;
    for (let j = 0; j < stippleCount; j++) {
      const segmentStart = (j * angleStep) + rotation
      let startX = centerX - (newDiameter / 2) * sin(segmentStart);
      let startY = centerY + (newDiameter / 2) * cos(segmentStart);
      node({
        x: startX,
        y: startY,
        diameter: stippleSize,
        layer: i,
      });
    }
  }
}