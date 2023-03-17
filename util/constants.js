export const mapIcon = {
  "normal": "/static/imgs/Marker1_Activated@3x.png",
  "customer": "/static/imgs/demoMark.jpg",
}
export const rewwardsType = {
  "0": "无",
  "1": "积分",
  "2": "独立物品",
  "3": "合成物品",
  "4": "合成物品组件",
  "5": "电子券",
}
export const taskType = {//trigger_show => '触发后的内容', //触发后的内容：0-》不显示，1-》图文，2-》视频，3-》音频，4-》AR视频
  "0": "",
  "1": "/static/icon/pic_icon.png",
  "2": "/static/icon/ar_icon.png",
  "3": "/static/icon/video_icon.png ",
  "4": "/static/icon/audio_icon.png",
}
export const taskStatus = {
  "unfinished":{backgroundColor:"#FFF1F1",color:"#FB9898",text:"未完成"},
  "finished":{backgroundColor:"#E2EEFF",color:"#90ADD8",text:"已完成"},
  "expired":{backgroundColor:"#F2F2F2",color:"#999999",text:"已过期"}
}
export function getDistance(point1, point2) {
  let {
    lat: lat1,
    lng: lng1
  } = point1
  let {
    lat: lat2,
    lng: lng2
  } = point2
  let Lat1 = lat1 * Math.PI / 180.00; // 纬度
  let Lat2 = lat2 * Math.PI / 180.00; // 纬度 
  let Lng1 = lng1 * Math.PI / 180.00; // 经度
  let Lng2 = lng2 * Math.PI / 180.00; // 经度
  let a = Lat1 - Lat2; //	两点纬度之差
  let b = Lng1 - Lng2; //	两点经度之差
  let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
    Math.cos(Lat1) * Math.cos(Lat2) * Math.pow(Math.sin(b / 2), 2)));
  //	计算两点距离的公式
  s = s * 6378137.0; //	弧长等于弧度乘地球半径（半径为米）
  s = Math.round(s * 10000) / 10000; //	精确距离的数值
  return s;
}