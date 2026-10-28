<template>
  <view class="page">
    <view class="header">
      <view class="banner">
        <text class="banner-balloon">🎈</text>
        <text class="banner-cloud c1">☁️</text>
        <text class="banner-cloud c2">☁️</text>
        <text class="banner-star s1">✨</text>
        <text class="banner-star s2">⭐</text>
        <view class="banner-title">
          <text
            v-for="(ch, i) in titleChars"
            :key="i"
            class="t-char"
            :style="{ animationDelay: i * 0.15 + 's', color: titleColors[i] }"
          >{{ ch }}</text>
          <text class="t-rest">字母乐园</text>
        </view>
        <text class="subtitle">点一个字母，开始学习吧！</text>
      </view>
    </view>

    <!-- 模块导航：字母 / 句子 / 视频 / 音频 -->
    <view class="tabbar">
      <view
        class="tab"
        :class="{ active: activeTab === t.key }"
        v-for="t in tabs"
        :key="t.key"
        @click="activeTab = t.key"
      >
        <image v-if="t.img" class="tab-img" :src="t.img" mode="aspectFit" />
        <text v-else class="tab-icon">{{ t.icon }}</text>
        <text class="tab-label">{{ t.label }}</text>
      </view>
    </view>

    <!-- 字母模块（原有功能不变） -->
    <view v-if="activeTab === 'letters'">
      <view class="grid">
        <view
          class="tile"
          :class="{ 'tile-locked': isLocked(item) }"
          v-for="item in letters"
          :key="item.letter"
          :style="{ background: tileBg(item) }"
          hover-class="tile-press"
          hover-stay-time="120"
          @click="openLetter(item.letter)"
        >
          <text class="tile-emoji">{{ item.words[0].emoji }}</text>
          <view class="tile-inner">
            <text class="upper">{{ item.letter }}</text>
            <text class="lower">{{ item.lower }}</text>
          </view>
          <text v-if="isLocked(item)" class="lock">🔒</text>
          <text v-else-if="isCompleted(item)" class="done">✓</text>
          <text v-else-if="visited[item.letter]" class="star">★</text>
        </view>
      </view>
    </view>

    <!-- 句子模块 -->
    <view v-else-if="activeTab === 'sentences'" class="module">
      <view class="module-head">
        <image class="module-icon-img" src="/static/icon/tab-sentences.png" mode="aspectFit" />
        <view class="module-head-txt">
          <text class="module-title">句子</text>
          <text class="module-sub">边看动画边读句子，培养语感</text>
        </view>
      </view>
      <view class="module-empty">
        <text class="me-emoji">✨</text>
        <text class="me-title">句子模块筹备中</text>
        <text class="me-desc">有趣的句子学习内容马上就来，敬请期待～</text>
      </view>
    </view>

    <!-- 视频模块 -->
    <view v-else-if="activeTab === 'videos'" class="module">
      <view class="module-head">
        <image class="module-icon-img" src="/static/icon/tab-video.png" mode="aspectFit" />
        <view class="module-head-txt">
          <text class="module-title">视频</text>
          <text class="module-sub">字母动画视频，看着学更开心</text>
        </view>
      </view>
      <view class="module-empty">
        <text class="me-emoji">🎈</text>
        <text class="me-title">视频模块筹备中</text>
        <text class="me-desc">好玩的字母动画视频很快上线，敬请期待～</text>
      </view>
    </view>

    <!-- 音频模块 -->
    <view v-else class="module">
      <view class="module-head">
        <image class="module-icon-img" src="/static/icon/tab-audio.png" mode="aspectFit" />
        <view class="module-head-txt">
          <text class="module-title">音频</text>
          <text class="module-sub">字母歌、单词朗读，随时随地听</text>
        </view>
      </view>
      <view class="module-empty">
        <text class="me-emoji">🎵</text>
        <text class="me-title">音频模块筹备中</text>
        <text class="me-desc">字母歌和单词朗读马上就来，敬请期待～</text>
      </view>
    </view>
  </view>
</template>

