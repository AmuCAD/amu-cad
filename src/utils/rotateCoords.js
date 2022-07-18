const rotateCoords = ([centerX, centerY], coords, angle) => {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  const result = [];

  for (const coord of coords) {
    const [x, y, z] = coord;
    const rotatedX = cos * (x - centerX) + sin * (y - centerY) + centerX;
    const rotatedY = cos * (y - centerY) - sin * (x - centerX) + centerY;

    result.push([rotatedX, rotatedY, z]);
  }

  return result;
};

export default rotateCoords;
