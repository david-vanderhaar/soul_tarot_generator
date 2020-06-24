const createSun = ({
  x,
  y,
  maxDiameter,
  layerCount,
  detailModifier = () => 0,
  theme,
}) => {
  for (let i = 0; i < layerCount; i++) {
    let layerDiameter = (maxDiameter / layerCount);
    const layerTypes = [
      beam,
      ripple,
      stipple,
      burst,
      burstCurve,
      // disc,
    ];
    const index = floor((noise(i * i) * (layerTypes.length)) % (layerTypes.length))
    console.log(index);
    
    const layerType = layerTypes[index];
    // const layerType = random([
    //   beam, 
    //   ripple, 
    //   stipple, 
    //   burst, 
    //   burstCurve,
    //   // disc,
    // ])
    const params = {
      diameterStart: i * layerDiameter,
      diameterEnd: ((i + 1) * layerDiameter),
      centerX: x,
      centerY: y,
      layerCount: round(noise(0) * (20 * detailModifier())),
      lineCount: round(noise(0) * (100 * detailModifier())),
      lineGap: 0,
      segmentCount: round(noise(0) * (20 * detailModifier())),
      segmentGutter: radians(noise(0) * 35),
      burstCount: round(10 * detailModifier()),
      stippleCount: round(100 * detailModifier()),
      stippleSize: round(10 * detailModifier()),
      rotationStep: radians(noise(0) * 30),
      rotationOffset: radians(0),
      circumference: radians(360),
      filled: round(noise(0)),
      theme,
    }

    // const params = {
    //   diameterStart: i * layerDiameter,
    //   diameterEnd: ((i + 1) * layerDiameter),
    //   centerX: x,
    //   centerY: y,
    //   layerCount: round(random(20 * detailModifier())),
    //   lineCount: round(random(100 * detailModifier())),
    //   lineGap: 0,
    //   segmentCount: round(random(20 * detailModifier())),
    //   segmentGutter: radians(random([15, 25, 35])),
    //   burstCount: round(10 * detailModifier()),
    //   stippleCount: round(100 * detailModifier()),
    //   stippleSize: round(10 * detailModifier()),
    //   rotationStep: radians(random([0, 15, 30])),
    //   rotationOffset: radians(0),
    //   circumference: radians(360),
    //   filled: random([0, 1]),
    //   theme,
    // }
    
    layerType(params);
  }
}