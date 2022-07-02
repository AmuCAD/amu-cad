import { Line, Plane } from "@react-three/drei";
import { useState } from "react";
import * as THREE from "three";

import useStore from "../../../store";

function Lines() {
  const baseCoordinate = useStore(state => state.baseCoordinate);
  const [activeFunction, setActiveFunction] = useStore(state => [
    state.activeFunction,
    state.setActiveFunction,
  ]);
  const [mouse, setMouse] = useState({});
  const [linePoints, setLinePoints] = useState([]);

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") {
      setMouse({});
      setActiveFunction(null);
    }
  });

  const getBasePosition = baseCoordinate => {
    const key = Object.keys(baseCoordinate)[0];
    const value = baseCoordinate[Object.keys(baseCoordinate)[0]];
    const result = {};

    switch (key) {
      case "x":
        result.position = [value, 0, 0];
        result.rotation = [0, Math.PI / 2, 0];
        break;
      case "y":
        result.position = [0, value, 0];
        result.rotation = [-Math.PI / 2, 0, 0];
        break;
      default:
        result.position = [0, 0, value];
        result.rotation = [0, 0, -Math.PI / 2];
        break;
    }

    return result;
  };

  const { position, rotation } = baseCoordinate
    ? getBasePosition(baseCoordinate)
    : {};

  return (
    <>
      <Plane
        args={[100, 100]}
        onPointerMove={e => {
          if (activeFunction === "LINE") {
            setMouse(e.point);
          }
        }}
        onClick={e => {
          if (activeFunction === "LINE") {
            setLinePoints([...linePoints, Object.values(e.point)]);
          }
        }}
        position={position}
        rotation={rotation}
      >
        <meshStandardMaterial
          attach="material"
          opacity={0}
          transparent
          side={THREE.DoubleSide}
        />
      </Plane>
      {linePoints.length > 0 && (
        <Line points={[...linePoints, Object.values(mouse)]} color="black" />
      )}
    </>
  );
}

export default Lines;
