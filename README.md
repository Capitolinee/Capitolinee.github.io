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

### 讓後台可以線上用

部署上線後，開 `https://capitolinee.github.io/admin/` 就能在瀏覽器裡寫，按儲存會直接
commit 到 GitHub，一兩分鐘後網站自動更新。手機也能用。

**最簡單的方式：用 Access Token 登入（不用架任何東西）**

1. GitHub 右上角頭像 → Settings → 左側最下面 Developer settings
   → Personal access tokens → **Fine-grained tokens** → Generate new token
2. 填：
   - Token name：隨便，例如「網站後台」
   - Expiration：自己決定，最長一年
   - Repository access：選 **Only select repositories**，挑 `Capitolinee.github.io`
   - Permissions → Repository permissions → **Contents** 改成 **Read and write**
3. 按 Generate，複製那串 token（只會顯示一次）
4. 開 `你的網址/admin/`，選 **Sign In Using Access Token**，貼上

token 會存在那台裝置的瀏覽器裡。過期了就重新產一個。

**進階：用「Sign In with GitHub」按鈕登入（選配）**

不想管 token 的話，可以架一個登入中繼站：

如果你想在手機上、或不開編輯器的情況下也能發文，就要讓後台連到 GitHub。
`public/admin/config.yml` 上面那段 `backend` 改成你的 repo，然後：

