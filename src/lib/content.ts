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
  for (const item of [...(await liveNotes()), ...(await liveMakes()), ...(await liveGames()), ...(await liveBooks())]) {
    for (const t of item.data.tags) counts.set(t, (counts.get(t) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name, 'zh-Hant'));
}

export const tagHref = (t: string) => `/tags/${encodeURIComponent(t)}/`;

export async function liveGames() {
  return (await getCollection('games')).filter((g) => !g.data.draft).sort(newest);
}

// 舊版（配裝）留下的相容函式。如果你的 repo 裡還有 src/pages/games/[game]/[build].astro，
// 它會用到這兩個；回傳空的，那一頁就不會產生。把那個檔案刪掉之後，這兩行也可以刪。
export const liveBuilds = async () => [] as any[];
export const isCurrent = (..._: unknown[]) => true;
