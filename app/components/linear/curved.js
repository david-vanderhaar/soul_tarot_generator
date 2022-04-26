const curved = ({
  startX,
  startY,
  endX,
  endY,
  curveStrength = 0,
  curveType = CURVE_TYPES.NONE,
}) => {
  startControlX = startX + (curveType.x * curveStrength);
  startControlY = startY + (curveType.y * curveStrength);
  endControlX = endX + (curveType.x * curveStrength);
  endControlY = endY + (curveType.y * curveStrength);
  curve(
    startControlX, 
    startControlY,
    startX, 
    startY, 
    endX, 
    endY,
    endControlX, 
    endControlY,
  );
}

// example
// curved({
//   startX: centerX,
//   startY: centerY - 250,
//   endX: centerX,
//   endY: centerY,
//   lineCount: 1,
//   curveStrength: 100,
//   curveType: CURVE_TYPES.NONE,
// })