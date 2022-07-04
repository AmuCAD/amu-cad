const getBasePosition = baseCoordinate => {
  const result = {};
  const key = baseCoordinate && Object.keys(baseCoordinate)[0];
  const value =
    baseCoordinate && baseCoordinate[Object.keys(baseCoordinate)[0]];

  switch (key) {
    case "x":
      result.position = [value, 0, 0];
      result.rotation = [0, -Math.PI / 2, 0];

      return result;
    case "y":
      result.position = [0, value, 0];
      result.rotation = [Math.PI / 2, 0, 0];

      return result;
    default:
      result.position = [0, 0, value];
      result.rotation = [0, 0, 0];

      return result;
  }
};

export default getBasePosition
