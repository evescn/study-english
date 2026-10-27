<script>
export default {
  onLaunch: function () {
    console.log('App Launch')
  },
}
</script>

<style>
/* 每个页面公共 css */
page {
  background-color: #fff8f0;
}

/* ===== 动画模板库（11 个模板，对应 letters.js 中的 animation 字段） ===== */
.emoji {
  display: inline-block;
  font-size: 200rpx;
  line-height: 1;
}

.anim-fall {
  animation: kf-fall 1.2s cubic-bezier(0.25, 0.9, 0.35, 1) both;
}
@keyframes kf-fall {
  0% { transform: translateY(-180rpx) scale(0.8); opacity: 0; }
  60% { transform: translateY(10rpx) scale(1.05); opacity: 1; }
  80% { transform: translateY(-8rpx); }
  100% { transform: translateY(0) scale(1); }
}

.anim-bounce {
  animation: kf-bounce 1s ease-in-out infinite;
}
@keyframes kf-bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-80rpx); }
}

.anim-walk {
  animation: kf-walk 1.6s ease-in-out infinite;
}
@keyframes kf-walk {
  0%, 100% { transform: translateX(-30rpx) rotate(-3deg); }
  50% { transform: translateX(30rpx) rotate(3deg); }
}

.anim-fly {
  animation: kf-fly 2.4s ease-in-out infinite;
}
@keyframes kf-fly {
  0% { transform: translateX(-320rpx) translateY(0) rotate(-8deg); opacity: 0; }
  10% { opacity: 1; }
  50% { transform: translateX(0) translateY(-50rpx) rotate(5deg); }
  90% { opacity: 1; }
  100% { transform: translateX(320rpx) translateY(0) rotate(-8deg); opacity: 0; }
}

.anim-spin {
  animation: kf-spin 2s linear infinite;
}
@keyframes kf-spin {
  to { transform: rotate(360deg); }
}

.anim-grow {
  animation: kf-grow 0.9s cubic-bezier(0.34, 1.56, 0.64, 1) both;
}
@keyframes kf-grow {
  0% { transform: scale(0.1); opacity: 0; }
  70% { transform: scale(1.15); opacity: 1; }
  100% { transform: scale(1); }
}

.anim-wiggle {
  animation: kf-wiggle 0.9s ease-in-out infinite;
}
@keyframes kf-wiggle {
  0%, 100% { transform: rotate(-8deg); }
  50% { transform: rotate(8deg); }
}

.anim-twinkle {
  animation: kf-twinkle 1.2s ease-in-out infinite;
}
@keyframes kf-twinkle {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.18); opacity: 0.75; }
}

.anim-drive {
  animation: kf-drive 2.6s ease-in-out infinite;
}
@keyframes kf-drive {
  0% { transform: translateX(-280rpx); }
  50% { transform: translateX(0); }
  100% { transform: translateX(280rpx); }
}

.anim-burst {
  animation: kf-burst 1.1s ease-out both;
}
@keyframes kf-burst {
  0% { transform: scale(0.3) translateY(0); opacity: 1; }
  60% { transform: scale(1.2) translateY(-30rpx); opacity: 1; }
  100% { transform: scale(1.5) translateY(-80rpx); opacity: 0; }
}

.anim-glow {
  animation: kf-glow 1.6s ease-in-out infinite;
}
@keyframes kf-glow {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.55; transform: scale(1.06); }
}

/* ===== 场景动画模板（大字母/装饰/庆祝） ===== */
.kf-pop {
  animation: kf-pop 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) both;
}
@keyframes kf-pop {
  0% { transform: scale(0.2) rotate(-8deg); opacity: 0; }
  60% { transform: scale(1.12) rotate(3deg); opacity: 1; }
  100% { transform: scale(1) rotate(0deg); }
}

.kf-wobble {
  animation: kf-wobble 2.6s ease-in-out infinite;
}
@keyframes kf-wobble {
  0%, 100% { transform: rotate(-3deg) scale(1); }
  50% { transform: rotate(3deg) scale(1.04); }
}

.kf-drift {
  animation: kf-drift 20s ease-in-out infinite;
}
@keyframes kf-drift {
  0% { transform: translateX(-70rpx); }
  50% { transform: translateX(70rpx); }
  100% { transform: translateX(-70rpx); }
}

.kf-rise {
  animation: kf-rise 6s linear infinite;
}
@keyframes kf-rise {
  0% { transform: translateY(0); opacity: 0; }
  15% { opacity: 0.9; }
  100% { transform: translateY(-520rpx); opacity: 0; }
}

.kf-floaty {
  animation: kf-floaty 3s ease-in-out infinite;
}
@keyframes kf-floaty {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-16rpx); }
}

.kf-shimmer {
  animation: kf-shimmer 6s linear infinite;
}
@keyframes kf-shimmer {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.kf-tada {
  animation: kf-tada 1s ease-in-out infinite;
}
@keyframes kf-tada {
  0%, 100% { transform: scale(1) rotate(0deg); }
  20% { transform: scale(1.15) rotate(-6deg); }
  40% { transform: scale(1.15) rotate(6deg); }
  60% { transform: scale(1.15) rotate(-4deg); }
  80% { transform: scale(1.15) rotate(4deg); }
}

.kf-confetti {
  animation: kf-confetti 2.4s ease-in both;
}
@keyframes kf-confetti {
  0% { transform: translateY(-40rpx) rotate(0deg); opacity: 1; }
  100% { transform: translateY(560rpx) rotate(360deg); opacity: 0; }
}
</style>
