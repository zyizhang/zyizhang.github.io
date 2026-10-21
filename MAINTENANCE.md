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
- `content/publications.json`：论文列表，`type` 可为 `journal`、`preprint` 或 `talk`；支持 `summary`、`image`、`image_source`、`code`、`project`、`pdf` 和 `model`。
- `content/news.json`：News，按日期倒序显示；`date` 使用 YYYY 或 YYYY-MM，月份未确认时只填年份。News 区固定最大高度，可滚动查看。
- `content/awards.json`：奖项，按年份倒序显示；同一奖项多年获得时，每年填写一条。奖项区可滚动查看。
- `content/source-images/`：论文配图原件，目前保留你提供的 `GPSS.png`。
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

配图以 WebP 格式保存在 `assets/publications/`，保留原图纵横比；每张配图提供来源链接。JG 和 JGR 当前使用公开预印本的 Figure 1，可能与最终版本不同。GPS Solutions 的原始配图在 `content/source-images/GPSS.png`，网页使用它的 WebP 版本。不要直接修改 `index.html` 中 NEWS、PUBLICATIONS 和 AWARDS 标记之间的自动生成内容。

## 发布

正式网址：https://zyizhang.github.io/ 。发布分支为 `master`，推送后由 GitHub Pages 自动构建。更新后提交并推送至该分支，在仓库 Actions 中查看 `pages build and deployment` 是否成功；构建完成后刷新正式网址检查结果。

## 搜索收录

主页标题、描述、canonical 地址及 ProfilePage / Person 结构化数据已配置；`sitemap.xml` 只列出当前主要主页，`robots.txt` 声明其位置。不要把旧模板文章或其他域名放回站点地图。

Google Search Console 使用「网址前缀」添加 `https://zyizhang.github.io/`，通过首页 HTML 标签或根目录验证文件验证归属，再提交 `sitemap.xml`，对主页执行网址检查并请求编入索引。验证标签/文件需长期保留。验证信息必须由你自己的 Google 账号生成，不要使用他人的验证代码。

当前 Google 验证文件为根目录下的 `google1ce0c4b82039fdff.html`，内容从你提供的文件原样复制。请保持文件名、内容及公开访问地址不变，不要删除，也不要将它移入 Jekyll 排除目录。

首页 `<head>` 中同时保留了你提供的 `google-site-verification` 元标签，也可用于 HTML 标签验证。之后修改首页时请保留此标签。

在 Google Scholar、ORCID、ETH 个人页、GitHub、LinkedIn 等资料中添加正式网址，可帮助访问者和搜索引擎发现主页。可以关注 `Zhenyi Zhang GNSS`、`Zhenyi Zhang ETH`、`张镇驿 GNSS` 等查询，但收录时间和排名由搜索引擎决定，不能保证即时或固定排名。

## 归档与兼容入口

`legacy/` 集中保存旧版 Jekyll / Bootstrap 模板、示例文章、教程截图、旧照片、旧公开 CV 和原中文版网站，仍由 Git 保存，但不发布到网站。新主页不依赖此目录。

旧版 `/about/`、`/contact/`、`/chinese/`、`/chinese/about/`、`/chinese/contact/` 和 `/notes/` 保留跳转；`/cv/` 和 `/chinese/cv/` 跳转至当前无教学版 PDF。其他已停用的模板页面由新的 404 页面引导返回主页。

`othermaterials/` 用来保留个人原始 CV、填写记录和工作材料，整个目录不加入 Git，也不发布。此前自动生成的临时缓存和 `.tools/` 仍保留在本地并被忽略。完整教学版 `cv/CV_Zhenyi.pdf`、备用照片和旧头像衍生文件也仅留本地。Google 根目录验证文件和首页验证标签均保留。

不要将私人资料提交到公开仓库。Jekyll 的 exclude 只阻止网站生成，不会隐藏仓库文件。
