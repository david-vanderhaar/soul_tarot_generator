const dashed = ({
  startX,
  startY,
  endX,
  endY,
  lineCount,
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

  // for (let i = 0; i < 10; i++) {
  //   let t = i / lineCount;
  //   let x = curvePoint(startControlX, startX, endX, endControlX, t);
  //   let y = curvePoint(startControlY, startY, endY, endControlY, t);
  //   print(x, y)
  //   circle(x, y, 5);
  // }
}

// example
// dashed({
//   startX: centerX,
//   startY: centerY - 250,
//   endX: centerX,
//   endY: centerY,
//   lineCount: 1,
//   curveStrength: 100,
//   curveType: CURVE_TYPES.NONE,
// })