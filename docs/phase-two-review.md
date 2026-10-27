# 第二阶段审阅说明

日期：2026-10-28。状态：已完成本地实现及本轮验证，尚未发布。基线为 `ad91811`。

## 实现范围

- 首页新增 ROCOS 架构探索：ECM → APP → VIZ，关系依据原 `relationship.png`。按钮提供键盘操作、选择状态与关联说明；无 JavaScript 时保留原图和三个模块完整说明。演示视频独立放在详情页。
- 17 条成果按年份倒序展示，支持标题/作者关键词、年份、类型组合筛选、数量反馈、空结果与重置。8 篇论文附核实 DOI、完整作者 BibTeX 和复制反馈；复制受限时选中文本供手动复制。
- 修正 TCP 论文卷期年份为 2024，以及一条专利申请的原错误类型。8 条专利的原始记录链接尚待核实，未填入猜测链接。详见[来源与校订](publication-sources.md)。
- 统一 13 个 `projects/*/index.html` 的标题、摘要、合作信息、目录、正文、媒体、相关项目与返回入口。保留全部原有正文、代码、媒体源链接和合作署名，修正少量既有拼写与图注。可核实的个人职责仅补充到 ROCOS、TALON、MSMRS 等已有明确署名的材料中。
- 详情页不再加载原有轮播、灯箱、远程字体及重复分析脚本，使用共享样式和轻量媒体脚本。5 个 GIF 改为可暂停的 MP4，保留原动画入口；本地视频有封面且不预下载；Bilibili 仅在主动展开后加载。
- `projects/resume.html` 仍保留历史模板。原有 `open_source` 页只统一版式，未把其中第三方示例添加到首页项目索引。

## 预览与截图

运行 `python3 -m http.server 8000 --bind 127.0.0.1`，打开 <http://localhost:8000>。

| 内容 | 桌面 | 平板 | 手机 |
| --- | --- | --- | --- |
| 首屏 | [1440px](review/phase-two/desktop-fold.jpg) | [768px](review/phase-two/tablet-fold.jpg) | [390px](review/phase-two/mobile-fold.jpg) |
| ROCOS 探索 | [桌面](review/phase-two/desktop-explorer.jpg) | [平板](review/phase-two/tablet-explorer.jpg) | [手机](review/phase-two/mobile-explorer.jpg) |
| 成果检索 | [桌面](review/phase-two/desktop-publications.jpg) | [平板](review/phase-two/tablet-publications.jpg) | [手机](review/phase-two/mobile-publications.jpg) |
| ROCOS 详情 | [桌面](review/phase-two/rocos-desktop.jpg) | — | [手机](review/phase-two/rocos-mobile.jpg) |
| 伺服驱动详情 | [桌面](review/phase-two/servo_driver-desktop.jpg) | — | [手机](review/phase-two/servo_driver-mobile.jpg) |
| 切骨机器人详情 | [桌面](review/phase-two/bone_cut-desktop.jpg) | — | [手机](review/phase-two/bone_cut-mobile.jpg) |
| SDK 详情 | [桌面](review/phase-two/sri_ft_sdk-desktop.jpg) | — | [手机](review/phase-two/sri_ft_sdk-mobile.jpg) |

完整首页分屏：[桌面 1](review/phase-two/desktop-page-01.jpg)、[2](review/phase-two/desktop-page-02.jpg)、[3](review/phase-two/desktop-page-03.jpg)；[平板 1](review/phase-two/tablet-page-01.jpg)、[2](review/phase-two/tablet-page-02.jpg)；[手机 1](review/phase-two/mobile-page-01.jpg)、[2](review/phase-two/mobile-page-02.jpg)。局部交互截图来自功能回归过程，首屏与完整分屏来自最终视觉复核。

## 功能与可访问性检查

环境：Linux / 无头 Chrome 156 / DevTools Protocol / 本地 Python HTTP 服务。完成 107 项主要检查和 15 项补充检查；原始结果见 [主要结果](review/phase-two/results.json)与[补充结果](review/phase-two/extra-results.json)。

| 检查 | 本轮结果 |
| --- | --- |
| 首页响应式 | 320、390、768、991、992、1024、1440px 无页面横向溢出 |
| 13 个详情页 | 320、390、768、1440px 无页面横向溢出；滚动加载图像后无本地资源 HTTP 错误和脚本异常 |
| 架构探索 | 三模块及快速切换正确；Enter 可激活，保留按钮焦点；选中关联连线正确 |
| 成果搜索 | 17 条全部、5 篇期刊、3 篇会议、9 条专利；中英文关键词、年份与类型组合、空结果重置正确 |
| 引用复制 | 成功反馈与拒绝权限回退分支通过；成功分支使用隔离 Clipboard 替身验证，未读取系统剪贴板 |
| 渐进增强 | 禁用 JavaScript 保留全部成果、模块说明及项目正文；屏蔽 Anime.js 后仍能筛选 |
| 减少动态效果 | 初始及运行中偏好切换后内容可见，研究切换不依赖动画；详情媒体默认不自动播放 |
| 媒体 | MP4 实际播放、主动暂停保持、失败提示与源文件入口通过；外部视频展开加载、关闭卸载、无脚本源链接通过 |
| 既有交互 | 项目筛选、手机菜单 Escape 和焦点归还、锚点与历史返回通过 |
| 缩放与阅读 | 200% 等效 CSS 视口（1440→720px）检查通过；未将 CSS `zoom` 冒充浏览器实际缩放认证 |
| 语义与配色 | 表单可见标签、按钮状态、图片说明、iframe 标题；复用已计算对比度的颜色；渲染检查无新增颜色对比度错误 |
| 静态检查 | main / motion / research / projects 的 `node --check`、生成结果一致性、资源路径与锚点、`git diff --check` 通过 |

