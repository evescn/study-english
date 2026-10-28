<template>
  <view class="lesson-home">
    <!-- 学期总览 -->
    <view class="semester">
      <view class="semester-top">
        <view class="semester-copy">
          <text class="semester-eyebrow">MIDI 1 · 全学期</text>
          <text class="semester-title">英语启蒙课程</text>
          <text class="semester-sub">5 个单元 · {{ lessonCount }} 节课堂记录</text>
        </view>
        <view class="semester-badge">
          <text class="badge-num">{{ ongoingUnits }}/{{ units.length }}</text>
          <text class="badge-label">单元已开课</text>
        </view>
      </view>
      <view class="progress">
        <view class="progress-fill" :style="{ width: progressWidth }"></view>
      </view>
    </view>

    <!-- 课程大纲 -->
    <view class="section-head">
      <text class="section-title">📖 课程大纲</text>
      <text class="section-sub">点开看单元目标</text>
    </view>
    <scroll-view class="unit-scroll" scroll-x :show-scrollbar="false">
      <view class="unit-strip">
        <view
          class="unit-card"
          v-for="u in units"
          :key="u.id"
          hover-class="unit-press"
          hover-stay-time="100"
          @click="openUnit(u)"
        >
          <view class="unit-bar" :style="{ background: u.color }"></view>
          <view class="unit-top">
            <text class="unit-num" :style="{ color: u.color }">Unit {{ u.id }}</text>
            <text class="unit-status" :class="u.status">{{ u.status === 'ongoing' ? '已开课' : '待开课' }}</text>
          </view>
          <text class="unit-emoji">{{ u.emoji }}</text>
          <text class="unit-title">{{ u.title }}</text>
          <text class="unit-zh">{{ u.zhTitle }}</text>
        </view>
      </view>
    </scroll-view>

    <!-- 课堂记录 -->
    <view class="section-head">
      <text class="section-title">🗂 课堂记录</text>
      <text class="section-sub">共 {{ lessonCount }} 节</text>
    </view>
    <view class="groups">
      <view class="group" v-for="g in groups" :key="g.key">
        <view class="group-head">
          <text class="group-dot" :style="{ background: g.color }"></text>
          <text class="group-title">{{ g.title }}</text>
          <text class="group-count">{{ g.lessons.length }} 节</text>
        </view>
        <view
          class="lesson-card"
          v-for="l in g.lessons"
          :key="l.id"
          hover-class="lesson-press"
          hover-stay-time="100"
          @click="openLesson(l)"
        >
          <view class="lesson-num" :style="{ background: g.color }">{{ l.id }}</view>
          <view class="lesson-info">
            <view class="lesson-line">
              <text class="lesson-title">{{ l.title }}</text>
              <text
                class="tag"
                v-for="t in l.tags"
                :key="t"
                :class="tagClass(t)"
              >{{ t }}</text>
            </view>
            <text class="lesson-focus">{{ l.focus.join(' · ') }}</text>
          </view>
          <text class="chevron">›</text>
        </view>
      </view>
    </view>

    <view class="footnote">Unit 3–5 课堂记录即将上线</view>
  </view>
</template>

<script>
import { PREP, UNITS, LESSONS, lessonsOfUnit, unitStatus } from '@/data/lessons.js'

export default {
  name: 'LessonHome',
  data() {
    return {
      units: [],
      groups: [],
      lessonCount: LESSONS.length,
    }
  },
  computed: {
    ongoingUnits() {
      return this.units.filter((u) => u.status === 'ongoing').length
    },
    progressWidth() {
      if (!this.units.length) return '0%'
      return (this.ongoingUnits / this.units.length) * 100 + '%'
    },
  },
  created() {
    this.units = UNITS.map((u) => ({ ...u, status: unitStatus(u) }))
    const groups = []
    const prepLessons = lessonsOfUnit(0)
    if (prepLessons.length) {
      groups.push({ key: PREP.key, title: PREP.title, color: PREP.color, lessons: prepLessons })
    }
    UNITS.forEach((u) => {
      const lessons = lessonsOfUnit(u.id)
      if (lessons.length) {
        groups.push({ key: u.key, title: `Unit ${u.id} · ${u.title}`, color: u.color, lessons })
      }
    })
    this.groups = groups
  },
  methods: {
    openUnit(unit) {
      uni.navigateTo({ url: `/pages/unit/unit?unit=${unit.id}` })
    },
    openLesson(lesson) {
      uni.navigateTo({ url: `/pages/lesson/lesson?id=${lesson.id}` })
    },
    tagClass(tag) {
      if (tag === '复习') return 'tag-review'
      if (tag === '测评') return 'tag-test'
      return 'tag-new'
    },
  },
}
</script>

<style scoped>
.lesson-home {
  padding-bottom: 20rpx;
}

/* ===== 学期总览 ===== */
.semester {
  padding: 30rpx;
  border-radius: 30rpx;
  background: linear-gradient(135deg, #6ec9ff 0%, #a5e3ff 45%, #ffc3de 100%);
  box-shadow: 0 12rpx 24rpx rgba(74, 144, 217, 0.22);
  margin-bottom: 30rpx;
}

.semester-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.semester-copy {
  display: flex;
  flex-direction: column;
}

.semester-eyebrow {
  font-size: 22rpx;
  font-weight: bold;
  color: rgba(255, 255, 255, 0.85);
  letter-spacing: 2rpx;
}

.semester-title {
  margin-top: 8rpx;
  font-size: 40rpx;
  font-weight: bold;
  color: #ffffff;
  text-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.12);
}

