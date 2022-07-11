import UndoButton from "../UndoButton";
import Import from "../../model-control/Import";
import Save from "../../model-control/Save";
import useStore from "../../../store";

function ModelController() {
  const [isSketchMode, setIsSketchMode] = useStore(state => [
    state.isSketchMode,
    state.setIsSketchMode,
  ]);
  const [activeFunction, setActiveFunction] = useStore(state => [
    state.activeFunction,
    state.setActiveFunction,
  ]);
  const setBaseCoordinate = useStore(state => state.setBaseCoordinate);
  const setOperationShapes = useStore(state => state.setOperationShapes);

  return (
    <>
      <button
        onClick={() => {
          isSketchMode ? setIsSketchMode(false) : setIsSketchMode(true);

          setActiveFunction(null);
          setBaseCoordinate(null);
        }}
      >
        {isSketchMode ? "스케치 시작(활)" : "스케치 시작"}
      </button>
      <button
        onClick={() => {
          activeFunction === "EXTRUDE"
            ? setActiveFunction(null)
            : setActiveFunction("EXTRUDE");

          setOperationShapes(null);
          setIsSketchMode(false);
        }}
      >
        {activeFunction === "EXTRUDE" ? "돌출(활)" : "돌출"}
      </button>
      <button
        onClick={() => {
          activeFunction === "REVOLVE"
            ? setActiveFunction(null)
            : setActiveFunction("REVOLVE");

          setOperationShapes(null);
          setIsSketchMode(false);
        }}
      >
        {activeFunction === "REVOLVE" ? "회전(활)" : "회전"}
      </button>
      <UndoButton />
      <Import />
      <Save format={"gltf"} />
      <Save format={"stl"} />
    </>
  );
}

export default ModelController;
