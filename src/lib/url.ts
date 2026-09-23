// 部署在子路徑（username.github.io/repo）時，站內路徑要加 base 前綴。
// 外部連結、mailto、錨點原樣放過。

export function withBase(path: string): string {
  if (!path) return path;
  if (/^(https?:|mailto:|tel:|#|\/\/)/.test(path)) return path;
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}/${path.replace(/^\//, '')}`;
}
