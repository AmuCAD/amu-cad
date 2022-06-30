import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import ControlPanel from "../../components/common/ControlPanel";
import VirtualPlane from "../../components/common/VirtualPlane";

function EditPage() {
  return (
    <>
      <ControlPanel />
      <Canvas
        style={{ width: "100%", height: "calc(100vh - 80px)" }}
        camera={{
          position: [10, 10, 10],
        }}
      >
        <OrbitControls />
        <VirtualPlane />
        <ambientLight intensity={1} />
      </Canvas>
    </>
  );
}

export default EditPage;
