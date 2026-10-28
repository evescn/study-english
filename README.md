# ABC 字母乐园（study-english）

面向 2-6 岁儿童的英语字母启蒙学习应用。通过 26 个字母 × 3 个单词（共 78 个单词），配合美式发音与 2D 动画卡片，让小朋友在轻松有趣的互动中认识 A-Z 和常见单词。

## 功能特性

- **五大模块首页**：课时（默认）/ 字母 / 句子 / 视频 / 音频，句子、视频、音频持续建设中
- **课时模块**：Midi1 全学期 5 个单元大纲 + 11 节课堂记录，支持单元目标、作业与单词/字母发音
- **A-Z 顺序解锁学习**：按 A→Z 顺序学习，学完当前字母才能解锁下一个，进度自动保存
- **美式发音**：内置 180+ 段音频（单词、字母名称、字母音素、打卡语音、课堂句子），点击即读；浏览器 TTS 兜底
- **打卡语音 + 胜利音乐**：学完一个字母自动播报「恭喜你字母 A 打卡成功，可前往下一个字母 B」（26 段中文语音），并同步播放欢快的八音盒胜利音乐
- **2D 动画卡片**：每个单词配有迷你动画（掉落、弹跳、行走、飞翔等），字母页带完整动画场景；播放时喇叭旁显示 4 根等化器线条动效
- **全屏庆祝**：学完一个字母的 3 个单词后播放彩带庆祝动画
- **儿童化 UI**：扁平化按钮、圆角中文角标、彩色模块图标、已配置 App 启动图标
- **跨端运行**：一套代码同时支持 Web、微信小程序、Android / iOS App

## 技术栈

- [uni-app](https://uniapp.dcloud.net.cn/)（Vue 3 + Vite）
- 一期 Web（H5），二期微信小程序，三期 App

## 项目规划

| 阶段 | 目标 | 状态 |
| ---- | ---- | ---- |
| 一期 | Web 端（H5） | ✅ 进行中 |
| 二期 | 微信小程序 | ⏳ 未开始 |
| 三期 | App（Android / iOS） | ⏳ 未开始 |

## 快速开始

需要 Node.js 18+。

```bash
npm install        # 安装依赖
npm run dev:h5     # 本地开发，浏览器打开 http://localhost:5173
npm run build:h5   # 打包 Web 端
```

## 目录结构

```
src/
├── pages/index/       # 首页：五大模块 + A-Z 字母卡片（顺序解锁）
├── pages/letter/      # 字母学习页：动画场景 + 3 张单词卡片
├── pages/lesson/      # 课时详情：复习/新词/拼读/句型/作业
├── pages/unit/        # 单元大纲：核心词汇/句型/拼读/绘本
├── components/        # 课时首页、单词发音芯片
├── data/letters.js    # 26 字母 × 3 单词数据
├── data/lessons.js    # Midi1 5 单元 + 11 节课时数据
├── data/phonics.js    # 26 字母音素与 IPA
├── animations/        # 动画与发音模块
├── static/audio/      # 发音音频（单词/字母名称/打卡语音/课堂句子）
├── static/audio/phonics/  # 26 个字母音素音频
└── static/icon/       # App 图标与彩色模块图标
PLAN.md                # 三期规划与进度
docs/word-list.md      # 78 词单词表
```

## 音频授权

字母音素音频 `src/static/audio/phonics/a-z.mp3` 改编自 [XPRIZE GLEXP-Common-Audio](https://github.com/XPRIZE/GLEXP-Common-Audio)（CC BY-SA 3.0），已转换为 MP3、去除静音并统一音量，详见 [`src/static/audio/phonics/ATTRIBUTION.md`](src/static/audio/phonics/ATTRIBUTION.md)。
