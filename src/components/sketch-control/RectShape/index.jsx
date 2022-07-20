import { useState, useEffect, useMemo } from "react";
import { Plane } from "@react-three/drei";
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

function RectShape({ setSelectedShapeId }) {
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

  useEffect(() => {
    if (points[0]) {
      const [x, y, z] = points[0];

      setPoints([
        points[0],
        base === "y" ? [x, y, mouse.z] : [x, mouse.y, z],
        Object.values(mouse),
        base === "x" ? [x, y, mouse.z] : [mouse.x, y, z],
      ]);
    }
  }, [points, base, mouse]);

  const { position, rotation } = useMemo(() => {
    return baseCoordinate ? getPosition(base, offset) : {};
  }, [baseCoordinate, base, offset]);

  return (
    <>
      <Plane
        args={[100, 100]}
        onPointerMove={e => {
          setMouse(e.point);
        }}
        onClick={e => {
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

          if (points[0]) {
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
          } else {
            setPoints([Object.values(e.point)]);
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
      )}
    </>
  );
}

export default RectShape;
