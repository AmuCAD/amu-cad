import { useState, useEffect } from "react";

import LineShape from "../../sketch-control/LineShape";
import RectShape from "../../sketch-control/RectShape";
import CircleShape from "../../sketch-control/CircleShape";
import useStore from "../../../store";
import deleteByKey from "../../../utils/deleteByKey";

function Sketch() {
  const isConfirm = useStore(state => state.isConfirm);
  const activeFunction = useStore(state => state.activeFunction);
  const [shapes, setShapes] = useState([]);
  const [selectedShapeId, setSelectedShapeId] = useState("");

  useEffect(() => {
    if (isConfirm || activeFunction === "DELETE") {
      setShapes(deleteByKey(shapes, selectedShapeId));
    }
  }, [isConfirm, selectedShapeId]);

  return (
    <>
      <LineShape
        shapes={shapes}
        setShapes={setShapes}
        setSelectedShapeId={setSelectedShapeId}
      />
      <RectShape
        shapes={shapes}
        setShapes={setShapes}
        setSelectedShapeId={setSelectedShapeId}
      />
      <CircleShape
        shapes={shapes}
        setShapes={setShapes}
        setSelectedShapeId={setSelectedShapeId}
      />
      {shapes}
    </>
  );
}

export default Sketch;
