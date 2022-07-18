import useStore from "../../../store";
import useModal from "../../../hooks/useModal";
import Importer from "../../model-control/Importer";
import Exporter from "../../model-control/Exporter";
import Undo from "../../model-control/Undo";
import IconButton from "../../common/shared/IconButton";

function ModelController() {
  const [isSketchMode, setIsSketchMode] = useStore(state => [
    state.isSketchMode,
    state.setIsSketchMode,
  ]);
  const [activeFunction, setActiveFunction] = useStore(state => [
    state.activeFunction,
    state.setActiveFunction,
  ]);
  const [isOriginPlanesOn, setIsOriginPlanesOn] = useStore(state => [
    state.isOriginPlanesOn,
    state.setIsOriginPlanesOn,
  ]);
  const setBaseCoordinate = useStore(state => state.setBaseCoordinate);
  const setOperationData = useStore(state => state.setOperationData);

  const { showModal, hideModal } = useModal();

  return (
    <>
      <IconButton
        onClick={() => {
          if (isSketchMode) {
            setIsSketchMode(false);
            hideModal();
          } else {
            setIsSketchMode(true);
            showModal({
              type: "INFO",
              props: {
                content: "수직이나 수평의 작업 평면을 선택하세요. ",
              },
            });
          }

          setActiveFunction(null);
          setBaseCoordinate(null);
        }}
        isActive={isSketchMode}
      >
        <img src="/images/icons/sketch.png" alt="이미지 없음" width="40px" />
      </IconButton>
      <IconButton
        onClick={() => {
          if (activeFunction === "EXTRUDE") {
            setActiveFunction(null);
            hideModal();
          } else {
            setActiveFunction("EXTRUDE");
            showModal({
              type: "INFO",
              props: {
                content: "돌출할 스케치를 선택하세요. ",
              },
            });
          }

          setOperationData(null);
          setIsSketchMode(false);
        }}
        isActive={activeFunction === "EXTRUDE"}
      >
        <img src="/images/icons/extrude.png" alt="이미지 없음" width="40px" />
      </IconButton>
      <IconButton
        onClick={() => {
          if (activeFunction === "REVOLVE") {
            setActiveFunction(null);
            hideModal();
          } else {
            setActiveFunction("REVOLVE");
            showModal({
              type: "INFO",
              props: {
                content: "회전 돌출할 스케치를 선택하세요. ",
              },
            });

            setOperationData(null);
            setIsSketchMode(false);
          }
        }}
        isActive={activeFunction === "REVOLVE"}
      >
        <img src="/images/icons/revolve.png" alt="이미지 없음" width="40px" />
      </IconButton>
      <Undo isModel={true} />
      <IconButton
        onClick={() => {
          isOriginPlanesOn
            ? setIsOriginPlanesOn(false)
            : setIsOriginPlanesOn(true);
        }}
        isActive={isOriginPlanesOn}
      >
        <img src="/images/icons/origin.png" alt="이미지 없음" width="40px" />
      </IconButton>
      <Importer />
      <Exporter format={"gltf"} />
      <Exporter format={"stl"} />
    </>
  );
}

export default ModelController;
