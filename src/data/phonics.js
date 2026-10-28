// 26 个字母的自然拼读音素
// ipa 用于展示，say 用于无音频时的 TTS 兜底（近似发音）
export const LETTER_SOUNDS = {
  A: { ipa: '/æ/', say: 'ah' },
  B: { ipa: '/b/', say: 'buh' },
  C: { ipa: '/k/', say: 'kuh' },
  D: { ipa: '/d/', say: 'duh' },
  E: { ipa: '/e/', say: 'eh' },
  F: { ipa: '/f/', say: 'fuh' },
  G: { ipa: '/g/', say: 'guh' },
  H: { ipa: '/h/', say: 'huh' },
  I: { ipa: '/ɪ/', say: 'ih' },
  J: { ipa: '/dʒ/', say: 'juh' },
  K: { ipa: '/k/', say: 'kuh' },
  L: { ipa: '/l/', say: 'luh' },
  M: { ipa: '/m/', say: 'muh' },
  N: { ipa: '/n/', say: 'nuh' },
  O: { ipa: '/ɔː/', say: 'aw' },
  P: { ipa: '/p/', say: 'puh' },
  Q: { ipa: '/kw/', say: 'kwuh' },
  R: { ipa: '/r/', say: 'ruh' },
  S: { ipa: '/s/', say: 'suh' },
  T: { ipa: '/t/', say: 'tuh' },
  U: { ipa: '/ʌ/', say: 'uh' },
  V: { ipa: '/v/', say: 'vuh' },
  W: { ipa: '/w/', say: 'wuh' },
  X: { ipa: '/ks/', say: 'ks' },
  Y: { ipa: '/j/', say: 'yuh' },
  Z: { ipa: '/z/', say: 'zuh' },
}

export function getLetterSound(letter) {
  const key = String(letter || '').toUpperCase()
  return LETTER_SOUNDS[key] || { ipa: '', say: key.toLowerCase() }
}
