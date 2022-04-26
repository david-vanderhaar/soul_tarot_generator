const oneOfSun = ({
  centerX,
  centerY,
  theme,
  scaleOption,
}) => {
  fill(theme.fillColor);
  circle(centerX, centerY, 40 * scaleOption);
  textSize(32);
  textFont('Montserrat');
  text('The Six of Suns', 325, 700);
  noFill();
  circle(centerX, centerY, 55 * scaleOption);
  // ripple({
  //   diameterStart: 160,
  //   diameterEnd: 280,
  //   centerX: centerX,
  //   centerY: centerY,
  //   layerCount: 6,
  //   segmentCount: 6,
  //   segmentGutter: radians(15),
  //   rotationStep: radians(10),
  //   rotationOffset: radians(0),
  // }); 
  // beam({
  //   diameterStart: 160,
  //   diameterEnd: 260,
  //   centerX: centerX,
  //   centerY: centerY,
  //   layerCount: 4,
  //   lineCount: 40,
  //   lineGap: 20,
  //   rotationStep: radians(5),
  //   rotationOffset: radians(0)
  // })
  stipple({
    diameterStart: 420 * scaleOption,
    diameterEnd: 450 * scaleOption,
    centerX: centerX,
    centerY: centerY,
    layerCount: 2,
    stippleCount: 12,
    stippleSize: 2 * scaleOption,
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
      circle(x, y, diameter + 6)
    },
  });
  stipple({
    diameterStart: 475 * scaleOption,
    diameterEnd: 565 * scaleOption,
    centerX: centerX,
    centerY: centerY,
    layerCount: 2,
    stippleCount: 1,
    stippleSize: 25 * scaleOption,
    rotationStep: radians(0),
    rotationOffset: radians(180),
    node: ({
      x,
      y,
      diameter,
      layer,
    }) => {
      if (layer % 2 === 0) fill(theme.fillColor);
      arc(x, y, diameter, diameter, radians(180), radians(0), CHORD);
      noFill();
    },
  });

  burst({
    diameterStart: 260 * scaleOption,
    diameterEnd: 360 * scaleOption,
    centerX: centerX,
    centerY: centerY,
    layerCount: 1,
    burstCount: 6,
    lineCount: 6,
    lineGap: 0,
    rotationStep: radians(0),
    rotationOffset: radians(30),
  });

  burstCurve({
    diameterStart: 100 * scaleOption,
    diameterEnd: 150 * scaleOption,
    centerX: centerX,
    centerY: centerY,
    layerCount: 1,
    burstCount: 4,
    lineCount: 4,
    lineGap: 0,
    rotationStep: radians(0),
    rotationOffset: radians(angle),
    flip: 0,
  });
};