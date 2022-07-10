const deleteByKey = (arr, id) => {
  return arr.filter(elem => {
    if (elem.props.children.key !== id) {
      return elem;
    }
  });
};

export default deleteByKey;
