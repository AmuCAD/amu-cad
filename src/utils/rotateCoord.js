const rotateCoord = ([centerX, centerY], [x, y], angle) => {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  const rotatedX = cos * (x - centerX) + sin * (y - centerY) + centerX;
  const rotatedY = cos * (y - centerY) - sin * (x - centerX) + centerY;

  return [rotatedX, rotatedY];
};

export default rotateCoord;
