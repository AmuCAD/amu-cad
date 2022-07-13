import { useState, useEffect } from "react";

import useStore from "../../../store";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter";
import { STLExporter } from "three/examples/jsm/exporters/STLExporter";

function Exporter({ format }) {
  const model = useStore(state => state.model);
  const [blobUrl, setBlobUrl] = useState(null);

  const filename = `scene.${format}`;

  useEffect(() => {
    (async () => {
      if (model) {
        const gltfJson = await convert(model);
        const stlJson = new STLExporter().parse(model);

        setBlobUrl({
          gltf: URL.createObjectURL(
            new Blob([gltfJson], { type: "text.plain" }),
          ),
          stl: URL.createObjectURL(new Blob([stlJson], { type: "text.plain" })),
        });
      }
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

  const downloadFile = (url, filename) => {
    const link = document.createElement("a");

    link.href = url;
    link.download = filename;
    link.click();
  };

  return (
    <button
      onClick={() => {
        downloadFile(blobUrl[format], filename);
      }}
    >
      {format} 저장
    </button>
  );
}

export default Exporter;
