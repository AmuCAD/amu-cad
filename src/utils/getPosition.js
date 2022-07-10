const getPosition = (base, distance, extrudeSize = 0) => {
  const result = {};

  switch (base) {
    case "x":
      result.position = [distance + extrudeSize * 1, 0, 0];
      result.rotation = [0, -Math.PI / 2, 0];

      return result;
    case "y":
      result.position = [0, distance + extrudeSize * 1, 0];
      result.rotation = [Math.PI / 2, 0, 0];

      return result;
    default:
      result.position = [0, 0, distance + extrudeSize * -1];
      result.rotation = [0, 0, 0];

      return result;
  }
};

export default getPosition;
