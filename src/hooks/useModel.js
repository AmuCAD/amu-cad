import { useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { CSG } from "three-csg-ts";

import useStore from "../store";

function useModel() {
  const [models, setModels] = useStore(state => [
    state.models,
    state.setModels,
  ]);
  const operationType = useStore(state => state.operationType);
  const [dataToGetAngle, setDataToGetAngle] = useState([]);

  const importModel = file => {
    const gltfLoader = new GLTFLoader();
    const blobUrl = URL.createObjectURL(
      new Blob([file], { type: "text.plain" }),
    );

    gltfLoader.load(blobUrl, gltf => {
      setModels([...models, gltf.scene.children[0]]);
    });
  };

  const getSurfaceAngle = (prevPoint, mouse) => {
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
          return [Math.PI / 2 - angle, 0, 0];
        } else if (index === 4 || index === 7 || index === 10) {
          return [Math.PI / 2, angle, 0];
        } else if (index === 5 || index === 8 || index === 11) {
          return [0, angle - Math.PI / 2, 0];
        }
      }
    }
  };

  const updateModel = extrudeMesh => {
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
  };

  return { importModel, getSurfaceAngle, updateModel };
}

export default useModel;
