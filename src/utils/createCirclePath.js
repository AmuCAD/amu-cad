import * as THREE from "three";

const createCirclePath = radius => {
  const segmentPoints = [];

  for (let i = 0; i < 100; i++) {
    const x = radius * Math.cos(i * ((2 * Math.PI) / 100));
    const y = radius * Math.sin(i * ((2 * Math.PI) / 100));

    segmentPoints.push(new THREE.Vector3(x, y, 0));
  }

  return new THREE.CatmullRomCurve3(segmentPoints, true);
};

export default createCirclePath;
