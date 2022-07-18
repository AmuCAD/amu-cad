const getBaseCoordinate = (prevPoint, currentPoint) => {
  for (const prop in prevPoint) {
    if (!prevPoint.hasOwnProperty(prop)) continue;
    if (prevPoint[prop] === currentPoint[prop]) {
      return {
        [prop]: prevPoint[prop],
      };
    }
  }
};

export default getBaseCoordinate;
