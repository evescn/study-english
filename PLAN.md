# 儿童英语字母启蒙 2D 动画教学项目计划

## 一、项目目标

为 **2–6 岁儿童** 制作一个 2D 互动教学应用：

- 学习 26 个英文字母（大写 + 小写）
- 每个字母配 **3 个简单、高频、可画成动画的单词**
- 每个单词配 **1 个 2D 动画插画** + 发音
- 按年龄段提供不同的互动玩法（认读 → 配对 → 拼读）

## 二、目标用户与年龄分层

| 年龄段 | 能力目标 | 核心玩法 |
| --- | --- | --- |
| 2–3 岁 | 认识字母形状、听音跟读 | 大字模式：点击字母/单词，看动画、听发音 |
| 4–5 岁 | 大小写对应、字母发音 | 大小写配对、听音找字母 |
| 5–6 岁 | 单词拼读、字母音素 | 看动画选单词、字母排序、简单拼写 |

## 三、内容规划（26 字母 × 3 单词）

> 选词原则：具体名词、视觉化强、易画易动、发音简单。

| 字母 | 单词 1 | 单词 2 | 单词 3 |
| --- | --- | --- | --- |
| A | Apple 苹果 | Ant 蚂蚁 | Airplane 飞机 |
| B | Ball 球 | Banana 香蕉 | Bear 熊 |
| C | Cat 猫 | Car 小汽车 | Cake 蛋糕 |
| D | Dog 狗 | Duck 鸭子 | Doll 娃娃 |
| E | Egg 鸡蛋 | Elephant 大象 | Eye 眼睛 |
| F | Fish 鱼 | Flower 花 | Frog 青蛙 |
| G | Girl 女孩 | Grapes 葡萄 | Guitar 吉他 |
| H | Hat 帽子 | Horse 马 | House 房子 |
| I | Ice Cream 冰淇淋 | Insect 昆虫 | Igloo 冰屋 |
| J | Juice 果汁 | Jellyfish 水母 | Jacket 夹克 |
| K | Kite 风筝 | Kangaroo 袋鼠 | Key 钥匙 |
| L | Lion 狮子 | Lemon 柠檬 | Leaf 树叶 |
| M | Monkey 猴子 | Moon 月亮 | Milk 牛奶 |
| N | Nose 鼻子 | Nest 鸟巢 | Nurse 护士 |
| O | Orange 橙子 | Owl 猫头鹰 | Octopus 章鱼 |
| P | Pig 小猪 | Pizza 披萨 | Plane 飞机 |
| Q | Queen 女王 | Quilt 被子 | Question 问号 |
| R | Rabbit 兔子 | Rainbow 彩虹 | Robot 机器人 |
| S | Sun 太阳 | Star 星星 | Snake 蛇 |
| T | Tiger 老虎 | Tree 树 | Train 火车 |
| U | Umbrella 雨伞 | Uncle 叔叔 | Up 向上 |
| V | Van 货车 | Violin 小提琴 | Volcano 火山 |
| W | Watermelon 西瓜 | Whale 鲸鱼 | Window 窗户 |
| X | X-ray X光 | Xylophone 木琴 | Fox 狐狸（词尾 x） |
| Y | Yellow 黄色 | Yo-yo 悠悠球 | Yak 牦牛 |
| Z | Zebra 斑马 | Zoo 动物园 | Zipper 拉链 |

> 备注：X 开头的词极少，故第三个词用含 x 的常见词 Fox 并向家长说明。

## 四、动画设计方案

### 4.1 动画模板（可复用，控制 78 个动画的成本）

先做一套通用动画模板库，每个单词插画选择 1 个模板 + 参数即可：

| 模板 | 动作 | 适用词例 |
| --- | --- | --- |
| fall 下落 | 物体从上方飘落/掉落 | Apple, Leaf, Egg |
| bounce 弹跳 | 上下弹跳 | Ball, Yo-yo, Kangaroo |
| walk 行走 | 左右走动 + 踏步 | Ant, Cat, Dog, Snake, Zebra |
| fly 飞行 | 沿弧线飞过 | Airplane, Plane, Kite, Bee |
| spin 旋转 | 自身旋转 | Sun, Star, Yo-yo |
| grow 生长 | 从小变大 | Flower, Cake, Tree |
| wiggle 扭动 | 柔软摇摆 | Jellyfish, Octopus, Snake |
| twinkle 闪烁 | 星星闪烁/彩虹渐变 | Star, Rainbow, Moon |
| drive 行驶 | 水平移动 + 车轮转 | Car, Train, Van |
| burst 喷发 | 向上喷发/爆炸 | Volcano, Fireworks |
| glow 发光 | 呼吸式发光 | Question, X-ray, Igloo |

