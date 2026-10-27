<template>
  <view class="page" v-if="letter">
    <!-- 整屏大字母动画场景 -->
    <view class="letter-scene" :style="{ background: sceneBg }">
      <text class="deco deco-sun">☀️</text>
      <text class="deco deco-cloud c1">☁️</text>
      <text class="deco deco-cloud c2">☁️</text>
      <text class="deco deco-star s1">✨</text>
      <text class="deco deco-star s2">⭐</text>
      <text class="deco deco-rainbow">🌈</text>

      <view class="letter-hero">
        <view class="big-wrap" :key="'hero-' + letter.letter">
          <text class="big-upper" @click="sayLetter">{{ letter.letter }}</text>
          <text class="big-lower" @click="sayLower">{{ letter.lower }}</text>
        </view>
        <text class="tap-hint">点大写读 Big {{ letter.letter }} · 点小写读 Small {{ letter.lower }}</text>
      </view>

      <view class="bubbles">
        <text v-for="b in bubbles" :key="b.id" class="bubble" :style="b.style">🫧</text>
      </view>
    </view>

    <!-- 3 个单词迷你动画场景卡片 -->
    <view class="words">
      <view class="word-card" v-for="(word, i) in letter.words" :key="word.word" @click="playWord(i)">
        <view class="scene">
          <view class="scene-bg" :class="'card-tint-' + i"></view>
          <text class="scene-deco d1">✨</text>
          <text class="scene-deco d2">⭐</text>
          <text class="scene-deco d3">💫</text>
          <text
            :key="`${word.word}-${plays[i]}`"
            class="emoji"
            :class="'anim-' + word.animation"
          >{{ word.emoji }}</text>
        </view>
        <view class="word-row">
          <text class="word">{{ word.word }}</text>
          <text class="speaker">🔊</text>
        </view>
        <text class="zh">{{ word.zh }}</text>
      </view>
    </view>

    <view class="controls">
      <view class="btn btn-primary" @click="playAll">▶ 全部播放</view>
      <view class="btn" @click="go('prev')">◀ 上一个</view>
      <view class="btn" @click="go('next')">下一个 ▶</view>
    </view>

    <!-- 学完庆祝彩带 -->
    <view class="confetti" v-if="celebrate">
      <text v-for="c in confettiPieces" :key="c.id" class="confetti-piece" :style="c.style">{{ c.char }}</text>
    </view>
  </view>
</template>

<script>
import { LETTERS } from '@/data/letters.js'
import { speak } from '@/animations/audio.js'

const CONFETTI_CHARS = ['🎉', '✨', '⭐', '🎊', '💖']

