import { Canvas } from "@react-three/fiber";
import { Plane, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function EditPage() {
  return (
      <Canvas
        style={{ width: "100%", height: "100vh" }}
        camera={{
          position: [10, 10, 10],
        }}
      >
        <OrbitControls />
        <Plane
          args={[10, 10]}
        >
          <meshStandardMaterial
            attach="material"
            color="orange"
            opacity={0.5}
            transparent
            side={THREE.DoubleSide}
          />
        </Plane>
        <ambientLight intensity={1} />
      </Canvas>
  );
}

export default EditPage;
