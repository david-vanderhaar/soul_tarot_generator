const burst = ({
  diameterStart,
  diameterEnd,
  centerX,
  centerY,
  layerCount,
  burstCount,
  lineCount,
  lineGap,
  rotationStep,
  rotationOffset,
  circumference = radians(360),
}) => {
  const angleStep = circumference / (burstCount * lineCount);
  const diameterStep = (diameterEnd - diameterStart) / layerCount;
  for (let i = 0; i < layerCount; i++) {
    const newDiameter = diameterStart + ((i) * diameterStep);
    const nextDiameter = diameterStart + ((i + 1) * diameterStep - lineGap);
    const rotation = (i * rotationStep) + rotationOffset;
    for (let j = 0; j < burstCount * lineCount; j++) {
      let lerpT = (j % lineCount) / (lineCount);
      if (j % lineCount > (lineCount / 2)) lerpT = 1 - lerpT;
      const finalDiameter = lerp(nextDiameter, newDiameter, lerpT);
      const segmentStart = (j * angleStep) + rotation
      let startX = centerX + (newDiameter / 2) * sin(segmentStart);
      let startY = centerY + (newDiameter / 2) * cos(segmentStart);
      let endX = centerX + (finalDiameter / 2) * sin(segmentStart);
      let endY = centerY + (finalDiameter / 2) * cos(segmentStart);
      line(startX, startY, endX, endY);
    }
  }
}