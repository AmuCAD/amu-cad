import { useEffect, useState, useRef, useMemo } from "react";
import * as THREE from "three";
import { CSG } from "three-csg-ts";

import useStore from "../../../store";
import getPosition from "../../../utils/getPosition";

function Extrude() {
  const [model, setModel] = useStore(state => [state.model, state.setModel]);
  const [operationShapes, setOperationShapes] = useStore(state => [
    state.operationShapes,
    state.setOperationShapes,
  ]);
  const [isConfirm, setIsConfirm] = useStore(state => [
    state.isConfirm,
    state.setIsConfirm,
  ]);
  const baseCoordinate = useStore(state => state.baseCoordinate);
  const setActiveFunction = useStore(state => state.setActiveFunction);
  const operationType = useStore(state => state.operationType);
  const extrudeSize = useStore(state => state.extrudeSize);
  const isForwardDirection = useStore(state => state.isForwardDirection);
  const [extrudeSettings, setExtrudeSettings] = useState({});

  const ref = useRef(null);

  useEffect(() => {
    setExtrudeSettings({
      depth: extrudeSize,
      bevelEnabled: false,
    });
  }, [extrudeSize, operationShapes]);

  useEffect(() => {
    if (isConfirm) {
      const extrudeMesh = ref.current.clone();
      const modelMesh = model?.clone();

      extrudeMesh.updateMatrix();
      modelMesh?.updateMatrix();

      if (modelMesh && operationType === "UNION") {
        const result = CSG.union(modelMesh, extrudeMesh);
        setModel(result);
      } else if (modelMesh && operationType === "SUBTRACT") {
        const result = CSG.subtract(modelMesh, extrudeMesh);
        setModel(result);
      } else {
        setModel(extrudeMesh);
      }

      setActiveFunction(null);
      setOperationShapes(null);
      setIsConfirm(false);
    }
  }, [isConfirm]);

  const key = baseCoordinate && Object.keys(baseCoordinate)[0];
  const value =
    baseCoordinate && baseCoordinate[Object.keys(baseCoordinate)[0]];

  const { position, rotation } = useMemo(() => {
    return baseCoordinate ? getPosition(key, value) : {};
  }, [baseCoordinate]);

  const extrudePosition = useMemo(() => {
    return isForwardDirection
      ? position
      : getPosition(key, value, extrudeSize).position;
  }, [position, extrudeSize, isForwardDirection]);

  return (
    <>
      {operationShapes && (
        <mesh ref={ref} position={extrudePosition} rotation={rotation}>
          <extrudeGeometry
            attach="geometry"
            args={[operationShapes.extrudeShape, extrudeSettings]}
          />
          <meshBasicMaterial
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
