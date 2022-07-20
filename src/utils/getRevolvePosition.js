const getRevolvePosition = (operationData, radius, base) => {
  const [x, y, z] = operationData.offset;
  const isCircleShape = operationData.revolveShape.curves.length === 1;

  if (isCircleShape) {
    return [x, y, z - radius];
  } else if (base === "x") {
    return [z, y, x - radius];
  } else {
    return [x - radius, y, z];
  }
};

export default getRevolvePosition;
