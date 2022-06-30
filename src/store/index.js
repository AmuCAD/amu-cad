import create from "zustand";
import { devtools } from "zustand/middleware";

const useStore = create(
  devtools(set => ({
    isSketchMode: false,
    changeWorkMode: () => set(state => ({ isSketchMode: !state.isSketchMode })),
  })),
);

export default useStore;
