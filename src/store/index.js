import create from "zustand";
import { devtools } from "zustand/middleware";

const useStore = create(
  devtools(set => ({
    baseCoordinate: null,
    setBaseCoordinate: coordinate =>
      set(() => ({ baseCoordinate: coordinate })),
    isSketchMode: false,
    setIsSketchMode: boolean =>
      set(() => ({ isSketchMode: boolean })),
    activeFunction: null,
    setActiveFunction: functionName =>
      set(() => ({ activeFunction: functionName })),
    activeModal: {},
    setActiveModal: ({ type, props }) =>
      set(() => ({ activeModal: { type, props } })),
    extrudeShape: null,
    setExtrudeShape: shape =>
      set(() => ({ extrudeShape: shape })),
  })),
);

export default useStore;
