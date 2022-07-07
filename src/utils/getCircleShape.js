import * as THREE from "three";

import manipulateCoords from "./manipulatedCoords";

const getCircleShape = (coords, base, radius) => {
  const shape = new THREE.Shape();
  const manipulatedCoords = manipulateCoords(coords, base);
  const [x, y] = manipulatedCoords[0];

  shape.absarc(x, y, radius);

  return shape;
};

export default getCircleShape;
