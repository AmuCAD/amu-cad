const getRevolvePosition = (operationData, base, radius) => {
  const [x, y, z] = operationData.offset;
  const isCircleShape = operationData.revolveShape.curves.length === 1;

  if (base === "z") {
    return [x - radius, y, z];
  } else if (isCircleShape) {
    return [x, y, z - radius];
  } else {
    return [x, y, -radius];
  }
};

export default getRevolvePosition;
