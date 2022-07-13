import { useEffect } from "react";

import useStore from "../../../store";
import IconButton from "../../common/shared/IconButton";
import IconImg from "../../common/shared/IconImg";

import undoIcon from "../../../assets/icons/undo.png";

function Undo({ isModel }) {
  const [shapes, setShapes] = useStore(state => [
    state.shapes,
    state.setShapes,
  ]);
  const [models, setModels] = useStore(state => [
    state.models,
    state.setModels,
  ]);

  useEffect(() => {
    if (models.length === 6) {
      const targetList = models.slice();

      targetList.shift();
      setModels(targetList);
    }

    if (shapes.length === 16) {
      const targetList = shapes.slice();

      targetList.shift();
      setShapes(targetList);
    }
  }, [models, shapes]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  const deleteLatestObject = () => {
    if (isModel) {
      const targetList = models.slice();

      targetList.pop();
      setModels(targetList);
    } else {
      const targetList = shapes.slice();

      targetList.pop();
      setShapes(targetList);
    }
  };

  const handleKeyDown = e => {
    if (e.key === "z" && (e.ctrlKey || e.metaKey)) {
      deleteLatestObject();
    }
  };

  return (
    <IconButton onClick={deleteLatestObject} isActive={false}>
      <IconImg src={undoIcon} alt="이미지 없음" />
    </IconButton>
  );
}

export default Undo;
