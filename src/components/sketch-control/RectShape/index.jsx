import { useState, useEffect, useMemo } from "react";
import { Plane } from "@react-three/drei";
import * as THREE from "three";

import getPosition from "../../../utils/getPosition";
import coordsToShape from "../../../utils/coordsToShape";
import useStore from "../../../store";
import useModal from "../../../hooks/useModal";

function RectShape() {
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

  useEffect(() => {
    if (points[0]) {
      const [x, y, z] = points[0];

      setPoints([
        points[0],
        key === "y" ? [x, y, mouse.z] : [x, mouse.y, z],
        Object.values(mouse),
        key === "x" ? [x, y, mouse.z] : [mouse.x, y, z],
      ]);
    }
  }, [mouse]);

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
          if (activeFunction === "RECT") {
            setMouse(e.point);
          }
        }}
        onClick={e => {
          if (activeFunction === "RECT") {
            if (points[0]) {
              setShape(
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
      )}
      {shape}
    </>
  );
}

export default RectShape;
