import { useEffect, useState, useRef, useMemo } from "react";
import { CSG } from "three-csg-ts";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import useStore from "../../../store";
import getBasePosition from "../../../utils/getBasePosition";
import SelectionHelper from "../../common/SelectionHelper";

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
    if (prevPoint && mouse) {
      if (dataToGetAngle.length === 60) {
        const countHash = {};

        dataToGetAngle.forEach(elem => {
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

        const angleIndexes = [];

        dataToGetAngle.forEach((elem, index) => {
          if (elem === Number(angle)) {
            angleIndexes.push(index);
          }
        });

        for (const index of angleIndexes) {
          if (index === 3 || index === 6 || index === 9) {
            setAngle([Math.PI / 2 - angle, 0, 0]);
            break;
          } else if (index === 4 || index === 7 || index === 10) {
            setAngle([Math.PI / 2, angle, 0]);
            break;
          } else if (index === 5 || index === 8 || index === 11) {
            setAngle([0, angle - Math.PI / 2, 0]);
            break;
          }
        }
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
          <meshBasicMaterial
            attach="material"
            color="white"
            side={THREE.DoubleSide}
          />
        </mesh>
      )}
      {model && (
        <primitive
          onPointerMove={e => {
            if (isSketchMode && !baseCoordinate) {
              e.stopPropagation();
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
            if (isSketchMode && !baseCoordinate) {
              e.stopPropagation();
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
      {isSketchMode && !baseCoordinate && mouse && (
        <SelectionHelper mouse={mouse} angle={angle} />
      )}
    </>
  );
}

export default Extrude;
