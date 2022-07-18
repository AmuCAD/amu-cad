import { useState, useMemo } from "react";
import { Line, Plane } from "@react-three/drei";
import * as THREE from "three";
import { nanoid } from "nanoid";

import useStore from "../../../store";
import useModal from "../../../hooks/useModal";
import useShape from "../../../hooks/useShape";
import getPosition from "../../../utils/getPosition";
import getDistance from "../../../utils/getDistance";
import manipulateCoords from "../../../utils/manipulateCoords";
import getCircleShape from "../../../utils/getCircleShape";

function CircleShape({ setSelectedShapeId }) {
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

  return (
    <>
      <Plane
        args={[100, 100]}
        onPointerMove={e => {
          setMouse(e.point);
        }}
        onClick={e => {
          if (points[0]) {
            const id = nanoid();

            const handleShapeClick = () => {
              const operationData = {
                extrudeShape: getCircleShape(
                  manipulateCoords(points, base),
                  getDistance(points[0], Object.values(mouse)),
                ),
                revolveShape: getCircleShape(
                  [[0, 0, 0]],
                  getDistance(points[0], Object.values(mouse)),
                ),
                offset: points[0],
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
                  args={[
                    getCircleShape(
                      manipulateCoords(points, base),
                      getDistance(points[0], Object.values(mouse)),
                    ),
                    100,
                  ]}
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
        <>
          <Line points={[...points, Object.values(mouse)]} color="black" />
          <mesh position={position} rotation={rotation}>
            <shapeBufferGeometry
              attach="geometry"
              args={[
                getCircleShape(
                  manipulateCoords(points, base),
                  getDistance(points[0], Object.values(mouse)),
                ),
                100,
              ]}
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

export default CircleShape;
