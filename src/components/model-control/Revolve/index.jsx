import { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { CSG } from "three-csg-ts";

import useStore from "../../../store";
import createCirclePath from "../../../utils/createCirclePath";

function Revolve() {
  const [operationData, setOperationData] = useStore(state => [
    state.operationData,
    state.setOperationData,
  ]);
  const [radius, setRadius] = useStore(state => [
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
  const baseCoordinate = useStore(state => state.baseCoordinate);
  const setActiveFunction = useStore(state => state.setActiveFunction);
  const operationType = useStore(state => state.operationType);
  const [position, setPosition] = useState([0, 0, 0]);
  const [extrudePath, setExtrudePath] = useState(null);

  const ref = useRef(null);

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
      setOperationData(null);
      setIsConfirm(false);
      setRadius(0);
    }
  }, [isConfirm]);

  useEffect(() => {
    if (operationData && baseCoordinate) {
      const base = Object.keys(baseCoordinate)[0];

      if (base !== "y") {
        const [x, y, z] = operationData.offset;
        const isCircleShape = operationData.revolveShape.curves.length === 1;

        if (base === "z") {
          setPosition([x - radius, y, z]);
        } else if (isCircleShape) {
          setPosition([x, y, z - radius]);
        } else {
          setPosition([x, y, -radius]);
        }

        setExtrudePath(createCirclePath(radius));
      } else {
        setOperationData(null);
      }
    }
  }, [radius, operationData, baseCoordinate]);

  return (
    <>
      {operationData && (
        <>
          <mesh ref={ref} position={position} rotation={[Math.PI / 2, 0, 0]}>
            <extrudeGeometry
              attach="geometry"
              args={[
                operationData.revolveShape,
                {
                  steps: 50,
                  bevelEnabled: false,
                  extrudePath: extrudePath,
                },
              ]}
            />
            <meshStandardMaterial
              attach="material"
              color={operationType === "UNION" ? "hotpink" : "skyblue"}
              side={THREE.DoubleSide}
            />
          </mesh>
        </>
      )}
    </>
  );
}

export default Revolve;
