import useStore from "../../../store";

function Save({ format }) {
  const blobUrl = useStore(state => state.blobUrl);
  const filename = `scene.${format}`;

  const downloadFile = (url, filename) => {
    const link = document.createElement("a");

    link.href = url;
    link.download = filename;
    link.click();
  };

  return (
    <button
      onClick={() => {
        downloadFile(blobUrl[format], filename);
      }}
    >
      {format} 저장
    </button>
  );
}

export default Save;
