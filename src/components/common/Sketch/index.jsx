import { useState, useEffect } from "react";

import LineShape from "../../sketch-control/LineShape";
import RectShape from "../../sketch-control/RectShape";
import CircleShape from "../../sketch-control/CircleShape";
import useStore from "../../../store";
import deleteById from "../../../utils/deleteById";

function Sketch() {
  const isConfirm = useStore(state => state.isConfirm);
  const activeFunction = useStore(state => state.activeFunction);
  const [shapes, setShapes] = useState([]);
  const [selectedShapeId, setSelectedShapeId] = useState("");

  useEffect(() => {
    if (isConfirm || activeFunction === "DELETE") {
      setShapes(deleteById(shapes, selectedShapeId));
    }
  }, [isConfirm, activeFunction, shapes, selectedShapeId]);

  return (
    <>
      {activeFunction === "LINE" && (
        <LineShape
          shapes={shapes}
          setShapes={setShapes}
          setSelectedShapeId={setSelectedShapeId}
        />
      )}
      {activeFunction === "RECT" && (
        <RectShape
          shapes={shapes}
          setShapes={setShapes}
          setSelectedShapeId={setSelectedShapeId}
        />
      )}
      {activeFunction === "CIRCLE" && (
        <CircleShape
          shapes={shapes}
          setShapes={setShapes}
          setSelectedShapeId={setSelectedShapeId}
        />
      )}
      {shapes}
    </>
  );
}

export default Sketch;