### 4.2 动画实现技术

- 插画用 **SVG**（矢量、可缩放、可动画）
- 动画用 **GSAP**（兼容性好、动画曲线自然）或 **CSS Keyframes**（轻量）
- 每个单词卡片 = SVG 插画 + 动画模板配置 + 点击触发

### 4.3 发音方案

- 初期：**Web Speech API（TTS）** 自动朗读字母与单词，零素材成本
- 后期（可选）：录制真人童声（儿童对真人声音更亲近），替换音频文件

## 五、功能规划

### 主界面
- **字母地图页**：A–Z 26 个大按钮（每个显示大小写字母），点击进入字母详情

### 字母详情页
- 超大字母展示（大写 A + 小写 a，分色区分）
- 3 张单词卡片：点击 → 播放动画 + 读音 + 中文释义
- “再听一遍”按钮、上一个/下一个字母导航

### 互动游戏（按年龄）
1. **大小写配对**：大写拖到对应小写
2. **听音找字母**：播放读音，从多个字母中选
3. **看动画选单词**：播放动画，从 3 个单词中选
4. **字母排序**：把打乱的 A–Z 排回顺序

### 激励系统
- 每学完一个字母奖励一颗星星/贴纸
- 学满 5 / 10 / 26 个字母解锁小庆祝动画

### 家长控制
- 音量、语速、中英文释义开关
- 年龄段模式切换（决定显示哪些游戏）
- 学习进度记录（本地存储）

## 六、技术选型

**选定方案：uni-app（Vue 3 + Vite）——一套代码，三端发行**

| 端 | uni-app 发行方式 | 用途 |
| --- | --- | --- |
| Web（H5） | 直接编译为 H5 | 一期，浏览器即开即用、快速验证 |
| 微信小程序 | 编译为小程序 | 二期，微信内传播、家长转发方便 |
| iOS / Android App | 编译为 App（或 uni-app x 原生渲染） | 三期，儿童专用全屏应用 |

备选方案对比：

| 方案 | H5 | 微信小程序 | App | 说明 |
| --- | --- | --- | --- | --- |
| **uni-app（推荐）** | ✅ | ✅ | ✅ | Vue 语法，中国生态最成熟，社区插件多 |
| Taro | ✅ | ✅ | ✅（RN 内核） | React 语法，由京东开源 |
| Flutter | ✅ | ⚠️ 官方不支持，需实验性桥接 | ✅ | 小程序端是硬伤，不推荐 |
| React Native | ✅ | ❌ | ✅ | 小程序端缺失 |

> 结论：要做"三端一套代码"，**uni-app** 是最稳妥的选择；若团队更熟 React 可选 Taro。

### 动画跨端方案

| 方案 | H5 | 小程序 | App | 成本 | 说明 |
| --- | --- | --- | --- | --- | --- |
| **CSS Keyframes + 分层图片/图形（推荐）** | ✅ | ✅ | ✅ | 低 | 用 CSS transform/opacity 做位移、旋转、缩放、闪烁；插画用 PNG/SVG 转图 + CSS 图形拼合 |
| 精灵图序列帧 | ✅ | ✅ | ✅ | 中 | 每词 6–10 帧位图，制作量大 |
| Lottie（JSON 动画） | ✅ | ✅ | ✅ | 高 | 动画最精美，但 78 个 Lottie 制作成本高，留作二期增强 |

> 说明：小程序不支持内联 SVG，所以插画统一以"CSS 图形拼合 + 位图/精灵图"实现，保证三端一致；Web 端可额外享受 SVG 效果。

## 七、目录结构规划

