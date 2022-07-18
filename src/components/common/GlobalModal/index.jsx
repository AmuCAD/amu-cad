import ReactDom from "react-dom";

import useStore from "../../../store";
import InfoModal from "../InfoModal";
import ExtrudeModal from "../ExtrudeModal";
import GuideModal from "../GuideModal";

function GlobalModal() {
  const { type, props } = useStore(state => state.activeModal);

  switch (type) {
    case "INFO":
      return ReactDom.createPortal(
        <InfoModal>{props.content}</InfoModal>,
        document.getElementById("portal"),
      );
    case "EXTRUDE":
      return ReactDom.createPortal(
        <ExtrudeModal />,
        document.getElementById("portal"),
      );
    case "GUIDE":
      return ReactDom.createPortal(
        <GuideModal />,
        document.getElementById("portal"),
      );
    default:
      return null;
  }
}

export default GlobalModal;
