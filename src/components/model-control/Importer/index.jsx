import { useRef } from "react";
import useStore from "../../../store";

function Importer() {
  const setImportFile = useStore(state => state.setImportFile);
  const ref = useRef(null);

  return (
    <>
      <label htmlFor="input-file">불러오기</label>
      <input
        type="file"
        id="input-file"
        style={{ display: "none" }}
        ref={ref}
        onChange={() => {
          setImportFile(ref.current?.files[0]);
        }}
        accept=".gltf"
      />
    </>
  );
}

export default Importer;
