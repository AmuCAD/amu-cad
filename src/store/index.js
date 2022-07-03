import create from "zustand";
import { devtools } from "zustand/middleware";

const useStore = create(
  devtools(set => ({
    baseCoordinate: null,
    setBaseCoordinate: coordinate =>
      set(() => ({ baseCoordinate: coordinate, isSketchButtonActive: false })),
    activeFunction: null,
    setActiveFunction: functionName =>
      set(() => ({ activeFunction: functionName })),
    activeModal: {},
    setActiveModal: ({ type, props }) =>
      set(() => ({ activeModal: { type, props } })),
  })),
);

export default useStore;
