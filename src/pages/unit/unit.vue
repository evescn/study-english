<template>
  <view class="page" v-if="unit">
    <!-- 顶部信息 -->
    <view class="hero" :style="{ background: heroBg }">
      <view class="hero-top">
        <text class="hero-kicker">Unit {{ unit.id }} · Midi1</text>
        <text class="hero-status">{{ unitLessons.length ? '已开课' : '待开课' }}</text>
      </view>
      <text class="hero-title">{{ unit.title }}</text>
      <text class="hero-zh">{{ unit.zhTitle }}</text>
      <text class="hero-theme">🎯 {{ unit.theme }}</text>
    </view>

    <view class="content">
      <!-- 核心词汇 -->
      <view class="card" v-for="g in unit.wordGroups" :key="g.label">
        <text class="card-title">🧩 {{ g.label }}</text>
        <word-chips :words="g.words" />
      </view>

      <!-- 核心句型 -->
      <view class="card" v-if="unit.sentences.length">
        <text class="card-title">💬 核心句型</text>
        <view class="sentence-row" v-for="s in unit.sentences" :key="s.en">
          <view class="sentence-main">
            <text class="sentence-en">{{ s.en }}</text>
            <text class="sentence-zh" v-if="s.zh">{{ s.zh }}</text>
          </view>
          <text class="sentence-spk" @click="say(s.en)">🔊</text>
        </view>
      </view>

      <!-- 日常对话 -->
      <view class="card" v-if="unit.dialogue">
        <text class="card-title">🗨 日常对话</text>
        <view class="sentence-row">
          <view class="sentence-main">
            <text class="dialogue-label">Q</text>
            <text class="sentence-en">{{ unit.dialogue.q }}</text>
          </view>
          <text class="sentence-spk" @click="say(unit.dialogue.q)">🔊</text>
        </view>
        <view class="sentence-row">
          <view class="sentence-main">
            <text class="dialogue-label answer">A</text>
            <text class="sentence-en">{{ unit.dialogue.a }}</text>
          </view>
          <text class="sentence-spk" @click="say(unit.dialogue.a)">🔊</text>
        </view>
        <text class="dialogue-zh">{{ unit.dialogue.zh }}</text>
      </view>

      <!-- 自然拼读 -->
      <view class="card" v-if="unit.phonics.length">
        <text class="card-title">🔤 自然拼读</text>
        <view class="letter-badges">
          <view class="letter-card" v-for="l in unit.phonics" :key="l">
            <view class="case-col">
              <view class="letter-hit" hover-class="letter-press" hover-stay-time="100" @click="playLetterName(l, 'big')">
                <text class="lb-upper" :style="{ color: unit.color }">{{ l[0] }}</text>
              </view>
              <view class="sound-hit" hover-class="letter-press" hover-stay-time="100" @click="playLetterSound(l)">
                <text class="sound-icon">🔊</text>
                <text class="lb-ipa">{{ soundOf(l).ipa }}</text>
              </view>
            </view>
            <view class="case-col">
              <view class="letter-hit" hover-class="letter-press" hover-stay-time="100" @click="playLetterName(l, 'small')">
                <text class="lb-lower" :style="{ color: unit.color }">{{ l[1] }}</text>
              </view>
              <view class="sound-hit" hover-class="letter-press" hover-stay-time="100" @click="playLetterSound(l)">
                <text class="sound-icon">🔊</text>
                <text class="lb-ipa">{{ soundOf(l).ipa }}</text>
              </view>
            </view>
          </view>
        </view>
        <text class="phonics-note">点字母听名称，点 🔊 听字母音</text>
      </view>

      <!-- 绘本 -->
      <view class="card" v-if="unit.pictureBook">
        <text class="card-title">📚 绘本</text>
        <text class="book-text">{{ unit.pictureBook }}</text>
      </view>

      <!-- 本单元课时 -->
      <view class="card" v-if="unitLessons.length">
        <text class="card-title">🗂 本单元课时</text>
        <view
          class="lesson-row"
          v-for="l in unitLessons"
          :key="l.id"
          hover-class="lesson-press"
          hover-stay-time="100"
          @click="openLesson(l)"
        >
          <view class="lesson-num" :style="{ background: unit.color }">{{ l.id }}</view>
          <view class="lesson-main">
            <text class="lesson-title">{{ l.title }}</text>
            <text class="lesson-focus">{{ l.focus.join(' · ') }}</text>
          </view>
          <text class="chevron">›</text>
        </view>
      </view>
      <view class="empty" v-else>
        <text class="empty-emoji">🚧</text>
        <text class="empty-title">课堂记录即将上线</text>
        <text class="empty-desc">本单元教学目标已经就绪，课时记录会在开课后同步～</text>
      </view>
    </view>
  </view>
