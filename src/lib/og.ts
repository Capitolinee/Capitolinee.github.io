// 分享預覽圖（Open Graph image）。build 時替每篇文章生一張 1200×630 的 PNG，
// 貼到 Discord、LINE、Facebook 時就會顯示這張。
//
// 做法：satori 把排版轉成 SVG（文字會轉成路徑，不依賴系統字型），再用 sharp 轉成 PNG。
// 字型用 @fontsource/noto-sans-tc，它被切成一百多個小檔，這裡只載入用得到的那幾個。

import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import satori from 'satori';
import sharp from 'sharp';

const require = createRequire(import.meta.url);
const FONT_DIR = dirname(require.resolve('@fontsource/noto-sans-tc/package.json'));

type Face = { file: string; ranges: [number, number][] };
const facesByWeight = new Map<number, Face[]>();
const fontCache = new Map<string, Buffer>();

async function faces(weight: number): Promise<Face[]> {
  if (facesByWeight.has(weight)) return facesByWeight.get(weight)!;
  const css = await readFile(join(FONT_DIR, `${weight}.css`), 'utf8');
  const list: Face[] = [];
  for (const block of css.split('@font-face').slice(1)) {
    const woff = block.match(/url\(\.\/files\/([^)]+?\.woff)\)\s*format\('woff'\)/)?.[1];
    const range = block.match(/unicode-range:\s*([^;]+);/)?.[1];
    if (!woff || !range) continue;
    const ranges = range.split(',').map((r) => {
      const [a, b] = r.trim().replace(/^U\+/i, '').split('-');
      const start = parseInt(a, 16);
      return [start, b ? parseInt(b, 16) : start] as [number, number];
    });
    list.push({ file: join(FONT_DIR, 'files', woff), ranges });
  }
  facesByWeight.set(weight, list);
  return list;
}

// satori 遇到同名字型只會用其中一個，缺字不會去別的檔找，
// 所以每個小檔取不同的名字（N0、N1…），再把全部名字列進 fontFamily 讓它逐一找
async function fontsFor(text: string, weight: number) {
  const cps = new Set<number>();
  for (const ch of text) cps.add(ch.codePointAt(0)!);
  const all = await faces(weight);
  const needed = all.filter((f) => f.ranges.some(([a, b]) => [...cps].some((c) => c >= a && c <= b)));
  return Promise.all(
    needed.map(async (f) => {
      if (!fontCache.has(f.file)) fontCache.set(f.file, await readFile(f.file));
      const name = `N${all.indexOf(f)}`;
      return { name, data: fontCache.get(f.file)!, weight: weight as 400 | 700, style: 'normal' as const };
    }),
  );
}

// 把 public/ 裡的封面圖縮小、轉成 data URI 放進卡片
async function coverData(path?: string): Promise<string | null> {
  if (!path || /^https?:/.test(path)) return null;
  try {
    const buf = await readFile(join('public', path.replace(/^\//, '')));
    const out = await sharp(buf).rotate().resize(520, 630, { fit: 'cover' }).jpeg({ quality: 82 }).toBuffer();
    return `data:image/jpeg;base64,${out.toString('base64')}`;
  } catch {
    return null;
  }
}

// satori 吃的是 React 元素的格式，這裡手寫一個小幫手，不用裝 React
type Node = { type: string; props: Record<string, unknown> };
const h = (type: string, style: Record<string, unknown>, ...children: unknown[]): Node => ({
  type,
  props: { style, children: children.length === 1 ? children[0] : children },
});

export interface OgInput {
  siteName: string;
  title: string;
  kind?: string; // 筆記、手作…
  date?: string;
  tags?: string[];
  cover?: string;
}

export async function renderOg(o: OgInput): Promise<Buffer> {
  const meta = [o.kind, o.date].filter(Boolean).join('  //  ');
  const tags = (o.tags ?? []).slice(0, 3).map((t) => `#${t}`);
  const cover = await coverData(o.cover);

  const boldText = o.title + o.siteName;
  const regText = meta + tags.join('');
  const fonts = [...(await fontsFor(boldText, 700)), ...(await fontsFor(regText || 'a', 400))];
  const family = [...new Set(fonts.map((f) => f.name))].join(', ');

  const titleSize = o.title.length > 28 ? 54 : o.title.length > 16 ? 64 : 76;

  const left = h(
    'div',
    { display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: 1, padding: '64px 72px 70px' },
    // 上：站名
    h(
      'div',
      { display: 'flex', alignItems: 'center', gap: 16 },
      h('div', { width: 40, height: 40, borderRadius: 10, background: 'rgba(136,192,208,0.18)', border: '2px solid #88c0d0', display: 'flex' }),
      h('div', { fontSize: 30, fontWeight: 700, color: '#d8dee9' }, o.siteName),
    ),
    // 中：標題
    h(
      'div',
      { display: 'flex', fontSize: titleSize, fontWeight: 700, lineHeight: 1.22, color: '#eceff4', letterSpacing: '-0.01em', lineClamp: 3 },
      o.title,
    ),
    // 下：類型、日期、標籤
    h(
      'div',
      { display: 'flex', alignItems: 'center', gap: 22, fontSize: 26, color: '#d8dee9' },
      meta ? h('div', { display: 'flex' }, meta) : h('div', { display: 'flex' }, ''),
      ...tags.map((t) => h('div', { display: 'flex', color: '#88c0d0' }, t)),
    ),
  );

  const root = h(
    'div',
    {
      width: 1200,
      height: 630,
      display: 'flex',
      position: 'relative',
      backgroundColor: '#2e3440',
      backgroundImage:
        'radial-gradient(circle at 18% 22%, rgba(94,129,172,0.45), rgba(46,52,64,0) 55%), radial-gradient(circle at 82% 88%, rgba(143,188,187,0.28), rgba(46,52,64,0) 50%)',
      fontFamily: family,
    },
    left,
    ...(cover
      ? [h('img', { width: 460, height: 630, objectFit: 'cover' }) as Node]
      : []),
    // 底部一條 Frost → Aurora 的漸層線
    h('div', {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      height: 10,
      backgroundImage: 'linear-gradient(90deg, #88c0d0, #5e81ac 55%, #b48ead)',
      display: 'flex',
    }),
  );

  if (cover) {
    // img 的 src 要放在 props 裡
    const img = (root.props.children as Node[])[1];
    img.props.src = cover;
  }

  const svg = await satori(root as any, { width: 1200, height: 630, fonts });
  return sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer();
}
