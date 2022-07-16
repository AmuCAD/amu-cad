import { act, renderHook } from "@testing-library/react";
import ReactThreeTestRenderer from "@react-three/test-renderer";
import * as THREE from "three";

import useStore from "../store";
import Model from "../components/common/Model";

it("renders model mesh", async () => {
  const renderer = await ReactThreeTestRenderer.create(<Model />);
  const { result } = renderHook(() => useStore());

  const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
  const boxMaterial = new THREE.MeshBasicMaterial();
  const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);

  act(() => {
    result.current.setModels([boxMesh]);
  });

  const mesh = renderer.scene.children;

  expect(mesh.length).toBe(1);

  act(() => {
    result.current.setModels([]);
  });
});
