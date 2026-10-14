// ---- Edit these ----
const REPO = "CyberNamous/guide_host";
const BRANCH = "main";
const FILE_PATH = "files/Guide-Host.docx";
const APP_NAME = "Host Guide";
const TAGLINE = "How to set up and run the Spin the Wheel as host.";
// --------------------

const FILENAME = FILE_PATH.split("/").pop();

const PAGE = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${APP_NAME}</title>
<meta name="description" content="${TAGLINE}">
<meta name="theme-color" content="#101012">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap" rel="stylesheet">
<style>
:root{--bg:#101012;--card:#18181b;--line:#27272c;--text:#fff;--muted:#a1a1aa;--pink:#ff4da6;--hot:#ff0f7b}
*{box-sizing:border-box}
html,body{margin:0}
body{background:var(--bg);color:var(--text);font-family:Roboto,system-ui,sans-serif;line-height:1.5;min-height:100vh;padding:24px 16px}
main{width:100%;max-width:468px;margin:0 auto}
h1{font-size:clamp(2rem,9vw,2.6rem);line-height:1.1;font-weight:900;color:var(--pink);margin:0 0 8px;text-shadow:0 0 28px rgba(255,77,166,.35)}
p{color:var(--muted);margin:0 0 20px}
.card{background:var(--card);border:1px solid var(--line);border-radius:16px;padding:20px;box-shadow:0 0 40px rgba(255,15,123,.08)}
.file{display:flex;align-items:center;gap:10px;padding:12px 14px;border:1px dashed rgba(255,77,166,.45);border-radius:10px;background:#0e0e12;color:var(--muted);font-weight:700;margin-bottom:16px;word-break:break-all}
.btn{display:block;text-align:center;padding:14px 18px;border-radius:10px;background:linear-gradient(90deg,#ff0f7b,#ff3d9a);color:#fff;text-decoration:none;font-weight:700;font-size:1rem;box-shadow:0 0 24px rgba(255,15,123,.35)}
.btn:active{transform:scale(.99)}
.btn:focus-visible{outline:3px solid #fff;outline-offset:3px}
</style>
</head>
<body>
<main>
  <h1>${APP_NAME}</h1>
  <p>${TAGLINE}</p>
  <div class="card">
    <div class="file"><span aria-hidden="true">📄</span><span>${FILENAME}</span></div>
    <a class="btn" href="/download">Download</a>
  </div>
</main>
</body>
</html>`;

export default {
  async fetch(request) {
    const { pathname } = new URL(request.url);

    if (pathname === "/") {
      return new Response(PAGE, { headers: { "content-type": "text/html; charset=utf-8", "cache-control": "public, max-age=300" } });
    }

    if (pathname === "/download") {
      const raw = `https://raw.githubusercontent.com/${REPO}/${BRANCH}/${FILE_PATH}`;
      const up = await fetch(raw, { cf: { cacheTtl: 300, cacheEverything: true } });
      if (!up.ok) return new Response("File unavailable", { status: 502 });
      return new Response(up.body, {
        headers: {
          "content-type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          "content-disposition": `attachment; filename="${FILENAME}"`,
          "cache-control": "public, max-age=300",
        },
      });
    }

    return new Response("Not found", { status: 404 });
  },
};
