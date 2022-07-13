import { useRef } from "react";

import useStore from "../../../store";
import useModal from "../../../hooks/useModal";
import IconButton from "../../common/shared/IconButton";
import IconImg from "../../common/shared/IconImg";

import importIcon from "../../../assets/icons/import.png";

function Importer() {
  const setImportFile = useStore(state => state.setImportFile);
  const ref = useRef(null);

  const { showModal } = useModal();

  return (
    <>
      <IconButton isActive={false}>
        <label htmlFor="input-file">
          <IconImg src={importIcon} alt="이미지 없음" />
        </label>
        <input
          type="file"
          id="input-file"
          style={{ display: "none" }}
          ref={ref}
          onChange={() => {
            setImportFile(ref.current?.files[0]);
          }}
          onClick={() => {
            showModal({
              type: "INFO",
              props: {
                content: "선택한 glTF 파일을 작업 공간에 가져옵니다.",
              },
            });
          }}
          accept=".gltf"
        />
      </IconButton>
    </>
  );
}

export default Importer;
