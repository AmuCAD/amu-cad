import { useEffect, useState, useRef, useMemo } from "react";
import * as THREE from "three";
import { CSG } from "three-csg-ts";

import { Plane, Text } from "@react-three/drei";

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
  const setBaseCoordinate = useStore(state => state.setBaseCoordinate);
  const operationType = useStore(state => state.operationType);
  const importFile = useStore(state => state.importFile);
  const [model, setModel] = useStore(state => [state.model, state.setModel]);
  const isSketchMode = useStore(state => state.isSketchMode);
  const [extrudeSettings, setExtrudeSettings] = useState({});
  const [prevPoint, setPrevPoint] = useState(null);
  const [sameCoordinate, setSameCoordinate] = useState(null);
  const [mouse, setMouse] = useState(null);
  const [dataToGetAngle, setDataToGetAngle] = useState([]);
  const [angle, setAngle] = useState([0, 0, 0]);

  const ref = useRef(null);

  useEffect(() => {
    const gltfLoader = new GLTFLoader();
    const blobUrl = URL.createObjectURL(
      new Blob([importFile], { type: "text.plain" }),
    );

    gltfLoader.load(blobUrl, gltf => {
      setModel(gltf.scene);
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
        const result = CSG.union(extrudeMesh, modelMesh);
        setModel(result);
      } else if (model && operationType === "SUBTRACT") {
        const result = CSG.subtract(extrudeMesh, modelMesh);
        setModel(result);
      } else {
        setModel(extrudeMesh);
      }

      setActiveFunction(null);
      setExtrudeShape(null);
      setIsConfirm(false);
    }
  }, [isConfirm]);

  const { position, rotation } = useMemo(() => {
    return baseCoordinate ? getBasePosition(baseCoordinate) : {};
  }, [baseCoordinate]);

  const findSameCoordinate = (prevPoint, currentPoint, sameCoordinate) => {
    for (const prop in prevPoint) {
      if (!prevPoint.hasOwnProperty(prop)) continue;
      if (prevPoint[prop] === currentPoint[prop]) {
        return { [prop]: prevPoint[prop] };
      }
    }

    return sameCoordinate;
  };

  useEffect(() => {
    if (prevPoint) {
      if (dataToGetAngle.length === 60) {
        const countHash = {};

        dataToGetAngle.forEach((elem, index) => {
          if (countHash[elem]) {
            countHash[elem]++;
          } else {
            countHash[elem] = 1;
          }
        });

        let angle = "";
        let max = 0;

        for (const key in countHash) {
          if (max < countHash[key]) {
            angle = key;
            max = countHash[key];
          }
        }

        setAngle([Math.PI / 2, angle, 0]);
      }

      setDataToGetAngle(data => {
        if (data.length === 60) {
          data.splice(0, 3);
        }

        data.push(
          Math.round(
            Math.atan2(mouse.y - prevPoint.y, mouse.z - prevPoint.z) * 100,
          ) / 100,
          Math.round(
            Math.atan2(mouse.y - prevPoint.y, mouse.x - prevPoint.x) * 100,
          ) / 100,
          Math.round(
            Math.atan2(mouse.x - prevPoint.x, mouse.z - prevPoint.z) * 100,
          ) / 100,
        );
        return data;
      });
    }
  }, [prevPoint]);

  return (
    <>
      {activeFunction === "EXTRUDE" && extrudeShape && (
        <mesh ref={ref} position={position} rotation={rotation}>
          <extrudeGeometry
            attach="geometry"
            args={[extrudeShape, extrudeSettings]}
          />
          <meshBasicMaterial attach="material" color="white" />
        </mesh>
      )}
      {model && (
        <primitive
          onPointerMove={e => {
            e.stopPropagation();

            if (isSketchMode) {
              setSameCoordinate(
                findSameCoordinate(prevPoint, e.point, sameCoordinate),
              );
            }

            setMouse(e.point);
            setPrevPoint(mouse);
          }}
          onPointerOut={() => {
            setMouse(null);
          }}
          onClick={e => {
            e.stopPropagation();

            if (isSketchMode) {
              setBaseCoordinate(sameCoordinate);
            }
          }}
          object={model}
          material={
            new THREE.MeshBasicMaterial({
              color: "white",
              side: THREE.DoubleSide,
            })
          }
        />
      )}
      {mouse && <Plane args={[10, 10]} position={Object.values(mouse)} rotation={angle}>
        <meshStandardMaterial
          attach="material"
          color="red"
          side={THREE.DoubleSide}
        />
      </Plane>}
    </>
  );
}

export default Extrude;
