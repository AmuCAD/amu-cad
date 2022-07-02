import styled from "styled-components";

import ModelController from "../ModelController";
import SketchController from "../SketchController";
import useStore from "../../../store";

function ControlPanel() {
  const baseCoordinate = useStore(state => state.baseCoordinate);

  return (
    <Container>
      {baseCoordinate ? <SketchController /> : <ModelController />}
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  left: 50%;
  margin-left: -250px;
  z-index: 999;
`;

export default ControlPanel;
