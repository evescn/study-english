<template>
  <view class="page" v-if="lesson">
    <!-- 顶部信息 -->
    <view class="hero" :style="{ background: heroBg }">
      <view class="hero-top">
        <text class="hero-kicker">{{ unitLabel }}</text>
        <text class="hero-lesson">Lesson {{ lesson.id }}</text>
      </view>
      <text class="hero-title">{{ lesson.title }}</text>
      <view class="hero-tags">
        <text class="hero-tag" v-for="t in lesson.tags" :key="t">{{ t }}</text>
      </view>
    </view>

    <view class="content">
      <!-- 课堂重点 -->
      <view class="card" v-if="lesson.focus.length">
        <text class="card-title">📌 课堂重点</text>
        <view class="focus-chips">
          <text class="focus-chip" v-for="f in lesson.focus" :key="f">{{ f }}</text>
        </view>
      </view>

      <!-- 复习内容（复习字母排在复习单词前面） -->
      <view class="card" v-if="lesson.reviewNote || lesson.reviewWords.length || reviewPhonics.length || reviewSentences.length">
        <text class="card-title">🔁 复习内容</text>
        <text class="review-note" v-if="lesson.reviewNote">{{ lesson.reviewNote }}</text>
        <letter-sounds v-if="reviewPhonics.length" :letters="reviewPhonics" :color="heroColor" />
        <text class="review-phonics-note" v-if="lesson.reviewPhonicsNote">{{ lesson.reviewPhonicsNote }}</text>
        <word-chips :words="lesson.reviewWords" />
        <text class="review-subtitle" v-if="reviewSentences.length">复习句型</text>
        <view class="sentence-row" v-for="s in reviewSentences" :key="s.en">
          <view class="sentence-main">
            <text class="sentence-en">{{ s.en }}</text>
            <text class="sentence-zh" v-if="s.zh">{{ s.zh }}</text>
          </view>
          <text class="sentence-spk" @click="say(s.en)">🔊</text>
        </view>
      </view>

      <!-- 新学字母拼读 -->
      <view class="card" v-if="lesson.phonics.letters.length">
        <text class="card-title">🔤 字母拼读</text>
        <letter-sounds :letters="lesson.phonics.letters" :color="heroColor" />
        <text class="phonics-note">{{ lesson.phonics.note ? lesson.phonics.note + ' · ' : '' }}点字母听名称，点 🔊 听字母音</text>
      </view>

      <!-- 新学单词 -->
      <view class="card" v-if="lesson.newWords.length">
        <text class="card-title">✨ 新学单词</text>
        <word-chips :words="lesson.newWords" />
      </view>

      <!-- 课堂口令 -->
      <view class="card" v-if="lesson.commands.length">
        <text class="card-title">🗣 课堂口令</text>
        <view class="sentence-row" v-for="c in lesson.commands" :key="c.en">
          <view class="sentence-main">
            <text class="sentence-en">{{ c.en }}</text>
            <text class="sentence-zh" v-if="c.zh">{{ c.zh }}</text>
          </view>
          <text class="sentence-spk" @click="say(c.en)">🔊</text>
        </view>
      </view>

      <!-- 句型练习 -->
      <view class="card" v-if="lesson.sentences.length">
        <text class="card-title">💬 句型练习</text>
        <view class="sentence-row" v-for="s in lesson.sentences" :key="s.en">
          <view class="sentence-main">
            <text class="sentence-en">{{ s.en }}</text>
            <text class="sentence-zh" v-if="s.zh">{{ s.zh }}</text>
          </view>
          <text class="sentence-spk" @click="say(s.en)">🔊</text>
        </view>
      </view>

      <!-- 学习目标 -->
      <view class="card" v-if="lesson.objectives.length">
        <text class="card-title">🎯 学习目标</text>
        <view class="objective" v-for="(o, i) in lesson.objectives" :key="i">
          <text class="objective-num" :style="{ background: heroColor }">{{ i + 1 }}</text>
          <text class="objective-text">{{ o }}</text>
        </view>
      </view>

      <!-- 课后作业 -->
      <view class="card homework-card">
        <view class="hw-head">
          <text class="card-title">🎬 课后作业</text>
          <text class="hw-points" v-if="lesson.homework.points">+{{ lesson.homework.points }} 积分</text>
        </view>
        <text class="hw-task">{{ lesson.homework.task }}</text>
        <view class="hw-tip" v-for="(t, i) in lesson.homework.tips" :key="i">
          <text class="tip-dot">•</text>
          <text class="tip-text">{{ t }}</text>
        </view>
      </view>

      <!-- 备注 -->
      <view class="card note-card" v-if="lesson.note">
        <text class="card-title">📝 备注</text>
        <text class="note-text">{{ lesson.note }}</text>
      </view>
    </view>
  </view>
</template>

<script>
import { PREP, getLesson, getUnit } from '@/data/lessons.js'
import { speak, stopAudio } from '@/animations/audio.js'
import WordChips from '@/components/WordChips.vue'
import LetterSounds from '@/components/LetterSounds.vue'

function tint(hex, ratio) {
  const n = parseInt(hex.slice(1), 16)
  const r = (n >> 16) & 255
  const g = (n >> 8) & 255
  const b = n & 255
  const mix = (c) => Math.round(c + (255 - c) * ratio)
  return `rgb(${mix(r)}, ${mix(g)}, ${mix(b)})`
}

