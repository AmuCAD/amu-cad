import { Plane, Text } from "@react-three/drei";
import * as THREE from "three";

function VirtualPlane() {
  return (
    <>
      <Plane args={[10, 10]} rotation={[0, 0, 0]}>
        <Text text="XY" color="grey" position={[3.7, 4, 0.01]} fontSize={1} />
        <Text
          text="XY"
          color="grey"
          position={[-3.7, 4, -0.01]}
          fontSize={1}
          rotation={[0, Math.PI, 0]}
        />
        <meshStandardMaterial
          attach="material"
          color="orange"
          opacity={0.5}
          transparent
          side={THREE.DoubleSide}
        />
      </Plane>
      <Plane args={[10, 10]} rotation={[Math.PI / 2, 0, 0]}>
        <Text
          text="XZ"
          color="grey"
          position={[3.7, -4, -0.01]}
          rotation={[Math.PI, 0, 0]}
          fontSize={1}
        />
        <Text
          text="XZ"
          color="grey"
          position={[-3.7, -4, 0.01]}
          rotation={[0, 0, Math.PI]}
          fontSize={1}
        />
        <meshStandardMaterial
          attach="material"
          color="orange"
          opacity={0.5}
          transparent
          side={THREE.DoubleSide}
        />
      </Plane>
      <Plane args={[10, 10]} rotation={[0, Math.PI / 2, 0]}>
        <Text
          text="YZ"
          color="grey"
          position={[3.7, 4, 0.01]}
          rotation={[0, 0, 0]}
          fontSize={1}
        />
        <Text
          text="YZ"
          color="grey"
          position={[-3.7, 4, -0.01]}
          rotation={[0, Math.PI, 0]}
          fontSize={1}
        />
        <meshStandardMaterial
          attach="material"
          color="orange"
          opacity={0.5}
          transparent
          side={THREE.DoubleSide}
        />
      </Plane>
      <ambientLight intensity={1} />
    </>
  );
}

export default VirtualPlane;