export default {
  data() {
    return {
      index: 0,
      letter: null,
      plays: [0, 0, 0],
      bubbles: [],
      celebrate: false,
      confettiPieces: [],
    }
  },
  computed: {
    sceneBg() {
      if (!this.letter) return '#fff8f0'
      return `linear-gradient(180deg, ${this.letter.color} 0%, #fff0e6 100%)`
    },
  },
  onLoad(query) {
    const i = LETTERS.findIndex((l) => l.letter === query.letter)
    this.index = i >= 0 ? i : 0
    this.setLetter()
    if (this.isLocked(this.letter.letter)) {
      uni.showToast({ title: '请先学完前面的字母才能解锁', icon: 'none' })
      setTimeout(() => {
        uni.navigateBack({
          fail: () => uni.reLaunch({ url: '/pages/index/index' }),
        })
      }, 1200)
    }
  },
  methods: {
    isLetterCompleted(letter) {
      const completed = uni.getStorageSync('completed') || {}
      return !!completed[letter]
    },
    prevLetterOf(letter) {
      const idx = LETTERS.findIndex((l) => l.letter === letter)
      return idx > 0 ? LETTERS[idx - 1].letter : null
    },
    isLocked(letter) {
      if (letter === 'A') return false
      const prev = this.prevLetterOf(letter)
      return prev ? !this.isLetterCompleted(prev) : false
    },
    markCompleted() {
      const completed = uni.getStorageSync('completed') || {}
      if (!completed[this.letter.letter]) {
        completed[this.letter.letter] = true
        uni.setStorageSync('completed', completed)
      }
    },
    setLetter() {
      this.letter = LETTERS[this.index]
      this.plays = [0, 0, 0]
      this.celebrate = false
      this.bubbles = Array.from({ length: 8 }, (_, i) => ({
        id: i,
        style: `left:${6 + i * 12}%; animation-duration:${4 + (i % 4)}s; animation-delay:${i * 0.7}s; font-size:${26 + (i % 3) * 10}rpx;`,
      }))
      const visited = uni.getStorageSync('visited') || {}
      visited[this.letter.letter] = true
      uni.setStorageSync('visited', visited)
    },
    sayLetter() {
      speak(`Big ${this.letter.letter}`)
    },
    sayLower() {
      speak(`Small ${this.letter.lower}`)
    },
    playWord(i) {
      this.plays[i] += 1
      speak(this.letter.words[i].word)
      this.checkCelebrate()
    },
    playAll() {
      const run = (i) => {
        if (i >= 3) {
          this.checkCelebrate()
          return
        }
        this.plays[i] += 1
        speak(this.letter.words[i].word)
        setTimeout(() => run(i + 1), 1700)
      }
      run(0)
    },
    checkCelebrate() {
      if (this.plays.every((p) => p > 0)) {
        this.markCompleted()
      }
      if (!this.celebrate && this.plays.every((p) => p > 0)) {
        this.celebrate = true
        this.confettiPieces = Array.from({ length: 18 }, (_, i) => ({
          id: i,
          char: CONFETTI_CHARS[i % CONFETTI_CHARS.length],
          style: `left:${5 + Math.random() * 90}%; animation-delay:${(Math.random() * 1.2).toFixed(2)}s; font-size:${30 + Math.random() * 26}rpx;`,
        }))
        setTimeout(() => {
          this.celebrate = false
        }, 2800)
      }
    },
    go(direction) {
      if (direction === 'next') {
        const nextIndex = (this.index + 1) % 26
        if (this.isLocked(LETTERS[nextIndex].letter)) {
          uni.showToast({ title: '先学完当前字母才能解锁下一个哦', icon: 'none' })
          return
        }
        this.index = nextIndex
      } else {
        this.index = (this.index + 25) % 26
      }
      this.setLetter()
    },
  },
}
</script>

<style scoped>
.page {
  min-height: 100vh;
  padding: 30rpx 30rpx 60rpx;
  box-sizing: border-box;
}

/* ===== 整屏字母场景 ===== */
.letter-scene {
  position: relative;
  height: 540rpx;
  border-radius: 32rpx;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10rpx 24rpx rgba(0, 0, 0, 0.15);
}

.deco {
  position: absolute;
  pointer-events: none;
}

.deco-sun {
  top: 24rpx;
  right: 30rpx;
  font-size: 84rpx;
  animation: kf-spin 18s linear infinite;
}

.deco-cloud {
  font-size: 72rpx;
  opacity: 0.95;
}

.c1 {
  top: 70rpx;
  left: 16rpx;
  animation: kf-drift 20s ease-in-out infinite;
}

.c2 {
  top: 190rpx;
  right: 36rpx;
  font-size: 52rpx;
  animation: kf-drift 26s ease-in-out infinite 3s;
}

.deco-star {
  font-size: 36rpx;
  animation: kf-twinkle 1.6s ease-in-out infinite;
}

.s1 {
  top: 210rpx;
  left: 12%;
}

.s2 {
  top: 280rpx;
  right: 14%;
  animation-delay: 0.5s;
}

.deco-rainbow {
  top: 12rpx;
  left: 50%;
  transform: translateX(-50%);
  font-size: 130rpx;
  opacity: 0.85;
  animation: kf-floaty 4s ease-in-out infinite;
}

