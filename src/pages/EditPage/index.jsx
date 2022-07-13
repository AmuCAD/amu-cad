import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import useStore from "../../store";
import GlobalModal from "../../components/common/GlobalModal";
import ControlPanel from "../../components/common/ControlPanel";
import CameraDolly from "../../components/common/CameraDolly";
import OriginPlanes from "../../components/common/OriginPlanes";
import Sketch from "../../components/common/Sketch";
import Model from "../../components/common/Model";

function EditPage() {
  const isSketchMode = useStore(state => state.isSketchMode);
  const baseCoordinate = useStore(state => state.baseCoordinate);
  const isOriginPlanesOn = useStore(state => state.isOriginPlanesOn);

  return (
    <>
      <GlobalModal />
      <ControlPanel />
      <Canvas
        style={{ width: "100%", height: "calc(100vh - 80px)" }}
        camera={{
          position: [10, 10, 10],
        }}
      >
        <OrbitControls />
        <ambientLight intensity={1} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        {isSketchMode && baseCoordinate && (
          <CameraDolly baseCoordinate={baseCoordinate} />
        )}
        {isOriginPlanesOn && <OriginPlanes />}
        <Sketch />
        <Model />
      </Canvas>
    </>
  );
}

export default EditPage;
