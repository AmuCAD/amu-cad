import { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { CSG } from "three-csg-ts";

import useStore from "../../../store";

function Revolve({ model, setModel }) {
  const [isConfirm, setIsConfirm] = useStore(state => [
    state.isConfirm,
    state.setIsConfirm,
  ]);
  const [operationShapes, setOperationShapes] = useStore(state => [
    state.operationShapes,
    state.setOperationShapes,
  ]);
  const baseCoordinate = useStore(state => state.baseCoordinate);
  const setActiveFunction = useStore(state => state.setActiveFunction);
  const operationType = useStore(state => state.operationType);
  const extrudeSize = useStore(state => state.extrudeSize);
  const [position, setPosition] = useState([0, 0, 0]);
  const [extrudePath, setExtrudePath] = useState(null);

  const ref = useRef(null);

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

  useEffect(() => {
    if (operationShapes) {
      const radius = extrudeSize;
      const segmentPoints = [];
      const SEG_RADS = (2 * Math.PI) / 100;
      const [x, y, z] = operationShapes.offset;

      if (baseCoordinate.x) {
        setPosition([x, y, z - radius]);
      } else {
        setPosition([x - radius, y, z]);
      }

      for (let i = 0; i < 100; i++) {
        const x = radius * Math.cos(i * SEG_RADS);
        const y = radius * Math.sin(i * SEG_RADS);
        segmentPoints.push(new THREE.Vector3(x, y, 0));
      }

      setExtrudePath(new THREE.CatmullRomCurve3(segmentPoints, true));
    }
  }, [extrudeSize, operationShapes, baseCoordinate]);

  return (
    <>
      {operationShapes && (
        <>
          <mesh ref={ref} position={position} rotation={[Math.PI / 2, 0, 0]}>
            <extrudeGeometry
              attach="geometry"
              args={[
                operationShapes.revolveShape,
                {
                  bevelEnabled: false,
                  extrudePath: extrudePath,
                  steps: 50,
                },
              ]}
            />
            <meshBasicMaterial
              attach="material"
              color={"pink"}
              side={THREE.DoubleSide}
            />
          </mesh>
          <mesh>
            <shapeBufferGeometry
              attach="geometry"
              args={[operationShapes.revolveShape]}
            />
            <meshBasicMaterial
              attach="material"
              color="blue"
              side={THREE.DoubleSide}
            />
          </mesh>
        </>
      )}
    </>
  );
}

export default Revolve;
