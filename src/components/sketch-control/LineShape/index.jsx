import { useState, useEffect } from "react";
import { Line, Plane } from "@react-three/drei";
import * as THREE from "three";

import useStore from "../../../store";
import getBasePosition from "../../../utils/getBasePosition";
import coordsToShape from "../../../utils/coordsToShape";
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
  const [points, setPoints] = useState([]);
  const [shape, setShape] = useState(null);

  const { showModal } = useModal();

  useEffect(() => {
    if (isConfirm) {
      setShape(null);
    }
  }, [isConfirm]);

  const key = baseCoordinate && Object.keys(baseCoordinate)[0];
  const value =
    baseCoordinate && baseCoordinate[Object.keys(baseCoordinate)[0]];
  const { position, rotation } = baseCoordinate
    ? getBasePosition(baseCoordinate)
    : {};

  document.addEventListener("keydown", e => {
    if (activeFunction === "LINE" && e.key === "Escape") {
      setMouse({});
      setActiveFunction(null);
      setShape(
        <>
          <mesh
            position={position}
            rotation={rotation}
            onClick={() => {
              setExtrudeShape(coordsToShape(points, key));
              showModal({ type: "EXTRUDE" });
              setBaseCoordinate({ [key]: value });
            }}
          >
            <shapeBufferGeometry
              attach="geometry"
              args={[coordsToShape(points, key)]}
            />
            <meshBasicMaterial
              attach="material"
              color="red"
              side={THREE.DoubleSide}
            />
          </mesh>
        </>,
      );
      setPoints([]);
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
            setPoints([...points, Object.values(e.point)]);
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
      {points[0] && (
        <>
          <Line points={[...points, Object.values(mouse)]} color="black" />
          <mesh position={position} rotation={rotation}>
            <shapeBufferGeometry
              attach="geometry"
              args={[coordsToShape(points, key)]}
            />
            <meshBasicMaterial
              attach="material"
              color="red"
              side={THREE.DoubleSide}
            />
          </mesh>
        </>
      )}
      {shape}
    </>
  );
}

export default LineShape;