<script>
import { LETTERS } from '@/data/letters.js'
export default {
  data() {
    return {
      letters: LETTERS,
      visited: {},
      completed: {},
      titleChars: ['A', 'B', 'C'],
      titleColors: ['#FF6B6B', '#FF9F43', '#26DE81'],
      activeTab: 'letters',
      tabs: [
        { key: 'letters', icon: '🔤', img: '/static/icon/tab-letters.png', label: '字母' },
        { key: 'sentences', icon: '📖', img: '/static/icon/tab-sentences.png', label: '句子' },
        { key: 'videos', icon: '🎬', img: '/static/icon/tab-video.png', label: '视频' },
        { key: 'audio', icon: '🎵', img: '/static/icon/tab-audio.png', label: '音频' },
      ],
    }
  },
  onShow() {
    this.visited = uni.getStorageSync('visited') || {}
    this.completed = uni.getStorageSync('completed') || {}
  },
  methods: {
    isLocked(item) {
      if (item.letter === 'A') return false
      const idx = this.letters.indexOf(item)
      const prev = idx > 0 ? this.letters[idx - 1] : null
      return prev ? !this.completed[prev.letter] : false
    },
    isCompleted(item) {
      return !!this.completed[item.letter]
    },
    tileBg(item) {
      return `linear-gradient(160deg, ${item.color} 0%, ${this.tint(item.color, 0.4)} 100%)`
    },
    tint(hex, ratio) {
      const n = parseInt(hex.slice(1), 16)
      const r = (n >> 16) & 255
      const g = (n >> 8) & 255
      const b = n & 255
      const mix = (c) => Math.round(c + (255 - c) * ratio)
      return `rgb(${mix(r)}, ${mix(g)}, ${mix(b)})`
    },
    openLetter(letter) {
      const item = this.letters.find((l) => l.letter === letter)
      if (this.isLocked(item)) {
        uni.showToast({ title: '先学完前面的字母才能解锁哦', icon: 'none' })
        return
      }
      uni.navigateTo({ url: `/pages/letter/letter?letter=${letter}` })
    },
  },
}
</script>

