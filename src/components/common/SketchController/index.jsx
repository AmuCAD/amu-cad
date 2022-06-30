import LineDrawButton from "../../sketch-control/LineDrawButton";
import CircleDrawButton from "../../sketch-control/CircleDrawButton";
import ArcDrawButton from "../../sketch-control/ArcDrawButton";
import RectangleDrawButton from "../../sketch-control/RectangleDrawButton";
import SizeChangeButton from "../../sketch-control/SizeChangeButton";
import UndoButton from "../UndoButton";
import RedoButton from "../RedoButton";
import SketchExitButton from "../../sketch-control/SketchExitButton";

function SketchController() {
  return (
    <>
      <LineDrawButton />
      <CircleDrawButton />
      <ArcDrawButton />
      <RectangleDrawButton />
      <SizeChangeButton />
      <UndoButton />
      <RedoButton />
      <SketchExitButton />
    </>
  );
}

export default SketchController;
