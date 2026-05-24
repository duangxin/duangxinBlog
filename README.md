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

## 主题

当前主题是 [NexT](https://github.com/theme-next/hexo-theme-next)，主题配置在 `_config.next.yml`。

## Cloudflare Pages 设置

- Production branch: `main`
- Build command: `npm run build`
- Build directory: `public`
- Node.js version: `22` 或至少 `20.19.0+`

如果 Cloudflare 分配的 `pages.dev` 地址或你的正式域名不是 `_config.yml` 里的 `url`，部署后把它改成真实地址即可。
