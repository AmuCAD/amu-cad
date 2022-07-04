import { useState } from "react";

import useStore from "../../../store";
import Extrude from "../../model-control/Extrude";

function Model() {
  const isSketchMode = useStore(state => state.isSketchMode);
  const [baseCoordinate, setBaseCoordinate] = useStore(state => [
    state.baseCoordinate,
    state.setBaseCoordinate,
  ]);
  const [faceCount, setFaceCount] = useState(0);
  const [faceIndex, setFaceIndex] = useState(null);
  const [prevPoint, setPrevPoint] = useState(null);
  const [sameCoordinate, setSameCoordinate] = useState(null);

  const generateMaterials = (faceCount, faceIndex) => {
    const materials = [];

    for (let i = 0; i < faceCount; i++) {
      materials.push(
        <meshStandardMaterial
          key={i}
          attach={`material-${i}`}
          color={
            i === faceIndex && isSketchMode && !baseCoordinate
              ? "black"
              : "white"
          }
        />,
      );
    }

    return materials;
  };

  const findSameCoordinate = (prevPoint, currentPoint, sameCoordinate) => {
    for (const prop in prevPoint) {
      if (!prevPoint.hasOwnProperty(prop)) continue;
      if (prevPoint[prop] === currentPoint[prop]) {
        return { [prop]: prevPoint[prop] };
      }
    }

    return sameCoordinate;
  };

  return (
    <>
      <mesh
        position={[0, 0, 0]}
        onPointerMove={e => {
          e.stopPropagation();
          setFaceCount(e.eventObject.geometry.groups.length);
          setFaceIndex(e.face.materialIndex);
          setSameCoordinate(
            findSameCoordinate(prevPoint, e.point, sameCoordinate),
          );
          setPrevPoint(e.point);
        }}
        onPointerOut={e => {
          e.stopPropagation();
          setFaceIndex(null);
        }}
        onClick={() => {
          setBaseCoordinate(sameCoordinate);
        }}
      >
        <boxBufferGeometry attach="geometry" args={[10, 10, 10]} />
        {generateMaterials(faceCount, faceIndex)}
      </mesh>
      <Extrude />
    </>
  );
}

export default Model;
