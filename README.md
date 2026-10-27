# ABC 字母乐园（study-english）

面向 2-6 岁儿童的英语字母启蒙学习应用。通过 26 个字母 × 3 个单词（共 78 个单词），配合美式发音与 2D 动画卡片，让小朋友在轻松有趣的互动中认识 A-Z 和常见单词。

## 功能特性

- **A-Z 顺序解锁学习**：按 A→Z 顺序学习，学完当前字母才能解锁下一个，进度自动保存
- **美式发音**：内置 130 段美式女声音频（大写 `Big X` / 小写 `small x` / 78 个单词），点击即读，清晰洪亮
- **2D 动画卡片**：每个单词配有迷你动画（掉落、弹跳、行走、飞翔等），字母页带完整动画场景
- **全屏庆祝**：学完一个字母的 3 个单词后播放彩带庆祝动画，鼓励小朋友
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
├── pages/index/       # 首页：A-Z 字母卡片（顺序解锁）
├── pages/letter/      # 字母学习页：动画场景 + 3 张单词卡片
├── data/letters.js    # 26 字母 × 3 单词数据
├── animations/        # 动画与发音模块
└── static/audio/      # 内置 130 段美式发音音频
PLAN.md                # 三期规划与进度
docs/word-list.md      # 78 词单词表
```
