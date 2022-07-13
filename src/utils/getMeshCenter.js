import * as THREE from "three";

const getMeshCenter = mesh => {
  const box3 = new THREE.Box3().setFromObject(mesh);
  const vector = new THREE.Vector3();

  box3.getCenter(vector);

  return vector;
};

export default getMeshCenter;
