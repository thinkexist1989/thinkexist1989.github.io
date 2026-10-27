# Homepage preview media

These files derive from existing repository media. Original files and project credits remain in place.

The homepage now references `projects/servo_driver/drivers.png` and `assets/img/profile.png` directly on white surfaces. The earlier `servo-drivers.webp` and `yang-luo.webp` previews lost their alpha channels and are no longer used; preserve transparency in any future replacement.

| Preview | Source |
| --- | --- |
| `talon-preview.mp4`, `talon-poster.webp` | `projects/cobot/complicant.mp4`, seconds 2–10; experiment credited to Jincheng Sun & Yang Luo |
| `talon-design.webp` | `projects/cobot/talon1.png` |
| `rocos-interface.webp` | `projects/rocos/rocos-viz.png` |
| `servo-drivers.webp` | `projects/servo_driver/drivers.png` |
| `yang-luo.webp` | `assets/img/profile.png` |

Video: silent H.264, 960 × 540, 8 seconds, CRF 27, faststart, about 0.99 MB. Poster uses the frame at source second 2. WebP previews preserve source aspect ratios, with TALON design capped at 1200 px and portrait at 500 px. Do not present the compressed preview as a new experiment or performance claim.

Example video regeneration from repository root:

```bash
ffmpeg -ss 2 -i projects/cobot/complicant.mp4 -t 8 -an \
  -vf scale=960:-2 -c:v libx264 -crf 27 -pix_fmt yuv420p \
  -movflags +faststart assets/media/talon-preview.mp4
```

## 第二阶段（2026-10-28）

- `servo-drivers-alpha.webp`：由 `projects/servo_driver/drivers.png` 无损编码为 WebP。尺寸 983×744，Alpha 通道逐像素一致；白色背景合成结果逐像素一致。首页仍使用白底，原 PNG 保留。
- `../img/favicon-48.png`：由仓库根目录 `favicon.png` 缩至 48×48，用于浏览器图标。原文件保留。
- `details/`：原项目视频的 WebP 首帧封面，以及五个 GIF 的 MP4 播放版本。没有生成或替换实验内容；原始 GIF 保留可访问链接。MP4 默认 `preload="none"`，需要访客主动播放。

| 衍生文件前缀 | 来源 |
| --- | --- |
| `cobot-dual_arm` | `projects/cobot/dual_arm.gif`（MP4 + 封面） |
| `servo_driver-position_control` | `projects/servo_driver/position_control.gif`（MP4 + 封面） |
| `servo_driver-complicant_control` | `projects/servo_driver/complicant_control.gif`（MP4 + 封面） |
| `servo_driver-collision_detection` | `projects/servo_driver/collision_detection.gif`（MP4 + 封面） |
| `sea-ansys` | `projects/sea/ansys.gif`（MP4 + 封面） |
| `cobot-complicant` | `projects/cobot/complicant.mp4`（封面） |
| `indoor_robot-indoor_robot` | `projects/indoor_robot/indoor_robot.mp4`（封面） |
| `msmrs-msmrs_demo`, `msmrs-test1` | `projects/msmrs/` 中同名 MP4（封面） |
| `rocos-ui`, `rocos-7dof`, `rocos-6dof` | `projects/rocos/` 中同名 MP4（封面） |
| `sea-SEA_DEMO_APP` | `projects/sea/SEA_DEMO_APP.mp4`（封面） |
| `uwv-uwv_experiment` | `projects/uwv/uwv_experiment.mp4`（封面） |

转换使用 FFmpeg：GIF 编码 H.264/yuv420p、CRF 25、faststart，无自动循环；双臂实验为 960px 宽、24fps、CRF 27。新增详情媒体约 7.12 MiB，属于按需媒体总量，不计作首屏必需资源。
