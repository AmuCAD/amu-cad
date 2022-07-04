import { useEffect, useState } from "react";
import * as THREE from "three";

import useStore from "../../../store";
import getBasePosition from "../../../utils/getBasePosition";

function Extrude() {
  const baseCoordinate = useStore(state => state.baseCoordinate);
  const [extrudeShape, setExtrudeShape] = useStore(state => [
    state.extrudeShape,
    state.setExtrudeShape,
  ]);

  const [extrudeObjects, setExtrudeObjects] = useState([]);

  useEffect(() => {
    extrudeShape &&
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

    setExtrudeShape(null);
  }, [extrudeShape]);

  const key = baseCoordinate && Object.keys(baseCoordinate)[0];
  const value =
    baseCoordinate && baseCoordinate[Object.keys(baseCoordinate)[0]];
  const { position, rotation } = baseCoordinate
    ? getBasePosition(baseCoordinate)
    : {};

  const extrudeSettings = {
    depth:
      10 *
      ((key === "z" && value < 0) ||
      ((key === "x" || key === "y") && value >= 0)
        ? -1
        : 1),
    bevelEnabled: false,
  };

  return (
    <>
      {extrudeShape && (
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
