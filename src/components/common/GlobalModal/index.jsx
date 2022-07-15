import ReactDom from "react-dom";

import useStore from "../../../store";
import InfoModal from "../InfoModal";
import ExtrudeModal from "../ExtrudeModal";
import GuideModal from "../GuideModal";

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
      <ExtrudeModal />,
      document.getElementById("portal"),
    );
  }

  if (type === "GUIDE") {
    return ReactDom.createPortal(
      <GuideModal />,
      document.getElementById("portal"),
    );
  }

  return null;
}

export default GlobalModal;