1. 部署一個 OAuth 中繼站。官方有現成的 Cloudflare Worker：
   [sveltia-cms-auth](https://github.com/sveltia/sveltia-cms-auth)，一鍵部署，免費
2. 在 GitHub 註冊一個 OAuth App，callback 填 Worker 的網址
3. 把 Worker 網址填回 `config.yml` 的 `base_url`

之後開 `你的網址/admin/` 就能用 GitHub 帳號登入，直接在瀏覽器裡寫，
按儲存它會幫你 commit 到 repo，GitHub Actions 自動重新部署。

嫌麻煩的話就用 Access Token，一樣好用。

## 功能

### 搜尋

右上角的放大鏡。用 [Pagefind](https://pagefind.app)，`npm run build` 時自動建索引，
不需要伺服器，中文也能搜。會搜筆記、手作、書、關於頁的內容。

`npm run dev` 底下搜尋用不了（索引還沒產生），要試的話跑 `npm run build && npm run preview`。

網址可以直接帶關鍵字：`/search/?q=木工`

### 標籤

筆記和手作可以加標籤：

```yaml
tags: [木工, 第一次]
```

後台的標籤欄位用逗號分開就好。每個標籤會自動有自己的頁面（`/tags/木工/`），
所有標籤在 `/tags/`。

### 書的閱讀狀態

```yaml
status: reading   # reading 在讀／done 讀完／want 想讀
```

- **在讀**：首頁「書」那一區排最前面，書頁最上面
- **讀完**：依讀完日期分年份
- **想讀**：書頁最下面
- 在讀和想讀不用填日期和星等

### 照片放大

手作的內頁，點任一張照片會全螢幕放大。左右鍵或手機左右滑切換，Esc 或點旁邊關閉。

### 文章留言

用 [Firebase](https://firebase.google.com)（Google 的服務）存留言，訪客用 **Google 帳號**登入才能留。
免費方案每天可以讀 5 萬次、寫 2 萬次，個人網站用不完，也不需要信用卡。

- 出現在筆記和手作的內頁底下，每篇各自一串
- 自己的留言自己可以刪；你用設定的 Gmail 登入時會有「作者」標章，而且能刪任何人的留言
- 留言送出後不能修改，最多 1000 字

沒設定之前，留言區不會出現。

**設定步驟：**

1. 到 https://console.firebase.google.com 用你的 Google 帳號登入 → **建立專案**。
   名稱隨便取，Google Analytics 可以關掉
2. 專案首頁點 **`</>`（網頁）** 圖示新增應用程式，暱稱隨便，**不用**勾 Firebase Hosting。
   完成後會顯示一段 `firebaseConfig`，把 `apiKey`、`authDomain`、`projectId`、`appId`
   這四個值複製下來
3. 左側 **Build → Authentication** → 開始使用 → **Sign-in method** 分頁 → 選 **Google**
   → 啟用 → 選一個支援信箱 → 儲存
4. 同一頁的 **Settings** 分頁 → **Authorized domains** → 新增網域 → 填
   `capitolinee.github.io`
5. 左側 **Build → Firestore Database** → 建立資料庫 → 位置選 **asia-east1（台灣）**
   → 選**正式版模式（production mode）**
6. Firestore 的 **規則（Rules）** 分頁 → 把 repo 裡 `firestore.rules` 的內容整個貼上，
   **把 `OWNER_EMAIL` 換成你的 Gmail** → 發布
7. 網站後台 → 網站設定 → 基本資料 → **留言（Firebase）** → 貼上第 2 步的四個值，
   「你的 Gmail」填跟第 6 步一樣的 → 儲存

`apiKey` 這些值放在公開的 repo 裡是正常的，它們不是密碼。真正擋住壞人的是第 6 步的安全規則：
沒登入不能留言、不能冒充別人、不能改別人的留言。

**想同時開放 GitHub 登入（選配）：** 第 3 步多啟用 GitHub，它會要你到 GitHub 建一個 OAuth App，
照畫面指示把 callback 網址填過去。完成後在後台勾「也開放 GitHub 登入」。

### 背景音樂

左下角的音符。後台 → 網站設定 → 基本資料 → **背景音樂**，貼 YouTube 連結（單首或播放清單）
或音樂檔路徑（例如 `/audio/bgm.mp3`，檔案放 `public/audio/`）。

- 有設定背景音樂時，訪客每次新造訪會先看到**歡迎畫面**，點「進入」才開始播。
  這是因為瀏覽器不允許網頁一打開就自動出聲，那一下點擊就是讓瀏覽器放行
- **站內換頁音樂不會中斷**。網站用了 Astro 的 ClientRouter 做站內換頁，
  而且自訂了換頁方式，播放器那一塊完全不會被移動（`Base.astro` 最下面那段）
- 訪客按音符暫停之後，換頁也不會再自己播

⚠️ 因為用了站內換頁，**新寫的程式如果要在每一頁都執行**，要包在
`document.addEventListener('astro:page-load', () => { ... })` 裡面，
不然只會在第一次進站時跑一次。現有的元件都已經處理好了。

### 關於頁

`/about/`，內容在 `src/content/pages/about.md`，後台的「頁面 → 關於」可以改。

### 遊戲

`/games/`，跟手作一樣簡單：後台「遊戲」→ 新增，填**標題**、**哪款遊戲**、日期，
放封面圖和其他圖片，寫點文字就好。

- 列表卡片上會顯示遊戲名稱和日期
- 內頁的圖片可以點開放大
- 首頁有「遊戲」區塊，也會出現在「最近」裡
- 一樣有標籤、留言、分享卡片、搜尋、RSS

### 中英文切換

右上角的「EN／中」。預設英文，訪客選過中文會記住，換頁、重新整理都不會跳回去。

- **只翻網站介面**：選單、按鈕、標題、提示文字、日期那行（「3 min read」／「約 3 分鐘」）
- **文章不翻**：筆記、手作、書的標題和內文照你寫的原文顯示
- **後台不變**：還是中文
- **網站設定的文字**（首頁大標、首頁介紹、頁尾那句話、歡迎畫面）：後台每一項下面都有「英文版」欄位。
  沒填的話，如果還是預設的那句會自動翻，改過的就顯示你寫的中文

介面翻譯全部在 `src/lib/i18n.ts`，想改英文或中文的說法直接改那裡。

新增介面文字的寫法：

```astro
<T k="notes" />                                   <!-- 用 i18n.ts 裡的 -->
<T en="Hello" zh="你好" />                         <!-- 直接寫 -->
<button {...ta('aria-label', 'search')}>           <!-- 屬性用 ta() -->
```

分享預覽卡片上的「Note／Make」是英文，因為卡片是 build 時產生的固定圖片，只能選一種語言。

### 照片自動處理

`npm run build` 時會自動處理 `public/img/` 裡的照片（`scripts/optimize-images.mjs`）：

- 最長邊超過 2000px 的縮小，重新壓縮。手機原圖一張 3–5MB，處理後大約剩 300–600KB
- 依照拍攝方向**自動轉正**
- **清掉 EXIF**，包含拍攝地點的 GPS 座標和手機型號。在家拍的照片不會洩漏住址

只處理輸出的 `dist/`，你上傳的原圖在 `public/img/` 裡不會被動到。直接上傳手機原圖就好。

### 分享預覽卡片

把文章連結貼到 Discord、LINE、Facebook、X，會出現一張 1200×630 的預覽圖：
Nord 深色底、你的名字、標題、日期和標籤。有封面照片的話會放在右半邊。

build 時自動替每篇筆記和手作生成（`src/lib/og.ts`），其他頁面共用一張寫著首頁標題的圖。

Discord 快取很久，改了標題之後舊的預覽可能還會顯示一陣子。

### 文章目錄、閱讀時間、上下篇

- 筆記有兩個以上的小標題（`##` 或 `###`），會自動出現目錄。寬螢幕固定在右邊、
  捲到哪一段亮哪一段；手機放在文章上方
- 筆記的日期後面會顯示「約 N 分鐘」
- 筆記和手作底部有「上一篇（比較舊的）／下一篇（比較新的）」

### 照片牆

`/photos/`，所有手作的照片（主照片＋其他照片）集合成一面瀑布牆，點了可以放大。
不用另外設定，手作有照片就會自動出現。

### 年度回顧

`/review/` 是最新一年，`/review/2025/` 這樣可以看其他年。自動統計：

- 讀完幾本書、做了幾件手作、寫了幾篇筆記、放了幾張照片
- 每個月的數量長條圖
- 今年星等最高的書、最常用的標籤
- 當年的書、手作、筆記列表

書的「讀完的日期」要填，才會算進那一年。

### 404 頁和 sitemap

網址打錯會看到自己的 404 頁。`sitemap-index.xml` 和 `robots.txt` 會自動產生，
讓 Google 知道網站有哪些頁面（後台和搜尋頁不收錄）。

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
│   ├── notes/  makes/  books/
│   └── pages/about.md
├── data/
│   ├── site.json         ← 名字、標題、聯絡方式（後台可改）
│   └── site.ts
├── styles/global.css     ← 全部的樣式
├── lib/
│   ├── url.ts            ← 處理 GitHub Pages 子路徑
│   ├── format.ts         ← 日期格式、星等、占位漸層
│   └── content.ts        ← 讀取內容、排序、標籤
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

- **需要互動的區塊**：`npx astro add react`，只有那一塊會載入 JavaScript
- **版本更新**：`npx @astrojs/upgrade`