SDK 的长代码行在局部 `pre` 内横向滚动，不造成页面级溢出。未进行真实手机、Safari/Firefox、屏幕阅读器或完整 WCAG 审计；检查结果不等于合规认证。

## 性能测量

同一 Chrome、无网络限速、禁用缓存、新页面、减少动态效果、首次加载后等待 1 秒；通过 CDP `Network.loadingFinished.encodedDataLength` 累加实际传输量，包含第三方分析请求和浏览器提前加载的邻近图片，不滚动页面。基线首页来自 `ad91811`，其他原始媒体一致。第三方请求及浏览器加载时序会造成波动；以下为最终一组测量，不是生产环境 Lighthouse 分数。

| 视口 | 第一阶段 | 第二阶段 | 首屏 1.5 MiB 目标 |
| --- | ---: | ---: | --- |
| 1440×900 | 2,086,556 B（1.99 MiB） | 1,515,401 B（1.45 MiB） | 本次满足 |
| 390×900 | 1,098,037 B（1.05 MiB） | 1,128,694 B（1.08 MiB） | 本次满足 |

原始数据：[performance.json](review/phase-two/performance.json)。未请求首屏视频；手动播放或桌面自动播放时额外加载约 0.99 MB 原首屏短片。驱动器图片由 624,224 B 的 PNG 改为 383,122 B 无损 WebP，透明通道及白底合成像素一致；浏览器图标改用 48×48 版本。13 个详情页打开时均无 MP4 或 Bilibili 播放器请求。新增详情视频/封面合计约 7.12 MiB，均为按需资源。

## 视觉复核与限制

延续已有冷白、石墨黑、工程蓝及 IBM Plex Sans，不重新抽取设计方向。真实 ROCOS 模块关系成为可选择的架构图，项目实验和论文成为可追溯的证据。全部图像来自仓库原素材，无外部图库或生成图片。

```text
ROUND 2
Seen in one second: 真实机械臂实验和 Yang Luo 的研究身份。
Idea (one sentence): ROCOS 的设备、控制与界面关系成为访客可以逐层探索的结构。
Live thing: 三模块架构选择与组合成果检索。
Layout words by section: hero=split / selected=alternating / archive=index / explorer=diagram+detail / publications=chronological list / about=portrait+history / contact=columns
Scores: design 7.8 · usability 8.2 · creativity 7.4 · content 8.4 → overall 7.9
Caps applied: 无；以上为人工自评，不代表外部设计评分或可访问性认证。
Top three problems (most visible first), each with the screenshot it shows in and the fix:
1. 首轮 mobile-explorer 的隐藏换行合并单词，已补充句间空格；最终 mobile-page-02 可读。
2. 首轮 BibTeX 继承的字体别名触发未加载提示，已明确使用本机等宽字体，保留代码惯例。
3. desktop-page-02/03 的短专利条目右侧留白较多，保持统一书目列对齐与真实题名，未拉长或补造内容。
```

视觉检查器最终仍报告 2 类 FAIL、1 类 WARN：把合作者 “You Wan” 误识别为联系区眉题；把两条较短的专利书目判为偏置版面；未识别姓名下方可见的 “Robotics researcher.”。前后人工复核确认内容、对齐与身份说明正常，保留姓名与真实书目长度；不宣称检查器零告警。首轮源代码风格检查无 FAIL/WARN。

## 维护

新增成果：编辑 `assets/data/publications.json` → 核对来源 → `python3 scripts/render-publications.py` → `python3 scripts/render-publications.py --check`。不需要安装依赖或新增前端构建步骤；浏览器读取预生成 HTML。

项目页复用 `style.css` 与 `projects.css`，使用 `projects.js` 管理媒体。新增原视频或 GIF 时保留原文件，生成封面及必要的 MP4，并在 [素材来源](../assets/media/README.md)记录。后续补充个人贡献或指标须有项目材料依据。

第三阶段的在线 API、联系表单、Actions 自动更新及部署仍未启用。

## 个人照片背景调整（2026-10-28）

按审阅意见将 `.portrait` 背景从白色改为页面底色 `#F5F7FA`，使用原透明 PNG，让照片与简介区域融为一体。桌面和手机验证背景色一致、图片加载正常且无横向溢出。截图：[桌面](review/phase-two/portrait-canvas-desktop.jpg)、[手机](review/phase-two/portrait-canvas-mobile.jpg)。上方早期分屏截图保留为阶段记录。

## Inside ROCOS 浅色调整（2026-10-28）

按审阅意见将架构探索区域改为 `#F5F7FA` 浅色背景，正文恢复深色，选中轮廓与关联连线使用工程蓝，项目入口改为蓝底白字。桌面和手机无横向溢出，ECM / APP / VIZ 切换正常。最新截图：[桌面](review/phase-two/rocos-light-desktop.jpg)、[手机](review/phase-two/rocos-light-mobile.jpg)；此前深色截图保留为历史记录。
