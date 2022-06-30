import useStore from "../../../store";

function SketchStartButton() {
  const changeWorkMode = useStore(state => state.changeWorkMode);

  return (
    <button
      onClick={() => {
        changeWorkMode();
      }}
    >
      스케치 시작
    </button>
  );
}

export default SketchStartButton;
