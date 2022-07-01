import { useState } from "react";
import { Plane, Text } from "@react-three/drei";
import * as THREE from "three";

function VirtualPlane(props) {
  const [isHover, setHover] = useState(false);

  return (
    <Plane
      args={[10, 10]}
      rotation={props.rotation}
      onPointerEnter={e => {
        e.stopPropagation();
        setHover(true);
      }}
      onPointerLeave={e => {
        e.stopPropagation();
        setHover(false);
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
