import useStore from "../../../store";

function SketchExitButton() {
  const changeWorkMode = useStore(state => state.changeWorkMode);

  return (
    <button
      onClick={() => {
        changeWorkMode();
      }}
    >
      스케치 종료
    </button>
  );
}

export default SketchExitButton;
