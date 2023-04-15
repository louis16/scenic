const formatNumber = (n) => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
export const formatTime = (number, format)=> {
  let formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
  let returnArr = [];
  const date = new Date(number.replace(/-/g, '/'))
  // console.log(date,number);
  // console.log(Date.parse(number.replace(/-/g, '/')))
  returnArr.push(date.getFullYear());
  returnArr.push(formatNumber(date.getMonth() + 1));
  returnArr.push(formatNumber(date.getDate()));
  returnArr.push(formatNumber(date.getHours()));
  returnArr.push(formatNumber(date.getMinutes()));
  returnArr.push(formatNumber(date.getSeconds()));
  returnArr.forEach(function(item,index) {
    format = format.replace(formateArr[index], item);
  })
  return format;
} 