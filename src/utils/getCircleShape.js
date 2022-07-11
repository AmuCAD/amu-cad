import * as THREE from "three";

const getCircleShape = (coords, radius) => {
  const shape = new THREE.Shape();
  const [x, y] = coords[0];

  shape.absarc(x, y, radius);

  return shape;
};

export default getCircleShape;
