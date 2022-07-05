import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter";

import useStore from "../../../store";

function Exporter() {
	const setBlobUrl = useStore(state => state.setBlobUrl);
  const { scene } = useThree();

  useEffect(() => {
    (async () => {
      const result = await convert(scene);
      setBlobUrl(
        URL.createObjectURL(new Blob([result], { type: "text.plain" })),
      );
    })();
  }, [scene]);

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
