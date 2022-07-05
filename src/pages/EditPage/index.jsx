import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import ControlPanel from "../../components/common/ControlPanel";
import OriginPlanes from "../../components/common/OriginPlanes";
import Model from "../../components/common/Model";
import CameraDolly from "../../components/common/CameraDolly";
import useStore from "../../store";
import useModal from "../../hooks/useModal";
import Sketch from "../../components/common/Sketch";

function EditPage() {
  const isSketchMode = useStore(state => state.isSketchMode);
  const baseCoordinate = useStore(state => state.baseCoordinate);
  const { showModal } = useModal();

  // showModal({ type: "test" });

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
        <Model />
        <Sketch />
        {isSketchMode && baseCoordinate && (
          <CameraDolly baseCoordinate={baseCoordinate} />
        )}
        <ambientLight intensity={1} />
        <pointLight position={[15, 20, 10]} intensity={2} color="#fff" />
      </Canvas>
    </>
  );
}

export default EditPage;
