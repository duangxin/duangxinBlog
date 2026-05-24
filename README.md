# duangxinBlog

个人博客源码，基于 Hexo 构建，使用 NexT 主题，计划部署到 Cloudflare Pages。

## 本地开发

```bash
npm install
npm run server
```

本地预览地址默认是 <http://localhost:4000/>。

## 生成静态文件

```bash
npm run build
```

生成结果会输出到 `public/`，Cloudflare Pages 的构建目录也应设置为 `public`。

## 同步 LLM-learing 周总结

默认从本机 `/Users/jasondu/Desktop/LLM-learing-main` 同步 `week1` 到 `week4` 的周总结：

```bash
npm run sync:llm-learning
npm run build
```

如果本地 LLM-learing 仓库在其他位置，可以临时指定：

```bash
LLM_LEARNING_DIR=/path/to/LLM-learing-main npm run sync:llm-learning
```

同步规则：

- 只同步 `week1/week1_log.md` 到 `week4/week4_log.md`。
- 不同步 `week2/paper.md`，避免和 Week 2 周总结重复。
- 同步生成的文章分类固定为 `每周学习总结`。
- Week 2、Week 3 的图片会复制到对应文章资源目录。

以后更新文章的步骤：

1. 在 `/Users/jasondu/Desktop/LLM-learing-main` 更新周总结。
2. 确认 LLM-learing 已同步到 GitHub。
3. 回到这个 blog 仓库。
4. 运行 `npm run sync:llm-learning`。
5. 运行 `npm run build` 检查 Hexo 是否能正常生成。
6. 运行 `git status` 检查改动。
7. 提交并推送到 `origin/main`，Cloudflare Pages 会自动重新部署。

## 主题

当前主题是 [NexT](https://github.com/theme-next/hexo-theme-next)，主题配置在 `_config.next.yml`。

## Cloudflare Pages 设置

- Production branch: `main`
- Build command: `npm run build`
- Build directory: `public`
- Node.js version: `22` 或至少 `20.19.0+`

如果 Cloudflare 分配的 `pages.dev` 地址或你的正式域名不是 `_config.yml` 里的 `url`，部署后把它改成真实地址即可。
