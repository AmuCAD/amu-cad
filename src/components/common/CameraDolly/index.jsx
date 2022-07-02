import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const CameraDolly = ({ baseCoordinate }) => {
  useFrame(state => {
    const vec = new THREE.Vector3();
    state.camera.position.lerp(
      vec.set(...getCameraPosition(baseCoordinate)),
      0.1,
    );
  });

  const getCameraPosition = baseCoordinate => {
    const key = Object.keys(baseCoordinate)[0];
    const value = baseCoordinate[Object.keys(baseCoordinate)[0]];

    switch (key) {
      case "x":
        return [value + 10, 0, 0];
      case "y":
        return [0, value + 10, 0];
      default:
        return [0, 0, value + 10];
    }
  };

  return null;
};

export default CameraDolly;
