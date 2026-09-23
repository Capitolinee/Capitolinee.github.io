import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// 三種內容各一個資料夾。新增一篇 = 丟一個 .md 檔進去，不用改任何程式。
// 欄位打錯或漏填，build 時會直接報錯告訴你哪一篇有問題。

const notes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/notes' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string().optional(),
    cover: z.string().optional(), // 例如 '/img/foo.jpg'，檔案放 public/img/
    draft: z.boolean().default(false),
  }),
});

const makes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/makes' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    material: z.string().optional(), // 木工、陶、編織…
    summary: z.string().optional(),
    cover: z.string().optional(),
    photos: z.array(z.string()).default([]), // 內頁的多張照片
    draft: z.boolean().default(false),
  }),
});

const books = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/books' }),
  schema: z.object({
    title: z.string(),
    author: z.string().optional(),
    date: z.coerce.date(), // 讀完的日期
    rating: z.number().min(0).max(5).default(0),
    cover: z.string().optional(),
    link: z.string().optional(), // 想連到書店或心得就填
    draft: z.boolean().default(false),
  }),
});

export const collections = { notes, makes, books };
