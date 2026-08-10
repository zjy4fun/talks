// 构建站点：扫描根目录下所有含 slides.md + package.json 的演讲目录，
// 逐个跑 slidev build（带子路径 base），汇总到 site/，并生成首页索引。
import { execFileSync } from 'node:child_process'
import {
  cpSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = dirname(dirname(fileURLToPath(import.meta.url)))
// GitHub Pages 项目站点的子路径，例如 https://<user>.github.io/talks/
const BASE = normalizeBase(process.env.SITE_BASE ?? '/talks/')

const SKIP_DIRS = new Set(['node_modules', 'site', 'scripts', '.git', '.github'])

const talks = []
for (const d of readdirSync(root, { withFileTypes: true })) {
  if (!d.isDirectory() || SKIP_DIRS.has(d.name)) continue
  const hasPkg = existsSync(join(root, d.name, 'package.json'))
  const hasSlides = existsSync(join(root, d.name, 'slides.md'))
  if (hasPkg && hasSlides) {
    talks.push(d.name)
  } else if (hasPkg || hasSlides) {
    console.warn(`警告：${d.name} 缺少 ${hasPkg ? 'slides.md' : 'package.json'}，已跳过`)
  }
}
talks.sort()

if (talks.length === 0) {
  console.error('未找到任何演讲目录（需同时包含 slides.md 和 package.json）')
  process.exit(1)
}

const site = join(root, 'site')
rmSync(site, { recursive: true, force: true })
mkdirSync(site, { recursive: true })

const entries = []
for (const name of talks) {
  const dir = join(root, name)
  console.log(`\n==> 构建 ${name}`)
  execFileSync(
    'pnpm',
    ['exec', 'slidev', 'build', '--base', `${BASE}${name}/`, '--out', 'dist'],
    { cwd: dir, stdio: 'inherit' },
  )
  cpSync(join(dir, 'dist'), join(site, name), { recursive: true })

  // 标题只从 headmatter（文件开头的第一个 frontmatter 块）里取，避免误匹配正文
  const md = readFileSync(join(dir, 'slides.md'), 'utf8')
  const head = md.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? ''
  const raw = head.match(/^title:\s*(.+?)\s*$/m)?.[1]
  const title = raw?.replace(/^(["'])(.*)\1$/, '$2') || name
  entries.push({ name, title })
}

writeFileSync(join(site, '.nojekyll'), '')
writeFileSync(join(site, 'index.html'), renderIndex(entries))
console.log(`\n完成：${entries.length} 个演讲 → site/`)

function normalizeBase(b) {
  if (!b.startsWith('/')) b = '/' + b
  if (!b.endsWith('/')) b += '/'
  return b
}

function renderIndex(list) {
  const items = list
    .map(
      ({ name, title }) => `      <li>
        <a href="./${name}/">
          <span class="title">${escapeHtml(title)}</span>
          <span class="slug">${escapeHtml(name)}</span>
        </a>
      </li>`,
    )
    .join('\n')

  return `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Talks · 技术分享</title>
  <style>
    :root {
      color-scheme: light dark;
      --fg: #1f2328;
      --fg-dim: #6a737d;
      --bg: #ffffff;
      --card: #f6f8fa;
      --accent: #0969da;
    }
    @media (prefers-color-scheme: dark) {
      :root {
        --fg: #e6edf3;
        --fg-dim: #8b949e;
        --bg: #0d1117;
        --card: #161b22;
        --accent: #58a6ff;
      }
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, "PingFang SC", "Microsoft YaHei", "Noto Sans SC", sans-serif;
      color: var(--fg);
      background: var(--bg);
      max-width: 42rem;
      margin: 0 auto;
      padding: 4rem 1.5rem;
      line-height: 1.6;
    }
    h1 { font-size: 1.6rem; margin-bottom: .4rem; }
    p.sub { color: var(--fg-dim); margin-bottom: 2.5rem; }
    ul { list-style: none; }
    li { margin-bottom: 1rem; }
    li a {
      display: block;
      padding: 1rem 1.25rem;
      background: var(--card);
      border-radius: 10px;
      text-decoration: none;
      color: var(--fg);
      transition: transform .12s ease;
    }
    li a:hover { transform: translateY(-2px); }
    .title { display: block; font-weight: 600; color: var(--accent); }
    .slug { display: block; font-size: .82rem; color: var(--fg-dim); margin-top: .2rem; }
  </style>
</head>
<body>
  <h1>Talks</h1>
  <p class="sub">技术分享与演讲存档，用 Slidev 制作。</p>
  <ul>
${items}
  </ul>
</body>
</html>
`
}

function escapeHtml(s) {
  return s
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}
