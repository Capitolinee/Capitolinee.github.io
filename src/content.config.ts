import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// 後台的日期欄位留空時，有時候存的是空字串而不是完全省略這個欄位。
// 對 Zod 來說兩者不一樣：空字串會被當成「一個要解析的日期」而解析失敗，
// 讓 build 整個掛掉。這個 preprocess 把空字串／純空白也當成「沒填」。
const optionalDate = () =>
  z.preprocess((v) => (typeof v === 'string' && v.trim() === '' ? undefined : v), z.coerce.date().optional());

// 四種內容各一個資料夾。新增一篇 = 丟一個 .md 檔，或用 /admin/ 後台。
// 欄位打錯或漏填，build 時會直接報錯告訴你哪一篇有問題。
// 這裡的欄位要跟 public/admin/config.yml 對得起來。

const tags = z.array(z.string()).default([]);

const notes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/notes' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string().optional(),
    cover: z.string().optional(),
    tags,
    draft: z.boolean().default(false),
  }),
});

const makes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/makes' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    material: z.string().optional(),
    summary: z.string().optional(),
    cover: z.string().optional(),
    photos: z.array(z.string()).default([]),
    tags,
    draft: z.boolean().default(false),
  }),
});

const books = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/books' }),
  schema: z.object({
    title: z.string(),
    author: z.string().optional(),
    // reading = 在讀、done = 讀完、want = 想讀
    status: z.enum(['reading', 'done', 'want']).default('done'),
    date: optionalDate(), // 讀完的日期；在讀、想讀可以不填
    rating: z.number().min(0).max(5).default(0),
    cover: z.string().optional(),
    link: z.string().optional(),
    tags, // 可以貼好幾個，複合型的書就多貼幾個
    // 書摘：每則有內容、頁數（選填）、我的想法（選填）
    quotes: z
      .array(
        z.object({
          text: z.string(),
          page: z.union([z.string(), z.number()]).transform(String).optional(),
          note: z.string().optional(),
        }),
      )
      .default([]),
    draft: z.boolean().default(false),
  }),
});

// 單頁內容，目前只有「關於」
const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    summary: z.string().optional(),
  }),
});

// ── 遊戲：哪款遊戲＋圖片＋一點文字 ──
const games = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/games' }),
  schema: z.object({
    title: z.string(),
    game: z.string().optional(), // 遊戲名稱
    date: optionalDate(),
    cover: z.string().optional(),
    photos: z.array(z.string()).default([]),
    tags,
    draft: z.boolean().default(false),
  }),
});

export const collections = { notes, makes, books, pages, games };
