const card = ({
  x,
  y,
  w,
  h,
  bgColor,
  strokeColor
}) => {
  const padding = 25
  fill(bgColor);
  stroke(strokeColor)
  rect(x, y, w, h, 20);
  noFill();
  rect(x - padding / 8, y - padding / 8, w - padding, h - padding, 20);
  rect(x + padding / 8, y + padding / 8, w - padding, h - padding, 20);
}