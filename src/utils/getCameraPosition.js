const getCameraPosition = baseCoordinate => {
  const [base, offset] = Object.entries(baseCoordinate)[0];
  const distance = offset < 0 ? offset - 15 : offset + 15;

  switch (base) {
    case "x":
      return [distance, 0, 0];
    case "y":
      return [0, distance, 0];
    default:
      return [0, 0, distance];
  }
};

export default getCameraPosition;
