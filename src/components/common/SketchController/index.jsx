import useStore from "../../../store";
import Undo from "../../model-control/Undo";
import IconButton from "../../common/shared/IconButton";
import IconImg from "../shared/IconImg";

import lineIcon from "../../../assets/icons/line.png";
import circleIcon from "../../../assets/icons/circle.png";
import rectangleIcon from "../../../assets/icons/rectangle.png";
import deleteIcon from "../../../assets/icons/delete.png";
import exitIcon from "../../../assets/icons/exit.png";

function SketchController() {
  const setIsSketchMode = useStore(state => state.setIsSketchMode);
  const [activeFunction, setActiveFunction] = useStore(state => [
    state.activeFunction,
    state.setActiveFunction,
  ]);
  const setBaseCoordinate = useStore(state => state.setBaseCoordinate);

  return (
    <>
      <IconButton
        onClick={() => {
          activeFunction === "LINE"
            ? setActiveFunction(null)
            : setActiveFunction("LINE");
        }}
        isActive={activeFunction === "LINE"}
      >
        <IconImg src={lineIcon} alt="이미지 없음" />
      </IconButton>
      <IconButton
        onClick={() => {
          activeFunction === "CIRCLE"
            ? setActiveFunction(null)
            : setActiveFunction("CIRCLE");
        }}
        isActive={activeFunction === "CIRCLE"}
      >
        <IconImg src={circleIcon} alt="이미지 없음" />
      </IconButton>
      <IconButton
        onClick={() => {
          activeFunction === "RECT"
            ? setActiveFunction(null)
            : setActiveFunction("RECT");
        }}
        isActive={activeFunction === "RECT"}
      >
        <IconImg src={rectangleIcon} alt="이미지 없음" />
      </IconButton>
      <IconButton
        onClick={() => {
          activeFunction === "DELETE"
            ? setActiveFunction(null)
            : setActiveFunction("DELETE");
        }}
        isActive={activeFunction === "DELETE"}
      >
        <IconImg src={deleteIcon} alt="이미지 없음" />
      </IconButton>
      <Undo />
      <IconButton
        onClick={() => {
          setIsSketchMode(false);
          setActiveFunction(null);
          setBaseCoordinate(null);
        }}
        isActive={false}
      >
        <IconImg src={exitIcon} alt="이미지 없음" />
      </IconButton>
    </>
  );
}

export default SketchController;