.letter-hero {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.big-wrap {
  display: flex;
  align-items: baseline;
  animation: kf-pop 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) both;
}

.big-upper {
  font-size: 230rpx;
  font-weight: bold;
  color: #ffffff;
  line-height: 1;
  text-shadow: 0 12rpx 24rpx rgba(0, 0, 0, 0.22);
  animation: kf-wobble 2.6s ease-in-out infinite;
}

.big-lower {
  margin-left: 30rpx;
  font-size: 150rpx;
  font-weight: bold;
  color: #ffe066;
  line-height: 1;
  text-shadow: 0 10rpx 20rpx rgba(0, 0, 0, 0.2);
  animation: kf-wobble 2.6s ease-in-out 0.2s infinite;
}

.tap-hint {
  margin-top: 24rpx;
  font-size: 28rpx;
  color: #ffffff;
  background: rgba(0, 0, 0, 0.16);
  padding: 10rpx 28rpx;
  border-radius: 32rpx;
  animation: kf-floaty 2.4s ease-in-out infinite;
}

.bubbles {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  pointer-events: none;
}

.bubble {
  position: absolute;
  bottom: 10rpx;
  animation: kf-rise linear infinite;
}

/* ===== 单词迷你场景卡片 ===== */
.words {
  margin-top: 30rpx;
}

.word-card {
  background-color: #ffffff;
  border-radius: 30rpx;
  overflow: hidden;
  margin-bottom: 26rpx;
  box-shadow: 0 6rpx 16rpx rgba(0, 0, 0, 0.08);
}

.scene {
  position: relative;
  height: 300rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.scene-bg {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-size: 200% 200%;
  animation: kf-shimmer 6s linear infinite;
}

.card-tint-0 {
  background: linear-gradient(120deg, #ffe3ec, #fff8f0, #e3f6ff);
}

.card-tint-1 {
  background: linear-gradient(120deg, #e3f6ff, #fffde3, #f0e3ff);
}

.card-tint-2 {
  background: linear-gradient(120deg, #f0e3ff, #fffde3, #e3fff0);
}

.scene-deco {
  position: absolute;
  font-size: 32rpx;
  animation: kf-floaty 3s ease-in-out infinite;
  opacity: 0.9;
}

.d1 {
  top: 22rpx;
  left: 12%;
}

.d2 {
  top: 46rpx;
  right: 14%;
  animation-delay: 0.6s;
}

.d3 {
  bottom: 42rpx;
  left: 16%;
  animation-delay: 1.1s;
}

.scene .emoji {
  position: relative;
  z-index: 1;
}


.word-row {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 16rpx;
}

.word {
  font-size: 46rpx;
  font-weight: bold;
  color: #333333;
}

.speaker {
  margin-left: 14rpx;
  font-size: 34rpx;
  animation: kf-floaty 1.6s ease-in-out infinite;
}

.zh {
  text-align: center;
  font-size: 26rpx;
  color: #999999;
  margin: 6rpx 0 20rpx;
  padding-left: 12rpx;
}

/* ===== 底部控制 ===== */
.controls {
  display: flex;
  justify-content: space-between;
  margin-top: 6rpx;
}

.btn {
  flex: 1;
  background-color: #4a90d9;
  color: #ffffff;
  text-align: center;
  font-size: 30rpx;
  padding: 20rpx 0;
  border-radius: 36rpx;
  margin: 0 8rpx;
  box-shadow: 0 6rpx 12rpx rgba(74, 144, 217, 0.3);
}

.btn-primary {
  background-color: #ff6b6b;
  box-shadow: 0 6rpx 12rpx rgba(255, 107, 107, 0.35);
}

/* ===== 庆祝彩带 ===== */
.confetti {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 99;
}

.confetti-piece {
  position: absolute;
  top: 0;
  animation: kf-confetti 2.4s ease-in both;
}
</style>
