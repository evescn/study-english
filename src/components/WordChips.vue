<template>
  <view class="chips" v-if="words.length">
    <view
      class="chip"
      v-for="w in words"
      :key="w.word"
      hover-class="chip-press"
      hover-stay-time="100"
      @click="play(w)"
    >
      <text v-if="w.emoji" class="chip-emoji">{{ w.emoji }}</text>
      <view class="chip-text">
        <text class="chip-word">{{ w.word }}</text>
        <text v-if="w.zh" class="chip-zh">{{ w.zh }}</text>
      </view>
      <text class="chip-spk">🔊</text>
    </view>
  </view>
</template>

<script>
import { speak } from '@/animations/audio.js'

export default {
  name: 'WordChips',
  props: {
    words: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    play(word) {
      speak(word.audio || word.word)
    },
  },
}
</script>

<style scoped>
.chips {
  display: flex;
  flex-wrap: wrap;
}

.chip {
  display: flex;
  align-items: center;
  padding: 14rpx 18rpx;
  margin: 0 14rpx 14rpx 0;
  background: #f7faff;
  border: 2rpx solid #e6eefc;
  border-radius: 20rpx;
}

.chip-press {
  transform: scale(0.95);
  background: #eef5ff;
}

.chip-emoji {
  font-size: 40rpx;
  margin-right: 10rpx;
}

.chip-text {
  display: flex;
  flex-direction: column;
}

.chip-word {
  font-size: 30rpx;
  font-weight: bold;
  color: #33415c;
  line-height: 1.2;
}

.chip-zh {
  font-size: 22rpx;
  color: #8a94a8;
  margin-top: 2rpx;
}

.chip-spk {
  font-size: 24rpx;
  margin-left: 10rpx;
  opacity: 0.55;
}
</style>
