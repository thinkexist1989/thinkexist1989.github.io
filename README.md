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

### 前端框架和库
- **Bootstrap** - 响应式布局框架
- **jQuery** - DOM操作和事件处理
- **Owl Carousel** - 轮播图组件
- **Isotope** - 网格布局过滤
- **Typed.js** - 打字机效果
- **Venobox** - 灯箱画廊
- **Waypoints** - 滚动触发动画

### 图标和动画
- **Boxicons** - 现代化图标库
- **Remixicon** - 开源图标库
- **Icofont** - 图标字体
- **AOS (Animate on Scroll)** - 滚动动画库

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
│   │   └── style.css             # 主样式表
│   ├── js/
│   │   └── main.js               # 主脚本文件
│   ├── img/                      # 图片资源
│   │   ├── background/           # 背景图片
│   │   ├── certification/        # 证书
│   │   ├── collaborators/        # 合作者头像
│   │   ├── education/            # 教育相关图片
│   │   ├── project/              # 项目图片
│   │   └── profile.png           # 个人照片
│   └── vendor/                   # 第三方库
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
python -m http.server 8000

# 或 Python 2.x
python -m SimpleHTTPServer 8000
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
2. 在 `assets/img/project/` 中添加项目图片
3. 更新主页面中的项目列表

### 修改样式
编辑 `assets/css/style.css` 文件来自定义网站外观

### 修改脚本
编辑 `assets/js/main.js` 文件来添加新功能或修改交互

## 📄 许可证

本项目基于开源模板 [Personal - BootstrapMade](https://bootstrapmade.com/personal-free-resume-bootstrap-template/) 进行修改和扩展。

## 🙏 致谢

感谢 [Raja Prerak](https://rajaprerak.github.io/) 提供的灵感和参考。

---

**最后更新**: 2026年5月
**维护者**: Yang Luo (@thinkexist1989)

