const theFool = ({
  centerX,
  centerY,
  theme,
  scaleOption,
}) => {
  fill(theme.fillColor);
  circle(centerX, centerY, 40 * scaleOption);
  stipple({
    centerX: centerX,
    centerY: centerY,
    diameterStart: 60 * scaleOption,
    diameterEnd: 60 * scaleOption,
    layerCount: 1,
    stippleCount: 12,
    stippleSize: 5 * scaleOption,
    rotationStep: radians(0),
    rotationOffset: radians(0),
    node: ({
      x,
      y,
      diameter
    }) => {
      fill(theme.fillColor);
      circle(x, y, diameter)
      noFill();
    },
  });
  disc({
    centerX: centerX,
    centerY: centerY,
    diameterEnd: 70 * scaleOption,
    filled: false,
  })
  beam({
    centerX: centerX,
    centerY: centerY,
    diameterStart: 0,
    diameterEnd: 180 * scaleOption,
    layerCount: 1,
    lineCount: 7,
    lineGap: 0,
    rotationStep: radians(0),
    rotationOffset: radians(283),
    circumference: radians(180),
  })
  ripple({
    centerX: centerX,
    centerY: centerY,
    diameterStart: 150 * scaleOption,
    diameterEnd: 180 * scaleOption,
    layerCount: 2,
    segmentCount: 1,
    segmentGutter: radians(0),
    rotationStep: radians(0),
    rotationOffset: radians(270),
    circumference: radians(180),
  })
  burst({
    diameterStart: 90 * scaleOption,
    diameterEnd: 160 * scaleOption,
    centerX: centerX,
    centerY: centerY,
    layerCount: 1,
    burstCount: 4,
    lineCount: 10,
    lineGap: 0,
    rotationStep: radians(0),
    rotationOffset: radians(90),
    circumference: radians(180),
  });
  stipple({
    centerX: centerX,
    centerY: centerY,
    diameterStart: 260 * scaleOption,
    diameterEnd: 260 * scaleOption,
    layerCount: 1,
    stippleCount: 12,
    stippleSize: 5 * scaleOption,
    rotationStep: radians(0),
    rotationOffset: radians(95),
    circumference: radians(180),
    node: ({
      x,
      y,
      diameter
    }) => {
      fill(theme.fillColor);
      circle(x, y, diameter)
      noFill();
      circle(x, y, diameter + 6)
    },
  });
  ripple({
    centerX: centerX,
    centerY: centerY,
    diameterStart: 340 * scaleOption,
    diameterEnd: 340 * scaleOption,
    layerCount: 2,
    segmentCount: 100,
    segmentGutter: radians(1),
    rotationStep: radians(0),
    rotationOffset: radians(95),
    circumference: radians(180),
  })
  ripple({
    centerX: centerX,
    centerY: centerY,
    diameterStart: 320 * scaleOption,
    diameterEnd: 320 * scaleOption,
    layerCount: 2,
    segmentCount: 25,
    segmentGutter: radians(1),
    rotationStep: radians(0),
    rotationOffset: radians(95),
    circumference: radians(180),
  })
}