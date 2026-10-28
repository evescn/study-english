// 发音模块：优先播放内置音频（src/static/audio，Edge TTS 美式女声），失败时兜底浏览器 TTS
let cachedVoices = []
let warned = false
let currentAudio = null
let currentInner = null
let currentMusic = null

const AUDIO_BASE = '/static/audio/'
const PHONICS_BASE = '/static/audio/phonics/'

function audioUrl(text) {
  const t = text.trim()
  if (/^Big [A-Z]$/.test(t)) return `${AUDIO_BASE}big-${t.slice(4).toLowerCase()}.mp3`
  if (/^Small [a-z]$/.test(t)) return `${AUDIO_BASE}small-${t.slice(6).toLowerCase()}.mp3`
  const slug = t.toLowerCase().replace(/[,.?!']/g, '').replace(/\s+/g, '-')
  return `${AUDIO_BASE}${slug}.mp3`
}

function refreshVoices() {
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    cachedVoices = window.speechSynthesis.getVoices()
  }
}

if (typeof window !== 'undefined' && window.speechSynthesis) {
  refreshVoices()
  window.speechSynthesis.onvoiceschanged = refreshVoices
}

export function ttsAvailable() {
  return typeof window !== 'undefined' && !!window.speechSynthesis
}

export function voiceInfo() {
  const voices = cachedVoices.length
    ? cachedVoices
    : (window.speechSynthesis ? window.speechSynthesis.getVoices() : [])
  return {
    supported: ttsAvailable(),
    count: voices.length,
    usVoices: voices.filter((v) => v.lang === 'en-US').map((v) => v.name),
  }
}

// 优先选择美式英语女性清晰音色（Samantha/Zira/Aria/Jenny 等），其次任选美式，再退回英语
function pickUSVoice() {
  const voices = cachedVoices.length ? cachedVoices : (window.speechSynthesis ? window.speechSynthesis.getVoices() : [])
  return (
    voices.find((v) => v.lang === 'en-US' && /female|samantha|zira|aria|jenny/i.test(v.name)) ||
    voices.find((v) => v.lang === 'en-US') ||
    voices.find((v) => v.lang && v.lang.toLowerCase().startsWith('en'))
  )
}

function notifyUnsupported() {
  if (warned) return
  warned = true
  // #ifdef H5
  if (typeof uni !== 'undefined' && uni.showToast) {
    uni.showToast({
      title: '当前浏览器不支持朗读，请用 Chrome 打开，并检查手机“文字转语音”设置',
      icon: 'none',
      duration: 3000,
    })
  }
  // #endif
}

function releaseInner(inner) {
  try {
    inner.stop()
    inner.destroy()
  } catch (err) {}
}

function playHtmlAudio(url, fallbackText) {
  if (typeof Audio === 'undefined') return false
  try {
    if (currentAudio) {
      currentAudio.pause()
      currentAudio = null
    }
    const audio = new Audio(url)
    currentAudio = audio
    audio.volume = 1
    audio.onended = () => {
      if (currentAudio === audio) currentAudio = null
    }
    audio.play().catch((err) => {
      // 被下一个音源/停止操作打断属正常，不触发 TTS 兜底
      if (err && err.name === 'AbortError') return
      speakFallback(fallbackText)
    })
    return true
  } catch (err) {
    return false
  }
}

function playUrl(url, fallbackText) {
  // #ifdef H5
  // H5 优先用原生 Audio：可捕获 play() 中断，避免控制台报错与误触发 TTS
  if (playHtmlAudio(url, fallbackText)) return
  // #endif
  // 1) uni 音频 API（App / 小程序）
  if (typeof uni !== 'undefined' && uni.createInnerAudioContext) {
    try {
      if (currentInner) {
        releaseInner(currentInner)
        currentInner = null
      }
      const inner = uni.createInnerAudioContext()
      currentInner = inner
      inner.src = url
      inner.volume = 1
      inner.onEnded(() => {
        if (currentInner === inner) currentInner = null
        releaseInner(inner)
      })
      inner.onError(() => {
        if (currentInner === inner) currentInner = null
        releaseInner(inner)
        speakFallback(fallbackText)
      })
      inner.play()
      return
    } catch (err) {
      // 继续尝试 HTML5 Audio
    }
  }
  // 2) HTML5 Audio 兜底（非 H5 平台）
  if (playHtmlAudio(url, fallbackText)) return
  // 3) 浏览器 TTS 最后兜底（仅 H5）
  speakFallback(fallbackText)
}

export function speak(text) {
  playUrl(audioUrl(text), text)
}

// 播放字母本身的自然拼读音素（Aa/Bb... 共用同一个音）
export function speakLetterSound(letter, fallbackText) {
  const key = String(letter || '').toLowerCase()
  if (!/^[a-z]$/.test(key)) return
  playUrl(`${PHONICS_BASE}${key}.mp3`, fallbackText || key)
}

// 立即停止当前朗读（离开页面时调用，避免声音继续播放）
export function stopAudio() {
  if (currentInner) {
    releaseInner(currentInner)
    currentInner = null
  }
  if (currentAudio) {
    try {
      currentAudio.pause()
      currentAudio.currentTime = 0
    } catch (err) {}
    currentAudio = null
  }
  // #ifdef H5
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    window.speechSynthesis.cancel()
  }
  // #endif
}

// 字母学习完成的中文打卡语音 + 胜利音乐：恭喜你字母X打卡成功，可前往下一个字母Y
export function speakCongrats(letter) {
  playVictoryMusic()
  playUrl(`${AUDIO_BASE}congrats-${letter.toLowerCase()}.mp3`, `恭喜你字母${letter}打卡成功`)
}

// 欢快的胜利音乐片段（与打卡语音同时播放）
export function playVictoryMusic() {
  stopVictoryMusic()
  const url = `${AUDIO_BASE}victory.wav`
  if (typeof uni !== 'undefined' && uni.createInnerAudioContext) {
    try {
      const music = uni.createInnerAudioContext()
      currentMusic = music
      music.src = url
      music.volume = 0.85
      music.play()
      return
    } catch (err) {
      // 继续尝试 HTML5 Audio
    }
  }
  if (typeof Audio !== 'undefined') {
    try {
      const music = new Audio(url)
      currentMusic = music
      music.volume = 0.85
      music.play().catch(() => {})
    } catch (err) {}
  }
}

export function stopVictoryMusic() {
  if (!currentMusic) return
  try {
    if (typeof currentMusic.stop === 'function') currentMusic.stop()
    if (typeof currentMusic.destroy === 'function') currentMusic.destroy()
    else currentMusic.pause()
  } catch (err) {}
  currentMusic = null
}

function speakFallback(text) {
  // #ifdef H5
  if (!ttsAvailable()) {
    notifyUnsupported()
    return
  }
  try {
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    const voice = pickUSVoice()
    if (voice) utterance.voice = voice
    utterance.lang = 'en-US'
    utterance.rate = 0.7 // 放慢语速，拼读清楚
    utterance.pitch = 1.05 // 略高音色，更活泼清晰
    utterance.volume = 1 // 洪亮（最大音量）
    utterance.onerror = () => notifyUnsupported()
    window.speechSynthesis.speak(utterance)
  } catch (err) {
    notifyUnsupported()
  }
  // #endif
}
