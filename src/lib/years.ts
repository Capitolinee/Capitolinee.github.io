import { liveNotes, liveMakes, liveBooks } from './content';

// 有內容的所有年份，新的在前
export async function contentYears(): Promise<number[]> {
  const ys = new Set<number>();
  for (const n of await liveNotes()) ys.add(n.data.date.getFullYear());
  for (const m of await liveMakes()) ys.add(m.data.date.getFullYear());
  for (const b of await liveBooks()) if (b.data.status === 'done' && b.data.date) ys.add(b.data.date.getFullYear());
  return [...ys].sort((a, b) => b - a);
}
