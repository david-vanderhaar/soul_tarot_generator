const createStar = ({
  x,
  y,
  maxDiameter,
  layerCount = 1,
  layerMultiplier = 1,
  detailModifier = 0,
  theme,
  noiseShift = 0,
  rotationStep,
  rotationOffset,
}) => {
  let layerDiameter = (maxDiameter / layerCount);
  for (let i = 0; i < layerCount; i++) {
    const noiseValue = noise(noiseShift);
    // const diameterStart = i * layerDiameter || 10;
    const diameterStart = 10;
    const diameterEnd = ((i + 1) * layerDiameter);
    // const minDiameter = 100;
    // const points = random(1, 20);
    const points = 6;
    const angleStep = radians(360 / points);
    
    // primary guidlines
    const primary_points = []
    const secondary_points = []
    const layerRotation = (i * rotationStep) + rotationOffset;
    for (let j = 0; j < points; j++) {
      const segmentStart = (j * angleStep) + layerRotation
      let startX = x - (diameterStart / 2) * sin(segmentStart);
      let startY = y + (diameterStart / 2) * cos(segmentStart);
      let endX = x - (diameterEnd / 2) * sin(segmentStart);
      let endY = y + (diameterEnd / 2) * cos(segmentStart);
      primary_points.push({x: endX, y: endY})
      line(startX, startY, endX, endY);
    }
    // secondary guidlines
    const rotation = radians(180 / points);
    for (let j = 0; j < points; j++) {
      const segmentStart = (j * angleStep) + rotation + layerRotation
      let startX = x - (diameterStart / 2) * sin(segmentStart);
      let startY = y + (diameterStart / 2) * cos(segmentStart);
      let endX = x - (diameterEnd / 2) * sin(segmentStart);
      let endY = y + (diameterEnd / 2) * cos(segmentStart);
      secondary_points.push({x: startX, y: startY})
      dashed({startX, startY, endX, endY, lineCount: 5});
    }
    // star lines
    primary_points.forEach((point, index) => {
      line(point.x, point.y, secondary_points[index].x, secondary_points[index].y)
      // curved({startX: point.x, startY: point.y, endX: secondary_points[index].x, endY: secondary_points[index].y, curveStrength: 100, curveType: CURVE_TYPES.E})
      const looped_index = index === 0 ? points - 1 : index - 1
      line(point.x, point.y, secondary_points[looped_index].x, secondary_points[looped_index].y)
      // curved({startX: point.x, startY: point.y, endX: secondary_points[looped_index].x, endY: secondary_points[looped_index].y, curveStrength: 100, curveType: CURVE_TYPES.W})
    })
    // circle(x, y, diameterStart);
    // circle(x, y, diameterEnd / 2);
  }
}