const beam = ({
  diameterStart,
  diameterEnd,
  centerX,
  centerY,
  layerCount,
  lineCount,
  lineGap,
  rotationStep,
  rotationOffset,
  circumference = radians(360),
}) => {
  const angleStep = circumference / lineCount;
  const diameterStep = (diameterEnd - diameterStart) / layerCount;
  for (let i = 0; i < layerCount; i++) {
    // const newDiameter = diameter + (i * diameterStep);
    // const nextDiameter = diameter + ((i + 1) * diameterStep - lineGap);
    const newDiameter = diameterStart + ((i) * diameterStep);
    const nextDiameter = diameterStart + ((i + 1) * diameterStep - lineGap);
    const rotation = (i * rotationStep) + rotationOffset;
    for (let j = 0; j < lineCount; j++) {
      const segmentStart = (j * angleStep) + rotation
      let startX = centerX + (newDiameter / 2) * sin(segmentStart);
      let startY = centerY + (newDiameter / 2) * cos(segmentStart);
      let endX = centerX + (nextDiameter / 2) * sin(segmentStart);
      let endY = centerY + (nextDiameter / 2) * cos(segmentStart);
      line(startX, startY, endX, endY);
    }
  }
}

// EXAMPLES
// beam({
//   diameter: 100,
//   diameterStep: 10,
//   centerX: centerX,
//   centerY: centerY,
//   layerCount: 1,
//   lineCount: 40,
//   lineGap: 0,
//   rotationDrift: radians(0),
//   rotationOffset: radians(0)
// })
// beam(diameter, 20, centerX, centerY, 1, 30, 8, radians(0))
// beam(diameter, 20, centerX, centerY, 3, 30, 8, radians(0))
// beam(diameter, 20, centerX, centerY, 3, 15, 8, radians(30))
// beam(diameter, 20, centerX, centerY, 3, 15, -20, radians(15))
// beam(diameter, 20, centerX, centerY, 3, 15, radians(15))