import styled from "styled-components";

import useStore from "../../../store";
import useModal from "../../../hooks/useModal";
import ModelController from "../ModelController";
import SketchController from "../SketchController";

function ControlPanel() {
  const isSketchMode = useStore(state => state.isSketchMode);
  const baseCoordinate = useStore(state => state.baseCoordinate);

  const { showModal } = useModal();

  return (
    <>
      <Container>
        {isSketchMode && baseCoordinate ? (
          <SketchController />
        ) : (
          <ModelController />
        )}
      </Container>
      <HelpButton
        onClick={() => {
          showModal({ type: "GUIDE" });
        }}
        isActive={false}
      >
        <img src="/images/icons/help.png" alt="이미지 없음" width="40px" />
      </HelpButton>
    </>
  );
}

const Container = styled.div`
  position: absolute;
  left: 50%;
  margin-top: 10px;
  transform: translate(-50%, 0);
  z-index: 999;
`;

const HelpButton = styled.button`
  position: absolute;
  right: 10px;
  margin-top: 10px;
  border: 0;
  background-color: rgba(255, 255, 255, 0);
  cursor: pointer;
  z-index: 999;

  &:hover {
    opacity: 0.8;
  }
`;

export default ControlPanel;
