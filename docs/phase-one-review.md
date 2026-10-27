# 第一阶段审阅说明

日期：2026-10-27。状态：本地审阅版，尚未发布。

实施前已创建提交 `b23cede`（`Add website design plan and guidelines`），保存设计方案、设计规范、贡献指南及 README 文件名调整。本阶段实现留在工作区，便于审阅和调整。

## 预览与截图

在仓库根目录执行：

```bash
python3 -m http.server 8000 --bind 127.0.0.1
```

打开 <http://localhost:8000>。当前会话已启动预览服务。截图用于检查静态排版；动画、视频和筛选请在页面中体验。

| 设备 | 首屏 | 完整页面 |
| --- | --- | --- |
| 桌面 1440px | [桌面首屏](review/phase-one-desktop.jpg) | [桌面长图](review/phase-one-desktop-full.jpg) |
| 平板 768px | [平板首屏](review/phase-one-tablet.jpg) | [平板长图](review/phase-one-tablet-full.jpg) |
| 手机 390px | [手机首屏](review/phase-one-mobile.jpg) | [手机长图](review/phase-one-mobile-full.jpg) |

## 2026-10-28 审阅调整

驱动器介绍区与个人照片改为白色背景，恢复引用带透明通道的原始 PNG，消除预览转换产生的黑底及明显白边。驱动器文字使用深色正文和蓝色链接。

最新局部截图：[桌面驱动器](review/white-background-servo-1440.jpg)、[桌面个人照片](review/white-background-portrait-1440.jpg)、[手机驱动器](review/white-background-servo-390.jpg)、[手机个人照片](review/white-background-portrait-390.jpg)。上方全页截图保留为首轮审阅记录。

## 已实现

- 连续滚动首页，以冷白、石墨黑和工程蓝建立阅读与交互层级；本地 IBM Plex Sans 字体，中文采用系统字体回退。
- 首屏展示真实 TALON 柔顺控制实验；8 秒静音视频约 0.99 MB，注明实验合作人员。桌面允许时播放一次；手机、减少动态效果或节省流量模式默认显示海报，保留原生播放控件。
- 精选 ROCOS、TALON、柔顺伺服驱动器，使用仓库已有界面、设计图和实物图；保留全部 12 个项目入口、17 条论文/专利等成果、6 条经历/教育记录及 10 位合作者。
- 本地 Anime.js 4.5.0 实现入场、滚动显现、筛选反馈和按钮按压反馈；尊重减少动态效果设置，动画失败不隐藏正文。
- 原生锚点、浏览历史、手机菜单、可键盘操作的项目筛选与折叠内容；地图仅在展开时加载，失败仍保留地址与外部地图链接。
- 原有详情页使用独立 `legacy.css` / `legacy.js`；修复其 jQuery、favicon 相对路径及 Robot Experimenter 的图片扩展名。

## 验证记录

环境：Linux、本地 Python HTTP 服务、无头 Chrome，通过 DevTools Protocol 检查。以下不等同于真实手机或跨浏览器认证。

| 项目 | 结果 |
| --- | --- |
| 320 / 390 / 768 / 991 / 992 / 1024 / 1440px | 无横向溢出；复核桌面、平板、手机截图 |
| 项目筛选及快速切换 | All 12、System 7、Control 5、HMI 3；隐藏条目退出键盘焦点 |
| 键盘与导航 | 手机菜单 Escape 关闭并归还焦点；锚点直达、前进后退正常；修正重复滚动偏移 |
| 动画降级 | 初始减少动态效果及运行中切换正常；屏蔽 Anime.js 后仍能筛选和阅读 |
| 静态降级 | 禁用 JavaScript 后全部项目及导航仍可用；屏蔽 Isotope 后原生筛选正常 |
| 媒体 | 播放、手动暂停、滚出后暂停状态保持及视频加载失败提示正常；展开合作者后全部图片成功加载 |
| 地图 | 首次加载不请求 Leaflet；展开后初始化成功；屏蔽 CDN 时显示可用的替代入口 |
| 原有页面 | 检查 13 个项目详情页及简历，无 JavaScript 运行异常或本地 HTTP 资源错误 |
| 内容核对 | 12 个项目目标链接一致；17 条成果正文与原文一致，仅去掉展示序号及整理空白；本地 HTML 资源和链接目标存在 |
| 静态检查 | `node --check` 检查 main、motion、legacy；`git diff --check` 通过 |

视觉检查器仍有两项启发式误报：将合作者姓名 “You Wan” 识别为联系区的装饰小标题；忽略姓名下方清晰可见的 “Robotics researcher.” 身份说明。已逐屏人工复核，保留真实姓名与身份层级，不为消除误报删改内容。详见 [视觉复核记录](review/visual-review.md)。

## 审阅重点与后续范围

建议重点审阅首屏实验片段、三个精选项目的顺序与描述、深浅区域比例，以及手机端内容密度。新增预览媒体与依赖约 1.43 MB（文件总量，非首屏传输量）；原媒体未删除，来源见 [素材说明](../assets/media/README.md)。

第一阶段使用静态前端即可完成，无需后端。ROCOS 架构交互、论文搜索与核实原文链接、详情页统一设计留在第二阶段；Actions 数据更新及外部后端部署仍按实际需求启用。尚未进行 Safari/Firefox、真实移动设备、屏幕阅读器及正式性能预算验收，不宣称达到 Lighthouse 或 WCAG 认证分数。
