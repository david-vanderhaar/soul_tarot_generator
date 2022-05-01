const createStar = ({
  x,
  y,
  maxDiameter,
  layerCount = 1,
  noiseShift = 0,
  lineCount = 1,
  innerDiameter = 10,
  innerDiameterMultipler = 0,
  starPoints = 3,
  rotationStep,
  rotationOffset,
}) => {
  const noiseValue = noise(noiseShift);
  let layerDiameter = (maxDiameter / layerCount);
  // innerDiameter = 0 + round(noiseValue * 50) //currently overriding to keep star-like shape
  const curved_lines = false
  for (let i = 0; i < layerCount; i++) {
    const layerNoiseValue = noise(noiseShift * i);
    const burstEffect = round(layerNoiseValue + 0.2);
    const centerLine = round(layerNoiseValue * 2);
    const diameterStart = (i * innerDiameterMultipler) + innerDiameter;
    const diameterEnd = ((i + 1) * layerDiameter);
    const points = starPoints;
    const angleStep = radians(360 / points);
    
    // primary guidlines
    const primary_points = []
    const secondary_points = []
    const layerRotation = (i * radians(rotationStep)) + rotationOffset;
    for (let j = 0; j < points; j++) {
      const segmentStart = (j * angleStep) + layerRotation
      let startX = x - (diameterStart / 2) * sin(segmentStart);
      let startY = y + (diameterStart / 2) * cos(segmentStart);
      let endX = x - (diameterEnd / 2) * sin(segmentStart);
      let endY = y + (diameterEnd / 2) * cos(segmentStart);
      primary_points.push({x: endX, y: endY})
      centerLine && line(startX, startY, endX, endY);
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
      burstEffect && dashed({startX, startY, endX, endY, lineCount});
    }
    // star lines
    primary_points.forEach((point, index) => {
      !curved_lines
      ? line(point.x, point.y, secondary_points[index].x, secondary_points[index].y)
      : curved({startX: point.x, startY: point.y, endX: secondary_points[index].x, endY: secondary_points[index].y, curveStrength: 20, curveType: CURVE_TYPES.E})
      const previous_index = index === 0 ? points - 1 : index - 1
      !curved_lines
      ? line(point.x, point.y, secondary_points[previous_index].x, secondary_points[previous_index].y)
      : curved({startX: point.x, startY: point.y, endX: secondary_points[previous_index].x, endY: secondary_points[previous_index].y, curveStrength: 20, curveType: CURVE_TYPES.W})
    })
    // circle(x, y, diameterStart);
    // circle(x, y, diameterEnd / 2);
  }
}