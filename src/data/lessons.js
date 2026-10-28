// Midi1 全学期课程数据：5 个单元 + 11 节已上课堂记录
// 单词优先复用 /static/audio 下已有音频；没有音频的词在 H5 由浏览器 TTS 兜底

export const PREP = {
  id: 0,
  key: 'prep',
  title: '入学准备',
  zhTitle: '课堂常规与身体部位启蒙',
  theme: '课堂规则、英文名、身体部位',
  emoji: '🎒',
  color: '#FF9F43',
}

export const UNITS = [
  {
    id: 1,
    key: 'unit1',
    title: 'Where is My Tail?',
    zhTitle: '我的尾巴在哪里？',
    theme: '认识身体部位',
    emoji: '🐒',
    color: '#45AAF2',
    wordGroups: [
      {
        label: '身体部位',
        words: [
          { word: 'eye', zh: '眼睛', emoji: '👁️' },
          { word: 'nose', zh: '鼻子', emoji: '👃' },
          { word: 'mouth', zh: '嘴巴', emoji: '👄' },
          { word: 'ears', zh: '耳朵', emoji: '👂' },
          { word: 'face', zh: '脸', emoji: '😊' },
          { word: 'head', zh: '头', emoji: '🙂' },
          { word: 'body', zh: '身体', emoji: '🧍' },
          { word: 'hands', zh: '手', emoji: '✋' },
          { word: 'feet', zh: '脚', emoji: '🦶' },
          { word: 'tail', zh: '尾巴', emoji: '🐾' },
        ],
      },
    ],
    sentences: [
      { en: 'I have a nose / two eyes.', zh: '我有一个鼻子 / 两只眼睛。' },
      { en: 'I am a girl / boy.', zh: '我是一个女孩 / 男孩。' },
    ],
    dialogue: {
      q: "What's your name?",
      a: 'I am ___.',
      zh: '你叫什么名字？——我是___。',
    },
    phonics: ['Aa', 'Bb', 'Cc'],
    pictureBook: 'Where is My Tail? — 认识人与动物的身体部位',
  },
  {
    id: 2,
    key: 'unit2',
    title: 'My Birthday Party',
    zhTitle: '我的生日派对',
    theme: '生日派对',
    emoji: '🎂',
    color: '#A55EEA',
    wordGroups: [
      {
        label: '派对相关',
        words: [
          { word: 'balloons', zh: '气球', emoji: '🎈' },
          { word: 'presents', zh: '礼物', emoji: '🎁' },
          { word: 'ribbons', zh: '丝带', emoji: '🎀' },
          { word: 'sweets', zh: '糖果', emoji: '🍬' },
          { word: 'ice cream', zh: '冰淇淋', emoji: '🍦' },
          { word: 'jello', zh: '果冻', emoji: '🍮' },
          { word: 'birthday cake', zh: '生日蛋糕', emoji: '🎂' },
          { word: 'sandwiches', zh: '三明治', emoji: '🥪' },
          { word: 'party', zh: '派对', emoji: '🥳' },
        ],
      },
    ],
    sentences: [
      { en: 'There is jello.', zh: '有果冻。' },
      { en: 'There are balloons.', zh: '有许多气球。' },
      { en: 'There is a birthday cake at my party.', zh: '我的派对上有一个生日蛋糕。' },
    ],
    dialogue: {
      q: 'How old are you?',
      a: 'I am ___ years old.',
      zh: '你几岁了？——我___岁。',
    },
    phonics: ['Dd', 'Ee', 'Ff'],
    pictureBook: 'My Birthday Party — 感受生日派对的欢乐氛围',
  },
  {
    id: 3,
    key: 'unit3',
    title: 'I Love My Family',
    zhTitle: '我爱我的家',
    theme: '认识家庭成员，表达喜好活动',
    emoji: '👨‍👩‍👧‍👦',
    color: '#26DE81',
    wordGroups: [
      {
        label: '家庭成员',
        words: [
          { word: 'grandfather', zh: '爷爷 / 外公', emoji: '👴' },
          { word: 'grandmother', zh: '奶奶 / 外婆', emoji: '👵' },
          { word: 'father', zh: '爸爸', emoji: '👨' },
          { word: 'mother', zh: '妈妈', emoji: '👩' },
          { word: 'brother', zh: '兄弟', emoji: '👦' },
          { word: 'sister', zh: '姐妹', emoji: '👧' },
        ],
      },
      {
        label: '喜欢做的事',
        words: [
          { word: 'cook', zh: '做饭', emoji: '🍳' },
          { word: 'read', zh: '阅读', emoji: '📖' },
          { word: 'cycle', zh: '骑车', emoji: '🚴' },
          { word: 'shop', zh: '购物', emoji: '🛍️' },
          { word: 'dance', zh: '跳舞', emoji: '💃' },
          { word: 'play', zh: '玩耍', emoji: '⚽' },
        ],
      },
    ],
    sentences: [
      { en: 'What do you like to do?', zh: '你喜欢做什么？' },
      { en: 'I like to ___ with ___.', zh: '我喜欢和___一起___。' },
    ],
    phonics: ['Gg', 'Hh', 'Ii'],
    pictureBook: 'I Love My Family — 亲情主题，认识家人',
  },
  {
    id: 4,
    key: 'unit4',
    title: 'The New Me',
    zhTitle: '全新的我',
    theme: '衣物词汇，学习穿脱衣物，区分新旧',
    emoji: '👕',
    color: '#FD9644',
    wordGroups: [
      {
        label: '衣物',
        words: [
          { word: 'shirt', zh: '衬衫', emoji: '👕' },
          { word: 'skirt', zh: '裙子', emoji: '👗' },
          { word: 'shorts', zh: '短裤', emoji: '🩳' },
          { word: 'hat', zh: '帽子', emoji: '🎩' },
          { word: 'socks', zh: '袜子', emoji: '🧦' },
          { word: 'shoes', zh: '鞋子', emoji: '👟' },
        ],
      },
      {
        label: '新旧与指示词',
        words: [
          { word: 'new', zh: '新的', emoji: '✨' },
          { word: 'old', zh: '旧的', emoji: '🕰️' },
          { word: 'this', zh: '这个', emoji: '👇' },
          { word: 'that', zh: '那个', emoji: '👉' },
          { word: 'these', zh: '这些', emoji: '👇' },
          { word: 'those', zh: '那些', emoji: '👉' },
        ],
      },
    ],
    sentences: [
      { en: "It's a new shirt.", zh: '这是一件新衬衫。' },
      { en: "It's an old hat.", zh: '这是一顶旧帽子。' },
      { en: 'Put on that new ___.', zh: '穿上那件新的___。' },
      { en: 'Take off this old ___.', zh: '脱下这件旧的___。' },
      { en: 'This is the new me.', zh: '这是全新的我。' },
    ],
    phonics: ['Jj', 'Kk', 'Ll'],
    pictureBook: 'The New Me — 结合生活，养成生活自理习惯',
  },
  {
    id: 5,
    key: 'unit5',
    title: 'Colors Around Us',
    zhTitle: '我们身边的颜色',
    theme: '认识各类颜色，描述物品色彩',
    emoji: '🌈',
    color: '#F368E0',
    wordGroups: [
      {
        label: '颜色',
        words: [
          { word: 'red', zh: '红色', emoji: '🔴' },
          { word: 'blue', zh: '蓝色', emoji: '🔵' },
          { word: 'yellow', zh: '黄色', emoji: '🟡' },
          { word: 'green', zh: '绿色', emoji: '🟢' },
          { word: 'black', zh: '黑色', emoji: '⚫' },
          { word: 'white', zh: '白色', emoji: '⚪' },
          { word: 'orange', zh: '橙色', emoji: '🟠' },
          { word: 'brown', zh: '棕色', emoji: '🟤' },
          { word: 'purple', zh: '紫色', emoji: '🟣' },
          { word: 'pink', zh: '粉色', emoji: '🌸' },
          { word: 'rainbow', zh: '彩虹', emoji: '🌈' },
        ],
      },
      {
        label: '自然事物',
        words: [
          { word: 'sky', zh: '天空', emoji: '☁️' },
          { word: 'leaf', zh: '树叶', emoji: '🍃' },
          { word: 'sun', zh: '太阳', emoji: '☀️' },
          { word: 'ball', zh: '球', emoji: '⚽' },
        ],
      },
    ],
    sentences: [
      { en: 'What color is it? — It is ___.', zh: '它是什么颜色？——它是___。' },
      { en: 'Where is the ___? — Here is the ___.', zh: '___在哪里？——___在这里。' },
    ],
    phonics: ['Mm', 'Nn', 'Oo'],
    pictureBook: 'Colors Around Us — 感知生活里缤纷的色彩',
  },
]

