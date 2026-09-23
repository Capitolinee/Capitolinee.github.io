# 個人網站

Astro + 純 CSS，Nord 配色，深淺色可切換。靜態輸出，除了主題切換的幾行之外沒有 JavaScript。

## 跑起來

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # 輸出到 dist/
npm run preview  # 預覽 build 結果
```

## 兩種新增內容的方式

### 方式一：後台視窗（推薦）

```bash
npm run dev
```

然後開 **http://localhost:4321/admin/**

用的是 [Sveltia CMS](https://github.com/sveltia/sveltia-cms)，一個 Git-based 的後台。
第一次開會問你要用哪個模式，選 **本機**（Work with Local Repository），
授權它讀取你的專案資料夾就可以了——**不用註冊、不用登入、不用設定任何東西**。

進去之後左邊是四個分類：筆記、手作、書、網站設定。點「新增」填表單，
日期有日曆可以點，照片可以直接拖進去，內文有 Markdown 編輯器和即時預覽。
按儲存，它就幫你寫成 `.md` 檔存到對應的資料夾，`npm run dev` 那邊會立刻更新。

本機模式需要 Chrome 或 Edge（用到 File System Access API）。
Firefox 和 Safari 目前不支援，要用下面的線上模式。

**連網站設定都能改**：名字、首頁大標、Email 這些存在 `src/data/site.json`，
後台的「網站設定」分頁就能編輯。

改完記得 `git commit` 推上去，網站才會更新。

### 方式二：直接寫檔案

三個資料夾對應三種內容：

```
src/content/
├── notes/   筆記
├── makes/   手作
└── books/   讀過的書
```

檔名就是網址。`notes/hello.md` → `/notes/hello/`。

### 筆記

```markdown
---
title: 標題
date: 2026-09-14
summary: 一句話摘要，會顯示在內頁標題下方
cover: /img/foo.jpg     # 選填，卡片上的圖
draft: false            # 填 true 就不會出現在網站上
---

正文用 Markdown 寫。
```

### 手作

```markdown
---
title: 做了一個層架
date: 2026-08-30
material: 木工          # 選填
summary: 一句話
cover: /img/shelf-1.jpg # 卡片上顯示這張
photos:                 # 內頁的其他照片
  - /img/shelf-2.jpg
  - /img/shelf-3.jpg
---

做的過程寫這裡。
```

### 書

```markdown
---
title: 書名
author: 作者
date: 2026-09-02        # 讀完的日期，列表會依年份分組
rating: 4               # 0 到 5，填 0 不顯示星星
cover: /img/book.jpg    # 選填
link: /notes/心得檔名/   # 選填，想寫心得就連到一篇筆記
---
```

**欄位打錯或漏填，`npm run build` 會直接報錯告訴你是哪一篇**，不會默默壞掉。

欄位定義在兩個地方，要加欄位的話兩邊都要改：

- `src/content.config.ts` — 網站讀資料時的驗證
- `public/admin/config.yml` — 後台表單長什麼樣

### 讓後台可以線上用（選配）

如果你想在手機上、或不開編輯器的情況下也能發文，就要讓後台連到 GitHub。
`public/admin/config.yml` 上面那段 `backend` 改成你的 repo，然後：

1. 部署一個 OAuth 中繼站。官方有現成的 Cloudflare Worker：
   [sveltia-cms-auth](https://github.com/sveltia/sveltia-cms-auth)，一鍵部署，免費
2. 在 GitHub 註冊一個 OAuth App，callback 填 Worker 的網址
3. 把 Worker 網址填回 `config.yml` 的 `base_url`

之後開 `你的網址/admin/` 就能用 GitHub 帳號登入，直接在瀏覽器裡寫，
按儲存它會幫你 commit 到 repo，GitHub Actions 自動重新部署。

嫌麻煩的話就用本機模式，一樣好用，只是要在自己電腦上。

## 照片

圖檔放 `public/img/`，在 frontmatter 寫 `/img/檔名.jpg`（開頭的斜線要留著）。

還沒放照片的項目會顯示 Nord 漸層的占位塊，顏色依檔名固定，重整不會跳來跳去。

## 配色

`src/styles/global.css` 最上面。16 個 Nord 原始色票（`--n0` 到 `--n15`）先定義好，
下面再用語意名稱引用，深淺兩套各一組：

| | 深色 | 淺色 |
|---|---|---|
| 底 | nord0 | `#f9fafb` |
| 頂部列／卡片 | nord1 | 純白 |
| 邊框 | nord3 | nord5 |
| 主文字 | nord6 | nord0 |
| 主色 | nord8 | nord10 |

要換色只改語意色那兩段，原始色票留著當參考。

深淺色預設跟隨系統，右上角的太陽／月亮按鈕可以手動切換，選擇存在 localStorage。
圖示顯示的是「點下去會變成的樣子」：現在深色就顯示太陽，現在淺色就顯示月亮。
還沒手動切過的話，系統換模式網站會跟著換。`Base.astro` 的 `<head>` 裡有一段同步執行的腳本，
在畫面繪製前就套用主題，避免重新整理時閃白光——那段不能改成延後執行。

## 檔案結構

```
src/
├── content.config.ts     ← 三種內容的欄位定義
├── content/              ← 內容本體（.md）
├── data/
│   ├── site.json         ← 名字、標題、聯絡方式（後台可改）
│   └── site.ts
├── styles/global.css     ← 全部的樣式
├── lib/
│   ├── url.ts            ← 處理 GitHub Pages 子路徑
│   └── format.ts         ← 日期格式、星等、占位漸層
├── components/
├── layouts/Base.astro    ← 頂部列、頁尾、<head>
└── pages/
    ├── index.astro       ← 首頁
    ├── notes/  makes/  books/
    └── rss.xml.ts

public/
├── admin/
│   ├── index.html        ← 後台入口
│   └── config.yml        ← 後台的欄位設定
├── img/                  ← 照片放這裡
└── favicon.svg
```

## 部署到 GitHub Pages

`.github/workflows/deploy.yml` 已經寫好，推上去就自動建置發佈。

1. 建 repo 推上去

   ```bash
   git init && git add . && git commit -m "init"
   git branch -M main
   git remote add origin https://github.com/你的帳號/repo名稱.git
   git push -u origin main
   ```

2. 改 `astro.config.mjs` 的 `site`

   repo 叫 `你的帳號.github.io`（推薦）→ 只改 `site`，`base` 保持註解狀態。

   repo 叫其他名字 → `site` 照填，並把 `base: '/repo名稱'` 那行取消註解。

3. repo → Settings → Pages → Source 選 **GitHub Actions**（不是 Deploy from a branch）

4. 看 Actions 分頁等綠燈

子路徑的情況我測過了，圖片和 favicon 的路徑會自動加上前綴，不會 404。

### 其他部署選項

Cloudflare Pages、Netlify、Vercel 都可以，build 指令 `npm run build`，輸出目錄 `dist`，
而且不需要設 `base`。

## 之後可以加的

- **文章內頁的目錄**：Astro 的 `render()` 會回傳 `headings`，拿來生目錄很容易
- **標籤**：在 `content.config.ts` 的 schema 加 `tags: z.array(z.string()).default([])`
- **需要互動的區塊**：`npx astro add react`，只有那一塊會載入 JavaScript
- **版本更新**：`npx @astrojs/upgrade`
