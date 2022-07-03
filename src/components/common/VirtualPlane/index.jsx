import { useState } from "react";
import { Plane, Text } from "@react-three/drei";
import * as THREE from "three";

import useStore from "../../../store";

function VirtualPlane(props) {
  const activeFunction = useStore(state => state.activeFunction);
  const setBaseCoordinate = useStore(state => state.setBaseCoordinate);
  const [isHover, setHover] = useState(false);

  return (
    <Plane
      args={[10, 10]}
      rotation={props.rotation}
      onPointerMove={e => {
        if (activeFunction === "SKETCH") {
          e.stopPropagation();
          setHover(true);
        }
      }}
      onPointerOut={e => {
        e.stopPropagation();
        setHover(false);
      }}
      onClick={e => {
        if (activeFunction === "SKETCH") {
          e.stopPropagation();

          switch (props.text) {
            case "XY":
              setBaseCoordinate({ z: 0 });
              break;
            case "XZ":
              setBaseCoordinate({ y: 0 });
              break;
            default:
              setBaseCoordinate({ x: 0 });
          }
        }
      }}
    >
      <Text
        text={props.text}
        color="grey"
        position={props.frontTextPosition}
        fontSize={1}
        rotation={props.frontTextRotation}
      />
      <Text
        text={props.text}
        color="grey"
        position={props.backTextPosition}
        fontSize={1}
        rotation={props.backTextRotation}
      />
      <meshStandardMaterial
        attach="material"
        color={isHover ? "red" : "orange"}
        opacity={0.5}
        side={THREE.DoubleSide}
        transparent
      />
    </Plane>
  );
}

export default VirtualPlane;
