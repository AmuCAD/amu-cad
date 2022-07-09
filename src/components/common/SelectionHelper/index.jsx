import { Plane } from "@react-three/drei";
import * as THREE from "three";

function SelectionHelper({ mouse, angle }) {
  return (
    <Plane args={[5, 5]} position={Object.values(mouse)} rotation={angle}>
      <meshStandardMaterial
        attach="material"
        color="red"
        opacity={0.5}
        side={THREE.DoubleSide}
        transparent
      />
    </Plane>
  );
}

export default SelectionHelper;
