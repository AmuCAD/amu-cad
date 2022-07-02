import UndoButton from "../UndoButton";
import RedoButton from "../RedoButton";
import SketchExitButton from "../../sketch-control/SketchExitButton";
import useStore from "../../../store";

function SketchController() {
  const [activeFunction, setActiveFunction] = useStore(state => [
    state.activeFunction,
    state.setActiveFunction,
  ]);

  return (
    <>
      <button
        onClick={() => {
          activeFunction === "LINE"
            ? setActiveFunction(null)
            : setActiveFunction("LINE");
        }}
      >
        {activeFunction === "LINE" ? "선(활)" : "선"}
      </button>
      <button
        onClick={() => {
          activeFunction === "CIRCLE"
            ? setActiveFunction(null)
            : setActiveFunction("CIRCLE");
        }}
      >
        {activeFunction === "CIRCLE" ? "원(활)" : "원"}
      </button>
      <button
        onClick={() => {
          activeFunction === "ARC"
            ? setActiveFunction(null)
            : setActiveFunction("ARC");
        }}
      >
        {activeFunction === "ARC" ? "호(활)" : "호"}
      </button>
      <button
        onClick={() => {
          activeFunction === "RECTANGLE"
            ? setActiveFunction(null)
            : setActiveFunction("RECTANGLE");
        }}
      >
        {activeFunction === "RECTANGLE" ? "직사각형(활)" : "직사각형"}
      </button>
      <button
        onClick={() => {
          activeFunction === "SIZE"
            ? setActiveFunction(null)
            : setActiveFunction("SIZE");
        }}
      >
        {activeFunction === "SIZE" ? "치수 수정(활)" : "치수 수정"}
      </button>
      <UndoButton />
      <RedoButton />
      <SketchExitButton />
    </>
  );
}

export default SketchController;
