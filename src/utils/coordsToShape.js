import * as THREE from "three";

import manipulateCoords from "./manipulatedCoords";

const coordsToShape = (coords, base) => {
  const shape = new THREE.Shape();
  const manipulatedCoords = manipulateCoords(coords, base);
  const [x, y] = manipulatedCoords.shift();

  shape.moveTo(x, y);

  for (const [x, y] of manipulatedCoords) {
    shape.lineTo(x, y);
  }

  return shape;
};

export default coordsToShape;
