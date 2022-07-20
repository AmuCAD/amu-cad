import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import getCameraPosition from "../../../utils/getCameraPosition";

const CameraDolly = ({ baseCoordinate }) => {
  useFrame(state => {
    const vec = new THREE.Vector3();

    state.camera.position.lerp(
      vec.set(...getCameraPosition(baseCoordinate)),
      0.1,
    );
  });

  return null;
};

export default CameraDolly;
