import { useState, useMemo } from "react";
import { Line, Plane } from "@react-three/drei";
import * as THREE from "three";
import { nanoid } from "nanoid";

import useStore from "../../../store";
import getPosition from "../../../utils/getPosition";
import useModal from "../../../hooks/useModal";
import getDistance from "../../../utils/getDistance";
import getCircleShape from "../../../utils/getCircleShape";

function CircleShape({ shapes, setShapes, setSelectedShapeId }) {
  const [baseCoordinate, setBaseCoordinate] = useStore(state => [
    state.baseCoordinate,
    state.setBaseCoordinate,
  ]);
  const [activeFunction, setActiveFunction] = useStore(state => [
    state.activeFunction,
    state.setActiveFunction,
  ]);
  const setExtrudeShape = useStore(state => state.setExtrudeShape);
  const [mouse, setMouse] = useState({});
  const [points, setPoints] = useState([]);

  const { showModal } = useModal();

  const key = baseCoordinate && Object.keys(baseCoordinate)[0];
  const value =
    baseCoordinate && baseCoordinate[Object.keys(baseCoordinate)[0]];

  const { position, rotation } = useMemo(() => {
    return baseCoordinate ? getPosition(key, value) : {};
  }, [baseCoordinate]);

  return (
    <>
      <Plane
        args={[100, 100]}
        onPointerMove={e => {
          if (activeFunction === "CIRCLE") {
            setMouse(e.point);
          }
        }}
        onClick={e => {
          if (activeFunction === "CIRCLE") {
            if (points[0]) {
              const id = nanoid();

              setShapes([
                ...shapes,
                <mesh
                  key={id}
                  position={position}
                  rotation={rotation}
                  onClick={() => {
                    setSelectedShapeId(id);
                    setExtrudeShape(
                      getCircleShape(
                        points,
                        key,
                        getDistance(points[0], Object.values(mouse)),
                      ),
                    );
                    showModal({ type: "EXTRUDE" });
                    setBaseCoordinate({ [key]: value });
                  }}
                >
                  <shapeBufferGeometry
                    attach="geometry"
                    args={[
                      getCircleShape(
                        points,
                        key,
                        getDistance(points[0], Object.values(mouse)),
                      ),
                      100,
                    ]}
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
            } else {
              setPoints([Object.values(e.point)]);
            }
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
                  points,
                  key,
                  getDistance(points[0], Object.values(mouse)),
                ),
                100,
              ]}
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

export default CircleShape;
