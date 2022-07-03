import useStore from "../store";

export default function useModal() {
  const setActiveModal = useStore(state => state.setActiveModal);

  const showModal = ({ type, props }) => {
    setActiveModal({ type, props });
  };

  const hideModal = () => {
    setActiveModal({});
  };

  return {
    showModal,
    hideModal,
  };
}
