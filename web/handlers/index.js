
const Query = {
  //中文 string in:query
  word: '小姜'
};

module.exports = (Query) => {
  
  return global.dict.find(decodeURIComponent(Query.word));
};