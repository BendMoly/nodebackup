/**
 * 数据库时间date格式化
 * @param  {string} strDate [将时间作为字符串传入]
 * @return {string}         [新的时间字符串]
 */
module.exports = function(strDate){
  var date = new Date(strDate);
  return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
}
