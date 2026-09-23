---
title: 這是第一篇筆記
date: 2026-09-14
summary: 把這個檔案改掉，或是直接刪了重寫一篇。
---

這裡用 Markdown 寫就好。上面三個橫線夾住的區塊叫 frontmatter，是這篇的資料，
欄位定義在 `src/content.config.ts`，打錯的話 build 會直接報錯告訴你。

## 小標題長這樣

一般段落。可以放 [連結](https://example.com)、`行內程式碼`，也可以放清單：

- 第一點
- 第二點

```js
// 程式碼區塊會有底色和邊框
console.log('hello');
```

> 引言會在左邊多一條主色的線。

要放圖的話，把圖檔丟到 `public/img/`，然後寫 `![說明](/img/檔名.jpg)`。
