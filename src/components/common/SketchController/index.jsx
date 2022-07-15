import useStore from "../../../store";
import useModal from "../../../hooks/useModal";
import Undo from "../../model-control/Undo";
import IconButton from "../../common/shared/IconButton";

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
        <img src="/images/icons/line.png" alt="이미지 없음" width="40px" />
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
        <img src="/images/icons/circle.png" alt="이미지 없음" width="40px" />
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
        <img src="/images/icons/rectangle.png" alt="이미지 없음" width="40px" />
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
                content: "삭제할 스케치를 선택하세요.",
              },
            });
          }
        }}
        isActive={activeFunction === "DELETE"}
      >
        <img src="/images/icons/delete.png" alt="이미지 없음" width="40px" />
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
        <img src="/images/icons/exit.png" alt="이미지 없음" width="40px" />
      </IconButton>
    </>
  );
}

export default SketchController;
