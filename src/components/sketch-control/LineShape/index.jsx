import { useState, useEffect, useMemo } from "react";
import { Line, Plane } from "@react-three/drei";
import * as THREE from "three";
import { nanoid } from "nanoid";

import useStore from "../../../store";
import useModal from "../../../hooks/useModal";
import getPosition from "../../../utils/getPosition";
import manipulateCoords from "../../../utils/manipulateCoords";
import coordsToShape from "../../../utils/coordsToShape";
import rotateCoord from "../../../utils/rotateCoord";
import getMeshCenter from "../../../utils/getMeshCenter";

function LineShape({ setSelectedShapeId }) {
  const [baseCoordinate, setBaseCoordinate] = useStore(state => [
    state.baseCoordinate,
    state.setBaseCoordinate,
  ]);
  const [shapes, setShapes] = useStore(state => [
    state.shapes,
    state.setShapes,
  ]);
  const setActiveFunction = useStore(state => state.setActiveFunction);
  const setOperationShapes = useStore(state => state.setOperationShapes);
  const [mouse, setMouse] = useState({});
  const [points, setPoints] = useState([]);

  const { showModal } = useModal();

  const [base, offset] = baseCoordinate
    ? Object.entries(baseCoordinate)[0]
    : [];

  const { position, rotation } = useMemo(() => {
    return baseCoordinate ? getPosition(base, offset) : {};
  }, [baseCoordinate, base, offset]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  const handleKeyDown = e => {
    if (e.key === "Escape" && points[0]) {
      const id = nanoid();

      const handleShapeClick = e => {
        const offset = Object.values(getMeshCenter(e.eventObject));
        const manipulatedCoords = manipulateCoords(points, base);
        const rotatedCoords = [];

        for (let i = 0; i < manipulatedCoords.length; i++) {
          rotatedCoords.push([
            ...rotateCoord(offset, manipulatedCoords[i], Math.PI / 2),
            manipulatedCoords[i][2],
          ]);
        }

        setSelectedShapeId(id);
        setOperationShapes({
          extrudeShape: coordsToShape(manipulateCoords(points, base)),
          revolveShape: coordsToShape(rotatedCoords, offset),
          offset: offset,
        });
        showModal({ type: "EXTRUDE" });
        setBaseCoordinate(baseCoordinate);
      };

      setShapes([
        ...shapes,
        <mesh
          key={id}
          position={position}
          rotation={rotation}
          onClick={handleShapeClick}
        >
          <shapeBufferGeometry
            attach="geometry"
            args={[coordsToShape(manipulateCoords(points, base))]}
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
  };

  return (
    <>
      <Plane
        args={[100, 100]}
        onPointerMove={e => {
          setMouse(e.point);
        }}
        onClick={e => {
          setPoints([...points, Object.values(e.point)]);
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
              args={[coordsToShape(manipulateCoords(points, base))]}
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
