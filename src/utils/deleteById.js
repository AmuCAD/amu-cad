const deleteById = (arr, id) => {
  return arr.filter(elem => {
    if (elem.key !== id) {
      return elem;
    }
  });
};

export default deleteById;
