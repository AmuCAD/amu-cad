import useStore from "../../../store";
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

  return (
    <>
      <IconButton
        onClick={() => {
          isSketchMode ? setIsSketchMode(false) : setIsSketchMode(true);

          setActiveFunction(null);
          setBaseCoordinate(null);
        }}
        isActive={isSketchMode}
      >
        <IconImg src={sketchIcon} alt="이미지 없음" />
      </IconButton>
      <IconButton
        onClick={() => {
          activeFunction === "EXTRUDE"
            ? setActiveFunction(null)
            : setActiveFunction("EXTRUDE");

          setOperationShapes(null);
          setIsSketchMode(false);
        }}
        isActive={activeFunction === "EXTRUDE"}
      >
        <IconImg src={extrudeIcon} alt="이미지 없음" />
      </IconButton>
      <IconButton
        onClick={() => {
          activeFunction === "REVOLVE"
            ? setActiveFunction(null)
            : setActiveFunction("REVOLVE");

          setOperationShapes(null);
          setIsSketchMode(false);
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