const BODY_EXTRA_WORDS = [
  { word: 'body', zh: '身体', emoji: '🧍' },
  { word: 'face', zh: '脸', emoji: '😊' },
  { word: 'hands', zh: '手', emoji: '✋' },
]

const BODY_WORDS = [
  { word: 'eye', zh: '眼睛', emoji: '👁️' },
  { word: 'nose', zh: '鼻子', emoji: '👃' },
  { word: 'mouth', zh: '嘴巴', emoji: '👄' },
  { word: 'ears', zh: '耳朵', emoji: '👂' },
  { word: 'face', zh: '脸', emoji: '😊' },
  { word: 'head', zh: '头', emoji: '🙂' },
  { word: 'body', zh: '身体', emoji: '🧍' },
  { word: 'hands', zh: '手', emoji: '✋' },
  { word: 'feet', zh: '脚', emoji: '🦶' },
]

const AA_WORDS = [
  { word: 'apple', zh: '苹果', emoji: '🍎' },
  { word: 'ant', zh: '蚂蚁', emoji: '🐜' },
  { word: 'angry', zh: '生气的', emoji: '😠' },
]

const BB_WORDS = [
  { word: 'bee', zh: '蜜蜂', emoji: '🐝' },
  { word: 'banana', zh: '香蕉', emoji: '🍌' },
  { word: 'boy', zh: '男孩', emoji: '👦' },
]

