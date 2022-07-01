import create from "zustand";
import { devtools } from "zustand/middleware";

const useStore = create(
  devtools(set => ({
    isSketchButtonActive: false,
    setIsSketchButtonActive: () =>
      set(state => ({ isSketchButtonActive: !state.isSketchButtonActive })),
    isSketchMode: false,
    setIsSketchMode: () =>
      set(state => ({ isSketchMode: !state.isSketchMode })),
    baseCoordinate: null,
    setBaseCoordinate: (coordinate) =>
      set(() => ({ baseCoordinate: coordinate })),
  })),
);

export default useStore;
