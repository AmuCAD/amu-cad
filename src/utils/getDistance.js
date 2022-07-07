const getDistance = (startPoint, endPoint) => {
  return Math.sqrt(
    Math.pow(endPoint[0] - startPoint[0], 2) +
      Math.pow(endPoint[1] - startPoint[1], 2) +
      Math.pow(endPoint[2] - startPoint[2], 2),
  );
};

export default getDistance;
