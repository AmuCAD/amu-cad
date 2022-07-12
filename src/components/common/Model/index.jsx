import { useState, useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import useStore from "../../../store";
import OriginPlanes from "../../common/OriginPlanes";
import Extrude from "../../model-control/Extrude";
import Revolve from "../../model-control/Revolve";
import SelectionHelper from "../SelectionHelper";

function Model() {
  const [baseCoordinate, setBaseCoordinate] = useStore(state => [
    state.baseCoordinate,
    state.setBaseCoordinate,
  ]);
  const [model, setModel] = useStore(state => [state.model, state.setModel]);
  const activeFunction = useStore(state => state.activeFunction);
  const isSketchMode = useStore(state => state.isSketchMode);
  const importFile = useStore(state => state.importFile);
  const [sameCoordinate, setSameCoordinate] = useState(null);
  const [mouse, setMouse] = useState(null);
  const [prevPoint, setPrevPoint] = useState(null);
  const [dataToGetAngle, setDataToGetAngle] = useState([]);
  const [angle, setAngle] = useState([0, 0, 0]);

  useEffect(() => {
    const gltfLoader = new GLTFLoader();
    const blobUrl = URL.createObjectURL(
      new Blob([importFile], { type: "text.plain" }),
    );

    gltfLoader.load(blobUrl, gltf => {
      setModel(gltf.scene.children[0]);
    });
  }, [importFile]);

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

  const findSameCoordinate = (prevPoint, currentPoint, sameCoordinate) => {
    for (const prop in prevPoint) {
      if (!prevPoint.hasOwnProperty(prop)) continue;
      if (prevPoint[prop] === currentPoint[prop]) {
        return { [prop]: prevPoint[prop] };
      }
    }

    return sameCoordinate;
  };

  return (
    <>
      {/* {!model && <OriginPlanes />} */}
      <OriginPlanes />
      {activeFunction === "EXTRUDE" && (
        <Extrude model={model} setModel={setModel} />
      )}
      {activeFunction === "REVOLVE" && (
        <Revolve model={model} setModel={setModel} />
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

export default Model;
