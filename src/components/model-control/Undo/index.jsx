import useStore from "../../../store";

function Undo() {
  const [models, setModels] = useStore(state => [
    state.models,
    state.setModels,
  ]);

  const handleClick = () => {
    const copiedModels = models.slice();

    copiedModels.pop();
    setModels(copiedModels);
  };

  return <button onClick={handleClick}>되돌리기</button>;
}

export default Undo;
