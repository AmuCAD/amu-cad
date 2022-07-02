import useStore from "../../../store";

function SketchExitButton() {
  const setBaseCoordinate = useStore(state => state.setBaseCoordinate);

  return (
    <button
      onClick={() => {
        setBaseCoordinate(null);
      }}
    >
      스케치 종료
    </button>
  );
}

export default SketchExitButton;
