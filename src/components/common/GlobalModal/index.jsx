import ReactDom from "react-dom";

import useStore from "../../../store";
import InfoModal from "../InfoModal";
import ExtrudeModal from "../ExtrudeModal";

function GlobalModal() {
  const { type, props } = useStore(state => state.activeModal);

  if (type === "INFO") {
    return ReactDom.createPortal(
      <InfoModal>{props.content}</InfoModal>,
      document.getElementById("portal"),
    );
  }

  if (type === "EXTRUDE") {
    return ReactDom.createPortal(
      <ExtrudeModal>EXTRUDE</ExtrudeModal>,
      document.getElementById("portal"),
    );
  }

  if (type === "HELP") {
    return ReactDom.createPortal(
      <InfoModal>HELP</InfoModal>,
      document.getElementById("portal"),
    );
  }

  return null;
}

export default GlobalModal;