const UNIT1_REVIEW_WORDS = [...BODY_WORDS, ...AA_WORDS, ...BB_WORDS]

const ORAL_SENTENCES = [
  { en: "What's your name?", zh: '你叫什么名字？' },
  { en: "I'm Zero.", zh: '我是 Zero。' },
  { en: 'Are you a boy or a girl?', zh: '你是男生还是女生？' },
  { en: "I'm a boy / girl.", zh: '我是男生 / 女生。' },
]

const BOOK_SENTENCES = [
  { en: 'I have eyes / ears / hands too.', zh: '我也有眼睛 / 耳朵 / 手。' },
  { en: 'I have a mouth / nose too.', zh: '我也有嘴巴 / 鼻子。' },
]

const PARTY_WORDS_1 = [
  { word: 'balloons', zh: '气球', emoji: '🎈' },
  { word: 'party hats', zh: '派对帽', emoji: '🥳' },
  { word: 'ribbons', zh: '丝带', emoji: '🎀' },
]

const DD_WORDS = [
  { word: 'dog', zh: '狗', emoji: '🐶' },
  { word: 'duck', zh: '鸭子', emoji: '🦆' },
  { word: 'desk', zh: '课桌', emoji: '🪑' },
]

const PARTY_WORDS_2 = [
  { word: 'sweets', zh: '糖果', emoji: '🍬' },
  { word: 'sandwiches', zh: '三明治', emoji: '🥪' },
  { word: 'presents', zh: '礼物', emoji: '🎁' },
]

