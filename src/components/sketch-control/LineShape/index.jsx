import { useState, useEffect } from "react";
import { Line, Plane } from "@react-three/drei";
import * as THREE from "three";

import useStore from "../../../store";
import getBasePosition from "../../../utils/getBasePosition";
import useModal from "../../../hooks/useModal";

function LineShape() {
  const [baseCoordinate, setBaseCoordinate] = useStore(state => [
    state.baseCoordinate,
    state.setBaseCoordinate,
  ]);
  const [activeFunction, setActiveFunction] = useStore(state => [
    state.activeFunction,
    state.setActiveFunction,
  ]);
  const setExtrudeShape = useStore(state => state.setExtrudeShape);
  const isConfirm = useStore(state => state.isConfirm);
  const [mouse, setMouse] = useState({});
  const [linePoints, setLinePoints] = useState([]);
  const [lines, setLines] = useState([]);
  const { showModal } = useModal();

  useEffect(() => {
    if (isConfirm) {
      setLines([]);
    }
  }, [isConfirm]);

  const key = baseCoordinate && Object.keys(baseCoordinate)[0];
  const value =
    baseCoordinate && baseCoordinate[Object.keys(baseCoordinate)[0]];
  const { position, rotation } = baseCoordinate
    ? getBasePosition(baseCoordinate)
    : {};

  const coordsToShape = (coords, key) => {
    const shape = new THREE.Shape();
    const [x, y, z] = coords[0];

    switch (key) {
      case "x":
        shape.moveTo(z, y);

        for (const [x, y, z] of coords) {
          shape.lineTo(z, y);
        }

        return shape;

      case "y":
        shape.moveTo(x, z);

        for (const [x, y, z] of coords) {
          shape.lineTo(x, z);
        }

        return shape;

      default:
        shape.moveTo(x, y);

        for (const [x, y, z] of coords) {
          shape.lineTo(x, y);
        }

        return shape;
    }
  };

  document.addEventListener("keydown", e => {
    if (activeFunction === "LINE" && e.key === "Escape") {
      setMouse({});
      setActiveFunction(null);
      setLines([
        ...lines,
        <>
          <Line points={[...linePoints, Object.values(mouse)]} color="black" />
          <mesh
            position={position}
            rotation={rotation}
            onClick={() => {
              setExtrudeShape(coordsToShape(linePoints, key));
              showModal({ type: "EXTRUDE" });
              setBaseCoordinate({ [key]: value });
            }}
          >
            <shapeBufferGeometry
              attach="geometry"
              args={[coordsToShape(linePoints, key)]}
            />
            <meshBasicMaterial
              attach="material"
              color="red"
              side={THREE.DoubleSide}
            />
          </mesh>
        </>,
      ]);
      setLinePoints([]);
    }
  });

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
      {lines}
      {linePoints[0] && (
        <>
          <Line points={[...linePoints, Object.values(mouse)]} color="black" />
          <mesh position={position} rotation={rotation}>
            <shapeBufferGeometry
              attach="geometry"
              args={[coordsToShape(linePoints, key)]}
            />
            <meshBasicMaterial
              attach="material"
              color="red"
              side={THREE.DoubleSide}
            />
          </mesh>
        </>
      )}
    </>
  );
}

export default LineShape;
