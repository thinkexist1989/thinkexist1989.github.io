# Yang Luo's Personal Website

> A professional personal portfolio website showcasing robotics research, projects, and academic publications.

## 📋 仓库简介

这是 Yang Luo 的个人学术网站，主要展示其在机器人研究领域的工作成果。网站呈现了个人背景、研究方向、项目经历、学术发表以及联系方式。

## 👤 个人信息

- **姓名**: Yang Luo 罗阳
- **职位**: 沈阳自动化研究所 (中科院) 机器人研究员
- **教育**: 哈尔滨工业大学 机器人学与系统国家重点实验室 (2019 博士)
- **邮箱**: luoyang@sia.cn
- **GitHub**: [@thinkexist1989](https://github.com/thinkexist1989)

## 🤖 研究方向

- 机器人系统集成 (Robot System Integration)
- 机器人运动控制 (Robot Motion Control)
- 轨迹规划 (Trajectory Planning)
- 人机交互 (Human-Robot Interaction)
- 灵巧操纵 (Dexterous Manipulation)

## 🎯 项目展示

网站中展示的项目包括：

- **bone_cut** - 骨骼切割机器人系统
- **cobot** - 协作机器人项目
- **dextwin** - 灵巧操纵相关研究
- **indoor_robot** - 室内移动机器人
- **kungshu** - 功夫机器人项目
- **msmrs** - 多臂系统研究
- **open_source** - 开源项目贡献
- **rocos** - 机器人控制系统
- **sea** - 串联弹性驱动器
- **servo_driver** - 伺服驱动器
- **sri_ft_sdk** - 力/扭矩传感器SDK
- **unmanned_lab_robot** - 无人实验室机器人
- **uwv** - 水下航行器

## 🛠 技术栈

### 当前首页
- **HTML / CSS / JavaScript** — 连续滚动布局，原生锚点和折叠内容，无构建步骤。
- **Anime.js 4.5.0** — 本地依赖，入场、滚动显现和按钮反馈，支持减少动态效果。
- **Isotope / jQuery** — 项目分类和排列；动画库不可用时仍可浏览和筛选。
- **IBM Plex Sans** — 本地字体，中文使用系统字体回退。
- **Bootstrap** — 首页基础样式；项目详情页复用统一设计系统，仅历史 `projects/resume.html` 使用 legacy 资源。

设计依据：[网站设计方案](docs/website-design-plan.md)、[DESIGN.md](DESIGN.md)。
第二阶段进度与截图：[审阅说明](docs/phase-two-review.md)。

首页新增 ROCOS 架构探索和成果搜索、年份/类型筛选；八篇论文附已核实 DOI 与 BibTeX。成果数据维护在 `assets/data/publications.json`，修改后运行 `python3 scripts/render-publications.py`，并提交更新后的 `index.html`。核实依据与待确认项见[来源记录](docs/publication-sources.md)。

### 分析和追踪
- **Google Analytics** - 网站统计分析
- **Google Tag Manager** - 标签管理系统

## 📁 项目结构

```
thinkexist1989.github.io/
├── index.html                    # 主页
├── README.md                     # 本文件
├── CNAME                         # GitHub Pages 自定义域名
├── .github/
│   └── copilot-instructions.md   # Copilot 使用说明
├── assets/
│   ├── css/
│   │   ├── style.css             # 新首页样式
│   │   ├── projects.css          # 统一项目详情页样式
│   │   └── legacy.css            # 历史 resume 页面样式
│   ├── js/
│   │   ├── main.js               # 首页导航、筛选及地图
│   │   ├── motion.js             # Anime.js 渐进增强
│   │   ├── research.js           # 架构探索、论文检索和引用
│   │   ├── projects.js           # 详情页媒体
│   │   └── legacy.js             # 历史 resume 页面交互
│   ├── fonts/                    # 本地字体及许可证
│   ├── media/                    # 压缩预览素材及来源
│   ├── img/                      # 图片资源
│   │   ├── background/           # 背景图片
│   │   ├── certification/        # 证书
│   │   ├── collaborators/        # 合作者头像
│   │   ├── education/            # 教育相关图片
│   │   ├── project/              # 项目图片
│   │   └── profile.png           # 个人照片
│   └── vendor/                   # 第三方库
│       ├── animejs/              # Anime.js 及许可证
│       ├── bootstrap/            # Bootstrap 框架
│       ├── jquery/               # jQuery 库
│       ├── owl.carousel/         # 轮播库
│       ├── isotope-layout/       # 网格布局
│       ├── typed.js/             # 打字效果
│       ├── venobox/              # 灯箱库
│       ├── waypoints/            # 滚动触发
│       ├── boxicons/             # Boxicons 图标
│       ├── remixicon/            # Remixicon 图标
│       └── icofont/              # Icofont 图标
└── projects/                     # 项目详情页
    ├── resume.html               # 简历页面
    ├── bone_cut/
    ├── cobot/
    ├── dextwin/
    ├── indoor_robot/
    ├── kungshu/
    ├── msmrs/
    ├── open_source/
    ├── rocos/
    ├── sea/
    ├── servo_driver/
    ├── sri_ft_sdk/
    ├── unmanned_lab_robot/
    └── uwv/
```

## 🚀 运行方式

### 方式一：本地预览（推荐用于开发）

#### 前置要求
- 任何现代浏览器（Chrome, Firefox, Safari, Edge）
- 本地 HTTP 服务器（推荐使用 Python 或 Node.js）

#### 使用 Python 运行
```bash
# Python 3.x
python3 -m http.server 8000 --bind 127.0.0.1
```

#### 使用 Node.js 运行
```bash
# 使用 http-server（全局安装）
npm install -g http-server
http-server

# 或使用 live-server
npm install -g live-server
live-server
```

#### 访问网站
打开浏览器，访问：
```
http://localhost:8000
```

### 方式二：直接打开
将 `index.html` 文件直接用浏览器打开（可能某些功能受限制）

### 方式三：GitHub Pages
网站已部署在 GitHub Pages，直接访问：
```
https://thinkexist1989.github.io
```

## 📝 修改和维护

### 更新个人信息
编辑 `index.html` 中的以下部分：
- 个人介绍文本
- 联系方式
- 社交链接

### 添加新项目
1. 在 `projects/` 目录中创建新文件夹和 `index.html`
2. 在项目目录添加 `intro.jpg` 或 `intro.png`，将资源放在详情页旁
3. 更新主页面中的项目列表

### 修改样式
共享变量和首页编辑 `assets/css/style.css`；项目详情页布局编辑 `assets/css/projects.css`。

### 修改脚本
首页导航编辑 `assets/js/main.js`，研究交互编辑 `assets/js/research.js`，动画编辑 `assets/js/motion.js`；详情页媒体交互位于 `assets/js/projects.js`。

## 📄 许可证

本项目基于开源模板 [Personal - BootstrapMade](https://bootstrapmade.com/personal-free-resume-bootstrap-template/) 进行修改和扩展。

## 🙏 致谢

感谢 [Raja Prerak](https://rajaprerak.github.io/) 提供的灵感和参考。

---

**最后更新**: 2026年10月
**维护者**: Yang Luo (@thinkexist1989)

