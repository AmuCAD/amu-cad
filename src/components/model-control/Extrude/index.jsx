import { useEffect, useState } from "react";
import * as THREE from "three";

import useStore from "../../../store";
import getBasePosition from "../../../utils/getBasePosition";

function Extrude() {
  const baseCoordinate = useStore(state => state.baseCoordinate);
  const extrudeSize = useStore(state => state.extrudeSize);
  const [extrudeShape, setExtrudeShape] = useStore(state => [
    state.extrudeShape,
    state.setExtrudeShape,
  ]);
  const [isConfirm, setIsConfirm] = useStore(state => [
    state.isConfirm,
    state.setIsConfirm,
  ]);
  const activeFunction = useStore(state => state.activeFunction);
  const [extrudeObjects, setExtrudeObjects] = useState([]);
  const [extrudeSettings, setExtrudeSettings] = useState({});

  useEffect(() => {
    const key = baseCoordinate && Object.keys(baseCoordinate)[0];
    const value =
      baseCoordinate && baseCoordinate[Object.keys(baseCoordinate)[0]];

    setExtrudeSettings({
      depth:
        extrudeSize *
        ((key === "z" && value < 0) ||
        ((key === "x" || key === "y") && value >= 0)
          ? -1
          : 1),
      bevelEnabled: false,
    });
  }, [extrudeSize, extrudeShape, baseCoordinate]);

  useEffect(() => {
    if (isConfirm) {
      setExtrudeObjects([
        ...extrudeObjects,
        <mesh position={position} rotation={rotation}>
          <extrudeGeometry
            attach="geometry"
            args={[extrudeShape, extrudeSettings]}
          />
          <meshBasicMaterial
            attach="material"
            color="red"
            side={THREE.DoubleSide}
          />
        </mesh>,
      ]);

      setIsConfirm(false);
      setExtrudeShape(null);
    }
  }, [isConfirm]);

  const { position, rotation } = baseCoordinate
    ? getBasePosition(baseCoordinate)
    : {};

  return (
    <>
      {activeFunction === "EXTRUDE" && extrudeShape && (
        <mesh position={position} rotation={rotation}>
          <extrudeGeometry
            attach="geometry"
            args={[extrudeShape, extrudeSettings]}
          />
          <meshBasicMaterial
            attach="material"
            color="red"
            side={THREE.DoubleSide}
          />
        </mesh>
      )}
      {extrudeObjects}
    </>
  );
}

export default Extrude;
