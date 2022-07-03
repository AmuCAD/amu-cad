import UndoButton from "../UndoButton";
import RedoButton from "../RedoButton";
import ImportButton from "../../model-control/ImportButton";
import SaveButton from "../../model-control/SaveButton";
import StlExportButton from "../../model-control/StlExportButton";
import useStore from "../../../store";

function ModelController() {
  const [activeFunction, setActiveFunction] = useStore(state => [
    state.activeFunction,
    state.setActiveFunction,
  ]);

  return (
    <>
      <button
        onClick={() => {
          activeFunction === "SKETCH"
            ? setActiveFunction(null)
            : setActiveFunction("SKETCH");
        }}
      >
        {activeFunction === "SKETCH" ? "스케치 시작(활)" : "스케치 시작"}
      </button>
      <button
        onClick={() => {
          activeFunction === "EXTRUDE"
            ? setActiveFunction(null)
            : setActiveFunction("EXTRUDE");
        }}
      >
        {activeFunction === "EXTRUDE" ? "돌출(활)" : "돌출"}
      </button>
      <button
        onClick={() => {
          activeFunction === "REVOLVE"
            ? setActiveFunction(null)
            : setActiveFunction("REVOLVE");
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
