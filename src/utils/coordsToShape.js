import * as THREE from "three";

const coordsToShape = (coords, offset = [0, 0]) => {
  const shape = new THREE.Shape();
  const [x, y] = coords.shift();
  const [offsetX, offsetY] = offset;

  shape.moveTo(x - offsetX, y - offsetY);

  for (const [x, y] of coords) {
    shape.lineTo(x - offsetX, y - offsetY);
  }

  return shape;
};

export default coordsToShape;
