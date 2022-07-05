import useStore from "../../../store";

function SaveButton() {
  const blobUrl = useStore(state => state.blobUrl);
  const filename = "scene.gltf";

  return (
    <a href={blobUrl} download={filename}>
      저장
    </a>
  );
}

export default SaveButton;
