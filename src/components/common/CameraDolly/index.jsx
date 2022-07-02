import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import useStore from "../../../store";

const CameraDolly = () => {
  const baseCoordinate = useStore(state => state.baseCoordinate);

  useFrame(state => {
    const vec = new THREE.Vector3();
    state.camera.position.lerp(vec.set(...coordinates), 0.1);
  });

  let coordinates = [10, 10, 10];

  if (baseCoordinate) {
    const key = Object.keys(baseCoordinate)[0];
    const value = baseCoordinate[Object.keys(baseCoordinate)[0]];

    switch (key) {
      case "x":
        coordinates = [value + 10, 0, 0];
        break;
      case "y":
        coordinates = [0, value + 10, 0];
        break;
      default:
        coordinates = [0, 0, value + 10];
    }
  }
};

export default CameraDolly;
