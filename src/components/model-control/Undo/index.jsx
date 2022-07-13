import { useEffect } from "react";
import useStore from "../../../store";

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

  return <button onClick={deleteLatestObject}>되돌리기</button>;
}

export default Undo;
