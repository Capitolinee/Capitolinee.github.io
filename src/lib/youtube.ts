// 從各種 YouTube 網址取出影片 ID 和播放清單 ID。
// 支援：
//   https://www.youtube.com/watch?v=影片ID
//   https://youtu.be/影片ID
//   https://www.youtube.com/playlist?list=清單ID
//   https://www.youtube.com/watch?v=影片ID&list=清單ID
//   https://music.youtube.com/watch?v=影片ID
//   https://music.youtube.com/playlist?list=清單ID
// 看不懂的網址回傳 null。

export interface YouTubeParts {
  id: string | null;
  list: string | null;
}

export function youtubeParts(url: string): YouTubeParts | null {
  if (!url) return null;
  try {
    const u = new URL(url.trim());
    const host = u.hostname.replace(/^(www|m)\./, '');
    const list = u.searchParams.get('list');
    let id: string | null = null;

    if (host === 'youtu.be') {
      id = u.pathname.slice(1) || null;
    } else if (host === 'youtube.com' || host.endsWith('.youtube.com')) {
      if (u.pathname === '/watch') id = u.searchParams.get('v');
      else if (/^\/(embed|shorts|live)\//.test(u.pathname)) id = u.pathname.split('/')[2] || null;
    } else {
      return null;
    }

    return id || list ? { id, list } : null;
  } catch {
    return null;
  }
}
