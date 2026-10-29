// GitHub Pages serves the site under /<repo>. next/image does not add the
// basePath to string `src`s, so public files go through `asset()`.
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const asset = (path: string) => `${BASE_PATH}${path}`;
