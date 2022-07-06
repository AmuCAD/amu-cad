const manipulateCoords = (coords, base) => {
  const result = coords.slice().map(([x, y, z]) => {
    switch (base) {
      case "x":
        return [z, y, x];
      case "y":
        return [x, z, y];
      default:
        return [x, y, z];
    }
  });

  return result;
};

export default manipulateCoords;
