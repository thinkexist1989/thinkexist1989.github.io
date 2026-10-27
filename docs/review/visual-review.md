# 第一阶段视觉复核

按已确认的 DESIGN.md 实现，采用 design-taste-frontend 与 ui-ux-pro-max 的排版、响应式和渐进增强建议。下述评分为主观复核，不能替代用户审阅或可访问性测试。

```text
ROUND 1
Seen in one second: 机器人研究者的姓名、身份和真实机械臂实验。
Idea (one sentence): 从控制软件到物理机器，用已有实验和项目解释研究工作。
Live thing: 可操作的实验视频、项目分类与原生折叠内容。
Layout words by section: hero=文字/实验双栏 / selected=交错图文与深色硬件区 / archive=双列索引 / publications=折叠阅读区 / about=头像与经历 / contact=深色收尾
Scores: design 7.5 · usability 7.0 · creativity 7.0 · content 8.0 → overall 6.0 (cap)
Caps applied: 检查器报告 eyebrow FAIL，按其规则保留 6.0 上限；已核实为合作者姓名误判。
Top three problems (most visible first), each with the screenshot it shows in and the fix:
1. 手机项目区 Compliant 与 servo 粘连；补回被隐藏换行符旁的空格。
2. 手机首屏实验署名和区块说明粘连；为响应式隐藏的换行符保留词间空格。
3. 锚点截图的标题距导航过远；消除 scroll-padding 与 scroll-margin 重复累计。

ROUND 2
Seen in one second: 研究者身份与真实 TALON 实验构成清晰首屏。
Idea (one sentence): 用控制界面、机械设计与驱动硬件展现完整机器人工作链。
Live thing: 桌面实验播放一次，访客可暂停或重播；分类筛选改变项目索引。
Layout words by section: hero=不等宽双栏 / selected=交错实物与界面 / archive=紧凑索引 / publications=白底文献 / about=身份与履历 / contact=深色行动区
Scores: design 7.5 · usability 8.0 · creativity 7.0 · content 8.0 → overall 6.0 (cap)
Caps applied: 检查器仍误报合作者姓名为 eyebrow，形式评分保留 6.0 上限；不能声称自动风格检查全绿。
Top three problems (most visible first), each with the screenshot it shows in and the fix:
1. ROCOS 现有界面截图中的标注较密，手机只能看概貌；第二阶段用架构交互解释，原图继续作为实际成果证据。
2. 手机论文与项目完整列表较长；当前用原生折叠收纳成果类型，第二阶段再增加检索能力。
3. 原项目详情页风格与新首页不同；第一阶段隔离样式并验证链接，第二阶段统一详情版式。
```

最终首屏与长图链接见 [审阅说明](../phase-one-review.md)。本轮已修正可见的文字粘连和锚点间距；剩余三项属于已计划的第二阶段工作。
