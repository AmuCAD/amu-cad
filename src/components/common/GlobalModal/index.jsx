import ReactDom from "react-dom";

import useStore from "../../../store";
import InfoModal from "../InfoModal";

function GlobalModal() {
  const { type, props } = useStore(state => state.activeModal);

  if (type === "test") {
    return ReactDom.createPortal(
      <InfoModal>test</InfoModal>,
      document.getElementById("portal"),
    );
  }

  return null;
}

export default GlobalModal;