export default {
  components: { WordChips, LetterSounds },
  data() {
    return {
      lesson: null,
    }
  },
  computed: {
    reviewPhonics() {
      return (this.lesson && this.lesson.reviewPhonics) || []
    },
    reviewSentences() {
      return (this.lesson && this.lesson.reviewSentences) || []
    },
    unit() {
      if (!this.lesson || this.lesson.unitId === 0) return null
      return getUnit(this.lesson.unitId)
    },
    heroColor() {
      if (this.lesson && this.lesson.unitId === 0) return PREP.color
      return this.unit ? this.unit.color : '#45AAF2'
    },
    heroBg() {
      return `linear-gradient(135deg, ${this.heroColor} 0%, ${tint(this.heroColor, 0.5)} 100%)`
    },
    unitLabel() {
      if (!this.lesson) return ''
      if (this.lesson.unitId === 0) return PREP.title
      return this.unit ? `Unit ${this.unit.id} · ${this.unit.title}` : ''
    },
  },
  onLoad(query) {
    const lesson = getLesson(query.id)
    if (!lesson) {
      uni.showToast({ title: '课时不存在', icon: 'none' })
      this._backTimer = setTimeout(() => {
        uni.navigateBack({
          fail: () => uni.reLaunch({ url: '/pages/index/index' }),
        })
      }, 900)
      return
    }
    this.lesson = lesson
  },
  onUnload() {
    clearTimeout(this._backTimer)
    stopAudio()
  },
  methods: {
    say(text) {
      speak(text)
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
  padding: 34rpx 30rpx 30rpx;
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
  color: rgba(255, 255, 255, 0.9);
  font-weight: bold;
}

.hero-lesson {
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
  font-size: 44rpx;
  font-weight: bold;
  color: #ffffff;
  line-height: 1.25;
  text-shadow: 0 4rpx 10rpx rgba(0, 0, 0, 0.15);
}

.hero-tags {
  display: flex;
  flex-wrap: wrap;
  margin-top: 18rpx;
}

.hero-tag {
  font-size: 21rpx;
  font-weight: bold;
  color: #ffffff;
  background: rgba(255, 255, 255, 0.25);
  padding: 5rpx 16rpx;
  border-radius: 14rpx;
  margin: 0 12rpx 8rpx 0;
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

.focus-chips {
  display: flex;
  flex-wrap: wrap;
}

.focus-chip {
  font-size: 24rpx;
  color: #4a5568;
  background: #f2f7ff;
  border: 2rpx solid #e1ecff;
  padding: 8rpx 18rpx;
  border-radius: 16rpx;
  margin: 0 12rpx 12rpx 0;
}

.review-note {
  display: block;
  font-size: 25rpx;
  color: #5c6b85;
  line-height: 1.6;
  margin-bottom: 16rpx;
}

/* ===== 复习字母 ===== */
.review-phonics-note {
  display: block;
  margin: -4rpx 0 12rpx;
  font-size: 23rpx;
  color: #8a94a8;
}

.review-subtitle {
  display: block;
  margin: 8rpx 0 2rpx;
  font-size: 24rpx;
  font-weight: bold;
  color: #4a5568;
}

.phonics-note {
  display: block;
  margin-top: 4rpx;
  font-size: 23rpx;
  color: #8a94a8;
}

/* ===== 句型 ===== */
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

.sentence-spk {
  margin-left: 16rpx;
  font-size: 32rpx;
  opacity: 0.7;
}

/* ===== 目标 ===== */
.objective {
  display: flex;
  align-items: flex-start;
  margin-bottom: 12rpx;
}

.objective-num {
  width: 34rpx;
  height: 34rpx;
  line-height: 34rpx;
  text-align: center;
  border-radius: 50%;
  color: #ffffff;
  font-size: 20rpx;
  font-weight: bold;
  margin-right: 14rpx;
  flex-shrink: 0;
  margin-top: 2rpx;
}

.objective-text {
  flex: 1;
  font-size: 25rpx;
  color: #5c6b85;
  line-height: 1.55;
}

/* ===== 作业 ===== */
.homework-card {
  background: linear-gradient(160deg, #fff9f2 0%, #ffffff 100%);
  border: 2rpx dashed #ffd9b3;
}

.hw-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.hw-points {
  font-size: 22rpx;
  font-weight: bold;
  color: #ffffff;
  background: #ff8a5c;
  padding: 5rpx 16rpx;
  border-radius: 14rpx;
}

.hw-task {
  display: block;
  font-size: 26rpx;
  color: #5c4a3d;
  font-weight: bold;
  line-height: 1.55;
  margin-bottom: 12rpx;
}

.hw-tip {
  display: flex;
  align-items: flex-start;
  margin-bottom: 6rpx;
}

.tip-dot {
  color: #ffa502;
  margin-right: 8rpx;
  font-size: 24rpx;
}

.tip-text {
  flex: 1;
  font-size: 23rpx;
  color: #8a7a6b;
  line-height: 1.5;
}

/* ===== 备注 ===== */
.note-card {
  background: #f7faff;
}

.note-text {
  display: block;
  font-size: 24rpx;
  color: #6b7a99;
  line-height: 1.6;
}
</style>
