import { useState, useEffect } from "react";
import * as THREE from "three";

import useStore from "../../../store";
import useModel from "../../../hooks/useModel";
import Extrude from "../../model-control/Extrude";
import Revolve from "../../model-control/Revolve";
import SelectionHelper from "../SelectionHelper";
import getBaseCoordinate from "../../../utils/getBaseCoordinate";

function Model() {
  const [baseCoordinate, setBaseCoordinate] = useStore(state => [
    state.baseCoordinate,
    state.setBaseCoordinate,
  ]);
  const models = useStore(state => state.models);
  const activeFunction = useStore(state => state.activeFunction);
  const isSketchMode = useStore(state => state.isSketchMode);
  const importFile = useStore(state => state.importFile);
  const [mouse, setMouse] = useState(null);
  const [prevPoint, setPrevPoint] = useState(null);
  const [surfaceAngle, setSurfaceAngle] = useState([0, 0, 0]);

  const { importModel, getSurfaceAngle } = useModel();

  useEffect(() => {
    if (importFile) {
      importModel(importFile);
    }
  }, [importFile]);

  useEffect(() => {
    if (prevPoint && mouse) {
      setSurfaceAngle(getSurfaceAngle(prevPoint, mouse));
    }
  }, [prevPoint]);

  return (
    <>
      {activeFunction === "EXTRUDE" && <Extrude />}
      {activeFunction === "REVOLVE" && <Revolve />}
      {isSketchMode && !baseCoordinate && mouse && (
        <SelectionHelper mouse={mouse} angle={surfaceAngle} />
      )}
      {models[0] && (
        <primitive
          onPointerMove={e => {
            if (isSketchMode && !baseCoordinate) {
              e.stopPropagation();
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
              setBaseCoordinate(getBaseCoordinate(prevPoint, e.point));
            }
          }}
          object={models[models.length - 1]}
          material={
            new THREE.MeshStandardMaterial({
              color: "lightgrey",
              opacity: isSketchMode && baseCoordinate ? "0.3" : "1",
              side: THREE.DoubleSide,
              transparent: true,
            })
          }
        />
      )}
    </>
  );
}

export default Model;
