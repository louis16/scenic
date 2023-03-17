//创建EventBus对象
let EventBus = function () {
  console.log("eventbus init...");
};
//准备数组容器
var objBus = [],
  arrbus = [];
//添加方法
EventBus.prototype = {
  emit: function (key, data) {
    if (key) {
      for (var i = 0, busLength = arrbus.length; i < busLength; i++) {
        var map = arrbus[i];
        if (map.k == key) {
          return map.v(data);
        }
      }
    }
    return new Promise((resolve, reject) => {
      resolve()
    })
  },
  on: function (key, action) {
    if (key && action) {
      var map = {};
      map.k = key;
      map.v = action;
      arrbus = arrbus.filter(item => item.k != key); //去掉重复
      arrbus.push(map);
    }
  },
  off: function (key, callback) {
    if (key) {
      let index = arrbus.findIndex(item => item.k == key)
      arrbus.splice(index, 1)
      callback && callback()
    }
  }
}
var eventBus = new EventBus()
module.exports = {
  eventBus: eventBus
}