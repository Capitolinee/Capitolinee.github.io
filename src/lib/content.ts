import { getCollection } from 'astro:content';

type Dated = { data: { date?: Date } };

// 新的在前；沒有日期的排最後
export const newest = (a: Dated, b: Dated) =>
  (b.data.date?.valueOf() ?? 0) - (a.data.date?.valueOf() ?? 0);

export async function liveNotes() {
  return (await getCollection('notes')).filter((n) => !n.data.draft).sort(newest);
}

export async function liveMakes() {
  return (await getCollection('makes')).filter((m) => !m.data.draft).sort(newest);
}

export async function liveBooks() {
  return (await getCollection('books')).filter((b) => !b.data.draft).sort(newest);
}

// 筆記和手作的所有標籤，附使用次數，多的在前
export async function allTags() {
  const counts = new Map<string, number>();
  for (const item of [...(await liveNotes()), ...(await liveMakes())]) {
    for (const t of item.data.tags) counts.set(t, (counts.get(t) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name, 'zh-Hant'));
}

export const tagHref = (t: string) => `/tags/${encodeURIComponent(t)}/`;
