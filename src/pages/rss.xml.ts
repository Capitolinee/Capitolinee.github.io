import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { site } from '../data/site';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const notes = (await getCollection('notes')).filter((n) => !n.data.draft);
  const makes = (await getCollection('makes')).filter((m) => !m.data.draft);

  const games = (await getCollection('games'))
    .filter((g) => !g.data.draft && g.data.date)
    .map((g) => ({
      title: g.data.game ? `${g.data.title}（${g.data.game}）` : g.data.title,
      description: '',
      pubDate: g.data.date!,
      link: `/games/${g.id}/`,
    }));

  const items = [
    ...games,
    ...notes.map((n) => ({
      title: n.data.title,
      description: n.data.summary ?? '',
      pubDate: n.data.date,
      link: `/notes/${n.id}/`,
    })),
    ...makes.map((m) => ({
      title: m.data.title,
      description: m.data.summary ?? '',
      pubDate: m.data.date,
      link: `/makes/${m.id}/`,
    })),
  ].sort((a, b) => b.pubDate.valueOf() - a.pubDate.valueOf());

  return rss({
    title: site.name,
    description: site.lede,
    site: context.site ?? 'https://example.com',
    items,
  });
}
