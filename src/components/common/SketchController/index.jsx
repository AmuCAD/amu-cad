import useStore from "../../../store";
import useModal from "../../../hooks/useModal";
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

  const { showModal, hideModal } = useModal();

  return (
    <>
      <IconButton
        onClick={() => {
          if (activeFunction === "LINE") {
            setActiveFunction(null);
            hideModal();
          } else {
            setActiveFunction("LINE");
            showModal({
              type: "INFO",
              props: {
                content:
                  "연속선을 생성하여 다각형을 스케치 하세요.\nESC를 입력하여 스케치를 종료할 수 있습니다.",
              },
            });
          }
        }}
        isActive={activeFunction === "LINE"}
      >
        <IconImg src={lineIcon} alt="이미지 없음" />
      </IconButton>
      <IconButton
        onClick={() => {
          if (activeFunction === "CIRCLE") {
            setActiveFunction(null);
            hideModal();
          } else {
            setActiveFunction("CIRCLE");
            showModal({
              type: "INFO",
              props: {
                content: "원의 중심과 끝점을 지정하여 원을 스케치 하세요.",
              },
            });
          }
        }}
        isActive={activeFunction === "CIRCLE"}
      >
        <IconImg src={circleIcon} alt="이미지 없음" />
      </IconButton>
      <IconButton
        onClick={() => {
          if (activeFunction === "RECT") {
            setActiveFunction(null);
            hideModal();
          } else {
            setActiveFunction("RECT");
            showModal({
              type: "INFO",
              props: {
                content:
                  "직사각형의 대각선 양 끝점을 지정하여 직사각형을 스케치 하세요.",
              },
            });
          }
        }}
        isActive={activeFunction === "RECT"}
      >
        <IconImg src={rectangleIcon} alt="이미지 없음" />
      </IconButton>
      <IconButton
        onClick={() => {
          if (activeFunction === "DELETE") {
            setActiveFunction(null);
            hideModal();
          } else {
            setActiveFunction("DELETE");
            showModal({
              type: "INFO",
              props: {
                content:
                  "삭제할 스케치를 선택하세요.",
              },
            });
          }
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
          hideModal();
        }}
        isActive={false}
      >
        <IconImg src={exitIcon} alt="이미지 없음" />
      </IconButton>
    </>
  );
}

export default SketchController;
