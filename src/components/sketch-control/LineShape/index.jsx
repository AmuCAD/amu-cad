import { useState, useEffect, useMemo } from "react";
import { Line, Plane } from "@react-three/drei";
import * as THREE from "three";
import { nanoid } from "nanoid";

import useStore from "../../../store";
import useModal from "../../../hooks/useModal";
import useShape from "../../../hooks/useShape";
import getPosition from "../../../utils/getPosition";
import manipulateCoords from "../../../utils/manipulateCoords";
import coordsToShape from "../../../utils/coordsToShape";
import rotateCoords from "../../../utils/rotateCoords";
import getMeshCenter from "../../../utils/getMeshCenter";

function LineShape({ setSelectedShapeId }) {
  const [baseCoordinate, setBaseCoordinate] = useStore(state => [
    state.baseCoordinate,
    state.setBaseCoordinate,
  ]);
  const setOperationData = useStore(state => state.setOperationData);
  const [mouse, setMouse] = useState({});
  const [points, setPoints] = useState([]);

  const { showModal } = useModal();
  const { addShape } = useShape();

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
        const offset = manipulateCoords(
          [getMeshCenter(e.eventObject)],
          base,
        )[0];
        const manipulatedCoords = manipulateCoords(points, base);
        const rotatedCoords = rotateCoords(
          offset,
          manipulatedCoords,
          Math.PI / 2,
        );

        const operationData = {
          extrudeShape: coordsToShape(manipulateCoords(points, base)),
          revolveShape: coordsToShape(rotatedCoords, offset),
          offset: offset,
        };

        setOperationData(operationData);
        setSelectedShapeId(id);
        showModal({ type: "EXTRUDE" });
        setBaseCoordinate(baseCoordinate);
      };

      addShape(
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
          <meshStandardMaterial
            attach="material"
            color="red"
            side={THREE.DoubleSide}
          />
        </mesh>,
      );
      setMouse({});
      setPoints([]);
    }
  };

  return (
    <>
      <Plane
        args={[100, 100]}
        onPointerMove={e => {
          setMouse(Object.values(e.point));
        }}
        onClick={() => {
          setPoints([...points, mouse]);
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
          <Line points={[...points, mouse]} color="black" />
          <mesh position={position} rotation={rotation}>
            <shapeBufferGeometry
              attach="geometry"
              args={[coordsToShape(manipulateCoords(points, base))]}
            />
            <meshStandardMaterial
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
