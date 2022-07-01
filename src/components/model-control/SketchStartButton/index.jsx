import useStore from "../../../store";

function SketchStartButton() {
  const [isSketchButtonActive, setIsSketchButtonActive] = useStore(state => [
    state.isSketchButtonActive,
    state.setIsSketchButtonActive,
  ]);
  const setIsSketchMode = useStore(state => state.setIsSketchMode);
  const baseCoordinate = useStore(state => state.baseCoordinate);

  if (baseCoordinate) {
    setIsSketchButtonActive();
    setIsSketchMode();
  }

  return (
    <button
      onClick={() => {
        setIsSketchButtonActive();
      }}
    >
      {isSketchButtonActive ? "스케치 시작(활)" : "스케치 시작"}
    </button>
  );
}

export default SketchStartButton;
