// 每篇文章的分享預覽圖：/og/notes/檔名.png、/og/makes/檔名.png
// 其他頁面共用 /og/default.png
import type { APIRoute, GetStaticPaths } from 'astro';
import { site } from '../../data/site';
import { liveNotes, liveMakes } from '../../lib/content';
import { ymd, ym } from '../../lib/format';
import { renderOg, type OgInput } from '../../lib/og';

export const getStaticPaths: GetStaticPaths = async () => {
  const notes = await liveNotes();
  const makes = await liveMakes();
  return [
    { params: { slug: 'default' }, props: { title: site.title } satisfies Partial<OgInput> },
    ...notes.map((n) => ({
      params: { slug: `notes/${n.id}` },
      props: { title: n.data.title, kind: 'Note', date: ymd(n.data.date), tags: n.data.tags, cover: n.data.cover },
    })),
    ...makes.map((m) => ({
      params: { slug: `makes/${m.id}` },
      props: {
        title: m.data.title,
        kind: m.data.material ? `Make · ${m.data.material}` : 'Make',
        date: ym(m.data.date),
        tags: m.data.tags,
        cover: m.data.cover,
      },
    })),
  ];
};

export const GET: APIRoute = async ({ props }) => {
  const png = await renderOg({ siteName: site.name, ...(props as Omit<OgInput, 'siteName'>) });
  return new Response(png, { headers: { 'Content-Type': 'image/png' } });
};
