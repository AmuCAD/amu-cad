import { useEffect, useState, useRef, useMemo } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { CSG } from "three-csg-ts";

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
  const [activeFunction, setActiveFunction] = useStore(state => [
    state.activeFunction,
    state.setActiveFunction,
  ]);
  const [extrudeSettings, setExtrudeSettings] = useState({});
  const [model, setModel] = useState(null);

  const ref = useRef(null);

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

  const { scene } = useThree();

  useEffect(() => {
    if (isConfirm) {
      const extrudeMesh = ref.current.clone();

      if (model) {
        scene.remove(model);
        setModel(CSG.intersect(model, extrudeMesh));
        scene.add(CSG.intersect(model, extrudeMesh));
      } else {
        setModel(extrudeMesh);
        scene.add(extrudeMesh);
      }

      setActiveFunction(null);
      setExtrudeShape(null);
      setIsConfirm(false);
    }
  }, [isConfirm]);

  const { position, rotation } = useMemo(() => {
    return baseCoordinate ? getBasePosition(baseCoordinate) : {};
  }, [baseCoordinate]);

  return (
    <>
      {activeFunction === "EXTRUDE" && extrudeShape && (
        <mesh ref={ref} position={position} rotation={rotation}>
          <extrudeGeometry
            attach="geometry"
            args={[extrudeShape, extrudeSettings]}
          />
          <meshBasicMaterial
            attach="material"
            color="white"
            side={THREE.DoubleSide}
          />
        </mesh>
      )}
    </>
  );
}

export default Extrude;
