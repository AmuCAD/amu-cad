import { useEffect } from "react";

import useStore from "../../../store";
import IconButton from "../../common/shared/IconButton";

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
  }, [models]);

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
      <img src="/images/icons/undo.png" alt="이미지 없음" width="40px" />
    </IconButton>
  );
}

export default Undo;
