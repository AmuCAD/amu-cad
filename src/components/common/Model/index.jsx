import OriginPlanes from "../../common/OriginPlanes";
import Extrude from "../../model-control/Extrude";
import useStore from "../../../store";

function Model() {
  const model = useStore(state => state.model);

  return (
    <>
      {/* {!model && <OriginPlanes />} */}
      <OriginPlanes />
      <Extrude />
    </>
  );
}

export default Model;
