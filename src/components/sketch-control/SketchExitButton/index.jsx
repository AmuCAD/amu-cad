import useStore from "../../../store";

function SketchExitButton() {
  const setIsSketchMode = useStore(state => state.setIsSketchMode);
  const setBaseCoordinate = useStore(state => state.setBaseCoordinate);

  return (
    <button
      onClick={() => {
        setBaseCoordinate(null);
        setIsSketchMode();
      }}
    >
      스케치 종료
    </button>
  );
}

export default SketchExitButton;
