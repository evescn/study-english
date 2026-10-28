<template>
  <view class="letter-badges">
    <view class="letter-card" v-for="l in letters" :key="l">
      <view class="case-col">
        <view class="letter-hit" hover-class="letter-press" hover-stay-time="100" @click="playLetterName(l, 'big')">
          <text class="lb-upper" :style="{ color }">{{ l[0] }}</text>
        </view>
        <view class="sound-hit" hover-class="letter-press" hover-stay-time="100" @click="playLetterSound(l)">
          <text class="sound-icon">🔊</text>
          <text class="lb-ipa">{{ soundOf(l).ipa }}</text>
        </view>
      </view>
      <view class="case-col">
        <view class="letter-hit" hover-class="letter-press" hover-stay-time="100" @click="playLetterName(l, 'small')">
          <text class="lb-lower" :style="{ color }">{{ l[1] }}</text>
        </view>
        <view class="sound-hit" hover-class="letter-press" hover-stay-time="100" @click="playLetterSound(l)">
          <text class="sound-icon">🔊</text>
          <text class="lb-ipa">{{ soundOf(l).ipa }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { speak, speakLetterSound } from '@/animations/audio.js'
import { getLetterSound } from '@/data/phonics.js'

export default {
  name: 'LetterSounds',
  props: {
    letters: {
      type: Array,
      default: () => [],
    },
    color: {
      type: String,
      default: '#45AAF2',
    },
  },
  methods: {
    playLetterName(letter, variant) {
      speak(variant === 'small' ? `Small ${letter[1]}` : `Big ${letter[0]}`)
    },
    playLetterSound(letter) {
      const sound = getLetterSound(letter[0])
      speakLetterSound(letter[0], sound.say)
    },
    soundOf(letter) {
      return getLetterSound(letter[0])
    },
  },
}
</script>

<style scoped>
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
</style>