```
study-english/
├── src/
│   ├── main.js             # 应用入口（uni-app）
│   ├── data/
│   │   └── letters.js      # 26 字母 × 3 单词的数据（含动画配置）
│   ├── components/
│   │   ├── AlphabetGrid.vue # 字母地图页
│   │   ├── LetterPage.vue   # 字母详情页
│   │   ├── WordCard.vue     # 单词卡片（插画 + 动画 + 发音）
│   │   └── Games.vue        # 4 个互动游戏
│   ├── animations/
│   │   ├── templates.js     # 动画模板库（11 个模板，CSS 实现）
│   │   └── audio.js         # 发音模块（三端适配）
│   └── styles/
│       └── main.css
├── assets/
│   ├── images/              # 78 个单词插画（按字母分目录，PNG/精灵图）
│   └── audio/               # 预留真人录音目录
├── pages.json               # uni-app 页面路由配置
├── manifest.json            # 三端应用配置（H5/小程序/App）
└── pages/
    ├── index/               # 字母地图页
    ├── letter/              # 字母详情页
    └── games/               # 互动游戏页
└── docs/
    └── word-list.md        # 单词表 + 家长审阅用
```

## 八、三期路线图（约 8–10 周）

### 一期：Web（H5）——快速验证 MVP

| 步骤 | 内容 | 产出 | 时长 | 状态 |
| --- | --- | --- | --- | --- |
| 0 | 内容定稿：单词表、发音口径（英式/美式） | `docs/word-list.md` | 1–2 天 | ✅ |
| 1 | uni-app 脚手架 + 字母地图页 + 字母详情页 | 可浏览骨架（H5） | 3–4 天 | ✅ |
| 2 | CSS 动画模板库 + 首批 10 个字母的插画动画 | 10 字母完整可用 | 1 周 | ✅（78 词全部配置完成） |
| 3 | 完成全部 26 字母（78 插画 + 动画 + 发音） | 全部字母内容 | 1–2 周 | ✅（emoji 占位插画，发音走 TTS） |
| 4 | 4 个互动游戏 + 奖励系统 + 家长控制 | 完整教学闭环 | 1 周 | ⏳ 下一步 |
| 5 | 儿童可用性测试 + 修改 | 测试报告 + 迭代 | 1 周 | ⏳ |
| 6 | 部署 H5 到公网（可手机/iPad 浏览器打开） | 分享链接 | 1–2 天 | ⏳ |

**一期完成标准**：26 字母全部可点，78 词均有动画 + 发音，游戏可玩，浏览器全屏无横向滚动。

### 二期：微信小程序

| 步骤 | 内容 | 产出 | 时长 |
| --- | --- | --- | --- |
| 1 | uni-app 编译到小程序，修复平台差异（内联 SVG 替换、CSS 兼容、字体） | 小程序可运行 | 1 周 |
| 2 | 小程序适配：音频 API、分包加载 78 张插画、本地缓存 | 加载流畅 | 1 周 |
| 3 | 微信能力：分享到家长群、收藏、使用授权弹窗 | 传播功能 | 3–4 天 |
| 4 | 小程序审核 + 灰度上线 | 线上版本 | 1 周 |

**二期完成标准**：微信搜索/扫码即玩，家长可分享，2–6 岁孩子操作无卡顿。

### 三期：App（iOS / Android）

| 步骤 | 内容 | 产出 | 时长 |
| --- | --- | --- | --- |
| 1 | uni-app 编译 App，处理全屏横竖屏、离线资源打包 | 双端 App 安装包 | 1 周 |
| 2 | 本地存储升级（学习进度云同步可选）、家长锁 | 数据不丢 | 3–4 天 |
| 3 | 真机适配（iPad/安卓平板大屏布局） | 平板体验优化 | 1 周 |
| 4 | 应用商店上架（App Store / 国内安卓商店） | 上架完成 | 1–2 周 |

**三期完成标准**：iOS/安卓均可安装，离线可玩，儿童模式锁定在应用内。

> 插画产能提示：78 张插画是最大工作量。建议一期先做"通用 CSS 模板 + 分层图形插画"，二期再逐张精修，三期加入 Lottie 增强动画。

## 九、里程碑与验收标准

- **MVP 完成**：26 字母全部可点，78 个单词均有动画 + 发音
- **游戏完成**：4 个互动游戏全部可玩，有进度保存
- **可用性达标**：2–6 岁孩子无需家长指导可独立完成"点开字母 → 看动画 → 玩配对"流程
- **发布完成**：手机/iPad 浏览器全屏打开效果良好，无横向滚动

