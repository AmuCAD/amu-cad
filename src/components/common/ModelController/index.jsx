import UndoButton from "../UndoButton";
import RedoButton from "../RedoButton";
import ImportButton from "../../model-control/ImportButton";
import SaveButton from "../../model-control/SaveButton";
import StlExportButton from "../../model-control/StlExportButton";
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
  const setExtrudeShape = useStore(state => state.setExtrudeShape);

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

          setExtrudeShape(null);
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

          setIsSketchMode(false);
        }}
      >
        {activeFunction === "REVOLVE" ? "회전(활)" : "회전"}
      </button>
      <UndoButton />
      <RedoButton />
      <ImportButton />
      <SaveButton />
      <StlExportButton />
    </>
  );
}

export default ModelController;
