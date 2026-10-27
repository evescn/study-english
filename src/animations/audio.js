// 发音模块：一期 H5 用 Web Speech API，二期小程序/三期 App 替换为录音或插件
// 现改为：优先播放内置音频（src/static/audio，真实美式发音），失败时兜底浏览器 TTS
let cachedVoices = []
let warned = false
let currentAudio = null
let currentInner = null

const AUDIO_BASE = '/static/audio/'

function audioUrl(text) {
  const t = text.trim()
  if (/^Big [A-Z]$/.test(t)) return `${AUDIO_BASE}big-${t.slice(4).toLowerCase()}.m4a`
  if (/^Small [a-z]$/.test(t)) return `${AUDIO_BASE}small-${t.slice(6).toLowerCase()}.m4a`
  return `${AUDIO_BASE}${t.toLowerCase().replace(/\s+/g, '-')}.m4a`
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

export function speak(text) {
  const url = audioUrl(text)
  // 1) uni 音频 API（App / H5 / 小程序通用）
  if (typeof uni !== 'undefined' && uni.createInnerAudioContext) {
    try {
      if (currentInner) {
        currentInner.stop()
        currentInner.destroy()
        currentInner = null
      }
      const inner = uni.createInnerAudioContext()
      currentInner = inner
      inner.src = url
      inner.volume = 1
      inner.play()
      return
    } catch (err) {
      // 继续尝试 HTML5 Audio
    }
  }
  // 2) HTML5 Audio 兜底（H5 浏览器）
  if (typeof Audio !== 'undefined') {
    try {
      if (currentAudio) {
        currentAudio.pause()
        currentAudio = null
      }
      const audio = new Audio(url)
      currentAudio = audio
      audio.volume = 1
      audio.play().catch(() => speakFallback(text))
      return
    } catch (err) {
      speakFallback(text)
      return
    }
  }
  // 3) 浏览器 TTS 最后兜底（仅 H5）
  speakFallback(text)
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
