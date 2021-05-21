const crosshairs = ({
  centerX,
  centerY,
  lineLength,
}) => {
  // crosshairs
  stroke(0);
  let startX = centerX;
  let startY = centerY;
  let endX = centerX - (lineLength) * sin(radians(0));
  let endY = centerY + (lineLength) * cos(radians(0));
  line(startX, startY, endX, endY);
  stroke(90);
  endX = centerX - (lineLength) * sin(radians(90));
  endY = centerY + (lineLength) * cos(radians(90));
  line(startX, startY, endX, endY);
  stroke(180);
  endX = centerX - (lineLength) * sin(radians(180));
  endY = centerY + (lineLength) * cos(radians(180));
  line(startX, startY, endX, endY);
  stroke(270);
  endX = centerX - (lineLength) * sin(radians(270));
  endY = centerY + (lineLength) * cos(radians(270));
  line(startX, startY, endX, endY);
  // end crosshairs
}