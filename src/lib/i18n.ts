// 網站介面的中英文翻譯，全部集中在這裡。
// 只翻介面（選單、按鈕、提示文字），文章內容不翻。
// 要改翻譯直接改這個檔案。

export const ui = {
  // 導覽
  skip: { en: 'Skip to content', zh: '跳到主要內容' },
  home: { en: 'Home', zh: '首頁' },
  notes: { en: 'Notes', zh: '筆記' },
  makes: { en: 'Makes', zh: '手作' },
  books: { en: 'Books', zh: '書' },
  about: { en: 'About', zh: '關於' },
  tags: { en: 'Tags', zh: '標籤' },
  photos: { en: 'Photos', zh: '照片' },
  review: { en: 'Year in Review', zh: '年度回顧' },
  search: { en: 'Search', zh: '搜尋' },
  viewAll: { en: 'View all', zh: '全部' },
  latest: { en: 'Latest', zh: '最近' },
  mainNav: { en: 'Main', zh: '主要導覽' },
  categories: { en: 'Categories', zh: '分類' },
  language: { en: 'Language: English. Switch to Chinese', zh: '語言：中文。切換成英文' },
  darkMode: { en: 'Dark mode', zh: '深色模式' },

  // 書摘
  quotes: { en: 'Highlights', zh: '劃線' },
  quotesLede: { en: 'Passages I underlined, grouped by book.', zh: '讀書時劃下來的句子，依書整理。' },
  emptyQuotes: { en: 'No highlights yet. Add some from the admin under Books.', zh: '還沒有書摘。在後台的「書」裡面可以加。' },
  seeQuotes: { en: 'See all highlights →', zh: '看所有書摘 →' },
  myNote: { en: 'My note', zh: '我的想法' },
  tagFilter: { en: 'Filter by tag', zh: '依標籤篩選' },
  allBooks: { en: 'All', zh: '全部' },

  // 遊戲
  games: { en: 'Games', zh: '遊戲' },
  gamesLede: { en: 'Games I’ve been playing — screenshots and a few thoughts.', zh: '最近在玩的遊戲，截圖和一些心得。' },
  emptyGames: { en: 'No game posts yet.', zh: '還沒有遊戲的貼文。' },
  screenshots: { en: 'Screenshots', zh: '截圖' },
  backGames: { en: 'Back to games', zh: '回到遊戲' },

  // 類型
  kindNote: { en: 'Note', zh: '筆記' },
  kindMake: { en: 'Make', zh: '手作' },
  kindFinished: { en: 'Finished', zh: '讀完' },
  kindGame: { en: 'Game', zh: '遊戲' },
  statusReading: { en: 'Reading', zh: '在讀' },
  statusWant: { en: 'Want to read', zh: '想讀' },
  shelfReading: { en: 'Currently reading', zh: '正在讀' },
  shelfWant: { en: 'Want to read', zh: '想讀' },
  shelfEarlier: { en: 'Earlier', zh: '更早' },
  phCover: { en: 'Cover', zh: '封面圖' },
  phPhoto: { en: 'Photo', zh: '手作照片' },

  // 列表頁
  notesLede: { en: 'Notes to my future self. Mostly without conclusions.', zh: '寫給未來的自己看，多半沒什麼結論。' },
  makesLede: { en: 'Things I made by hand — the ones that went wrong, too.', zh: '用手做出來的東西，做壞的也放。' },
  tagsLede: { en: 'Tags from notes and makes. The number is how often each is used.', zh: '筆記和手作的標籤，數字是用了幾次。' },
  searchLede: { en: 'Find notes, makes and books.', zh: '找筆記、手作、書。' },
  seeReview: { en: 'See the year in review →', zh: '看年度回顧 →' },
  allTags: { en: 'All tags', zh: '所有標籤' },
  backNotes: { en: 'Back to notes', zh: '回到筆記' },
  backMakes: { en: 'Back to makes', zh: '回到手作' },

  // 空狀態
  emptyRecent: { en: 'Nothing here yet. Add something from /admin/.', zh: '還沒有東西。到 /admin/ 新增一篇。' },
  emptyNotes: { en: 'No notes yet.', zh: '還沒有筆記。' },
  emptyMakes: { en: 'No makes yet.', zh: '還沒有手作。' },
  emptyBooks: { en: 'No books yet.', zh: '還沒有書。' },
  emptyTags: { en: 'No tags yet. Add tags to a note or make and they’ll show up here.', zh: '還沒有標籤。在筆記或手作裡加上 tags 就會出現在這裡。' },
  emptyPhotos: { en: 'No photos yet. Photos from makes show up here automatically.', zh: '還沒有照片。在手作裡放上主照片或其他照片，就會自動出現在這裡。' },
  aboutEmpty: { en: 'Nothing here yet.', zh: '還沒寫。到後台「關於」頁面寫一點吧。' },
  mailMe: { en: 'Email me', zh: '寄信給我' },

  // 搜尋
  searchDev: {
    en: 'The search index is built by npm run build, so search doesn’t work under npm run dev. It works fine once deployed.',
    zh: '搜尋索引是在 npm run build 時才產生的，所以 npm run dev 底下用不了。部署上線後會正常運作。',
  },

  // 404
  nfTitle: { en: 'Page not found', zh: '找不到這一頁' },
  nfHead: { en: 'This page is gone', zh: '這一頁不見了' },
  nfLede: { en: 'Maybe the address is wrong, or I moved this page.', zh: '可能是網址打錯，或是這篇被我搬走了。' },
  nfHome: { en: 'Back home', zh: '回首頁' },
  nfSearch: { en: 'Try searching', zh: '搜尋看看' },

  // 文章
  prev: { en: 'Previous', zh: '上一篇' },
  next: { en: 'Next', zh: '下一篇' },
  morePosts: { en: 'More posts', zh: '其他文章' },
  toc: { en: 'Contents', zh: '目錄' },

  // 照片放大
  lbDialog: { en: 'Photo viewer', zh: '照片檢視' },
  lbClose: { en: 'Close', zh: '關閉' },
  lbPrev: { en: 'Previous photo', zh: '上一張' },
  lbNext: { en: 'Next photo', zh: '下一張' },

  // 作者工具列
  abEdit: { en: 'Edit this', zh: '編輯這篇' },
  abNew: { en: '+ New', zh: '＋ 新增' },
  abAdmin: { en: 'Admin', zh: '後台' },
  abHide: { en: 'Hide author bar (opening admin brings it back)', zh: '隱藏（再開一次後台就會回來）' },

  // 歡迎畫面
  wEnter: { en: 'Come on in', zh: '點一下進入' },
  wQuiet: { en: 'No music, just go in', zh: '不要音樂，直接進去' },
  wHint: { en: 'You can pause the music anytime with the note in the bottom-left.', zh: '進站之後，左下角的音符可以隨時暫停' },
  wTitle: { en: 'Welcome', zh: '歡迎光臨' },

  // 留言
  comments: { en: 'Comments', zh: '留言' },
  loading: { en: 'Loading…', zh: '載入中…' },
  noComments: { en: 'No comments yet — be the first.', zh: '還沒有人留言，當第一個吧' },

  // 年度回顧
  yrStatBooks: { en: 'books finished', zh: '本書讀完' },
  yrStatMakes: { en: 'makes', zh: '件手作' },
  yrStatNotes: { en: 'notes', zh: '篇筆記' },
  yrStatPhotos: { en: 'photos', zh: '張照片' },
  yrMonthly: { en: 'By month', zh: '每個月' },
  yrFavBook: { en: 'Favorite book this year', zh: '今年最喜歡的書' },
  yrTopTags: { en: 'Most-used tags', zh: '最常出現的標籤' },
  yrBooks: { en: 'Books finished', zh: '讀完的書' },
  yrMakes: { en: 'Things I made', zh: '做的東西' },
  yrNotes: { en: 'Notes I wrote', zh: '寫的筆記' },
  yrPick: { en: 'Choose a year', zh: '選擇年份' },
  yrEmpty: { en: 'Nothing here for this year yet. No rush.', zh: '這一年還沒有留下什麼，慢慢來。' },
} as const;

