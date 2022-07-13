import { useState, useEffect } from "react";

import LineShape from "../../sketch-control/LineShape";
import RectShape from "../../sketch-control/RectShape";
import CircleShape from "../../sketch-control/CircleShape";
import useStore from "../../../store";
import deleteById from "../../../utils/deleteById";

function Sketch() {
  const [shapes, setShapes] = useStore(state => [
    state.shapes,
    state.setShapes,
  ]);
  const isConfirm = useStore(state => state.isConfirm);
  const activeFunction = useStore(state => state.activeFunction);
  const [selectedShapeId, setSelectedShapeId] = useState("");

  useEffect(() => {
    if (isConfirm || activeFunction === "DELETE" && shapes[0]) {
      setShapes(deleteById(shapes, selectedShapeId));
    }
  }, [isConfirm, activeFunction, selectedShapeId]);

  return (
    <>
      {activeFunction === "LINE" && (
        <LineShape setSelectedShapeId={setSelectedShapeId} />
      )}
      {activeFunction === "RECT" && (
        <RectShape setSelectedShapeId={setSelectedShapeId} />
      )}
      {activeFunction === "CIRCLE" && (
        <CircleShape setSelectedShapeId={setSelectedShapeId} />
      )}
      {shapes}
    </>
  );
}

export default Sketch;
