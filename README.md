# talks

技术分享与演讲存档，每个演讲是一个独立的 [Slidev](https://sli.dev) 项目，通过 GitHub Pages 发布：

**https://zjy4fun.github.io/talks/**

## 目录结构

```
talks/
├── rn-expo-talk/          # 一个演讲 = 一个目录（slides.md + package.json）
├── scripts/build.mjs      # 扫描所有演讲目录，逐个构建并生成首页索引
└── .github/workflows/     # push 到 main 自动构建 + 部署到 GitHub Pages
```

## 本地开发

```bash
pnpm install
pnpm -C rn-expo-talk dev   # 起某个演讲的 dev server
pnpm build                 # 构建全部演讲到 site/
```

## 新增一个演讲

1. 在根目录建一个新文件夹，放 `slides.md` 和 `package.json`（可直接抄现有演讲的 `package.json`）
2. 在**仓库根**执行 `pnpm install`——这会把新目录写进 `pnpm-lock.yaml`，lockfile 必须随代码一起提交，否则 CI 的 `--frozen-lockfile` 会直接失败
3. `pnpm -C <目录名> dev` 开发
4. push 到 main，流水线自动构建并部署到 `gh-pages` 分支，新演讲自动出现在首页索引里
