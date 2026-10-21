# 个人网站维护

此仓库为 `zyizhang/zyizhang.github.io`。第一版是无前端依赖的静态页面，可通过 GitHub Pages 的 Jekyll 流程发布。

## 本地查看

直接用浏览器打开 `index.html`，或在项目文件夹的终端运行：

```powershell
python -m http.server 8000 --bind 127.0.0.1
```

访问 http://127.0.0.1:8000 ，按 Ctrl+C 停止服务。

## 更新位置

- `index.html`：简介、研究方向、Academic Service、奖项和联系信息。Education、Teaching 和学生指导已从主页移除。
- `assets/academic.css`：页面样式及手机布局。
- `img/snowboarding.jpg`：当前头像原图。照片显示裁切由 CSS 中的 `.portrait` 控制，目前保留人物、头盔和右侧雪山，原图不变。
- `assets/academic.js`：论文分页，每页 4 项。无 JavaScript 时自动显示完整列表。
- `othermaterials/publications.json`：论文列表，`type` 可为 `journal`、`preprint` 或 `talk`；支持 `summary`、`image`、`image_source`、`code`、`project`、`pdf` 和 `model`。
- `othermaterials/news.json`：News，按文件顺序显示；`date` 使用 YYYY 或 YYYY-MM，月份未确认时只填年份。News 区固定最大高度，可滚动查看。
- `othermaterials/awards.json`：奖项，按年份倒序显示；同一奖项多年获得时，每年填写一条。奖项区可滚动查看。
- `assets/icons/`：个人链接的小图标及来源、许可说明；无需外部图标服务。
- `cv/CV_Zhenyi_withoutteaching.pdf`：主页 CV 下载链接使用的文件。
- `othermaterials/本轮更新与待确认.md`：本轮已完成项目、资料来源和剩余待补充项。
- `othermaterials/网站资料待补充.md`：用中文填写补充资料，之后可交给助手更新。
- `othermaterials/cvlatex.txt`：原始 CV，修改该文件不会自动同步网站。

更新论文、News 或奖项数据后，在项目根目录运行：

```powershell
python scripts/update_publications.py
```

生成结果写入 `index.html`。访客无需 Python；JavaScript 仅用于分页。论文按年份及已知日期倒序排列，期刊引用年份优先于 online-first 年份；同年没有精确日期的条目放在该年末尾。通讯作者通过 `corresponding_indices` 的作者序号（从 0 开始）标记，以免两位同名缩写作者产生歧义。

论文的 `visible` 默认为 `true`，设为 `false` 后保留数据但不显示。目前 PhyVapor-ESFM 暂时隐藏，因此网页显示 8 项成果，分为 2 页，每页 4 项。News 和奖项均由脚本按时间倒序生成，同月条目保持数据文件中的原始顺序。

配图以 WebP 格式保存在 `assets/publications/`，保留原图纵横比；每张配图提供来源链接。JG 和 JGR 当前使用公开预印本的 Figure 1，可能与最终版本不同。GPS Solutions 使用你提供的 `GPSS.png` 转换成轻量 WebP。不要直接修改 `index.html` 中 NEWS、PUBLICATIONS 和 AWARDS 标记之间的自动生成内容。

## 发布

本轮只准备本地版本。审核后，可提交并推送至 GitHub Pages 使用的分支。GitHub 仓库 Settings → Pages 中应确认发布分支及根目录；推送后在 Actions 中查看构建是否成功。

旧版 `/cv/` 和 `/chinese/cv/` 已改为跳转至指定的无教学版 PDF，移除旧网页中的 GPA、Education 和 Teaching 信息。完整教学版 `cv/CV_Zhenyi.pdf` 仅留本地，已从 Git 提交和 Jekyll 构建中排除。其余旧页面保留，新主页使用页内导航。旧模板的统计脚本不在新主页加载。

不要将私人资料提交到公开仓库。Jekyll 的 exclude 只阻止网站生成，不会隐藏仓库文件。