</template>

<script>
import { getUnit, lessonsOfUnit } from '@/data/lessons.js'
import { getLetterSound } from '@/data/phonics.js'
import { speak, speakLetterSound, stopAudio } from '@/animations/audio.js'
import WordChips from '@/components/WordChips.vue'

function tint(hex, ratio) {
  const n = parseInt(hex.slice(1), 16)
  const r = (n >> 16) & 255
  const g = (n >> 8) & 255
  const b = n & 255
  const mix = (c) => Math.round(c + (255 - c) * ratio)
  return `rgb(${mix(r)}, ${mix(g)}, ${mix(b)})`
}

export default {
  components: { WordChips },
  data() {
    return {
      unit: null,
      unitLessons: [],
    }
  },
  computed: {
    heroBg() {
      if (!this.unit) return '#45AAF2'
      return `linear-gradient(135deg, ${this.unit.color} 0%, ${tint(this.unit.color, 0.5)} 100%)`
    },
  },
  onLoad(query) {
    const unit = getUnit(query.unit)
    if (!unit) {
      uni.showToast({ title: '单元不存在', icon: 'none' })
      this._backTimer = setTimeout(() => {
        uni.navigateBack({
          fail: () => uni.reLaunch({ url: '/pages/index/index' }),
        })
      }, 900)
      return
    }
    this.unit = unit
    this.unitLessons = lessonsOfUnit(unit.id)
  },
  onUnload() {
    clearTimeout(this._backTimer)
    stopAudio()
  },
  methods: {
    playLetterName(letter, variant) {
      if (variant === 'small') {
        speak(`Small ${letter[1]}`)
      } else {
        speak(`Big ${letter[0]}`)
      }
    },
    playLetterSound(letter) {
      const sound = getLetterSound(letter[0])
      speakLetterSound(letter[0], sound.say)
    },
    soundOf(letter) {
      return getLetterSound(letter[0])
    },
    say(text) {
      speak(text)
    },
    openLesson(lesson) {
      uni.navigateTo({ url: `/pages/lesson/lesson?id=${lesson.id}` })
    },
  },
}
</script>

<style scoped>
.page {
  min-height: 100vh;
  padding: 30rpx 26rpx 60rpx;
  box-sizing: border-box;
  background: linear-gradient(180deg, #fff6ec 0%, #eef6ff 100%);
}

/* ===== Hero ===== */
.hero {
  padding: 34rpx 30rpx 32rpx;
  border-radius: 32rpx;
  box-shadow: 0 12rpx 26rpx rgba(0, 0, 0, 0.14);
}

.hero-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.hero-kicker {
  font-size: 22rpx;
  font-weight: bold;
  color: rgba(255, 255, 255, 0.9);
}

.hero-status {
  font-size: 20rpx;
  font-weight: bold;
  color: #ffffff;
  background: rgba(255, 255, 255, 0.28);
  padding: 4rpx 16rpx;
  border-radius: 14rpx;
}

.hero-title {
  display: block;
  margin-top: 16rpx;
  font-size: 46rpx;
  font-weight: bold;
  color: #ffffff;
  line-height: 1.2;
  text-shadow: 0 4rpx 10rpx rgba(0, 0, 0, 0.15);
}

.hero-zh {
  display: block;
  margin-top: 8rpx;
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.94);
}

.hero-theme {
  display: inline-block;
  margin-top: 18rpx;
  font-size: 23rpx;
  color: #ffffff;
  background: rgba(255, 255, 255, 0.25);
  padding: 8rpx 20rpx;
  border-radius: 16rpx;
}

/* ===== 卡片 ===== */
.content {
  margin-top: 26rpx;
}

.card {
  background: #ffffff;
  border-radius: 28rpx;
  padding: 26rpx 26rpx 20rpx;
  margin-bottom: 22rpx;
  box-shadow: 0 6rpx 16rpx rgba(0, 0, 0, 0.06);
}

.card-title {
  display: block;
  font-size: 30rpx;
  font-weight: bold;
  color: #333333;
  margin-bottom: 16rpx;
}

/* ===== 句型 / 对话 ===== */
.sentence-row {
  display: flex;
  align-items: center;
  padding: 14rpx 0;
  border-bottom: 2rpx dashed #eef2f9;
}

