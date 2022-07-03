import { useState } from "react";
import { Line, Plane } from "@react-three/drei";
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

  function coordsToShape(coords) {
    const shape = new THREE.Shape();
    const [x, y, z] = coords[0];

    shape.moveTo(x, y);

    for (const [x, y] of coords) {
      shape.lineTo(x, y);
    }

    return shape;
  }

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") {
      setMouse({});
      setActiveFunction(null);
    }
  });

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
      {linePoints[0] && (
        <Line points={[...linePoints, Object.values(mouse)]} color="black" />
      )}
      {linePoints[0] && (
        <mesh position={position}>
          <shapeBufferGeometry
            attach="geometry"
            args={[coordsToShape(linePoints)]}
          />
          <meshBasicMaterial
            attach="material"
            color="red"
            side={THREE.DoubleSide}
          />
        </mesh>
      )}
    </>
  );
}

export default Lines;
