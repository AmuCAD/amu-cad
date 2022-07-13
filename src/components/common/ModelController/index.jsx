import useStore from "../../../store";
import useModal from "../../../hooks/useModal";
import Importer from "../../model-control/Importer";
import Exporter from "../../model-control/Exporter";
import Undo from "../../model-control/Undo";
import IconButton from "../../common/shared/IconButton";
import IconImg from "../shared/IconImg";

import sketchIcon from "../../../assets/icons/sketch.png";
import extrudeIcon from "../../../assets/icons/extrude.png";
import revolveIcon from "../../../assets/icons/revolve.png";
import originIcon from "../../../assets/icons/origin.png";

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
  const setOperationShapes = useStore(state => state.setOperationShapes);

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
        <IconImg src={sketchIcon} alt="이미지 없음" />
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

          setOperationShapes(null);
          setIsSketchMode(false);
        }}
        isActive={activeFunction === "EXTRUDE"}
      >
        <IconImg src={extrudeIcon} alt="이미지 없음" />
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

            setOperationShapes(null);
            setIsSketchMode(false);
          }
        }}
        isActive={activeFunction === "REVOLVE"}
      >
        <IconImg src={revolveIcon} alt="이미지 없음" />
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
        <IconImg src={originIcon} alt="이미지 없음" />
      </IconButton>
      <Importer />
      <Exporter format={"gltf"} />
      <Exporter format={"stl"} />
    </>
  );
}

export default ModelController;
