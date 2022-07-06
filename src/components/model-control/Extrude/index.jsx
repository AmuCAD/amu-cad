import { useEffect, useState, useRef, useMemo } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { CSG } from "three-csg-ts";

import useStore from "../../../store";
import getBasePosition from "../../../utils/getBasePosition";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

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
  const operationType = useStore(state => state.operationType);
  const importFile = useStore(state => state.importFile);
  const [model, setModel] = useStore(state => [state.model, state.setModel]);
  const [extrudeSettings, setExtrudeSettings] = useState({});

  const ref = useRef(null);
  const { scene } = useThree();

  useEffect(() => {
    const gltfLoader = new GLTFLoader();
    const blobUrl = URL.createObjectURL(
      new Blob([importFile], { type: "text.plain" }),
    );

    gltfLoader.load(blobUrl, gltf => {
      scene.remove(model);
      setModel(gltf.scene);
      scene.add(gltf.scene);
    });
  }, [importFile]);

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
      const extrudeMesh = ref.current.clone();
      const modelMesh = model?.clone();

      if (model && operationType === "UNION") {
        const result = CSG.union(modelMesh, extrudeMesh);

        scene.remove(model);
        setModel(result);
        scene.add(result);
      } else if (model && operationType === "SUBTRACT") {
        const result = CSG.subtract(modelMesh, extrudeMesh);

        scene.remove(model);
        setModel(result);
        scene.add(result);
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
