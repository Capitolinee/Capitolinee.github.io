import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

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
    date: z.coerce.date().optional(), // 讀完的日期；在讀、想讀可以不填
    rating: z.number().min(0).max(5).default(0),
    cover: z.string().optional(),
    link: z.string().optional(),
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

export const collections = { notes, makes, books, pages };
