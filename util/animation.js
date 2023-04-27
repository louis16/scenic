const slideDown = () => {
  var slideDown = wx.createAnimation({
    duration: 1000, // 动画持续时间
    timingFunction: 'ease', // 动画类型
  });
  // 设置动画初始状态
  slideDown.translateY('0').step();

  return slideDown.export();
}; // 从上向下滑出
const slideUp = () => {
  var slideUp = wx.createAnimation({
    duration: 1000, // 动画持续时间
    timingFunction: 'ease', // 动画类型
  });
  // 设置动画初始状态
  slideUp.translateY('0').step();
  return slideUp.export();
}; // 从下向上滑出
const slideUpScaleX = () => {
  var slideUpScaleX = wx.createAnimation({
    duration: 1000, // 动画持续时间
    timingFunction: 'ease', // 动画类型
  });
  // 设置动画初始状态
  slideUpScaleX.scaleX('-1').translateY('0').step();
  return slideUpScaleX.export();
}; // 从下向上滑出,带水平翻转
const fadeOut = () => {
  // 创建动画实例
  const fadeOut = wx.createAnimation({
    duration: 1000, // 动画时长
    timingFunction: 'ease', // 缓动函数
    delay: 0, // 延迟时间
    transformOrigin: '50% 50%', // 变形原点
  });

  // 设置动画效果
  fadeOut.scale(1).opacity(1).step();

  return fadeOut.export();
} // 渐显
module.exports = {
  slideDown: slideDown(),
  slideUp: slideUp(),
  slideUpScaleX: slideUpScaleX(),
  fadeOut: fadeOut()
}