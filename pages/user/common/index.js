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

  // 根据生日获取年龄
  export const getAge = (s) =>{
  if(s == '' || s == null || s== 'null') return ''
  let returnAge;
  let d1= (s).replace(/\-/g, '/')
  const birthday = new Date(d1)
  const birthYear = birthday.getFullYear();
  const birthMonth = birthday.getMonth() + 1;
  const birthDay = birthday.getDate() + 1;
 
  const d = new Date();
  const nowYear = d.getFullYear();
  const nowMonth = d.getMonth() + 1;
  const nowDay = d.getDate();
  if(nowYear == birthYear){
    returnAge = 0;//同年 则为0岁
  }
  else{
    const ageDiff = nowYear - birthYear ; //年之差
    if(ageDiff > 0){
      if(nowMonth == birthMonth) {
        var dayDiff = nowDay - birthDay;//日之差
        if(dayDiff < 0){
          returnAge = ageDiff - 1;
        }else{
          returnAge = ageDiff ;
        }
      }else{
        var monthDiff = nowMonth - birthMonth;//月之差
        if(monthDiff < 0){
          returnAge = ageDiff - 1;
        }else{
          returnAge = ageDiff ;
        }
      }
    }
    else
    {
      returnAge = -1;//出生日期不能大于今天
    }
  }
  return returnAge;
}