.semester-sub {
  margin-top: 8rpx;
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.92);
}

.semester-badge {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 14rpx 22rpx;
  border-radius: 22rpx;
  background: rgba(255, 255, 255, 0.3);
}

.badge-num {
  font-size: 38rpx;
  font-weight: bold;
  color: #ffffff;
  line-height: 1.1;
}

.badge-label {
  margin-top: 2rpx;
  font-size: 20rpx;
  color: rgba(255, 255, 255, 0.9);
}

.progress {
  height: 12rpx;
  margin-top: 24rpx;
  border-radius: 8rpx;
  background: rgba(255, 255, 255, 0.35);
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  border-radius: 8rpx;
  background: #ffffff;
  transition: width 0.4s ease;
}

/* ===== 分区标题 ===== */
.section-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin: 10rpx 6rpx 18rpx;
}

.section-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333333;
}

.section-sub {
  font-size: 22rpx;
  color: #9aa3b5;
}

/* ===== 单元横滑 ===== */
.unit-scroll {
  width: 100%;
  margin-bottom: 30rpx;
}

.unit-strip {
  display: flex;
  padding: 4rpx 4rpx 16rpx;
}

.unit-card {
  position: relative;
  flex-shrink: 0;
  width: 232rpx;
  margin-right: 18rpx;
  padding: 22rpx 20rpx 24rpx;
  border-radius: 26rpx;
  background: #ffffff;
  border: 2rpx solid #eef2f9;
  box-shadow: 0 8rpx 18rpx rgba(0, 0, 0, 0.06);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.unit-press {
  transform: scale(0.96);
}

.unit-bar {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 8rpx;
}

.unit-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.unit-num {
  font-size: 22rpx;
  font-weight: bold;
}

.unit-status {
  font-size: 18rpx;
  padding: 2rpx 10rpx;
  border-radius: 10rpx;
}

.unit-status.ongoing {
  color: #1a9f6b;
  background: #e3fbf0;
}

.unit-status.upcoming {
  color: #98a2b5;
  background: #f1f4f9;
}

.unit-emoji {
  margin-top: 16rpx;
  font-size: 54rpx;
  line-height: 1.1;
}

.unit-title {
  margin-top: 10rpx;
  font-size: 26rpx;
  font-weight: bold;
  color: #33415c;
  line-height: 1.3;
}

.unit-zh {
  margin-top: 4rpx;
  font-size: 21rpx;
  color: #8a94a8;
  line-height: 1.3;
}

/* ===== 课时分组 ===== */
.groups {
  display: flex;
  flex-direction: column;
}

.group {
  margin-bottom: 26rpx;
}

.group-head {
  display: flex;
  align-items: center;
  margin: 0 6rpx 14rpx;
}

.group-dot {
  width: 12rpx;
  height: 12rpx;
  border-radius: 50%;
  margin-right: 12rpx;
}

.group-title {
  flex: 1;
  font-size: 27rpx;
  font-weight: bold;
  color: #4a5568;
}

.group-count {
  font-size: 21rpx;
  color: #9aa3b5;
}

.lesson-card {
  display: flex;
  align-items: center;
  padding: 22rpx 24rpx;
  margin-bottom: 14rpx;
  border-radius: 24rpx;
  background: #ffffff;
  box-shadow: 0 6rpx 16rpx rgba(0, 0, 0, 0.05);
}

.lesson-press {
  transform: scale(0.98);
  background: #f7faff;
}

.lesson-num {
  width: 62rpx;
  height: 62rpx;
  line-height: 62rpx;
  text-align: center;
  border-radius: 20rpx;
  color: #ffffff;
  font-size: 28rpx;
  font-weight: bold;
  margin-right: 20rpx;
  flex-shrink: 0;
}

.lesson-info {
  flex: 1;
  min-width: 0;
}

.lesson-line {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.lesson-title {
  font-size: 29rpx;
  font-weight: bold;
  color: #333333;
  margin-right: 10rpx;
}

.tag {
  font-size: 18rpx;
  padding: 2rpx 10rpx;
  border-radius: 10rpx;
  margin: 4rpx 8rpx 4rpx 0;
  font-weight: bold;
}

.tag-new {
  color: #1a9f6b;
  background: #e3fbf0;
}

.tag-review {
  color: #2f7fd8;
  background: #e8f2ff;
}

.tag-test {
  color: #d97706;
  background: #fff3dd;
}

.lesson-focus {
  display: block;
  margin-top: 6rpx;
  font-size: 22rpx;
  color: #8a94a8;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.chevron {
  margin-left: 12rpx;
  font-size: 42rpx;
  color: #c3cad8;
  line-height: 1;
}

.footnote {
  margin: 20rpx 0 6rpx;
  text-align: center;
  font-size: 21rpx;
  color: #a8b0bf;
}
</style>
