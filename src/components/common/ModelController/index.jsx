import SketchStartButton from "../../model-control/SketchStartButton";
import ExtrudeButton from "../../model-control/ExtrudeButton";
import RevolveButton from "../../model-control/RevolveButton";
import UndoButton from "../UndoButton";
import RedoButton from "../RedoButton";
import ImportButton from "../../model-control/ImportButton";
import SaveButton from "../../model-control/SaveButton";
import StlExportButton from "../../model-control/StlExportButton";

function ModelController() {
  return (
    <>
      <SketchStartButton />
      <ExtrudeButton />
      <RevolveButton />
      <UndoButton />
      <RedoButton />
      <ImportButton />
      <SaveButton />
      <StlExportButton />
    </>
  );
}

export default ModelController;
