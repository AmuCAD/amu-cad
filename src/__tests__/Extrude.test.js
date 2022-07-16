import { act, renderHook } from "@testing-library/react";
import ReactThreeTestRenderer from "@react-three/test-renderer";

import useStore from "../store";
import coordsToShape from "../utils/coordsToShape";
import Extrude from "../components/model-control/Extrude";

it("renders extrude mesh", async () => {
  const renderer = await ReactThreeTestRenderer.create(<Extrude />);
  const { result } = renderHook(() => useStore());

  const extrudeShape = coordsToShape([
    [0, 0],
    [0, 1],
    [1, 1],
    [1, 0],
  ]);

  expect(renderer.scene.children.length).toBe(0);

  act(() => {
    result.current.setBaseCoordinate({ z: 0 });
    result.current.setOperationShapes({ extrudeShape: extrudeShape });
  });

  expect(renderer.scene.children.length).toBe(1);
});
