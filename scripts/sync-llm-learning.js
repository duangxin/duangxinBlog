const fs = require('node:fs/promises');
const path = require('node:path');

const projectRoot = path.resolve(__dirname, '..');
const sourceRoot =
  process.env.LLM_LEARNING_DIR || '/Users/jasondu/Desktop/LLM-learing-main';
const postsDir = path.join(projectRoot, 'source', '_posts');
const repoUrl = 'https://github.com/duangxin/LLM-learing';

const posts = [
  {
    week: 1,
    source: 'week1/week1_log.md',
    slug: 'llm-week-1-learning-log',
    title: 'Week 1 学习记录（4.14 - 4.19）',
    date: '2026-04-19 20:00:00',
    tags: ['llm', 'learning', 'llava'],
    assets: []
  },
  {
    week: 2,
    source: 'week2/week2_log.md',
    slug: 'llm-week-2-learning-log',
    title: 'Week 2 学习记录（4.21 - 4.27）',
    date: '2026-04-27 20:00:00',
    tags: ['llm', 'learning', 'transformer', 'resnet'],
    assets: [
      {
        source: 'week2/settleDegradation.png',
        filename: 'settleDegradation.png',
        alt: '解决网络退化问题'
      }
    ]
  },
  {
    week: 3,
    source: 'week3/week3_log.md',
    slug: 'llm-week-3-learning-log',
    title: 'Week 3 学习记录（5.4 - 5.11）',
    date: '2026-05-11 20:00:00',
    tags: ['llm', 'learning', 'vit', 'clip'],
    assets: [
      {
        source: 'week3/pos_embedding.png',
        filename: 'pos_embedding.png',
        alt: '位置嵌入可视化'
      }
    ]
  },
  {
    week: 4,
    source: 'week4/week4_log.md',
    slug: 'llm-week-4-learning-log',
    title: 'Week 4 学习记录（5.12 - 5.18）',
    date: '2026-05-18 20:00:00',
    tags: ['llm', 'learning', 'multimodal', 'agent'],
    assets: []
  }
];

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function stripSourceTitle(markdown) {
  return markdown.replace(/^# .+\r?\n+/, '').trim();
}

function rewriteAssetReferences(markdown, assets) {
  let next = markdown;

  for (const asset of assets) {
    const escaped = escapeRegExp(asset.filename);
    const imagePattern = new RegExp(`!\\[([^\\]]*)\\]\\((?:\\./)?${escaped}\\)`, 'g');
    next = next.replace(imagePattern, `{% asset_img ${asset.filename} ${asset.alt} %}`);
  }

  return next;
}

function frontMatter(post) {
  const tagLines = post.tags.map(tag => `  - ${tag}`).join('\n');
  const sourceUrl = `${repoUrl}/blob/main/${post.source}`;

  return `---\ntitle: ${post.title}\ndate: ${post.date}\ncategories:\n  - 每周学习总结\ntags:\n${tagLines}\nsource: ${sourceUrl}\n---\n`;
}

async function copyAssets(post) {
  if (post.assets.length === 0) return;

  const assetDir = path.join(postsDir, post.slug);
  await fs.mkdir(assetDir, { recursive: true });

  for (const asset of post.assets) {
    const from = path.join(sourceRoot, asset.source);
    const to = path.join(assetDir, asset.filename);
    await fs.copyFile(from, to);
  }
}

async function syncPost(post) {
  const sourcePath = path.join(sourceRoot, post.source);
  const targetPath = path.join(postsDir, `${post.slug}.md`);

  const raw = await fs.readFile(sourcePath, 'utf8');
  const body = rewriteAssetReferences(stripSourceTitle(raw), post.assets);
  const content = `${frontMatter(post)}\n> 来源：[duangxin/LLM-learing ${post.source}](${repoUrl}/blob/main/${post.source})\n\n${body}\n`;

  await fs.writeFile(targetPath, content, 'utf8');
  await copyAssets(post);
  console.log(`Synced ${post.source} -> ${path.relative(projectRoot, targetPath)}`);
}

async function main() {
  await fs.access(sourceRoot);
  await fs.mkdir(postsDir, { recursive: true });

  for (const post of posts) {
    await syncPost(post);
  }
}

if (require.main === module) {
  main().catch(error => {
    console.error(error.message);
    process.exit(1);
  });
}
