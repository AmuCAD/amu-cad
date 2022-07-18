import useStore from "../store";

function useShape() {
  const [shapes, setShapes] = useStore(state => [
    state.shapes,
    state.setShapes,
  ]);
  const setActiveFunction = useStore(state => state.setActiveFunction);

  const addShape = newShape => {
    setShapes([...shapes, newShape]);
    setActiveFunction(null);
  };

  return { addShape };
}

export default useShape;
