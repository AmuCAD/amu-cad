import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import useStore from "../../store";
import ControlPanel from "../../components/common/ControlPanel";
import CameraDolly from "../../components/common/CameraDolly";
import OriginPlanes from "../../components/common/OriginPlanes";
import Sketch from "../../components/common/Sketch";
import Model from "../../components/common/Model";

function EditPage() {
  const isSketchMode = useStore(state => state.isSketchMode);
  const baseCoordinate = useStore(state => state.baseCoordinate);

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
        <ambientLight intensity={1} />
        <pointLight position={[15, 20, 10]} intensity={2} color="#fff" />
        {isSketchMode && baseCoordinate && (
          <CameraDolly baseCoordinate={baseCoordinate} />
        )}
        <OriginPlanes />
        <Sketch />
        <Model />
      </Canvas>
    </>
  );
}

export default EditPage;
