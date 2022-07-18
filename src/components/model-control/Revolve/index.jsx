import { useState, useEffect, useRef } from "react";
import * as THREE from "three";

import useStore from "../../../store";
import useModel from "../../../hooks/useModel";
import getRevolvePosition from "../../../utils/getRevolvePosition";
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
  const baseCoordinate = useStore(state => state.baseCoordinate);
  const setActiveFunction = useStore(state => state.setActiveFunction);
  const operationType = useStore(state => state.operationType);
  const [position, setPosition] = useState([0, 0, 0]);
  const [extrudePath, setExtrudePath] = useState(null);

  const ref = useRef(null);

  const { updateModel } = useModel();

  useEffect(() => {
    if (isConfirm) {
      const extrudeMesh = ref.current.clone();

      updateModel(extrudeMesh);

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
        setPosition(getRevolvePosition(operationData, base, radius));
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
