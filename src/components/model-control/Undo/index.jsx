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

  const handleClick = () => {
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

  return <button onClick={handleClick}>되돌리기</button>;
}

export default Undo;
