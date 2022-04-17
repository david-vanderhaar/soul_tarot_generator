const threeOfSun = ({
  centerX,
  centerY,
  theme,
  scaleOption,
}) => {
  createSun({
    x: centerX,
    y: centerY - 250,
    maxDiameter: 100,
    layerCount: 5,
    detailModifier: .2,
    theme,
  });
  createSun({
    x: centerX,
    y: centerY,
    maxDiameter: 300,
    layerCount: 10,
    detailModifier: .3,
    theme,
  });
  createSun({
    x: centerX,
    y: centerY + 250,
    maxDiameter: 100,
    layerCount: 5,
    detailModifier: .2,
    theme,
  });
}