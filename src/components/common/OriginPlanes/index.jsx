import VirtualPlane from "../VirtualPlane";

function OriginPlanes() {
  return (
    <>
      <VirtualPlane
        rotation={[0, 0, 0]}
        text="XY"
        frontTextPosition={[3.7, 4, 0.01]}
        frontTextRotation={[0, 0, 0]}
        backTextPosition={[-3.7, 4, -0.01]}
        backTextRotation={[0, Math.PI, 0]}
      />
      <VirtualPlane
        rotation={[Math.PI / 2, 0, 0]}
        text="XZ"
        frontTextPosition={[3.7, -4, -0.01]}
        frontTextRotation={[Math.PI, 0, 0]}
        backTextPosition={[-3.7, -4, 0.01]}
        backTextRotation={[0, 0, Math.PI]}
      />
      <VirtualPlane
        rotation={[0, Math.PI / 2, 0]}
        text="YZ"
        frontTextPosition={[3.7, 4, 0.01]}
        frontTextRotation={[0, 0, 0]}
        backTextPosition={[-3.7, 4, -0.01]}
        backTextRotation={[0, Math.PI, 0]}
      />
    </>
  );
}

export default OriginPlanes;
