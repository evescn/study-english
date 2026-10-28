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
          <view class="spk-wrap" @click.stop="playWord(i)">
            <view class="eq" v-if="playing[i]">
              <view class="eq-bar b1"></view>
              <view class="eq-bar b2"></view>
              <view class="eq-bar b3"></view>
              <view class="eq-bar b4"></view>
            </view>
          </view>
        </view>
        <view class="zh-badge">
          <text class="zh-pen">✏️</text>
          <text class="zh" :style="{ color: letter.color }">{{ word.zh }}</text>
        </view>
      </view>
    </view>

    <view class="controls">
      <view class="btn btn-side btn-prev" @click="go('prev')">
        <view class="btn-icon"><view class="tri-left"></view></view>
        <text>上一个</text>
      </view>
      <view class="btn btn-play" @click="playAll">
        <view class="btn-icon"><view class="tri-play"></view></view>
        <text>全部播放</text>
      </view>
      <view class="btn btn-side btn-next" @click="go('next')">
        <text>下一个</text>
        <view class="btn-icon"><view class="tri-right"></view></view>
      </view>
    </view>

    <!-- 学完庆祝彩带 -->
    <view class="confetti" v-if="celebrate">
      <text v-for="c in confettiPieces" :key="c.id" class="confetti-piece" :style="c.style">{{ c.char }}</text>
    </view>
  </view>
</template>

<script>
import { LETTERS } from '@/data/letters.js'
import { speak, speakCongrats, stopAudio, stopVictoryMusic } from '@/animations/audio.js'

const CONFETTI_CHARS = ['🎉', '✨', '⭐', '🎊', '💖']

