import styled from "styled-components";

import useStore from "../../../store";
import useModal from "../../../hooks/useModal";
import ModelController from "../ModelController";
import SketchController from "../SketchController";
import IconImg from "../shared/IconImg";

import helpIcon from "../../../assets/icons/help.png";

function ControlPanel() {
  const isSketchMode = useStore(state => state.isSketchMode);
  const baseCoordinate = useStore(state => state.baseCoordinate);

  const { showModal } = useModal();

  return (
    <>
      <Container
        halfSize={isSketchMode && baseCoordinate ? "-160px" : "-208px"}
      >
        {isSketchMode && baseCoordinate ? (
          <SketchController />
        ) : (
          <ModelController />
        )}
      </Container>
      <HelpButton
        onClick={() => {
          showModal({ type: "HELP" });
        }}
        isActive={false}
      >
        <IconImg src={helpIcon} alt="이미지 없음" />
      </HelpButton>
    </>
  );
}

const Container = styled.div`
  position: absolute;
  left: 50%;
  margin-top: 10px;
  margin-left: ${props => props.halfSize};
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
