const disc = ({
  diameterEnd,
  centerX,
  centerY,
  filled,
}) => {
  if (filled) fill(theme.fillColor);
  circle(centerX, centerY, diameterEnd);
  noFill();
}