## 十、下一步

1. 确认技术方案（推荐 uni-app，Vue 语法）
2. 确认单词表（可调整 78 个词）
3. 开始一期步骤 1：搭建 uni-app 脚手架 + 字母地图页

## 十一、Midi1 课时模块（家长端课程视图）

> 数据源：`src/data/lessons.js`（以该文件为准）。课时 Tab：`src/components/LessonHome.vue`；课时详情：`src/pages/lesson/lesson.vue`；单元大纲：`src/pages/unit/unit.vue`。

### 5 单元大纲

| 单元 | 主题 | 重点词汇 | 核心句型 / 对话 | 自然拼读 | 绘本 |
| --- | --- | --- | --- | --- | --- |
| U1 Where is My Tail? 我的尾巴在哪里？ | 身体部位 | eye, nose, mouth, ears, face, head, body, hands, feet, tail | I have a nose / two eyes. I am a girl / boy.；What's your name? — I am _. | Aa Bb Cc | Where is My Tail? |
| U2 My Birthday Party 我的生日派对 | 生日派对 | balloons, presents, ribbons, sweets, ice cream, jello, birthday cake, sandwiches, party | There is jello. / There are balloons.；How old are you? — I am _ years old. | Dd Ee Ff | My Birthday Party |
| U3 I Love My Family 我爱我的家 | 家庭成员与活动 | grandfather, grandmother, father, mother, brother, sister；cook, read, cycle, shop, dance, play | What do you like to do? / I like to _ with _. | Gg Hh Ii | I Love My Family |
| U4 The New Me 全新的我 | 衣物、新旧 | shirt, skirt, shorts, hat, socks, shoes；new, old；this, that, these, those | It's a new shirt. / It's an old hat.；Put on that new _. / Take off this old _. | Jj Kk Ll | The New Me |
| U5 Colors Around Us 我们身边的颜色 | 颜色 | red, blue, yellow, green, black, white, orange, brown, purple, pink, rainbow；sky, leaf, sun, ball | What color is it? — It is _.；Where is the _? — Here is the _. | Mm Nn Oo | Colors Around Us |

### 11 节课时索引

| 课 | 单元 | 主题 | 复习 | 新学 | 拼读 | 作业 |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | 预备 | 课堂口令与身体部位 | — | eyes, nose, ears；英文名；课堂规则 | — | 视频私发 Lucy，+10 积分 |
| 2 | 预备 | 身体部位与自我介绍 | ears, eyes, nose | head, mouth | — | 录视频 + 问答 |
| 3 | 预备 | 身体部位与性别问答 | ears, eyes, nose, head, mouth | feet | — | 录视频 + 两组问答 |
| 4 | U1 | 字母 Aa 拼读 | Unit 1 主题词 | apple, ant, angry | Aa | 看老师视频后录视频 |
| 5 | U1 | 身体部位扩展 | Unit 1 主题词 + Aa | body, face, hands | — | 录视频；区分 face / feet |
| 6 | U1 | 字母 Bb 拼读 | 身体部位 + Aa | bee, banana, boy | Bb | 录视频 |
| 7 | U1 | 绘本句子 I have... | 身体部位 + Aa/Bb/Cc | 绘本句 I have eyes/ears/hands too. | Aa/Bb/Cc 复习 | 指读 + 录视频 |
| 8 | U1 | Unit 1 单元测评 | Unit 1 全部 | 单元小测评 | Aa/Bb/Cc 复习 | 录复习视频 |
| 9 | U2 | 生日派对主题词 | — | balloons, party hats, ribbons | — | 录视频，+10 积分 |
| 10 | U2 | 字母 Dd 拼读 | Unit 2 主题词 | dog, duck, desk | Dd | 录视频，+10 积分 |
| 11 | U2 | 生日派对主题词 2 | — | sweets, sandwiches, presents | — | 录视频，+10 积分 |

> 说明：课时 7/8 提到 Cc，但暂无独立 Cc 课时原文，按「Aa/Bb/Cc 合并复习」呈现。Unit 3–5 已展示教学目标，课堂记录待开课后补充。
