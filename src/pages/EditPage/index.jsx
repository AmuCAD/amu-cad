import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import ControlPanel from "../../components/common/ControlPanel";
import OriginPlanes from "../../components/common/OriginPlanes";
import Model from "../../components/common/Model";

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
        <OriginPlanes />
        {/* <Model /> */}
        <ambientLight intensity={1} />
      </Canvas>
    </>
  );
}

export default EditPage;