.sentence-row:last-child {
  border-bottom: none;
}

.sentence-main {
  flex: 1;
  min-width: 0;
}

.sentence-en {
  display: block;
  font-size: 28rpx;
  font-weight: bold;
  color: #33415c;
  line-height: 1.4;
}

.sentence-zh {
  display: block;
  margin-top: 4rpx;
  font-size: 22rpx;
  color: #8a94a8;
  line-height: 1.4;
}

.dialogue-label {
  display: inline-block;
  font-size: 20rpx;
  font-weight: bold;
  color: #ffffff;
  background: #6ec9ff;
  width: 32rpx;
  height: 32rpx;
  line-height: 32rpx;
  text-align: center;
  border-radius: 50%;
  margin-bottom: 6rpx;
}

.dialogue-label.answer {
  background: #ff8a5c;
}

.dialogue-zh {
  display: block;
  margin-top: 10rpx;
  font-size: 23rpx;
  color: #8a94a8;
  line-height: 1.5;
}

.sentence-spk {
  margin-left: 16rpx;
  font-size: 32rpx;
  opacity: 0.7;
}

/* ===== 字母 ===== */
.letter-badges {
  display: flex;
  flex-wrap: wrap;
}

.letter-card {
  display: flex;
  align-items: stretch;
  padding: 12rpx 14rpx;
  margin: 0 14rpx 14rpx 0;
  border-radius: 20rpx;
  background: linear-gradient(160deg, #f4f9ff 0%, #ffffff 100%);
  border: 2rpx solid #dbe9ff;
}

.case-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 8rpx;
}

.case-col + .case-col {
  border-left: 2rpx dashed #e3edfb;
  margin-left: 6rpx;
  padding-left: 14rpx;
}

.letter-hit {
  padding: 2rpx 8rpx;
  border-radius: 12rpx;
}

.sound-hit {
  display: flex;
  align-items: center;
  margin-top: 8rpx;
  padding: 6rpx 14rpx;
  border-radius: 14rpx;
  background: #eef5ff;
}

.letter-press {
  transform: scale(0.9);
  background: #eaf3ff;
}

.lb-upper {
  font-size: 44rpx;
  font-weight: bold;
  line-height: 1;
}

.lb-lower {
  font-size: 32rpx;
  font-weight: bold;
  line-height: 1;
  opacity: 0.78;
}

.sound-icon {
  font-size: 20rpx;
  margin-right: 5rpx;
  opacity: 0.7;
}

.lb-ipa {
  font-size: 21rpx;
  color: #5c6b85;
}

.phonics-note {
  display: block;
  margin-top: 4rpx;
  font-size: 23rpx;
  color: #8a94a8;
}

/* ===== 绘本 ===== */
.book-text {
  display: block;
  font-size: 25rpx;
  color: #5c6b85;
  line-height: 1.6;
}

/* ===== 课时列表 ===== */
.lesson-row {
  display: flex;
  align-items: center;
  padding: 16rpx 0;
  border-bottom: 2rpx dashed #eef2f9;
}

.lesson-row:last-child {
  border-bottom: none;
}

.lesson-press {
  background: #f7faff;
}

.lesson-num {
  width: 56rpx;
  height: 56rpx;
  line-height: 56rpx;
  text-align: center;
  border-radius: 18rpx;
  color: #ffffff;
  font-size: 26rpx;
  font-weight: bold;
  margin-right: 18rpx;
  flex-shrink: 0;
}

.lesson-main {
  flex: 1;
  min-width: 0;
}

.lesson-title {
  display: block;
  font-size: 28rpx;
  font-weight: bold;
  color: #333333;
}

.lesson-focus {
  display: block;
  margin-top: 4rpx;
  font-size: 22rpx;
  color: #8a94a8;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.chevron {
  margin-left: 12rpx;
  font-size: 40rpx;
  color: #c3cad8;
  line-height: 1;
}

/* ===== 空状态 ===== */
.empty {
  background: #ffffff;
  border-radius: 28rpx;
  border: 2rpx dashed #ffc3a0;
  padding: 54rpx 30rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 6rpx 16rpx rgba(0, 0, 0, 0.05);
}

.empty-emoji {
  font-size: 76rpx;
}

.empty-title {
  margin-top: 16rpx;
  font-size: 30rpx;
  font-weight: bold;
  color: #ff8a5c;
}

.empty-desc {
  margin-top: 10rpx;
  font-size: 23rpx;
  color: #999999;
  text-align: center;
  line-height: 1.5;
}
</style>
