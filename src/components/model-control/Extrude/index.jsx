import { useEffect, useState, useRef, useMemo } from "react";
import * as THREE from "three";
import { CSG } from "three-csg-ts";

import useStore from "../../../store";
import getPosition from "../../../utils/getPosition";

function Extrude() {
  const [operationShapes, setOperationShapes] = useStore(state => [
    state.operationShapes,
    state.setOperationShapes,
  ]);
  const [extrudeSize, setExtrudeSize] = useStore(state => [
    state.extrudeSize,
    state.setExtrudeSize,
  ]);
  const [isConfirm, setIsConfirm] = useStore(state => [
    state.isConfirm,
    state.setIsConfirm,
  ]);
  const [models, setModels] = useStore(state => [
    state.models,
    state.setModels,
  ]);
  const isForwardDirection = useStore(state => state.isForwardDirection);
  const baseCoordinate = useStore(state => state.baseCoordinate);
  const setActiveFunction = useStore(state => state.setActiveFunction);
  const operationType = useStore(state => state.operationType);
  const [extrudeSettings, setExtrudeSettings] = useState({});

  const ref = useRef(null);

  useEffect(() => {
    setExtrudeSettings({
      curveSegments: 30,
      depth: extrudeSize,
      bevelEnabled: false,
    });
  }, [extrudeSize, operationShapes]);

  useEffect(() => {
    if (isConfirm) {
      const extrudeMesh = ref.current.clone();
      const modelMesh = models[0] ? models[models.length - 1].clone() : null;

      if (modelMesh && operationType === "UNION") {
        const result = CSG.union(modelMesh, extrudeMesh);
        setModels([...models, result]);
      } else if (modelMesh && operationType === "SUBTRACT") {
        const result = CSG.subtract(modelMesh, extrudeMesh);
        setModels([...models, result]);
      } else if (operationType === "UNION") {
        setModels([extrudeMesh]);
      }

      setActiveFunction(null);
      setOperationShapes(null);
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
      {operationShapes && (
        <mesh ref={ref} position={position} rotation={rotation}>
          <extrudeGeometry
            attach="geometry"
            args={[operationShapes.extrudeShape, extrudeSettings]}
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
