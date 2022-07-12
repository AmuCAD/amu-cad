import { useEffect } from "react";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter";
import { STLExporter } from "three/examples/jsm/exporters/STLExporter";

import useStore from "../../../store";

function Exporter() {
  const setBlobUrl = useStore(state => state.setBlobUrl);
  const model = useStore(state => state.model);

  useEffect(() => {
    (async () => {
      const gltfJson = await convert(model);
      const stlJson = new STLExporter().parse(model);

      setBlobUrl({
        gltf: URL.createObjectURL(new Blob([gltfJson], { type: "text.plain" })),
        stl: URL.createObjectURL(new Blob([stlJson], { type: "text.plain" })),
      });
    })();
  }, [model]);

  const convert = mesh => {
    return new Promise(res => {
      const exporter = new GLTFExporter();

      exporter.parse(
        mesh,
        obj => {
          res(JSON.stringify(obj, null, 2));
        },
        { trs: true },
      );
    });
  };
}

export default Exporter;
