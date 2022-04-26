const ripple = ({
  diameterStart,
  diameterEnd,
  centerX,
  centerY,
  layerCount,
  segmentCount,
  segmentGutter,
  rotationStep,
  rotationOffset,
  circumference,
}) => {
  const modifiedRotationOffset = rotationOffset + radians(90); // the p5 arc func start at 3 o' clock 
  const segmentLength = circumference / segmentCount;
  const diameterStep = (diameterEnd - diameterStart) / layerCount;
  for (let i = 0; i < layerCount; i++) {
    const newDiameter = diameterEnd - ((i) * diameterStep);
    const rotation = ((i * rotationStep) + modifiedRotationOffset);
    for (let j = 0; j < segmentCount; j++) {
      const segmentStart = ((j) * segmentLength) + rotation
      const segmentStop = ((j + 1) * segmentLength) - segmentGutter + rotation
      arc(centerX, centerY, newDiameter, newDiameter, segmentStart, segmentStop);
    }
  }
}

// Example
// ripple({
//   diameter: 90,
//   diameterStep: 50,
//   centerX: centerX,
//   centerY: centerY,
//   layerCount: 6,
//   segmentCount: 6,
//   segmentGutter: radians(15),
//   segmentGutterDrift: radians(0),
//   rotationDrift: radians(30)
// });
// ripple(diameter, diameterStep, centerX, centerY, 4, 3, QUARTER_PI, 0, 0)
// ripple(diameter, diameterStep, centerX, centerY, 4, 3, QUARTER_PI, 0, PI)
// ripple(diameter, diameterStep, centerX, centerY, 4, 3, QUARTER_PI, PI, 0)
// ripple(diameter, 20, centerX, centerY, 4, 3, 0, QUARTER_PI, PI)