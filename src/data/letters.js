// 26 字母 × 3 单词（一期内容定稿）
// animation 字段对应 App.vue 中的动画模板：fall/bounce/walk/fly/spin/grow/wiggle/twinkle/drive/burst/glow
// emoji 为占位插画，二期将替换为手绘 PNG/精灵图
export const LETTERS = [
  { letter: 'A', lower: 'a', color: '#FF6B6B', words: [
    { word: 'Apple', zh: '苹果', emoji: '🍎', animation: 'fall' },
    { word: 'Ant', zh: '蚂蚁', emoji: '🐜', animation: 'walk' },
    { word: 'Airplane', zh: '飞机', emoji: '✈️', animation: 'fly' },
  ]},
  { letter: 'B', lower: 'b', color: '#FF9F43', words: [
    { word: 'Ball', zh: '球', emoji: '⚽', animation: 'bounce' },
    { word: 'Banana', zh: '香蕉', emoji: '🍌', animation: 'grow' },
    { word: 'Bear', zh: '熊', emoji: '🐻', animation: 'walk' },
  ]},
  { letter: 'C', lower: 'c', color: '#26DE81', words: [
    { word: 'Cat', zh: '猫', emoji: '🐱', animation: 'walk' },
    { word: 'Car', zh: '小汽车', emoji: '🚗', animation: 'drive' },
    { word: 'Cake', zh: '蛋糕', emoji: '🎂', animation: 'grow' },
  ]},
  { letter: 'D', lower: 'd', color: '#45AAF2', words: [
    { word: 'Dog', zh: '狗', emoji: '🐶', animation: 'walk' },
    { word: 'Duck', zh: '鸭子', emoji: '🦆', animation: 'walk' },
    { word: 'Doll', zh: '娃娃', emoji: '🪆', animation: 'bounce' },
  ]},
  { letter: 'E', lower: 'e', color: '#FD9644', words: [
    { word: 'Egg', zh: '鸡蛋', emoji: '🥚', animation: 'fall' },
    { word: 'Elephant', zh: '大象', emoji: '🐘', animation: 'walk' },
    { word: 'Eye', zh: '眼睛', emoji: '👁️', animation: 'twinkle' },
  ]},
  { letter: 'F', lower: 'f', color: '#A55EEA', words: [
    { word: 'Fish', zh: '鱼', emoji: '🐟', animation: 'drive' },
    { word: 'Flower', zh: '花', emoji: '🌸', animation: 'grow' },
    { word: 'Frog', zh: '青蛙', emoji: '🐸', animation: 'bounce' },
  ]},
  { letter: 'G', lower: 'g', color: '#1DD1A1', words: [
    { word: 'Girl', zh: '女孩', emoji: '👧', animation: 'walk' },
    { word: 'Grapes', zh: '葡萄', emoji: '🍇', animation: 'grow' },
    { word: 'Guitar', zh: '吉他', emoji: '🎸', animation: 'wiggle' },
  ]},
  { letter: 'H', lower: 'h', color: '#F368E0', words: [
    { word: 'Hat', zh: '帽子', emoji: '🎩', animation: 'fall' },
    { word: 'Horse', zh: '马', emoji: '🐴', animation: 'walk' },
    { word: 'House', zh: '房子', emoji: '🏠', animation: 'grow' },
  ]},
  { letter: 'I', lower: 'i', color: '#FFA502', words: [
    { word: 'Ice Cream', zh: '冰淇淋', emoji: '🍦', animation: 'grow' },
    { word: 'Insect', zh: '昆虫', emoji: '🐛', animation: 'walk' },
    { word: 'Igloo', zh: '冰屋', emoji: '🛖', animation: 'twinkle' },
  ]},
  { letter: 'J', lower: 'j', color: '#5F27CD', words: [
    { word: 'Juice', zh: '果汁', emoji: '🧃', animation: 'fall' },
    { word: 'Jellyfish', zh: '水母', emoji: '🪼', animation: 'wiggle' },
    { word: 'Jacket', zh: '夹克', emoji: '🧥', animation: 'spin' },
  ]},
  { letter: 'K', lower: 'k', color: '#0ABDE3', words: [
    { word: 'Kite', zh: '风筝', emoji: '🪁', animation: 'fly' },
    { word: 'Kangaroo', zh: '袋鼠', emoji: '🦘', animation: 'bounce' },
    { word: 'Key', zh: '钥匙', emoji: '🔑', animation: 'twinkle' },
  ]},
  { letter: 'L', lower: 'l', color: '#EE5A24', words: [
    { word: 'Lion', zh: '狮子', emoji: '🦁', animation: 'walk' },
    { word: 'Lemon', zh: '柠檬', emoji: '🍋', animation: 'bounce' },
    { word: 'Leaf', zh: '树叶', emoji: '🍃', animation: 'fall' },
  ]},
  { letter: 'M', lower: 'm', color: '#3867D6', words: [
    { word: 'Monkey', zh: '猴子', emoji: '🐒', animation: 'bounce' },
    { word: 'Moon', zh: '月亮', emoji: '🌙', animation: 'twinkle' },
    { word: 'Milk', zh: '牛奶', emoji: '🥛', animation: 'grow' },
  ]},
  { letter: 'N', lower: 'n', color: '#0BE881', words: [
    { word: 'Nose', zh: '鼻子', emoji: '👃', animation: 'glow' },
    { word: 'Nest', zh: '鸟巢', emoji: '🪺', animation: 'grow' },
    { word: 'Nurse', zh: '护士', emoji: '👩‍⚕️', animation: 'walk' },
  ]},
  { letter: 'O', lower: 'o', color: '#FA983C', words: [
    { word: 'Orange', zh: '橙子', emoji: '🍊', animation: 'fall' },
    { word: 'Owl', zh: '猫头鹰', emoji: '🦉', animation: 'twinkle' },
    { word: 'Octopus', zh: '章鱼', emoji: '🐙', animation: 'wiggle' },
  ]},
  { letter: 'P', lower: 'p', color: '#EB3B5A', words: [
    { word: 'Pig', zh: '小猪', emoji: '🐷', animation: 'walk' },
    { word: 'Pizza', zh: '披萨', emoji: '🍕', animation: 'grow' },
    { word: 'Plane', zh: '飞机', emoji: '✈️', animation: 'fly' },
  ]},
  { letter: 'Q', lower: 'q', color: '#8854D0', words: [
    { word: 'Queen', zh: '女王', emoji: '👑', animation: 'glow' },
    { word: 'Quilt', zh: '被子', emoji: '🛏️', animation: 'glow' },
    { word: 'Question', zh: '问号', emoji: '❓', animation: 'twinkle' },
  ]},
  { letter: 'R', lower: 'r', color: '#4B7BEC', words: [
    { word: 'Rabbit', zh: '兔子', emoji: '🐰', animation: 'bounce' },
    { word: 'Rainbow', zh: '彩虹', emoji: '🌈', animation: 'twinkle' },
    { word: 'Robot', zh: '机器人', emoji: '🤖', animation: 'walk' },
  ]},
  { letter: 'S', lower: 's', color: '#F7B731', words: [
    { word: 'Sun', zh: '太阳', emoji: '☀️', animation: 'spin' },
    { word: 'Star', zh: '星星', emoji: '⭐', animation: 'twinkle' },
    { word: 'Snake', zh: '蛇', emoji: '🐍', animation: 'wiggle' },
  ]},
  { letter: 'T', lower: 't', color: '#E84393', words: [
    { word: 'Tiger', zh: '老虎', emoji: '🐯', animation: 'walk' },
    { word: 'Tree', zh: '树', emoji: '🌳', animation: 'grow' },
    { word: 'Train', zh: '火车', emoji: '🚂', animation: 'drive' },
  ]},
  { letter: 'U', lower: 'u', color: '#20BF6B', words: [
    { word: 'Umbrella', zh: '雨伞', emoji: '☂️', animation: 'fall' },
    { word: 'Uncle', zh: '叔叔', emoji: '👨', animation: 'walk' },
    { word: 'Up', zh: '向上', emoji: '⬆️', animation: 'fly' },
  ]},
  { letter: 'V', lower: 'v', color: '#3B3B98', words: [
    { word: 'Van', zh: '货车', emoji: '🚐', animation: 'drive' },
    { word: 'Violin', zh: '小提琴', emoji: '🎻', animation: 'wiggle' },
    { word: 'Volcano', zh: '火山', emoji: '🌋', animation: 'burst' },
  ]},
  { letter: 'W', lower: 'w', color: '#EE5253', words: [
    { word: 'Watermelon', zh: '西瓜', emoji: '🍉', animation: 'grow' },
    { word: 'Whale', zh: '鲸鱼', emoji: '🐋', animation: 'drive' },
    { word: 'Window', zh: '窗户', emoji: '🪟', animation: 'twinkle' },
  ]},
  { letter: 'X', lower: 'x', color: '#10AC84', words: [
    { word: 'X-ray', zh: 'X光', emoji: '🩻', animation: 'glow' },
    { word: 'Xylophone', zh: '木琴', emoji: '🎵', animation: 'glow' },
    { word: 'Fox', zh: '狐狸', emoji: '🦊', animation: 'walk' },
  ]},
  { letter: 'Y', lower: 'y', color: '#FFC048', words: [
    { word: 'Yellow', zh: '黄色', emoji: '🟡', animation: 'twinkle' },
    { word: 'Yo-yo', zh: '悠悠球', emoji: '🪀', animation: 'bounce' },
    { word: 'Yak', zh: '牦牛', emoji: '🐃', animation: 'walk' },
  ]},
  { letter: 'Z', lower: 'z', color: '#574B90', words: [
    { word: 'Zebra', zh: '斑马', emoji: '🦓', animation: 'walk' },
    { word: 'Zoo', zh: '动物园', emoji: '🐼', animation: 'walk' },
    { word: 'Zipper', zh: '拉链', emoji: '⚡', animation: 'glow' },
  ]},
]
