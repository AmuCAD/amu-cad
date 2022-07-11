import { useState, useMemo } from "react";
import { Line, Plane } from "@react-three/drei";
import * as THREE from "three";
import { nanoid } from "nanoid";

import useStore from "../../../store";
import useModal from "../../../hooks/useModal";
import getPosition from "../../../utils/getPosition";
import manipulateCoords from "../../../utils/manipulateCoords";
import coordsToShape from "../../../utils/coordsToShape";
import rotateCoord from "../../../utils/rotateCoord";

function LineShape({ shapes, setShapes, setSelectedShapeId }) {
  const [baseCoordinate, setBaseCoordinate] = useStore(state => [
    state.baseCoordinate,
    state.setBaseCoordinate,
  ]);
  const [activeFunction, setActiveFunction] = useStore(state => [
    state.activeFunction,
    state.setActiveFunction,
  ]);
  const setOperationShapes = useStore(state => state.setOperationShapes);
  const [mouse, setMouse] = useState({});
  const [points, setPoints] = useState([]);

  const { showModal } = useModal();

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
        <mesh
          key={id}
          position={position}
          rotation={rotation}
          onClick={e => {
            const box3 = new THREE.Box3().setFromObject(e.eventObject);
            const vector = new THREE.Vector3();

            box3.getCenter(vector);

            const offset = Object.values(vector);
            const manipulatedCoords = manipulateCoords(points, key);
            const rotatedCoords = [];

            for (let i = 0; i < manipulatedCoords.length; i++) {
              rotatedCoords.push([
                ...rotateCoord(offset, manipulatedCoords[i], Math.PI / 2),
                manipulatedCoords[i][2],
              ]);
            }

            box3.getCenter(vector);
            setSelectedShapeId(id);
            setOperationShapes({
              extrudeShape: coordsToShape(manipulateCoords(points, key)),
              revolveShape: coordsToShape(rotatedCoords, offset),
              offset: offset,
            });
            showModal({ type: "EXTRUDE" });
            setBaseCoordinate({ [key]: value });
          }}
        >
          <shapeBufferGeometry
            attach="geometry"
            args={[coordsToShape(manipulateCoords(points, key))]}
          />
          <meshBasicMaterial
            attach="material"
            color="red"
            side={THREE.DoubleSide}
          />
        </mesh>,
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
              args={[coordsToShape(manipulateCoords(points, key))]}
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
