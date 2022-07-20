import { useEffect, useState, useRef, useMemo } from "react";
import * as THREE from "three";

import useStore from "../../../store";
import useModel from "../../../hooks/useModel";
import getPosition from "../../../utils/getPosition";

function Extrude() {
  const [operationData, setOperationData] = useStore(state => [
    state.operationData,
    state.setOperationData,
  ]);
  const [extrudeSize, setExtrudeSize] = useStore(state => [
    state.extrudeSize,
    state.setExtrudeSize,
  ]);
  const [isConfirm, setIsConfirm] = useStore(state => [
    state.isConfirm,
    state.setIsConfirm,
  ]);
  const baseCoordinate = useStore(state => state.baseCoordinate);
  const operationType = useStore(state => state.operationType);
  const isForwardDirection = useStore(state => state.isForwardDirection);
  const setActiveFunction = useStore(state => state.setActiveFunction);
  const [extrudeSettings, setExtrudeSettings] = useState({});

  const ref = useRef(null);

  const { updateModel } = useModel();

  useEffect(() => {
    setExtrudeSettings({
      curveSegments: 30,
      depth: extrudeSize,
      bevelEnabled: false,
    });
  }, [extrudeSize, operationData]);

  useEffect(() => {
    if (isConfirm) {
      const extrudeMesh = ref.current.clone();

      updateModel(extrudeMesh);

      setActiveFunction(null);
      setOperationData(null);
      setExtrudeSize(0);
      setIsConfirm(false);
    }
  }, [isConfirm]);

  const { position, rotation } = useMemo(() => {
    const [base, offset] = baseCoordinate
      ? Object.entries(baseCoordinate)[0]
      : [];

    if (isForwardDirection && baseCoordinate) {
      return getPosition(base, offset);
    } else if (baseCoordinate) {
      return getPosition(base, offset, extrudeSize);
    } else {
      return {};
    }
  }, [baseCoordinate, extrudeSize, isForwardDirection]);

  return (
    <>
      {operationData && (
        <mesh ref={ref} position={position} rotation={rotation}>
          <extrudeGeometry
            attach="geometry"
            args={[operationData.extrudeShape, extrudeSettings]}
          />
          <meshStandardMaterial
            attach="material"
            color={operationType === "UNION" ? "hotpink" : "skyblue"}
            opacity={0.5}
            side={THREE.DoubleSide}
            transparent
          />
        </mesh>
      )}
    </>
  );
}

export default Extrude;