<style scoped>
.page {
  min-height: 100vh;
  padding: 30rpx 24rpx 60rpx;
  box-sizing: border-box;
  background: linear-gradient(180deg, #fff6ec 0%, #eef6ff 100%);
}

.header {
  padding: 16rpx 6rpx 26rpx;
}

.banner {
  position: relative;
  border-radius: 32rpx;
  padding: 42rpx 30rpx 34rpx;
  background: linear-gradient(135deg, #6ec9ff 0%, #a5e3ff 42%, #ffc3de 100%);
  box-shadow: 0 14rpx 28rpx rgba(74, 144, 217, 0.25);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.banner-title {
  display: flex;
  align-items: center;
}

.t-char {
  display: inline-block;
  width: 66rpx;
  height: 66rpx;
  line-height: 66rpx;
  text-align: center;
  background: #ffffff;
  border-radius: 18rpx;
  font-size: 42rpx;
  font-weight: bold;
  margin: 0 6rpx;
  box-shadow: 0 8rpx 16rpx rgba(0, 0, 0, 0.12);
  animation: kf-floaty 2.4s ease-in-out infinite;
}

.t-rest {
  margin-left: 12rpx;
  font-size: 46rpx;
  font-weight: bold;
  color: #ffffff;
  text-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.15);
}

.subtitle {
  margin-top: 18rpx;
  font-size: 26rpx;
  color: rgba(255, 255, 255, 0.95);
  background: rgba(255, 255, 255, 0.28);
  padding: 10rpx 28rpx;
  border-radius: 32rpx;
}

.banner-balloon {
  position: absolute;
  top: 14rpx;
  right: 26rpx;
  font-size: 56rpx;
  animation: kf-floaty 3s ease-in-out infinite;
}

.banner-cloud {
  position: absolute;
  font-size: 44rpx;
  opacity: 0.85;
}

.banner-cloud.c1 {
  top: 20rpx;
  left: 22rpx;
  animation: kf-drift 20s ease-in-out infinite;
}

.banner-cloud.c2 {
  bottom: 26rpx;
  right: 44rpx;
  font-size: 34rpx;
  animation: kf-drift 26s ease-in-out 3s infinite;
}

.banner-star {
  position: absolute;
  font-size: 30rpx;
  animation: kf-twinkle 1.6s ease-in-out infinite;
}

.banner-star.s1 {
  top: 34rpx;
  left: 36%;
}

.banner-star.s2 {
  bottom: 30rpx;
  left: 14%;
  animation-delay: 0.5s;
}

/* ===== 模块导航 ===== */
.tabbar {
  display: flex;
  background: rgba(255, 255, 255, 0.92);
  border-radius: 28rpx;
  padding: 12rpx;
  margin-bottom: 26rpx;
  box-shadow: 0 6rpx 16rpx rgba(0, 0, 0, 0.06);
}

.tab {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 14rpx 0;
  border-radius: 20rpx;
  transition: background 0.2s ease;
}

.tab.active {
  background: linear-gradient(135deg, #6ec9ff 0%, #a5e3ff 100%);
}

.tab-icon {
  font-size: 40rpx;
}

.tab-img {
  width: 46rpx;
  height: 46rpx;
}

.tab-label {
  margin-top: 4rpx;
  font-size: 26rpx;
  font-weight: bold;
  color: #8a8fa3;
}

.tab.active .tab-label {
  color: #ffffff;
}

/* ===== 模块占位 ===== */
.module-head {
  display: flex;
  align-items: center;
  margin-bottom: 24rpx;
}

.module-icon {
  font-size: 56rpx;
  margin-right: 18rpx;
}

.module-icon-img {
  width: 64rpx;
  height: 64rpx;
  margin-right: 18rpx;
}

.module-head-txt {
  display: flex;
  flex-direction: column;
}

.module-title {
  font-size: 40rpx;
  font-weight: bold;
  color: #333333;
}

.module-sub {
  font-size: 24rpx;
  color: #999999;
  margin-top: 6rpx;
}

.module-empty {
  background: #ffffff;
  border-radius: 28rpx;
  border: 2rpx dashed #ffc3a0;
  padding: 60rpx 30rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 6rpx 16rpx rgba(0, 0, 0, 0.05);
}

.me-emoji {
  font-size: 90rpx;
  animation: kf-twinkle 1.6s ease-in-out infinite;
}

.me-title {
  margin-top: 20rpx;
  font-size: 32rpx;
  font-weight: bold;
  color: #ff8a5c;
}

.me-desc {
  margin-top: 12rpx;
  font-size: 26rpx;
  color: #999999;
  text-align: center;
}

.grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.tile {
  position: relative;
  width: 158rpx;
  height: 178rpx;
  margin-bottom: 22rpx;
  border-radius: 28rpx;
  border: 6rpx solid #ffffff;
  box-shadow: 0 10rpx 20rpx rgba(0, 0, 0, 0.12);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.tile-press {
  transform: scale(0.92);
}

.tile-locked {
  opacity: 0.45;
}

.tile-inner {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.tile-inner::before {
  content: '';
  position: absolute;
  width: 118rpx;
  height: 118rpx;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.18);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.tile-emoji {
  position: absolute;
  top: 8rpx;
  right: 12rpx;
  font-size: 46rpx;
  z-index: 2;
}


.upper {
  font-size: 70rpx;
  font-weight: bold;
  color: #ffffff;
  line-height: 1.05;
  text-shadow: 0 6rpx 12rpx rgba(0, 0, 0, 0.18);
}

.lower {
  font-size: 34rpx;
  color: rgba(255, 255, 255, 0.92);
  line-height: 1.3;
  text-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.12);
  animation: kf-twinkle 1s ease-in-out infinite;
}

.star {
  position: absolute;
  top: 6rpx;
  left: 12rpx;
  font-size: 30rpx;
  color: #ffe066;
  text-shadow: 0 2rpx 6rpx rgba(0, 0, 0, 0.25);
  z-index: 2;
}

.lock {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 44rpx;
  z-index: 3;
}

.done {
  position: absolute;
  top: 6rpx;
  left: 12rpx;
  width: 36rpx;
  height: 36rpx;
  line-height: 36rpx;
  text-align: center;
  border-radius: 50%;
  background: #2ed573;
  color: #ffffff;
  font-size: 24rpx;
  font-weight: bold;
  z-index: 2;
}
</style>
