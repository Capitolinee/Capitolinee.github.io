// 標籤的英文翻譯。在後台「網站設定 → 標籤翻譯」填，存在 src/data/tags.json。
// 沒填翻譯的標籤，英文模式下就照原本的字顯示。
import data from '../data/tags.json';
import type { Pair } from './i18n';

const map = new Map<string, string>();
for (const it of ((data as { items?: { zh?: string; en?: string }[] }).items ?? [])) {
  const zh = it.zh?.trim();
  const en = it.en?.trim();
  if (zh && en) map.set(zh, en);
}

export const tagPair = (t: string): Pair => ({ zh: t, en: map.get(t.trim()) ?? t });
export const tagEn = (t: string): string => map.get(t.trim()) ?? t;
