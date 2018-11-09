'use strict'

var ctx, analyser, frequencies, getByteFrequencyDataAverage, draw

// 兼容性
window.AudioContext = window.AudioContext || window.webkitAudioContext
// 获取音频上下文
ctx = new window.AudioContext()

// 用户获取stream当中的时间、频率信息
analyser = ctx.createAnalyser()
frequencies = new Uint8Array(analyser.frequencyBinCount)
getByteFrequencyDataAverage = function() {
  // 将当前频域数据拷贝进数组
  analyser.getByteFrequencyData(frequencies)
  // 求得频域的平均值
  return (
    frequencies.reduce(function(previous, current) {
      return previous + current
    }) / analyser.frequencyBinCount
  )
}

// 返回 Promise 对象
navigator.mediaDevices
  .getUserMedia({ audio: true })
  .then(function(stream) {
    // window.hackForMozzila = stream;
    ctx
      .createMediaStreamSource(stream)
      // 连接到AnalyserNode
      .connect(analyser)
  })
  .catch(function(err) {
    console.log(err.message)
  })

var pygmies = []
for (let i = 0; i < 10; i++) {
  pygmies.push(document.getElementById(`pygmie-${i + 1}`))
}
console.log(pygmies)

// 改变小人的位置
;(draw = function() {
  var moveValue = getByteFrequencyDataAverage() * 10
  if (moveValue >= 35) {
    moveValue = 35
  }
  pygmies[0].style.transform = `translate(51.000000px, ${moveValue}px)`
  console.log(getByteFrequencyDataAverage())
  pygmies[1].style.transform = `translate(89.000000px, ${0.0 + moveValue}px)`
  pygmies[2].style.transform = `translate(149.000000px, ${0.0 + moveValue}px)`
  pygmies[3].style.transform = `translate(218.000000px, ${0.0 + moveValue}px)`
  pygmies[4].style.transform = `translate(286.500000px, 51.000000px) rotate(90.000000deg) translate(-286.500000px, -51.000000px) translate(275.000000px, ${34.0 +
    moveValue}px)`
  pygmies[5].style.transform = `translate(286.500000px, 152.000000px) rotate(90.000000deg) translate(-286.500000px, -152.000000px) translate(275.000000px, ${135.5 +
    moveValue}px)`
  pygmies[6].style.transform = `translate(286.500000px, 196.5000000px) rotate(90.000000deg) translate(-286.500000px, -196.500000px) translate(275.000000px, ${179.5 +
    moveValue}px)`
  pygmies[7].style.transform = `translate(17.500000px, 173.500000px) rotate(-90.000000deg) translate(-17.00000px, -173.500000px) translate(5.500000px, ${156.5 +
    moveValue}px)`
  pygmies[8].style.transform = `translate(17.000000px, 106.500000px) rotate(-90.000000deg) translate(-17.00000px, -106.500000px) translate(5.500000px, ${89.5 +
    moveValue}px)`
  pygmies[9].style.transform = `translate(17.00000px, 252.500000px) rotate(-90.000000deg) translate(-17.00000px, -252.500000px) translate(5.500000px, ${235.5 +
    moveValue}px)`
  requestAnimationFrame(draw)
})()
