const createMoon = ({
  x,
  y,
  maxDiameter,
  layerCount = 1,
  noiseShift = 0,
  lineCount = 1,
  rotationStep,
  rotationOffset,
}) => {
  circle(x - 50, y, 175);
  circle(x, y, 200);
  // beam({
  //   diameterStart: 70,
  //   diameterEnd: 200,
  //   centerX: x - 100,
  //   centerY: y,
  //   layerCount: 1,
  //   lineCount: 50,
  //   lineGap: 0,
  //   rotationStep: 0,
  //   rotationOffset: radians(-155),
  //   circumference: radians(115)
  // });
}
