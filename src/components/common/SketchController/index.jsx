import UndoButton from "../UndoButton";
import useStore from "../../../store";

function SketchController() {
  const setIsSketchMode = useStore(state => state.setIsSketchMode);
  const [activeFunction, setActiveFunction] = useStore(state => [
    state.activeFunction,
    state.setActiveFunction,
  ]);
  const setBaseCoordinate = useStore(state => state.setBaseCoordinate);

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
          activeFunction === "RECT"
            ? setActiveFunction(null)
            : setActiveFunction("RECT");
        }}
      >
        {activeFunction === "RECT" ? "직사각형(활)" : "직사각형"}
      </button>
      <button
        onClick={() => {
          activeFunction === "DELETE"
            ? setActiveFunction(null)
            : setActiveFunction("DELETE");
        }}
      >
        {activeFunction === "DELETE" ? "스케치 삭제(활)" : "스케치 삭제"}
      </button>
      <UndoButton />
      <button
        onClick={() => {
          setIsSketchMode(false);
          setActiveFunction(null);
          setBaseCoordinate(null);
        }}
      >
        스케치 종료
      </button>
    </>
  );
}

export default SketchController;
