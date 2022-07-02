import create from "zustand";
import { devtools } from "zustand/middleware";

const useStore = create(
  devtools(set => ({
    isSketchButtonActive: false,
    setIsSketchButtonActive: () =>
      set(state => ({ isSketchButtonActive: !state.isSketchButtonActive })),
    baseCoordinate: null,
    setBaseCoordinate: coordinate =>
      set(() => ({ baseCoordinate: coordinate, isSketchButtonActive: false })),
  })),
);

export default useStore;
