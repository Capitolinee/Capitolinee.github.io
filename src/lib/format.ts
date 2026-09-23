// 日期統一格式：2026.09.14
export function ymd(d: Date): string {
  const p = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}.${p(d.getMonth() + 1)}.${p(d.getDate())}`;
}

// 手作和書只顯示到月份：2026.09
export function ym(d: Date): string {
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}`;
}

// 還沒放照片時，依 id 給一個固定的占位漸層，重整不會跳來跳去。
export function placeholder(id: string): string {
  let h = 0;
  for (let i = 0; i < id.length; i += 1) {
    h = (h * 31 + id.charCodeAt(i)) % 997;
  }
  return `ph${h % 8}`;
}

// 星等：★★★★☆
export function stars(n: number): string {
  const full = Math.round(n);
  return '★'.repeat(full) + '☆'.repeat(Math.max(0, 5 - full));
}

// 閱讀時間：中文每分鐘約 400 字、英文每分鐘約 220 個單字
export function readingMinutes(text: string): number {
  const plain = text
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[#>*_`~-]/g, ' ');
  const cjk = (plain.match(/[\u3400-\u9fff\uf900-\ufaff]/g) ?? []).length;
  const words = (plain.replace(/[\u3400-\u9fff\uf900-\ufaff]/g, ' ').match(/[A-Za-z0-9]+(?:['’][A-Za-z]+)?/g) ?? []).length;
  return Math.max(1, Math.round(cjk / 400 + words / 220));
}
