import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter";
import { STLExporter } from "three/examples/jsm/exporters/STLExporter";

import useStore from "../../../store";

function Exporter() {
  const setBlobUrl = useStore(state => state.setBlobUrl);
  const { scene } = useThree();
  const cloneScene = { ...scene };

  useEffect(() => {
    (async () => {
      const gltfJson = await convert(scene);
      const stlJson = new STLExporter().parse(scene);

      setBlobUrl({
        gltf: URL.createObjectURL(new Blob([gltfJson], { type: "text.plain" })),
        stl: URL.createObjectURL(new Blob([stlJson], { type: "text.plain" })),
      });
    })();
  }, [cloneScene]);

  const convert = scene => {
    return new Promise(res => {
      const exporter = new GLTFExporter();

      exporter.parse(
        scene,
        obj => {
          res(JSON.stringify(obj, null, 2));
        },
        { trs: true },
      );
    });
  };
}

export default Exporter;