export default {
  data() {
    return {
      index: 0,
      letter: null,
      locked: false,
      plays: [0, 0, 0],
      playing: [false, false, false],
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
      this.locked = true
      uni.showToast({ title: '请先学完前面的字母才能解锁', icon: 'none' })
      this.schedule(() => {
        uni.navigateBack({
          fail: () => uni.reLaunch({ url: '/pages/index/index' }),
        })
      }, 1200)
    }
  },
  onUnload() {
    this.clearTimers()
    stopAudio()
    stopVictoryMusic()
  },
  methods: {
    schedule(fn, ms) {
      this._timers = this._timers || []
      const id = setTimeout(() => {
        this._timers = (this._timers || []).filter((t) => t !== id)
        fn()
      }, ms)
      this._timers.push(id)
      return id
    },
    clearTimers() {
      const timers = this._timers || []
      timers.forEach(clearTimeout)
      this._timers = []
      const spkTimers = this._spkTimers || []
      spkTimers.forEach(clearTimeout)
      this._spkTimers = []
    },
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
      this.clearTimers()
      this.locked = false
      this.letter = LETTERS[this.index]
      this.plays = [0, 0, 0]
      this.playing = [false, false, false]
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
      if (this.locked) return
      speak(`Big ${this.letter.letter}`)
    },
    sayLower() {
      if (this.locked) return
      speak(`Small ${this.letter.lower}`)
    },
    flashSpeaker(i) {
      this.playing[i] = true
      this._spkTimers = this._spkTimers || []
      clearTimeout(this._spkTimers[i])
      this._spkTimers[i] = setTimeout(() => {
        this.playing[i] = false
      }, 1700)
    },
    playWord(i) {
      if (this.locked) return
      this.plays[i] += 1
      this.flashSpeaker(i)
      speak(this.letter.words[i].word)
      this.checkCelebrate()
    },
    playAll() {
      if (this.locked) return
      const run = (i) => {
        if (i >= 3) {
          this.checkCelebrate()
          return
        }
        this.plays[i] += 1
        this.flashSpeaker(i)
        speak(this.letter.words[i].word)
        this.schedule(() => run(i + 1), 1700)
      }
      run(0)
    },
    checkCelebrate() {
      if (this.plays.every((p) => p > 0)) {
        const completed = uni.getStorageSync('completed') || {}
        if (!completed[this.letter.letter]) {
          this.markCompleted()
          this.schedule(() => {
            speakCongrats(this.letter.letter)
          }, 700)
        }
      }
      if (!this.celebrate && this.plays.every((p) => p > 0)) {
        this.celebrate = true
        this.confettiPieces = Array.from({ length: 18 }, (_, i) => ({
          id: i,
          char: CONFETTI_CHARS[i % CONFETTI_CHARS.length],
          style: `left:${5 + Math.random() * 90}%; animation-delay:${(Math.random() * 1.2).toFixed(2)}s; font-size:${30 + Math.random() * 26}rpx;`,
        }))
        this.schedule(() => {
          this.celebrate = false
        }, 2800)
      }
    },
    go(direction) {
      if (this.locked) return
      if (direction === 'next') {
        if (this.index >= LETTERS.length - 1) {
          uni.showToast({ title: '已经是最后一个字母啦', icon: 'none' })
          return
        }
        const nextIndex = this.index + 1
        if (this.isLocked(LETTERS[nextIndex].letter)) {
          uni.showToast({ title: '先学完当前字母才能解锁下一个哦', icon: 'none' })
          return
        }
        stopAudio()
        this.index = nextIndex
      } else {
        if (this.index <= 0) {
          uni.showToast({ title: '已经是第一个字母啦', icon: 'none' })
          return
        }
        stopAudio()
        this.index -= 1
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
  position: relative;
  background-color: #ffffff;
  border-radius: 30rpx;
  overflow: hidden;
  margin-bottom: 26rpx;
  padding-bottom: 30rpx;
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

.spk-wrap {
  display: flex;
  align-items: center;
  margin-left: 14rpx;
}

.eq {
  display: flex;
  align-items: center;
  margin-left: 8rpx;
  height: 48rpx;
}

.eq-bar {
  width: 6rpx;
  height: 18rpx;
  margin-right: 5rpx;
  border-radius: 4rpx;
  background: #006ff2;
  animation: kf-eq 0.8s ease-in-out infinite;
}

.eq-bar.b2 {
  animation-delay: 0.1s;
}

.eq-bar.b3 {
  animation-delay: 0.2s;
}

.eq-bar.b4 {
  animation-delay: 0.3s;
}

@keyframes kf-eq {
  0%,
  100% {
    transform: scaleY(0.35);
  }
  30% {
    transform: scaleY(1.25);
  }
  60% {
    transform: scaleY(0.6);
  }
  80% {
    transform: scaleY(1.1);
  }
}

.zh-badge {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100rpx;
  height: 100rpx;
  border-radius: 0 190rpx 0 0;
  background: #fff8f3;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 30rpx;
  padding-right: 24rpx;
}

.zh-pen {
  font-size: 26rpx;
  margin-right: 6rpx;
  margin-top: 10rpx;
}

.zh {
  font-size: 30rpx;
  font-weight: bold;
  padding-left: 12rpx;
  margin-top: 50rpx;
  animation: kf-twinkle 2s ease-in-out infinite;
}

/* ===== 底部控制 ===== */
.controls {
  display: flex;
  margin-top: 24rpx;
}

.btn {
  flex: 1;
  height: 96rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30rpx;
  font-weight: 600;
  letter-spacing: 2rpx;
  border-radius: 24rpx;
  transition: transform 0.15s ease;
}

.btn:active {
  transform: scale(0.94);
}

.btn-play {
  flex: 1.4;
  margin: 0 16rpx;
  background: #ff8a5c;
  color: #ffffff;
}

.btn-side {
  background: #ffffff;
  color: #6b7a99;
  border: 2rpx solid #e6ecf7;
}

.btn-icon {
  width: 36rpx;
  height: 36rpx;
  margin-right: 10rpx;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-play .btn-icon {
  background: rgba(255, 255, 255, 0.35);
}

.btn-side .btn-icon {
  background: #eef3fc;
}

.btn-next .btn-icon {
  margin-right: 0;
  margin-left: 10rpx;
}

.tri-play {
  width: 0;
  height: 0;
  margin-left: 4rpx;
  border-left: 12rpx solid #ffffff;
  border-top: 8rpx solid transparent;
  border-bottom: 8rpx solid transparent;
}

.tri-left {
  width: 0;
  height: 0;
  border-right: 12rpx solid #6b7a99;
  border-top: 8rpx solid transparent;
  border-bottom: 8rpx solid transparent;
}

.tri-right {
  width: 0;
  height: 0;
  border-left: 12rpx solid #6b7a99;
  border-top: 8rpx solid transparent;
  border-bottom: 8rpx solid transparent;
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