export const LESSONS = [
  {
    id: 1,
    unitId: 0,
    title: '课堂口令与身体部位',
    focus: ['课堂口令与规则', '认识英文名', '身体部位'],
    tags: ['新授'],
    reviewNote: '',
    reviewWords: [],
    newWords: [
      { word: 'eyes', zh: '眼睛', emoji: '👀' },
      { word: 'nose', zh: '鼻子', emoji: '👃' },
      { word: 'ears', zh: '耳朵', emoji: '👂' },
    ],
    phonics: { letters: [], note: '' },
    commands: [
      { en: 'One two three four.', zh: '一二三四。' },
      { en: 'Who can try? Let me try!', zh: '谁想试试？我来试试！' },
      { en: 'Ready? Go!', zh: '准备好了吗？开始！' },
    ],
    sentences: [],
    objectives: [
      '熟悉课堂口令与课堂规则',
      '认识自己的英文名，熟悉老师和同学',
      '认识身体部位 eyes / nose / ears',
    ],
    homework: {
      task: '录制作业视频，私发 Lucy 老师',
      points: 10,
      tips: ['完成作业视频打卡可获得额外 10 积分', '宝贝们记得坚持打卡'],
    },
    note: '课堂视频会私发给大家',
  },
  {
    id: 2,
    unitId: 0,
    title: '身体部位与自我介绍',
    focus: ['身体部位', '自我介绍'],
    tags: ['复习', '新授'],
    reviewNote: '',
    reviewWords: [
      { word: 'ears', zh: '耳朵', emoji: '👂' },
      { word: 'eyes', zh: '眼睛', emoji: '👀' },
      { word: 'nose', zh: '鼻子', emoji: '👃' },
    ],
    newWords: [
      { word: 'head', zh: '头', emoji: '🙂' },
      { word: 'mouth', zh: '嘴巴', emoji: '👄' },
    ],
    phonics: { letters: [], note: '' },
    commands: [],
    sentences: [
      { en: "What's your name?", zh: '你叫什么名字？' },
      { en: "I'm Zero.", zh: '我是 Zero。' },
    ],
    objectives: [
      '复习 ears / eyes / nose',
      '新学 head / mouth',
      "掌握 What's your name? 的回答",
    ],
    homework: {
      task: '录制小视频：练习身体部位单词，演示问答句型',
      points: 10,
      tips: ["练习 What's your name? — I'm…", '多听多读，多多练习口语'],
    },
    note: '课堂视频会私发给大家',
  },
  {
    id: 3,
    unitId: 0,
    title: '身体部位与性别问答',
    focus: ['身体部位', '两个口语问答'],
    tags: ['复习', '新授'],
    reviewNote: '',
    reviewWords: [
      { word: 'ears', zh: '耳朵', emoji: '👂' },
      { word: 'eyes', zh: '眼睛', emoji: '👀' },
      { word: 'nose', zh: '鼻子', emoji: '👃' },
      { word: 'head', zh: '头', emoji: '🙂' },
      { word: 'mouth', zh: '嘴巴', emoji: '👄' },
    ],
    newWords: [{ word: 'feet', zh: '脚', emoji: '🦶' }],
    phonics: { letters: [], note: '' },
    commands: [],
    sentences: [
      { en: "What's your name?", zh: '你叫什么名字？' },
      { en: "I'm Zero.", zh: '我是 Zero。' },
      { en: 'Are you a boy or a girl?', zh: '你是男生还是女生？' },
      { en: "I'm a boy / girl.", zh: '我是男生 / 女生。' },
    ],
    objectives: [
      '复习 ears / eyes / nose / head / mouth',
      '新学 feet',
      '掌握 What\'s your name? 与 Are you a boy or a girl? 两组问答',
    ],
    homework: {
      task: '录制小视频：练习身体部位单词，演示两个口语问答句型',
      points: 10,
      tips: ['多听多读，多多练习口语', '培养语感'],
    },
    note: '课堂视频会私发给大家',
  },
  {
    id: 4,
    unitId: 1,
    title: '字母 Aa 拼读',
    focus: ['Unit 1 主题单词', '字母 Aa', '代表单词'],
    tags: ['新授'],
    reviewNote: 'Unit 1 主题单词',
    reviewWords: [],
    newWords: AA_WORDS,
    phonics: { letters: ['Aa'], note: 'big A, small a · A A A a a a' },
    commands: [],
    sentences: [],
    objectives: [
      '能够认读单词并理解意思',
      '掌握字母 Aa，区分大小写',
      '掌握字母发音以及代表单词',
    ],
    homework: {
      task: '复习并录制视频',
      points: 10,
      tips: ['做作业之前先看老师视频', '完成练习可获得 10 积分'],
    },
    note: '',
  },
  {
    id: 5,
    unitId: 1,
    title: '身体部位扩展',
    focus: ['Unit 1 主题单词', '身体部位', 'face / feet 辨析'],
    tags: ['复习', '新授'],
    reviewNote: 'Unit 1 主题单词 + 课时 4：字母 Aa 与代表单词',
    reviewWords: AA_WORDS,
    reviewPhonics: ['Aa'],
    newWords: BODY_EXTRA_WORDS,
    phonics: { letters: [], note: '' },
    commands: [],
    sentences: [],
    objectives: [
      '认读 body / face / hands 并理解意思',
      '注意区分 face 和 feet 两个单词',
    ],
    homework: {
      task: '复习并录制视频',
      points: 10,
      tips: ['做作业之前先看老师视频', '完成练习可获得 10 积分'],
    },
    note: '',
  },
  {
    id: 6,
    unitId: 1,
    title: '字母 Bb 拼读',
    focus: ['身体部位复习', '字母 Bb', '代表单词'],
    tags: ['复习', '新授'],
    reviewNote: '身体部位主题词汇（body / face / hands）+ 课时 5：字母 Aa',
    reviewWords: BODY_EXTRA_WORDS,
    reviewPhonics: ['Aa'],
    newWords: BB_WORDS,
    phonics: { letters: ['Bb'], note: 'big B, small b · B B B b b b' },
    commands: [],
    sentences: [],
    objectives: [
      '掌握字母 Bb，区分大小写',
      '掌握字母发音以及代表单词',
    ],
    homework: {
      task: '复习并录制作业视频',
      points: 10,
      tips: ['做作业之前先看老师视频'],
    },
    note: '',
  },
  {
    id: 7,
    unitId: 1,
    title: '绘本句子 I have...',
    focus: ['绘本句子', '指读习惯', 'Aa / Bb / Cc 复习'],
    tags: ['复习', '新授'],
    reviewNote: '身体部位 + 字母 Aa / Bb / Cc + 口语句子',
    reviewWords: UNIT1_REVIEW_WORDS,
    reviewPhonics: ['Aa', 'Bb', 'Cc'],
    reviewPhonicsNote: 'Cc 合并复习',
    reviewSentences: ORAL_SENTENCES,
    newWords: [],
    phonics: { letters: [], note: '' },
    commands: [],
    sentences: BOOK_SENTENCES,
    objectives: [
      '能完整输出绘本句子',
      '手随口动，读到哪里指到哪里，培养指读习惯',
    ],
    homework: {
      task: '复习并录制视频，练习指读',
      points: 10,
      tips: ['手随口动，读到哪里指到哪里', '从小培养指读习惯', '做作业之前先看老师视频'],
    },
    note: '课堂视频会私信分享给大家',
  },
  {
    id: 8,
    unitId: 1,
    title: 'Unit 1 单元测评',
    focus: ['Unit 1 全面复习', '单元小测评'],
    tags: ['复习', '测评'],
    reviewNote: 'Unit 1 全部：单词 / 字母 / 口语句子 / 绘本',
    reviewWords: UNIT1_REVIEW_WORDS,
    reviewPhonics: ['Aa', 'Bb', 'Cc'],
    reviewPhonicsNote: 'Cc 合并复习',
    reviewSentences: [...ORAL_SENTENCES, ...BOOK_SENTENCES],
    newWords: [],
    phonics: { letters: [], note: '' },
    commands: [],
    sentences: [],
    objectives: ['复习 Unit 1 全部内容', '完成 Unit 1 单元小测评'],
    homework: {
      task: '录制复习视频，复习字母 Aa / Bb / Cc',
      points: 10,
      tips: ['认真完成练习'],
    },
    note: '测评视频将逐一私发给家长',
  },
  {
    id: 9,
    unitId: 2,
    title: '生日派对主题词',
    focus: ['Unit 2 主题单词', '派对物品'],
    tags: ['新授'],
    reviewNote: '',
    reviewWords: [],
    newWords: PARTY_WORDS_1,
    phonics: { letters: [], note: '' },
    commands: [],
    sentences: [],
    objectives: ['掌握 Unit 2 主题单词'],
    homework: {
      task: '复习并录制视频',
      points: 10,
      tips: ['做作业之前先看老师视频', '完成练习可获得 10 积分'],
    },
    note: '',
  },
  {
    id: 10,
    unitId: 2,
    title: '字母 Dd 拼读',
    focus: ['字母 Dd', '代表单词'],
    tags: ['新授'],
    reviewNote: 'Unit 2 主题单词（课时 9）',
    reviewWords: PARTY_WORDS_1,
    newWords: DD_WORDS,
    phonics: { letters: ['Dd'], note: 'big D, small d · D D D d d d' },
    commands: [],
    sentences: [],
    objectives: [
      '掌握字母 Dd，区分大小写',
      '掌握字母发音以及代表单词',
    ],
    homework: {
      task: '复习并录制作业视频',
      points: 10,
      tips: ['做作业之前先看老师视频', '完成练习可获得 10 积分'],
    },
    note: '',
  },
  {
    id: 11,
    unitId: 2,
    title: '生日派对主题词 2',
    focus: ['Unit 2 主题单词', '食物与礼物'],
    tags: ['新授'],
    reviewNote: 'Unit 2 主题单词 + 课时 10：字母 Dd 与代表单词',
    reviewWords: DD_WORDS,
    reviewPhonics: ['Dd'],
    newWords: PARTY_WORDS_2,
    phonics: { letters: [], note: '' },
    commands: [],
    sentences: [],
    objectives: ['掌握 Unit 2 主题单词'],
    homework: {
      task: '复习并录制视频',
      points: 10,
      tips: ['做作业之前先看老师视频', '完成练习可获得 10 积分'],
    },
    note: '',
  },
]

export function getUnit(id) {
  return UNITS.find((u) => u.id === Number(id)) || null
}

export function getLesson(id) {
  return LESSONS.find((l) => l.id === Number(id)) || null
}

export function lessonsOfUnit(unitId) {
  return LESSONS.filter((l) => l.unitId === Number(unitId))
}

export function unitStatus(unit) {
  return lessonsOfUnit(unit.id).length > 0 ? 'ongoing' : 'upcoming'
}
