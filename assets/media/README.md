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
