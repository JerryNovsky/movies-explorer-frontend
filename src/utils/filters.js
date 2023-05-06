const filterByKeyword = (array, keyWord) => {
  return array.filter((item) => {
    return item.nameRU.toLowerCase().includes(keyWord.toLowerCase());
  });
};
const filterByDuration = (array) => {
  return array.filter((item) => item.duration <= 40);
};

export { filterByKeyword, filterByDuration };
