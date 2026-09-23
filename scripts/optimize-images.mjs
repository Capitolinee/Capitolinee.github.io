// build 之後自動處理 dist/img/ 裡的照片：
//   1. 太大的縮到最長邊 2000px
//   2. 依照手機拍照時的方向自動轉正
//   3. 清掉 EXIF 資料（包含拍攝地點的 GPS 座標、手機型號）
//   4. 重新壓縮
// 檔名和格式不變，所以網站裡的路徑不用改。原圖留在 public/img/ 不會被動到。

import { readdir, readFile, writeFile, stat } from 'node:fs/promises';
import { join, extname } from 'node:path';
import sharp from 'sharp';

const DIR = 'dist/img';
const MAX = 2000;
const exts = new Set(['.jpg', '.jpeg', '.png', '.webp']);

async function* walk(dir) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return; // 沒有 img 資料夾就算了
  }
  for (const e of entries) {
    const p = join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else if (exts.has(extname(e.name).toLowerCase())) yield p;
  }
}

let count = 0;
let before = 0;
let after = 0;

for await (const file of walk(DIR)) {
  const input = await readFile(file);
  const ext = extname(file).toLowerCase();

  let img = sharp(input, { failOn: 'none' })
    .rotate() // 依 EXIF 轉正，之後輸出時 EXIF 會被丟掉
    .resize({ width: MAX, height: MAX, fit: 'inside', withoutEnlargement: true });

  if (ext === '.jpg' || ext === '.jpeg') img = img.jpeg({ quality: 80, mozjpeg: true });
  else if (ext === '.png') img = img.png({ compressionLevel: 9, palette: true, quality: 85 });
  else if (ext === '.webp') img = img.webp({ quality: 80 });

  const output = await img.toBuffer();
  count += 1;
  before += input.length;

  // 壓完反而變大（例如原本就壓過的小圖）就保留原檔，但原檔可能有 GPS，所以還是用去除資料的版本
  if (output.length < input.length) {
    await writeFile(file, output);
    after += output.length;
  } else {
    const stripped = await sharp(input, { failOn: 'none' }).rotate().toBuffer();
    await writeFile(file, stripped);
    after += stripped.length;
  }
}

const mb = (n) => (n / 1024 / 1024).toFixed(1);
if (count > 0) {
  console.log(`照片處理完成：${count} 張，${mb(before)} MB → ${mb(after)} MB`);
} else {
  console.log('照片處理：public/img/ 裡沒有照片，跳過');
}
