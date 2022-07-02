import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import ControlPanel from "../../components/common/ControlPanel";
import OriginPlanes from "../../components/common/OriginPlanes";
import Model from "../../components/common/Model";
import CameraDolly from "../../components/common/CameraDolly";

import useStore from "../../store";

function EditPage() {
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
        {/* <OriginPlanes /> */}
        <Model />
        {baseCoordinate && <CameraDolly baseCoordinate={baseCoordinate} />}
        <ambientLight intensity={1} />
      </Canvas>
    </>
  );
}

export default EditPage;
