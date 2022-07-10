import { useState, useEffect, useMemo } from "react";
import { Line, Plane } from "@react-three/drei";
import * as THREE from "three";
import { nanoid } from "nanoid";

import useStore from "../../../store";
import getPosition from "../../../utils/getPosition";
import coordsToShape from "../../../utils/coordsToShape";
import useModal from "../../../hooks/useModal";
import deleteByKey from "../../../utils/deleteByKey";

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
  const [shapes, setShapes] = useState([]);
  const [selectedShapeId, setSelectedShapeId] = useState("");

  const { showModal } = useModal();

  useEffect(() => {
    if (isConfirm || activeFunction === "DELETE") {
      setShapes(deleteByKey(shapes, selectedShapeId));
    }
  }, [isConfirm, selectedShapeId]);

  const key = baseCoordinate && Object.keys(baseCoordinate)[0];
  const value =
    baseCoordinate && baseCoordinate[Object.keys(baseCoordinate)[0]];

  const { position, rotation } = useMemo(() => {
    return baseCoordinate ? getPosition(key, value) : {};
  }, [baseCoordinate]);

  document.addEventListener("keydown", e => {
    if (activeFunction === "LINE" && e.key === "Escape" && points[0]) {
      const id = nanoid();

      setShapes([
        ...shapes,
        <>
          <mesh
            key={id}
            position={position}
            rotation={rotation}
            onClick={() => {
              setSelectedShapeId(id);
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
      ]);
      setMouse({});
      setPoints([]);
      setActiveFunction(null);
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
      {shapes}
    </>
  );
}

export default LineShape;
