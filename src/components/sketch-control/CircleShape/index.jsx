import { useState, useEffect } from "react";
import { Line, Plane } from "@react-three/drei";
import * as THREE from "three";

import useStore from "../../../store";
import getBasePosition from "../../../utils/getBasePosition";
import useModal from "../../../hooks/useModal";
import getDistance from "../../../utils/getDistance";
import getCircleShape from "../../../utils/getCircleShape";

function CircleShape() {
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
              setShape(
                <mesh
                  position={position}
                  rotation={rotation}
                  onClick={() => {
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
              );
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
      {shape}
    </>
  );
}

export default CircleShape;
