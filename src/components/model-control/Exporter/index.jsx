import { useState, useEffect } from "react";

import useStore from "../../../store";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter";
import { STLExporter } from "three/examples/jsm/exporters/STLExporter";
import IconButton from "../../common/shared/IconButton";
import IconImg from "../../common/shared/IconImg";

import saveIcon from "../../../assets/icons/save.png";
import stlIcon from "../../../assets/icons/stl.png";

function Exporter({ format }) {
  const models = useStore(state => state.models);
  const [blobUrl, setBlobUrl] = useState(null);

  const filename = `scene.${format}`;

  useEffect(() => {
    (async () => {
      if (models[0]) {
        const gltfJson = await convert(models[models.length - 1]);
        const stlJson = new STLExporter().parse(models[models.length - 1]);

        setBlobUrl({
          gltf: URL.createObjectURL(
            new Blob([gltfJson], { type: "text.plain" }),
          ),
          stl: URL.createObjectURL(new Blob([stlJson], { type: "text.plain" })),
        });
      }
    })();
  }, [models]);

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
    <IconButton
      onClick={() => {
        downloadFile(blobUrl[format], filename);
      }}
      isActive={false}
    >
      <IconImg src={format === "gltf" ? saveIcon : stlIcon} alt="이미지 없음" />
    </IconButton>
  );
}

export default Exporter;