export type Key = keyof typeof ui;
export type Pair = { en: string; zh: string };

export const MONTHS_EN = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// 拿一組翻譯：傳 key 或直接傳 { en, zh }
export const pair = (k: Key | Pair): Pair => (typeof k === 'string' ? ui[k] : k);

// 給 HTML 屬性用（aria-label、title、placeholder 這些 CSS 切不到的）。
// 預設放英文，切換語言時 applyLang() 會依 data-en-* / data-zh-* 換掉。
//   <button {...ta('aria-label', 'search')}>
export function ta(attr: string, k: Key | Pair): Record<string, string> {
  const p = pair(k);
  return { [attr]: p.en, [`data-en-${attr}`]: p.en, [`data-zh-${attr}`]: p.zh, 'data-i18n': '' };
}

// 同時翻多個屬性
export const tas = (...list: [string, Key | Pair][]) => Object.assign({}, ...list.map(([a, k]) => ta(a, k)));

// 網站設定裡的文字（首頁大標、歡迎畫面…）是你寫的內容。
// 英文模式要顯示什麼：有填英文版就用英文版；沒填的話，如果還是我預設的那句就自動翻；
// 都不是就顯示原本的中文。
const KNOWN: Record<string, string> = {
  '寫一點程式，做一點東西，讀一點書': 'Writing a little code, making a few things, reading some books',
  '這個網站沒有要賣什麼，也沒有在找工作，就是一個我自己的地方。放筆記、手作，還有讀過的書。':
    'This site isn’t selling anything, and I’m not looking for a job. It’s just a place of my own — notes, things I’ve made, and books I’ve read.',
  '歡迎光臨': 'Welcome',
  '這裡有一點音樂，戴上耳機會更好': 'There’s a little music here — headphones recommended.',
  '沒有廣告': 'No ads',
  '沒有廣告，也沒有追蹤': 'No ads, no tracking',
};

export const contentPair = (zh?: string, en?: string): Pair => {
  const z = zh ?? '';
  return { zh: z, en: en?.trim() || KNOWN[z.trim()] || z };
};
