import create from "zustand";
import { devtools } from "zustand/middleware";

const useStore = create(
  devtools(set => ({
    baseCoordinate: null,
    setBaseCoordinate: coordinate =>
      set(() => ({ baseCoordinate: coordinate })),
    isSketchMode: false,
    setIsSketchMode: boolean => set(() => ({ isSketchMode: boolean })),
    activeFunction: null,
    setActiveFunction: functionName =>
      set(() => ({ activeFunction: functionName })),
    activeModal: {},
    setActiveModal: ({ type, props }) =>
      set(() => ({ activeModal: { type, props } })),
    operationShapes: null,
    setOperationShapes: shapes => set(() => ({ operationShapes: shapes })),
    extrudeSize: 0,
    setExtrudeSize: size => set(() => ({ extrudeSize: size })),
    isConfirm: false,
    setIsConfirm: boolean => set(() => ({ isConfirm: boolean })),
    operationType: "UNION",
    setOperationType: type => set(() => ({ operationType: type })),
    model: null,
    setModel: mesh => set(() => ({ model: mesh })),
    blobUrl: null,
    setImportFile: file => set(() => ({ importFile: file })),
    isForwardDirection: true,
    setIsForwardDirection: () =>
      set(state => ({ isForwardDirection: !state.isForwardDirection })),
  })),
);

export default useStore;
