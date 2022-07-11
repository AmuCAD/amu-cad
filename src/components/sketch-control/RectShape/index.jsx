import { useState, useEffect, useMemo } from "react";
import { Plane } from "@react-three/drei";
import * as THREE from "three";
import { nanoid } from "nanoid";

import useStore from "../../../store";
import useModal from "../../../hooks/useModal";
import getPosition from "../../../utils/getPosition";
import manipulateCoords from "../../../utils/manipulateCoords";
import coordsToShape from "../../../utils/coordsToShape";
import rotateCoord from "../../../utils/rotateCoord";

function RectShape({ shapes, setShapes, setSelectedShapeId }) {
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
            const id = nanoid();

            if (points[0]) {
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

                    setSelectedShapeId(id);
                    setOperationShapes({
                      extrudeShape: coordsToShape(
                        manipulateCoords(points, key),
                      ),
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
            args={[coordsToShape(manipulateCoords(points, key))]}
          />
          <meshBasicMaterial
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
