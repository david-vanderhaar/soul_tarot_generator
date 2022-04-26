const dashed = ({
  startX,
  startY,
  endX,
  endY,
  lineCount,
}) => {
  for (let index = 0; index < lineCount; index++) {
    const lerpPercentageStart = (1 / lineCount) * index;
    const lerpPercentageEnd = ((1 / lineCount) * (index + 1) - 0.1);
    const lerpStartX = lerp(startX, endX, lerpPercentageStart)
    const lerpStartY = lerp(startY, endY, lerpPercentageStart)
    const lerpEndX = lerp(startX, endX, lerpPercentageEnd)
    const lerpEndY = lerp(startY, endY, lerpPercentageEnd)
    line(
      lerpStartX, 
      lerpStartY, 
      lerpEndX, 
      lerpEndY,
    );
  }
}

// example
// dashed({
//   startX: centerX,
//   startY: centerY - 250,
//   endX: centerX,
//   endY: centerY,
//   lineCount: 5,
// })