// 封装的防抖函数
export function debounce(func,delay){
  let timer = null

  return function(...args){
    if(timer)clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this,args)
    },delay)
  }
}

// 封装转换时间戳为日期格式的函数
export function formtDate(date,fmt){
  // 1.获取年份
  if(/(y+)/.test(fmt)){
    fmt = fmt.replace(RegExp.$1,(date.getFullYear() + '').substr(4 - RegExp.$1.length));

  }
  // 2.获取月份等日期
  // 这里M+后面的+的意思就是，他知道要匹配M，
  // 但是不知道要匹配几个，所以加了一个+，代表1到正无穷
  let o = {
    'M+':date.getMonth() + 1,
    'd+':date.getDate(),
    'h+':date.getHours(),
    'm+':date.getMinutes(),
    's+':date.getSeconds(),
  };
  for(let k in o){
    if(new RegExp('${k}').test(fmt)){
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1,(RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};

function padLeftZero (str){
  return ('00' + str).substr(str.length);
}